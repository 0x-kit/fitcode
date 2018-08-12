const moment = require('moment');
const Diary = require('../models/diary');
const User = require('../models/user');
const _ = require('lodash');

exports.readDiary = async (req, res) => {
  try {
    const diaryId = req.params.diaryId;
    const diary = await Diary.findById(diaryId)
      .select(' products _id user date name part')
      .populate({ path: 'user', select: 'name' })
      .populate({ path: 'products.product', select: 'name' });

    if (!diary) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    } else {
      const response = {
        id: diary._id,
        user: diary.user,
        date: diary.date,
        part: diary.part,
        products: diary.products
      };

      return res.status(200).json({
        diary: response
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.createDiary = async (req, res) => {
  try {
    const newDiary = new Diary(req.body);
    await newDiary.save();

    res.status(201).json({
      message: 'Created diary sucessfully',
      diary: {
        id: newDiary._id,
        user: newDiary.user,
        date: newDiary.date,
        part: newDiary.part,
        products: newDiary.products
      }
    });
  } catch (err) {
    console.log(err);
    res.status(422).json({ error: err.message });
  }
};

exports.deleteDiary = async (req, res) => {
  try {
    const diaryId = req.params.diaryId;
    const diary = await Diary.findByIdAndRemove(diaryId);

    if (!diary) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    } else {
      return res.status(200).json({
        message: 'Diary deleted'
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.updateDiary = async (req, res) => {
  try {
    let diaryId = req.params.diaryId;
    let newProps = req.body;

    const diaryUpdated = await Diary.findByIdAndUpdate(diaryId, newProps, {
      new: true,
      runValidators: true
    });

    if (!diaryUpdated) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    } else {
      return res.status(200).json({ message: 'Diary updated!', diary: diaryUpdated });
    }
  } catch (err) {
    console.log(err);
    res.status(422).json({ error: err });
  }
};

/** Basic crud */

exports.getDiaries = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const reqDate = req.query.date;

    const startDate = moment(reqDate)
      .startOf('day')
      .format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    const endDate = moment(reqDate)
      .endOf('day')
      .format('YYYY-MM-DDTHH:mm:ss.SSSZ');

    if (!user) return res.status(404).json({ message: 'Not valid entries found for provided ID' });

    const docs = await Diary.find({ user: userId, date: { $gte: startDate, $lte: endDate } })
      .select(' products user date part')
      .populate('products.product');

    if (docs.length !== 0) return res.status(200).json(docs);

    const diaries = _.times(5, index => Diary.createDiary(index, userId, startDate));
    await Diary.insertMany(diaries);

    const newDocs = await Diary.find({ user: userId, date: { $gte: startDate, $lte: endDate } })
      .select(' products user date part')
      .populate('products.product');

    if (newDocs.length !== 0) return res.status(200).json(newDocs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const diaryId = req.params.diaryId;
    const newProduct = req.body;

    const diaryUpdated = await Diary.findByIdAndUpdate(
      diaryId,
      {
        $push: { products: newProduct }
      },
      {
        new: true,
        runValidators: true,
        upsert: true
      }
    );

    if (!diaryUpdated) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    } else {
      return res.status(200).json({ message: 'Product added!', diary: diaryUpdated });
    }
  } catch (err) {
    console.log(err);
    res.status(422).json({ error: err });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const diaryId = req.params.diaryId;
    const productId = req.params.productId;

    const diaryUpdated = await Diary.findByIdAndUpdate(
      diaryId,
      {
        $pull: { products: { product: productId } }
      },
      {
        runValidators: true,
        upsert: true,
        new: true
      }
    )
      .select(' products _id user date name part')
      .populate({ path: 'user', select: 'name' })
      .populate({ path: 'products.product' });

    if (!diaryUpdated) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    } else {
      return res.status(200).json([diaryUpdated]);
    }
  } catch (err) {
    console.log(err);
    res.status(422).json({ error: err });
  }
};

exports.editProduct = async (req, res) => {
  try {
    const diaryId = req.params.diaryId;
    const productUpdated = req.body;

    const diary = await Diary.findById(diaryId);

    if (!diary) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    }

    const query = await Diary.update(
      {
        _id: diaryId,
        'products.product': productUpdated.product
      },
      {
        $set: { 'products.$.grams': productUpdated.grams }
      },
      {
        new: true,
        runValidators: true,
        upsert: true
      }
    );

    if (query.n === 1) {
      const diaryUpdated = await Diary.findById(diaryId)
        .select(' products _id user date name part')
        .populate({ path: 'user', select: 'name' })
        .populate({ path: 'products.product' });

      return res.status(200).json([diaryUpdated]);
    }
  } catch (err) {
    console.log(err);
    res.status(422).json({ error: err });
  }
};

const Diary = require('../models/diary');

exports.getDiaries = async (req, res) => {
  try {
    const userId = req.params.userId;
    const docs = await Diary.find({ user: userId })
      .select(' products user date part')
      .populate('products.product');

    if (!docs) {
      return res.status(404).json({ message: 'Not entries found' });
    } else {
      return res.status(200).json(docs);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.readDiary = async (req, res) => {
  try {
    const diaryId = req.params.diaryId;
    const diary = await Diary.findById(diaryId)
      .select(' products _id user date name part')
      .populate({ path: 'user', select: 'name' });

    if (!diary) {
      return res
        .status(404)
        .json({ message: 'Not valid entry found for provided ID' });
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
    res.status(422).json({ error: err.message });
  }
};

exports.deleteDiary = async (req, res) => {
  try {
    const diaryId = req.params.diaryId;
    const diary = await Diary.findByIdAndRemove(diaryId);

    if (!diary) {
      return res
        .status(404)
        .json({ message: 'Not valid entry found for provided ID' });
    } else {
      return res.status(200).json({
        message: 'Diary deleted'
      });
    }
  } catch (err) {
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
      return res
        .status(404)
        .json({ message: 'Not valid entry found for provided ID' });
    } else {
      return res
        .status(200)
        .json({ message: 'Diary updated!', diary: diaryUpdated });
    }
  } catch (err) {
    res.status(422).json({ error: err });
  }
};

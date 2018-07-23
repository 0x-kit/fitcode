const Diary = require("../models/diary");

exports.getDiaries = async (req, res, next) => {
  try {
    const docs = await Diary.find({})
      .select("_id date name part products")
      .populate("products");
    const response = {
      count: docs.length,
      Diaries: docs.map(doc => {
        return {
          id: doc._id,
          date: doc.date,
          name: doc.name,
          part: doc.part,
          products: doc.products
        };
      })
    };
    res.status(200).json({ response });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// exports.readDiary = async (req, res, next) => {
//   try {
//     const diaryId = req.params.diaryId;
//     const diary = await Diary.findById(diaryId).select(
//       "_id name brand calories carbs proteins fats"
//     );

//     if (!diary) {
//       return res
//         .status(404)
//         .json({ message: "Not valid entry found for provided ID" });
//     } else {
//       return res.status(200).json({
//         diary: diary
//       });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// };

exports.createDiary = async (req, res, next) => {
  try {
    const newDiary = new Diary(req.body);

    await newDiary.save();

    res.status(201).json({
      message: "Created diary sucessfully",
      diary: {
        id: newDiary._id,
        date: newDiary.date,
        part: newDiary.part,
        products: newDiary.products
      }
    });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

// exports.deleteDiary = async (req, res, next) => {
//   try {
//     const diaryId = req.params.diaryId;
//     const diary = await Diary.findByIdAndRemove(diaryId);

//     if (!diary) {
//       return res
//         .status(404)
//         .json({ message: "Not valid entry found for provided ID" });
//     } else {
//       return res.status(200).json({
//         message: "Diary deleted"
//       });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// };

// exports.updateDiary = async (req, res, next) => {
//   try {
//     let diaryId = req.params.diaryId;
//     let newProps = req.body;

//     const diaryUpdated = await Diary.findByIdAndUpdate(diaryId, newProps, {
//       new: true,
//       runValidators: true
//     });

//     if (!diaryUpdated) {
//       return res
//         .status(404)
//         .json({ message: "Not valid entry found for provided ID" });
//     } else {
//       return res
//         .status(200)
//         .json({ message: "Diary updated!", diary: diaryUpdated });
//     }
//   } catch (err) {
//     res.status(422).json({ error: err });
//   }
// };

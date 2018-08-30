const Exercise = require('../models/exercise');

exports.getExercises = async (req, res) => {
  try {
    const docs = await Exercise.find({}).select('_id date user calories name');
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.readExercise = async (req, res) => {
  try {
    const exerciseId = req.params.exerciseId;
    const exercise = await Exercise.findById(exerciseId).select('_id date user calories name');

    if (!exercise) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    } else {
      return res.status(200).json(exercise);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.createExercise = async (req, res) => {
  try {
    const newExercise = new Exercise(req.body);

    await newExercise.save();

    res.status(201).json({ message: 'Exercise successfully created.', exercise: newExercise });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
};

exports.deleteExercise = async (req, res) => {
  try {
    const exerciseId = req.params.exerciseId;
    const exercise = await Exercise.findByIdAndRemove(exerciseId);

    if (!exercise) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    } else {
      return res.status(200).json({ message: 'Exercise successfully deleted.', exercise });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.updateExercise = async (req, res) => {
  try {
    const exerciseId = req.params.exerciseId;
    const newProps = req.body;

    const exerciseUpdated = await Exercise.findByIdAndUpdate(exerciseId, newProps, {
      new: true,
      runValidators: true
    }).select('_id date user calories name');

    if (!exerciseUpdated) {
      return res.status(404).json({ message: 'Not valid entry found for provided ID' });
    } else {
      return res.status(200).json({ message: 'Exercise successfully updated.', exercise: exerciseUpdated });
    }
  } catch (err) {
    console.log(err);
    res.status(422).json({ error: err });
  }
};

const _ = require('lodash');
const faker = require('faker');

const mongoose = require('mongoose');
const keys = require('./config/keys');
mongoose.connect(keys.mongoURI);

const DiaryModel = require('./models/diary');

mongoose.connect(
  'mongodb://test:password1@ds139890.mlab.com:39890/fitcode_0xkush_test'
);
mongoose.connection
  .once('open', () => {
    const diaries = _.times(5, () => createDiary());

    DiaryModel.insertMany(diaries);
  })
  .on('error', error => {
    console.warn('Warning', error);
  });

function createDiary() {
  let PRODUCTS = [
    { product: '5b5a3055a06b3d1d5f7fa06e', grams: randomBetween(10, 100) },
    { product: '5b5a3055a06b3d1d5f7fa06f', grams: randomBetween(10, 100) },
    { product: '5b5a3055a06b3d1d5f7fa070', grams: randomBetween(10, 100) },
    { product: '5b5a30e373f46d1d9b2101a2', grams: randomBetween(10, 100) },
    { product: '5b5a30e373f46d1d9b2101a3', grams: randomBetween(10, 100) },
    { product: '5b5a30e373f46d1d9b2101a4', grams: randomBetween(10, 100) }
  ];

  return {
    user: '5b5c7bf2242c253428c09b0e', //user: tester
    age: faker.date.recent,
    part: randomEntry(['Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Others']),
    products: PRODUCTS
  };
}

function randomEntry(array) {
  return array[~~(Math.random() * array.length)];
}

function randomBetween(min, max) {
  return ~~(Math.random() * (max - min)) + min;
}

const _ = require('lodash');
const faker = require('faker');
const moment = require('moment');
const mongoose = require('mongoose');

const DiaryModel = require('./models/diary');
const ProductModel = require('./models/product');

const mongoProd = 'mongodb://admin:password@ds163494.mlab.com:63494/fitcode_0xkush_prod';
const mongoDev = 'mongodb://admin:password@ds125938.mlab.com:25938/fitcode_0xkush';

mongoose.connect(mongoDev);

mongoose.connection
  .once('open', () => {
    console.log(`[ -- SEEDING SCRIPT IN PROGRESS -- ] DB: ${mongoDev}`);

    //const products = _.times(120, () => createProduct());
    //ProductModel.insertMany(products);
    const diaries = _.times(5, index => createDiary(index));

    DiaryModel.insertMany(diaries);
  })
  .on('error', error => {
    console.warn('Warning', error);
  });

function createProduct() {
  const newProduct = {
    name: faker.commerce.productName(),
    brand: faker.commerce.product(),
    calories: randomBetween(50, 700),
    carbs: randomBetween(20, 200),
    proteins: randomBetween(20, 200),
    fats: randomBetween(20, 200)
  };
  return newProduct;
}

function createProducts() {
  return { product: randomEntry(PRODUCTS_IDS), grams: randomBetween(10, 500) };
}

function createDiary(index) {
  const products = _.times(5, () => createProducts());
  return {
    user: '5b6e0b2e5949697d105c0a08', //user: tester
    date: moment(),
    part: LABELS[index],
    products: products
  };
}

function randomEntry(array) {
  return array[~~(Math.random() * array.length)];
}

function randomBetween(min, max) {
  return ~~(Math.random() * (max - min)) + min;
}
const LABELS = ['Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Others'];
const PRODUCTS_IDS = [
  '5b6e055a4ea7837716f46cda',
  '5b6e055a4ea7837716f46cdb',
  '5b6e055a4ea7837716f46cdc',
  '5b6e055a4ea7837716f46cdd',
  '5b6e055a4ea7837716f46cde',
  '5b6e055a4ea7837716f46cdf',
  '5b6e055a4ea7837716f46ce0',
  '5b6e055a4ea7837716f46ce1',
  '5b6e055a4ea7837716f46ce2',
  '5b6e055a4ea7837716f46ce3',
  '5b6e055a4ea7837716f46ce4',
  '5b6e055a4ea7837716f46ce5',
  '5b6e055a4ea7837716f46ce6',
  '5b6e055a4ea7837716f46ce7',
  '5b6e055a4ea7837716f46ce8',
  '5b6e055a4ea7837716f46ce9',
  '5b6e055a4ea7837716f46cea',
  '5b6e055a4ea7837716f46ceb',
  '5b6e055a4ea7837716f46cec',
  '5b6e055a4ea7837716f46ced',
  '5b6e055a4ea7837716f46cee',
  '5b6e055a4ea7837716f46cef',
  '5b6e055a4ea7837716f46cf0',
  '5b6e055a4ea7837716f46cf1',
  '5b6e055a4ea7837716f46cf2',
  '5b6e055a4ea7837716f46cf3',
  '5b6e055a4ea7837716f46cf4',
  '5b6e055a4ea7837716f46cf5',
  '5b6e055a4ea7837716f46cd8',
  '5b6e055a4ea7837716f46cd9',
  '5b6e061e7775a677d4648f73',
  '5b6e061e7775a677d4648f74',
  '5b6e061e7775a677d4648f75',
  '5b6e061e7775a677d4648f76',
  '5b6e061e7775a677d4648f77',
  '5b6e061e7775a677d4648f78',
  '5b6e061e7775a677d4648f79'
];

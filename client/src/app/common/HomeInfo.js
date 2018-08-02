import _ from 'lodash';

class HomeInfo {
  meals = meals => {
    const labels = ['Breakfast', 'Lunch', 'Snacks', 'Dinner', 'Others'];
    let part,
      panesArr = [];

    const mapParts = _.mapKeys(meals, 'part'); // { Breakfast:{...}, Lunch:{...}, ... }

    labels.forEach(label => {
      mapParts[label] === undefined ? (part = []) : (part = mapParts[label]);

      const meal = { _id: part._id, label: label, products: part.products };

      panesArr.push(meal);
    });
    return panesArr; // [{label, component}, {label, component}, ...]
  };

  per = (num, amount) => {
    return Math.round((num * amount) / 100);
  };

  remaining = (mealsArr, goals) => {
    //console.log(mealsArr);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    let remainingMacros,
      currentMacros,
      calArr = [],
      proArr = [],
      carbArr = [],
      fatArr = [],
      macrosPerMealArr = [],
      macrosPerMeal;

    mealsArr.map(meal => {
      const { label } = meal;
      meal.products.map((product, index) => {
        const { grams } = product;
        const { calories, proteins, carbs, fats } = product.product;

        calArr[index] === undefined
          ? (calArr[index] = 0)
          : (calArr[index] += this.per(calories, grams));
        proArr[index] === undefined
          ? (proArr[index] = 0)
          : (proArr[index] += this.per(proteins, grams));
        carbArr[index] === undefined
          ? (carbArr[index] = 0)
          : (carbArr[index] += this.per(carbs, grams));
        fatArr[index] === undefined
          ? (fatArr[index] = 0)
          : (fatArr[index] += this.per(fats, grams));
      });

      // macrosPerMeal = {
      //   label: label,
      //   calArr: calArr,
      //   proArr: proArr,
      //   carbArr: carbArr,
      //   fatArr: fatArr
      // };
      // macrosPerMealArr.push(macrosPerMeal);
      // console.log(macrosPerMealArr);
    });

    console.log(macrosPerMealArr);

    macrosPerMealArr.map(meal => {});

    currentMacros = {
      calories: calArr.reduce(reducer),
      proteins: proArr.reduce(reducer),
      carbs: carbArr.reduce(reducer),
      fats: fatArr.reduce(reducer)
    };

    remainingMacros = {
      calories: goals.calories - calArr.reduce(reducer),
      proteins: goals.proteins - proArr.reduce(reducer),
      carbs: goals.carbs - carbArr.reduce(reducer),
      fats: goals.fats - fatArr.reduce(reducer)
    };

    return remainingMacros;
  };
}

export default HomeInfo;

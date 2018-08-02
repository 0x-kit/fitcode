import _ from 'lodash';

class HomeInfo {
  static mealsToArr = meals => {
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

  static macrosPerProduct(product) {
    const per = (num, amount) => {
      return Math.round((num * amount) / 100);
    };

    const {
      grams,
      product: { calories, proteins, carbs, fats }
    } = product;

    return {
      calories: per(grams, calories),
      proteins: per(grams, proteins),
      carbs: per(grams, carbs),
      fats: per(grams, fats)
    };
  }

  static macrosPerMeal(label, meals) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    let calArr = [],
      proArr = [],
      carbArr = [],
      fatArr = [],
      macrosPerMeal = {},
      meal = meals.find(element => element.label === label);

    if (meal.products !== undefined) {
      meal.products.forEach((product, index) => {
        let serving = this.macrosPerProduct(product);
        const { calories, proteins, carbs, fats } = serving;

        calArr[index] = 0;
        proArr[index] = 0;
        carbArr[index] = 0;
        fatArr[index] = 0;

        calArr[index] += calories;
        proArr[index] += proteins;
        carbArr[index] += carbs;
        fatArr[index] += fats;
      });

      macrosPerMeal = {
        label: meal.label,
        calories: calArr.reduce(reducer),
        proteins: proArr.reduce(reducer),
        carbs: carbArr.reduce(reducer),
        fats: fatArr.reduce(reducer)
      };
    }

    return macrosPerMeal;
  }

  static macrosRemaining(meals, goals) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const mealsArr = this.mealsToArr(meals);
    let calArr = [],
      proArr = [],
      carbArr = [],
      fatArr = [],
      remainingMacros;

    mealsArr.forEach((meal, index) => {
      let macrosPerMeal = this.macrosPerMeal(meal.label, mealsArr);

      calArr[index] = 0;
      proArr[index] = 0;
      carbArr[index] = 0;
      fatArr[index] = 0;

      calArr[index] += macrosPerMeal.calories;
      proArr[index] += macrosPerMeal.proteins;
      carbArr[index] += macrosPerMeal.carbs;
      fatArr[index] += macrosPerMeal.fats;
    });

    remainingMacros = {
      calories: goals.calories - calArr.reduce(reducer),
      proteins: goals.proteins - proArr.reduce(reducer),
      carbs: goals.carbs - carbArr.reduce(reducer),
      fats: goals.fats - fatArr.reduce(reducer)
    };

    return remainingMacros;
  }
}

export default HomeInfo;

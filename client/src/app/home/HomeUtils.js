import _ from 'lodash';

class HomeInfo {
  static mealsToArr = meals => {
    return _.map(meals);
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
      grams: grams,
      calories: per(grams, calories),
      proteins: per(grams, proteins),
      carbs: per(grams, carbs),
      fats: per(grams, fats)
    };
  }

  static macrosPerMeal(meal) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    let calArr = [],
      proArr = [],
      carbArr = [],
      fatArr = [],
      macrosPerMeal = {};

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
      let macrosPerMeal = this.macrosPerMeal(meal);

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

  static per = (num, amount) => {
    return Math.round((num * amount) / 100);
  };
}

export default HomeInfo;

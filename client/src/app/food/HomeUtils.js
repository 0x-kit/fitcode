import _ from 'lodash';
import moment from 'moment';

class HomeInfo {
  static per(num, amount) {
    return Math.round((num * amount) / 100);
  }

  static reducer(accumulator, currentValue) {
    return accumulator + currentValue;
  }

  static isRequired(name) {
    throw new Error(name + ' is required');
  }

  static macrosPerProduct({ product, grams }) {
    const { calories, proteins, carbs, fats } = product;

    return {
      grams,
      calories: this.per(grams, calories),
      proteins: this.per(grams, proteins),
      carbs: this.per(grams, carbs),
      fats: this.per(grams, fats)
    };
  }

  static reduceMacros(products = [], serving = 1) {
    let calArr = [],
      proArr = [],
      carbArr = [],
      fatArr = [],
      reducedMacros = {
        calories: 0,
        proteins: 0,
        carbs: 0,
        fats: 0
      };

    if (!_.isEmpty(products)) {
      products.forEach((product, index) => {
        const { calories, proteins, carbs, fats } = this.macrosPerProduct(product);

        calArr[index] = 0;
        proArr[index] = 0;
        carbArr[index] = 0;
        fatArr[index] = 0;

        calArr[index] += calories;
        proArr[index] += proteins;
        carbArr[index] += carbs;
        fatArr[index] += fats;
      });
    }

    reducedMacros.calories = calArr.reduce(this.reducer, 0) * serving;
    reducedMacros.proteins = proArr.reduce(this.reducer, 0) * serving;
    reducedMacros.carbs = carbArr.reduce(this.reducer, 0) * serving;
    reducedMacros.fats = fatArr.reduce(this.reducer, 0) * serving;

    return reducedMacros;
  }

  static macrosPerMeal(meal = this.isRequired('meal')) {
    const { products, recipes, part } = meal;

    const macrosFromMealProducts = this.reduceMacros(products);
    const macrosFromRecipeProducts = this.reduceRecipes(recipes);

    const calories = macrosFromMealProducts.calories + macrosFromRecipeProducts.calories;
    const proteins = macrosFromMealProducts.proteins + macrosFromRecipeProducts.proteins;
    const carbs = macrosFromMealProducts.carbs + macrosFromRecipeProducts.carbs;
    const fats = macrosFromMealProducts.fats + macrosFromRecipeProducts.fats;

    return {
      name: part,
      calories,
      proteins,
      carbs,
      fats
    };
  }

  static reduceRecipes(recipes = this.isRequired('recipes')) {
    const reducedMacros = {
      calories: 0,
      proteins: 0,
      carbs: 0,
      fats: 0
    };

    if (!_.isEmpty(recipes)) {
      recipes.forEach(({ recipe, serving }) => {
        const macrosFromRecipe = this.reduceMacros(recipe.products, serving);

        reducedMacros.calories += macrosFromRecipe.calories;
        reducedMacros.proteins += macrosFromRecipe.proteins;
        reducedMacros.carbs += macrosFromRecipe.carbs;
        reducedMacros.fats += macrosFromRecipe.fats;
      });
    }
    return reducedMacros;
  }

  static macrosRemaining(meals = this.isRequired('meals'), goals = this.isRequired('goals')) {
    let mealsArr = _.map(meals),
      calArr = [],
      proArr = [],
      carbArr = [],
      fatArr = [],
      remainingMacros = {
        rCalories: 0,
        rProteins: 0,
        rCarbs: 0,
        rFats: 0
      };

    if (!_.isEmpty(mealsArr)) {
      mealsArr.forEach((meal, index) => {
        const macrosPerMeal = this.macrosPerMeal(meal);

        calArr[index] = 0;
        proArr[index] = 0;
        carbArr[index] = 0;
        fatArr[index] = 0;

        if (!_.isEmpty(macrosPerMeal)) {
          calArr[index] += macrosPerMeal.calories;
          proArr[index] += macrosPerMeal.proteins;
          carbArr[index] += macrosPerMeal.carbs;
          fatArr[index] += macrosPerMeal.fats;
        }
      });
    }

    remainingMacros.rCalories = goals.calories - calArr.reduce(this.reducer, 0);
    remainingMacros.rProteins = goals.proteins - proArr.reduce(this.reducer, 0);
    remainingMacros.rCarbs = goals.carbs - carbArr.reduce(this.reducer, 0);
    remainingMacros.rFats = goals.fats - fatArr.reduce(this.reducer, 0);

    return remainingMacros;
  }

  static enumerateDaysBetweenDates(startDate, endDate, format) {
    let now = startDate,
      datesLabels = {};

    while (now.isSameOrBefore(endDate)) {
      datesLabels[now.format(format)] = 0;
      now.add(1, 'days');
    }
    return datesLabels;
  }

  static datesArr(datesObj) {
    let dates = Object.assign({}, datesObj);
    let datesArr = [];

    for (var key in dates) {
      datesArr.push(key);
    }
    return datesArr;
  }

  static caloriesHistory(dateObj, meals) {
    let dates = Object.assign({}, dateObj);

    let caloriesHistory = [];

    meals.forEach(meal => {
      dates[moment(meal.date).format('YYYY-MM-DD')] += this.macrosPerMeal(meal).calories;
    });

    for (var key in dates) {
      caloriesHistory.push(dates[key]);
    }

    return caloriesHistory;
  }

  static weightsHistory(dateObj, weights) {
    let dates = Object.assign({}, dateObj);

    let weightHistory = [];

    weights.forEach(weight => {
      if (dates.hasOwnProperty(moment(weight.date).format('YYYY-MM-DD')))
        dates[moment(weight.date).format('YYYY-MM-DD')] = weight.weight;
    });

    for (var key in dates) {
      weightHistory.push(dates[key]);
    }

    return weightHistory;
  }
}

export default HomeInfo;

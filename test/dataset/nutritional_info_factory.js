NutritionalInfo = require('../../models/nutritional_info');

module.exports = {
    validNutritionalInfo() {
        return new NutritionalInfo({
            carb: 15,
            fat: 10,
            protein: 25,
            calories: 150
        });
    },
    /**
    * required
    */
    emptyCarbs() {
        return new NutritionalInfo({
            fat: 10,
            protein: 25,
            calories: 150
        });
    },
    emptyProtein() {
        return new NutritionalInfo({
            carb: 15,
            fat: 10,
            calories: 150
        });
    },
    emptyFat() {
        return new NutritionalInfo({
            carb: 15,
            protein: 25,
            calories: 150
        });
    },
}
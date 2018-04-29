const expect = require('chai').expect;
const assert = require('assert');
const NutritionalInfo = require('../../models/nutritional_info');
const factories = require('../dataset/nutritional_info_factory');


describe('Entity test - Nutritional info', () => {
    let nutrition;

    it('should be valid if nutritional info match the correct format', (done) => {
        nutrition = factories.validNutritionalInfo();

        nutrition.validate((err) => {
            assert(err === null);
            done();
        });
    });

    it('should be invalid if carbs are empty', (done) => {

        user = factories.emptyCarbs();

        user.validate((err) => {
            expect(err.errors.carb).to.exist;
            done();
        });
    });

    it('should be invalid if proteins are empty', (done) => {

        user = factories.emptyProtein();

        user.validate((err) => {
            expect(err.errors.protein).to.exist;
            done();
        });
    });

    it('should be invalid if fats are empty', (done) => {

        user = factories.emptyFat();

        user.validate((err) => {
            expect(err.errors.fat).to.exist;
            done();
        });
    });
});
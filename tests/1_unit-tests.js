const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Function convertHandler.getNum(input)", function () {
    test("convertHandler should correctly read a whole number input.", function (done) {
      let input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test("convertHandler should correctly read a decimal number input.", function (done) {
      let input = "2.5km";
      assert.equal(convertHandler.getNum(input), 2.5);
      done();
    });

    test("convertHandler should correctly read a fractional input.", function (done) {
      let input = "1/2gal";
      assert.equal(convertHandler.getNum(input), 1 / 2);
      done();
    });

    test("convertHandler should correctly read a fractional input with a decimal.", function (done) {
      let input = "1/2.5lbs";
      assert.equal(convertHandler.getNum(input), 0.4);
      done();
    });

    test("convertHandler should correctly return an error on a double-fraction.", function (done) {
      let input = "3/2/3";
      assert.equal(convertHandler.getNum(input), "invalid number");
      done();
    });

    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", function (done) {
      let input = "km";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  suite("Function convertHandler.getUnit(input)", function () {
    test("convertHandler should correctly read each valid input unit.", function (done) {
      let input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG",
      ];
      input.forEach(function (ele) {
        assert.equal(convertHandler.getUnit(32 + ele), ele);
      });
      done();
    });

    test("convertHandler should correctly return an error for an invalid input unit.", function (done) {
      let input = "12g";
      assert.equal(convertHandler.getUnit(input), "invalid unit");
      done();
    });
  });

  suite("Function convertHandler.getReturnUnit(initUnit)", function () {
    test("convertHandler should return the correct return unit for each valid input unit.", function (done) {
      let input = ["gal", "l", "mi", "km", "lbs", "kg"];
      let expect = ["L", "gal", "km", "mi", "kg", "lbs"];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.spellOutUnit(unit)", function () {
    test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", function (done) {
      let input = ["gal", "l", "mi", "km", "lbs", "kg"];
      let expect = [
        "gallons",
        "liters",
        "miles",
        "kilometers",
        "pounds",
        "kilograms",
      ];
      input.forEach(function (ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.convert(num, unit)", function () {
    test("convertHandler should correctly convert gal to L.", function (done) {
      let input = [5, "gal"];
      let expected = 18.9271;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("convertHandler should correctly convert L to gal.", function (done) {
      let input = [5, "l"];
      let expected = 1.32086;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("convertHandler should correctly convert mi to km.", function (done) {
      let input = [5, "mi"];
      let expected = 8.04672;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("convertHandler should correctly convert km to mi.", function (done) {
      let input = [5, "km"];
      let expected = 3.10686;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("convertHandler should correctly convert lbs to kg.", function (done) {
      let input = [5, "lbs"];
      let expected = 2.26796;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("convertHandler should correctly convert kg to lbs.", function (done) {
      let input = [5, "kg"];
      let expected = 11.0231;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });
  });
});

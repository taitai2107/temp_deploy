const carsjs = require("../../cars.json");
const db = require("../models/index");
let decode = require("../service/insertCars");

const insertCategory = async (req, res) => {
  try {
    let cate = Object.keys(carsjs);

    cate.forEach(async (a) => {
      await db.categories.create({
        Code: decode.decode(a),
        CategoryName: a,
      });
    });
    res.json("ok");
  } catch (error) {
    console.log(error);
  }
};
let insertCars = async (req, res) => {
  try {
    let car = Object.entries(carsjs);
    // car.forEach((a) => {
    //   a[1].forEach(async (b) => {
    //     await db.cars.create({
    //       NameCar: b.Name,
    //       MperGalon: b.Miles_per_Gallon,
    //       Cylinders: b.Cylinders,
    //       Horsepower: b.Horsepower,
    //       Weight: b.Weight_in_lbs,
    //       Acceleration: b.Acceleration,
    //       Year: b.Year,
    //       Origin: b.Origin,
    //       Code: decode.decode(a[0]),
    //     });
    //   });
    // });
    // res.json("ok");
    const testCar = car[0][1][0];
    car.forEach((a) => {
      a[1].forEach(async (b) => {
        await db.cars.create({
          NameCar: b.Name,
          MperGalon: b.Miles_per_Gallon,
          Cylinders: b.Cylinders,
          Horsepower: b.Horsepower,
          Weight: b.Weight_in_lbs,
          Acceleration: b.Acceleration,
          Year: b.Year,
          Origin: b.Origin,
          Code: decode.decode(a[0]),
        });
      });
    });

    res.json("ok");
  } catch (error) {
    console.log(error);
  }

  // console.log(car[0][1][0]);
};
module.exports = {
  insertCategory,
  insertCars,
};

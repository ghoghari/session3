var mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/TeenPattiGoldLuckyClubDb")
  .then(() => {
    console.log("conn okay");
  })
  .catch((e) => {
    console.log(e);
  });

var mongoose = require("mongoose");

var firstSchema = new mongoose.Schema({
  Username: {
    type: String,
  },
  Phone: {
    type: String,
  },
  Email: {
    type: String,
  },
  Coin: {
    type: String,
  },
  otp: {
    type: String,
  },
});

var Todo = mongoose.model("TeenPattiGoldLuckyClubUserCollection", firstSchema);

const SecondSchema = new mongoose.Schema({
  RemainingTime: {
    type: String,
  },
  WinningNumber: {
    type: String,
  },
  TotleGameTime: {
    type: String,
  },
  GameArray: {
    type: Array,
  },
  LastWinningNumber: {
    type: String,
  },
});

const Todo2 = new mongoose.model(
  "TeenPattiGoldLuckyClubGameCollection",
  SecondSchema
);

const ThirdSchema = new mongoose.Schema({
  Id: {
    type: String,
  },
  Email: {
    type: String,
  },
  Rupees: {
    type: String,
  },
});

const Todo3 = new mongoose.model("DepositCollection", ThirdSchema);

const FourthSchema = new mongoose.Schema({
  Email: {
    type: String,
  },
  Rupees: {
    type: String,
  },
  UpiId: {
    type: String,
  },
});

const Todo4 = new mongoose.model("WithdrawCollection", FourthSchema);

module.exports = { Todo, Todo2, Todo3, Todo4 };

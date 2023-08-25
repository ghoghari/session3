var { Todo, Todo2, Todo3, Todo4 } = require("../model/schema");
const HTTP = require("../../constant/response.constant");

var path = require("path");
var nodemailer = require("nodemailer");

const session = require("express-session");

function sendEmail(to, subject, text) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shzksklf315@gmail.com",
      pass: "hbsehwvznlahcxno",
    },
  });
  const mailOptions = {
    from: "your@email.com",
    to: to,
    subject: subject,
    html: text,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

class class1 {
  static a = async (req, res) => {
    try {
      if (req.body.Email) {
        if (req.body.Email == "shzksklf315@gmail.com") {
          var user = await Todo4.find({});
          var user2 = await Todo2.find({});
          res.render("Admin", { user, user2 });
        } else {
          res.render("User");
        }
      } else {
        res.redirect("Login");
      }
    } catch (e) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static b = async (req, res) => {
    try {
      if (req.body.Email) {
        if (req.body.BetNumber && req.body.BetAmount) {
          var a = Number(req.body.BetAmount);
          var roundedNumber = Number(req.body.BetNumber);
          if (Number.isInteger(roundedNumber)) {
            if (roundedNumber >= 0 && roundedNumber <= 11) {
              var user = await Todo.find({ Email: req.body.Email });
              user[0].Coin = Number(user[0].Coin) - Number(req.body.BetAmount);
              console.log(user[0].Coin);
              if (user[0].Coin >= 0) {
                user[0].save();
                var OriginalData = await Todo2.find({});
                for (var i = 0; i < OriginalData[0].GameArray.length; i++) {
                  var a = await OriginalData[0].GameArray[i];
                  if (i == req.body.BetNumber) {
                    await a.push([req.body.Email, req.body.BetAmount]);
                  } else {
                    await a.push([req.body.Email, 0]);
                  }
                  OriginalData[0].GameArray[i] = a;
                  await OriginalData[0].save();
                }
                res.send(user);
                // const message = "Bet Added";
                // res.json({ message });
              } else {
                res.send("Please Enter Valid Rupees");
              }
            } else {
              res.send("Please Choose Valid Bet Number");
            }
          } else {
            res.send("Please Choose Valid Bet Number");
          }
        } else {
          res.send("Insufficient Data");
        }
      } else {
        res.redirect("Login");
      }
    } catch (err) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static c = async (req, res) => {
    try {
      res.sendFile(path.join(__dirname, "../../index.html"));
    } catch (err) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static d = async (req, res) => {
    try {
      // if (req.body.Username && req.body.Phone && req.body.Email) {
      if (req.body.Email) {
        var otp = between(100000, 999999);
        var user = await Todo.find({ Email: req.body.Email });
        if (user.length == 0) {
          if (req.body.Username && req.body.Phone) {
            // var sessionstore = req.session;
            // sessionstore.Username = req.body.Username;
            // sessionstore.Phone = req.body.Phone;
            // sessionstore.VerifyEmail = req.body.Email;
            // sessionstore.Otp = otp;
            // sessionstore.save();
            var addingMensRecords = new Todo({
              Username: req.body.Username,
              Phone: req.body.Phone,
              Email: req.body.Email,
              Coin: 0,
              otp: otp,
            });
            await addingMensRecords.save();
            sendEmail(
              `${req.body.Email}`,
              "Sending Email using Node.js",
              `${otp}`
            );
            res.json("otp send");
          } else {
            res.json("Insufficient Data");
          }
        } else {
          // var sessionstore = req.session;
          // sessionstore.Username = req.body.Username;
          // sessionstore.Phone = req.body.Phone;
          // sessionstore.VerifyEmail = req.body.Email;
          // sessionstore.Otp = otp;
          // sessionstore.save();
          var updateuser = await Todo.findOneAndUpdate(
            { Email: req.body.Email },
            { $set: { otp: otp } }
          );
          await updateuser.save();
          sendEmail(
            `${req.body.Email}`,
            "Sending Email using Node.js",
            `${otp}`
          );
          res.json("otp send");
        }
      } else {
        res.json("Insufficient Data");
      }
    } catch (err) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static e = async (req, res) => {
    try {
      if (req.body.Email) {
        var user = await Todo.find({ Email: req.body.Email });
        if (Number(user[0].otp) == Number(req.body.Otp)) {
          // var sessionstore = req.session;
          // var EmailVariable = await req.session.VerifyEmail;
          // sessionstore.Email = EmailVariable;
          // sessionstore.save();
          // var user = await Todo.find({ Email: req.body.Email });
          // if (user.length == 0) {
          //   var addingMensRecords = new Todo({
          //     Username: req.session.Username,
          //     Phone: req.session.Phone,
          //     Email: req.session.VerifyEmail,
          //     Coin: 0,
          //   });
          //   await addingMensRecords.save();
          //   var user = {
          //     Username: req.session.Username,
          //     Phone: req.session.Phone,
          //     Email: req.session.VerifyEmail,
          //     Coin: 0,
          //   };
          // }
          // res.json(user);
          res.send("User Login");
        } else {
          return res.status(500).send({
            errors: [
              {
                message: "Wrong Otp",
                code: HTTP.INTERNAL_SERVER_ERROR,
              },
            ],
          });
        }
      } else {
        res.send("Insufficient Data");
      }
    } catch (err) {
      console.log(err);
      return res.status(404).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static f = async (req, res) => {
    try {
      if (req.body.Email) {
        if (req.body.Id && req.body.Coin) {
          var a = Number(req.body.Coin);
          if (a >= 0) {
            var addingMensRecords = new Todo3({
              Id: req.body.Id,
              Email: req.body.Email,
              Rupees: req.body.Coin,
            });
            await addingMensRecords.save();
            var user = await Todo.find({ Email: req.body.Email });
            user[0].Coin = Number(user[0].Coin) + Number(req.body.Coin);
            user[0].save();
            res.send("Deposited money in the game");
          } else {
            res.send("Please Enter Valid Rupees");
          }
        } else {
          res.send("Insufficient Data");
        }
      } else {
        res.send("Please Login");
      }
    } catch (e) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static g = async (req, res) => {
    try {
      if (req.body.Email) {
        if (req.body.Coin) {
          var user = await Todo.find({ Email: req.body.Email });
          if (Number(user[0].Coin) >= Number(req.body.Coin)) {
            var a = Number(req.body.Coin);
            if (a >= 0) {
              user[0].Coin = Number(user[0].Coin) - Number(req.body.Coin);
              user[0].save();
              var addingMensRecords = new Todo4({
                Email: req.body.Email,
                Rupees: req.body.Coin,
                UpiId: req.body.UpiId,
              });
              await addingMensRecords.save();
              res.send("Money withdrawn from the game");
            } else {
              res.send("Please Enter Valid Rupees");
            }
          } else {
            res.send("You Are Not Sufficient Coin");
          }
        } else {
          res.send("Insufficient Data");
        }
      } else {
        res.send("Please Login");
      }
    } catch (err) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static h = async (req, res) => {
    try {
      if (req.body.WinningNumber) {
        var WinningNumber = req.body.WinningNumber;
      }
      var OriginalData = await Todo2.find({});
      if (!OriginalData[0]) {
        let data = new Todo2({
          RemainingTime: 10,
          WinningNumber: WinningNumber,
          TotleGameTime: 25,
          GameArray: [[], [], [], [], [], [], [], [], [], [], [], []],
          LastWinningNumber: 0,
        });
        await data.save();
      } else if (OriginalData[0].RemainingTime == 0) {
        function indexOfMinValue(array) {
          if (array.length === 0) {
            return -1; // Return -1 for an empty array
          }

          let minValue = array[0];
          let minIndex = 0;

          for (let i = 1; i < array.length; i++) {
            if (array[i] < minValue) {
              minValue = array[i];
              minIndex = i;
            }
          }

          return minIndex;
        }
        var user = await Todo2.find({});
        var AmountArray = [];
        var WinningUser = [];
        var WinningUserPayAmount = [];
        for (var i = 0; i < user[0].GameArray.length; i++) {
          var TotalAmountPerNumber = 0;
          for (var j = 0; j < user[0].GameArray[i].length; j++) {
            TotalAmountPerNumber =
              TotalAmountPerNumber + user[0].GameArray[i][j][1];
          }
          AmountArray.push(TotalAmountPerNumber);
        }
        if (user[0].WinningNumber) {
          var WinningNumberIndex = user[0].WinningNumber;
        } else {
          var WinningNumberIndex = indexOfMinValue(AmountArray);
        }
        for (var i = 0; i < user[0].GameArray.length; i++) {
          if (i == WinningNumberIndex) {
            for (var k = 0; k < user[0].GameArray[i].length; k++) {
              WinningUser.push(user[0].GameArray[i][k][0]);
              WinningUserPayAmount.push(user[0].GameArray[i][k][1] * 10);
            }
          }
        }
        for (var abc = 0; abc < WinningUser.length; abc++) {
          var user2 = await Todo.findOne({ Email: WinningUser[abc] });
          user2.Coin = Number(user2.Coin) + Number(WinningUserPayAmount[abc]);
          user2.save();
        }
        await Todo2.find({}).deleteOne();
        let data = new Todo2({
          RemainingTime: 10,
          WinningNumber: WinningNumber,
          TotleGameTime: 25,
          GameArray: [[], [], [], [], [], [], [], [], [], [], [], []],
          LastWinningNumber: WinningNumberIndex,
        });
        await data.save();
      } else {
      }
      const message = "Data Added";
      res.json({ message });
    } catch (err) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static i = async (req, res) => {
    var OriginalData = await Todo2.find({});
    for (var i = 0; i < OriginalData.length; i++) {
      if (OriginalData[i].RemainingTime > 0) {
        OriginalData[i].RemainingTime = OriginalData[i].RemainingTime - 1;
      }
      if (OriginalData[i].TotleGameTime > 0) {
        OriginalData[i].TotleGameTime = OriginalData[i].TotleGameTime - 1;
        OriginalData[i].save();
      } else {
        fetch(`http://${process.env.URL}/Add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
      }
    }
  };
  static j = async (req, res) => {
    try {
      var user = await Todo2.find({});
      res.send(user);
    } catch (e) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static k = async (req, res) => {
    try {
      if (req.body.Email) {
        var user = await Todo.find({ Email: req.body.Email });
        res.send(user);
      } else {
        res.redirect("Login");
      }
    } catch (e) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
}

module.exports = { class1 };

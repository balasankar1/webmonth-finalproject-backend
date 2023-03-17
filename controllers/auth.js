const bcrypt = require("bcrypt");

const client = require("../configs/db");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res) => {
  const { name, email, password } = req.body;

  client
    .query(`SELECT * FROM users WHERE email = '${email}';`)
    .then((data) => {
      isValid = data.rows;
      if (isValid.length != 0) {
        res.status(400).json({
          error: "User already exists",
        });
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              error: "Internal server error",
            });
          }

          const user = {
            name,
            email,
            password: hash,
          };
          client
            .query(
              `INSERT INTO users (name,email,password) VALUES ('${user.name}','${user.email}','${user.password}');`
            )
            .then((data) => {
              console.log(data);
              const token = jwt.sign(
                {
                  email: email,
                },
                process.env.SECRET_KEY
              );

              res.status(200).json({
                message: "User added sucessfully in database",
                token: token,
              });
            })
            .catch((err) => {
              res.status(500).json({
                error: "database error occured",
              });
            });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Databse error ocucured",
      });
    });
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;

  client
    .query(`SELECT * FROM users where email = '${email}';`)
    .then((data) => {
      //   console.log(data);
      userData = data.rows;
      //   console.log(userData);
      //   console.log(userData[0]);
      if (userData.length === 0) {
        res.status(400).json({
          error: "User doesnot exists, signup instead",
        });
      } else {
        bcrypt.compare(password, userData[0].password, (err, result) => {
          if (err) {
            res.status(500).json({
              error: "Enter correct password",
            });
          } else if (result === true) {
            const token = jwt.sign(
              {
                email: email,
              },
              process.env.SECRET_KEY
            );

            res.status(200).json({
              message: "User signed in successfully",
              token: token,
            });
          } else {
            res.status(400).json({
              error: "unauthorised",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Databse error ocucured",
      });
    });
};

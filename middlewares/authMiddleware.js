const jwt = require("jsonwebtoken");
const client = require("../configs/db");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(500).json({
        error: "server error occured",
      });
    }
    const userEmail = decoded.email;
    // console.log(userEmail);
    client
      .query(`SELECT * FROM users WHERE email = '${userEmail}';`)
      .then((data) => {
        if (data.rows.length === 0) {
          res.status(400).json({
            message: "invalidToken",
          });
        } else {
          console.log("hi");
          req.email = userEmail;
          console.log(req.email);
          console.log("hi");
          next();
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "database error occured",
        });
      });
  });

  next();
};

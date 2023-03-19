const jwt = require("jsonwebtoken");
const client = require("../configs/db");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(500).json({
        error: "serve rerror occured",
      });
    }
    const userEmail = decoded.email;

    client
      .query(`SELECT * FROM users WHERE email = '${email}';`)
      .then((data) => {
        if (data.rows.length != 0) {
          res.status(400).json({
            message: "invalidToken",
          });
        } else {
          req.email = userEmail;
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

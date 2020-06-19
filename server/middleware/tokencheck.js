const jwt = require("jsonwebtoken");
module.exports = function(req, res, next) {
  const token = req.header("token");
  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }
  try {
    const verify = jwt.verify(token,"secretkey");
    req.token = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

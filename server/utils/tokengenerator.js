const jwt = require("jsonwebtoken");
function tokengenerator(user_id) {
  const payload = {
    user: {
      id: user_id
    }
  };
  return jwt.sign(payload,"secretkey", { expiresIn: "1h" });
}

module.exports = tokengenerator;

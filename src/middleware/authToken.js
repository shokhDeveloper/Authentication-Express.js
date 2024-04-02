const { verify } = require("jsonwebtoken");
const authToken = (req, res, next) => {
  try {
    const users = req.getData("users");
    const { token } = req.headers;
    const { payload } = verify(token, "SECRET_KEY");
    const idx = users.findIndex((user) => user.userId == payload);
    if (idx >= 0) {
      return next();
    } else {
      throw new Error("Invalid token");
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};
module.exports = { authToken };

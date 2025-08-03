const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.headers["authorization"].replace("Bearer ", "");
    if (!token) {
      return res.json({
        success: false,
        message: "token not found",
      });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_KEY);
      if (!decodedToken) {
        return res.json({
          success: false,
          message: "token invalid",
        });
      }
      req.user = decodedToken;

      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "error decoding token",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "error middleware",
    });
  }
};

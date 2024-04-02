const authRouter = require("express").Router();
const { authController } = require("../controller/auth.js")
const {validator} = require("../middleware/validator.js")

authRouter.route("/register").post( validator.register_validator , authController.REGISTER)
authRouter.route("/login").post(validator.email_validator, authController.LOGIN);

module.exports = {authRouter}
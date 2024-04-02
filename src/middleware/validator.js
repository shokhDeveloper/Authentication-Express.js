const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const dateRegEx =
  /^\d{4}-(02-(0[1-9]|[12][0-9])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))$/;
const validator = {
  register_validator: function (req, res, next) {
    try {
      const { name, lastname, email, password, birthDate } = req.body;

      if (!name) throw new Error("Name its required");
      if (!lastname) throw new Error("Lastname its required");
      if (!email) throw new Error("Email its required");
      if (!password) throw new Error("Password its required");
      if (!birthDate) throw new Error("Birth date its required");

      if (name.length < 3 || name.length > 20)
        throw new Error("Name its invalid");
      if (lastname.length < 3 || lastname.length > 20)
        throw new Error("Lastname its imvalid");
      if (!email.length || !emailRegex.test(email))
        throw new Error("Email its invalid");
      if (password.length < 4 || password.length > 16)
        throw new Error("Password its invalid");
      if (!birthDate.length || !dateRegEx.test(birthDate))
        throw new Error("Birthdate its invalid");

      return next();
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
  email_validator: function (req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email.length || !emailRegex.test(email))
        throw new Error("Email its invalid");
      if (password.length < 4 || password.length > 16)
        throw new Error("Password its invalid");
        return next();
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
};

module.exports = { validator };

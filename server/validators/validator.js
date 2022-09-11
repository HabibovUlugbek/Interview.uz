const isEmpty = require("is-empty");
const validator = require("validator");

module.exports.loginValidator = (data) => {
  let errors = {};
  let emailError = validator.isEmpty(data.email)
    ? "Email is required"
    : !validator.isEmail(data.email)
    ? "Please provide valid email"
    : "";

  let passwordError = validator.isEmpty(data.password)
    ? "Password is required"
    : "";

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports.registerValidator = (data) => {
  let errors = {};
  let emailError = validator.isEmpty(data.email)
    ? "Email is required"
    : !validator.isEmail(data.email)
    ? "Please provide valid email"
    : "";

  let passwordError = validator.isEmpty(data.password)
    ? "Password is required"
    : "";
  let firstnameError = validator.isEmpty(data.firstName)
    ? "Name is required"
    : "";
  let lastNameError = validator.isEmpty(data.lastName)
    ? "Lastname is required"
    : "";

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  if (firstnameError || lastNameError) errors.fullname = "Fullname is required";

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

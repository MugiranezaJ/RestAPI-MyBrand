"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parserError = parserError;

function parserError(error) {
  var errors = {};

  if (error.message.includes("validation failed")) {
    Object.values(error.errors).forEach(function (_ref) {
      var properties = _ref.properties;
      var path = properties.path;
      errors[path] = properties.message;
    });
  }

  return errors;
}
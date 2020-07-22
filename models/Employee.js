const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  id: { type: String, unique: true },
  login: String,
  name: String,
});

module.exports = Employee = mongoose.model("employees", EmployeeSchema);

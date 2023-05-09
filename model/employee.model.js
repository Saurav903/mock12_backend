const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    first:String,
    last:String,
    email:String,
    department:String,
    date:Number,
    salary:Number
})

const EmployeeModel = mongoose.model("employee",employeeSchema);

module.exports={
    EmployeeModel
}
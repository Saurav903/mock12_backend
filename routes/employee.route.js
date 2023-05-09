const express = require("express");
const { EmployeeModel } = require("../model/employee.model");

const employeeRouter = express.Router();

employeeRouter.get("/",async(req,res)=>{
    let employee = await EmployeeModel.find();
    res.send(employee);
})

employeeRouter.post("/",async(req,res)=>{
    const {first,last,email,department,date,salary} = req.body;
    let employee = new EmployeeModel({first,last,email,department,date,salary});
    await employee.save();
    res.send(employee,"employee has been added");
})
employeeRouter.delete("/:id",async(req,res)=>{
    const id = req.params.id;
    let employee = await EmployeeModel.findOne({_id:id});
    try {
        await EmployeeModel.findByIdAndDelete({_id:id})
    } catch (error) {
        console.log(error);
        res.send("Not able delete");
    }
})

module.exports={
    employeeRouter
}
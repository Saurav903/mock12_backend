const express = require("express");
const {connection} = require("./db");
const cors = require("cors");

require("dotenv").config();
const {authenticate} = require("./middleware/auth.middleware");
const { userRouter } = require("./routes/auth.route");
const { employeeRouter } = require("./routes/employee.route");
const app = express();

app.use(express.json());

app.use(cors({
    origin:"*"
}))

app.get("/",(req,res)=>{
    res.send("Home Page");
});
app.use("/",userRouter);
app.use(authenticate);
app.use("/employee",employeeRouter);
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to DB");
    } catch (error) {
        console.log(error.message);
    }
    console.log("server running at port: 8080");
})
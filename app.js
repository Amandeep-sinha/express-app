const express = require('express');
const app = express();
const port = 3000;
let cars = require("./database/carsDb")
app.listen(port, (req, res)=>{
    console.log("Server UP, Hurray!!");
    console.log("App is listening to port :-", port)
})

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Connected to server successfully");
})

app.get("/cars", (req, res)=>{
    res.status(200).json({data: cars})
})

app.post("/cars/add", (req, res)=>{
    const temp = cars.filter((ele)=> ele.id == req.body.id )
    console.log("getting request")
    if(!temp.length){
        cars.push(req.body);
        return res.status(200).json({data:req.body});
    }
    return res.status(200).json({data:"This Id is already present in the database"});
})

app.delete("/cars/remove", (req, res)=>{
    const temp = cars.filter((ele)=>ele.id != req.body.id)
    cars = temp;
    res.status(200).json({data:"succesfully deleted"});
})
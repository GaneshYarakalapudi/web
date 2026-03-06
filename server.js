const express = require("express");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

let users = [
    { email: "user@gmail.com", password: "12345" }
];

let generatedOTP = "";

/* File Upload Setup */

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads/");
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

/* Login API */

app.post("/login", (req,res)=>{

    const {email,password} = req.body;

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if(user){
        res.json({success:true,message:"Login successful"});
    }else{
        res.json({success:false,message:"User not registered"});
    }

});

/* Upload ID API */

app.post("/upload", upload.single("document"), (req,res)=>{

    if(!req.file){
        return res.json({success:false,message:"No file uploaded"});
    }

    res.json({
        success:true,
        message:"Document uploaded successfully"
    });

});

/* Generate OTP */

app.get("/generate-otp",(req,res)=>{

    generatedOTP = Math.floor(1000 + Math.random() * 9000);

    res.json({
        otp:generatedOTP
    });

});

/* Verify OTP */

app.post("/verify-otp",(req,res)=>{

    const {otp} = req.body;

    if(otp == generatedOTP){
        res.json({success:true,message:"OTP verified"});
    }else{
        res.json({success:false,message:"Invalid OTP"});
    }

});

/* Start Server */

app.listen(3000,()=>{
    console.log("Server running on http://localhost:3000");
});
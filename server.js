const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

/* Serve frontend files */
app.use(express.static("public"));

/* Ensure uploads folder exists */
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

/* Dummy user database */
const users = [
  { email: "user@gmail.com", password: "12345" }
];

let generatedOTP = "";

/* ================= LOGIN API ================= */

app.post("/login", (req, res) => {

  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (user) {

    res.json({
      success: true,
      message: "Login Successful"
    });

  } else {

    res.json({
      success: false,
      message: "User not registered. Please register first."
    });

  }

});

/* ================= FILE UPLOAD ================= */

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }

});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("document"), (req, res) => {

  if (!req.file) {
    return res.json({
      success: false,
      message: "No file uploaded"
    });
  }

  res.json({
    success: true,
    message: "Document uploaded successfully"
  });

});

/* ================= GENERATE OTP ================= */

app.get("/generate-otp", (req, res) => {

  generatedOTP = Math.floor(1000 + Math.random() * 9000);

  res.json({
    success: true,
    otp: generatedOTP
  });

});

/* ================= VERIFY OTP ================= */

app.post("/verify-otp", (req, res) => {

  const { otp } = req.body;

  if (otp == generatedOTP) {

    res.json({
      success: true,
      message: "OTP verified successfully"
    });

  } else {

    res.json({
      success: false,
      message: "Invalid OTP"
    });

  }

});

/* ================= START SERVER ================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

let uploaded = false;

/* Upload ID */

function upload(){

document.getElementById("message").innerText="";

document.getElementById("content").innerHTML=`

<h3>Upload Government ID</h3>

<input type="file" id="fileUpload">

<br><br>

<button onclick="confirmUpload()">Upload</button>

`;

}

/* Confirm Upload */

async function confirmUpload(){

let file = document.getElementById("fileUpload").files[0];

if(!file){

document.getElementById("message").innerText =
"Please select a file before uploading.";

return;

}

let formData = new FormData();

formData.append("document", file);

let response = await fetch("http://localhost:3000/upload",{
method:"POST",
body:formData
});

let data = await response.json();

if(data.success){

uploaded=true;

document.getElementById("message").innerText=data.message;

}else{

document.getElementById("message").innerText=data.message;

}

}


/* OTP Verification */

async function otp(){

if(!uploaded){

document.getElementById("message").innerText =
"Please upload your ID before OTP verification.";

return;

}

let response = await fetch("http://localhost:3000/generate-otp");

let data = await response.json();

alert("Your OTP is: " + data.otp);

document.getElementById("content").innerHTML=`

<h3>OTP Verification</h3>

<input type="text" id="otpInput" placeholder="Enter OTP">

<br><br>

<button onclick="verifyOTP()">Verify OTP</button>

`;

}
async function verifyOTP(){

let otp = document.getElementById("otpInput").value;

let response = await fetch("http://localhost:3000/verify-otp",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({otp:otp})

});

let data = await response.json();

document.getElementById("message").innerText=data.message;

}

/* E-Signature */

function esign(){

if(!uploaded){

document.getElementById("message").innerText =
"Please upload your ID before signing.";

return;

}

document.getElementById("content").innerHTML=`

<h3>E-Sign Agreement</h3>

<canvas id="canvas" width="400" height="200" style="border:1px solid black"></canvas>

<br><br>

<button onclick="clearCanvas()">Clear</button>

`;

draw();

}


/* Document List */

function documents(){

if(!uploaded){

document.getElementById("message").innerText =
"Please upload your ID to view documents.";

return;

}

document.getElementById("content").innerHTML=`

<h3>My Documents</h3>

<ul>
<li>ID Verification - Pending</li>
<li>Agreement - Not Signed</li>
</ul>

`;

}


/* Signature Drawing */

function draw(){

let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");
let drawing=false;

canvas.onmousedown=function(){drawing=true;}

canvas.onmouseup=function(){drawing=false;}

canvas.onmousemove=function(e){

if(drawing){

ctx.lineTo(e.offsetX,e.offsetY);
ctx.stroke();

}

}

}


/* Clear Signature */

function clearCanvas(){

let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");

ctx.clearRect(0,0,canvas.width,canvas.height);

}
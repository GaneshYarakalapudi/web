function login(){

document.getElementById("loginPage").style.display="none";

document.getElementById("dashboardPage").style.display="block";

}


function upload(){

document.getElementById("content").innerHTML=`

<h3>Upload Government ID</h3>

<input type="file">

<br><br>

<button>Upload</button>

`;

}


function otp(){

document.getElementById("content").innerHTML=`

<h3>OTP Verification</h3>

<input placeholder="Enter OTP">

<br><br>

<button>Verify</button>

`;

}


function esign(){

document.getElementById("content").innerHTML=`

<h3>E-Signature</h3>

<canvas id="canvas" width="400" height="200" style="border:1px solid black"></canvas>

<br><br>

<button onclick="clearCanvas()">Clear</button>

`;

draw();

}


function documents(){

document.getElementById("content").innerHTML=`

<h3>My Documents</h3>

<ul>
<li>ID Verification – Pending</li>
<li>Agreement – Signed</li>
</ul>

`;

}


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


function clearCanvas(){

let canvas=document.getElementById("canvas");

let ctx=canvas.getContext("2d");

ctx.clearRect(0,0,canvas.width,canvas.height);

}
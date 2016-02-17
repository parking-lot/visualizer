var interval;
var scale = 40;
var pos = 0;
var frames;

function drawCar(ctx, i, j, dir, reverse) {
  var reverseDict = {"l": "r", "r": "l", "u": "d", "d": "u"};
  if (reverse) dir = reverseDict[dir];
  ctx.fillStyle = "#"+((1<<24)*Math.random()|0).toString(16); //"#07c";
  ctx.beginPath();
  switch(dir){
    case "l":
      ctx.moveTo((j+0.875)*scale, (i+0.75)*scale);
      ctx.arc((j+0.375)*scale, (i+0.5)*scale, scale*0.25, 0.5*Math.PI, 1.5*Math.PI);
      ctx.lineTo((j+0.875)*scale, (i+0.25)*scale);
      break;
    case "r":
      ctx.moveTo((j+0.125)*scale, (i+0.25)*scale);
      ctx.arc((j+0.625)*scale, (i+0.5)*scale, scale*0.25, 1.5*Math.PI, 0.5*Math.PI);
      ctx.lineTo((j+0.125)*scale, (i+0.75)*scale);
      break;
    case "u":
      ctx.moveTo((j+0.75)*scale, (i+0.875)*scale);
      ctx.arc((j+0.5)*scale, (i+0.375)*scale, scale*0.25, 0*Math.PI, 1*Math.PI, true);
      ctx.lineTo((j+0.25)*scale, (i+0.875)*scale);
      break;
    case "d":
      ctx.moveTo((j+0.25)*scale, (i+0.125)*scale);
      ctx.arc((j+0.5)*scale, (i+0.625)*scale, scale*0.25, 1*Math.PI, 0*Math.PI, true);
      ctx.lineTo((j+0.75)*scale, (i+0.125)*scale);
      break;
  }
  ctx.closePath();
  ctx.fill();
}

function drawParkingSpace(ctx, i, j, dir) {
  switch (dir) {
  case "l":
    
    ctx.fillStyle = "#f7df1e";
    ctx.fillRect(j*scale, i*scale, scale, scale);
    ctx.fillStyle = "#A9A9A9";
    ctx.fillRect(j*scale, i*scale + 5, scale-5, scale-10);
    break;
  case "r":
    ctx.fillStyle = "#f7df1e";
    ctx.fillRect(j*scale, i*scale, scale, scale);
    ctx.fillStyle = "#A9A9A9";
    ctx.fillRect(j*scale+5, i*scale + 5, scale, scale-10);
    break;
  case "u":
    ctx.fillStyle = "#f7df1e";
    ctx.fillRect(j*scale, i*scale, scale, scale);
    ctx.fillStyle = "#A9A9A9";
    ctx.fillRect(j*scale+5, i*scale + 5, scale, scale-10);
    break;
  case "d":
    ctx.fillStyle = "#f7df1e";
    ctx.fillRect(j*scale, i*scale, scale, scale);
    ctx.fillStyle = "#A9A9A9";
    ctx.fillRect(j*scale+5, i*scale + 5, scale, scale-10);
    break;
  }
}

function drawRoad(ctx, i, j, dir) {
  ctx.fillStyle = "#000";
  ctx.fillRect(j*scale, i*scale, scale, scale);
    switch(dir){
              case "r":
                ctx.beginPath();
                ctx.moveTo(j*scale+scale-8,i*scale+10);
                ctx.lineTo(j*scale+scale,i*scale+scale/2);
                ctx.lineTo(j*scale+scale-8,i*scale+scale-10)
                ctx.strokeStyle = "#ffffff";
                ctx.stroke();
            
                break;
              case "l":
                ctx.beginPath();
                ctx.moveTo(j*scale+8,i*scale+10);
                ctx.lineTo(j*scale,i*scale+scale/2);
                ctx.lineTo(j*scale+8,i*scale+scale-10)
                ctx.strokeStyle = "#ffffff";
                ctx.stroke();
                break;
              case "u":
                ctx.beginPath();
                ctx.moveTo(j*scale+10,i*scale+8);
                ctx.lineTo(j*scale+scale/2,i*scale);
                ctx.lineTo(j*scale+scale-10,i*scale+8)
                ctx.strokeStyle = "#ffffff";
                ctx.stroke();
                break;
              case "d":
                ctx.beginPath();
                ctx.moveTo(j*scale+10,i*scale+scale-8);
                ctx.lineTo(j*scale+scale/2,i*scale+scale);
                ctx.lineTo(j*scale+scale-10,i*scale+scale-8)
                ctx.strokeStyle = "#ffffff";
                ctx.stroke();
                

                break;
              default:
              break
            }
}

function drawWall(ctx, i, j) {
  ctx.fillStyle = "#f00";
  ctx.fillRect(j*scale, i*scale, scale, scale);
}

function drawTarget(ctx, i, j) {
  ctx.fillStyle = "#0c7";
  ctx.fillRect(j*scale, i*scale, scale, scale);
}

function draw(parkingLot) {
  var height = parkingLot.length;
  var width = parkingLot[0].length;
  var canvas = document.getElementById("canvas");
  canvas.width = width*scale;
  canvas.height = height*scale;
  var ctx = canvas.getContext("2d");
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {

      var currentSpace = parkingLot[i][j];
      var key = currentSpace.substring(0,1);

      if (key == "w")
        drawWall(ctx, i, j);
      else if (key == "e" || key == "x" || key == "r")
        drawRoad(ctx, i, j, currentSpace.substring(1,2));
      else if (key == "c") {
        drawRoad(ctx, i, j, currentSpace.substring(1,2));
        drawCar(ctx, i, j, currentSpace.substring(1,2));
      }
      else if (key == "p")
        drawParkingSpace(ctx, i, j, currentSpace.substring(1,2));
      else if (key == "f") {
        drawParkingSpace(ctx, i, j, currentSpace.substring(1,2));
        drawCar(ctx, i, j, currentSpace.substring(1,2), true);
      }
      else
        drawTarget(ctx, i, j);
        
    }
  }
}

function back() {
  clearInterval(interval);
  pos--;
  if (pos < 0) pos = frames.length-1;
  draw(frames[pos]);
}

function fwd() {
  clearInterval(interval);
  pos++;
  if (pos >= frames.length) pos = 0;
  draw(frames[pos]);
}

function load(filePath) {
    var reader = new FileReader();
    if (filePath.files && filePath.files[0]) {
        reader.onload = function(e) {
            frames = [parseMap(e.target.result)];
        };
        reader.readAsText(filePath.files[0]);
    }
    else return false;
    return true;
}

function play() {
  interval = setInterval(function() {
    pos++;
    if (pos >= frames.length) pos = 0;
    draw(frames[pos]);
  }, 500);
}

function parseMap(text) {
    var frame = new Array();
    var rows = text.split("\n");
    for (var i = 0; i < rows.length; i++) {
    	if (rows[i] === "") break;
    	rows[i] = rows[i].split(",");
    	var row = new Array();
        for (var j = 0; j < rows[i].length; j++) {
            row.push(rows[i][j]);
        }
        frame.push(row);
    }
    console.log(JSON.stringify(frame));
    return frame;
}

window.addEventListener('load', function() {
  document.getElementById("back").addEventListener('click', back);
  document.getElementById("new").addEventListener('click', function() { document.getElementById('file').click() });
  document.getElementById("play").addEventListener('click', play);
  document.getElementById("fwd").addEventListener('click', fwd);
});

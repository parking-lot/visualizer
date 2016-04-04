var interval;
var scale = 45;
var pos = -1;
var frames = new Array();
var colors = ["#0c7", "#000080", "#00008B", "#0000CD", "#0000FF", "#006400", "#008000", "#008080", "#008B8B", "#00BFFF", "#00CED1", "#00FA9A", "#00FF00", "#00FF7F", "#00FFFF", "#00FFFF", "#191970", "#1E90FF", "#20B2AA", "#228B22", "#2E8B57", "#2F4F4F", "#2F4F4F", "#32CD32", "#3CB371", "#40E0D0", "#4169E1", "#4682B4", "#483D8B", "#48D1CC", "#4B0082", "#556B2F", "#5F9EA0", "#6495ED", "#663399", "#66CDAA", "#696969", "#696969", "#6A5ACD", "#6B8E23", "#708090", "#708090", "#778899", "#778899", "#7B68EE", "#7CFC00", "#7FFF00", "#7FFFD4", "#800000", "#800080", "#808000", "#808080", "#808080", "#87CEEB", "#87CEFA", "#8A2BE2", "#8B0000", "#8B008B", "#8B4513", "#8FBC8F", "#90EE90", "#9370DB", "#9400D3", "#98FB98", "#9932CC", "#9ACD32", "#A0522D", "#A52A2A", "#A9A9A9", "#A9A9A9", "#ADD8E6", "#ADFF2F", "#AFEEEE", "#B0C4DE", "#B0E0E6", "#B22222", "#B8860B", "#BA55D3", "#BC8F8F", "#BDB76B", "#C0C0C0", "#C71585", "#CD5C5C", "#CD853F", "#D2691E", "#D2B48C", "#D3D3D3", "#D3D3D3", "#D8BFD8", "#DA70D6", "#DAA520", "#DB7093", "#DC143C", "#DCDCDC", "#DDA0DD", "#DEB887", "#E0FFFF", "#E6E6FA", "#E9967A", "#EE82EE", "#EEE8AA", "#F08080", "#F0E68C", "#F0F8FF", "#F0FFF0", "#F0FFFF", "#F4A460", "#F5DEB3", "#F5F5DC", "#F5F5F5", "#F5FFFA", "#F8F8FF", "#FA8072", "#FAEBD7", "#FAF0E6", "#FAFAD2", "#FDF5E6", "#FF0000", "#FF00FF", "#FF00FF", "#FF1493", "#FF4500", "#FF6347", "#FF69B4", "#FF7F50", "#FF8C00", "#FFA07A", "#FFA500", "#FFB6C1", "#FFC0CB", "#FFD700", "#FFDAB9", "#FFDEAD", "#FFE4B5", "#FFE4C4", "#FFE4E1", "#FFEBCD", "#FFEFD5", "#FFF0F5", "#FFF5EE", "#FFF8DC", "#FFFACD", "#FFFAF0", "#FFFAFA", "#FFFF00", "#FFFFE0", "#FFFFF0", "#FFFFFF"];

var drawX = 0;
var drawY = 0;
var drawWidth = 0;
var drawHeight = 0;

function drawCar(ctx, i, j, id, dir, reverse) {
  var reverseDict = {"l": "r", "r": "l", "u": "d", "d": "u"};
  if (reverse) dir = reverseDict[dir];
  ctx.fillStyle = colors[(id*4)%colors.length];
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
    ctx.fillRect(j*scale, (i+.1111)*scale, scale*.8889, scale*.7778);
    break;
  case "r":
    ctx.fillStyle = "#f7df1e";
    ctx.fillRect(j*scale, i*scale, scale, scale);
    ctx.fillStyle = "#A9A9A9";
    ctx.fillRect((j+.1111)*scale, (i+.1111)*scale, scale, scale*.7778);
    break;
  case "u":
    ctx.fillStyle = "#f7df1e";
    ctx.fillRect(j*scale, i*scale, scale, scale);
    ctx.fillStyle = "#A9A9A9";
    ctx.fillRect(j*scale*1.1111, i*scale*1.1111, scale, scale*.7778);
    break;
  case "d":
    ctx.fillStyle = "#f7df1e";
    ctx.fillRect(j*scale, i*scale, scale, scale);
    ctx.fillStyle = "#A9A9A9";
    ctx.fillRect(j*scale*1.1111, i*scale*1.1111, scale, scale*.7778);
    break;
  }
}

function drawRoad(ctx, i, j, dir) {
  ctx.fillStyle = "#000";
  ctx.fillRect(j*scale, i*scale, scale, scale);
  switch(dir){
    case "r":
      ctx.beginPath();
      ctx.moveTo((j+.8222)*scale,(i+.2222)*scale);
      ctx.lineTo(j*scale+scale,i*scale+scale/2);
      ctx.lineTo((j+.8222)*scale,(i+.7778)*scale)
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
      break;
    case "l":
      ctx.beginPath();
      ctx.moveTo((j+.1778)*scale,(i+.2222)*scale);
      ctx.lineTo(j*scale,i*scale+scale/2);
      ctx.lineTo((j+.1778)*scale,(i+.7778)*scale)
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
      break;
    case "u":
      ctx.beginPath();
      ctx.moveTo((j+.2222)*scale,(i+.1778)*scale);
      ctx.lineTo(j*scale+scale/2,i*scale);
      ctx.lineTo((j+.7778)*scale,(i+.1778)*scale)
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
      break;
    case "d":
      ctx.beginPath();
      ctx.moveTo((j+.2222)*scale,(i+.8222)*scale);
      ctx.lineTo(j*scale+scale/2,i*scale+scale);
      ctx.lineTo((j+.7778)*scale,(i+.8222)*scale)
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
      break;
  }
}

function drawWall(ctx, i, j) {
  ctx.fillStyle = "#f00";
  ctx.fillRect(j*scale, i*scale, scale, scale);
}

function drawTarget(ctx, i, j, id) {
  ctx.fillStyle = colors[(id*4)%colors.length];
  ctx.fillRect(j*scale, i*scale, scale, scale);
}

function draw(parkingLot) {
  var canvas = document.getElementById("canvas");
  canvas.width = drawWidth*scale;
  canvas.height = drawHeight*scale;
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,drawWidth,drawHeight);
  for (var i = 0; i < drawHeight; i++) {
    for (var j = 0; j < drawWidth; j++) {
      var currentSpace = parkingLot[i+drawY][j+drawX];
      var key = currentSpace.substring(0,1);

      if (key == "w")
        drawWall(ctx, i, j);
      else if (key == "e" || key == "x" || key == "r")
        drawRoad(ctx, i, j, currentSpace.substring(1,2));
      else if (key == "c") {
        drawRoad(ctx, i, j, currentSpace.substring(1,2));
        drawCar(ctx, i, j, parseInt(currentSpace.match(/\d+/)[0]), currentSpace.substring(1,2));
      }
      else if (key == "p")
        drawParkingSpace(ctx, i, j, currentSpace.substring(1,2));
      else if (key == "f") {
        drawParkingSpace(ctx, i, j, currentSpace.substring(1,2));
        drawCar(ctx, i, j, parseInt(currentSpace.match(/\d+/)[0]), currentSpace.substring(1,2), true);
      }
      else if (key == "g")
        drawTarget(ctx, i, j, parseInt(currentSpace.match(/\d+/)[0]));

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
      var maps = e.target.result.replace(/,\r/g,"").replace(/\r/g,"").toLowerCase().split("!\n")
      for (var i = 0; i < maps.length; i++) {
        var frame = parseMap(maps[i]);
        console.log(JSON.stringify(frame));
        if (frame.length > 0) frames.push(frame);
        else console.warn("Warning: Dropping an empty frame!");
      }

      drawHeight = frames[0].length;
      drawWidth = frames[0][0].length;
      play();
    };
    reader.readAsText(filePath.files[0]);
  }
  else return false;
  return true;
}

function play() {
  clearInterval(interval);
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
            if (rows[i][j] == "") console.warn("Dropped an empty cell!");
            else row.push(rows[i][j]);
        }
        frame.push(row);
    }
    return frame;
}

function setDrawSquare(x,y,diameter) {
  if (x < 0 || y < 0 || x+diameter > frames[pos].length || y+diameter > frames[pos][0].length) {
    if (diameter-1 == drawHeight && x == drawX && y == drawY) {
      if (x > 0 && y > 0) {
        console.warn("Autofixing zoom out.");
        x--;
        y--;
      }
      else {
        console.warn("Can't autofix zoom out.");
        return;
      }
    }
    else {
      console.warn("Can't move drawSquare to: "+JSON.stringify({x:x, y:y, diameter:diameter}));
      return;
    }
  }
  scale = drawHeight/diameter * scale;
  drawX = x;
  drawY = y;
  drawWidth = diameter;
  drawHeight = diameter;
  draw(frames[pos]);
}

function keypress(event) {
  switch (event.code) {
    case "KeyA":
      setDrawSquare(drawX-1, drawY, drawHeight);
      break;
    case "KeyW":
      setDrawSquare(drawX, drawY-1, drawHeight);
      break;
    case "KeyD":
      setDrawSquare(drawX+1, drawY, drawHeight);
      break;
    case "KeyS":
      setDrawSquare(drawX, drawY+1, drawHeight);
      break;
    case "KeyQ":
      setDrawSquare(drawX, drawY, drawHeight-1);
      break;
    case "KeyE":
      setDrawSquare(drawX, drawY, drawHeight+1);
      break;
  }
}

window.addEventListener('load', function() {
  document.getElementById("back").addEventListener('click', back);
  document.getElementById("new").addEventListener('click', function() { document.getElementById('file').click() });
  document.getElementById("play").addEventListener('click', play);
  document.getElementById("fwd").addEventListener('click', fwd);
  window.addEventListener('keypress', keypress);
});

var interval;
var scale = 40;
var pos = 0;
var frames;

function draw(parkingLot) {
  var height = parkingLot.length;
  var width = parkingLot[0].length;
  var canvas = document.getElementById("canvas");
  canvas.width = width*scale;
  canvas.height = height*scale;
  var ctx = canvas.getContext("2d");
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      var currentSpace = parkingLot[i][j]
      switch (currentSpace.substring(0, 1)) {
        case "w":
      	  ctx.fillStyle = "#f00";
      	  ctx.fillRect(j*scale, i*scale, scale, scale);
          break;
      	case "e":
      	case "x":
        case "r":
      	  ctx.fillStyle = "#000";
      	  ctx.fillRect(j*scale, i*scale, scale, scale);
          break;
        case "p":
          switch(currentSpace.substring(1,2)){
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
            default:
              ctx.fillStyle = "#A9A9A9";
              ctx.fillRect(j*scale+5, i*scale + 5, scale, scale-10);
              break;
          }
          
          //ctx.fillStyle = "#fff";
      	  //ctx.fillRect(j*scale-5, i*scale, scale-10, scale-5);
      	  break;
      	default:
      	  ctx.fillStyle = "#0c7";
      	  ctx.fillRect(j*scale, i*scale, scale, scale);
      	  break;
      }
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

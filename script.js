var interval;
var scale = 100;
var pos = 0;
var frames =  [[["car-n"]],[["car-e"]],[["car-s"]],[["car-w"]]];

function draw(parkingLot) {
  var width = parkingLot.length;
  var height = parkingLot[0].length;
  var canvas = document.getElementById("canvas");
  canvas.width = width*scale;
  canvas.height = height*scale;
  var ctx = canvas.getContext("2d");
  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      ctx.drawImage(document.getElementById(parkingLot[j][i]), i*scale, j*scale, scale, scale);
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

function load() {
  var input = prompt("What scene would you like to load?");
  if (input) {
    clearInterval(interval);
    frames = JSON.parse(input);
    pos = 0;
    draw(frames[pos]);
  }
}

function play() {
  interval = setInterval(function() {
    pos++;
    if (pos >= frames.length) pos = 0;
    draw(frames[pos]);
  }, 500);
}

window.addEventListener('load', function() {
  document.getElementById("back").addEventListener('click', back);
  document.getElementById("new").addEventListener('click', load);
  document.getElementById("play").addEventListener('click', play);
  document.getElementById("fwd").addEventListener('click', fwd);
  draw(frames[pos]);
});

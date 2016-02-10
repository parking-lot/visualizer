var interval;
var scale = 100;
var pos = 0;
var frames;

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

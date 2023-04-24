
const express = require('express')

const app = express();
app.get('/', (req, res) => {
    let video="", audio="", image="";
    if (req.query.videoFile !== null) video = req.query.videoFile;
    if (req.query.audioFile !== null) audio = req.query.audioFile;
    if (req.query.imgFile !== null) image = req.query.imgFile;
    let html = `
<!DOCTYPE html>
<script>
    window.onload = function() {
    let isAudioVis = document.getElementById("audioCancel").style.visibility;
    if (isAudioVis === "" || isAudioVis === "hidden")
        document.getElementById("audioAdd").style.visibility = "hidden";
    let isVideoVis = document.getElementById("videoCancel").style.visibility;
    if (isVideoVis === "" || isVideoVis === "hidden")
        document.getElementById("videoAdd").style.visibility = "hidden";
    };
    function cancelFunction(type) {
    	if(type == 0) {
    		const tmp = document.getElementById("videoPlayer");
    		tmp.src = "cancel.mp4";
    	}
    	else if (type == 1) {
    		const tmp = document.getElementById("audioPlayer");
        	tmp.src = "cancel.mp3";
    	}
    	else if (type == 2) {
    		const tmp = document.getElementById("posterImage");
        	tmp.src = "cancel.jpg";
    	}
    }
    var rows = 0;
    
    function addRow(type) { // 0 for video, 1 for audio, 2 for image
    	rows = rows + 1;
    	var table = document.getElementById("playlist_table");
        var row = table.insertRow(rows);
        row.insertCell(0).innerHTML = rows;
        if(type == 0) {
        	row.insertCell(1).innerHTML = document.getElementById("videoPlayer").getAttribute("src");
        	row.insertCell(2).innerHTML = "Video";
        }
        else if(type == 1) {
        	row.insertCell(1).innerHTML = document.getElementById("audioPlayer").getAttribute("src");
        	row.insertCell(2).innerHTML = "Audio";
        }
        else if(type == 2) {
        	row.insertCell(1).innerHTML = document.getElementById("posterImage").getAttribute("src");
        	row.insertCell(2).innerHTML = "Image";
        }
    }
    
    function removeRow(row) {
    	var table = document.getElementById("playlist_table");
    	var current = table.deleteRow(row);
    	rows = rows - 1;
    }
    
</script>
<html>
    <video id="videoPlayer" width="320" height="240" controls src=${video}></video> <br>
    	<audio id="audioPlayer" controls src=${audio}></audio> <br>
    	<img id="posterImage" src=${image}> <br>
        <button type="button" id="videoCancel" onclick="cancelFunction(0)"  style="visibility: visible">Video to Cancel</button>
        <button type="button" id="videoAdd" onclick="addRow(0)">Add video</button> <br>
        <button type="button" id="audioCancel" onclick="cancelFunction(1)" style="visibility: visible">Audio to Cancel</button>
        <button type="button" id="audioAdd" onclick="addRow(1)">Add audio</button> <br>
        <button type="button" id="imgAdd" onclick="addRow(2)">Add image</button> <br>
        <table id="playlist_table">
        	<tr>
        		<th>No.</th>
        		<th>URL</th>
        		<th>Type</th>
        		<th>Action</th>
        	</tr>
        </table>
</html>
`
    res.send(html)
})
app.listen(4080)

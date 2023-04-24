const express = require('express')

const app = express();


app.get('/', (req, res) => {
    let video="", audio="", image="";
    if (req.query.videoFile !== null)
        video = req.query.videoFile;
    if (req.query.audioFile !== null)
        audio = req.query.audioFile;
    if (req.query.imgFile !== null)
        image = req.query.imgFile;
    let html = `
<!DOCTYPE html>
<script>
    window.onload = function() {
    let isAudioVis = document.getElementById("audioCancel").style.visibility;
    if (isAudioVis === "" || isAudioVis === "hidden")
        document.getElementById("audioAdd").style.visibility = "hidden";
    let isVideoVis = document.getElementById("videoCancel").style.visibility;
    if (isVideoVis==="" || isVideoVis === "hidden")
        document.getElementById("videoAdd").style.visibility = "hidden";
    };
    function videoCancelFunction() {
    	const tmp = document.getElementById("videoPlayer");
    	tmp.src = "cancel.mp4";
    }
    function audioCancelFunction() {
        const tmp = document.getElementById("audioPlayer");
        tmp.src = "cancel.mp3";
    }
    var rows = 0;
    function addAudioRow() {
    	rows = rows + 1;
        var table = document.getElementById("table");
        var row = table.insertRow(rows);
        row.insertCell(0).innerHTML = rows;
        row.insertCell(1).innerHTML = document.getElementById("audioPlayer").getAttribute("src");;
        row.insertCell(2).innerHTML = "Audio";
    }
    function addVideoRow() {
    	rows = rows + 1;
        var table = document.getElementById("table");
        var row = table.insertRow(rows);
        row.insertCell(0).innerHTML = rows;
        row.insertCell(1).innerHTML = document.getElementById("videoPlayer").getAttribute("src");;
        row.insertCell(2).innerHTML = "Video";
    }
    function addImageRow() {
    	rows = rows + 1;
        var table = document.getElementById("table");
        var row = table.insertRow(rows);
        row.insertCell(0).innerHTML = rows;
        row.insertCell(1).innerHTML = document.getElementById("posterImage").getAttribute("src");;
        row.insertCell(2).innerHTML = "Image";
    }
</script>
<html lang="pl">
    <video id="videoPlayer" width="320" height="240" controls src=${video}></video> <br>
    	<audio id="audioPlayer" controls src=${audio}></audio> <br>
    	<img id="posterImage" src=${image}> <br>
        <button type="button" id="videoCancel" onclick="videoCancelFunction()"  style="visibility: visible">Video to Cancel</button> <br>
        <button type="button" id="audioCancel" onclick="audioCancelFunction()" style="visibility: visible">Audio to Cancel</button> <br>
        <button type="button" id="audioAdd" onclick="addAudioRow()">Audio add</button> <br>
        <button type="button" id="videoAdd" onclick="addVideoRow()">Video add</button> <br>
        <button type="button" id="imageAdd" onclick="addImageRow()">Image add</button> <br>
        <table id="table">
        	<tr>
        		<th>No.</th>
        		<th>URL</th>
        		<th>Type</th>
        	</tr>
        </table>
</html>
`
    res.send(html)

})

app.listen(4080)

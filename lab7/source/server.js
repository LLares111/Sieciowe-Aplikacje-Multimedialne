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
    
    if(${video} == undefined) {
    	document.getElementById("videoPlayer").style.visibility = "hidden";
    };
    if(${audio} == undefined) {
    	document.getElementById("audioPlayer").style.visibility = "hidden";
    };
    if(${image} == undefined) {
    	document.getElementById("posterImage").style.visibility = "hidden";
    };
    };
    function cancelFunction(type) {
    	if(type == 0) {
    		const tmp = document.getElementById("videoPlayer");
    		tmp.src = "cancel.mp4";
    		document.getElementById("videoPlayer").style.visibility = "visible";
    	}
    	else if (type == 1) {
    		const tmp = document.getElementById("audioPlayer");
        	tmp.src = "cancel.mp3";
        	document.getElementById("audioPlayer").style.visibility = "visible";
    	}
    	else if (type == 2) {
    		const tmp = document.getElementById("posterImage");
        	tmp.src = "cancel.jpg";
        	document.getElementById("posterImage").style.visibility = "visible";
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
        row.insertCell(3).innerHTML = '<button class = "removeRowButton" onclick="removeRow(this)">Delete</button>';
        row.insertCell(3).innerHTML = '<button class = "moveRowUpButton" onclick="moveRowUp(this)">Up</button>';
        row.insertCell(3).innerHTML = '<button class = "moveRowDownButton" onclick="moveRowDown(this)">Down</button>';
    }
    
    function removeRow(row) {
	var i = row.parentNode.parentNode.rowIndex;
    	var table = document.getElementById("playlist_table");
    	var r = table.deleteRow(i);
    	rows = rows - 1;
    }
    
    function moveRowUp(row) {
    	var i = row.parentNode.parentNode.rowIndex;
    	var table = document.getElementById("playlist_table");
    	var rowss = table.rows;
    	var parent = rowss[i].parentNode;
    	if(i > 1) {
		parent.insertBefore(rowss[i],rowss[i-1]);
		i--;
	}
	else if(i === 1) {
		parent.insertBefore(rowss[i],null);
		i = rows;
	}
    }
    
    function moveRowDown(row) {
    	var i = row.parentNode.parentNode.rowIndex;
    	var table = document.getElementById("playlist_table");
    	var rowss = table.rows;
    	var parent = rowss[i].parentNode;
    	console.log(i);
    	if(i < rows) {
		parent.insertBefore(rowss[i+1],rowss[i]);
		i++;
	}
	else if(i === rows) {
		parent.insertBefore(rowss[rows],rowss[1]);
		i = 1;
	}
    }
    

        function video_play() {
            const vid = document.getElementById("videoPlayer");
                    vid.play();
	};
    
    	function video_pause() {
            const vid = document.getElementById("videoPlayer");
            vid.pause();
	};
	
	function audio_play() {
    	const aud = document.getElementById("audioPlayer");
                    aud.play();
	};
    
    	function audio_pause() {
    		const aud = document.getElementById("audioPlayer");
            aud.pause();
	};

</script>
<html>
    <video id="videoPlayer" width="320" height="240" controls src=${video}></video> <br>
	<button class = "videoPlay" id="videoPlay" onclick="video_play()">Video play</button> <br>
	<button class = "videoPause" id="videoPause" onclick="video_pause()">Video pause</button> <br>
    
    	<audio id="audioPlayer" controls src=${audio}></audio> <br>
    	<button class = "audioPlay" id="audioPlay" onclick="audio_play()">Audio play</button> <br>
	<button class = "audioPause" id="audioPause" onclick="audio_pause()">Audio pause</button> <br>
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

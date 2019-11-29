

function doTask() {
	var bucketTemp = document.getElementById('userinput').value;
	var bucket = document.getElementById('userinput').value;
	bucket = (bucket -32) * 5/9;
	bucket = Math.floor(bucket * 100) /100;
	document.getElementById('formula').innerHTML = 'Formula: (' + bucketTemp + '°F − 32) × 5/9 = ' + bucket + '°C';
	document.getElementById('output').innerHTML = 'Celcius: ' + bucket + '°C';
}



/*
Formula for farenheit to celcius conversion:
(x°F − 32) × 5/9 = 7.222°C
*/

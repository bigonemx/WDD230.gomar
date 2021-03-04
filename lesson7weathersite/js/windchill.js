const tempNum = parseFloat(document.getElementById("temp").textContent);
// console.log (tempNum);

const speedNum = parseFloat(document.getElementById("wind").textContent);
// // console.log (speedNum);

let windchill = 35.74 + (0.6215 * tempNum) - (35.75 * Math.pow(speedNum, 0.16)) + (0.4275 * tempNum * Math.pow(speedNum, 0.16));
windchill = Math.round(windchill);
console.log (windchill);

if(tempNum<=50 && speedNum >3) {
    document.getElementById("chill").textContent = "Wind Chill is: " +windchill+"\xB0F";
} else {
    document.getElementById("chill").textContent = "No wind chill today!";
}
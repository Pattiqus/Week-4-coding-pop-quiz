var timeLeft = 100;
var timerDownload = setInterval(function() {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    if(timeleft <=0) {
        clearInterval(timerDownload);
        
    } else {
        document.getElementById("timer").textContent = "Time is up";
    }
},1000); 

console.log(timerDownload)

document.getElementById("start-btn").addEventListener("click", timerDownload);
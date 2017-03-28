var timerId;
/*Even count indicates timer is counting down, odd count restarts the timer*/
var count = 1;
/*Even intCount indicates break time is in process, odd count means session time is in process*/
var intCount = 1;
var restTime = 5;
var workTime = 25;
var mute = false;
var minutes = getById("minutes");
var seconds = getById("seconds");
var work = getById("work");
var rest = getById("rest");
var sessText = document.getElementById("sess");
var workSound = new Audio("http://k003.kiwi6.com/hotlink/62sh2f6bzd/Metal_Gong-Dianakc-109711828.mp3");
var restSound = new Audio("http://k003.kiwi6.com/hotlink/pgbz4txpkg/42095_fauxpress_bell-meditation.mp3");

/*On + or - button click add or substract from break( var restTime) or session time(var workTime),
call changeTime to display changes*/
getById("addRest").onclick = function () {
  restTime++
  changeTime(rest, restTime, "Break");
}

getById("lessRest").onclick = function () {
  restTime--
  if (restTime <= 1) {
    restTime = 1
  }
  changeTime(rest, restTime, "Break");
}

getById("addWork").onclick = function () {
  workTime++
  changeTime(work, workTime, "Session");
}

getById("lessWork").onclick = function () {
  workTime--
  if (workTime <= 1) {
    workTime = 1
  }
  changeTime(work, workTime, "Session");
}


//When timer is clicked add one to count, call function according to count if timer is restarted, always start from session time
getById("getTime").onclick = function () {
  count += 1
  if (count % 2 === 0) {
    pomodoro(workTime)
  } else {
    clearInterval(timerId)
    minutes.innerHTML = workTime.toString()
    seconds.innerHTML = "00"
  }
}

//Argument xTime is either restTime or workTime which sets the seconds and minutes
function pomodoro(xTime) {
  var time = xTime * 60
    // Set interval of timer for with delay of 1000 ms
  timerId = setInterval(function () {
    time -= 1
    var min = Math.floor(time / 60)
    var sec = time - min * 60
    var minStr = min.toString()
    var secStr = sec.toString()

    if (min < 10) {
      minStr = "0" + minStr
    }
    if (sec < 10) {
      secStr = "0" + secStr
    }
    //When less than 10 seconds remaining change the color of timer
    colorChange(sec, min)
    minutes.innerHTML = minStr
    seconds.innerHTML = secStr

    //When timer goes to 0 add one to intCount and clear timer, according to intCount call pomodoro() recursively
    if (min === 0 && sec === 0) {
      intCount += 1
      clearInterval(timerId)
      if (intCount % 2 === 0) {
        pomodoro(restTime)
        restSound.play()
        sessText.innerHTML = "Break"
      } else {
        pomodoro(workTime)
        workSound.play()
        sessText.innerHTML = "Session"
      }
    }
  }, 1000)
}
//Turn the volume of interval change on or off by clicking sound icon
getById("vol").onclick = function () {
  if (mute === false) {
    restSound.muted = true
    workSound.muted = true
    mute = true
    getById("volImg").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Mute_Icon.svg/240px-Mute_Icon.svg.png"
  } else {
    restSound.muted = false
    workSound.muted = false
    mute = false
    getById("volImg").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Speaker_Icon.svg/240px-Speaker_Icon.svg.png"
  }
}

// Only allow to see the time change in timer when the countdown is not active.
function changeTime(id, xTime, text) {
  id.innerHTML = xTime.toString()
  if (count % 2 !== 0) {
    minutes.innerHTML = xTime.toString()
    sessText.innerHTML = text
  }
}

function colorChange(sec, min) {
  if (sec < 10 && min === 0) {
    document.querySelector("#seconds").style.color = "#FF5733"
  } else {
    document.querySelector("#seconds").style.color = "white"
  }
}

function getById(element) {
  return document.getElementById(element)
}
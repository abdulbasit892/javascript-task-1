var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var hoursLabel = document.getElementById("hours");
var totalSeconds = 0,
  totalMinutes = 0,
  lastMinutes = 0,
  lastHours = 0,
  lastSeconds = 0,
  minutes = 0,
  hours = 0,
  seconds = 0,
  lapCount = 0;

var second = document.getElementById("second");
var hour = document.getElementById("hour");
var design = document.getElementById("design");
var design2 = document.getElementById("design2");
var lapUL = document.getElementById("lap-ul");
var minute = document.getElementById("minute");
var start = document.getElementById("start");
var object = {};

//    digiltal counter settings
setInterval(function() {
  if (second.style.webkitAnimationPlayState == "running") {
    ++totalSeconds;
    hours = pad(parseInt(totalSeconds / 3600) % 60);
    minutes = pad(parseInt(totalSeconds / 60) % 60);
    seconds = pad(totalSeconds % 60);
    hoursLabel.innerHTML = hours;
    secondsLabel.innerHTML = seconds;
    minutesLabel.innerHTML = minutes;
  }
}, 1000);
function pad(val) {
  return val > 9 ? val : "0" + val;
}

//    fetching laps from local storage
var lap_material = JSON.parse(localStorage.getItem("lap_element"));
for (let i in lap_material) {
  lapCount++;
  var li = document.createElement("li");
  li.innerHTML = lap_material[i];
  object[lapCount] = lap_material[i];
  lapUL.appendChild(li);
}

// =========================  lap button pressed ================================
lap.addEventListener("click", function() {
  // if lap-list is empty then it make the lap container display none
  document.getElementsByClassName("lap-list")[0].style.display = "inline";

  // creates and delete animation
  setInterval(function() {
    design2.classList.add("animation-spining");
  }, 10);
  design2.classList.remove("animation-spining");

  //  adding LAP
  if (lap.innerHTML == "LAP") {
    var li = document.createElement("li");
    ++lapCount;
    var p = document.createElement("p");
    p.innerHTML = '<i class="far fa-times-circle"></i>';
    // p.onclick = () => remove(lapCount);
    p.classList.add("removing");
    var lap_number =
      "Lap" +
      lapCount +
      "                                      " +
      (Number(minutes) - Number(lastMinutes)) +
      ":" +
      (Number(seconds) - Number(lastSeconds)) +
      "    ";
    li.innerHTML = lap_number;
    li.appendChild(p);
    lapUL.appendChild(li);
    //updating last times

    lastMinutes = minutes;
    lastSeconds = seconds;
    // adding lap to local storage
    object[lapCount] = li.innerHTML;
    localStorage.setItem("lap_element", JSON.stringify(object));
  }
  // reset lap-list
  else if (lap.textContent == "RESET") {
    second.classList.remove("animation-second");
    minute.classList.remove("animation-minute");
    hour.classList.remove("animation-hour");
    lap.innerHTML = "LAP";
    start.innerHTML = "START";
    minutes = 00;
    lastMinutes = 00;
    seconds = 00;
    totalSeconds = 00;
    lastSeconds = 00;
    secondsLabel.innerHTML = "00";
    minutesLabel.innerHTML = "00";
  }
});
//  ==================== start button =================================
start.addEventListener("click", function() {
  // addiding removing animation
  setInterval(function() {
    design.classList.add("animation-spining2");
  }, 10);
  design.classList.remove("animation-spining2");

  //   start button pressed
  if (start.innerHTML == "START") {
    second.classList.add("animation-second");
    minute.classList.add("animation-minute");
    hour.classList.add("animation-hour");
    second.style.webkitAnimationPlayState = "running";
    minute.style.webkitAnimationPlayState = "running";
    start.innerHTML = "PAUSE";
  }
  //   pause button pressed
  else if (start.innerHTML == "PAUSE") {
    second.style.webkitAnimationPlayState = "paused";
    minute.style.webkitAnimationPlayState = "paused";
    start.innerHTML = "RESUME";
    lap.innerHTML = "RESET";
  }
  //   resume button pressed
  else if (start.innerHTML == "RESUME") {
    second.style.webkitAnimationPlayState = "running";
    minute.style.webkitAnimationPlayState = "running";
    start.innerHTML = "PAUSE";
    lap.innerHTML = "LAP";
  }
});
//     deleting all records
(function() {
  var delete_lap_list = document.getElementById("delete-lap-list");
  delete_lap_list.addEventListener("click", function() {
    var tempObject = new Object();
    object = tempObject;
    lapUL.innerHTML = " ";
    lapCount = 0;

    console.log(lapUL.innerHTML);

    if (lapUL.innerHTML == " ") {
      console.log("in");
      document.getElementsByClassName("lap-list")[0].style.display = "none";
    }
  });
})();

$(document).ready(function() {
  var containerEl = $(".container");

  //appending current day on calendar
  const jumbotron = $(".jumbotron");
  const timeblock = $("<div>")
    .addClass("time-block")
    .text(moment().format("dddd, MMMM Do YYYY"));
  jumbotron.append(timeblock);

  var MAX_TIME = 21;
  var time;

  //formatting the time display
  function formatTime(hour) {
    if (hour > 9) {
      time = hour;
    } else {
      time = "0" + hour;
    }

    return time + ":00";
  }

  //creating the timeblocks
  function buildUI() {
    for (var i = 9; i < MAX_TIME; i++) {
      var storedValue = localStorage.getItem(i);

      var divTime = $("<div>").addClass("row");
      var pTime = $("<p>").text(formatTime(i));
      var textInput = $("<textarea>")
        .addClass("description")
        .attr("data-hour", i);
      if (storedValue) {
        textInput.text(storedValue);
      }
      var saveButton = $("<button>")
        .addClass("saveBtn")
        .text("Save");

      divTime.append(pTime, textInput, saveButton);
      containerEl.append(divTime);

      $("button").on("click", function() {
        var textArea = $(this).siblings("textarea");
        var time = textArea.attr("data-hour");

        localStorage.setItem(time, textArea.val());
      });

      //creating colour code for the time blocks to show past, present and future

      if (time == moment().format("H")) {
        textInput.addClass("present");
      } else if (time > moment().format("H")) {
        textInput.addClass("future");
      } else if (time < moment().format("H")) {
        textInput.addClass("past");
      }
    }
  }

  buildUI();
});

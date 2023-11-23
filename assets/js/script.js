// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(document).ready(function () {
  // Display current date in the header
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // Add click event listener for save buttons
  $(".saveBtn").on("click", function () {
    // Retrieve the corresponding hour from the parent time block
    var hour = $(this).parent().attr("id").split("-")[1];

    // Retrieve the user input (event description) from the textarea
    var eventDescription = $(this).siblings(".description").val();

    // Save the event in local storage using the hour as a key
    localStorage.setItem("event_" + hour, eventDescription);
  });
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  const timeblocks = document.querySelectorAll('.time-block');
  const currentHour = new Date().getHours();
  
  timeblocks.forEach((timeblock) => {
      const time = parseInt(timeblock.textContent.split(' ')[0]);
      if (time < currentHour) {
          timeblock.classList.add('.past');
      } else if (time === currentHour) {
          timeblock.classList.add('.present');
      } else {
          timeblock.classList.add('.future');
      }
  });
  // Loop through time blocks to apply past, present, or future class
  $(".time-block").each(function () {
    var blockHour = parseInt($(this).attr("id").split("-")[1]);

    // Get the current hour using Day.js
    var currentHour = dayjs().hour();

    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    // Compare the current hour with the hour in each time block
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
    //
    // TODO: Add code to display the current date in the header of the page.
    //Retrieve saved events from local storage and set textarea values
    var savedEvent = localStorage.getItem("event_" + blockHour);
    if (savedEvent) {
      $(this).children(".description").val(savedEvent);
    }
  });
});

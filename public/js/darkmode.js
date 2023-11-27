$(document).ready(function () {
    updateDarkMode();

    $("#darkmodeToggle").change(function () {
      updateDarkMode();
    });

    // Function to update dark mode based on the toggle state
    function updateDarkMode() {
      //Check if dark mode is checked
      if ($("#darkmodeToggle").prop("checked")) {
        // Enable dark mode
        enableDarkMode();
      } else {
        // Disable dark mode
        disableDarkMode();
      }
    }

    // Function to enable dark mode
    function enableDarkMode() {
      // Add a class to the body to apply dark mode styles
      $("body").addClass("dark-mode");
    }

    // Function to disable dark mode
    function disableDarkMode() {
      // Remove the dark mode class from the body
      $("body").removeClass("dark-mode");
    }
  });
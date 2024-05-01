document.addEventListener("DOMContentLoaded", function() {
  const powerupBtn = document.getElementById("powerupBtn");
  const dropdown = document.getElementById("powerupDropdown");
  let holdTimer;
  let startY;
  let isDragging = false;

  powerupBtn.addEventListener("touchstart", function(event) {
      startY = event.touches[0].clientY;
      holdTimer = setTimeout(function() {
          dropdown.style.display = "block";
      }, 50); // Adjust the hold time as needed
  });

  powerupBtn.addEventListener("touchmove", function(event) {
      if (Math.abs(event.touches[0].clientY - startY) > 10) {
          clearTimeout(holdTimer);
          isDragging = true;
      }
  });

  powerupBtn.addEventListener("touchend", function(event) {
      clearTimeout(holdTimer);
      if (!isDragging && !dropdown.contains(event.target)) {
          dropdown.style.display = "none";
      }
      isDragging = false; // Reset dragging status
  });

  dropdown.addEventListener("touchstart", function() {
      clearTimeout(holdTimer);
  });

  dropdown.addEventListener("touchend", function() {
      dropdown.style.display = "none";
  });

  // Add event listeners for drag and hover effect
  let selectedButton = null; // Track the selected button while dragging
  dropdown.addEventListener("touchmove", function(event) {
      event.preventDefault(); // Prevent scrolling while dragging
      const touchedElement = document.elementFromPoint(
          event.touches[0].clientX,
          event.touches[0].clientY
      );
      if (touchedElement.tagName === "BUTTON") {
          if (selectedButton !== touchedElement) {
              // If a different button is touched, remove hover effect from previous button
              if (selectedButton) {
                  selectedButton.classList.remove("hover");
              }
              // Apply hover effect to the new button
              selectedButton = touchedElement;
              selectedButton.classList.add("hover");
          }
      } else {
          // If touch is not on a button, remove hover effect from previous button
          if (selectedButton) {
              selectedButton.classList.remove("hover");
              selectedButton = null;
          }
      }
  });

  dropdown.addEventListener("touchend", function(event) {
      if (selectedButton) {
          const selectedOptionText = selectedButton.innerText;
          console.log("Selected option:", selectedOptionText);
          dropdown.style.display = "none";
          selectedButton.classList.remove("hover");
          selectedButton = null;
      }
  });
});

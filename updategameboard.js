// Retrieve territory assignments from LocalStorage
const territoryAssignments = JSON.parse(localStorage.getItem("territoryAssignments")) || [];

// Function to update the gameboard dynamically
function updateGameboard() {
  territoryAssignments.forEach(assignment => {
    // Access the circle element by its ID
    const territoryCircle = document.getElementById(`territory-${assignment.territory}`);
    const territoryText = document.getElementById(`territory-${assignment.territory}-text`);

    if (territoryCircle) {
      // Update the circle's color
      territoryCircle.setAttribute("fill", assignment.color);
    }

    if (territoryText) {
      // Update the text with the assigned number
      territoryText.textContent = assignment.label;
    }
  });
}

// Call the function to apply the updates
updateGameboard();
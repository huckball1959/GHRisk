// Wait for the DOM and map object to load
window.addEventListener("load", () => {
  const mapObject = document.getElementById("risk-map");

  // Create and style the overlay dynamically
  const overlay = document.createElement("div");
  overlay.id = "dynamic-overlay";
  overlay.style.position = "absolute";
  overlay.style.top = "20px";
  overlay.style.right = "20px";
  overlay.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
  overlay.style.border = "1px solid #ccc";
  overlay.style.borderRadius = "8px";
  overlay.style.padding = "10px";
  overlay.style.zIndex = "10";
  overlay.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)";
  overlay.innerHTML = `
    <h3>Current Player: <span id="current-player">Player 1</span></h3>
    <p><strong>Bank:</strong> <span id="bank">20</span></p>
  `;
  document.body.appendChild(overlay);

  // Load the SVG content and add interactions
  mapObject.addEventListener("load", () => {
    const svgDoc = mapObject.contentDocument;
    if (!svgDoc) {
      console.error("SVG document not loaded");
      return;
    }

    // Game state
    const players = ["Player 1", "Player 2"];
    let currentPlayerIndex = 0;
    let armiesToPlace = 20;

    // Function to update overlay information
    function updateOverlay() {
      document.getElementById("current-player").textContent = players[currentPlayerIndex];
      document.getElementById("bank").textContent = armiesToPlace;
    }

    // Initialize overlay
    updateOverlay();

    // Add click events to all circles in the SVG
    const circles = svgDoc.querySelectorAll("circle");
    circles.forEach((circle) => {
      circle.addEventListener("click", () => {
        if (armiesToPlace > 0) {
          // Place an army on the clicked circle
          const armyCount = parseInt(circle.getAttribute("data-armies") || "0", 10);
          circle.setAttribute("data-armies", armyCount + 1);

          // Update tooltip with new army count
          let title = circle.querySelector("title");
          if (!title) {
            title = svgDoc.createElementNS("http://www.w3.org/2000/svg", "title");
            circle.appendChild(title);
          }
          title.textContent = `Armies: ${armyCount + 1}`;

          // Decrease available armies to place
          armiesToPlace--;

          // Check if all armies are placed for the current player
          if (armiesToPlace === 0) {
            currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
            armiesToPlace = 20; // Reset bank for the next player
          }

          // Update the overlay
          updateOverlay();
        } else {
          alert("No more armies to place for this turn!");
        }
      });
    });
  });
});
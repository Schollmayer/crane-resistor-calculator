import { createSchematic } from "../sharedFiles/schematic_generator.js";

document.addEventListener("DOMContentLoaded", function() {
    var outputDiv = document.getElementById("output");

    // Clear previous content
    outputDiv.innerHTML = "";

    // Create card element
    var card = document.createElement("div");
    card.classList.add("card", "mb-3");
    card.style.height = "1000px"; // Ensure explicit height
    card.style.width = "1000px";   // Ensure explicit width

    // Create card body
    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.style.height = "100%";  // Ensure explicit height
    cardBody.style.width = "100%";    // Ensure it takes full width

    var cardTitle = document.createElement("div");
    cardTitle.classList.add("card-title");

    var titleElement = document.createElement("h2");
    titleElement.textContent = "Very fancy title";
    cardTitle.appendChild(titleElement);

    
    
    // Create the SVG element
    var schematicSVG = document.createElement("img");
    var schematicURL = createSchematic(6, "CR70C4304", "CDBR-4045D", 20, 25, 100);
    schematicSVG.src = schematicURL;


    // Append everything
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(schematicSVG);
    card.appendChild(cardBody);
    outputDiv.appendChild(card);


});

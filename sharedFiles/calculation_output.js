import { createSchematic } from "./schematic_generator.js";

export function displayResistorTransistorSelection(outputDIVName, cr700Result, transistorResults, resistorResults,
    minR, maxR, avgBrakePower, maxBrakePower, maxBrakeTime, dutyCycleTime) {
    var outputDiv = document.getElementById(outputDIVName);

    // Clear previous content
    outputDiv.innerHTML = "";

    var borderThickness = "2px";
    // Create a card group
    var cardGroup = document.createElement("div");
    cardGroup.classList.add("card-group");

    // Create card for Drive model
    var driveCard = document.createElement("div");
    driveCard.classList.add("card", "mb-3");
    driveCard.style.borderColor = "var(--yask-blue)";
    driveCard.style.borderWidth = borderThickness;

    var driveCardBody = document.createElement("div");
    driveCardBody.classList.add("card-body");

    var driveCardTitle = document.createElement("h5");
    driveCardTitle.classList.add("card-title");
    driveCardTitle.style.fontWeight = "bold";
    driveCardTitle.textContent = `Drive Model:`;
    driveCardBody.appendChild(driveCardTitle);

    var driveFlexContainer = document.createElement("div");
    driveFlexContainer.style.display = "flex";
    driveFlexContainer.style.flexDirection = "column"; // Ensure column direction for line breaks
    driveFlexContainer.innerHTML = `<strong>Type:</strong> ${cr700Result.type}<br>
                                         <strong>HD-current:</strong> ${cr700Result.hdCurrent} A<br>
                                         <strong>HD-power:</strong> ${cr700Result.hdPower} kW`;
    driveCardBody.appendChild(driveFlexContainer);

    driveCard.appendChild(driveCardBody);
    cardGroup.appendChild(driveCard);

    if (transistorResults) {
        // Create card for Braking transistor
        var transistorCard = document.createElement("div");
        transistorCard.classList.add("card", "mb-3");
        transistorCard.style.borderColor = "var(--yask-blue)";
        transistorCard.style.borderWidth = borderThickness;

        var transistorCardBody = document.createElement("div");
        transistorCardBody.classList.add("card-body");

        var transistorCardTitle = document.createElement("h5");
        transistorCardTitle.classList.add("card-title");
        transistorCardTitle.style.fontWeight = "bold";
        transistorCardTitle.textContent = `Braking Transistor:`;
        transistorCardBody.appendChild(transistorCardTitle);

        var transistorFlexContainer = document.createElement("div");
        transistorFlexContainer.style.display = "flex";
        transistorFlexContainer.style.flexDirection = "column"; // Ensure column direction for line breaks
        transistorFlexContainer.innerHTML = `<strong>Type:</strong> ${transistorResults.cdbr.type} <br>
                                         <strong>Quantity:</strong> ${transistorResults.qtty}`;
        if (transistorResults.qtty > 1) {
            transistorFlexContainer.innerHTML += `<br><br><strong>Please select the displayed resistor values for each braking transistor. `
        }
        transistorCardBody.appendChild(transistorFlexContainer);

        transistorCard.appendChild(transistorCardBody);
        cardGroup.appendChild(transistorCard);
    }
    // Create card for Braking Resistor
    var resistorCard = document.createElement("div");
    resistorCard.classList.add("card", "mb-3");
    resistorCard.style.borderColor = "var(--yask-blue)";
    resistorCard.style.borderWidth = borderThickness;

    var resistorCardBody = document.createElement("div");
    resistorCardBody.classList.add("card-body");

    var resistorCardTitle = document.createElement("h5");
    resistorCardTitle.classList.add("card-title");
    resistorCardTitle.style.fontWeight = "bold";
    resistorCardTitle.textContent = `Braking Resistor Network:`;
    resistorCardBody.appendChild(resistorCardTitle);

    var resistorFlexContainer = document.createElement("div");
    resistorFlexContainer.style.display = "flex";
    resistorFlexContainer.style.flexDirection = "column"; // Ensure column direction for line breaks

    // Create the innerHTML with line breaks
    resistorFlexContainer.innerHTML = `<strong>Rmin:</strong> ${minR.toFixed(2)} Ω<br>
                                         <strong>Rmax:</strong> ${maxR.toFixed(2)} Ω<br>
                                         <strong>Power:</strong> ${avgBrakePower.toFixed(2)} kW`;

    resistorCardBody.appendChild(resistorFlexContainer);
    resistorCard.appendChild(resistorCardBody);
    cardGroup.appendChild(resistorCard);

    outputDiv.appendChild(cardGroup);

    //Display calculated application data in accordion
    var accordion = document.createElement("div");
    accordion.classList.add("accordion", "mb-3", "shadow");

    var accordionCard = document.createElement("div");
    accordionCard.classList.add("accordion-item");

    var accordionHeader = document.createElement("h3");
    accordionHeader.classList.add("accordion-header");

    var headerButton = document.createElement("button");
    headerButton.classList.add("accordion-button", "collapsed");  // Start with collapsed
    headerButton.style.outline = "none";
    headerButton.setAttribute("type", "button");
    headerButton.setAttribute("data-bs-toggle", "collapse");
    headerButton.setAttribute("data-bs-target", "#resistorAccordion");
    headerButton.setAttribute("aria-expanded", "false");
    headerButton.setAttribute("aria-controls", "resistorAccordion");

    // Make the text bold and increase the font size
    headerButton.innerHTML = `<strong style="font-size: 1.1rem;">Calculated Application Values</strong>`;

    accordionHeader.appendChild(headerButton);
    accordionCard.appendChild(accordionHeader);

    var accordionCollapse = document.createElement("div");
    accordionCollapse.classList.add("accordion-collapse", "collapse");  // Start with collapse
    accordionCollapse.id = "resistorAccordion";

    var accordionBody = document.createElement("div");
    accordionBody.classList.add("accordion-body");
    var totalAvgBrakePower = avgBrakePower;
    if (transistorResults){
        totalAvgBrakePower = totalAvgBrakePower * transistorResults.qtty;
    }
    accordionBody.innerHTML = `<strong>Average Braking Power:</strong> ${totalAvgBrakePower.toFixed(2)} kW<br>
  <strong>Maximum Braking Power:</strong> ${maxBrakePower.toFixed(2)} kW<br>
  <strong>Maximum Continuous Braking Time:</strong> ${maxBrakeTime.toFixed(2)} s<br>
  <strong>Duty Cycle Time:</strong> ${dutyCycleTime.toFixed(2)} s`;

    accordionCollapse.appendChild(accordionBody);
    accordionCard.appendChild(accordionCollapse);
    accordion.appendChild(accordionCard);

    outputDiv.appendChild(accordion);

    //Add schematic picture
    var card = document.createElement("div");
    card.classList.add("card", "mb-3", "mt-1");
    card.style.height = "auto"; // Setting explicit height
    card.style.width = "auto";   // Setting explicit width

    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.setAttribute("height", "auto");
    cardBody.setAttribute("width", "auto");

    var cardTitle = document.createElement("div");
    cardTitle.classList.add("card-title");

    var titleElement = document.createElement("h5");
    titleElement.style.fontWeight = "bold";
    titleElement.textContent = "Schematic";
    cardTitle.appendChild(titleElement);

    // Create the SVG element
    var schematicURL;
    if (transistorResults) {
        schematicURL = createSchematic(transistorResults.qtty, cr700Result.type, transistorResults.cdbr.type, minR.toFixed(2), maxR.toFixed(2), avgBrakePower.toFixed(2));
    } else {
        schematicURL = createSchematic(0, cr700Result.type, null, minR.toFixed(2), maxR.toFixed(2), avgBrakePower.toFixed(2));
    }

    var schematicSVG = document.createElement("img");
    schematicSVG.src = schematicURL;
    schematicSVG.style.marginTop = "10px"; // Adjust the space between text and image
    schematicSVG.style.maxWidth = "100%"; // Ensure the image scales down
    schematicSVG.style.height = "auto"; // Maintain aspect ratio

    // Append everything
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(schematicSVG);
    card.appendChild(cardBody);
    outputDiv.appendChild(card);


    //Display resistor network options
    if (resistorResults) {
        resistorResults.forEach(function (obj, index) {
            var card = document.createElement("div");
            card.classList.add("card", "mb-3");

            var cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            var cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");
            cardTitle.style.fontWeight = "bold";
            cardTitle.textContent = `Option ${index + 1}`;
            cardBody.appendChild(cardTitle);

            var flexContainer = document.createElement("div");
            flexContainer.style.display = "flex";
            flexContainer.style.alignItems = "top";
            cardBody.appendChild(flexContainer);

            var resistorContainer = document.createElement("div");
            var resistorTitle = document.createElement("h6");
            resistorTitle.classList.add("card-subtitle", "mb-2", "text-muted");
            resistorTitle.textContent =  "Braking Resistor Network";
            resistorContainer.appendChild(resistorTitle);

            // Format resistors output
            var resistorDetail = document.createElement("div");
            resistorDetail.innerHTML = `${obj.quantity}x ${obj.resistor.type}`;
            resistorContainer.appendChild(resistorDetail);

            flexContainer.appendChild(resistorContainer);


            let resistorImageFile = getResistorGraphic(obj);

            // Add images next to the resistor details if resistorImageFile is valid
            if (resistorImageFile) {
                var resistorImageContainer = document.createElement("div");
                resistorImageContainer.style.marginTop = "10px"; // Adjust the space between text and image
                resistorImageContainer.style.display = "flex"; // Display images in a row
                resistorImageContainer.style.gap = "10px"; // Add space between the images
                resistorImageContainer.style.flexWrap = "wrap"; // Wrap images on smaller screens
                resistorImageContainer.style.alignItems = "center"; // Align items vertically if needed
                resistorImageContainer.style.justifyContent = "flex-start"; // Align images to the left

                // Check if resistorImageFile is an array
                if (Array.isArray(resistorImageFile)) {
                    // Loop through the array and create images for each element
                    resistorImageFile.forEach((imageSrc, index) => {
                        if (index < 2) { // Display up to two images
                            var resistorImage = document.createElement("img");
                            resistorImage.src = imageSrc;
                            resistorImage.alt = `Resistor network ${index + 1}`;
                            resistorImage.style.maxWidth = "100%"; // Ensure image fits within the container
                            resistorImage.style.height = "auto"; // Maintain aspect ratio
                            resistorImage.style.maxHeight = "200px"; // Limit the maximum height
                            resistorImage.style.objectFit = "contain"; // Ensure image fits within its container
                            resistorImage.style.margin = "0"; // Left-align the image
                            resistorImage.style.marginTop = "10px"; // Left-align the image

                            // Add a class to the second image for special mobile styling
                            if (index === 1) {
                                resistorImage.classList.add("second-image");
                            }

                            resistorImageContainer.appendChild(resistorImage);

                            // Add the "or" text between the images
                            if (index === 0 && resistorImageFile.length > 1) {
                                var orText = document.createElement("span");
                                orText.textContent = "OR";
                                orText.style.margin = "0 10px"; // Add margin to space the "or" text from the images
                                orText.style.fontSize = "1.3em"; // Make the text bigger
                                orText.style.fontWeight = "bold"; // Make the text bold
                                orText.style.color = "var(--yask-blue)"; // Use the --yask-blue color

                                resistorImageContainer.appendChild(orText);
                            }
                        }
                    });
                } else {
                    // If resistorImageFile is not an array, handle it as a single image
                    var resistorImage = document.createElement("img");
                    resistorImage.src = resistorImageFile;
                    resistorImage.alt = "Resistor network";
                    resistorImage.style.maxWidth = "100%"; // Ensure image fits within the container
                    resistorImage.style.height = "auto"; // Maintain aspect ratio
                    resistorImage.style.maxHeight = "200px"; // Limit the maximum height
                    resistorImage.style.objectFit = "contain"; // Ensure image fits within its container
                    resistorImage.style.margin = "0"; // Left-align the image
                    resistorImage.style.marginTop = "10px"; // Left-align the image

                    resistorImageContainer.appendChild(resistorImage);
                }

                // Append the container with images to the cardBody
                cardBody.appendChild(resistorImageContainer);
            }

            // Details section
            var detailsContainer = document.createElement("div");
            detailsContainer.classList.add("collapse"); // Add the "well" class here
            detailsContainer.id = `details-${index}`;

            // Create a wrapper div with margin inside detailsContainer
            var detailsContent = document.createElement("div");
            detailsContent.classList.add("mt-3");
            detailsContent.innerHTML = `
    <div style="display: flex; justify-content: left; margin: 0; padding: 0;">
      <div style="margin-right: 20px; padding: 0;"> 
        <strong style="font-size: 1.1em">Option details:</strong><br>
        <strong>Rtotal:</strong> ${obj.totalResistance.toFixed(2)} Ω<br>
        <strong>Total power:</strong> ${obj.totalPower.toFixed(2)} kW<br>
        <strong>Total quantity:</strong> ${obj.quantity}<br>
      </div>
    </div>
  `;

            detailsContainer.appendChild(detailsContent); // Append detailsContent (with margin) inside detailsContainer

            var detailButton = document.createElement("button");
            detailButton.classList.add("btn", "btn-yask-blue", "mt-3");
            detailButton.setAttribute("type", "button");
            detailButton.setAttribute("data-bs-toggle", "collapse");
            detailButton.setAttribute("data-bs-target", `#details-${index}`);
            detailButton.setAttribute("aria-expanded", "false");
            detailButton.setAttribute("aria-controls", `details-${index}`);
            detailButton.textContent = "Show details";

            // Event listener for Bootstrap collapse events
            detailsContainer.addEventListener("show.bs.collapse", function () {
                detailButton.textContent = "Show less";
            });

            detailsContainer.addEventListener("hide.bs.collapse", function () {
                detailButton.textContent = "Show details";
            });

            cardBody.appendChild(detailButton);
            cardBody.appendChild(detailsContainer); // Append detailsContainer (with collapsible content) to cardBody

            card.appendChild(cardBody);
            outputDiv.appendChild(card);

        });
    }

    else {
        var resistorError = document.createElement("div");
        resistorError.innerHTML = `<h4>Unfortunately there is no resistor network in our portfolio which fits the selected application.</h4>
      <br><h5>Please get a suitable resistor from a supplier.</h5>`

        outputDiv.appendChild(resistorError);
    }
}

export function getResistorGraphic(resistor) {
    let picturePath = "../sharedFiles/graphics/"
    if (resistor.resistorNetwork.length == 1) {
        switch (resistor.quantity) {
            case 1:
                return picturePath + "rn-S1.svg"
            case 2:
                if (resistor.resistorNetwork[0].inSeries) {
                    return picturePath + "rn-S2.svg"
                }
                else {
                    return picturePath + "rn-P2.svg"
                }
            case 3:
                if (resistor.resistorNetwork[0].inSeries) {
                    return picturePath + "rn-S3.svg"
                }
                else {
                    return picturePath + "rn-P3.svg"
                }
            case 4:
                if (resistor.resistorNetwork[0].inSeries) {
                    return picturePath + "rn-S4.svg"
                }
                else {
                    return picturePath + "rn-P4.svg"
                }
            case 5:
                if (resistor.resistorNetwork[0].inSeries) {
                    return picturePath + "rn-S5.svg"
                }
                else {
                    return picturePath + "rn-P5.svg"
                }
            case 6:
                if (resistor.resistorNetwork[0].inSeries) {
                    return picturePath + "rn-S6.svg"
                }
                else {
                    return picturePath + "rn-P6.svg"
                }
            default: return null;
        }
    }
    else if (resistor.resistorNetwork.length == 2) {
        if (resistor.quantity == 4) {
            return [picturePath + "rn-P2S2.svg", picturePath + "rn-S2P2.svg"]
        }
        else if (resistor.quantity == 6) {
            return [picturePath + "rn-P3S2.svg", picturePath + "rn-S2P3.svg"]
        }
    }
    else if (resistor.resistorNetwork.length == 3) {
        return [picturePath + "rn-P2S3.svg", picturePath + "rn-S3P2.svg"]
    }
    return null;
}


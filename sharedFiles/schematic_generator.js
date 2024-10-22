/*
 * This project uses Snap.svg, which is licensed under the Apache License 2.0.
 * You can find the full license text at http://www.apache.org/licenses/LICENSE-2.0
 */

export function createSchematic(numCDBRs, CR700_name, CDBR_name, Rmin, Rmax, RPower) {
    var rectWidth = 80;
    var rectHeight = 120;
    var cornerRounding = 8;
    var strokeWidth = 2;
    var zeroPointX = strokeWidth + rectWidth / 2;
    var zeroPointyY = strokeWidth;

    //var svgContainer = document.getElementById("svg-schematic");
    var s = Snap(1000, 1000);
    //s.attr({ viewBox: "0 0 600 600" });

    // Get middle of bottom of rect
    function mb(rect) {
        var bbox = rect.getBBox();
        var coordinates = {
            x: bbox.x + bbox.width / 2,
            y: bbox.y + bbox.height
        };
        return coordinates;
    }

    // Get middle of top of rect
    function mt(rect) {
        var bbox = rect.getBBox();
        var coordinates = {
            x: bbox.x + bbox.width / 2,
            y: bbox.y
        };
        return coordinates;
    }

    // Get middle of the left side of rect
    function ml(rect) {
        var bbox = rect.getBBox();
        var coordinates = {
            x: bbox.x,
            y: bbox.y + bbox.height / 2,
        };
        return coordinates;
    }

    // Get middle of the right side of rect
    function mr(rect) {
        var bbox = rect.getBBox();
        var coordinates = {
            x: bbox.x + bbox.width,
            y: bbox.y + bbox.height / 2,
        };
        return coordinates;
    }

    if (numCDBRs > 0) {


        // Create the first rectangle (CR700)
        var CR700 = s.rect(zeroPointX + (rectWidth * (numCDBRs - 1)), zeroPointyY, rectWidth, rectHeight, cornerRounding, cornerRounding).attr({
            fill: "transparent",
            stroke: "#005BBB",
            strokeWidth: strokeWidth
        });

        // Add text inside CR700 with line break
        var textX = zeroPointX + (rectWidth * (numCDBRs - 1)) + rectWidth / 2;
        var textY = zeroPointyY + rectHeight / 2;
        var lines = CR700_name.split(/(CR70)/).filter(Boolean);;
        s.text(textX, textY - 10, lines[0] + "-").attr({
            'text-anchor': 'middle',
            'dominant-baseline': 'middle',
            'font-size': 14,
            'fill': '#005BBB',
            'font-family': 'Roboto, Arial, sans-serif',
            'fontWeight': 'bold'
        });
        s.text(textX, textY + 10, lines[1]).attr({
            'text-anchor': 'middle',
            'dominant-baseline': 'middle',
            'font-size': 14,
            'fill': '#005BBB',
            'font-family': 'Roboto, Arial, sans-serif',
            'fontWeight': 'bold'
        });

        // Function to create multiple CDBR rectangles
        var spacing = rectWidth + rectWidth; // Adjust spacing as needed
        var startX = zeroPointX;
        var spacingY = zeroPointyY + rectHeight * 1.5

        for (var i = 0; i < numCDBRs; i++) {
            var x = startX + i * spacing;
            var CDBR = s.rect(x, spacingY, rectWidth, rectHeight, cornerRounding, cornerRounding).attr({
                fill: "transparent",
                stroke: "#747678",
                strokeWidth: strokeWidth
            });

            // Add text inside CDBR with line break
            var cdbrTextX = x + rectWidth / 2;
            var cdbrTextY = spacingY + rectHeight / 2;
            var lines = CDBR_name.split("-").filter(Boolean);;
            s.text(cdbrTextX, cdbrTextY - 20, lines[0] + "-").attr({
                'text-anchor': 'middle',
                'dominant-baseline': 'middle',
                'font-size': 14,
                'fill': '#747678',
                'font-family': 'Roboto, Arial, sans-serif',
                'fontWeight': 'bold'

            });
            s.text(cdbrTextX, cdbrTextY, lines[1]).attr({
                'text-anchor': 'middle',
                'dominant-baseline': 'middle',
                'font-size': 14,
                'fill': '#747678',
                'font-family': 'Roboto, Arial, sans-serif',
                'fontWeight': 'bold'
            });

            var masterSlaveText = "(Master)";
            if (i > 0) {
                masterSlaveText = "(Slave)"
            }
            s.text(cdbrTextX, cdbrTextY + 20, masterSlaveText).attr({
                'text-anchor': 'middle',
                'dominant-baseline': 'middle',
                'font-size': 14,
                'fill': '#747678',
                'font-family': 'Roboto, Arial, sans-serif',
            });

            // Draw right-angle line connecting CR700 to each CDBR
            var cr700Bottom = mb(CR700);
            var cdbrTop = mt(CDBR);

            // Calculate the midpoints for the bend
            var midX = cr700Bottom.x;
            var midY = (cr700Bottom.y + cdbrTop.y) / 2;

            s.path(`M${cr700Bottom.x},${cr700Bottom.y} V${midY} H${cdbrTop.x} V${cdbrTop.y}`).attr({
                stroke: "black",
                strokeWidth: 1,
                fill: "none"
            });

            // Create a resistor centered under each CDBR
            var smallRectWidth = rectWidth / 1.6;
            var smallRectHeight = rectHeight / 4;
            var smallRectX = x + (rectWidth - smallRectWidth) / 2;
            var smallRectY = mb(CDBR).y + (rectHeight / 3);
            var resistor = s.rect(smallRectX, smallRectY, smallRectWidth, smallRectHeight).attr({
                fill: "transparent",
                stroke: "#616365",
                strokeWidth: strokeWidth
            });

            // Add lines to connect resistor
            var startB1LineX = mb(CDBR).x - rectWidth * (1 / 6);
            var startB1LineY = mb(CDBR).y;

            s.path(`M${startB1LineX},${startB1LineY} v${((mt(resistor).y) - mb(CDBR).y) / 2} h${-rectWidth / 2} V${ml(resistor).y} H${ml(resistor).x}`).attr({
                stroke: "black",
                strokeWidth: 1,
                fill: "none"
            });

            var startB2LineX = mb(CDBR).x + rectWidth * (1 / 6);
            var startB2LineY = mb(CDBR).y;

            s.path(`M${startB2LineX},${startB2LineY} v${((mt(resistor).y) - mb(CDBR).y) / 2} h${rectWidth / 2} V${ml(resistor).y} H${ml(resistor).x + smallRectWidth}`).attr({
                stroke: "black",
                strokeWidth: 1,
                fill: "none"
            });

            //Add B1, B2 text

            s.text(startB1LineX, startB1LineY - 7, "B1").attr({
                'text-anchor': 'middle',
                'dominant-baseline': 'middle',
                'font-size': 12,
                'fill': '#616365',
                'font-family': 'Roboto, Arial, sans-serif',
                'fontWeight': 'bold'
            });

            s.text(startB2LineX, startB2LineY - 7, "B2").attr({
                'text-anchor': 'middle',
                'dominant-baseline': 'middle',
                'font-size': 12,
                'fill': '#616365',
                'font-family': 'Roboto, Arial, sans-serif',
                'fontWeight': 'bold'
            });


            // Add resistor information

            var text = "Resistor Network:";

            var resistorBottom = mb(resistor);
            var textSpacing = 15;

            s.text(resistorBottom.x, resistorBottom.y + textSpacing, text).attr({
                'text-anchor': 'middle',
                'dominant-baseline': 'middle',
                'font-size': 12,
                'fill': '#616365',
                'font-family': 'Roboto, Arial, sans-serif',
                'fontWeight': 'bold'
            });
            for (var j = 2; j <= 4; j++) {
                if (j == 2) {
                    text = "Rmin: " + Rmin + " Ω";
                }
                else if (j == 3) {
                    text = "Rmax: " + Rmax + " Ω";
                }

                else if (j == 4) {
                    text = "Power: " + RPower + " kW";
                }
                s.text(resistorBottom.x, resistorBottom.y + j * textSpacing, text).attr({
                    'text-anchor': 'middle',
                    'dominant-baseline': 'middle',
                    'font-size': 12,
                    'fill': '#616365',
                    'font-family': 'Roboto, Arial, sans-serif'
                });
            }

        }
    }
    else {
        //Create graphic without CDBR
        // Create the first rectangle (CR700)
        var CR700 = s.rect(zeroPointX + rectWidth, zeroPointyY, rectWidth, rectHeight, cornerRounding, cornerRounding).attr({
            fill: "transparent",
            stroke: "#005BBB",
            strokeWidth: strokeWidth
        });

        // Add text inside CR700 with line break
        var textX = zeroPointX + rectWidth + rectWidth / 2;
        var textY = zeroPointyY + rectHeight / 2;
        var lines = CR700_name.split(/(CR70)/).filter(Boolean);;
        s.text(textX, textY - 10, lines[0] + "-").attr({
            'text-anchor': 'middle',
            'dominant-baseline': 'middle',
            'font-size': 14,
            'fill': '#005BBB',
            'font-family': 'Roboto, Arial, sans-serif',
            'fontWeight': 'bold'
        });
        s.text(textX, textY + 10, lines[1]).attr({
            'text-anchor': 'middle',
            'dominant-baseline': 'middle',
            'font-size': 14,
            'fill': '#005BBB',
            'font-family': 'Roboto, Arial, sans-serif',
            'fontWeight': 'bold'
        });

        // Add lines to connect resistor
        var startB1LineX = mb(CR700).x - rectWidth * (1 / 6);
        var startB1LineY = mb(CR700).y;

        // Create a resistor centered under each CDBR
        var smallRectWidth = rectWidth / 1.6;
        var smallRectHeight = rectHeight / 4;
        var smallRectX = mb(CR700).x - smallRectWidth / 2;
        var smallRectY = mb(CR700).y + rectHeight / 3;

        var resistor = s.rect(smallRectX, smallRectY, smallRectWidth, smallRectHeight).attr({
            fill: "transparent",
            stroke: "#616365",
            strokeWidth: strokeWidth
        });

        s.path(`M${startB1LineX},${startB1LineY} v${((mt(resistor).y) - mb(CR700).y) / 2} h${-rectWidth / 2} V${ml(resistor).y} H${ml(resistor).x}`).attr({
            stroke: "black",
            strokeWidth: 1,
            fill: "none"
        });

        var startB2LineX = mb(CR700).x + rectWidth * (1 / 6);
        var startB2LineY = mb(CR700).y;

        s.path(`M${startB2LineX},${startB2LineY} v${((mt(resistor).y) - mb(CR700).y) / 2} h${rectWidth / 2} V${ml(resistor).y} H${ml(resistor).x + smallRectWidth}`).attr({
            stroke: "black",
            strokeWidth: 1,
            fill: "none"
        });

        //Add B1, B2 text

        s.text(startB1LineX, startB1LineY - 7, "B1").attr({
            'text-anchor': 'middle',
            'dominant-baseline': 'middle',
            'font-size': 12,
            'fill': '#616365',
            'font-family': 'Roboto, Arial, sans-serif',
            'fontWeight': 'bold'
        });

        s.text(startB2LineX, startB2LineY - 7, "B2").attr({
            'text-anchor': 'middle',
            'dominant-baseline': 'middle',
            'font-size': 12,
            'fill': '#616365',
            'font-family': 'Roboto, Arial, sans-serif',
            'fontWeight': 'bold'
        });

        // Add resistor information

        var text = "Resistor Network:";

        var resistorBottom = mb(resistor);
        var textSpacing = 15;

        s.text(resistorBottom.x, resistorBottom.y + textSpacing, text).attr({
            'text-anchor': 'middle',
            'dominant-baseline': 'middle',
            'font-size': 12,
            'fill': '#616365',
            'font-family': 'Roboto, Arial, sans-serif',
            'fontWeight': 'bold'
        });
        for (var j = 2; j <= 4; j++) {
            if (j == 2) {
                text = "Rmin: " + Rmin + " Ω";
            }
            else if (j == 3) {
                text = "Rmax: " + Rmax + " Ω";
            }

            else if (j == 4) {
                text = "Power: " + RPower + " kW";
            }
            s.text(resistorBottom.x, resistorBottom.y + j * textSpacing, text).attr({
                'text-anchor': 'middle',
                'dominant-baseline': 'middle',
                'font-size': 12,
                'fill': '#616365',
                'font-family': 'Roboto, Arial, sans-serif'
            });
        }

    }

    // Calculate the bounding box of all elements
    var bbox = s.getBBox();

    // Adjust the size of the Snap.svg canvas
    s.attr({
        width: bbox.width + strokeWidth ,
        height: bbox.height + strokeWidth ,
        viewBox: `${bbox.x - strokeWidth} ${bbox.y -strokeWidth} ${bbox.width + strokeWidth *2} ${bbox.height + strokeWidth*2}`
    });

    // Once the drawing is done, convert SVG to Data URL
    var svgString = new XMLSerializer().serializeToString(s.node);
    //Remove drawing which snap.svg would put on the button of the page
    s.node.remove();
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);
}

// Example usage: create 4 CDBR rectangles with text "CDBR-4045D"
//createSchematic(3, "CR70C4304", "CDBR-4045D", 20, 25, 100);
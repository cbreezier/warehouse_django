/*
 * Initial settings
 */
selectedBay = 0;
selectedPallet = 0;

/*
 * Events and functions that process when things happen
 */
$(document).ready(function() {
    renderBirdView();
    renderGroundView();
    displayDetails();

    var birdview = document.getElementById('birdview');
    birdview.addEventListener('click', function(event) {
        var coords = birdview.relMouseCoords(event);
        renderBirdView(coords);
    }, false);

    var groundview = document.getElementById('groundview');
    groundview.addEventListener('click', function(event) {
        var coords = groundview.relMouseCoords(event);
        renderGroundView(coords);
    }, false);
});
$(window).resize(function() {
    renderBirdView();
    renderGroundView();
});

HTMLCanvasElement.prototype.relMouseCoords = function (event) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    } while (currentElement = currentElement.offsetParent);

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {x: canvasX, y: canvasY}
}

/*
 * Helper functions
 */
function shadeColor(color, percent) {
    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

function selectBay(bay) {
    selectedBay = bay;
    selectedPallet = 0;
    renderGroundView();
    displayDetails();
}
function selectPallet(pallet) {
    selectedPallet = pallet;
    displayDetails();
}

/*
 * Birds-eye view
 */
function renderBirdView(coords) {
    // Set default value for coords (0, 0)
    coords = coords !== undefined ? coords : {x: 0, y: 0};

    // Set width and height manually to avoid stretching
    var birdview = document.getElementById('birdview');
    birdview.width = birdview.parentNode.offsetWidth;
    birdview.height = birdview.parentNode.offsetHeight;
    var birdview_c = birdview.getContext('2d');

    // Some preliminary calculation variables
    var margin = 20;
    var shelfWidth = (birdview.height - (2 * margin)) / 8;
    var bayWidth = (birdview.width - (2 * margin)) / 20;
    var fontSize = bayWidth / 2;

    // Check for click event
    if (coords.x !== 0 && coords.y !== 0) {
        if (coords.y > margin && coords.y < margin + shelfWidth) {
            // Click is in shelf 1 (Top shelf)
            if (coords.x > margin && coords.x < margin + (20 * bayWidth)) {
                var fromTheLeft = parseInt((coords.x - margin) / bayWidth);
                var bayClicked = 20 - fromTheLeft;

                // Mark this bay as selected
                selectBay(bayClicked);
            }
        } else if (coords.y > margin + (7 * shelfWidth) && coords.y < margin + (8 * shelfWidth)) {
            // Click is in shelf 4 (Bottom shelf)
            if (coords.x > margin && coords.x < margin + (11 * bayWidth)) {
                var fromTheLeft = parseInt((coords.x - margin) / bayWidth);
                var bayClicked = 31 - fromTheLeft;

                // Mark this bay as selected
                selectBay(bayClicked);
            }
        } else {
            selectBay(0);
        }
    }

    // Some basic settings
    var baseColor = '#EEEEEE';
    var highlightX = 0;
    var highlightY = 0;
    birdview_c.lineWidth = 1;
    birdview_c.strokeStyle = 'white';

    // Draw the pallets corresponding to shelf 1 (Top shelf)
    for (var i = 0; i < 20; i++) {
        var startX = margin + (i * bayWidth);
        var startY = margin;

        var bayNumber = 20 - i;
        if (bayNumber === selectedBay) {
            highlightX = startX;
            highlightY = startY;
        }
        var sum = 0;
        for (var j = 0; j < 8; j++) {
            sum += palletData[bayNumber][j]['volume'];
        }
        birdview_c.fillStyle = shadeColor(baseColor, -sum * 100 / (8 * volumePerPallet));

        birdview_c.fillRect(startX, startY, bayWidth, shelfWidth);
        birdview_c.strokeRect(startX, startY, bayWidth, shelfWidth);

        birdview_c.fillStyle = 'black';
        birdview_c.textAlign = 'center';
        birdview_c.fillText(''+bayNumber,
                            startX + bayWidth/2,
                            startY + shelfWidth + bayWidth/2);
    }

    // Draw the pallets corresponding to shelf 4 (Bottom shelf)
    for (var i = 0; i < 11; i++) {
        var startX = margin + (i * bayWidth);
        var startY = margin + (7 * shelfWidth);

        var bayNumber = 31 - i;
        if (bayNumber === selectedBay) {
            highlightX = startX;
            highlightY = startY;
        }
        var sum = 0;
        for (var j = 0; j < 8; j++) {
            sum += palletData[bayNumber][j]['volume'];
        }
        birdview_c.fillStyle = shadeColor(baseColor, -sum * 100 / (8 * volumePerPallet));

        birdview_c.fillRect(startX, startY, bayWidth, shelfWidth);
        birdview_c.strokeRect(startX, startY, bayWidth, shelfWidth);

        birdview_c.fillStyle = 'black';
        birdview_c.textAlign = 'center';
        birdview_c.fillText(''+bayNumber,
                            startX + bayWidth/2,
                            startY - bayWidth/4);
    }

    // These shelves do not exist yet (Center shelves)
    birdview_c.fillStyle = '#F9F9F9';
    birdview_c.strokeStyle = 'white';
    birdview_c.beginPath();
    birdview_c.rect(margin, margin + (3 * shelfWidth),
                    birdview.width / 2, shelfWidth);
    birdview_c.fill();
    birdview_c.stroke();

    birdview_c.beginPath();
    birdview_c.rect(margin, margin + (4 * shelfWidth),
                    birdview.width / 2, shelfWidth);
    birdview_c.fill();
    birdview_c.stroke();

    // Highlight the matching bay
    if (highlightX != 0 && highlightY != 0) {
        birdview_c.lineWidth = 2;
        birdview_c.strokeStyle = 'blue';
        birdview_c.strokeRect(highlightX, highlightY, bayWidth, shelfWidth);
    }
}

/*
 * Mans-eye view
 */
function renderGroundView(coords) {
    // Set default value for coords (0, 0)
    coords = coords !== undefined ? coords : {x: 0, y: 0};

    // Set width and height manually to avoid stretching
    var groundview = document.getElementById('groundview');
    groundview.width = groundview.parentNode.offsetWidth;
    groundview.height = groundview.parentNode.offsetHeight;
    var groundview_c = groundview.getContext('2d');

    // No bay selected - special case
    if (selectedBay === 0) {
        groundview_c.fillStyle = '#DDDDDD';
        groundview_c.font = (groundview.width / 20) + 'px Arial';
        groundview_c.textAlign = 'center';
        groundview_c.fillText('No bay selected',
                              groundview.width / 2,
                              groundview.height / 2);
        return;
    }

    // Some preliminary calculation variables
    var marginLeft = 100;
    var margin = 20;
    var offsetY = groundview.height * 0.15;
    var dy = groundview.height * 0.8 / 4;
    var dx = (groundview.width - marginLeft - margin) / 2;

    // Check for click event
    if (coords.x !== 0 && coords.y !== 0) {
        if (coords.y > offsetY && coords.y < offsetY + 4 * dy &&
            coords.x > marginLeft && coords.x < marginLeft + 2 * dx) {
            // Click is on a pallet
            var row = parseInt((coords.y - offsetY) / dy);
            var col = parseInt((coords.x - marginLeft) / dx);

            var palletClicked = (row * 2) + col + 1;
            selectPallet(palletClicked);
        } else {
            selectPallet(0);
        }
    }

    // Some basic settings
    groundview_c.fillStyle = 'black';
    groundview_c.font = 0.5 * offsetY + 'px Arial';
    groundview_c.textAlign = 'center';
    groundview_c.fillText('Bay ' + selectedBay, groundview.width / 2, offsetY - 20);

    var highlightX = 0;
    var highlightY = 0;

    groundview_c.strokeStyle = 'gray';
    groundview_c.lineWidth = 2;
    for (var row = 0; row < 4; row++) {
        var startY = offsetY + (row * dy);
        for (var col = 0; col < 2; col++) {
            var startX = marginLeft + (col * dx);
            
            var palletNumber = (row * 2) + col + 1;
            if (palletNumber === selectedPallet) {
                highlightX = startX;
                highlightY = startY;
            }

            // Data for this pallet
            var data = palletData[selectedBay][palletNumber - 1];

            // Draw height based on volume
            var fillHeight = data['volume'] / volumePerPallet * dy;
            groundview_c.fillStyle = '#DDDDDD';
            groundview_c.fillRect(startX+1, startY + dy - fillHeight+1, dx-2, fillHeight-1);
            groundview_c.strokeRect(startX, startY, dx, dy);

            // Write pallet contents text
            groundview_c.fillStyle = '#888888';
            groundview_c.textAlign = 'center';
            groundview_c.font = 0.3 * offsetY + 'px Arial';
            groundview_c.fillText(data['stock'], startX + dx/2, startY + dy/2);
            if (data['stock'] !== 'None') {
                groundview_c.font = 0.2 * offsetY + 'px Arial';
                groundview_c.fillText(data['qty'] + 'pcs', startX + dx/2, startY + 3*dy/4);
            }
            
        }
        // Write Level X text
        groundview_c.fillStyle = 'black';
        groundview_c.textAlign = 'left';
        groundview_c.font = 0.3 * offsetY + 'px Arial';
        groundview_c.fillText('Level ' + (4 - row), margin, startY + dy/2);
    }

    if (highlightX != 0 && highlightY != 0) {
        groundview_c.strokeStyle = 'blue';
        groundview_c.strokeRect(highlightX, highlightY, dx, dy);
    }
}

/*
 * Update details box
 */
function displayDetails() {
    var title = '';
    var body = '';
    if (selectedPallet != 0) {
        var level = 4 - parseInt((selectedPallet - 1) / 2);
        var side = selectedPallet % 2 === 0 ? 'Right':'Left';
        var data = palletData[selectedBay][selectedPallet - 1];

        // Pallet data
        title = 'Bay ' + selectedBay + ': ' + side + ' pallet level ' + level;
        var volume = data['volume'];
        body += (volume * 100 / volumePerPallet).toFixed(2) + '% full.<br>';
        for (var field in data) {
            body += field + ': ' + data[field] + '<br>';
        }

        // Stock data
        if (data['stock'] !== 'None') {
            body += '<br>';
            for (var field in stockData[data['stock']]) {
                body += '> ' + field + ': ' + stockData[data['stock']][field] + '<br>';
            }
        }
    } else if (selectedBay != 0) {
        title = 'Bay ' + selectedBay;
    } else {
        title = 'Warehouse';
    }

    var html = '<h2>' + title + '</h2><p>' + body + '</p>';
    $('#details .content').html(html);
}
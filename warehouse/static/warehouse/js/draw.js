selectedBay = parseInt(Math.random() * 31) + 1;
selectedPallet = parseInt(Math.random() * 8) + 1;
palletData = new Array(31);
for (var i = 0; i < 31; i++) {
    palletData[i] = new Array(8);
    for (var j = 0; j < 8; j++) {
        palletData[i][j] = Math.random() * 100;
    }
}

$(document).ready(function() {
    renderBirdView(selectedBay, palletData);
    renderGroundView(selectedBay, selectedPallet, palletData);
});

$(window).resize(function() {
    renderBirdView(selectedBay, palletData);
    renderGroundView(selectedBay, selectedPallet, palletData);
});

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

/*
 * Birds-eye view
 */
function renderBirdView(selectedBay, palletData) {
    var birdview = document.getElementById('birdview');
    birdview.width = birdview.parentNode.offsetWidth;
    birdview.height = birdview.parentNode.offsetHeight;
    var birdview_c = birdview.getContext('2d');

    var margin = 20;
    var shelfWidth = (birdview.height - (2 * margin)) / 8;
    var bayWidth = (birdview.width - (2 * margin)) / 20;
    var fontSize = bayWidth / 2;

    var baseColor = '#EEEEEE';
    var highlightX = 0;
    var highlightY = 0;
    birdview_c.lineWidth = 1;
    birdview_c.strokeStyle = 'white';

    for (var i = 0; i < 20; i++) {
        var startX = margin + (i * bayWidth);
        var startY = margin;

        var bayNumber = 20 - i;
        if (bayNumber == selectedBay) {
            highlightX = startX;
            highlightY = startY;
        }
        var sum = 0;
        for (var j = 0; j < 8; j++) {
            sum += palletData[bayNumber - 1][j];
        }
        birdview_c.fillStyle = shadeColor(baseColor, -sum/8);

        birdview_c.fillRect(startX, startY, bayWidth, shelfWidth);
        birdview_c.strokeRect(startX, startY, bayWidth, shelfWidth);

        birdview_c.fillStyle = 'black';
        birdview_c.textAlign = 'center';
        birdview_c.fillText(''+bayNumber,
                            startX + bayWidth/2,
                            startY + shelfWidth + bayWidth/2);
    }

    for (var i = 0; i < 11; i++) {
        var startX = margin + (i * bayWidth);
        var startY = margin + (7 * shelfWidth);

        var bayNumber = 31 - i;
        if (bayNumber == selectedBay) {
            highlightX = startX;
            highlightY = startY;
        }
        var sum = 0;
        for (var j = 0; j < 8; j++) {
            sum += palletData[bayNumber - 1][j];
        }
        birdview_c.fillStyle = shadeColor(baseColor, -sum/8);

        birdview_c.fillRect(startX, startY, bayWidth, shelfWidth);
        birdview_c.strokeRect(startX, startY, bayWidth, shelfWidth);

        birdview_c.fillStyle = 'black';
        birdview_c.textAlign = 'center';
        birdview_c.fillText(''+bayNumber,
                            startX + bayWidth/2,
                            startY - bayWidth/4);
    }

    // These shelves do not exist yet
    birdview_c.strokeStyle = baseColor;
    birdview_c.beginPath();
    birdview_c.rect(margin, margin + (3 * shelfWidth),
                    birdview.width / 2, shelfWidth);
    birdview_c.stroke();

    birdview_c.beginPath();
    birdview_c.rect(margin, margin + (4 * shelfWidth),
                    birdview.width / 2, shelfWidth);
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
function renderGroundView(selectedBay, selectedPallet) {
    var groundview = document.getElementById('groundview');
    groundview.width = groundview.parentNode.offsetWidth;
    groundview.height = groundview.parentNode.offsetHeight;
    var groundview_c = groundview.getContext('2d');

    if (selectedBay == 0) {
        groundview_c.fillStyle = '#DDDDDD';
        groundview_c.font = (groundview.width / 20) + 'px Arial';
        groundview_c.textAlign = 'center';
        groundview_c.fillText('No bay selected',
                              groundview.width / 2,
                              groundview.height / 2);
        return;
    }

    var margin = 20;
    var offsetY = groundview.height * 0.15;
    var dy = groundview.height * 0.8 / 4;
    var dx = (groundview.width - (2 * margin)) / 2;

    groundview_c.fillStyle = 'black';
    groundview_c.font = 0.5 * offsetY + 'px Arial';
    groundview_c.textAlign = 'center';
    groundview_c.fillText('Bay ' + selectedBay, groundview.width / 2, offsetY - 20);

    groundview_c.strokeStyle = 'gray';
    groundview_c.lineWidth = 2;
    groundview_c.fillStyle = '#DDDDDD';
    for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 2; col++) {
            var palletNumber = (row * 2) + col + 1;
            var fillHeight = palletData[selectedBay - 1][palletNumber - 1] * dy / 100;
            groundview_c.fillRect(startX+1, startY + dy - fillHeight+1, dx-2, fillHeight-1);

            var startX = margin + (col * dx);
            var startY = offsetY + (row * dy);
            groundview_c.strokeRect(startX, startY, dx, dy);
        }
    }
}
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
    renderBirdView(selectedBay);
    renderGroundView(selectedBay, selectedPallet, palletData);
});

$(window).resize(function() {
    renderBirdView(selectedBay);
    renderGroundView(selectedBay, selectedPallet, palletData);
});

/*
 * Birds-eye view
 */
function renderBirdView(selectedBay) {
    var birdview = document.getElementById('birdview');
    birdview.width = birdview.parentNode.offsetWidth;
    birdview.height = birdview.parentNode.offsetHeight;
    var birdview_c = birdview.getContext('2d');

    var margin = 20;
    var shelfWidth = (birdview.height - (2 * margin)) / 8;

    birdview_c.fillStyle = 'cyan';

    birdview_c.beginPath();
    birdview_c.rect(margin, margin, birdview.width - (2 * margin), shelfWidth);
    birdview_c.fill();
    birdview_c.stroke();

    birdview_c.beginPath();
    birdview_c.rect(margin, margin + (3 * shelfWidth), birdview.width - (2 * margin), shelfWidth);
    birdview_c.fill();
    birdview_c.stroke();

    birdview_c.beginPath();
    birdview_c.rect(margin, margin + (4 * shelfWidth), birdview.width - (2 * margin), shelfWidth);
    birdview_c.fill();
    birdview_c.stroke();

    birdview_c.beginPath();
    birdview_c.rect(margin, margin + (7 * shelfWidth), birdview.width - (2 * margin), shelfWidth);
    birdview_c.fill();
    birdview_c.stroke();
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
    groundview_c.fillStyle = 'orange';
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

    // groundview_c.strokeStyle = 'gray';

    // groundview_c.beginPath();
    // var dy = groundview.height * 0.8 / 4;
    // for (var i = 1; i <= 4; i++) {
    //     groundview_c.moveTo(margin, offsetY + (i * dy));
    //     groundview_c.lineTo(groundview.width - margin, offsetY + (i * dy));
    // }
    // groundview_c.moveTo(groundview.width / 2, offsetY);
    // groundview_c.lineTo(groundview.width / 2, offsetY + (4 * dy));
    // groundview_c.stroke();
}
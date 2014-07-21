$(document).ready(function() {
    /*
     * Birds-eye view
     */
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

    /*
     * Mans-eye view
     */
    var groundview = document.getElementById('groundview');
    groundview.width = groundview.parentNode.offsetWidth;
    groundview.height = groundview.parentNode.offsetHeight;
    var groundview_c = groundview.getContext('2d');

    var offsetY = groundview.height * 0.15;

    groundview_c.font = '30pt Arial';
    groundview_c.textAlign = 'center';
    groundview_c.fillText('Bay 4', groundview.width / 2, offsetY - 10);

    groundview_c.strokeStyle = 'gray';

    groundview_c.beginPath();
    var dy = groundview.height * 0.55 / 4;
    for (var i = 1; i <= 4; i++) {
        groundview_c.moveTo(0, offsetY + (i * dy));
        groundview_c.lineTo(groundview.width, offsetY + (i * dy));
    }
    groundview_c.moveTo(groundview.width / 2, offsetY);
    groundview_c.lineTo(groundview.width / 2, offsetY + (4 * dy));
    groundview_c.stroke();
});
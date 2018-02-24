/*global $*/
'use strict';

function main() {
    $('#logo').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
    $('#logo_min').on('click',function () {
        $('#sidebar').toggleClass('active');
    });
}

$(document).ready(main);
/*global $*/
'use strict';

function main() {
    $('#home-option').on('click', function () {
        if(!$('#home-option').hasClass("active-item")){

            $('#home-option').toggleClass("active-item");
            $('#home-link').toggleClass("active-link");

            if($('#contact-option').hasClass("active-item")){

                $('#contact-option').toggleClass("active-item");
                $('#contact-link').toggleClass("active-link");
            }
        }
    });

    $('#contact-option').on('click', function () {
        if(!$('#contact-option').hasClass("active-item")){

            $('#contact-option').toggleClass("active-item");
            $('#contact-link').toggleClass("active-link");

            if($('#home-option').hasClass("active-item")){

                $('#home-option').toggleClass("active-item");
                $('#home-link').toggleClass("active-link");
            }
        }
    });
}

$(document).ready(main);
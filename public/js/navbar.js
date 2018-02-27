/*global $*/
'use strict';

function main() {
    $('#home-option').on('click', function () {
        if(!$('#home-option').hasClass("active-item")){

            $('#home-option').toggleClass("active-item");
            $('#home-link').toggleClass("active-link");

            if($('#my-stats-option').hasClass("active-item")){

                $('#my-stats-option').toggleClass("active-item");
                $('#my-stats-link').toggleClass("active-link");
            }else if($('#challenge-option').hasClass("active-item")){

                $('#challenge-option').toggleClass("active-item");
                $('#challenge-link').toggleClass("active-link");
            }else if($('#contact-option').hasClass("active-item")){

                $('#contact-option').toggleClass("active-item");
                $('#contact-link').toggleClass("active-link");
            }
        }
    });

    $('#my-stats-option').on('click', function () {
        if(!$('#my-stats-option').hasClass("active-item")){

            $('#my-stats-option').toggleClass("active-item");
            $('#my-stats-link').toggleClass("active-link");

            if($('#home-option').hasClass("active-item")){

                $('#home-option').toggleClass("active-item");
                $('#home-link').toggleClass("active-link");
            }else if($('#challenge-option').hasClass("active-item")){

                $('#challenge-option').toggleClass("active-item");
                $('#challenge-link').toggleClass("active-link");
            }else if($('#contact-option').hasClass("active-item")){

                $('#contact-option').toggleClass("active-item");
                $('#contact-link').toggleClass("active-link");
            }
        }
    });

    $('#challenge-option').on('click', function () {
        if(!$('#challenge-option').hasClass("active-item")){

            $('#challenge-option').toggleClass("active-item");
            $('#challenge-link').toggleClass("active-link");

            if($('#home-option').hasClass("active-item")){

                $('#home-option').toggleClass("active-item");
                $('#home-link').toggleClass("active-link");
            }else if($('#my-stats-option').hasClass("active-item")){

                $('#my-stats-option').toggleClass("active-item");
                $('#my-stats-link').toggleClass("active-link");
            }else if($('#contact-option').hasClass("active-item")){

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
            }else if($('#my-stats-option').hasClass("active-item")){

                $('#my-stats-option').toggleClass("active-item");
                $('#my-stats-link').toggleClass("active-link");
            }else if($('#contact-option').hasClass("active-item")){

                $('#challenge-option').toggleClass("active-item");
                $('#challenge-link').toggleClass("active-link");
            }
        }
    });
}

$(document).ready(main);
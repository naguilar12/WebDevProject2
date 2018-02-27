"use strict";

function resultsFromFoodSearch(data){
    let container = $(".foodItem, container-fluid");
    container.empty();
    data.forEach(function (d){
    let card=$("<div class=\"card\">")
        .append($("<div class=\"card-body\">")
        .append($("<h5>")
            .text(d.name)))
        .attr("id", d.ndbno);
        container.append(card);
        card.on("click", function(){
            let url="http://localhost:80/API/food/nutrition/"+d.ndbno;
            console.log(url);
            $.getJSON(url, detailedResult);
        });
    });
}

function detailedResult(food){
    let container = $(".foodItem, container-fluid");
    container.empty();
    console.log(food);
    container.append($("<div class=\"card\">")
        .append($("<div class=\"card-body\">")
            .append($("<h5>")
                .text(d.name))
            .append($("<p>"))));

}
$(".searchFoodButton").on("click", function(){
    let input = $(".foodSearchInput").val();
    let url="http://localhost:80/API/food/"+input;
    $.getJSON(url, resultsFromFoodSearch);
   });


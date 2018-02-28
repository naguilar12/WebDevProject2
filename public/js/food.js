"use strict";
let root="http://localhost";

function resultsFromFoodSearch(data){
    let container = $(".foodItem, container-fluid");
    container.empty();
    data.forEach(function (d){
    let card=$("<div class=\"card\">")
        .append($("<div class=\"card-body\">")
        .append($("<h5>")
            .text(d.name.toLowerCase())))
        .attr("id", d.ndbno);
        container.append(card);
        card.on("click", function(){
            let url=root+"/API/food/nutrition/"+d.ndbno;
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
                .text(food.name.toLowerCase()))
            .append($("<p>")
                .text("Portion: 100g"))
            .append($("<div class='row'>")
                .append($("<div class='col-2'>")
                    .text("Protein: "+food.protein))
                .append($("<div class='col-3'>")
                    .text("Carbohydrates: "+food.carbohydrates))
                .append($("<div class='col-2'>")
                    .text("Fat: "+food.fat))
                .append($("<div class='col-2'>")
                    .text("Fiber: "+food.fiber))
                .append($("<div class='col-3'>")
                    .text("Energy: "+food.kcals+" Kcals")))
            .append($("<div class='row'>")
                .append($("<p class='col-5'>")
                    .text("Number of portions taken"))
                .append($("<input type='text' value='1' class='col-2'>"))
                .append($("<span class='col-1'>"))
                .append($("<button id='portionsTakenBut' class=\"btn btn-primary col-4\">")
                    .text("Submit")))));

}
$(".searchFoodButton").on("click", function(){
    let input = $(".foodSearchInput").val();
    let url=root+"/API/food/"+input;
    $.getJSON(url, resultsFromFoodSearch);
   });

$(".submitWeight").on("click", function(){
   console.log("clicker weight");
   let temporalId=1;
   let url= root+"/API/myWeight/"+temporalId+"/"+$("#weight").value;
   console.log(url);
   
});
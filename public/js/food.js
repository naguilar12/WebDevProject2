"use strict";

function resultsFromFoodSearch(data){
    console.log("called callback");
    let container = $(".foodItem container-fluid");
    data.foreach(function (d){
    container.append($("<div class=\"card\">")
        .append($("<div class=\"card-body\">")
        .append($("<h5>")
            .text(d.name)))
        .attr("id", d.ndbno));
    });
    console.log(data);
}
$(".searchFoodButton").on("click", function(){
    console.log("clicked")
    let input = $(".foodSearchInput").val();
    console.log(input);
    let url="http://localhost:80/API/food/"+input;
    console.log(url);

   $.getJSON(url, resultsFromFoodSearch).done(resultsFromFoodSearch).fail(function( jqxhr, textStatus, error ) {
       var err = textStatus + ", " + error;
       console.log( "Request Failed: " + err );
   });
});

/* $.ajax({
     dataType: 'json',
     url: url,
     error: function(obj, str, error){

         console.log("An error occured");
         console.log(obj);
         console.log(str);
         console.log(error);
     },
     success: resultsFromFoodSearch
 }); */

//$.getJSON("https://api.nal.usda.gov/ndb/V2/reports?ndbno=45014897&type=f&format=json&api_key=hLowbDVqOU42auJEBrZPL8tGUSbGd5ok91ficFr3",resultsFromFoodSearch);



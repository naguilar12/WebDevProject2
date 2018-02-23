"use strict";

function resultsFromFoodSearch(data){
    console.log("called callback")
    let container = $(".foodItem container-fluid");
    console.log(data);
}
$(".searchFoodButton").on("click", function(){
    console.log("clicked")
    let input = $(".foodSearchInput").val();
    console.log(input);
    let url="http://localhost:80/API/food/"+input;
    console.log(url);
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
   $.getJSON(url, resultsFromFoodSearch).done(resultsFromFoodSearch).fail(function( jqxhr, textStatus, error ) {
       var err = textStatus + ", " + error;
       console.log( "Request Failed: " + err );
   });
});




$(document).ready(function () {
    document.getElementById("assignment-content").click();
    $("#assign25").click(function () {
        $("#Assign25Links").toggle();
    })

    $("#assign3").click(function () {
        $("#Assign3Links").toggle();
    })


    $("#assign4").click(function () {
        $("#Assign4Links").toggle();
    })

    $("#assign45").click(function () {
        $("#Assign45Links").toggle();
    })


    $("#assign6").click(function () {
        $("#Assign6Links").toggle();
    })

    $(".words").click(function(){
        $("#Assign25Links").hide();
        $("#Assign3Links").hide();
        $("#Assign4Links").hide();
        $("#Assign45Links").hide();
        $("#Assign6Links").hide();
    })


});


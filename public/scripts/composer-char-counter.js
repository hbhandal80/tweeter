//Function used for condown counter to validate the number of chars entered
$(document).ready(function() {
  
  $("textarea").keydown(function() {
    const length = ($(this).val().length);
    let count = 140;
    
    $(".counter").text(count - length);
    
    if (length > count) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
  });
});
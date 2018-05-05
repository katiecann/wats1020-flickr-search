/* ==========================================================================
   Author's custom scripts
   ========================================================================== */

$(function(){
  $('.modal-content').keypress(function(e){
    if(e.which == 13) {
      //dosomething
      alert('Enter pressed');
    }
  })
})

window.onload = function() {
  var input = document.getElementById("flickr-search").focus();
}
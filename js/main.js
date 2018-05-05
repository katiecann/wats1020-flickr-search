// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
// Allow users to click the images to see a larger version with more information.
$(document).on('ready', function(){
  var searchImages = function(tags) {			// Create a function called `searchImages()`. Accept a string value called `tags` as an argument.
    var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";		// Define the location of the Flickr API
    console.log(tags);
    $('#images').innerHTML = '<div class="search-throbber">Fetching...</div>';
    $.getJSON( flickrAPI, {			// Construct a `$.getJSON()` call and a `done()` handler.
      tags: tags,
      tagmode: "any",
      format: "json"
    }).done(function( data ) {
      $('#images').empty();				// Update the display to add the images to the list with the id `#images`.
      $('h1.search-title').first()[0].innerHTML = "Fetched:  " + " '" + tags + "'";
      $.each( data.items, function( i, item ) {
        var newListItem = $("<div class='col-md-6 col-lg-4 item'>");
        var newTitle = $('<p class="image-title">').html(item.title).appendTo(newListItem);
        var newDate = $('<p class="image-date">').text(item.date_taken).appendTo(newListItem);
        var newDescription = $('<p class="image-description">').html(item.description).appendTo(newListItem);
        

        var newButton = $("<button class='btn btn-sm btn-fis'>enlarge</button>").attr({
          'data-title': item.title,
          'data-toggle': "modal",
          'data-target': "#infoModal",
          'data-imgsrc': item.media.m,
          'data-description': item.description,
          'type': "button"
        }).appendTo(newListItem);
        newListItem.appendTo( "#images" );
        if ( i === 15 ) {
          return false;
        }
      });
    });
  };

  $('button.search').on('click', function(event){		// Attach an event to the search button (`button.search`) to execute the search when clicked.
    event.preventDefault();
    var searchTextInput = $(event.target.parentElement).find('input[name="searchText"]')[0];
    console.log(searchTextInput);
    searchImages(searchTextInput.value);
  });

  $('#infoModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var title = button.data('title'); // Extract info from data-* attributes
    var imgSrc = button.data('imgsrc');
    var imageDescription = button.data('description');

    // Update the modal's content.
    var modal = $(this);
    modal.find('.modal-title').html(title);
    var modalBody = modal.find('.modal-body');
    modalBody.empty();
    var modalDescription = $("<p class='image-description'>").html(imageDescription).appendTo(modalBody);
  });

});
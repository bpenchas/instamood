var API_DOMAIN = "https://api.instagram.com/v1";
var RECENT_MEDIA_PATH = "/users/self/media/recent";
// what do you think a variable in all caps means?

$(document).ready(function() {
  var token = window.location.hash;
  if (!token) {
    window.location.replace("./login.html");
  }
  token = token.replace("#", "?"); // Prepare for query parameter
  var mediaUrl = API_DOMAIN + RECENT_MEDIA_PATH + token;

  $.ajax({
    method: "GET",
    url: mediaUrl,
    dataType: "jsonp",
    success: handleResponse,
    error: function() {
      alert("there has been an error...")
    }
  })
});

function handleResponse(response) {
    console.log(response);
    var results = response.data;
    for (i = 0; i < results.length; i++) {
        var res = results[i];
        console.log(res);
        var image = $("<img src=" + res.images.standard_resolution.url + ">");
        $("body").append(image);

        var cap = $("<h2>" + res.caption.text + "</h2>");
        $("body").append(cap);
    }
}
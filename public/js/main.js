// Author: Mr.Tarntanate Memanee

function callShortenUrlApi() {
  // get full url from input dom
  var inputText = $('#full-url').val();

  if (inputText === null || inputText === '') {
    alert('Url is required!');
    return;
  };

  var jqxhr = $.get("/new/" + inputText, function (response) {
      console.debug(response);
      if (response.statusCode === 400) {
        alert(response.message);
        return;
      }
      var label = document.createElement("span");
      var result = document.createElement("a");
      label.innerText = 'Your shorten url is ';
      result.innerText = result.href = 'http://' + window.location.host + '/g/' +
        response.data.shortenUrl;

      $('#shortenUrlResult').empty().append(label).append(result);
    })
    .done(function () {
      // alert("second success");
      console.debug('calling api done');
    })
    .fail(function (err) {
      alert("Error calling api", err);
      console.error(err);
    });
};

// Add click event listener for 'Get short url' button
$('#getShortUrl').click(
  callShortenUrlApi
);

// Add form on submit event listener
$("#shortenUrlForm").submit(function (e) {
  callShortenUrlApi();
  return false;
});
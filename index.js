const searchURL = 'https://api.github.com';



function displayResults(responseJson) {
  // if there are previous results, remove them

  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.length; i++) {
    // for each video object in the articles
    //array, add a list item to the results 
    //list with the article title, source, author,
    //description, and image
    $('#results-list').append(
      `<li><a href=${responseJson[i].html_url}">${responseJson[i].html_url}</a>
      <p>${responseJson[i].name}</p>
      </li>`
    )
  };
  //display the results section  
  $('#results').removeClass('hidden');
};

function getRepos(userName) {

  const url = `https://api.github.com/users/${userName}/repos`



  /*
    const options = {
      headers: new Headers({
        "Accept": 'application/vnd.github.v3+json',
      }),
    };
  */
  fetch(url)
    .then(response => {
      if (response.ok) {

        return response.json();
      }
      throw new Error("exceed char limit");
    })
    .then(responseJson => {
      if (responseJson.length != 0) {
        displayResults(responseJson)
      } else {
        throw new Error("Search is Empty");
      }

    })
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const userName = $('#js-search-term').val();
    getRepos(userName);
  });
}

$(watchForm);
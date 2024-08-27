


function handleSearch(input){
    console.log(input)
}

function getFormInput(){
    return document.querySelector("#search-field").value
}

function getResponse(url) {

    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
  
        console.log(data.results);
    
      });
    
  }


document.querySelector("#search-btn").addEventListener("click", function(e){
    e.preventDefault();
    handleSearch(getFormInput())
    document.querySelector("#search-field").value = ''
})
// key: 83289a961f66ea21035d3f375d92539e


function handleSearch(input){
    // console.log(input)
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=83289a961f66ea21035d3f375d92539e`
    const response = getResponse(url);
    console.log(response)
}


function getWeather(locationObj){
  


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
        return data;    
      });
    
  }


document.querySelector("#search-btn").addEventListener("click", function(e){
    e.preventDefault();
    handleSearch(getFormInput())
    document.querySelector("#search-field").value = ''
})
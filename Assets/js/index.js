// key: 83289a961f66ea21035d3f375d92539e



function getFromStorage(name){
  const foundItem = localStorage.getItem(name)
  if( !foundItem ) return null 
  return JSON.parse(foundItem)
}

function saveToStorage(name, data){
  localStorage.setItem(name, JSON.stringify(data))
}

function handleSearch(userInput) {
  console.log(userInput)
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=83289a961f66ea21035d3f375d92539e`
  getResponse(url);
  addButton(userInput)
  saveToStorage("buttons", buttonsInStorage.concat([userInput]))
}

function handleDynamicSearch(input) {
  // console.log(input)
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=83289a961f66ea21035d3f375d92539e`
  getResponse(url);
}

function addButton(input){
  const buttonList = document.querySelector("#button-list")

  const listItem = document.createElement('li')
  const button = document.createElement('button')
  button.textContent = input
  button.onclick = () => handleDynamicSearch(input)
  button.setAttribute('class', 'dynamic-button')
  
  listItem.appendChild(button)

  buttonList.appendChild(listItem)
}

function getWeather(locationObj) {

  const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${locationObj.lat.toFixed(2)}&lon=${locationObj.lon.toFixed(2)}&appid=83289a961f66ea21035d3f375d92539e`

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data) // add the populate right side function here
    });
}


function getFormInput() {
  return document.querySelector("#search-field").value
}

function getResponse(url) {

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      getWeather(data[0])
    });
}


function populateButtons(){
  for (let i = 0; i < buttonsInStorage.length; i++){
    addButton(buttonsInStorage[i]);
  }
}


document.querySelector("#search-btn").addEventListener("click", function (e) {
  e.preventDefault();
  handleSearch(getFormInput())
  document.querySelector("#search-field").value = ''
})




const buttonsInStorage = getFromStorage("buttons") || [];
saveToStorage('buttons', buttonsInStorage)
populateButtons();

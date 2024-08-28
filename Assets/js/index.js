// key: 83289a961f66ea21035d3f375d92539e



function getFromStorage(name) {
  const foundItem = localStorage.getItem(name)
  if (!foundItem) return null
  return JSON.parse(foundItem)
}

function saveToStorage(name, data) {
  localStorage.setItem(name, JSON.stringify(data))
}

function handleSearch(userInput) {
  console.log(userInput)
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=83289a961f66ea21035d3f375d92539e`
  getResponse(url);
  addButton(userInput)
  saveToStorage("buttons", buttonsInStorage.concat([userInput]))
}

function handleDynamicSearch(input) {
  // console.log(input)
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=83289a961f66ea21035d3f375d92539e`
  getResponse(url);
}

function addButton(input) {
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

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${locationObj.lat.toFixed(2)}&units=imperial&lon=${locationObj.lon.toFixed(2)}&appid=83289a961f66ea21035d3f375d92539e`

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data) // add the populate right side function here
      populatePage(data)
    });
}

//  ℉

function populatePage(weeklyWeather) {
  const todayDiv = document.querySelector('#today-weather')
  const weekDiv = document.querySelector('#week-weather')

  todayDiv.innerHTML = ''
  weekDiv.innerHTML = ''


  const todayTopLine = document.createElement('span')

  const todayNameAndDate = document.createElement('h2')
  todayNameAndDate.textContent = `${weeklyWeather.city.name} ${getDate(weeklyWeather.list[2].dt_txt.substring(0, 10))}`

  const todayIcon = document.createElement('img')
  todayIcon.setAttribute('src', `https://openweathermap.org/img/wn/${weeklyWeather.list[2].weather[0].icon}@2x.png`)

  const todayTemp = document.createElement('p')
  todayTemp.textContent = `Temp: ${weeklyWeather.list[2].main.temp} ℉`
  const todayWind = document.createElement('p')
  todayWind.textContent = `Wind: ${weeklyWeather.list[2].wind.speed} MPH`
  const todayHumidity = document.createElement('p')
  todayHumidity.textContent = `Humidity: ${weeklyWeather.list[2].main.humidity} %`

  todayTopLine.appendChild(todayNameAndDate)
  todayTopLine.appendChild(todayIcon)

  todayDiv.appendChild(todayTopLine)
  todayDiv.appendChild(todayTemp)
  todayDiv.appendChild(todayWind)
  todayDiv.appendChild(todayHumidity)


  for (let i = 10; i < weeklyWeather.list.length; i += 8) {

    const dailyDiv = document.createElement('div')
    dailyDiv.setAttribute('class', 'card daily col-2')

    const dailyTop = document.createElement('h4')
    dailyTop.textContent = `${getDate(weeklyWeather.list[i].dt_txt.substring(0, 10))}`

    const dailyIconSpan = document.createElement('span')
    const dailyIcon = document.createElement('img')
    dailyIcon.setAttribute('src', `https://openweathermap.org/img/wn/${weeklyWeather.list[i].weather[0].icon}@2x.png`)

    dailyIconSpan.appendChild(dailyIcon)

    const dailyTemp = document.createElement('p')
    dailyTemp.textContent = `Temp: ${weeklyWeather.list[i].main.temp} ℉`
    const dailyWind = document.createElement('p')
    dailyWind.textContent = `Wind: ${weeklyWeather.list[i].wind.speed} MPH`
    const dailyHumidity = document.createElement('p')
    dailyHumidity.textContent = `Humidity: ${weeklyWeather.list[i].main.humidity} %`

    dailyDiv.appendChild(dailyTop)
    dailyDiv.appendChild(dailyIconSpan)
    dailyDiv.appendChild(dailyTemp)
    dailyDiv.appendChild(dailyWind)
    dailyDiv.appendChild(dailyHumidity)

    weekDiv.appendChild(dailyDiv)

  }




}



function getDate(dateString) {
  const day = dateString.substring(8)
  const month = dateString.substring(5, 7)
  const year = dateString.substring(0, 4)

  const newDateStr = `(${month}/${day}/${year})`

  return newDateStr
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


function populateButtons() {
  for (let i = 0; i < buttonsInStorage.length; i++) {
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

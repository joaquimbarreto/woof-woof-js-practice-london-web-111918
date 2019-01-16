const DOGS_API = 'http://localhost:3000/pups/';
const dogBarEl = document.querySelector('#dog-bar');
const dogInfoEl = document.querySelector('#dog-info');
const dogFilterButtonEl = document.querySelector('#good-dog-filter');
const goodDogButtonEl = document.createElement('button');
dogFilterButtonEl.innerHTML = 'Filter good dogs: OFF';

const state = {
  dogs: [],
  filterAllGoodDogs: false,
  selectedDog: null
}

function init(){
  if (state.filterAllGoodDogs === false){
    return fetchAllDogs();
  } else {
    return filterGoodDogs();
  }
}

function fetchDogsFromApi() {
  return fetch(DOGS_API)
    .then(response => response.json())
}

function fetchAllDogs() {
  fetchDogsFromApi().then(data => {
    state.dogs = data
    dogBarEl.innerHTML = "";
    displayDog(state.dogs)
  })
}

function filterGoodDogs() {
  fetchDogsFromApi().then(data => {
    state.dogs = data.filter(dog => dog.isGoodDog === true)
    dogBarEl.innerHTML = "";
    displayDog(state.dogs)
    })
}

function displayDog(data) {
  data.forEach(dog => {
    const dogSpanEl = document.createElement('span');
    dogSpanEl.innerText = dog.name;
    dogBarEl.appendChild(dogSpanEl);
    dogSpanEl.addEventListener('click', () => dogInfo(dog))
  })
}


function dogInfo(dog) {
  state.selectedDog = dog
  dogInfoEl.innerHTML = '';
  const dogImageEl = document.createElement('img');
  dogImageEl.src = dog.image;
  dogInfoEl.appendChild(dogImageEl);
  const dogH1El = document.createElement('h1');
  dogH1El.innerText = dog.name;
  dogInfoEl.appendChild(dogH1El);
  displayDogInfoButton(dog);
  dogInfoEl.appendChild(goodDogButtonEl);
  goodDogButtonEl.addEventListener('click', () => toggleGoodBadDog(dog));
}


function displayDogInfoButton(dog){
  if (dog.isGoodDog === true) {
    goodDogButtonEl.innerText = 'Good Dog!';
  } else {
    goodDogButtonEl.innerText = 'Bad Dog!';
  }
}


function updateDogApi(dog) {
  return fetch(DOGS_API + dog.id, {
    method: 'PATCH',
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(dog)
  }).then(response => response.json())
}

function toggleGoodBadDog(dog) {
  if (dog.isGoodDog === true) {
    goodDogButtonEl.innerText = 'Bad Dog!';
    dog.isGoodDog = false;
    updateDogApi(dog);
  } else {
    goodDogButtonEl.innerText = 'Good Dog!';
    dog.isGoodDog = true;
    updateDogApi(dog);
  }
}

function toggleOnlyGoodDogs(){
  if (state.filterAllGoodDogs === false){
    dogFilterButtonEl.innerText = 'Filter good dogs: ON';
    state.filterAllGoodDogs = true
    return filterGoodDogs();
  } else {
    dogFilterButtonEl.innerText = 'Filter good dogs: OFF';
    state.filterAllGoodDogs = false
    return fetchAllDogs();
  }
}

dogFilterButtonEl.addEventListener('click', toggleOnlyGoodDogs)

document.addEventListener('DOMContentLoaded', init)

const DOGS_API = 'http://localhost:3000/pups/';
const dogBarEl = document.querySelector('#dog-bar');
const dogInfoEl = document.querySelector('#dog-info');
const dogFilterButtonEl = document.querySelector('#good-dog-filter');
const goodDogButtonEl = document.createElement('button');
dogFilterButtonEl.innerHTML = 'Filter good dogs: OFF';

function init(){
  if (dogFilterButtonEl.innerText !== 'Filter good dogs: OFF'){
    // dogFilterButtonEl.innerText = 'Filter good dogs: ON';
    return filterGoodDogs();
  } else {
    // dogFilterButtonEl.innerText = 'Filter good dogs: OFF';
    return fetchAllDogs();
  }
}

function dogApi() {
  return fetch(DOGS_API).then(response => response.json())
}


function fetchAllDogs() {
    dogApi.then(data => {
    data.forEach(dog => {
      dogBarEl.innerHTML = "";
      const dogSpanEl = document.createElement('span');
      dogSpanEl.innerText = dog.name;
      dogBarEl.appendChild(dogSpanEl);
      dogSpanEl.addEventListener('click', () => dogInfo(dog))
    })
  })
}

function filterGoodDogs(data) {
  // if (dog.isGoodDog){
    //   data = filterGoodDogs(data);
    // }
    // dogBarEl.innerHTML = ""
    //   return data.filter(dog => dog.isGoodDog)
    dogApi.then(data => {
      goodDogData = data.filter(dog => dog.isGoodDog === true)
      dogBarEl.innerHTML = "";
      goodDogData.forEach(dog => {
        const dogSpanEl = document.createElement('span');
        dogSpanEl.innerText = dog.name;
        dogBarEl.appendChild(dogSpanEl);
        dogSpanEl.addEventListener('click', () => dogInfo(dog))
      })
    })
  }

function dogInfo(dog) {
  dogInfoEl.innerHTML = '';
  const dogImageEl = document.createElement('img');
  dogImageEl.src = dog.image;
  dogInfoEl.appendChild(dogImageEl);
  const dogH1El = document.createElement('h1');
  dogH1El.innerText = dog.name;
  dogInfoEl.appendChild(dogH1El);
  if (dog.isGoodDog === true) {
    goodDogButtonEl.innerText = 'Good Dog!';
  } else {
    goodDogButtonEl.innerText = 'Bad Dog!';
  }
  dogInfoEl.appendChild(goodDogButtonEl);
  goodDogButtonEl.addEventListener('click', () => toggleGoodBadDog(dog));
}

function toggleGoodBadDog(dog) {
  if (dog.isGoodDog === true) {
    goodDogButtonEl.innerText = 'Bad Dog!';
    dog.isGoodDog = false;
  } else {
    goodDogButtonEl.innerText = 'Good Dog!';
    dog.isGoodDog = true;
  }
  fetch(DOGS_API + dog.id, {
    method: 'PATCH',
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(dog)
  })
}


function toggleGoodAllDogs(){
  if (dogFilterButtonEl.innerText === 'Filter good dogs: OFF'){
    dogFilterButtonEl.innerText = 'Filter good dogs: ON';
    return init();
  } else {
    dogFilterButtonEl.innerText = 'Filter good dogs: OFF';
    return init();
  }
}



dogFilterButtonEl.addEventListener('click', toggleGoodAllDogs)

document.addEventListener('DOMContentLoaded', init)

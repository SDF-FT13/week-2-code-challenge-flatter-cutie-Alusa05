// Your code here
document.addEventListener('DOMContentLoaded', () => {
const characterBar = document.getElementById('character-bar');
const detailedInfo = document.getElementById('detailed-info');
const votesForm = document.gerElementById('votes-form');
const resetVotesButton = document.getElementById('reset-votes');
const characterForm = document.getElementById('character-form');

let characters = [];
let currentCharacter = null;

//Fetching the characters from the server
fetch('http://localhost:3000/characters')
.then(response => response.json())
.then(data => {
    characters = data;
    displayCharacters(data);
});

//Displaying the characters
function displayCharacters(characters) {
    characterBar.innerHTML = '';
    characters.forEach(character => {
        const span = document.createElement('span');
        span.textContent = character.name;
        span.addEventListener('click', () => showCharacterDetails(character));
        characterBar.appendChild(span);
    });
}
function showCharacterDetails(character){
    currentCharacter = character;
    detailedInfo.innerHTML = `
    <img src="${character.image}"  alt= "{character.name}"/>
    <h2>${character.name}</h2>
    <p>Votes: <span id= "vote-count">${character.votes}</span></p>`;
}

votesForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const votesInput = document.getElementById('votes');
    const votes = parseInt(votesInput.value, 10);
    if (!isNaN(votes)) {
      currentCharacter.votes += votes;
      updateVotesDisplay();
      votesInput.value = '';
    }
  });
  
  function updateVotesDisplay() {
    const voteCount = document.getElementById('vote-count');
    if (voteCount) {
      voteCount.textContent = currentCharacter.votes;
    }
  }
  resetVotesButton.addEventListener('click', () => {
    currentCharacter.votes = 0;
    updateVotesDisplay();
  });
  characterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('name');
    const imageInput = document.getElementById('image');
    const newCharacter = {
      name: nameInput.value,
      image: imageInput.value,
      votes: 0
    };
    characters.push(newCharacter);
    displayCharacters(characters);
    showCharacterDetails(newCharacter);
    nameInput.value = '';
    imageInput.value = '';
  });
});


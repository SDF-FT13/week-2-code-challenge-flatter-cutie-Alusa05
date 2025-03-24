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
});

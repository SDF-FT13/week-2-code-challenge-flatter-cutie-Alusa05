document.addEventListener('DOMContentLoaded', () => {
    const characterBar = document.getElementById('character-bar');
    const detailedInfo = document.getElementById('detailed-info');
    const votesForm = document.getElementById('votes-form'); // Fixed typo: 'gerElementById' -> 'getElementById'
    const resetVotesButton = document.getElementById('reset-votes');
    const characterForm = document.getElementById('character-form');
  
    let characters = [];
    let currentCharacter = null;
  
    // Fetch characters from the server
    fetch('http://localhost:3000/characters')
      .then(response => response.json())
      .then(data => {
        characters = data;
        displayCharacters(data);
      })
      .catch(error => console.error('Error fetching characters:', error));
  
    // Display characters in the character bar
    function displayCharacters(characters) {
      characterBar.innerHTML = '';
      characters.forEach(character => {
        const span = document.createElement('span');
        span.textContent = character.name;
        span.addEventListener('click', () => showCharacterDetails(character));
        characterBar.appendChild(span);
      });
    }
  
    // Show character details
    function showCharacterDetails(character) {
      currentCharacter = character;
      detailedInfo.innerHTML = `
        <img src="${character.image}" alt="${character.name}" />
        <h2>${character.name}</h2>
        <p>Votes: <span id="vote-count">${character.votes}</span></p>
      `;
    }
  
    // Handle votes form submission
    votesForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const votesInput = document.getElementById('votes');
      const votes = parseInt(votesInput.value, 10);
      if (!isNaN(votes) && currentCharacter) {
        currentCharacter.votes += votes;
        updateVotesDisplay();
        updateVotesOnServer(currentCharacter); // Update server
        votesInput.value = '';
      }
    });
  
    // Update votes display
    function updateVotesDisplay() {
      const voteCount = document.getElementById('vote-count');
      if (voteCount && currentCharacter) {
        voteCount.textContent = currentCharacter.votes;
      }
    }
  
    // Reset votes
    resetVotesButton.addEventListener('click', () => {
      if (currentCharacter) {
        currentCharacter.votes = 0;
        updateVotesDisplay();
        updateVotesOnServer(currentCharacter); // Update server
      }
    });
  
    // Add new character
    characterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('name');
      const imageInput = document.getElementById('image');
      const newCharacter = {
        name: nameInput.value,
        image: imageInput.value,
        votes: 0
      };
      addCharacterToServer(newCharacter); // Add to server first
      nameInput.value = '';
      imageInput.value = '';
    });
  
    // Update votes on server (PATCH)
    function updateVotesOnServer(character) {
      fetch(`http://localhost:3000/characters/${character.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          votes: character.votes
        })
      })
      .catch(error => console.error('Error updating votes:', error));
    }
  
    // Add new character to server (POST)
    function addCharacterToServer(character) {
      fetch('http://localhost:3000/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(character)
      })
      .then(response => response.json())
      .then(data => {
        characters.push(data);
        displayCharacters(characters);
        showCharacterDetails(data);
      })
      .catch(error => console.error('Error adding character:', error));
    }
  });
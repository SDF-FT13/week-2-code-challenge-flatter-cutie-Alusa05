document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const nameElement = document.getElementById("name");
    const imageElement = document.getElementById("image");
    const votesElement = document.getElementById("vote-count");
    const votesForm = document.getElementById("votes-form");
    const resetButton = document.getElementById("reset-btn");
    const characterForm = document.getElementById("character-form");
  
    let characters = [];
    let currentCharacter = null;
  
    // Fetch all characters and display them in the character bar
    function fetchCharacters() {
      fetch("http://localhost:3000/characters")
        .then(response => response.json())
        .then(data => {
          characters = data;
          renderCharacterBar();
        })
        .catch(error => console.error("Error fetching characters:", error));
    }
  
    // Render all characters in the character bar
    function renderCharacterBar() {
      characterBar.innerHTML = "";
      characters.forEach(character => {
        const span = document.createElement("span");
        span.textContent = character.name;
        span.addEventListener("click", () => displayCharacter(character));
        characterBar.appendChild(span);
      });
    }
  
    // Display character details
    function displayCharacter(character) {
      currentCharacter = character;
      nameElement.textContent = character.name;
      imageElement.src = character.image;
      imageElement.alt = character.name;
      votesElement.textContent = character.votes;
    }
  
    // Handle vote submission
    votesForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!currentCharacter) return;
      
      const votesInput = document.getElementById("votes");
      const votesToAdd = parseInt(votesInput.value) || 0;
      
      currentCharacter.votes += votesToAdd;
      votesElement.textContent = currentCharacter.votes;
      votesInput.value = "";
    });
  
    // Handle reset votes
    resetButton.addEventListener("click", () => {
      if (currentCharacter) {
        currentCharacter.votes = 0;
        votesElement.textContent = 0;
      }
    });
  
    
  
    // Initialize the app
    fetchCharacters();
  });
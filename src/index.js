Document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar");
    const characterName = document.getElementById("name");
    const characterImage = document.getElementById("image");
    const characterVotes = document.getElementById("vote-count");
    const voteForm = document.getElementById("votes-form");
    const resetButton = document.getElementById("reset-btn");

    let currentCharacter = null;

    // Fetch and display characters in the character bar
    function fetchCharacters() {
        fetch("http://localhost:3000/characters")
            .then(response => response.json())
            .then(data => {
                console.log("Characters fetched:", data); // Debugging log
                characterBar.innerHTML = "";
                data.forEach(character => createCharacterSpan(character));
            })
            .catch(error => console.error("Error fetching characters:", error));
    }

    // Create a span for each character
    function createCharacterSpan(character) {
        const span = document.createElement("span");
        span.textContent = character.name;
        span.classList.add("character");

        // Add event listener to display character details on click
        span.addEventListener("click", () => {
            displayCharacter(character);
        });

        characterBar.appendChild(span);
    }

    // Display character details in the detailed info section
    function displayCharacter(character) {
        currentCharacter = character;
        characterName.textContent = character.name;
        characterImage.src = character.image;
        characterImage.alt = character.name;
        characterVotes.textContent = character.votes;
    }

    // Handle vote submission
    voteForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const voteInput = document.getElementById("votes");
        const newVotes = parseInt(voteInput.value, 10);

        if (!isNaN(newVotes) && currentCharacter) {
            currentCharacter.votes += newVotes;
            characterVotes.textContent = currentCharacter.votes;
        }

        voteInput.value = ""; // Clear input field
    });

    // Handle resetting votes
    resetButton.addEventListener("click", () => {
        if (currentCharacter) {
            currentCharacter.votes = 0;
            characterVotes.textContent = currentCharacter.votes;
        }
    });

    // Fetch characters on page load
    fetchCharacters();
});
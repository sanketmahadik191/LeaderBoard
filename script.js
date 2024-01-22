// Event listener for the form submission
document.querySelector("form").addEventListener("submit", handleFormSubmission);

// Function to handle form submission
function handleFormSubmission(e) {
    e.preventDefault();

    // Extract input values from the form
    let inputFields = e.target.children;
    let errorMessage = document.querySelector(".errorMessage");
    errorMessage.style.display = "none";

    let [firstName, lastName, country, score] = getInputValues(inputFields);

    // Check if any input is empty, display error message if true
    if (hasEmptyInput(firstName, lastName, country, score)) {
        errorMessage.style.display = "block";
    } else {
        // Create a new scoreboard element and populate it with player data
        let scoreBoardContainer = document.querySelector(".scoreBoard-container");
        let scoreBoardElement = createScoreBoardElement(firstName, lastName, country, score);

        // Append the scoreboard element to the container and perform necessary actions
        appendScoreBoardElement(scoreBoardContainer, scoreBoardElement);
        activateButton();
        sortAndAppend();

        // Reset form input fields after successful submission
        resetFormFields(e.target);
    }
}

// Function to get values from input fields
function getInputValues(fields) {
    return Array.from(fields).map((field) => field.value);
}

// Function to check if any input is empty
function hasEmptyInput(...values) {
    return values.some((value) => value === "");
}

// Function to create a new scoreboard element
function createScoreBoardElement(firstName, lastName, country, score) {
    let scoreBoardElement = document.createElement("div");
    scoreBoardElement.classList.add("scoreboard");

    let [date, time] = getCurrentDateTime();

    // Populate the scoreboard element with player data
    scoreBoardElement.innerHTML = `
        <div>
            <p class="playerName">${firstName} ${lastName}</p>
            <p class="main-time">${date}, ${time}</p>
        </div>
        <p class="player-country">${country}</p>
        <p class="player-score">${score}</p>
        <div class="scoreboard-btn-container">
            <button>+𝟓</button>
            <button>-𝟓</button>
            <button>❌</button>
        </div>
    `;

    return scoreBoardElement;
}

<<<<<<< HEAD
// Function to get current date and time
function getCurrentDateTime() {
    let d = new Date();
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let addZero = (i) => (i < 10 ? "0" + i : i);
=======
//fuction buttons f
>>>>>>> a1ec9e9104a53a2905cd6334476124f48a1f2917

    return [
        `${month[d.getMonth()]} ${addZero(d.getDate())}, ${d.getFullYear()}`,
        `${addZero(d.getHours())}:${addZero(d.getMinutes())}:${addZero(d.getSeconds())}`,
    ];
}

// Function to append a scoreboard element to the container
function appendScoreBoardElement(container, element) {
    container.appendChild(element);
}

// Function to reset form input fields
function resetFormFields(form) {
    Array.from(form.elements).forEach((element) => {
        if (element.type !== "submit") {
            element.value = "";
        }
    });
}

// Function to handle button activation
function activate(e) {
    let btnTarget = e.target.innerText;
    let scores = e.target.parentElement.parentElement.children[2];
    scores.style.transition = "0.5s ease-in-out";

    // Perform actions based on the clicked button
    if (btnTarget === "❌") {
        e.target.parentElement.parentElement.remove();
    } else {
        let change = btnTarget === "+𝟓" ? 5 : -5;
        updateScore(scores, change);
    }

    // Sort and re-append elements after button action
    sortAndAppend();
}

// Function to update the player's score
function updateScore(scores, change) {
    scores.style.transform = "scale(1.5)";
    setTimeout(() => {
        scores.style.transform = "scale(1)";
    }, 100);
    scores.innerText = parseInt(scores.innerText) + change;
}

// Function to activate button functionality for all scoreboard elements
function activateButton() {
    document.querySelectorAll(".scoreboard-btn-container").forEach((el) => {
        el.addEventListener("click", activate);
    });
}

// Function to sort and append scoreboard elements based on scores
function sortAndAppend() {
    let scoreBoardContainer = document.querySelector(".scoreBoard-container");
    let data = Array.from(document.querySelectorAll(".scoreboard"));

    // Sort elements based on player scores
    data.sort((a, b) => parseInt(b.querySelector(".player-score").textContent) - parseInt(a.querySelector(".player-score").textContent));

    // Clear existing elements
    scoreBoardContainer.innerHTML = "";

    // Re-append elements in sorted order
    data.forEach((element) => scoreBoardContainer.appendChild(element));
}

// Initial sorting and button activation
sortAndAppend();
activateButton();

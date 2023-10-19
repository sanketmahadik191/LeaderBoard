document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    let firstName = e.target.children[0].value;
    let lastName = e.target.children[1].value;
    let country = e.target.children[2].value;
    let score = e.target.children[3].value;
    let errorMessage = document.querySelector(".errorMessage")
    errorMessage.style.display = "none"
    if (firstName === "" || lastName === "" || country === "" || score === "") {
        errorMessage.style.display = "block"
    } else {
        let scoreBoardContainer = document.querySelector(".scoreBoard-container");
        let scoreBoardElement = document.createElement("div");
        scoreBoardElement.classList.add("scoreboard");

        // add element

        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        let d = new Date();

        function addZero(i) {
            if (i < 10) { i = "0" + i }
            return i;
        }
        let h = addZero(d.getHours());
        let m = addZero(d.getMinutes());
        let s = addZero(d.getSeconds());
        let time = h + ":" + m + ":" + s;

        let mon = month[d.getMonth()];
        let year = d.getFullYear();
        let da = addZero(d.getDate())
        let date = mon + " " + da + ", " + year;

        scoreBoardElement.innerHTML = `
        <div>
        <p class = "playerName"> ${firstName} ${lastName}</p>
        <p class="main-time">${date}, ${time}</p>
        </div>
        <p class="player-country">${country}</p>
        <p class="player-score">${score}</p>
        <div class="scoreboard-btn-container">
            <button>+5</button>
            <button>-5</button><button>❌</button>
        </div>
        `;
        scoreBoardContainer.appendChild(scoreBoardElement);
        activateButton()
        sortAndAppend();
    }
})


//fuction buttons


function activate(e) {
    let btnTarget = e.target.innerText;
    let scores = e.target.parentElement.parentElement.children[2];
    scores.style.transition = "0.5s ease-in-out"
    if (btnTarget === "❌") {
        e.target.parentElement.parentElement.remove();
    } else if (btnTarget === "+5") {
        scores.style.transform = "scale(1.5)"
        setTimeout(() => {
            scores.style.transform = "scale(1)"
        }, 100)
        scores.innerText = parseInt(scores.innerText) + 5
    } else if (btnTarget === "-5") {
        scores.style.transform = "scale(1.5)"
        setTimeout(() => {
            scores.style.transform = "scale(1)"
        }, 100)
        scores.innerText = parseInt(scores.innerText) - 5
    }
    sortAndAppend();
}

function activateButton() {
    [...document.querySelectorAll(".scoreboard-btn-container")].map(el => {
        el.addEventListener("click", activate);
    });
}

//sorting

function sortAndAppend() {
    let scoreBoardContainer = document.querySelector(".scoreBoard-container");
    let data = [...document.querySelectorAll(".scoreboard")];

    data.sort((a, b) => {
        return parseInt(b.querySelector(".player-score").textContent) - parseInt(a.querySelector(".player-score").textContent);
    });

    // delete element

    while (scoreBoardContainer.firstChild) {
        scoreBoardContainer.removeChild(scoreBoardContainer.firstChild);
    }

    //arrange the elements

    data.forEach((element) => {
        scoreBoardContainer.appendChild(element);
    });
}
sortAndAppend();
activateButton();
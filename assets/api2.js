var buttonEl = document.getElementById("search-btn");

document.addEventListener("DOMContentLoaded", () => {
    let localStorageContent = localStorage.getItem('showTitle');
    localStorageContent = JSON.parse(localStorageContent);

    if (localStorageContent) {
        for (let i = 0; i < localStorageContent.length; i += 1) {
            var eachShow = localStorageContent[i];

            let showButton = document.createElement("button");
            showButton.innerHTML = eachShow;
            pastSearch.appendChild(showButton);
            showButton.setAttribute("class", "button is-dark is-focus");
        }
    }

    let btns = document.querySelectorAll(".button");

    for (i of btns) {
        i.addEventListener('click', function () {
            var title = this.innerHTML
            var watchModeAPI = `https://api.watchmode.com/v1/sources/?apiKey=0I8KL5AHMGvqXBpUxm8FC285TxK3nPSnr7KOGQJg${title}`;

            fetch(watchModeAPI)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    if (!data) {
                        return alert("No data for " + title);
                    }
                    console.log(data);
                    renderStreamingData(data);
                }).catch(function (error) {
                });
        })
    }
})

titleInput = document.getElementById("user-input");

function getWatchMode() {
    var title = titleInput.value;

    if (!title) return;
    localStorageContent()

    var wacthModeAPI = `https://api.watchmode.com/v1/sources/?apiKey=0I8KL5AHMGvqXBpUxm8FC285TxK3nPSnr7KOGQJg${title}`;

    fetch(watchModeAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (!data) {
                return alert("No data for " + title);
            }
            console.log(data);
            renderStreamingData(data);
        }).catch(function (error) {
        });
}

var watchModeCard = document.getElementById("show-info");
var showImgCard = document.getElementById("show-img");

function renderStreamingData(data) {
    var showTitle = data.name;
    var showGenre = data.genres[0];
    var showSummary = data.summary;
    var showNetwork = data.network.name;

    var watchModeCard = document.createElement("p");
    watchModeCard.innerHTML = "<b>Title: </b>" + showTitle + "<br><b>Genre: </b>" + showGenre + "<br><b>Network: </b>" + showNetwork + "<br><b>Summary: </b>" + showSummary;
    watchModeCard.innerHTML = "";
    watchModeCard.appendChild(streamingCard);
    watchModeCard.setAttribute("class", "card-styling");


}


var pastSearch = document.querySelector("#search-history");
function localStorageContent() {

    var title = titleInput.value;

    const localStorageContent = localStorage.getItem('showTitle');

    let showHistory;
    if (localStorageContent === null) {
        showHistory = [];
    } else {
        showHistory = JSON.parse(localStorageContent);
    }

    showHistory.push(title);
    localStorage.setItem('showTitle', JSON.stringify(showHistory));

    for (let i = 0; i < showHistory.length; i += 1)
        var eachShow = showHistory[i];

    let showButton = document.createElement("button");
    showButton.innerHTML = eachShow;
    pastSearch.appendChild(showButton);
    showButton.setAttribute("class", "button is-dark is-focus");
}

buttonEl.addEventListener('click', getWatchMode);

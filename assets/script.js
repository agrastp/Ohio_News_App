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
            var tvMazeAPI = `https://api.tvmaze.com/singlesearch/shows?q=${title}`;

            fetch(tvMazeAPI)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    if (!data) {
                        return alert("No data for " + title);
                    }
                    console.log(data);
                    renderTvShowData(data);
                }).catch(function (error) {
                });
        })
    }
})

titleInput = document.getElementById("user-input");

function getTvMaze() {
    var title = titleInput.value;

    if (!title) return;
    localStorageContent()

    var tvMazeAPI = `https://api.tvmaze.com/singlesearch/shows?q=${title}`;

    fetch(tvMazeAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (!data) {
                return alert("No data for " + title);
            }
            console.log(data);
            renderTvShowData(data);
        }).catch(function (error) {
        });
}

var tvMazeCard = document.getElementById("show-info");
var showImgCard = document.getElementById("show-img");

function renderTvShowData(data) {
    var showTitle = data.name;
    var showGenre = data.genres[0];
    var showLanguage = data.language;
    var showImageEl = data.image.original;
    var showImage = "<img src=" + showImageEl + ">";
    var showSummary = data.summary;
    var showNetwork = data.network.name;

    var tvShowCard = document.createElement("p");
    tvShowCard.innerHTML = "<b>Title: </b>" + showTitle + "<br><b>Genre: </b>" + showGenre + "<br><b>Language: </b>" + showLanguage + "<br><b>Network: </b>" + showNetwork + "<br><b>Summary: </b>" + showSummary;
    tvMazeCard.innerHTML = "";
    tvMazeCard.appendChild(tvShowCard);
    tvShowCard.setAttribute("class", "card-styling");

    var showPoster = document.createElement("div");
    showPoster.innerHTML = showImage;
    showImgCard.innerHTML = "";
    showImgCard.appendChild(showPoster);
    showPoster.setAttribute("class", "poster");
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

buttonEl.addEventListener('click', getTvMaze);
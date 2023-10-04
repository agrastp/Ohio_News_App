
titleInput = document.getElementsByClassName("input");

function getTvMaze() {
    
    var title = titleInput.value;
    var tvMazeAPI = `https://api.tvmaze.com/singlesearch/shows?q=${title}`;

    fetch(tvMazeAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log({
                length: data.length
            })
            if (!data) {
                return alert("No data for " + titleInput);
            }
            renderTvShowData(data);
        }).catch(function (error) {
        });
}

getTvMaze();

var tvMazeCard = document.getElementById("show-info");
var showImgCard = document.getElementById("show-img");

function renderTvShowData(data) {
    console.log(data)
    var showTitle = data.name;
    var showGenre = data.genres[0];
    var showLanguage = data.language;
    var showImageEl = data.image.original;
    var showImage = "<img src=" + showImageEl + ">";
    var showSummary = data.summary;
    var showNetwork = data.network.name;

    var tvShowCard = document.createElement("p");
    tvShowCard.innerHTML = "<b>Title: </b>" + showTitle + "<br><b>Genre: </b>" + showGenre + "<br><b>Language: </b>" + showLanguage + "<br><b>Network: </b>" + showNetwork + "<br><b>Summary: </b>" + showSummary;
    tvMazeCard.appendChild(tvShowCard);
    tvShowCard.setAttribute("class", "card-styling");

    var showPoster = document.createElement("div");
    showPoster.innerHTML = showImage;
    showImgCard.appendChild(showPoster);
    showPoster.setAttribute("class", "poster");
}
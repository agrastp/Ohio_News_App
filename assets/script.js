var buttonEl = document.querySelector('.search-btn')
var apiKey = ""
var userInput = document.querySelector('#user-input')

var formSubmitHandler = function (event) {
	event.preventDefault();
}

fetch()
.then(function (response) {
	if (response.ok) {
		console.log(response)
	}
});
buttonEl.addEventListener('click', function() {
	fetch()
	.then(function (response) {

	})
})
function addToLocalStorage () {
	localStorage.setItem('movie-id', JSON.stringify())
}


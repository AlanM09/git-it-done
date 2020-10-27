var getUserRepos = function (user) {
    // format the github API URL
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the URL
    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            displayRepos(data, user);

            //clear old content
            repoContainerEl.textContent = "";
            repoSearchTerm.textContent = searchTerm;
        });
    });
};

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var formSubmitHandler = function (event) {
    event.preventDefault();
    console.log(event);

    //get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    }
    else {
        alert("Please enter a GitHub username");
    }

};

var displayRepos = function (repos, searchTerm) {
    console.log(repos);
    console.log(searchTerm);
};

var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");



userFormEl.addEventListener("submit", formSubmitHandler);

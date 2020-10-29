var limitWarningEl = document.querySelector("#limit-warning");
var getRepoIssues = function (repo) {
    console.log(repo);

    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function (response) {
        // Telling us that the request was successful
        if (response.ok) {
            response.json().then(function (data) {
                // Pass response data to dom function
                displayIssues(data);

                // check if api has paginated issues (30 or more)
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        }
        else {
            alert: ("There was a problem with you request!");
        }
    });


};

// here we are puuling the repoName from index.html to sing-repo to show us what issue we are looking at
var getRepoName = function() {
var queryString = document.location.search;
var repoName = queryString.split("=")[1];
getRepoIssues(repoName);
repoNameEl.textContent = repoName;
}

var repoNameEl = document.querySelector("#repo-name");


var displayWarning = function (repo) {
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    //apend to warning container
    limitWarningEl.appendChild(linkEl);
};

var issueContainerEl = document.querySelector("#issues-container");
var displayIssues = function (issues) {

    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }

    for (var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        //Append the newly created Variable to the actual page
        issueContainerEl.appendChild(issueEl);

        // Create Span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // Append to container
        issueEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        // append to container
        issueEl.appendChild(typeEl);
    }
};

getRepoName ();
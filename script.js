let inputEl = document.getElementById('searchInput');
let responseTitle = document.getElementById('responseTitle');
let link = document.getElementById('link');
let description = document.getElementById('description');
let searchEl = document.getElementById('searchResults');
let spinnerEl = document.getElementById('spinner');

function createAndAppendResult(result) {
    //taking maincontainer
    let searchList = document.createElement('div');
    searchList.classList.add('result-item');
    searchEl.appendChild(searchList);
    //creating a anchor element for title 
    let title = document.createElement('a');
    title.id = "responseTitle";
    title.classList.add('result-title');
    title.textContent = result.title;
    searchList.appendChild(title);

    //creating break
    let brk = document.createElement("br");
    searchList.appendChild(brk);

    //creating a second Anchor for url 
    let link = document.createElement('a');
    link.id = "link";
    link.href = result.link;
    link.classList.add('result-url');
    link.textContent = result.link;
    searchList.appendChild(link);

    //creating a paragraph for description
    let description = document.createElement('p');
    description.id = "description";
    description.classList.add('link-description');
    description.textContent = result.description;
    searchList.appendChild(description);

}

function displayResults(search_results) {
    spinnerEl.classList.toggle('d-none');
    for (let item of search_results) {

        let result = item;
        createAndAppendResult(result);
    }

}

function searchWiki(event) {

    if (event.key === "Enter") {
        spinnerEl.classList.remove('d-none');
        searchEl.textContent = "";
        let input = inputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + input;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                const {
                    search_results
                } = jsonData;
                displayResults(search_results);
            })
    }
}

inputEl.addEventListener("keydown", searchWiki);
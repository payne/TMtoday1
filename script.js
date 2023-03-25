


function showSpeakers() {
  showHide('speakers', 'all');
}

function showAll() {
  showHide('all', 'speakers');
}

function showHide(showId, hideId) {
  console.log('click the link');
  const hideElement = document.getElementById(hideId);
  const showElement = document.getElementById(showId);
  showElement.hidden = false;
  hideElement.hidden = true;
}

let d = ""

getData = () => {
  fetch("https://payne.github.io/TMtoday1/tm.json")
  .then((response) => response.json())
  .then((data) => d = data);
};

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    // initApplication();
    getData();
    console.table(d);
    console.log(d);
  }
};

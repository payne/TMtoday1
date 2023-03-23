
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



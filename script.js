
const divList = ['all', 'speakers', 'qrcode'];

function showSpeakers() {
  show('speakers');
}

function showAll() {
  show('all');
}

function showQrCode() {
  show('qrcode');
}

function show(showId) {
  console.log('click the link');
  divList.forEach((divId) => {
    const divElement = document.getElementById(divId);
    if (divId === showId) {
      divElement.hidden = false;
    } else {
      divElement.hidden = true;
    }
  });
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

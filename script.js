
const divList = ['all', 'speakers', 'qrcode'];
let d = "" // holds speaker data

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

processData = (data) => {
  d = data;
  const meetingDate = '4/5';
  const rolePeople = d.map((person) => { 
    const name = `${person['First Name']} ${person['Last Name'].substring(0,1)}`;
    const mrole = person[meetingDate];
    return {name, mrole};
  }).filter((person) => person.mrole !== undefined && person.mrole !== "");
  console.log(rolePeople);
  console.log(`That ^^^ is the rolePeople array`);
  const allList = document.getElementById('list_all');
  rolePeople.forEach((person) => {
    const li = document.createElement('li');
    const t = document.createTextNode(`${person.name} - ${person.mrole}`);
    li.appendChild(t);
    allList.appendChild(li);
  });
}

getData = () => {
  fetch("https://payne.github.io/TMtoday1/tm.json")
  .then((response) => response.json())
  .then((data) => processData(data));
};

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    // initApplication();
    getData();
    console.table(d);
    console.log(d);
  }
};

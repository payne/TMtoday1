let meetingDate = '4/5'; //TODO: use today's date to get the meeting date
const divList = ['all', 'speakers', 'qrcode', 'version','meeting_dates'];
const meetingOrder = {
                      'PO': 'Presiding Officer',
                      'I': 'Invocator',
                      'GR': 'Grammarian',
                      'J': 'Jester',
                      'TT': 'Table Topics',
                      'T': 'Timer', 
                      'TM': 'Toastmaster',
                      'CE': 'General Evaluator',
                      'S': 'Speaker',
                      'E': 'Evaluator',
                      'BC': 'Vote Counter',
                      'GT': 'Grunt Tabulator'
                    }
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

function showVersion() {
  show('version');
}

function showDates() {
  show('meeting_dates');
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


fillInMeetingDateChoices = (data) => {
   d = data;
   const meetingSelector = document.getElementById("meeting_date_select");
   const person = d[0];
   for (const key in person) {
     if (key !== 'First Name' && key !== 'Last Name') {
      const option = document.createElement('option');
      option.text = key;
      meetingSelector.add(option);
      debugger;
      console.log(`Added ${key} to meetingSelector`);
     }
   }
};

dateChange = () => {
   const meetingSelector = document.getElementById("meeting_date_select");
   meetingDate = meetingSelector.value;
   processData(d);
};

processData = (data) => {
  d = data;
  const rolePeople = d.map((person) => { 
    const name = `${person['First Name']} ${person['Last Name'].substring(0,1)}`;
    const mrole = person[meetingDate];
    return {name, mrole};
  }).filter((person) => person.mrole !== undefined && person.mrole !== "");
  console.log(rolePeople);
  console.log(`That ^^^ is the rolePeople array`);

  const roleToPerson = {};
  rolePeople.forEach((person) => {
    roleToPerson[person.mrole] = person.name;
  });
  buildList(rolePeople);
};

buildList = (rolePeople) => {
  for (const role in meetingOrder) {
    rolePeople.forEach((person) => {
      if (person.mrole === role) {
        addListItem('list_all', `${person.mrole}: ${person.name}`);
        if ((role === 'S') || (role === 'E')) {
          addListItem('speakers_all', `${person.mrole}: ${person.name}`);
        }
      }
    });
  }
}

buildListOLD = (rolePeople) => {
  const allList = document.getElementById('list_all');
  rolePeople.forEach((person) => {
    const li = document.createElement('li');
    const t = document.createTextNode(`${person.name} - ${person.mrole}`);
    li.appendChild(t);
    allList.appendChild(li);
  });
}

addListItem = (listId, text) => {
  const list = document.getElementById(listId);
  const li = document.createElement('li');
  const t = document.createTextNode(text);
  li.appendChild(t);
  list.appendChild(li);
}

getData = () => {
  fetch("https://payne.github.io/TMtoday1/tm.json")
  .then((response) => response.json())
  .then((data) => {
    fillInMeetingDateChoices(data);
    processData(data)
  });
};

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    // initApplication();
    getData();
    console.table(d);
    console.log(d);
  }
};

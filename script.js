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

fillInMeetingDateChoices = (data) => {
   d = data;
   const meetingSelector = document.getElementById("meeting_date_select");
   const person = d[0];
   for (const key in person) {
     if (key !== 'First Name' && key !== 'Last Name') {
      const option = document.createElement('option');
      option.text = key;
      meetingSelector.add(option);
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
  console.log(`meetingDate=${meetingDate}`);
  console.log(`data:`); console.log(data);

  const roleToPerson = {};
  rolePeople.forEach((person) => {
    roleToPerson[person.mrole] = person.name;
  });
  console.log(`meetingDate = ${meetingDate}`);
  buildList(rolePeople);
};

setText = (divId, textString) => { 
  const e = document.getElementById(divId);
  const t = document.createTextNode(textString);
  const oldNode = e.childNodes[0];
  e.replaceChild(t, oldNode);
};

buildList = (rolePeople) => {
  clearList('list_all');
  clearList('speakers_all');
  setText('list_all_meeting_date', meetingDate);
  setText('speakers_meeting_date', meetingDate);
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

addListItem = (listId, text) => {
  const list = document.getElementById(listId);
  const li = document.createElement('li');
  const t = document.createTextNode(text);
  li.appendChild(t);
  list.appendChild(li);
}

clearList = (divId) => {
  const la = document.getElementById(divId);
  const nodes_to_delete = []
  la.childNodes.forEach(n => nodes_to_delete.push(n));
  nodes_to_delete.forEach(n => n.remove());
};

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
}

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
};


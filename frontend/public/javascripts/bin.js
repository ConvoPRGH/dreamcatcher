import Request from '../src/classes/Request';
import TemplateManager from '../src/classes/TemplateManager';
import DBmanager from '../src/classes/DBmanager';
import Events from '../src/classes/Events';

const DB = new DBmanager();

document.addEventListener('DOMContentLoaded', async() => {
  try {
    const paths = window.location.pathname.split('/');
    const binId = paths[paths.length - 1]
    const manager = new TemplateManager();

    const binHeader = document.querySelector('#bin-header');
    const binData = await DB.fetchOneBin(binId);
    binHeader.innerHTML = binData[0].name;

    const list = document.querySelector('#request-list');
    const requestBox = document.querySelector('#single-request-details');
    const requestData = await DB.fetchAllRequests(binId);
    const requests = mapToRequests(requestData);
    const workingReq = requests[0].payload;
    const jsonData = JSON.parse(workingReq);

    list.innerHTML = manager.templates.all_requests({request: requests});
    if (requests.length > 0) {
      const bodyContainer = document.querySelector('.bodyContainer');
      const headersContainer = document.querySelector('.headersContainer');
      
      recursivePrint(jsonData.body, bodyContainer, 0);
      recursivePrint(jsonData.headers, headersContainer, 0)
    }
     // connect to backend WSS
    connectToWSS(binId, requests, list, manager);

    const events = new Events(DB);
    events.createBinPageEvents(requests, requestBox, manager);

    
    document.querySelector('.body-toggle-icon').addEventListener('click', (e) => {
      console.log(e.target);
      e.target.parentElement.querySelector('ul').classList.toggle('hidden');
      e.target.textContent = e.target.textContent === '▶' ? '▼' : '▶';
    });
    document.querySelector('.headers-toggle-icon').addEventListener('click', (e) => {
      console.log(e.target);
      e.target.parentElement.querySelector('ul').classList.toggle('hidden');
      e.target.textContent = e.target.textContent === '▶' ? '▼' : '▶';
    });
    console.log(jsonData.body);
  } catch (error) {
    console.log(error.messsage);
    console.log(error);
  }
});

const mapToRequests = (requests) => {
  return requests.map(request => new Request(request)).reverse();
};

const connectToWSS = (binPath, requests, list, manager) => {
  const path = convertToCurrentRelativePath(window.location.href)
  console.log("Attempting to connect to WSS on:")
  console.log(`ws://${path}/websocket?binPath=${binPath}`)
  const socket = new WebSocket(`ws://${path}/websocket?binPath=${binPath}`);
  
  socket.onmessage = (event) => {
    const requestData = JSON.parse(event.data);
    // Render the new request
    requests.unshift(new Request(requestData));
    list.innerHTML = manager.templates.all_requests({request: requests});
  }

  socket.onerror = (error) => {
    console.log(`WebSocket Error: ${error.message}`);
  }
}

const convertToCurrentRelativePath = (href) => {
  let currentPath = href.split('/')
  currentPath = currentPath.slice(2, currentPath.length - 1)
  return currentPath.join('/');
}

function recursivePrint(data, parentElement, level = 0) {
  const tab = "\t";
  if (data === null) {return;}
  for (const [key, value] of Object.entries(data)) {
    // Create a new list item element
    const listItem = document.createElement('li');
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value) && value.length === 0) {
        listItem.textContent = `${"---".repeat(level+1)}${key}: ${value}`;
      } else {
        const toggleIcon = document.createElement('span');
        toggleIcon.className = 'toggle-icon';
        toggleIcon.textContent = '▶';
        
        toggleIcon.addEventListener('click', () => {
          const nestedList = listItem.querySelector('ul');
          console.log(nestedList);
          if (nestedList) {
            nestedList.classList.toggle('hidden');
            toggleIcon.textContent = toggleIcon.textContent === '▶' ? '▼' : '▶';
          }
        })

        listItem.textContent = `${"---".repeat(level+1)}${key} `;
        listItem.appendChild(toggleIcon)
      }
    } else {
      listItem.textContent = `${"---".repeat(level+1)}${key}: ${value}`;
    }

    // Append the list item to the parent element
    parentElement.appendChild(listItem);

    if (typeof value === 'object') {
      // If the value is an object, create a new nested list (ul) element
      const nestedList = document.createElement('ul');
      nestedList.classList.add('hidden');
      // Append the nested list to the list item
      listItem.appendChild(nestedList);

      // Recursively call the function for nested objects
      recursivePrint(value, nestedList, level + 1);
    }
  }
}
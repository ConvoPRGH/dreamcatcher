import Bin from '../src/classes/Bin';
import Request from '../src/classes/Request';
import TemplateManager from '../src/classes/TemplateManager';
import DBmanager from '../src/classes/DBmanager';
import Seed from '../src/utils/Seed';

const seed = new Seed();
const DB = new DBmanager();

document.addEventListener('DOMContentLoaded', async() => {
  try {
    const manager = new TemplateManager();
    const list = document.querySelector('#bin-list');
    const listData = await DB.fetchAllBins();
    list.innerHTML = manager.templates.all_bins({bin: listData});
  } catch (error) {
    console.log(error.messsage);
  }
  // console.log('index.js loaded');
  // console.log(seed.getOneBin());
  // console.log(seed.getBins());
  // console.log(seed.getOneRequest());
  // console.log(seed.getRequests());
  document.querySelector("#new-catcher").addEventListener('submit', handleNewBinSubmit);
  document.querySelector('#create-catcher-btn').addEventListener("click", showModal);
  document.querySelector('#modal-layer').addEventListener('click', hideModal);
  document.querySelector('#modal a.close').addEventListener('click', hideModal);
});

const showModal = (event) => {
  // not DRY
  event.preventDefault();
  document.querySelector('#modal-layer').classList.replace('hide', 'show');
  document.querySelector('#modal').classList.replace('hide', 'show');
};

const hideModal = (event) => {
  // not DRY
  event.preventDefault();
  document.querySelector('#modal-layer').classList.replace('show', 'hide');
  document.querySelector('#modal').classList.replace('show', 'hide');
};

const handleNewBinSubmit = async(event) => {
  event.preventDefault();
  let binName = document.querySelector("#name").value;

  if (binName !== "") {
    await DB.createNewBin(binName);
    location.reload();
  } else {
    alert('Name is required.');
  }
};


// console.log(seed.getBins());
// Bin {
//   id: 1,
//   name: 'My first Bin',
//   createdAt: undefined,
//   uuid: 'abcd1234'
// }

// console.log(seed.getBins());
// [
//   Bin {
//     id: 1,
//     name: 'My first Bin',
//     createdAt: undefined,
//     uuid: 'abcd1234'
//   },
//   Bin {
//     id: 2,
//     name: 'Another Bin',
//     createdAt: undefined,
//     uuid: '5678wxyz'
//   }
// ]

// console.log(seed.getOneRequest());
// Request {
//   id: 1,
//   mongoId: 10,
//   receivedAt: '2023-09-10',
//   httpMethod: 'POST',
//   httpPath: '/something',
//   payload: 'alksdjfl;aksdf'
// }

// console.log(seed.getRequests());
// [
//   Request {
//     id: 1,
//     mongoId: 10,
//     receivedAt: '2023-09-10',
//     httpMethod: 'POST',
//     httpPath: '/something',
//     payload: 'alksdjfl;aksdf'
//   },
//   Request {
//     id: 2,
//     mongoId: 15,
//     receivedAt: '2023-09-11',
//     httpMethod: 'POST',
//     httpPath: '/something',
//     payload: 'alksdjfl;aksdf'
//   },
//   Request {
//     id: 3,
//     mongoId: 20,
//     receivedAt: '2023-09-13',
//     httpMethod: 'POST',
//     httpPath: '/something',
//     payload: 'alksdjfl;aksdf'
//   }
// ]
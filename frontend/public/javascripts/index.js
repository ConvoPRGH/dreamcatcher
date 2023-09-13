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
  document.querySelector("#bin-list").addEventListener('click', handleBinClicked);
  document.querySelector('#create-catcher-btn').addEventListener("click", toggleModal);
  document.querySelector('#modal-layer').addEventListener('click', toggleModal);
  document.querySelector('#modal a.close').addEventListener('click', toggleModal);
});

const handleBinClicked = (e) => {
  const catcher = e.target.closest(".catcher");
  const bin_path = catcher.dataset.bin_path;
  alert(`Clicked on catcher ${bin_path}`)
}

const toggleModal = (event) => {
  // not DRY
  event.preventDefault();
  const modal = document.querySelector('#modal');;
  const modalLayer = document.querySelector('#modal-layer');
  const showHide = modal.style.display === 'block' ? 'none' : 'block';
  modal.style.display = showHide;
  modalLayer.style.display = showHide;
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
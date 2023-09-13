import Bin from '../src/classes/Bin';
import Request from '../src/classes/Request';
import TemplateManager from '../src/classes/TemplateManager';
import DBmanager from '../src/classes/DBmanager';
import Seed from '../src/utils/Seed';

const seed = new Seed();
const DB = new DBmanager;

document.addEventListener('DOMContentLoaded', async() => {
  // load the templates
  // render the main page
  try { 
    const manager = new TemplateManager;
    const list = document.querySelector('#bin-list');
    const listData = await DB.fetchAllBins();
    list.innerHTML = manager.templates.all_bins({bin: listData});
  } catch (e) {
    console.log(e.messsage);
  }
  // console.log('index.js loaded');
  // console.log(seed.getOneBin());
  // console.log(seed.getBins());
  // console.log(seed.getOneRequest());
  // console.log(seed.getRequests());
  let form = document.querySelector("#new-catcher");
  form.addEventListener('submit', handleNewBinSubmit);

});

const handleNewBinSubmit = async(e) => {
  e.preventDefault();
  
  let binName = document.querySelector("#name").value;
  const data = await DB.createnewBin(binName);
}


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
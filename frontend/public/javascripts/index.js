import Bin from '../src/classes/Bin';
import Request from '../src/classes/Request';
import TemplateManager from '../src/classes/TemplateManager';
import Seed from '../src/utils/Seed';

const seed = new Seed();

document.addEventListener('DOMContentLoaded', function() {
  const manager = new TemplateManager;
  populateLists(manager.templates.all_bins);
  console.log(manager.templates)
  // console.log('index.js loaded');
  // console.log(seed.getOneBin());
  // console.log(seed.getBins());
  // console.log(seed.getOneRequest());
  // console.log(seed.getRequests());
});

const populateLists = async (all_bins) => {
  try {
    const list = document.querySelector('#bin-list')
    const response = await fetch('http://localhost:3000/api/bins')
    const data = await response.json()
    list.innerHTML = all_bins({bin: data})
  } catch(e) {
    console.log(e.message)
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
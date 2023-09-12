// const Bin = require('./classes/Bin');
// const Request = require('./classes/Request');

// const Seed = require('./utils/Seed');

// const seed = new Seed();

document.addEventListener('DOMContentLoaded', function() {
  console.log('index.js loaded');
});

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
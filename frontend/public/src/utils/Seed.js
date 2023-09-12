import Bin from '../classes/Bin';
import Request from '../classes/Request';

export default class Seed {
  constructor() {
    this.binOne = new Bin({
      id: 1,
      name: 'My first Bin',
      created_at: '2023-09-10',
      uuid: 'abcd1234'
    });
    
    this.binTwo = new Bin({
      id: 2,
      name: 'Another Bin',
      created_at: '2023-09-12',
      uuid: '5678wxyz'
    });

    this.requestOne = new Request({
      id: 1,
      mongoId: 10,
      receivedAt: '2023-09-10',
      httpMethod: 'POST',
      httpPath: '/something',
      payload: 'alksdjfl;aksdf'
    });
    
    this.requestTwo = new Request({
      id: 2,
      mongoId: 15,
      receivedAt: '2023-09-11',
      httpMethod: 'POST',
      httpPath: '/something',
      payload: 'alksdjfl;aksdf'
    });
    
    this.requestThree = new Request({
      id: 3,
      mongoId: 20,
      receivedAt: '2023-09-13',
      httpMethod: 'POST',
      httpPath: '/something',
      payload: 'alksdjfl;aksdf'
    });
  }

  getOneBin() {
    return this.binOne
  }

  getBins() {
    return [this.binOne, this.binTwo]
  }

  getOneRequest() {
    return this.requestOne;
  }

  getRequests() {
    return [this.requestOne, this.requestTwo, this.requestThree]
  }
}
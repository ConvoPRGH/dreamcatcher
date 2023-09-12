export default class Request {
  constructor(requestObject) {
    this.id = requestObject.id;
    this.mongoId = requestObject.mongoId;
    this.receivedAt = requestObject.receivedAt;
    this.httpMethod = requestObject.httpMethod;
    this.httpPath = requestObject.httpPath;
    this.payload = requestObject.payload;
  }
}
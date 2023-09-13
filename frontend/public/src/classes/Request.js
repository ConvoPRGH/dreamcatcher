export default class Request {
  constructor(requestObject) {
    this.id = requestObject.id;
    this.mongo_id = requestObject.mongo_id;
    this.received_at = this.#mapDatetoYMDT(requestObject.received_at)
    this.http_method = requestObject.http_method;
    this.http_path = requestObject.http_path;
    this.payload = requestObject.payload;
  }

  #mapDatetoYMDT(date) {
    const formatDate = new Date(date);
    const stdDate = String(formatDate).split(' G')[0];
    return stdDate;
  }
}
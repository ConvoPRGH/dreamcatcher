export default class Bin {
  constructor(binObject) {
    this.id = binObject.id;
    this.name = binObject.name;
    this.createdAt = binObject.created_at;
    this.bin_path = binObject.bin_path;
    this.created_at = binObject.created_at;
    this.last_accessed = this.#lastAccessedTime(binObject.created_at);
    this.requests = binObject.requests;
  }

  #lastAccessedTime(created_at) {
    const difference = Math.abs(new Date() - new Date(created_at));
    return new Date(difference).getDate();
  }
}
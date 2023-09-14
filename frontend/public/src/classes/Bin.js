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
    const now = new Date();
    const difference = Math.abs(now - created_at)
    const days = Math.floor(difference / (24*60*60*1000));
    return days
  }
}
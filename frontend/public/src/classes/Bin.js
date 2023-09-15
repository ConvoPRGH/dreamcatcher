export default class Bin {
  constructor(binObject) {
    this.id = binObject.id;
    this.name = binObject.name;
    this.createdAt = binObject.created_at;
    this.bin_path = binObject.bin_path;
    this.created_at = binObject.created_at;
    this.last_accessed = this.#lastAccessedTime(binObject.most_recent);
    this.requests = binObject.requests;
  }

  #lastAccessedTime(created_at) {
    if (!created_at) { return "No requests yet"; }

    const now = new Date();
    const difference = Math.abs(now - created_at);
    
    const minutes = Math.floor(difference / (60 * 1000));
    if (minutes < 60) {
        return minutes + " minute(s) ago";
    }
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return hours + " hour(s) ago";
    }
    
    const days = Math.floor(hours / 24);
    return days + " day(s) ago";
  }
}
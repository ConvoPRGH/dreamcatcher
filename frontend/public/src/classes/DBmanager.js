export default class DBmanager {

  async fetchAllBins() {
    try {
      const url = `${window.location.href}api/bins`;
      const response = await fetch(url)
      let data = await response.json()
      data.forEach(entry => entry.created_at = this.#convertPSQLTimestamp(entry.created_at));
      return data
    } catch(e) {
      console.log(e.message);
    }
  };

  async createNewBin(name) {
    const binName = { name }
    try {
      const url = `${window.location.href}api/bins`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(binName)
      });
      return response.json();
    } catch(e) {
      console.log(e.message);
    }
  }

  async fetchOneBin(bin_id) {
    try {
      const url = `${window.location.href}api/bins/${bin_id}`;
      const response = await fetch(url)
      let data = await response.json()
      data.forEach(entry => entry.created_at = this.#convertPSQLTimestamp(entry.created_at));
      return data
    } catch(e) {
      console.log(e.message);
    }
  };

  async fetchAllRequests(bin_id) {
    try {
      const url = `${window.location.href}api/bins/${bin_id}/requests`;
      const response = await fetch(url)
      let data = await response.json()
      data.forEach(entry => entry.created_at = this.#convertPSQLTimestamp(entry.received_at));
      return data
    } catch(e) {
      console.log(e.message);
    }
  };

  #convertPSQLTimestamp(timestamp) {
    let [date, time] = timestamp.split('T');
    time = time.slice(0, 8);
    return date + ' ' + time;
  }
}

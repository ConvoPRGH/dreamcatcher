export default class DBmanager {

  async fetchAllBins() {
    try {
      const response = await fetch('http://localhost:3000/api/bins')
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
      const url = 'http://localhost:3000/api/bins'
      console.log(binName);
      console.log(JSON.stringify(binName));
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

  #convertPSQLTimestamp(timestamp) {
    let [date, time] = timestamp.split('T');
    time = time.slice(0, 8);
    return date + ' ' + time;
  }
}

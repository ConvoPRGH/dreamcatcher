export default class DBmanager {

  async fetchAllBins() {
    try {
      const response = await fetch('http://localhost:3000/api/bins')
      let data = await response.json()
      data.forEach(entry => entry.created_at = this.#convertPSQLTimestamp(entry.created_at));
      return data
    } catch(e) {
      console.log(e.message)
    }
  };

  // TODO - convert timestamp function
  // psql timestamp format 2023-09-12T23:36:04.310Z 

  #convertPSQLTimestamp(timestamp) {
    let [date, time] = timestamp.split('T');
    time = time.slice(0, 8);
    return date + ' ' + time;
  }
}

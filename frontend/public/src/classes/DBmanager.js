export default class DBmanager {

  async fetchAllBins() {
    try {
      const response = await fetch('http://localhost:3000/api/bins');
      const data = await response.json();
      return data;
    } catch(e) {
      console.log(e.message);
    }
  };

  async createNewBin(name) {
    const binName = { name }
    try {
      const url = 'http://localhost:3000/api/bins'
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(binName)
      })
      return response.json();
    } catch(e) {
      console.log(e.message);
    }
  }
}

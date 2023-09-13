export default class DBmanager {

  async fetchAllBins() {
    try {
      const response = await fetch('http://localhost:3000/api/bins')
      const data = await response.json()
      return data
    } catch(e) {
      console.log(e.message)
    }
  };
}

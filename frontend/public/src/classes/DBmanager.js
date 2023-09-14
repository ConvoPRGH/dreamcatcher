export default class DBmanager {

  async fetchAllBins() {
    try {
      const path = this.#convertToCurrentRelativePath(window.location.href)
      const url = `${path}/api/bins`;
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
      const path = this.#convertToCurrentRelativePath(window.location.href)
      const url = `${path}/api/bins`;
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
      const path = this.#convertToCurrentRelativePath(window.location.href)
      const url = `${path}/api/bins/${bin_id}`;
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
      const path = this.#convertToCurrentRelativePath(window.location.href)
      const url = `${path}/api/bins/${bin_id}/requests`;
      const response = await fetch(url)
      let data = await response.json()
      data.forEach(entry => entry.created_at = this.#convertPSQLTimestamp(entry.received_at));
      return data
    } catch(e) {
      console.log(e.message);
    }
  };

  async deleteBin(bin_id) {
    // let requests = await this.fetchAllRequests(bin_id);
    console.log('DBManager::deleteBin');
    try {
      // nice to have: delete requests from mongo
        // let requests = await this.fetchAllRequests(bin_id);
        // delete each request

      const path = this.#convertToCurrentRelativePath(window.location.href)
      const url = `${path}/api/bins/${bin_id}`;
      const response = await fetch(url, {method: "DELETE"}); // binsRouter.delete('/:bin_path', async (req, res) => {
      
    } catch (error) {
      console.log("dbmanager:: deleteBin", error.message);
    }
  }

  #convertPSQLTimestamp(timestamp) {
    const [date, time] = timestamp.split('T');
    let jsTime = new Date(date + ' ' + time.slice(0, 8));
    jsTime.setHours(jsTime.getHours() - 4);
    return jsTime;
  }

  #convertToCurrentRelativePath(href) {
    let currentPath = href.split('/')
    currentPath = currentPath.slice(0, currentPath.length - 1)
    return currentPath.join('/');
  }
}

export default class Events {

  createMainPageEvents() {
    document.querySelector("#new-catcher").addEventListener('submit', this.handleNewBinSubmit);
    document.querySelector("#bin-list").addEventListener('click', this.handleBinRoute);
    document.querySelector('#create-catcher-btn').addEventListener("click", this.toggleModal);
    document.querySelector('#modal-layer').addEventListener('click', this.toggleModal);
    document.querySelector('#modal a.close').addEventListener('click', this.toggleModal);
  }

  createBinPageEvents(requests, requestBox, manager) {
    this.requests = requests;
    this.requestBox = requestBox;
    this.manager = manager;
    document.querySelector("#request-list").addEventListener('click', this.handleRequestClicked.bind(this));
  }

  handleBinRoute(e) {
    if (e.target.classList.contains('delete-button')) {
      return;
    }
    const catcher = e.target.closest(".catcher");
    const bin_path = catcher.dataset.bin_path;
    window.location.href = `/${bin_path}`;
  }

  handleBinDelete(e) {
    if (!e.target.classList.contains('delete-button')) {
      return;
    }
    // TODO confirm delete, delete from DB, check if deleted, display success message, remove from dom

  }
  
  handleRequestClicked(e) {
    const requestDiv = e.target.closest(".request");
    const requestId = requestDiv.dataset.request_id;
    const request = this.requests.filter(r => r.mongo_id === requestId)[0];

    this.requestBox.innerHTML = this.manager.templates.one_request({request: request})
  }

  toggleModal(e) {
    e.preventDefault();
    const modal = document.querySelector('#modal');;
    const modalLayer = document.querySelector('#modal-layer');
    const showHide = modal.style.display === 'block' ? 'none' : 'block';
    modal.style.display = showHide;
    modalLayer.style.display = showHide;
  }
  
  async handleNewBinSubmit(e) {
    e.preventDefault();
    let binName = document.querySelector("#name").value;
  
    if (binName !== "") {
      await DB.createNewBin(binName);
      location.reload();
    } else {
      alert('Name is required.');
    }
  }
}
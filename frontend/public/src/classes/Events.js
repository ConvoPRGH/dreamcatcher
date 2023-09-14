export default class Events {

  constructor(db) {
    this.DB = db;
  }

  createMainPageEvents() {
    document.querySelector("#new-catcher").addEventListener('submit', this.handleNewBinSubmit.bind(this));
    document.querySelector("#bin-list").addEventListener('click', this.handleBinRoute);
    document.querySelector("#bin-list").addEventListener('click', this.handleBinDelete.bind(this));
    document.querySelector('#create-catcher-btn').addEventListener("click", this.toggleModal);
    document.querySelector('#create-catcher-btn').addEventListener("click", this.focusText);
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
    const parent = e.target.closest('span')
    if (parent && parent.classList.contains('delete-button')) {
      return;
    }
    const catcher = e.target.closest(".catcher");
    const bin_path = catcher.dataset.bin_path;
    const path = window.location.href;
    window.location.href = `${path}${bin_path}`;
  }

  handleBinDelete(e) {
    const parent = e.target.closest('span')
    if (!parent) {
      return;
    }
    if (!parent.classList.contains('delete-button')) {
      return;
    }
    const catcher = e.target.closest(".catcher");
    const bin_path = catcher.dataset.bin_path;
    const deleteConfirmed = confirm('This will delete the Catcher and all requests. Do you want to continue?');
    if (!deleteConfirmed) {
      return;
    }
    this.DB.deleteBin(bin_path); //db undefined
    // TODO confirm delete, delete from DB, check if deleted, display success message, remove from dom

  }
  
  handleRequestClicked(e) {
    const requestDiv = e.target.closest(".request");
    const requestId = requestDiv.dataset.request_id;
    const request = this.requests.filter(r => r.mongo_id === requestId)[0];

    this.requestBox.innerHTML = this.manager.templates.one_request({request: request})
  }

  toggleModal(e) {
    const modal = document.querySelector('#modal');;
    const modalLayer = document.querySelector('#modal-layer');
    const showHide = modal.style.display === 'block' ? 'none' : 'block';
    modal.style.display = showHide;
    modalLayer.style.display = showHide;
  }
  
  focusText(e) {
    document.querySelector('#name').focus();
  }

  async handleNewBinSubmit(e) {
    e.preventDefault();
    let binName = document.querySelector("#name").value;
    if (binName === "") {
      alert('Name is required.');
      return
    } else if (binName.length > 75) {
      alert('Name must be less than 75 characters');
      return
    } else {
      await this.DB.createNewBin(binName);
      location.reload();
    }
  }
}
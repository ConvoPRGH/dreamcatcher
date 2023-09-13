export default class Events {

  createMainPageEvents() {
    document.querySelector("#new-catcher").addEventListener('submit', this.handleNewBinSubmit);
    document.querySelector("#bin-list").addEventListener('click', this.handleBinRoute);
    document.querySelector('#create-catcher-btn').addEventListener("click", this.toggleModal);
    document.querySelector('#modal-layer').addEventListener('click', this.toggleModal);
    document.querySelector('#modal a.close').addEventListener('click', this.toggleModal);
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
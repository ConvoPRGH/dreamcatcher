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

  createBinPageEvents(requests, requestBox, manager, recursivePrint, bodyContainer, headersContainer) {
    this.requests = requests;
    this.requestBox = requestBox;
    this.manager = manager;
    this.recursivePrint = recursivePrint;
    this.bodyContainer = bodyContainer;
    this.headersContainer = headersContainer;
    document.querySelector("#request-list").addEventListener('click', this.handleRequestClicked.bind(this));
    document.querySelector('#back-button').addEventListener('click', this.handleClickBack.bind(this));
    document.querySelector('#copy-button').addEventListener('click', this.handleCopyClick.bind(this));
    document.querySelector("#request-list").addEventListener('click', this.handleRequestDelete.bind(this));
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
      let binDeleted = this.DB.deleteBin(bin_path); 
      if (binDeleted) {
        catcher.remove();
      }
  }

  handleRequestDelete(e) {
    const parent = e.target.closest('span')
    if (!parent) {
      return;
    }
    if (!parent.classList.contains('delete-button')) {
      return;
    }
    const request = e.target.closest(".request");
    const request_id = request.dataset.request_id;
    const bin_path = this.#getBinPath(window.location.href);
    const deleteConfirmed = confirm('This will delete the request. Do you want to continue?');
    if (!deleteConfirmed) {
      return;
    }
      let binDeleted = this.DB.deleteRequest(bin_path, request_id); 
      if (binDeleted) {
        request.remove();
      }
  }
  
  handleRequestClicked(e) {
    const parent = e.target.closest('span')
    if (parent && parent.classList.contains('delete-button')) {
      return;
    }
    const requestDiv = e.target.closest(".request");
    const requestId = requestDiv.dataset.request_id;
    const request = this.requests.filter(r => r.mongo_id === requestId)[0];
    const details = `${request.http_method} request from ${request.http_path} at ${request.received_at}`
    document.querySelector('#request-name').textContent = 'Request details for:'
    document.querySelector('#request-details-header').textContent = details;

    const jsonData = JSON.parse(request.payload);
    this.bodyContainer.innerHTML = ""
    this.headersContainer.innerHTML = ""
    this.recursivePrint(jsonData.body, this.bodyContainer, 0);
    this.recursivePrint(jsonData.headers, this.headersContainer, 0)
  }

  toggleModal(e) {
    e.preventDefault()
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

  handleClickBack(e) {
    const path = this.#convertToCurrentRelativePath(window.location.href);
    window.location.href = path;
  }

  async handleCopyClick(e) {
    try {
      const path = this.#convertToCurrentRelativePath(window.location.href);
      const bin_id = this.#getBinPath(window.location.href);
      const url = `${path}/api/${bin_id}/`;
      await navigator.clipboard.writeText(url);
      const notification = document.querySelector('#text-copy-confirm');
      notification.style.opacity = 1
      notification.classList.remove('fade-out')
      void notification.offsetWidth;
      notification.classList.add('fade-out');
      
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }

  #convertToCurrentRelativePath(href) {
    let currentPath = href.split('/');
    currentPath = currentPath.slice(0, currentPath.length - 1);
    return currentPath.join('/');
  }

  #getBinPath(href) {
    let currentPath = href.split('/');
    currentPath = currentPath.slice(currentPath.length - 1);
    return currentPath[0];
  }
}
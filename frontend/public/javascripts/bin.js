import Bin from '../src/classes/Bin';
import Request from '../src/classes/Request';
import TemplateManager from '../src/classes/TemplateManager';
import DBmanager from '../src/classes/DBmanager';
import Seed from '../src/utils/Seed';

const seed = new Seed();
const DB = new DBmanager();

document.addEventListener('DOMContentLoaded', async() => {
  try {
    const URL = window.location.href;
    const manager = new TemplateManager();
    const header = document.querySelector('#bin-header');
    const list = document.querySelector('#request-list');
    const binData = await DB.fetchOneBin();
    const requestData = await DB.fetchAllRequests();
    list.innerHTML = manager.templates.({bin: listData});
  } catch (error) {
    console.log(error.messsage);
  }

  document.querySelector("#new-catcher").addEventListener('submit', handleNewBinSubmit);
  document.querySelector("#bin-list").addEventListener('click', handleBinClicked);
  document.querySelector('#create-catcher-btn').addEventListener("click", toggleModal);
  document.querySelector('#modal-layer').addEventListener('click', toggleModal);
  document.querySelector('#modal a.close').addEventListener('click', toggleModal);
});

const handleBinClicked = (e) => {
  const catcher = e.target.closest(".catcher");
  const bin_path = catcher.dataset.bin_path;
  alert(`Clicked on catcher ${bin_path}`)
}
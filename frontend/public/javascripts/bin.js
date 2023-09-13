import Bin from '../src/classes/Bin';
import Request from '../src/classes/Request';
import TemplateManager from '../src/classes/TemplateManager';
import DBmanager from '../src/classes/DBmanager';

const DB = new DBmanager();

document.addEventListener('DOMContentLoaded', async() => {
  try {
    const url = new URL(window.location.href);
    console.log(url.path);
    const manager = new TemplateManager();
    const header = document.querySelector('#bin-header');
    const list = document.querySelector('#request-list');
    const binData = await DB.fetchOneBin();
    const requestData = await DB.fetchAllRequests();
    list.innerHTML = manager.templates.({request: requestData});
  } catch (error) {
    console.log(error.messsage);
  }

  //document.querySelector("#bin-list").addEventListener('click', handleBinClicked);
});
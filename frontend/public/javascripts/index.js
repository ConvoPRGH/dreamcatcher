import Bin from '../src/classes/Bin';
import TemplateManager from '../src/classes/TemplateManager';
import DBmanager from '../src/classes/DBmanager';
import Events from '../src/classes/Events';

const DB = new DBmanager();

document.addEventListener('DOMContentLoaded', async() => {
  try {
    const manager = new TemplateManager();
    const list = document.querySelector('#bin-list');
    const listData = await DB.fetchAllBins();
    const bins = mapToBins(listData)
    console.log(listData)
    console.log(bins)
    list.innerHTML = manager.templates.all_bins({bin: bins});
    const events = new Events();
    events.createMainPageEvents();
  } catch (error) {
    console.log(error.messsage);
  }
});

const mapToBins = (rawBins) => {
  return rawBins.map(bin => new Bin(bin))
};
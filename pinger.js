const axios = require("axios");
const sites = require("./sites.json");

let siteStatus = {};

async function pingSites() {
  const now = new Date().toISOString();
  for (let url of sites) {
    try {
      await axios.get(url, { timeout: 5000 });
      siteStatus[url] = { status: "✅ Online", lastPing: now };
      console.log(`✅ Pinged ${url}`);
    } catch (err) {
      siteStatus[url] = { status: "❌ Offline", lastPing: now };
      console.log(`❌ Failed to ping ${url}`);
    }
  }
}

function getStatus() {
  return siteStatus;
}

module.exports = { pingSites, getStatus };

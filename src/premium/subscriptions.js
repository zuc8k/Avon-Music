const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "subscriptions.json");

function load() {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function save(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function addPrime(guildId, expiresAt) {
  const data = load();
  data[guildId] = {
    expiresAt,
    addedAt: Date.now()
  };
  save(data);
}

function removePrime(guildId) {
  const data = load();
  delete data[guildId];
  save(data);
}

function getAll() {
  return load();
}

function get(guildId) {
  const data = load();
  return data[guildId] || null;
}

module.exports = {
  addPrime,
  removePrime,
  get,
  getAll
};
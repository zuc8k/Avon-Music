class PanelState {
  constructor() {
    this.panels = new Map();
  }

  set(guildId, data) {
    this.panels.set(guildId, data);
  }

  get(guildId) {
    return this.panels.get(guildId) || null;
  }

  delete(guildId) {
    this.panels.delete(guildId);
  }
}

module.exports = new PanelState();
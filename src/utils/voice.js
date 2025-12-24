function getUserVoice(member) {
  return member?.voice?.channel || null;
}

module.exports = { getUserVoice };
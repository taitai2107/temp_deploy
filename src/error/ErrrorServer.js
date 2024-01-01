module.exports = class SeverError extends Error {
  constructor(message) {
    super();
    this.messageObject = message;
    this.status = 500;
  }
};

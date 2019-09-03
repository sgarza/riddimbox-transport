class Transport {
  static _provider = null;

  static get provider() {
    return Transport._provider;
  }

  static start() {
    this.provider.start();
  }
}

export default Transport;

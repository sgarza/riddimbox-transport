let _provider = null;
class Transport {
  static get provider() {
    Transport._throwIfProviderNotSet();
    return _provider;
  }

  static set provider(provider) {
    _provider = provider;
  }

  static get state() {
    return Transport.provider.state;
  }

  static start() {
    Transport.provider.start();
  }

  static stop() {
    Transport.provider.stop();
  }

  static _throwIfProviderNotSet() {
    if (!_provider) {
      throw new Error(
        "You need to set a provider first. Try with the ToneTransportProvider class."
      );
    }
  }
}

export default Transport;

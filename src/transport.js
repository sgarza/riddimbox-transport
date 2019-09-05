class Transport {
  static _provider = null;

  static get provider() {
    Transport._throwIfProviderNotSet();
    return Transport._provider;
  }

  static set provider(provider) {
    Transport._provider = provider;
  }

  static get state() {
    return Transport.provider.state;
  }

  static get bpm() {
    return Transport.provider.bpm;
  }

  static set bpm(bpm) {
    Transport.provider.bpm = bpm;
  }

  static get swing() {
    return Transport.provider.swing;
  }

  static set swing(swing) {
    Transport.provider.swing = swing;
  }

  static get swingSubdivision() {
    return Transport.provider.swingSubdivision;
  }

  static set swingSubdivision(swingSubdivision) {
    Transport.provider.swingSubdivision = swingSubdivision;
  }

  static get timeSignature() {
    return Transport.provider.timeSignature;
  }

  static set timeSignature(timeSignature) {
    Transport.provider.timeSignature = timeSignature;
  }

  static get ticks() {
    return Transport.provider.ticks;
  }

  static get beats() {
    return Transport.provider.beats;
  }

  static get bars() {
    return Transport.provider.bars;
  }

  static on(event, listener) {
    return Transport.provider.on(event, listener);
  }

  static start() {
    Transport.provider.start();
  }

  static stop() {
    Transport.provider.stop();
  }

  static _throwIfProviderNotSet() {
    if (!Transport._provider) {
      throw new Error(
        "You need to set a provider first. Try with the ToneTransportProvider class."
      );
    }
  }
}

export default Transport;

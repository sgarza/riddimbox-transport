class ToneTransportProvider {
  constructor(Tone) {
    this.engine = Tone;
  }

  get state() {
    return this.engine.state;
  }

  start() {
    this.engine.start();
  }
}

export default ToneTransportProvider;

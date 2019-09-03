class ToneTransportProvider {
  constructor(Tone) {
    this.engine = Tone;
  }

  get state() {
    return this.engine.Transport.state;
  }

  get bpm() {
    return this.engine.Transport.bpm;
  }

  set bpm(bpm) {
    this.engine.Transport.bpm = bpm;
  }

  start() {
    this.engine.Transport.start();
  }

  stop() {
    this.engine.Transport.stop();
  }
}

export default ToneTransportProvider;

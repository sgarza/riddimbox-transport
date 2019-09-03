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

  get swing() {
    return Math.round(this.engine.Transport.swing * 100);
  }

  set swing(swing) {
    this.engine.Transport.swing = swing / 100;
  }

  start() {
    this.engine.Transport.start();
  }

  stop() {
    this.engine.Transport.stop();
  }
}

export default ToneTransportProvider;

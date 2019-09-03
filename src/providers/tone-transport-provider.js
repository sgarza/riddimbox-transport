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

  get swingSubdivision() {
    return parseInt(this.engine.Transport.swingSubdivision, 10);
  }

  set swingSubdivision(value) {
    const validValues = [8, 16];

    if (!validValues.includes(value)) {
      throw new Error("Invalid subdivision value");
    }

    this.engine.Transport.swingSubdivision = `${value}n`;
  }

  start() {
    this.engine.Transport.start();
  }

  stop() {
    this.engine.Transport.stop();
  }
}

export default ToneTransportProvider;

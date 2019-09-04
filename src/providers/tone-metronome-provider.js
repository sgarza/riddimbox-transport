class ToneMetronomeProvider {
  constructor(Transport) {
    this.transport = Transport;
    this.engine = Transport.provider.engine;
    this.synth = new this.engine.Synth({
      oscillator: {
        type: "pwm",
        modulationFrequency: 0.2
      },
      envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0.05,
        release: 0.05
      }
    });

    const repeatEachBarSubdivision = `${this.transport.timeSignature[1]}n`;

    this.engine.Transport.scheduleRepeat(
      this._repeatHandler,
      repeatEachBarSubdivision
    );
  }

  connect(audioNode) {
    this.synth.connect(audioNode);
  }

  _repeatHandler(time) {
    if (this.transport.beats === 0) {
      this.synth.triggerAttackRelease("G4", "16n", time);
    } else {
      this.synth.triggerAttackRelease("C4", "16n", time);
    }
  }
}

export default ToneMetronomeProvider;

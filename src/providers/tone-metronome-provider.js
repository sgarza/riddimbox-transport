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

    this.toneEventID = null;
    this._isEnabled = true;

    this._scheduleToneEvent();

    Transport.on("timeSignature", this._timeSignatureChange);
  }

  get isEnabled() {
    return this._isEnabled;
  }

  connect(audioNode) {
    this.synth.connect(audioNode);
  }

  disable() {
    this._isEnabled = false;
  }

  enable() {
    this._isEnabled = true;
  }

  _scheduleToneEvent() {
    this.toneEventID = this.engine.Transport.scheduleRepeat(
      this._repeatHandler,
      `${this.transport.timeSignature[1]}n`
    );
  }

  _repeatHandler = time => {
    if (!this._isEnabled) return;

    if (this.transport.beats === 0) {
      this.synth.triggerAttackRelease("G4", "16n", time);
    } else {
      this.synth.triggerAttackRelease("C4", "16n", time);
    }
  };

  _timeSignatureChange = () => {
    this.engine.Transport.clear(this.toneEventID);
    this._scheduleToneEvent();
  };
}

export default ToneMetronomeProvider;

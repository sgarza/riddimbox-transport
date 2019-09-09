import TapTempo from "tap-tempo";

const tapTempo = TapTempo();

class Metronome {
  constructor(provider) {
    if (!provider) {
      throw new Error(
        "You need to set a provider first. Try with the ToneMetronomeProvider class."
      );
    }

    this.provider = provider;
    this.tapTempo = tapTempo;

    this.tapTempo.on("tempo", this._onTapTempoHandler);
  }

  connect(audioNode) {
    this.provider.connect(audioNode);
  }

  disable() {
    this.provider.disable();
  }

  enable() {
    this.provider.enable();
  }

  isEnabled() {
    return this.provider.isEnabled();
  }

  tap() {
    this.tapTempo.tap();
  }

  _onTapTempoHandler(tempo) {
    this.provider.transport.bpm = parseInt(tempo, 10);
  }
}

export default Metronome;

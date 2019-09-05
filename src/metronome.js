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

  tap() {
    this.tapTempo.tap();
  }

  _onTapTempoHandler(tempo) {
    this.provider.transport.bpm = parseInt(tempo, 10);
  }
}

export default Metronome;

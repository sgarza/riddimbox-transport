class Metronome {
  constructor(provider, tapTempo) {
    if (!provider) {
      throw new Error(
        "You need to set a provider first. Try with the ToneMetronomeProvider class."
      );
    }

    if (!tapTempo) {
      throw new Error(
        "tap-tempo library instance must be provided as second argument"
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

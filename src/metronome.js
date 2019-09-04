class Metronome {
  constructor(provider) {
    if (!provider) {
      throw new Error(
        "You need to set a provider first. Try with the ToneMetronomeProvider class."
      );
    }

    this.provider = provider;
  }

  connect(audioNode) {
    this.provider.connect(audioNode);
  }
}

export default Metronome;

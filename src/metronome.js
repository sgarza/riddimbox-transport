class Metronome {
  constructor(provider) {
    if (!provider) {
      throw new Error(
        "You need to set a provider first. Try with the ToneMetronomeProvider class."
      );
    }

    this.provider = provider;
  }
}

export default Metronome;

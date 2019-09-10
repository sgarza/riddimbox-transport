import {
  Metronome,
  Transport,
  constants,
  ToneMetronomeProvider,
  ToneTransportProvider
} from "../src";

const {
  TRANSPORT_STARTED,
  TRANSPORT_STOPPED,
  DEFAULT_BPM_VALUE,
  DEFAULT_SWING_VALUE,
  DEFAULT_SWING_SUBDIVISION_VALUE,
  DEFAULT_TIME_SIGNATURE_VALUE,
  PPQN
} = constants;

let mockToneTransport;
let mockTone;
let synthInstance;

describe("Metronome", () => {
  beforeEach(() => {
    synthInstance = {
      triggerAttackRelease: () => {},
      connect: () => {}
    };

    mockToneTransport = {
      start: () => {
        mockToneTransport.state = TRANSPORT_STARTED;
      },
      stop: () => {
        mockToneTransport.state = TRANSPORT_STOPPED;
      },
      state: TRANSPORT_STOPPED,
      bpm: { value: DEFAULT_BPM_VALUE },
      swing: DEFAULT_SWING_VALUE,
      swingSubdivision: DEFAULT_SWING_SUBDIVISION_VALUE,
      timeSignature: DEFAULT_TIME_SIGNATURE_VALUE,
      scheduleRepeat: () => {},
      clear: () => {}
    };

    mockTone = {
      Transport: { ...mockToneTransport, state: TRANSPORT_STARTED },
      Synth: () => {
        return synthInstance;
      }
    };
  });

  describe("When the provider or tap-tempo are not set", () => {
    it("should throw if no provider is set", () => {
      const wrapper = () => {
        new Metronome();
      };
      expect(wrapper).toThrow(
        "You need to set a provider first. Try with the ToneMetronomeProvider class."
      );
    });
  });

  describe("when provider & tap-tempo are set", () => {
    const tapTempo = { tap: () => {}, on: () => {} };

    it("should create an instance of Metronome", () => {
      const Tone = { ...mockTone };

      const toneTransportProvider = new ToneTransportProvider(Tone);
      Transport.provider = toneTransportProvider;
      const spy = jest.spyOn(Tone, "Synth");
      const provider = new ToneMetronomeProvider(Transport);
      const metronome = new Metronome(provider, tapTempo);

      expect(spy).toHaveBeenCalled();
      expect(metronome).toBeInstanceOf(Metronome);
    });

    it("should play a G4 note on the first tick", () => {
      const Tone = { ...mockTone };

      const toneTransportProvider = new ToneTransportProvider(Tone);
      Transport.provider = toneTransportProvider;

      const provider = new ToneMetronomeProvider(Transport);
      const metronome = new Metronome(provider, tapTempo);

      const triggerAttackReleaseSpy = jest.spyOn(
        provider.synth,
        "triggerAttackRelease"
      );

      const time = 1;
      toneTransportProvider._tickHandler();
      provider._repeatHandler(time);

      expect(triggerAttackReleaseSpy).toHaveBeenCalledWith("G4", "16n", time);
      expect(metronome).toBeInstanceOf(Metronome);
    });

    it("should play a C4 note on the 2nd, 3rd & 4th beats", () => {
      const Tone = { ...mockTone };

      const toneTransportProvider = new ToneTransportProvider(Tone);
      Transport.provider = toneTransportProvider;

      const provider = new ToneMetronomeProvider(Transport);
      const metronome = new Metronome(provider, tapTempo);

      const triggerAttackReleaseSpy = jest.spyOn(
        provider.synth,
        "triggerAttackRelease"
      );

      const time = 1;

      for (let index = 0; index < PPQN * 5; index++) {
        toneTransportProvider._tickHandler();
        if (index % PPQN === 0) {
          provider._repeatHandler(time);
        }
      }

      expect(triggerAttackReleaseSpy).toHaveBeenCalledTimes(5);
      expect(triggerAttackReleaseSpy).toHaveBeenCalledWith("G4", "16n", time);
      expect(triggerAttackReleaseSpy).toHaveBeenCalledWith("C4", "16n", time);
      expect(triggerAttackReleaseSpy).toHaveBeenLastCalledWith(
        "G4",
        "16n",
        time
      );
      expect(metronome).toBeInstanceOf(Metronome);
    });

    it("should connect its output to another node", () => {
      const Tone = { ...mockTone };
      const AudioNode = {};

      const toneTransportProvider = new ToneTransportProvider(Tone);
      Transport.provider = toneTransportProvider;

      const provider = new ToneMetronomeProvider(Transport);
      const metronome = new Metronome(provider, tapTempo);

      const spy = jest.spyOn(provider.synth, "connect");

      metronome.connect(AudioNode);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(AudioNode);
      expect(metronome).toBeInstanceOf(Metronome);
    });

    it("should set a tempo on the Transport by tapping", () => {
      const Tone = { ...mockTone };

      const toneTransportProvider = new ToneTransportProvider(Tone);
      Transport.provider = toneTransportProvider;

      const provider = new ToneMetronomeProvider(Transport);
      const metronome = new Metronome(provider);

      // mock tapTempo
      metronome.tapTempo = tapTempo;

      const spy = jest.spyOn(metronome, "tap");
      expect(Transport.bpm).toBe(120);

      const simulatedTempo = 92;
      for (let index = 0; index < 4; index++) {
        metronome.tap();
        if (index === 3) metronome._onTapTempoHandler(simulatedTempo);
      }

      expect(spy).toHaveBeenCalledTimes(4);
      expect(Transport.bpm).toBe(simulatedTempo);
    });

    it("should execute its internal timeSignature handler when the time signature changes", () => {
      const Tone = { ...mockTone };

      const toneTransportProvider = new ToneTransportProvider(Tone);
      Transport.provider = toneTransportProvider;

      const provider = new ToneMetronomeProvider(Transport);

      const spy = jest.spyOn(provider, "_scheduleToneEvent");

      Transport.timeSignature = [2, 4];

      expect(spy).toHaveBeenCalledTimes(1);
      expect(provider.toneEventID).not.toBe(null);
    });

    it("should disable the metronome", () => {
      const Tone = { ...mockTone };

      const toneTransportProvider = new ToneTransportProvider(Tone);
      Transport.provider = toneTransportProvider;

      const provider = new ToneMetronomeProvider(Transport);
      const metronome = new Metronome(provider);

      const spy = jest.spyOn(synthInstance, "triggerAttackRelease");

      metronome.disable();
      toneTransportProvider._tickHandler();
      provider._repeatHandler();

      expect(spy).not.toHaveBeenCalled();
    });

    it("should enable the metronome", () => {
      const Tone = { ...mockTone };

      const toneTransportProvider = new ToneTransportProvider(Tone);
      Transport.provider = toneTransportProvider;

      const provider = new ToneMetronomeProvider(Transport);
      const metronome = new Metronome(provider);

      const spy = jest.spyOn(synthInstance, "triggerAttackRelease");

      metronome.disable();
      metronome.enable();
      toneTransportProvider._tickHandler();
      provider._repeatHandler();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it("should expose its enabled status", () => {
      const Tone = { ...mockTone };

      const toneTransportProvider = new ToneTransportProvider(Tone);
      Transport.provider = toneTransportProvider;

      const provider = new ToneMetronomeProvider(Transport);
      const metronome = new Metronome(provider);

      expect(metronome.isEnabled).toBe(true);

      metronome.disable();

      expect(metronome.isEnabled).toBe(false);
    });
  });
});

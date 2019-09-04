import { Transport, constants, ToneTransportProvider } from "../src";
const {
  TRANSPORT_STARTED,
  TRANSPORT_STOPPED,
  DEFAULT_BPM_VALUE,
  DEFAULT_SWING_VALUE,
  DEFAULT_SWING_SUBDIVISION_VALUE,
  DEFAULT_TIME_SIGNATURE_VALUE,
  MIN_TICKS,
  MAX_TICKS
} = constants;

let mockToneTransport;

const isValidTickValue = ticks => {
  return ticks >= MIN_TICKS && ticks <= MAX_TICKS;
};

describe("Transport", () => {
  beforeEach(() => {
    mockToneTransport = {
      start: () => {
        mockToneTransport.state = TRANSPORT_STARTED;
      },
      stop: () => {
        mockToneTransport.state = TRANSPORT_STOPPED;
      },
      state: TRANSPORT_STOPPED,
      bpm: DEFAULT_BPM_VALUE,
      swing: DEFAULT_SWING_VALUE,
      swingSubdivision: DEFAULT_SWING_SUBDIVISION_VALUE,
      timeSignature: DEFAULT_TIME_SIGNATURE_VALUE,
      scheduleRepeat: () => {}
    };
  });

  afterEach(() => {
    Transport.stop();
    Transport.provider = null;
  });

  describe("When the provider is not set", () => {
    it("should throw if no provider is set", () => {
      expect(Transport.start).toThrow(
        "You need to set a provider first. Try with the ToneTransportProvider class."
      );
    });
  });

  describe("When a provider is set", () => {
    it("should start the Transport", () => {
      const Tone = {
        Transport: { ...mockToneTransport, state: TRANSPORT_STARTED }
      };
      const spy = jest.spyOn(Tone.Transport, "start");

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      Transport.start();

      expect(spy).toHaveBeenCalled();
      expect(Transport.state).toBe(TRANSPORT_STARTED);
    });

    it("should stop the Transport", () => {
      const Tone = {
        Transport: { ...mockToneTransport, state: TRANSPORT_STOPPED }
      };
      const spy = jest.spyOn(Tone.Transport, "stop");

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      Transport.stop();

      expect(spy).toHaveBeenCalled();
      expect(Transport.state).toBe(TRANSPORT_STOPPED);
    });

    it("should get the default BPM value", () => {
      const Tone = { Transport: { ...mockToneTransport } };

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      expect(Transport.bpm).toBe(DEFAULT_BPM_VALUE);
    });

    it("should set a BPM value", () => {
      const Tone = { Transport: { ...mockToneTransport } };

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const updatedBPMValue = 92;
      Transport.bpm = updatedBPMValue;

      expect(Transport.bpm).toBe(updatedBPMValue);
    });

    it("should get the default Swing value", () => {
      const Tone = { Transport: { ...mockToneTransport } };

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      expect(Transport.swing).toBe(DEFAULT_SWING_VALUE);
    });

    it("should set a Swing value", () => {
      const Tone = { Transport: { ...mockToneTransport } };

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const updatedSwingValue = 57;
      Transport.swing = updatedSwingValue;

      expect(Transport.swing).toBe(updatedSwingValue);
    });

    it("should get the default Swing subdivision", () => {
      const Tone = {
        Transport: { ...mockToneTransport }
      };

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      expect(Transport.swingSubdivision).toBe(DEFAULT_SWING_SUBDIVISION_VALUE);
    });

    it("should throw if setting an invalid swing subdivision", () => {
      const Tone = {
        Transport: {
          ...mockToneTransport
        }
      };

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const wrapper = () => {
        Transport.swingSubdivision = 24;
      };

      expect(wrapper).toThrow("Invalid subdivision value");
    });

    it("should set a valid swing subdivision", () => {
      const Tone = {
        Transport: {
          ...mockToneTransport
        }
      };

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const updatedSwingSubdivisionValue = 16;
      Transport.swingSubdivision = updatedSwingSubdivisionValue;

      expect(Transport.swingSubdivision).toBe(updatedSwingSubdivisionValue);
    });

    it("should get the default time signature", () => {
      const Tone = {
        Transport: {
          ...mockToneTransport
        }
      };

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      expect(Transport.timeSignature).toBe(DEFAULT_TIME_SIGNATURE_VALUE);
    });

    it("should throw if setting an invalid time signature", () => {
      const Tone = {
        Transport: {
          ...mockToneTransport
        }
      };

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const wrapper = () => {
        Transport.timeSignature = [4, 7];
      };

      expect(wrapper).toThrow("Invalid time signature");
    });

    it("should throw if time signature if not an array", () => {
      const Tone = {
        Transport: {
          ...mockToneTransport
        }
      };

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const wrapper = () => {
        Transport.timeSignature = 4;
      };

      expect(wrapper).toThrow("Time signature must an array, ex: [4, 4]");
    });

    it("should throw if time signature if not an array of 2 positions", () => {
      const Tone = {
        Transport: {
          ...mockToneTransport
        }
      };

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const wrapper = () => {
        Transport.timeSignature = [4];
      };

      expect(wrapper).toThrow(
        "Time signature must an array of 2 positions, ex: [4, 4]"
      );
    });

    it("should set a valid time signature", () => {
      const Tone = {
        Transport: {
          ...mockToneTransport
        }
      };

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const updatedTimeSignatureValue = [5, 4];
      Transport.timeSignature = updatedTimeSignatureValue;

      expect(Transport.timeSignature).toBe(updatedTimeSignatureValue);
    });

    it("should increment the tick count when ticks", () => {
      const Tone = {
        Transport: {
          ...mockToneTransport
        }
      };

      const spy = jest.spyOn(Tone.Transport, "scheduleRepeat");

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      Transport.start();
      provider._tickHandler();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(Transport.ticks).toBe(1);
    });

    it("should get the current tick value within the min & max ticks range", () => {
      const Tone = {
        Transport: {
          ...mockToneTransport
        }
      };

      const spy = jest.spyOn(Tone.Transport, "scheduleRepeat");

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      Transport.start();

      const emulatedTicks = 4874;
      for (let index = 0; index < emulatedTicks; index++) {
        provider._tickHandler();
      }

      expect(spy).toHaveBeenCalledTimes(1);
      expect(isValidTickValue(Transport.ticks)).toBe(true);
    });

    it("should increment the beats count when ticks 192 times", () => {
      const Tone = {
        Transport: {
          ...mockToneTransport
        }
      };

      const spy = jest.spyOn(Tone.Transport, "scheduleRepeat");

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      expect(Transport.beats).toBe(0);

      Transport.start();
      for (let index = 0; index < 192; index++) {
        provider._tickHandler();
      }

      expect(spy).toHaveBeenCalledTimes(1);
      expect(Transport.beats).toBe(1);
    });

    it("should increment the beats count and return a value not greater than timeSignature[beats]", () => {
      const Tone = {
        Transport: {
          ...mockToneTransport
        }
      };

      const spy = jest.spyOn(Tone.Transport, "scheduleRepeat");

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      expect(Transport.beats).toBe(0);

      Transport.start();
      for (let index = 0; index < 192 * 5; index++) {
        provider._tickHandler();
      }

      expect(spy).toHaveBeenCalledTimes(1);
      expect(Transport.beats).toBe(1);
    });
  });
});

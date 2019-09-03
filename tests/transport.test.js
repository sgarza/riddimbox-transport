import { Transport, constants, ToneTransportProvider } from "../src";
const {
  TRANSPORT_STARTED,
  TRANSPORT_STOPPED,
  DEFAULT_BPM_VALUE,
  DEFAULT_SWING_VALUE,
  DEFAULT_SWING_SUBDIVISION_VALUE,
  DEFAULT_TIME_SIGNATURE_VALUE
} = constants;

describe("Transport", () => {
  afterEach(() => {
    Transport.provider = null;
  });

  describe("When the provider is not set", () => {
    it("should throw if no provider is set", () => {
      expect(Transport.start).toThrow();
    });
  });

  describe("When a provider is set", () => {
    it("should start the Transport", () => {
      const Tone = { Transport: { start: () => {}, state: TRANSPORT_STARTED } };
      const spy = jest.spyOn(Tone.Transport, "start");

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      Transport.start();

      expect(spy).toHaveBeenCalled();
      expect(Transport.state).toBe(TRANSPORT_STARTED);
    });

    it("should stop the Transport", () => {
      const Tone = { Transport: { stop: () => {}, state: TRANSPORT_STOPPED } };
      const spy = jest.spyOn(Tone.Transport, "stop");

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      Transport.stop();

      expect(spy).toHaveBeenCalled();
      expect(Transport.state).toBe(TRANSPORT_STOPPED);
    });

    it("should get the default BPM value", () => {
      const Tone = { Transport: { bpm: DEFAULT_BPM_VALUE } };

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      expect(Transport.bpm).toBe(DEFAULT_BPM_VALUE);
    });

    it("should set a BPM value", () => {
      const Tone = { Transport: { bpm: DEFAULT_BPM_VALUE } };

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const updatedBPMValue = 92;
      Transport.bpm = updatedBPMValue;

      expect(Transport.bpm).toBe(updatedBPMValue);
    });

    it("should get the default Swing value", () => {
      const Tone = { Transport: { swing: DEFAULT_SWING_VALUE } };

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      expect(Transport.swing).toBe(DEFAULT_SWING_VALUE);
    });

    it("should set a Swing value", () => {
      const Tone = { Transport: { swing: DEFAULT_SWING_VALUE } };

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const updatedSwingValue = 57;
      Transport.swing = updatedSwingValue;

      expect(Transport.swing).toBe(updatedSwingValue);
    });

    it("should get the default Swing subdivision", () => {
      const Tone = {
        Transport: { swingSubdivision: DEFAULT_SWING_SUBDIVISION_VALUE }
      };

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      expect(Transport.swingSubdivision).toBe(DEFAULT_SWING_SUBDIVISION_VALUE);
    });

    it("should throw if setting an invalid swing subdivision", () => {
      const Tone = {
        Transport: { swingSubdivision: DEFAULT_SWING_SUBDIVISION_VALUE }
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
        Transport: { swingSubdivision: DEFAULT_SWING_SUBDIVISION_VALUE }
      };

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const updatedSwingSubdivisionValue = 16;
      Transport.swingSubdivision = updatedSwingSubdivisionValue;

      expect(Transport.swingSubdivision).toBe(updatedSwingSubdivisionValue);
    });

    it("should get the default time signature", () => {
      const Tone = {
        Transport: { timeSignature: DEFAULT_TIME_SIGNATURE_VALUE }
      };

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      expect(Transport.timeSignature).toBe(DEFAULT_TIME_SIGNATURE_VALUE);
    });

    it("should throw if setting an invalid time signature", () => {
      const Tone = {
        Transport: { timeSignature: DEFAULT_TIME_SIGNATURE_VALUE }
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
        Transport: { timeSignature: DEFAULT_TIME_SIGNATURE_VALUE }
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
        Transport: { timeSignature: DEFAULT_TIME_SIGNATURE_VALUE }
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
        Transport: { timeSignature: DEFAULT_TIME_SIGNATURE_VALUE }
      };

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const updatedTimeSignatureValue = [5, 4];
      Transport.timeSignature = updatedTimeSignatureValue;

      expect(Transport.timeSignature).toBe(updatedTimeSignatureValue);
    });
  });
});

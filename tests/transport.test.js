import { Transport, constants, ToneTransportProvider } from "../src";
const {
  TRANSPORT_STARTED,
  TRANSPORT_STOPPED,
  DEFAULT_BPM_VALUE,
  DEFAULT_SWING_VALUE
} = constants;

describe("Transport", () => {
  afterEach(() => {
    Transport.provider = null;
  });

  describe("When the provider is not set", () => {
    it("should throw if no provider is set", () => {
      const wrapper = () => {
        return Transport.start();
      };

      expect(wrapper).toThrow();
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
  });
});

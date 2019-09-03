import { Transport, constants, ToneTransportProvider } from "../src";
const { TRANSPORT_STARTED, TRANSPORT_STOPPED } = constants;

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
      const Tone = { start: () => {}, state: TRANSPORT_STARTED };
      const spy = jest.spyOn(Tone, "start");

      const provider = new ToneTransportProvider(Tone);

      Transport.provider = provider;

      Transport.start();

      expect(spy).toHaveBeenCalled();
      expect(Transport.state).toBe(TRANSPORT_STARTED);
    });

    it("should stop the Transport", () => {
      const Tone = { stop: () => {}, state: TRANSPORT_STOPPED };
      const spy = jest.spyOn(Tone, "stop");

      const provider = new ToneTransportProvider(Tone);

      Transport.provider = provider;

      Transport.stop();

      expect(spy).toHaveBeenCalled();
      expect(Transport.state).toBe(TRANSPORT_STOPPED);
    });
  });
});

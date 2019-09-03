import { Transport, constants, ToneTransportProvider } from "../src";
const { TRANSPORT_STARTED } = constants;

describe("Transport", () => {
  afterEach(() => {
    Transport.provider = null;
  });

  it("should throw if no provider is set", () => {
    const wrapper = () => {
      return Transport.start();
    };

    expect(wrapper).toThrow();
  });

  it("should start the Transport when the provider is set", () => {
    const Tone = { start: () => {}, state: TRANSPORT_STARTED };
    const startSpy = jest.spyOn(Tone, "start");

    const provider = new ToneTransportProvider(Tone);

    Transport.provider = provider;

    Transport.start();

    expect(startSpy).toHaveBeenCalled();
    expect(Transport.state).toBe(TRANSPORT_STARTED);
  });
});

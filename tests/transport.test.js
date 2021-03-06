import { Transport, constants, ToneTransportProvider } from "../src";
const {
  TRANSPORT_STARTED,
  TRANSPORT_STOPPED,
  DEFAULT_BPM_VALUE,
  DEFAULT_SWING_VALUE,
  DEFAULT_SWING_SUBDIVISION_VALUE,
  DEFAULT_TIME_SIGNATURE_VALUE,
  MIN_TICKS,
  MAX_TICKS,
  PPQN
} = constants;

let mockToneTransport;
let Tone;

const isValidTickValue = ticks => {
  return ticks >= MIN_TICKS && ticks <= MAX_TICKS;
};

describe("Transport", () => {
  beforeEach(() => {
    mockToneTransport = {
      start: () => {
        Tone.Transport.state = TRANSPORT_STARTED;
      },
      stop: () => {
        Tone.Transport.state = TRANSPORT_STOPPED;
      },
      state: TRANSPORT_STOPPED,
      bpm: { value: DEFAULT_BPM_VALUE },
      swing: DEFAULT_SWING_VALUE,
      swingSubdivision: DEFAULT_SWING_SUBDIVISION_VALUE,
      timeSignature: DEFAULT_TIME_SIGNATURE_VALUE,
      scheduleRepeat: () => {}
    };

    Tone = {
      Transport: { ...mockToneTransport }
    };
  });

  afterEach(() => {
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
      const spy = jest.spyOn(Tone.Transport, "start");

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      Transport.start();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(Transport.state).toBe(TRANSPORT_STARTED);
    });

    it("should not start the Transport if its already started", () => {
      const spy = jest.spyOn(Tone.Transport, "start");

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      Transport.start();
      Transport.start();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(Transport.state).toBe(TRANSPORT_STARTED);
    });

    it("should stop the Transport", () => {
      const spy = jest.spyOn(Tone.Transport, "stop");

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      Transport.start();
      Transport.stop();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(Transport.state).toBe(TRANSPORT_STOPPED);
    });

    it("should not stop the Transport if its already stopped", () => {
      const spy = jest.spyOn(Tone.Transport, "stop");

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      Transport.start();
      Transport.stop();
      Transport.stop();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(Transport.state).toBe(TRANSPORT_STOPPED);
    });

    it("should get the default BPM value", () => {
      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      expect(Transport.bpm).toBe(DEFAULT_BPM_VALUE);
    });

    it("should set a BPM value", () => {
      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const updatedBPMValue = 92;
      Transport.bpm = updatedBPMValue;

      expect(Transport.bpm).toBe(updatedBPMValue);
    });

    it("should get the default Swing value", () => {
      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      expect(Transport.swing).toBe(DEFAULT_SWING_VALUE);
    });

    it("should set a Swing value", () => {
      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const updatedSwingValue = 57;
      Transport.swing = updatedSwingValue;

      expect(Transport.swing).toBe(updatedSwingValue);
    });

    it("should get the default Swing subdivision", () => {
      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      expect(Transport.swingSubdivision).toBe(DEFAULT_SWING_SUBDIVISION_VALUE);
    });

    it("should throw if setting an invalid swing subdivision", () => {
      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const wrapper = () => {
        Transport.swingSubdivision = 24;
      };

      expect(wrapper).toThrow("Invalid subdivision value");
    });

    it("should set a valid swing subdivision", () => {
      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const updatedSwingSubdivisionValue = 16;
      Transport.swingSubdivision = updatedSwingSubdivisionValue;

      expect(Transport.swingSubdivision).toBe(updatedSwingSubdivisionValue);
    });

    it("should get the default time signature", () => {
      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      expect(Transport.timeSignature).toBe(DEFAULT_TIME_SIGNATURE_VALUE);
    });

    it("should throw if setting an invalid time signature", () => {
      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const wrapper = () => {
        Transport.timeSignature = [4, 7];
      };

      expect(wrapper).toThrow("Invalid time signature");
    });

    it("should throw if time signature if not an array", () => {
      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const wrapper = () => {
        Transport.timeSignature = 4;
      };

      expect(wrapper).toThrow(
        "Time signature must an array of 2 positions, ex: [4, 4]"
      );
    });

    it("should throw if time signature if not an array of 2 positions", () => {
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
      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const updatedTimeSignatureValue = [5, 4];
      Transport.timeSignature = updatedTimeSignatureValue;

      expect(Transport.timeSignature).toEqual(updatedTimeSignatureValue);
    });

    it("should increment the tick count when ticks", () => {
      const spy = jest.spyOn(Tone.Transport, "scheduleRepeat");

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      Transport.start();
      provider._tickHandler();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(Transport.ticks).toBe(1);
    });

    it("should get the current tick value within the min & max ticks range", () => {
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
      const spy = jest.spyOn(Tone.Transport, "scheduleRepeat");

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      expect(Transport.beats).toBe(0);

      Transport.start();
      for (let index = 0; index < PPQN; index++) {
        provider._tickHandler();
      }

      expect(spy).toHaveBeenCalledTimes(1);
      expect(Transport.beats).toBe(1);
    });

    it("should increment the beats count and return a value not greater than timeSignature[beats]", () => {
      const spy = jest.spyOn(Tone.Transport, "scheduleRepeat");

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      expect(Transport.beats).toBe(0);

      Transport.start();
      for (let index = 0; index < PPQN * 5; index++) {
        provider._tickHandler();
      }

      expect(spy).toHaveBeenCalledTimes(1);
      expect(Transport.beats).toBe(1);
    });

    it("should increment the bars count when beats complete a round", () => {
      const spy = jest.spyOn(Tone.Transport, "scheduleRepeat");

      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      expect(Transport.bars).toBe(0);

      Transport.start();
      for (let index = 0; index < PPQN * 5; index++) {
        provider._tickHandler();
      }

      expect(spy).toHaveBeenCalledTimes(1);
      expect(Transport.bars).toBe(1);
    });

    it("should emit a tick event", () => {
      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const eventHandler = jest.fn(x => x);

      Transport.on("tick", eventHandler);

      expect(Transport.ticks).toBe(0);

      // tick
      provider._tickHandler();

      expect(eventHandler).toHaveBeenCalledTimes(1);
      expect(eventHandler).toHaveBeenCalledWith({ ticks: 1, totalTicks: 1 });
    });

    it("should emit a beat event", () => {
      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const eventHandler = jest.fn(x => x);

      Transport.on("beat", eventHandler);

      expect(Transport.ticks).toBe(0);

      // beat
      for (let index = 0; index < PPQN * 1; index++) {
        provider._tickHandler();
      }

      expect(eventHandler).toHaveBeenCalledTimes(1);
      expect(eventHandler).toHaveBeenCalledWith({ beats: 1, totalBeats: 1 });
    });

    it("should emit a bar event", () => {
      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const eventHandler = jest.fn(x => x);

      Transport.on("bar", eventHandler);

      expect(Transport.ticks).toBe(0);

      // beat
      for (let index = 0; index < PPQN * 4; index++) {
        provider._tickHandler();
      }

      expect(eventHandler).toHaveBeenCalledTimes(1);
      expect(eventHandler).toHaveBeenCalledWith({ bars: 1, totalBars: 1 });
    });

    it("should emit a tick, beat, bar events on Transport.start()", () => {
      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const eventHandler = jest.fn(x => x);

      Transport.on("tick", eventHandler);
      Transport.on("beat", eventHandler);
      Transport.on("bar", eventHandler);

      Transport.start();

      expect(eventHandler).toHaveBeenCalledTimes(3);
      expect(eventHandler.mock.results[0].value).toBe(-1);
      expect(eventHandler.mock.results[1].value).toBe(-1);
      expect(eventHandler.mock.results[2].value).toBe(-1);
    });

    it("should emit a timeSignature event when changin the time signature", () => {
      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const eventHandler = jest.fn(x => x);

      Transport.on("timeSignature", eventHandler);

      Transport.timeSignature = [2, 4];

      expect(eventHandler).toHaveBeenCalledTimes(1);
    });

    it("should emit a start event when Transport starts", () => {
      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const eventHandler = jest.fn(x => x);

      Transport.on("start", eventHandler);

      Transport.start();

      expect(eventHandler).toHaveBeenCalledTimes(1);
    });

    it("should emit a stop event when Transport stops", () => {
      const provider = new ToneTransportProvider(Tone);
      Transport.provider = provider;

      const eventHandler = jest.fn(x => x);

      Transport.on("stop", eventHandler);

      Transport.start();
      Transport.stop();

      expect(eventHandler).toHaveBeenCalledTimes(1);
    });
  });
});

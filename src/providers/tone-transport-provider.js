import EventEmmiter from "events";

import constants from "../constants";
const { DEFAULT_TIME_SIGNATURE_VALUE, PPQN } = constants;

class ToneTransportProvider extends EventEmmiter {
  constructor(Tone) {
    super();
    this.engine = Tone;
    this._timeSignature = DEFAULT_TIME_SIGNATURE_VALUE;
    this._ticks = 0;
    this._beats = 0;
    this._bars = 0;

    Tone.Transport.scheduleRepeat(this._tickHandler, "1i");
  }

  get state() {
    return this.engine.Transport.state;
  }

  get bpm() {
    return this.engine.Transport.bpm.value;
  }

  set bpm(bpm) {
    this.engine.Transport.bpm.value = bpm;
  }

  get swing() {
    return Math.round(this.engine.Transport.swing * 100);
  }

  set swing(swing) {
    this.engine.Transport.swing = swing / 100;
  }

  get swingSubdivision() {
    return parseInt(this.engine.Transport.swingSubdivision, 10);
  }

  set swingSubdivision(swingSubdivision) {
    const validSubdivisions = [8, 16];

    if (!validSubdivisions.includes(swingSubdivision)) {
      throw new Error("Invalid subdivision value");
    }

    this.engine.Transport.swingSubdivision = `${swingSubdivision}n`;
  }

  get timeSignature() {
    return this._timeSignature;
  }

  set timeSignature(val) {
    const timeSignature = [];

    (Array.isArray(val) ? val : [val]).forEach(v => {
      timeSignature.push(parseInt(v, 10));
    });

    this._validateTimeSignature(timeSignature);
    this._timeSignature = timeSignature;
    this.engine.Transport.timeSignature = timeSignature;
    this.emit("timeSignature", timeSignature);
  }

  get ticks() {
    return this._ticks % PPQN;
  }

  get beats() {
    return this._beats % this.timeSignature[0];
  }

  get bars() {
    return this._bars % this.timeSignature[1];
  }

  get pulsesPerBeat() {
    return PPQN / (this._timeSignature[1] / 4);
  }

  start() {
    this.engine.Transport.start();
    this.emit("start");
    this._emitCounters();
  }

  stop() {
    this.engine.Transport.stop();
    this.emit("stop");
    this._resetCounters();
  }

  _validateTimeSignature(timeSignature) {
    const validBars = [4, 8];
    if (timeSignature.length !== 2) {
      throw new Error(
        "Time signature must an array of 2 positions, ex: [4, 4]"
      );
    }

    if (!validBars.includes(timeSignature[1])) {
      throw new Error("Invalid time signature");
    }
  }

  _tickHandler = () => {
    this._ticks += 1;

    if (this._ticks % this.pulsesPerBeat === 0) {
      this._beats += 1;

      if (this._beats % this.timeSignature[0] === 0) {
        this._bars += 1;
        this.emit("bar", {
          bars: this.bars,
          totalBars: this._bars
        });
      }

      this.emit("beat", {
        beats: this.beats,
        totalBeats: this._beats
      });
    }

    this.emit("tick", {
      ticks: this.ticks,
      totalTicks: this._ticks
    });
  };

  _emitCounters() {
    this.emit("bar", -1);
    this.emit("beat", -1);
    this.emit("tick", -1);
  }

  _resetCounters() {
    this._ticks = 0;
    this._beats = 0;
    this._bars = 0;
  }
}

export default ToneTransportProvider;

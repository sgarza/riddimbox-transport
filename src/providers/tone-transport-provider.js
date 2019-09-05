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

  set timeSignature(timeSignature) {
    this._validateTimeSignature(timeSignature);
    this._timeSignature = timeSignature;
    this.engine.Transport.timeSignature = timeSignature;
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

  start() {
    this.engine.Transport.start();
    this.emit("tick", this.ticks);
    this.emit("beat", this.beats);
    this.emit("bar", this.bars);
  }

  stop() {
    this.engine.Transport.stop();
  }

  _validateTimeSignature(timeSignature) {
    const validBars = [4, 8];
    if (!Array.isArray(timeSignature)) {
      throw new Error("Time signature must an array, ex: [4, 4]");
    }

    if (timeSignature.length !== 2) {
      throw new Error(
        "Time signature must an array of 2 positions, ex: [4, 4]"
      );
    }

    if (!validBars.includes(timeSignature[1])) {
      throw new Error("Invalid time signature");
    }
  }

  _tickHandler() {
    this._ticks += 1;
    this.emit("tick", this.ticks);

    if (this._ticks % PPQN === 0) {
      this._beats += 1;
      this.emit("beat", this.beats);

      if (this._beats % this.timeSignature[0] === 0) {
        this._bars += 1;
        this.emit("bar", this.bars);
      }
    }
  }
}

export default ToneTransportProvider;

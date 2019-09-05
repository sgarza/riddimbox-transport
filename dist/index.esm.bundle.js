/**
 * @riddimbox/transport v0.0.1
 * RiddimBox Transport + Metronome component
 *
 * @author Sergio de la Garza
 * @license MIT
 * @preserve
 */

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var _provider = null;

var Transport =
/*#__PURE__*/
function () {
  function Transport() {
    _classCallCheck(this, Transport);
  }

  _createClass(Transport, null, [{
    key: "on",
    value: function on(event, listener) {
      return Transport.provider.on(event, listener);
    }
  }, {
    key: "start",
    value: function start() {
      Transport.provider.start();
    }
  }, {
    key: "stop",
    value: function stop() {
      Transport.provider.stop();
    }
  }, {
    key: "_throwIfProviderNotSet",
    value: function _throwIfProviderNotSet() {
      if (!_provider) {
        throw new Error("You need to set a provider first. Try with the ToneTransportProvider class.");
      }
    }
  }, {
    key: "provider",
    get: function get() {
      Transport._throwIfProviderNotSet();

      return _provider;
    },
    set: function set(provider) {
      _provider = provider;
    }
  }, {
    key: "state",
    get: function get() {
      return Transport.provider.state;
    }
  }, {
    key: "bpm",
    get: function get() {
      return Transport.provider.bpm;
    },
    set: function set(bpm) {
      Transport.provider.bpm = bpm;
    }
  }, {
    key: "swing",
    get: function get() {
      return Transport.provider.swing;
    },
    set: function set(swing) {
      Transport.provider.swing = swing;
    }
  }, {
    key: "swingSubdivision",
    get: function get() {
      return Transport.provider.swingSubdivision;
    },
    set: function set(swingSubdivision) {
      Transport.provider.swingSubdivision = swingSubdivision;
    }
  }, {
    key: "timeSignature",
    get: function get() {
      return Transport.provider.timeSignature;
    },
    set: function set(timeSignature) {
      Transport.provider.timeSignature = timeSignature;
    }
  }, {
    key: "ticks",
    get: function get() {
      return Transport.provider.ticks;
    }
  }, {
    key: "beats",
    get: function get() {
      return Transport.provider.beats;
    }
  }, {
    key: "bars",
    get: function get() {
      return Transport.provider.bars;
    }
  }]);

  return Transport;
}();

var Metronome =
/*#__PURE__*/
function () {
  function Metronome(provider, tapTempo) {
    _classCallCheck(this, Metronome);

    if (!provider) {
      throw new Error("You need to set a provider first. Try with the ToneMetronomeProvider class.");
    }

    if (!tapTempo) {
      throw new Error("tap-tempo library instance must be provided as second argument");
    }

    this.provider = provider;
    this.tapTempo = tapTempo;
    this.tapTempo.on("tempo", this._onTapTempoHandler);
  }

  _createClass(Metronome, [{
    key: "connect",
    value: function connect(audioNode) {
      this.provider.connect(audioNode);
    }
  }, {
    key: "tap",
    value: function tap() {
      this.tapTempo.tap();
    }
  }, {
    key: "_onTapTempoHandler",
    value: function _onTapTempoHandler(tempo) {
      this.provider.transport.bpm = parseInt(tempo, 10);
    }
  }]);

  return Metronome;
}();

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var eventemitter3 = createCommonjsModule(function (module) {

var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
{
  module.exports = EventEmitter;
}
});

var constants = {
  TRANSPORT_STARTED: "started",
  TRANSPORT_STOPPED: "stopped",
  DEFAULT_BPM_VALUE: 120,
  DEFAULT_SWING_VALUE: 0,
  DEFAULT_SWING_SUBDIVISION_VALUE: 8,
  DEFAULT_TIME_SIGNATURE_VALUE: [4, 4],
  MIN_TICKS: 0,
  MAX_TICKS: 191,
  PPQN: 192
};

var DEFAULT_TIME_SIGNATURE_VALUE = constants.DEFAULT_TIME_SIGNATURE_VALUE,
    PPQN = constants.PPQN;

var ToneTransportProvider =
/*#__PURE__*/
function (_EventEmmiter) {
  _inherits(ToneTransportProvider, _EventEmmiter);

  function ToneTransportProvider(Tone) {
    var _this;

    _classCallCheck(this, ToneTransportProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ToneTransportProvider).call(this));
    _this.engine = Tone;
    _this._timeSignature = DEFAULT_TIME_SIGNATURE_VALUE;
    _this._ticks = 0;
    _this._beats = 0;
    _this._bars = 0;
    Tone.Transport.scheduleRepeat(_this._tickHandler, "1i");
    return _this;
  }

  _createClass(ToneTransportProvider, [{
    key: "start",
    value: function start() {
      this.engine.Transport.start();
      this.emit("tick", this.ticks);
      this.emit("beat", this.beats);
      this.emit("bar", this.bars);
    }
  }, {
    key: "stop",
    value: function stop() {
      this.engine.Transport.stop();
    }
  }, {
    key: "_validateTimeSignature",
    value: function _validateTimeSignature(timeSignature) {
      var validBars = [4, 8];

      if (!Array.isArray(timeSignature)) {
        throw new Error("Time signature must an array, ex: [4, 4]");
      }

      if (timeSignature.length !== 2) {
        throw new Error("Time signature must an array of 2 positions, ex: [4, 4]");
      }

      if (!validBars.includes(timeSignature[1])) {
        throw new Error("Invalid time signature");
      }
    }
  }, {
    key: "_tickHandler",
    value: function _tickHandler() {
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
  }, {
    key: "state",
    get: function get() {
      return this.engine.Transport.state;
    }
  }, {
    key: "bpm",
    get: function get() {
      return this.engine.Transport.bpm.value;
    },
    set: function set(bpm) {
      this.engine.Transport.bpm.value = bpm;
    }
  }, {
    key: "swing",
    get: function get() {
      return Math.round(this.engine.Transport.swing * 100);
    },
    set: function set(swing) {
      this.engine.Transport.swing = swing / 100;
    }
  }, {
    key: "swingSubdivision",
    get: function get() {
      return parseInt(this.engine.Transport.swingSubdivision, 10);
    },
    set: function set(swingSubdivision) {
      var validSubdivisions = [8, 16];

      if (!validSubdivisions.includes(swingSubdivision)) {
        throw new Error("Invalid subdivision value");
      }

      this.engine.Transport.swingSubdivision = "".concat(swingSubdivision, "n");
    }
  }, {
    key: "timeSignature",
    get: function get() {
      return this._timeSignature;
    },
    set: function set(timeSignature) {
      this._validateTimeSignature(timeSignature);

      this._timeSignature = timeSignature;
      this.engine.Transport.timeSignature = timeSignature;
    }
  }, {
    key: "ticks",
    get: function get() {
      return this._ticks % PPQN;
    }
  }, {
    key: "beats",
    get: function get() {
      return this._beats % this.timeSignature[0];
    }
  }, {
    key: "bars",
    get: function get() {
      return this._bars % this.timeSignature[1];
    }
  }]);

  return ToneTransportProvider;
}(eventemitter3);

var ToneMetronomeProvider =
/*#__PURE__*/
function () {
  function ToneMetronomeProvider(Transport) {
    _classCallCheck(this, ToneMetronomeProvider);

    this.transport = Transport;
    this.engine = Transport.provider.engine;
    this.synth = new this.engine.Synth({
      oscillator: {
        type: "pwm",
        modulationFrequency: 0.2
      },
      envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0.05,
        release: 0.05
      }
    });
    var repeatEachBarSubdivision = "".concat(this.transport.timeSignature[1], "n");
    this.engine.Transport.scheduleRepeat(this._repeatHandler, repeatEachBarSubdivision);
  }

  _createClass(ToneMetronomeProvider, [{
    key: "connect",
    value: function connect(audioNode) {
      this.synth.connect(audioNode);
    }
  }, {
    key: "_repeatHandler",
    value: function _repeatHandler(time) {
      if (this.transport.beats === 0) {
        this.synth.triggerAttackRelease("G4", "16n", time);
      } else {
        this.synth.triggerAttackRelease("C4", "16n", time);
      }
    }
  }]);

  return ToneMetronomeProvider;
}();

export { Metronome, ToneMetronomeProvider, ToneTransportProvider, Transport, constants };
//# sourceMappingURL=index.esm.bundle.js.map

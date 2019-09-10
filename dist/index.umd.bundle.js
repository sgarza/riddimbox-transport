/**
 * @riddimbox/transport v0.0.1
 * RiddimBox Transport + Metronome component
 *
 * @author Sergio de la Garza
 * @license MIT
 * @preserve
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.RiddimBox = global.RiddimBox || {}));
}(this, function (exports) { 'use strict';

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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
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
        if (!Transport._provider) {
          throw new Error("You need to set a provider first. Try with the ToneTransportProvider class.");
        }
      }
    }, {
      key: "provider",
      get: function get() {
        Transport._throwIfProviderNotSet();

        return Transport._provider;
      },
      set: function set(provider) {
        Transport._provider = provider;
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

  _defineProperty(Transport, "_provider", null);

  var domain;

  // This constructor is used to store event handlers. Instantiating this is
  // faster than explicitly calling `Object.create(null)` to get a "clean" empty
  // object (tested with v8 v4.9).
  function EventHandlers() {}
  EventHandlers.prototype = Object.create(null);

  function EventEmitter() {
    EventEmitter.init.call(this);
  }

  // nodejs oddity
  // require('events') === require('events').EventEmitter
  EventEmitter.EventEmitter = EventEmitter;

  EventEmitter.usingDomains = false;

  EventEmitter.prototype.domain = undefined;
  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._maxListeners = undefined;

  // By default EventEmitters will print a warning if more than 10 listeners are
  // added to it. This is a useful default which helps finding memory leaks.
  EventEmitter.defaultMaxListeners = 10;

  EventEmitter.init = function() {
    this.domain = null;
    if (EventEmitter.usingDomains) {
      // if there is an active domain, then attach to it.
      if (domain.active && !(this instanceof domain.Domain)) ;
    }

    if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
      this._events = new EventHandlers();
      this._eventsCount = 0;
    }

    this._maxListeners = this._maxListeners || undefined;
  };

  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.
  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || isNaN(n))
      throw new TypeError('"n" argument must be a positive number');
    this._maxListeners = n;
    return this;
  };

  function $getMaxListeners(that) {
    if (that._maxListeners === undefined)
      return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }

  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return $getMaxListeners(this);
  };

  // These standalone emit* functions are used to optimize calling of event
  // handlers for fast cases because emit() itself often has a variable number of
  // arguments and can be deoptimized because of that. These functions always have
  // the same number of arguments and thus do not get deoptimized, so the code
  // inside them can execute faster.
  function emitNone(handler, isFn, self) {
    if (isFn)
      handler.call(self);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].call(self);
    }
  }
  function emitOne(handler, isFn, self, arg1) {
    if (isFn)
      handler.call(self, arg1);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].call(self, arg1);
    }
  }
  function emitTwo(handler, isFn, self, arg1, arg2) {
    if (isFn)
      handler.call(self, arg1, arg2);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].call(self, arg1, arg2);
    }
  }
  function emitThree(handler, isFn, self, arg1, arg2, arg3) {
    if (isFn)
      handler.call(self, arg1, arg2, arg3);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].call(self, arg1, arg2, arg3);
    }
  }

  function emitMany(handler, isFn, self, args) {
    if (isFn)
      handler.apply(self, args);
    else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        listeners[i].apply(self, args);
    }
  }

  EventEmitter.prototype.emit = function emit(type) {
    var er, handler, len, args, i, events, domain;
    var doError = (type === 'error');

    events = this._events;
    if (events)
      doError = (doError && events.error == null);
    else if (!doError)
      return false;

    domain = this.domain;

    // If there is no 'error' event listener then throw.
    if (doError) {
      er = arguments[1];
      if (domain) {
        if (!er)
          er = new Error('Uncaught, unspecified "error" event');
        er.domainEmitter = this;
        er.domain = domain;
        er.domainThrown = false;
        domain.emit('error', er);
      } else if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
      return false;
    }

    handler = events[type];

    if (!handler)
      return false;

    var isFn = typeof handler === 'function';
    len = arguments.length;
    switch (len) {
      // fast cases
      case 1:
        emitNone(handler, isFn, this);
        break;
      case 2:
        emitOne(handler, isFn, this, arguments[1]);
        break;
      case 3:
        emitTwo(handler, isFn, this, arguments[1], arguments[2]);
        break;
      case 4:
        emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
        break;
      // slower
      default:
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        emitMany(handler, isFn, this, args);
    }

    return true;
  };

  function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;

    if (typeof listener !== 'function')
      throw new TypeError('"listener" argument must be a function');

    events = target._events;
    if (!events) {
      events = target._events = new EventHandlers();
      target._eventsCount = 0;
    } else {
      // To avoid recursion in the case that type === "newListener"! Before
      // adding it to the listeners, first emit "newListener".
      if (events.newListener) {
        target.emit('newListener', type,
                    listener.listener ? listener.listener : listener);

        // Re-assign `events` because a newListener handler could have caused the
        // this._events to be assigned to a new object
        events = target._events;
      }
      existing = events[type];
    }

    if (!existing) {
      // Optimize the case of one listener. Don't need the extra array object.
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === 'function') {
        // Adding the second element, need to change to array.
        existing = events[type] = prepend ? [listener, existing] :
                                            [existing, listener];
      } else {
        // If we've already got an array, just append.
        if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
      }

      // Check for listener leak
      if (!existing.warned) {
        m = $getMaxListeners(target);
        if (m && m > 0 && existing.length > m) {
          existing.warned = true;
          var w = new Error('Possible EventEmitter memory leak detected. ' +
                              existing.length + ' ' + type + ' listeners added. ' +
                              'Use emitter.setMaxListeners() to increase limit');
          w.name = 'MaxListenersExceededWarning';
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          emitWarning(w);
        }
      }
    }

    return target;
  }
  function emitWarning(e) {
    typeof console.warn === 'function' ? console.warn(e) : console.log(e);
  }
  EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };

  EventEmitter.prototype.on = EventEmitter.prototype.addListener;

  EventEmitter.prototype.prependListener =
      function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
      };

  function _onceWrap(target, type, listener) {
    var fired = false;
    function g() {
      target.removeListener(type, g);
      if (!fired) {
        fired = true;
        listener.apply(target, arguments);
      }
    }
    g.listener = listener;
    return g;
  }

  EventEmitter.prototype.once = function once(type, listener) {
    if (typeof listener !== 'function')
      throw new TypeError('"listener" argument must be a function');
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };

  EventEmitter.prototype.prependOnceListener =
      function prependOnceListener(type, listener) {
        if (typeof listener !== 'function')
          throw new TypeError('"listener" argument must be a function');
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
      };

  // emits a 'removeListener' event iff the listener was removed
  EventEmitter.prototype.removeListener =
      function removeListener(type, listener) {
        var list, events, position, i, originalListener;

        if (typeof listener !== 'function')
          throw new TypeError('"listener" argument must be a function');

        events = this._events;
        if (!events)
          return this;

        list = events[type];
        if (!list)
          return this;

        if (list === listener || (list.listener && list.listener === listener)) {
          if (--this._eventsCount === 0)
            this._events = new EventHandlers();
          else {
            delete events[type];
            if (events.removeListener)
              this.emit('removeListener', type, list.listener || listener);
          }
        } else if (typeof list !== 'function') {
          position = -1;

          for (i = list.length; i-- > 0;) {
            if (list[i] === listener ||
                (list[i].listener && list[i].listener === listener)) {
              originalListener = list[i].listener;
              position = i;
              break;
            }
          }

          if (position < 0)
            return this;

          if (list.length === 1) {
            list[0] = undefined;
            if (--this._eventsCount === 0) {
              this._events = new EventHandlers();
              return this;
            } else {
              delete events[type];
            }
          } else {
            spliceOne(list, position);
          }

          if (events.removeListener)
            this.emit('removeListener', type, originalListener || listener);
        }

        return this;
      };

  EventEmitter.prototype.removeAllListeners =
      function removeAllListeners(type) {
        var listeners, events;

        events = this._events;
        if (!events)
          return this;

        // not listening for removeListener, no need to emit
        if (!events.removeListener) {
          if (arguments.length === 0) {
            this._events = new EventHandlers();
            this._eventsCount = 0;
          } else if (events[type]) {
            if (--this._eventsCount === 0)
              this._events = new EventHandlers();
            else
              delete events[type];
          }
          return this;
        }

        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
          var keys = Object.keys(events);
          for (var i = 0, key; i < keys.length; ++i) {
            key = keys[i];
            if (key === 'removeListener') continue;
            this.removeAllListeners(key);
          }
          this.removeAllListeners('removeListener');
          this._events = new EventHandlers();
          this._eventsCount = 0;
          return this;
        }

        listeners = events[type];

        if (typeof listeners === 'function') {
          this.removeListener(type, listeners);
        } else if (listeners) {
          // LIFO order
          do {
            this.removeListener(type, listeners[listeners.length - 1]);
          } while (listeners[0]);
        }

        return this;
      };

  EventEmitter.prototype.listeners = function listeners(type) {
    var evlistener;
    var ret;
    var events = this._events;

    if (!events)
      ret = [];
    else {
      evlistener = events[type];
      if (!evlistener)
        ret = [];
      else if (typeof evlistener === 'function')
        ret = [evlistener.listener || evlistener];
      else
        ret = unwrapListeners(evlistener);
    }

    return ret;
  };

  EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
      return emitter.listenerCount(type);
    } else {
      return listenerCount.call(emitter, type);
    }
  };

  EventEmitter.prototype.listenerCount = listenerCount;
  function listenerCount(type) {
    var events = this._events;

    if (events) {
      var evlistener = events[type];

      if (typeof evlistener === 'function') {
        return 1;
      } else if (evlistener) {
        return evlistener.length;
      }
    }

    return 0;
  }

  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
  };

  // About 1.5x faster than the two-arg version of Array#splice().
  function spliceOne(list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
      list[i] = list[k];
    list.pop();
  }

  function arrayClone(arr, i) {
    var copy = new Array(i);
    while (i--)
      copy[i] = arr[i];
    return copy;
  }

  function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }
    return ret;
  }

  var EventEmitter$1 = EventEmitter.EventEmitter;

  var tapTempo = function(){
    var tapTempo = new EventEmitter$1();

    var timeout = 2000;

    var times = [];
    var lastTime = null;
    var lastDifference = null;

    tapTempo.tap = function(){
      var time = Date.now();
      if (lastTime){
        lastDifference = time - lastTime;
        times.push(lastDifference);
        refresh();
      }
      lastTime = time;
      beginTimeout();
      tapTempo.emit('tap');
    };

    function refresh(){
      if (times.length > 2){
        var average = times.reduce(function(result, t){ return result += t }) / times.length;
        var bpm = (1 / (average / 1000)) * 60;
        tapTempo.emit('tempo', bpm);
      }
    }

    var timer = null;
    function beginTimeout(){
      clearTimeout(timer);
      timer = setTimeout(function(){
        times = [lastDifference];
        lastTime = null;
      }, timeout);
    }

    return tapTempo
  };

  var tapTempo$1 = tapTempo();

  var Metronome =
  /*#__PURE__*/
  function () {
    function Metronome(provider) {
      _classCallCheck(this, Metronome);

      if (!provider) {
        throw new Error("You need to set a provider first. Try with the ToneMetronomeProvider class.");
      }

      this.provider = provider;
      this.tapTempo = tapTempo$1;
      this.tapTempo.on("tempo", this._onTapTempoHandler);
    }

    _createClass(Metronome, [{
      key: "connect",
      value: function connect(audioNode) {
        this.provider.connect(audioNode);
      }
    }, {
      key: "disable",
      value: function disable() {
        this.provider.disable();
      }
    }, {
      key: "enable",
      value: function enable() {
        this.provider.enable();
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
    }, {
      key: "isEnabled",
      get: function get() {
        return this.provider.isEnabled;
      }
    }]);

    return Metronome;
  }();

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

      _defineProperty(_assertThisInitialized(_this), "_tickHandler", function () {
        _this._ticks += 1;

        if (_this._ticks % _this.pulsesPerBeat === 0) {
          _this._beats += 1;

          if (_this._beats % _this.timeSignature[0] === 0) {
            _this._bars += 1;

            _this.emit("bar", _this.bars);
          }

          _this.emit("beat", _this.beats);
        }

        _this.emit("tick", _this.ticks);
      });

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

        this._emitCounters();
      }
    }, {
      key: "stop",
      value: function stop() {
        this.engine.Transport.stop();

        this._resetCounters();
      }
    }, {
      key: "_validateTimeSignature",
      value: function _validateTimeSignature(timeSignature) {
        var validBars = [4, 8];

        if (timeSignature.length !== 2) {
          throw new Error("Time signature must an array of 2 positions, ex: [4, 4]");
        }

        if (!validBars.includes(timeSignature[1])) {
          throw new Error("Invalid time signature");
        }
      }
    }, {
      key: "_emitCounters",
      value: function _emitCounters() {
        this.emit("bar", this.bars);
        this.emit("beat", this.beats);
        this.emit("tick", this.ticks);
      }
    }, {
      key: "_resetCounters",
      value: function _resetCounters() {
        this._ticks = 0;
        this._beats = 0;
        this._bars = 0;
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
      set: function set(val) {
        var timeSignature = [];
        (Array.isArray(val) ? val : [val]).forEach(function (v) {
          timeSignature.push(parseInt(v, 10));
        });

        this._validateTimeSignature(timeSignature);

        this._timeSignature = timeSignature;
        this.engine.Transport.timeSignature = timeSignature;
        this.emit("timeSignature", timeSignature);
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
    }, {
      key: "pulsesPerBeat",
      get: function get() {
        return PPQN / (this._timeSignature[1] / 4);
      }
    }]);

    return ToneTransportProvider;
  }(EventEmitter);

  var ToneMetronomeProvider =
  /*#__PURE__*/
  function () {
    function ToneMetronomeProvider(Transport) {
      var _this = this;

      _classCallCheck(this, ToneMetronomeProvider);

      _defineProperty(this, "_repeatHandler", function (time) {
        if (!_this._isEnabled) return;

        if (_this.transport.beats === 0) {
          _this.synth.triggerAttackRelease("G4", "16n", time);
        } else {
          _this.synth.triggerAttackRelease("C4", "16n", time);
        }
      });

      _defineProperty(this, "_timeSignatureChange", function () {
        _this.engine.Transport.clear(_this.toneEventID);

        _this._scheduleToneEvent();
      });

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
      this.toneEventID = null;
      this._isEnabled = true;

      this._scheduleToneEvent();

      Transport.on("timeSignature", this._timeSignatureChange);
    }

    _createClass(ToneMetronomeProvider, [{
      key: "connect",
      value: function connect(audioNode) {
        this.synth.connect(audioNode);
      }
    }, {
      key: "disable",
      value: function disable() {
        this._isEnabled = false;
      }
    }, {
      key: "enable",
      value: function enable() {
        this._isEnabled = true;
      }
    }, {
      key: "_scheduleToneEvent",
      value: function _scheduleToneEvent() {
        this.toneEventID = this.engine.Transport.scheduleRepeat(this._repeatHandler, "".concat(this.transport.timeSignature[1], "n"));
      }
    }, {
      key: "isEnabled",
      get: function get() {
        return this._isEnabled;
      }
    }]);

    return ToneMetronomeProvider;
  }();

  exports.Metronome = Metronome;
  exports.ToneMetronomeProvider = ToneMetronomeProvider;
  exports.ToneTransportProvider = ToneTransportProvider;
  exports.Transport = Transport;
  exports.constants = constants;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.bundle.js.map

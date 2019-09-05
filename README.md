# RiddimBox - Transport

WIP: A library that provides an abstraction of a Transport and a Metronome with support for multiple backends, currently it has support for `Tone.js`

## Requirements

This library needs you to provide:

- an instance of https://github.com/livejs/tap-tempo;
- A reference of main `Tone` object from https://github.com/Tonejs/Tone.js

## Usage

### Initialization

```
import Tone from "tone";
import TapTempo from "tap-tempo"
import { Transport, Metronome, ToneTransportProvider, ToneMetronomeProvider } from "@riddimbox-transport";

const tapTempo = TapTempo();
const transportProvider = new ToneTransportProvider(Tone);
Transport.provider = transportProvider;

const metronomeProvider = new ToneMetronomeProvider(Transport);
const metronome = new Metronome(metronomeProvider);

```

## License

[MIT](LICENSE).

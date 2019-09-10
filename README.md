# RiddimBox - Transport

[![Maintainability](https://api.codeclimate.com/v1/badges/160ab9c7c5cf043611d2/maintainability)](https://codeclimate.com/github/sgarza/riddimbox-transport/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/160ab9c7c5cf043611d2/test_coverage)](https://codeclimate.com/github/sgarza/riddimbox-transport/test_coverage)

WIP: A library that provides an abstraction of a Transport and a Metronome with support for multiple backends, currently it has support for `Tone.js`

## Requirements

This library needs you to provide:

- A reference of main `Tone` object from [Tone.js](https://github.com/Tonejs/Tone.js)

## Usage

### Initialization

```javascript
import Tone from "tone";
import {
  Transport,
  Metronome,
  ToneTransportProvider,
  ToneMetronomeProvider
} from "@riddimbox-transport";

const transportProvider = new ToneTransportProvider(Tone);
Transport.provider = transportProvider;

const metronomeProvider = new ToneMetronomeProvider(Transport);
const metronome = new Metronome(metronomeProvider);

metronome.connect(Tone.Master);
```

## Demo

To run a demo just run `npm run demo`

## License

[MIT](LICENSE).

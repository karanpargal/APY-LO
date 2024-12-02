import 'ses';
import '@endo/eventual-send/shim.js';
import { Buffer } from 'buffer';

globalThis.Buffer = Buffer;
// @ts-expect-error - not complete object
globalThis.process = {
  env: { NODE_ENV: import.meta.env.DEV ? 'development' : 'production' },
};

const consoleTaming = import.meta.env.DEV ? 'unsafe' : 'safe';

lockdown({
  errorTaming: 'unsafe',
  overrideTaming: 'severe',
  consoleTaming,
});

Error.stackTraceLimit = Infinity;

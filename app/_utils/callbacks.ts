let callbacks;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const callbacksModule = require('../../build-assets/callbacks.js');
  callbacks = callbacksModule.default;
} catch (e) {
  callbacks = {
    onUpdate: () => {},
  };
}
export default callbacks as {
  onUpdate: () => void;
};

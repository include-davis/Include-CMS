let settings;
try {
  settings = require('../../build-assets/settings.json');
} catch (e) {
  settings = {
    authExpHours: 24,
  };
}
export default settings as {
  authExpHours: number;
};

exports.get = get;

const settings = {
  home: 'launcher'
};

function get(key) {
  return settings[key];
}

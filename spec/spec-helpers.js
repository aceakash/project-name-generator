var isArray = ('isArray' in Array) ?
  Array.isArray :
  function (value) {
    return Object.prototype.toString.call(value) === '[object Array]';
  };

module.exports = {
  isArray: isArray
};




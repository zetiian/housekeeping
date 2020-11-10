// 事件 流程中如果有用户介入，逻辑是不确定的，这时候才需要事件
var cache = {};
function eventsOnce(typeArr, func) {
  if (!typeArr || !typeArr.length) return;
  let onceFunc = (function() {
    let lock = false;
    return function(data) {
      console.log("-----------------", data);
      if (lock) return;
      lock = true;
      func(data);
      offs.forEach(v => v());
    };
  })();
  let offs = typeArr.map(type => {
    return on(type, onceFunc);
  });
  return function() {
    console.log("移除");
    offs.forEach(v => v());
  };
}

function once(type, func) {
  let callback = function(data) {
    func(data);
    off(type, callback);
    console.log(cache);
  };
  return on(type, callback);
}

function on(type, func) {
  if (!cache[type]) cache[type] = [];
  var index = cache[type].indexOf(func);
  if (index == -1) cache[type].push(func);
  return function() {
    console.log("移除");
    off(type, func);
  };
}
function off(type, func) {
  let callbacks = cache[type];
  if (callbacks) {
    var index = callbacks.indexOf(func);
    if (index != -1) callbacks.splice(index, 1);
    if (callbacks.length === 0) {
      delete cache[type];
    }
  }
  return callbacks;
}

function offs(type) {
  delete cache[type];
}

function emit(type, data) {
  if (cache[type]) {
    var cbs = cache[type].concat();
    setTimeout(_ => {
      cbs.forEach(cb => {
        cb(data, type);
        console.log("抛出--------emit--", type, cache);
      });
    });
  }
}
function emitAsync(type, data) {
  if (cache[type]) {
    var cbs = cache[type].concat();
    cbs.forEach(cb => {
      cb(data, type);
      console.log("抛出----------emitAsync-", type, cache);
    });
  }
}
module.exports = {
  on,
  off,
  offs,
  emit,
  emitAsync,
  once,
  eventsOnce
};

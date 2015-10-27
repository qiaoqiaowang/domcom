var renew, _raf;

_raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

exports.requestAnimationFrame = exports.raf = _raf || function(callback) {
  window.setInterval(callback, 1000 / 60);
};

exports.normalizeDomElement = function(domElement) {
  if (typeof domElement === 'string') {
    domElement = document.querySelector(domElement);
  }
  return domElement;
};

exports.getBindProp = function(component) {
  var tagName;
  tagName = component.tagName;
  if (!tagName) {
    throw new Error('trying to bind a Component which is not a Tag');
  } else if (tagName === 'textarea' || tagName === 'select') {
    return 'value';
  } else if (component.attrs.type === 'checkbox') {
    return 'checked';
  } else {
    return 'value';
  }
};

exports.isElement = function(item) {
  if (typeof HTMLElement === "object") {
    return item instanceof HTMLElement;
  } else {
    return item && typeof item === "object" && item !== null && item.nodeType === 1 && typeof item.nodeName === "string";
  }
};

renew = require('./flow/index').renew;

exports.domValue = function(value) {
  var fn;
  if (value == null) {
    return '';
  }
  if (typeof value !== 'function') {
    if (value.then && x["catch"]) {
      fn = react(function() {
        return fn.promiseResult;
      });
      value.then(function(value) {
        fn.promiseResult = value;
        return fn.invalidate();
      })["catch"](function(error) {
        fn.promiseResult = error;
        return fn.invalidate();
      });
      return fn;
    } else {
      return value;
    }
  }
  if (!value.invalidate) {
    return renew(value);
  }
  return value;
};

exports.checkConflictOffspring = function(family, child) {
  var childDcid, dcid;
  childDcid = child.dcid;
  for (dcid in child.family) {
    if (family[dcid]) {
      throw new Error('do not allow to have the same component to be referenced in different location of one List');
    }
    family[dcid] = true;
  }
};
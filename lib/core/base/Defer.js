var Defer, FULFILL, INIT, REJECT, TransformComponent, extend, funcString, intersect, newLine, renew, toComponent, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

toComponent = require('./toComponent');

TransformComponent = require('./TransformComponent');

extend = require('../../extend');

_ref = require('../../util'), funcString = _ref.funcString, newLine = _ref.newLine, intersect = _ref.intersect;

renew = require('../../flow').renew;

INIT = 0;

FULFILL = 1;

REJECT = 2;

module.exports = Defer = (function(_super) {
  __extends(Defer, _super);

  function Defer(promise, fulfill, reject, init) {
    var family;
    this.promise = promise;
    Defer.__super__.constructor.apply(this, arguments);
    this.fulfill = fulfill;
    this.reject = reject || function() {};
    this.init = init && init(promise) || new Nothing();
    this.family = family = intersect([fullfill.family, reject.family, init.family]);
    family[this.dcid] = true;
    this.promiseState = INIT;
    promise.then(function(valu) {
      this.promiseResult = value;
      this.promiseState = FULFILL;
      return this.invalidateTransform();
    })["catch"](function(error) {
      this.promiseResult = error;
      this.promiseState = REJECT;
      return this.invalidateTransform();
    });
    this;
  }

  Defer.prototype.getContentComponent = function() {
    var state;
    if ((state = this.promiseState) === INIT) {
      return init;
    } else if (state === FULFILL) {
      return toComponent(this.fulfill(this.promiseResult, this.promise, this));
    } else {
      return toComponent(this.reject(this.promiseResult, this.promise, this));
    }
  };

  Defer.clone = function() {
    return (new Defer(this.promise, this.fulfill, this.reject, this.init.clone)).copyEventListeners(this);
  };

  Defer.toString = function(indent, addNewLine) {
    if (indent == null) {
      indent = 0;
    }
    if (addNewLine == null) {
      addNewLine = '';
    }
    return newLine('', indent, addNewLine) + '<Defer ' + this.promise + '>' + newLine('', indent, addNewLine) + funcString(this.fulfill) + newLine('', indent, addNewLine) + funcString(this.reject) + this.init.toString(indent + 2, true) + newLine('</Defer>', indent, true);
  };

  Defer;

  return Defer;

})(TransformComponent);

extend(Defer, {
  INIT: INIT,
  FULFILL: FULFILL,
  REJECT: REJECT
});
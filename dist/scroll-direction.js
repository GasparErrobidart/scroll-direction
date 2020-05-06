'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScrollDirection = function () {
  function ScrollDirection(options) {
    _classCallCheck(this, ScrollDirection);

    var _options$target = options.target,
        target = _options$target === undefined ? window : _options$target,
        _options$addClassesTo = options.addClassesTo,
        addClassesTo = _options$addClassesTo === undefined ? 'body' : _options$addClassesTo,
        _options$minInterval = options.minInterval,
        minInterval = _options$minInterval === undefined ? 25 : _options$minInterval;

    this.minInterval = minInterval; // Interval between checks
    this.target = target;
    this.addClassesTo = addClassesTo ? document.querySelector(addClassesTo) : addClassesTo;
    this.last = 0;
    this.lastHeight = null;
    this.direction = '';
    this.watch();
  }

  _createClass(ScrollDirection, [{
    key: 'watch',
    value: function watch() {
      var _this = this;

      var ready = true;
      var restore = function restore() {
        return ready = true;
      };
      this.listener = this.detectDirection.bind(this);
      this.target.addEventListener('touchstart', restore);
      this.target.addEventListener('touchend', restore);
      this.target.addEventListener('touchmove', restore);

      this.target.addEventListener('scroll', function (ev) {

        if (ready) {
          ready = false;
          _this.listener(ev);
          setTimeout(restore, _this.minInterval);
        }
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.target.removeEventListener('scroll', this.listener);
    }
  }, {
    key: 'addClasses',
    value: function addClasses() {
      if (this.addClassesTo && this.direction) {
        var el = this.addClassesTo;
        var right = this.direction;
        var wrong = right == 'down' ? 'up' : 'down';
        el.className = el.className.replace('scroll-direction-' + wrong, '').replace(/\s\s/gi, ' ') + ' scroll-direction-' + right;
      }
    }
  }, {
    key: 'onDirectionChange',
    value: function onDirectionChange() {
      this.addClasses();
      this.target.dispatchEvent(new CustomEvent('scrollDirectionChange', { detail: this }));
    }
  }, {
    key: 'detectDirection',
    value: function detectDirection(ev) {
      var scrolled = this.target.scrollY || this.target.scrollTop || 0;
      var height = this.target == window ? document.body.clientHeight : this.target.clientHeight;
      var heightDiff = 0;

      // If document height changed, adjust scroll value
      if (typeof this.lastHeight != "number") this.lastHeight = height;
      if (this.lastHeight != height) {
        heightDiff = height - this.lastHeight;
      }

      var newDirection = this.direction;

      if (scrolled > this.last + heightDiff) {
        newDirection = "down";
      } else if (scrolled < this.last + heightDiff) {
        newDirection = "up";
      }

      this.last = scrolled;
      this.lastHeight = height;
      if (this.direction != newDirection) {
        this.direction = newDirection;
        this.onDirectionChange();
      }
    }
  }]);

  return ScrollDirection;
}();
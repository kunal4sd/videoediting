/**
 * videojs-rangeset-buttons
 * @version 1.0.0
 * @author Eduard Crafti @ Mediaobserver
 */
 !(function (e, o) {
    typeof exports === 'object' && typeof module !== 'undefined'
      ? (module.exports = o(require('video.js')))
      : typeof define === 'function' && define.amd
        ? define(['video.js'], o)
        : (e.videojsCutButtons = o(e.videojs))
  })(this, function (e) {
    'use strict'
    var o = function (e, o) {
      if (!(e instanceof o)) { throw new TypeError('Cannot call a class as a function') }
    }
    var t = function (e, o) {
      if (typeof o !== 'function' && o !== null) {
        throw new TypeError(
          'Super expression must either be null or a function, not ' + typeof o
        )
      }(e.prototype = Object.create(o && o.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      })),
      o &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, o)
              : (e.__proto__ = o))
    }
    var n = function (e, o) {
      if (!e) {
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        )
      }
      return !o || (typeof o !== 'object' && typeof o !== 'function') ? e : o
    }
    var r = (e = 'default' in e ? e.default : e).getComponent('Button')
    var i = e.getComponent('Component')
    var s = {}
    var c = e.registerPlugin || e.plugin
    var a = function (e, o) {
      e.addClass('vjs-rangeset-buttons'),
      o.to &&
            ((e.controlBar.cutTo = e.controlBar.addChild('cutButton', { cut: 'to' })),
            e.controlBar
              .el()
              .insertBefore(
                e.controlBar
                  .cutTo
                  .el(),
                e.controlBar
                  .el()
                  .lastChild
                  .previousSibling
                  .previousSibling
                  .previousSibling
                  .previousSibling
                  .previousSibling
                  .previousSibling
                  .previousSibling
              )),
      o.from &&
            ((e.controlBar.cutFrom = e.controlBar.addChild('cutButton', { cut: 'from' })),
            e.controlBar
              .el()
              .insertBefore(
                e.controlBar.cutFrom.el(),
                e.controlBar.cutTo.el()
              ))
    }

    var l = function (o) {
      var t = this
      this.ready(function () {
        a(t, e.mergeOptions(s, o))
      })
    }
    var d = (function (e) {
      function r (t, i) {
        o(this, r)
        var s = n(this, e.call(this, t, i))
        return (
          s.options_.cut === 'to'
            ? s.controlText(
              s
                .localize('Set Range Slider end time to current time')
            )
            : s.options_.cut === 'from' &&
                s.controlText(
                  s
                    .localize('Set Range Slider start time to current time')
                ),
          s
        )
      }
      return (
        t(r, e),
        (r.prototype.buildCSSClass = function () {
          return (
            'vjs-rangeset-button ' +
              this.options_.cut +
              ' ' +
              e.prototype.buildCSSClass.call(this)
          )
        }),
        (r.prototype.handleClick = function () {
            var move_slider_to = function(player, from){

                var current_time = player.currentTime();
                var range_info = player.getValueSlider();
                var range_start = range_info.start;
                var range_end = range_info.end;

                if (from) {
                    player.playBetween(current_time, range_end);
                }
                else {
                    player.playBetween(range_start, current_time);
                }
                player.currentTime(current_time);
            }
            this.options_.cut === 'to'
              ? move_slider_to(this.player_, false)
              : this.options_.cut === 'from' && move_slider_to(this.player_, true)
        }),
        r
      )
    })(r)
    return (
      i.registerComponent('CutButton', d),
      c('cutButtons', l),
      (l.VERSION = '1.0.0'),
      l
    )
  });

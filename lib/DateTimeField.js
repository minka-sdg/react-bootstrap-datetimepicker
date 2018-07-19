"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _DateTimePicker = require("./DateTimePicker.js");

var _DateTimePicker2 = _interopRequireDefault(_DateTimePicker);

var _Constants = require("./Constants.js");

var _Constants2 = _interopRequireDefault(_Constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateTimeField = function (_Component) {
  _inherits(DateTimeField, _Component);

  function DateTimeField(props) {
    _classCallCheck(this, DateTimeField);

    var _this = _possibleConstructorReturn(this, (DateTimeField.__proto__ || Object.getPrototypeOf(DateTimeField)).call(this, props));

    _this.resolvePropsInputFormat = function () {
      if (_this.props.inputFormat) {
        return _this.props.inputFormat;
      }
      switch (_this.props.mode) {
        case _Constants2.default.MODE_TIME:
          return "h:mm A";
        case _Constants2.default.MODE_DATE:
          return "MM/DD/YY";
        default:
          return "MM/DD/YY h:mm A";
      }
    };

    _this.state = {
      showDatePicker: _this.props.mode !== _Constants2.default.MODE_TIME,
      showTimePicker: _this.props.mode === _Constants2.default.MODE_TIME,
      inputFormat: _this.resolvePropsInputFormat(),
      buttonIcon: _this.props.mode === _Constants2.default.MODE_TIME ? "glyphicon-time" : "glyphicon-calendar",
      widgetStyle: {
        display: "block",
        position: "absolute",
        left: -9999,
        zIndex: "9999 !important"
      },
      viewDate: (0, _moment2.default)(_this.props.dateTime, _this.props.format, true).startOf("month"),
      selectedDate: (0, _moment2.default)(_this.props.dateTime, _this.props.format, true),
      inputValue: typeof _this.props.defaultText !== "undefined" ? _this.props.defaultText : (0, _moment2.default)(_this.props.dateTime, _this.props.format, true).format(_this.resolvePropsInputFormat())
    };

    _this.componentWillReceiveProps = function (nextProps) {
      var state = {};
      if (nextProps.inputFormat !== _this.props.inputFormat) {
        state.inputFormat = nextProps.inputFormat;
        state.inputValue = (0, _moment2.default)(nextProps.dateTime, nextProps.format, true).format(nextProps.inputFormat);
      }

      if (nextProps.dateTime !== _this.props.dateTime && (0, _moment2.default)(nextProps.dateTime, nextProps.format, true).isValid()) {
        state.viewDate = (0, _moment2.default)(nextProps.dateTime, nextProps.format, true).startOf("month");
        state.selectedDate = (0, _moment2.default)(nextProps.dateTime, nextProps.format, true);
        state.inputValue = (0, _moment2.default)(nextProps.dateTime, nextProps.format, true).format(nextProps.inputFormat ? nextProps.inputFormat : _this.state.inputFormat);
      }
      return _this.setState(state);
    };

    _this.onChange = function (event) {
      var value = event.target == null ? event : event.target.value;
      if ((0, _moment2.default)(value, _this.state.inputFormat, true).isValid()) {
        _this.setState({
          selectedDate: (0, _moment2.default)(value, _this.state.inputFormat, true),
          viewDate: (0, _moment2.default)(value, _this.state.inputFormat, true).startOf("month")
        });
      }

      return _this.setState({
        inputValue: value
      }, function () {
        return this.props.onChange((0, _moment2.default)(this.state.inputValue, this.state.inputFormat, true).format(this.props.format), value);
      });
    };

    _this.getValue = function () {
      return (0, _moment2.default)(_this.state.inputValue, _this.props.inputFormat, true).format(_this.props.format);
    };

    _this.setSelectedDate = function (e) {
      var target = e.target;

      if (target.className && !target.className.match(/disabled/g)) {
        var month = void 0;
        if (target.className.indexOf("new") >= 0) month = _this.state.viewDate.month() + 1;else if (target.className.indexOf("old") >= 0) month = _this.state.viewDate.month() - 1;else month = _this.state.viewDate.month();
        return _this.setState({
          selectedDate: _this.state.viewDate.clone().month(month).date(parseInt(e.target.innerHTML)).hour(_this.state.selectedDate.hours()).minute(_this.state.selectedDate.minutes())
        }, function () {
          this.closePicker();
          this.props.onChange(this.state.selectedDate.format(this.props.format));
          return this.setState({
            inputValue: this.state.selectedDate.format(this.state.inputFormat)
          });
        });
      }
    };

    _this.setSelectedHour = function (e) {
      return _this.setState({
        selectedDate: _this.state.selectedDate.clone().hour(parseInt(e.target.innerHTML)).minute(_this.state.selectedDate.minutes())
      }, function () {
        this.closePicker();
        this.props.onChange(this.state.selectedDate.format(this.props.format));
        return this.setState({
          inputValue: this.state.selectedDate.format(this.state.inputFormat)
        });
      });
    };

    _this.setSelectedMinute = function (e) {
      return _this.setState({
        selectedDate: _this.state.selectedDate.clone().hour(_this.state.selectedDate.hours()).minute(parseInt(e.target.innerHTML))
      }, function () {
        this.closePicker();
        this.props.onChange(this.state.selectedDate.format(this.props.format));
        return this.setState({
          inputValue: this.state.selectedDate.format(this.state.inputFormat)
        });
      });
    };

    _this.setViewMonth = function (month) {
      return _this.setState({
        viewDate: _this.state.viewDate.clone().month(month)
      });
    };

    _this.setViewYear = function (year) {
      return _this.setState({
        viewDate: _this.state.viewDate.clone().year(year)
      });
    };

    _this.addMinute = function () {
      return _this.setState({
        selectedDate: _this.state.selectedDate.clone().add(1, "minutes")
      }, function () {
        this.props.onChange(this.state.selectedDate.format(this.props.format));
        return this.setState({
          inputValue: this.state.selectedDate.format(this.resolvePropsInputFormat())
        });
      });
    };

    _this.addHour = function () {
      return _this.setState({
        selectedDate: _this.state.selectedDate.clone().add(1, "hours")
      }, function () {
        this.props.onChange(this.state.selectedDate.format(this.props.format));
        return this.setState({
          inputValue: this.state.selectedDate.format(this.resolvePropsInputFormat())
        });
      });
    };

    _this.addMonth = function () {
      return _this.setState({
        viewDate: _this.state.viewDate.add(1, "months")
      });
    };

    _this.addYear = function () {
      return _this.setState({
        viewDate: _this.state.viewDate.add(1, "years")
      });
    };

    _this.addDecade = function () {
      return _this.setState({
        viewDate: _this.state.viewDate.add(10, "years")
      });
    };

    _this.subtractMinute = function () {
      return _this.setState({
        selectedDate: _this.state.selectedDate.clone().subtract(1, "minutes")
      }, function () {
        _this.props.onChange(_this.state.selectedDate.format(_this.props.format));
        return _this.setState({
          inputValue: _this.state.selectedDate.format(_this.resolvePropsInputFormat())
        });
      });
    };

    _this.subtractHour = function () {
      return _this.setState({
        selectedDate: _this.state.selectedDate.clone().subtract(1, "hours")
      }, function () {
        _this.props.onChange(_this.state.selectedDate.format(_this.props.format));
        return _this.setState({
          inputValue: _this.state.selectedDate.format(_this.resolvePropsInputFormat())
        });
      });
    };

    _this.subtractMonth = function () {
      return _this.setState({
        viewDate: _this.state.viewDate.subtract(1, "months")
      });
    };

    _this.subtractYear = function () {
      return _this.setState({
        viewDate: _this.state.viewDate.subtract(1, "years")
      });
    };

    _this.subtractDecade = function () {
      return _this.setState({
        viewDate: _this.state.viewDate.subtract(10, "years")
      });
    };

    _this.togglePeriod = function () {
      if (_this.state.selectedDate.hour() > 12) {
        return _this.onChange(_this.state.selectedDate.clone().subtract(12, "hours").format(_this.state.inputFormat));
      } else {
        return _this.onChange(_this.state.selectedDate.clone().add(12, "hours").format(_this.state.inputFormat));
      }
    };

    _this.togglePicker = function () {
      return _this.setState({
        showDatePicker: !_this.state.showDatePicker,
        showTimePicker: !_this.state.showTimePicker
      });
    };

    _this.onClick = function () {
      var classes = void 0,
          gBCR = void 0,
          offset = void 0,
          placePosition = void 0,
          scrollTop = void 0,
          styles = void 0;
      if (_this.state.showPicker) {
        return _this.closePicker();
      } else {
        _this.setState({
          showPicker: true
        });
        gBCR = _this.dtpbutton.current.getBoundingClientRect();
        classes = {
          "bootstrap-datetimepicker-widget": true,
          "dropdown-menu": true
        };
        offset = {
          top: gBCR.top + window.pageYOffset - document.documentElement.clientTop,
          left: gBCR.left + window.pageXOffset - document.documentElement.clientLeft
        };
        offset.top = offset.top + _this.datetimepicker.current.offsetHeight;
        scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        placePosition = _this.props.direction === "up" ? "top" : _this.props.direction === "bottom" ? "bottom" : _this.props.direction === "auto" ? offset.top + _this.widget.current.offsetHeight > window.offsetHeight + scrollTop && _this.widget.current.offsetHeight + _this.datetimepicker.current.offsetHeight > offset.top ? "top" : "bottom" : void 0;
        if (placePosition === "top") {
          offset.top = -_this.widget.current.offsetHeight - _this.clientHeight - 2;
          classes.top = true;
          classes.bottom = false;
          classes["pull-right"] = true;
        } else {
          offset.top = 40;
          classes.top = false;
          classes.bottom = true;
          classes["pull-right"] = true;
        }
        styles = {
          display: "block",
          position: "absolute",
          top: offset.top,
          left: "auto",
          right: 40
        };
        return _this.setState({
          widgetStyle: styles,
          widgetClasses: classes
        });
      }
    };

    _this.closePicker = function () {
      var style = _extends({}, _this.state.widgetStyle);
      style.left = -9999;
      style.display = "none";
      return _this.setState({
        showPicker: false,
        widgetStyle: style
      });
    };

    _this.size = function () {
      switch (_this.props.size) {
        case _Constants2.default.SIZE_SMALL:
          return "form-group-sm";
        case _Constants2.default.SIZE_LARGE:
          return "form-group-lg";
      }

      return "";
    };

    _this.renderOverlay = function () {
      var styles = {
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: "" + _this.props.zIndex
      };
      if (_this.state.showPicker) {
        return _react2.default.createElement("div", { className: "bootstrap-datetimepicker-overlay", onClick: _this.closePicker, style: styles });
      } else {
        return _react2.default.createElement("span", null);
      }
    };

    _this.widget = _react2.default.createRef();
    _this.datetimepicker = _react2.default.createRef();
    _this.dtpbutton = _react2.default.createRef();
    return _this;
  }

  _createClass(DateTimeField, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        this.renderOverlay(),
        _react2.default.createElement(_DateTimePicker2.default, {
          addDecade: this.addDecade,
          addHour: this.addHour,
          addMinute: this.addMinute,
          addMonth: this.addMonth,
          addYear: this.addYear,
          daysOfWeekDisabled: this.props.daysOfWeekDisabled,
          maxDate: this.props.maxDate,
          minDate: this.props.minDate,
          mode: this.props.mode,
          ref: this.widget,
          selectedDate: this.state.selectedDate,
          setSelectedDate: this.setSelectedDate,
          setSelectedHour: this.setSelectedHour,
          setSelectedMinute: this.setSelectedMinute,
          setViewMonth: this.setViewMonth,
          setViewYear: this.setViewYear,
          showDatePicker: this.state.showDatePicker,
          showTimePicker: this.state.showTimePicker,
          showToday: this.props.showToday,
          subtractDecade: this.subtractDecade,
          subtractHour: this.subtractHour,
          subtractMinute: this.subtractMinute,
          subtractMonth: this.subtractMonth,
          subtractYear: this.subtractYear,
          togglePeriod: this.togglePeriod,
          togglePicker: this.togglePicker,
          viewDate: this.state.viewDate,
          viewMode: this.props.viewMode,
          widgetClasses: this.state.widgetClasses,
          widgetStyle: this.state.widgetStyle
        }),
        _react2.default.createElement(
          "div",
          { className: "input-group date " + this.size(), ref: this.datetimepicker },
          _react2.default.createElement("input", _extends({ className: "form-control", onChange: this.onChange, type: "text", value: this.state.inputValue }, this.props.inputProps)),
          _react2.default.createElement(
            "span",
            { className: "input-group-addon", onBlur: this.onBlur, onClick: this.onClick, ref: this.dtpbutton },
            _react2.default.createElement("span", { className: (0, _classnames2.default)("glyphicon", this.state.buttonIcon) })
          )
        )
      );
    }
  }]);

  return DateTimeField;
}(_react.Component);

DateTimeField.defaultProps = {
  dateTime: (0, _moment2.default)().format("x"),
  format: "x",
  showToday: true,
  viewMode: "days",
  daysOfWeekDisabled: [],
  size: _Constants2.default.SIZE_MEDIUM,
  mode: _Constants2.default.MODE_DATETIME,
  zIndex: 999,
  onChange: function onChange(x) {
    console.log(x);
  }
};
DateTimeField.propTypes = {
  dateTime: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  onChange: _propTypes2.default.func,
  format: _propTypes2.default.string,
  inputProps: _propTypes2.default.object,
  inputFormat: _propTypes2.default.string,
  defaultText: _propTypes2.default.string,
  mode: _propTypes2.default.oneOf([_Constants2.default.MODE_DATE, _Constants2.default.MODE_DATETIME, _Constants2.default.MODE_TIME]),
  minDate: _propTypes2.default.object,
  maxDate: _propTypes2.default.object,
  direction: _propTypes2.default.string,
  showToday: _propTypes2.default.bool,
  viewMode: _propTypes2.default.string,
  zIndex: _propTypes2.default.number,
  size: _propTypes2.default.oneOf([_Constants2.default.SIZE_SMALL, _Constants2.default.SIZE_MEDIUM, _Constants2.default.SIZE_LARGE]),
  daysOfWeekDisabled: _propTypes2.default.arrayOf(_propTypes2.default.number)
};
exports.default = DateTimeField;
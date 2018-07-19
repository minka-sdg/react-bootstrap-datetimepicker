"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _DateTimePickerDate = require("./DateTimePickerDate.js");

var _DateTimePickerDate2 = _interopRequireDefault(_DateTimePickerDate);

var _DateTimePickerTime = require("./DateTimePickerTime.js");

var _DateTimePickerTime2 = _interopRequireDefault(_DateTimePickerTime);

var _Constants = require("./Constants.js");

var _Constants2 = _interopRequireDefault(_Constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateTimePicker = function (_Component) {
  _inherits(DateTimePicker, _Component);

  function DateTimePicker() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DateTimePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DateTimePicker.__proto__ || Object.getPrototypeOf(DateTimePicker)).call.apply(_ref, [this].concat(args))), _this), _this.renderDatePicker = function () {
      if (_this.props.showDatePicker) {
        return _react2.default.createElement(
          "li",
          null,
          _react2.default.createElement(_DateTimePickerDate2.default, {
            addDecade: _this.props.addDecade,
            addMonth: _this.props.addMonth,
            addYear: _this.props.addYear,
            daysOfWeekDisabled: _this.props.daysOfWeekDisabled,
            maxDate: _this.props.maxDate,
            minDate: _this.props.minDate,
            selectedDate: _this.props.selectedDate,
            setSelectedDate: _this.props.setSelectedDate,
            setViewMonth: _this.props.setViewMonth,
            setViewYear: _this.props.setViewYear,
            showToday: _this.props.showToday,
            subtractDecade: _this.props.subtractDecade,
            subtractMonth: _this.props.subtractMonth,
            subtractYear: _this.props.subtractYear,
            viewDate: _this.props.viewDate,
            viewMode: _this.props.viewMode
          })
        );
      }
    }, _this.renderTimePicker = function () {
      if (_this.props.showTimePicker) {
        return _react2.default.createElement(
          "li",
          null,
          _react2.default.createElement(_DateTimePickerTime2.default, {
            addHour: _this.props.addHour,
            addMinute: _this.props.addMinute,
            mode: _this.props.mode,
            selectedDate: _this.props.selectedDate,
            setSelectedHour: _this.props.setSelectedHour,
            setSelectedMinute: _this.props.setSelectedMinute,
            subtractHour: _this.props.subtractHour,
            subtractMinute: _this.props.subtractMinute,
            togglePeriod: _this.props.togglePeriod,
            viewDate: _this.props.viewDate
          })
        );
      }
    }, _this.renderSwitchButton = function () {
      return _this.props.mode === _Constants2.default.MODE_DATETIME ? _react2.default.createElement(
        "li",
        null,
        _react2.default.createElement(
          "span",
          { className: "btn picker-switch", onClick: _this.props.togglePicker, style: { width: "100%" } },
          _react2.default.createElement("span", { className: (0, _classnames2.default)("glyphicon", _this.props.showTimePicker ? "glyphicon-calendar" : "glyphicon-time") })
        )
      ) : null;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateTimePicker, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: (0, _classnames2.default)(this.props.widgetClasses), style: this.props.widgetStyle },
        _react2.default.createElement(
          "ul",
          { className: "list-unstyled" },
          this.renderDatePicker(),
          this.renderSwitchButton(),
          this.renderTimePicker()
        )
      );
    }
  }]);

  return DateTimePicker;
}(_react.Component);

DateTimePicker.propTypes = {
  showDatePicker: _propTypes2.default.bool,
  showTimePicker: _propTypes2.default.bool,
  subtractMonth: _propTypes2.default.func.isRequired,
  addMonth: _propTypes2.default.func.isRequired,
  viewDate: _propTypes2.default.object.isRequired,
  selectedDate: _propTypes2.default.object.isRequired,
  showToday: _propTypes2.default.bool,
  viewMode: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  mode: _propTypes2.default.oneOf([_Constants2.default.MODE_DATE, _Constants2.default.MODE_DATETIME, _Constants2.default.MODE_TIME]),
  daysOfWeekDisabled: _propTypes2.default.array,
  setSelectedDate: _propTypes2.default.func.isRequired,
  subtractYear: _propTypes2.default.func.isRequired,
  addYear: _propTypes2.default.func.isRequired,
  setViewMonth: _propTypes2.default.func.isRequired,
  setViewYear: _propTypes2.default.func.isRequired,
  subtractHour: _propTypes2.default.func.isRequired,
  addHour: _propTypes2.default.func.isRequired,
  subtractMinute: _propTypes2.default.func.isRequired,
  addMinute: _propTypes2.default.func.isRequired,
  addDecade: _propTypes2.default.func.isRequired,
  subtractDecade: _propTypes2.default.func.isRequired,
  togglePeriod: _propTypes2.default.func.isRequired,
  minDate: _propTypes2.default.object,
  maxDate: _propTypes2.default.object,
  widgetClasses: _propTypes2.default.object,
  widgetStyle: _propTypes2.default.object,
  togglePicker: _propTypes2.default.func,
  setSelectedHour: _propTypes2.default.func,
  setSelectedMinute: _propTypes2.default.func
};
exports.default = DateTimePicker;
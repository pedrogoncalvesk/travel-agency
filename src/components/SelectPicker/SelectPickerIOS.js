import React, { Component } from "react";
import { Picker } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
// import PropTypes from "prop-types";

import { deviceWidth } from "../../config/theme";

export default class SelectPickerIOS extends Component {
  // static propTypes = {
  //   onCancel: PropTypes.func.isRequired,
  //   onChange: PropTypes.func.isRequired,
  //   isVisible: PropTypes.bool,
  //   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  //   list: PropTypes.array,
  //   cancelTextIOS: PropTypes.string,
  //   confirmTextIOS: PropTypes.string,
  //   titleIOS: PropTypes.string,
  //   neverDisableConfirmIOS: PropTypes.bool,
  //   showDescription: PropTypes.bool,
  // };

  static defaultProps = {
    isVisible: false,
    value: "",
    list: [],
    cancelTextIOS: "Cancelar",
    confirmTextIOS: "Confirmar",
    titleIOS: "",
    neverDisableConfirmIOS: false,
    showDescription: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      value: props.value,
    };
  }

  // noinspection JSCheckFunctionSignatures
  componentDidUpdate(prevProps) {
    const { list, isVisible, value: val } = this.props;
    const { value } = this.state;

    if (val && prevProps.value !== val) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ value: val });
    }

    if (
      typeof value === "string" &&
      value === "" &&
      list.length !== 0 &&
      !isVisible
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ value: list[0].id });
    }
  }

  _handleChange = value => this.setState({ value });

  _handleConfirm = value => {
    const { onChange, onCancel, list } = this.props;
    const { value: vAux } = this.state;

    let confirmValue;

    if (typeof value === "string" && value !== "") {
      confirmValue = value;
    } else if (typeof vAux === "string" && vAux !== "") {
      confirmValue = vAux;
    } else if (list.length !== 0) confirmValue = list[0].id;

    this._handleChange(confirmValue);
    onChange(confirmValue);
    onCancel();
  };

  render() {
    const {
      isVisible,
      list,
      onCancel,
      cancelTextIOS,
      confirmTextIOS,
      titleIOS,
      showDescription,
    } = this.props;
    const { date, value } = this.state;

    return (
      <DateTimePicker
        isVisible={isVisible}
        onConfirm={this._handleConfirm}
        onCancel={() => onCancel()}
        date={date}
        headerTextIOS={titleIOS}
        cancelTextIOS={cancelTextIOS}
        confirmTextIOS={confirmTextIOS}
        customPickerIOS={({ onChange }) => (
          <Picker
            selectedValue={value}
            onValueChange={v => {
              if (typeof onChange === "function") {
                onChange(undefined, v);
              }
              this._handleChange(v);
            }}
          >
            {list.map(item => (
              <Picker.Item
                key={item.id}
                label={
                  !showDescription || deviceWidth < 400 || !item.description
                    ? item.name
                    : `${item.name} - ${item.description}`
                }
                value={item.id}
              />
            ))}
          </Picker>
        )}
      />
    );
  }
}

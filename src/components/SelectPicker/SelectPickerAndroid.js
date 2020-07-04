import React, { Component } from "react";
import Modal from "react-native-modal";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
// import PropTypes from "prop-types";

import { deviceWidth, deviceHeight } from "../../config/theme";
import { style } from "./style";

export default class SelectPickerAndroid extends Component {
  // static propTypes = {
  //   onCancel: PropTypes.func.isRequired,
  //   onChange: PropTypes.func.isRequired,
  //   isVisible: PropTypes.bool,
  //   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  //   list: PropTypes.array,
  //   closeTextAndroid: PropTypes.string,
  //   titleAndroid: PropTypes.string,
  //   showDescription: PropTypes.bool,
  // };

  static defaultProps = {
    isVisible: false,
    value: "",
    list: [],
    closeTextAndroid: "Fechar",
    titleAndroid: "",
    showDescription: false,
  };

  _handleChange = value => {
    const { onChange, onCancel } = this.props;
    onChange(value);
    onCancel();
  };

  render() {
    const {
      isVisible,
      value,
      list,
      onCancel,
      closeTextAndroid,
      titleAndroid,
      showDescription,
    } = this.props;

    return (
      <Modal
        isVisible={isVisible}
        deviceWidth={deviceWidth}
        deviceHeight={deviceHeight}
        onBackdropPress={() => onCancel()}
        onBackButtonPress={() => onCancel()}
        style={style.modal}
      >
        <View style={style.content}>
          {titleAndroid !== "" && (
            <>
              <Text style={style.title}>{titleAndroid}</Text>
              <View style={style.divider} />
            </>
          )}
          <ScrollView>
            {list.map(item => (
              <View key={item.id} style={style.buttonContainer}>
                <TouchableOpacity
                  style={style.circle}
                  onPress={() => this._handleChange(item.id)}
                >
                  {value === item.id && <View style={style.checkedCircle} />}
                </TouchableOpacity>
                <TouchableOpacity
                  style={style.buttonText}
                  onPress={() => this._handleChange(item.id)}
                >
                  <Text style={style.text}>
                    {!showDescription || deviceWidth < 400 || !item.description
                      ? item.name
                      : `${item.name} - ${item.description}`}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={style.closeButton}
            onPress={() => onCancel()}
          >
            <Text style={style.closeButtonText}>{closeTextAndroid}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

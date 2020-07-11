import React from "react";
import { TouchableHighlight, StyleSheet, Text } from "react-native";

const DefaultButton = props => (
  <TouchableHighlight
    underlayColor="#6239a6"
    style={props.disabled ? styles.defaultButtonDisabled : styles.defaultButton}
    onPress={props.touchHandler}
    {...props}
  >
    <Text
        style={
          props.disabled
            ? styles.defaultButtonTextDisabled
            : styles.defaultButtonText
        }
      >
      {props.children}
    </Text>
  </TouchableHighlight>
);

const baseButton = {
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: 50,
  borderRadius: 7,
  backgroundColor: "#9864f0"
};

const baseText = {
  color: "#fff",
  fontSize: 20
};

const styles = StyleSheet.create({
  defaultButton: baseButton,
  defaultButtonDisabled: {
    ...baseButton,
    backgroundColor: "#B59EDD"
  },
  defaultButtonText: baseText,
  defaultButtonTextDisabled: {
    ...baseText,
    color: "#D0C2E9"
  }
});

export default DefaultButton;

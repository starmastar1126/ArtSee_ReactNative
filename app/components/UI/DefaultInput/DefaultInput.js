import React from "react";
import { StyleSheet, TextInput } from "react-native";

const DefaultInput = props => (
  <TextInput
    style={
      props.value.trim().length === 0 || props.valid
        ? styles.input
        : styles.errorInput
    }
    underlineColorAndroid="transparent"
    placeholderTextColor="gray"
    {...props}
  />
);

const baseInput = {
  width: '100%',
  backgroundColor: '#f1f4f9',
  marginVertical: 5,
  borderRadius: 5,
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 18,
  borderWidth: 1,
  borderColor: '#eff0f3',
  padding: 10
};

const styles = StyleSheet.create({
  input: baseInput,
  errorInput: {
    ...baseInput,
    borderColor: "red"
  }
});

export default DefaultInput;

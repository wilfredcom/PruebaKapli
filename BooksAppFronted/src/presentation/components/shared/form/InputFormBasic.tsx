import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputFormBasic = (props:any) => {

  const { 
    label, 
    placeholder, 
    keyboardType, 
    secureTextEntry, 
    onChangeText, 
    onFocus, 
    keyboardShow, 
    onPressIn, 
    editable, 
    maxLength,
    useMaxWidth,
    value,
    multiline,
    numberOfLines,
    customStyles,
  } = props;


  return (
    <View style={{
      ...styles.viewTextInput,
      width: useMaxWidth ? "100%" : "90%",
      ...(customStyles?.viewTextInput || {}),
    }}>
      <Text style={[styles.textHintInput, customStyles?.textHintInput]}>{label}</Text>
      <TextInput
        multiline={multiline}
        numberOfLines={numberOfLines}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#505050"
        style={[styles.textInput, customStyles?.textInput]}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        onFocus={onFocus}
        showSoftInputOnFocus={keyboardShow}
        onPressIn={onPressIn}
        editable={editable}
        maxLength={maxLength}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textHintInput: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "500"
  },
  viewTextInput: {
    height: 50,
    marginTop: 5,
    marginBottom: 20
  },
  textInput: {
    width: '100%',
    height: 40,
    backgroundColor: '#F2F2F2',
    borderColor: '#F2F2F2',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 5,

    fontSize: 16,

  }
});

InputFormBasic.defaultProps = {
  label: '',
  placeholder: '',
  keyboardType: 'default',
  secureTextEntry: false,
  keyboardShow: true,
  editable: true,
  maxLength: 1000
}

export default InputFormBasic;

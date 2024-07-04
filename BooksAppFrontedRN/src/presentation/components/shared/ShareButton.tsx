import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { globalTheme } from '../../../config/theme/globalTheme';

const ShareButton = (props:any) => {
  const { title, onPress,customStyles } = props;
  return (
    <TouchableOpacity style={[styles.btnPrimary,customStyles?.btnPrimary]} onPress={onPress}>
      <Text style={[styles.btnText,customStyles?.btnText]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnPrimary: {
    overflow: 'hidden',
    width: 120,
    height: 50,
    // borderColor: '#7B7B7B',
    backgroundColor:globalTheme.primaryColor.color,
    // borderWidth: 1,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
	},
	btnText: {
    color: '#000',
    fontSize: 13,
    fontWeight: 'normal'
	},
});

export default ShareButton;
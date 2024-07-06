import { Link } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Button, Alert } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ListScreen() {

  const [name, setName] = useState('');
  const [capitulos, setCapitulos] = useState('');
  const [editorial, setEditorial] = useState('');

  const emojisWithIcons = [
    {title: 'happy'},
    {title: 'cool'},
    {title: 'lol'},
    {title: 'sad'},
    {title: 'cry'},
    {title: 'angry'},
    {title: 'confused'},
    {title: 'excited'},
    {title: 'kiss'},
    {title: 'devil'},
    {title: 'dead'},
    {title: 'wink'},
    {title: 'sick'},
    {title: 'frown'},
  ];

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/react-logo.png')}
        style={styles.reactLogo}
      />
      <Text style={styles.title}>Ingrese información del libro</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Nombre del libro...'
          onChangeText={v => setName(v)}
        />
        <TextInput
          style={styles.input}
          placeholder='Editorial ...'
          onChangeText={v => setEditorial(v)}
        />

        <TextInput
          style={styles.input}
          keyboardType='numeric'
          placeholder='Cantidad de capitulo ...'
          onChangeText={v => setCapitulos(v)}
        />

        <SelectDropdown
          data={emojisWithIcons}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.title) || 'Seleccione Autor'}
                </Text>
                <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />

        <Button
          title="Registrar"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    flex: 4,
    width: '80%',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#777',
    backgroundColor: '#E9ECEF',
    paddingHorizontal: 12,
    marginBottom: 10,
    height: 50,
    width: '100%'
  },
  reactLogo: {
    flex: 1,
    width: 220,
  },
  button: {
    borderRadius: 5,
  },
  dropdownButtonStyle: {
    height: 50,
    borderWidth: 1,
    backgroundColor: '#E9ECEF',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

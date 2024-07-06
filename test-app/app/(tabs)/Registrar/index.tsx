import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Button, Alert } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default function RegistrarScreen() {

  const [name, setName] = useState('');
  const [capitulos, setCapitulos] = useState('');
  const [editorial, setEditorial] = useState('');
  const [author, setAuthor] = useState('');
  const [errors, setErrors] = useState({});
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    
    const configurationObject = {
      method: 'GET',
      url: `http://localhost:8000/api/v1/authors`,
    };

    axios(configurationObject).then(resp => {
      const { data } = resp.data;
      setAuthors(
        data.map(item => (
          { 
            id: item.id, 
            name: item.name, 
          }))
        )
  
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    });

    
  }

  useEffect(() => {
    fetchData();
  }, []);

  const validateForm = () => {
    let errors = {};

    if (!name) errors.name = "El nombre es requerido";
    if (Number(capitulos) <= 0) errors.capitulos = "Cantidad capitulos debe ser mayor a 0";
    if (!editorial) errors.editorial = "La editorial es requerida";
    if (!author) errors.author = "El autor es requerido";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  const handleSubmit = async () => {
    if (validateForm()) {
      setName('');
      setCapitulos('');
      setEditorial('');
      setAuthor('');
      setErrors({});

      axios.post(`http://localhost:8000/api/v1/books`, {
          name,
          capitulos,
          editorial,
          "authors_id": author
      }).then(resp => {
        Alert.alert('Registro de libro', 'Libro registrado correctamente', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ], {cancelable: false});

      }).catch(err => console.error(err));

    }
  }

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
          value={name}
        />
        {errors.name ? (
          <Text style={styles.errors}>{errors.name}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder='Editorial ...'
          onChangeText={v => setEditorial(v)}
          value={editorial}
        />
        {errors.editorial ? (
          <Text style={styles.errors}>{errors.editorial}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          keyboardType='numeric'
          placeholder='Cantidad de capitulo ...'
          onChangeText={v => setCapitulos(String(v))}
          value={capitulos}
        />
        
        {errors.capitulos ? (
          <Text style={styles.errors}>{errors.capitulos}</Text>
        ) : null}
        

        <SelectDropdown
          data={authors}
          defaultValue={author}
          onSelect={(selectedItem, index) => {
            setAuthor(selectedItem.id);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.name) || 'Seleccione Autor'}
                </Text>
                <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
        {errors.author ? (
          <Text style={styles.errors}>{errors.author}</Text>
        ) : null}
        <Button
          title="Registrar"
          onPress={() => handleSubmit()}
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
  errors: {
    color: 'red',
    marginBottom: 10
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

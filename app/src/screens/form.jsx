import React from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  View,
  Pressable,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
const FormScreen = ({navigation}) => {
  const [concept, setConcept] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [category, setCategory] = React.useState(1);
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    getCatalog();
  }, []);

  const getCatalog = () => {
    fetch('http://localhost:8000/api/categories')
      .then(response => response.json())
      .then(json => {
        setCategories(json.data);
      });
  };

  const clear = () => {
    setConcept('');
    setAmount('');
    setCategory(1);
  };

  const showAlert = msg => {
    Alert.alert('Error', msg, [{text: 'OK'}], {cancelable: false});
  };

  const validateForm = () => {
    let isValid = true;

    if (!concept) {
      isValid = false;
      showAlert('El concepto no puede estar vacio.');
    }

    if (!amount) {
      isValid = false;
      showAlert('El monto no puede estar vacio.');
    }

    if (!category) {
      isValid = false;
      showAlert('La categoria no puede estar vacia.');
    }

    return isValid;
  };

  const submit = () => {
    if (validateForm()) {
      fetch('http://localhost:8000/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category_id: category, concept, amount }),
      })
        .then(response => response.json())
        .then(json => {
          clear();
          navigation.goBack();
        })
        .catch(error => {
          showAlert(
            'Ocurrió un error al enviar el formulario. Por favor, inténtalo de nuevo.',
          );
        });
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.shadowContainer}>
        <TextInput
          placeholder="Concepto"
          style={styles.input}
          onChangeText={setConcept}
          value={concept}
        />
        <TextInput
          style={styles.input}
          onChangeText={setAmount}
          value={amount}
          placeholder="Monto"
          keyboardType="numeric"
        />
        <Picker
          selectedValue={category}
          mode="dialog"
          onValueChange={setCategory}>
          {categories.map((cat, idx) => (
            <Picker.Item key={idx} label={cat.name} value={cat.id} />
          ))}
        </Picker>
        <Pressable style={styles.button} onPress={submit}>
          <Text style={styles.text}>{'Guardar'}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  shadowContainer: {
    marginTop: 20,
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    borderColor: '#dfdfdf',
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 6,
    marginTop: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default FormScreen;

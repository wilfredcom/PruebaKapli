import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const AddAuthorScreen = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleAddAuthor = async () => {
    try {
      await axios.post('http://localhost:3000/api/authors', { name, age: parseInt(age) });
      alert('Author added successfully!');
    } catch (error) {
      alert('Error adding author');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <Button title="Add Author" onPress={handleAddAuthor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default AddAuthorScreen;

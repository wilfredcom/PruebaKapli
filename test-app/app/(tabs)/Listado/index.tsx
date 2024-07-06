
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { Link } from 'expo-router';

const Item = ({ name, edit, cap, auth }) => (
  <View style={styles.item}>
    <Text style={styles.itemText}>
      <Text style={styles.textbold}>Nombre libro:</Text> {name}
    </Text>
    <Text style={styles.itemText}>
      <Text style={styles.textbold}>Editorial:</Text> {edit}
    </Text>
    <Text style={styles.itemText}>
      <Text style={styles.textbold}>Capitulos:</Text> {cap}
    </Text>
    <Text style={styles.itemText}>
      <Text style={styles.textbold}>Autor:</Text> {auth}
    </Text>
  </View>
);

const HomeScreen = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    const configurationObject = {
      method: 'GET',
      url: `http://localhost:8000/api/v1/books`,
    };

    axios(configurationObject).then(resp => {
      const { data } = resp.data;
      setData(data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    });

  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? <ActivityIndicator size="large" /> :
        <FlatList
          style={styles.flat}
          data={data}
          renderItem={({ item }) => <Item name={item.name} edit={item.edit} cap={item.cap} auth={item.auth} />}
          keyExtractor={item => item.id}
        />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flat: {
    padding: 20
  },
  item: {
    borderColor: '#acacac',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10
  },
  itemText: {
    lineHeight: 20
  },
  textbold: {
    color: '#000',
    fontWeight: '700'
  }
});

export default HomeScreen;
import React from 'react';
import {ScrollView, StyleSheet, Text, View, RefreshControl} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const HomeScreen = () => {
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  const fetchData = () => {
    setRefreshing(true);
    fetch('http://localhost:8000/api/expenses')
      .then(response => response.json())
      .then(json => {
        setRefreshing(false);
        setData(json.data);
      })
      .catch(error => {
        setRefreshing(false);
      });
  };

  const emptyData = data.length === 0;

  return (
    <View style={styles.flex}>
      <ScrollView
        style={{...styles.flex, ...styles.container}}
        contentContainerStyle={
          emptyData ? {...styles.flex, ...styles.center} : {}
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }>
        {data.map((item, index) => (
          <View style={styles.row} key={index}>
            <View style={{...styles.flex, ...styles.pRight}}>
              <Text style={styles.regularText}>{item.concept}</Text>
              <Text style={styles.strong}>{item.category.name}</Text>
            </View>
            <View style={styles.center}>
              <Text style={styles.accentColor}>$ {item.amount}</Text>
            </View>
          </View>
        ))}
        {emptyData && (
          <View style={{...styles.flex, ...styles.center}}>
            <View style={{...styles.center, ...styles.alert}}>
              <Text style={styles.title}>{'Empty!'}</Text>
              <Text style={styles.regularText}>
                {'No has registrado gastos aun, registra tu primer gasto.'}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    flexGrow: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pRight: {
    paddingRight: 10,
  },
  regularText: {
    fontSize: 16,
    fontWeight: '300',
  },
  strong: {
    fontWeight: 'bold',
  },
  accentColor: {
    color: '#FF412F',
    fontWeight: '300',
  },
  alert: {
    padding: 30,
    maxWidth: '80%',
  },
  title: {
    fontSize: 30,
  },
  row: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DFDFDF',
  },
});

export default HomeScreen;

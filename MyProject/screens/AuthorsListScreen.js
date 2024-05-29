import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const AuthorsListScreen = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/authors');
        setAuthors(response.data);
      } catch (error) {
        alert('Error fetching authors');
      }
    };

    fetchAuthors();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={authors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.authorContainer}>
            <Text style={styles.authorName}>{item.name} (Age: {item.age})</Text>
            {item.Books.map((book) => (
              <Text key={book.id} style={styles.bookTitle}>- {book.title} (Published: {book.publicationYear})</Text>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  authorContainer: {
    marginBottom: 20,
  },
  authorName: {
    fontWeight: 'bold',
  },
  bookTitle: {
    marginLeft: 10,
  },
});

export default AuthorsListScreen;

import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { globalTheme } from '../../../config/theme/globalTheme';
import ShareButton from '../shared/ShareButton';
import { Genre } from '../../../domain/entities/Books';
import { getGenres } from '../../../actions';
import { GenreCard } from '../shared/GenreCard';
import { INITIAL_FORM_VALUES_TYPE } from '../../screens/RegisterBookScreen';

interface Props {
  formValues: INITIAL_FORM_VALUES_TYPE;
  setFormValues: React.Dispatch<React.SetStateAction<INITIAL_FORM_VALUES_TYPE>>;
  setCurrenTab: React.Dispatch<React.SetStateAction<number>>;
};

const RegisterFirstStep = ({ formValues, setFormValues, setCurrenTab }: Props) => {

  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const genresFromDB = await getGenres();
      setGenres(genresFromDB);
    };
    fetchInitialData();
  }, []);

  const handleAddGender = (genre: Genre) => {
    setFormValues(prevFormValues => {
      const isSelected = prevFormValues.genresIds.includes(genre.id);
      if (isSelected) {
        // Si ya está seleccionado, lo quitamos
        return {
          ...prevFormValues,
          genresIds: prevFormValues.genresIds.filter(id => id !== genre.id)
        };
      } else {
        // Si no está seleccionado, lo agregamos
        return {
          ...prevFormValues,
          genresIds: [...prevFormValues.genresIds, genre.id]
        };
      }
    });
  };

  const checkInfo = () => {
    if (formValues.genresIds.length === 0) {
      return Alert.alert("Error", "Tienes que seleccionar al menos un género del libro");
    }

    setCurrenTab(currentTab => currentTab + 1);
  };

  return (
    <>
      <View style={styles.main}>
        <Text style={{ ...globalTheme.titleSemiBold, color: "#fff" }}>Select the genres</Text>
        <View style={styles.genresCardContainer}>
          {genres.map(genre => (
            <GenreCard
              key={genre.id}
              onPress={handleAddGender}
              customStyles={{ container: { padding: 10, borderColor: "#fff" }, text: { color: "#fff" } }}
              genre={genre}
              isSelected={formValues.genresIds.includes(genre.id)}
            />
          ))}
        </View>
      </View>
      <View style={styles.footer}>
        <ShareButton onPress={checkInfo} title="Continuar" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 2,
    width: '100%',
    paddingHorizontal: 20,
    display: "flex",
    gap: 10
  },
  footer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    gap: 10
  },
  genresCardContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginTop: 15,
  }
});

export default RegisterFirstStep;

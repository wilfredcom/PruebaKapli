import React, { useState } from 'react'
import { Alert, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import ShareButton from '../shared/ShareButton'
import { INITIAL_FORM_VALUES_TYPE } from '../../screens/RegisterBookScreen';
import InputFormBasic from '../shared/form/InputFormBasic';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DatePicker from 'react-native-date-picker';

interface Props {
  formValues:INITIAL_FORM_VALUES_TYPE;
  setFormValues:React.Dispatch<React.SetStateAction<INITIAL_FORM_VALUES_TYPE>>;
  setCurrenTab:React.Dispatch<React.SetStateAction<number>>;
  handleRegister:() => Promise<void>;
};

const RegisterSecondStep = ({formValues,setFormValues,setCurrenTab,handleRegister}:Props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());

  const checkInfo = () => {
    if(formValues.title.length === 0) {
      return Alert.alert("Error","Titulo tiene que tener mas de 1 caracter")
    }

    if(formValues.description.length === 0) {
      return Alert.alert("Error","Description tiene que tener mas de 1 caracter")
    }

    if(formValues.releaseDate.length === 0) {
      return Alert.alert("Error","La fecha tiene que ser de un formato valido")
    }

    handleRegister();
  }

  return (
    <>
      <View style={styles.main}>
        <InputFormBasic 
          value={formValues.title}
          name="title"
          useMaxWidth 
          label="Title"
          placeholder="Write the title of your book here"
          onChangeText={(text:string) => setFormValues((formValues) => ({...formValues,title:text}))}
        />
        <InputFormBasic 
          value={formValues.description}
          name="description"
          useMaxWidth 
          label="Description"
          placeholder="Write the description of your book here"
          onChangeText={(text:string) => setFormValues((formValues) => ({...formValues,description:text}))}
          multiline={true}
          numberOfLines={20}
          customStyles={{
            textInput:{
              height:200,
              paddingLeft:10,
              paddingTop:10,
              textAlign: 'left', 
              textAlignVertical:"top",
            }
          }}
        />
        <TouchableOpacity
          style={styles.viewDateInput} 
          onPress={() => setDatePickerVisibility(true)} 
        >
          <Text style={styles.textHintInput}>Release date</Text>
          <TextInput
            value={formValues.releaseDate}
            placeholder="Select the release date here"
            placeholderTextColor="#505050"
            style={styles.textInput}
            editable={true} // Hace que el teclado no se abra
            onFocus={() => {
              Keyboard.dismiss();
              setDatePickerVisibility(true);
            }}
          />
        </TouchableOpacity>

        <DatePicker
          modal
          mode='date'
          open={isDatePickerVisible}
          date={date}
          onConfirm={(date) => {
            setDatePickerVisibility(false);
            setDate(date);
            setFormValues((formValues) => ({...formValues,releaseDate:moment(date).format("DD/MM/YYYY")}))
          }}
          onCancel={() => setDatePickerVisibility(false)}
        />
        
      </View>
      <View style={styles.footer}>
        <View style={{flexDirection:"row",gap:10}}>
          <ShareButton onPress={() => setCurrenTab(currentTab => currentTab -1)} title="Volver atras"/>
          <ShareButton onPress={checkInfo} title="Registrar"/>
        </View>
      </View>
    </>
  )
}

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
    gap: 10,
  },
  genresCardContainer:{
    display:"flex",
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"center",
    gap:10,
    marginTop:15,
  },
  viewDateInput: {      

    width: '100%',
    height: 50,
    marginTop: 160,
    marginBottom: 20
  },
  textHintInput: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 5
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
  },
});

export default RegisterSecondStep
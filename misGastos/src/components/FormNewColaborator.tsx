import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Colaborador {
    nombre: string;
    edad: string;
    fecha: string;
    activo: boolean;
}

interface ColaboradorFormProps {
    onSubmit: (colaborador: Colaborador) => void;
    reload: boolean;
    setReload: (reload: boolean) => void;
}

const ColaboradorForm: React.FC<ColaboradorFormProps> = ({ onSubmit,reload,setReload}) => {
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    const [fecha, setFecha] = useState('');
    const activo = true;
    const [modalVisible, setModalVisible] = useState(false);
    const [show, setShow] = useState(false);

    const handleSubmit = async () => {
        const colaborador: Colaborador = { nombre, edad, fecha, activo };
    //    onSubmit(colaborador);
        
        try {
            const response = await fetch('http://192.168.1.68:8000/api/colaborators', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(colaborador)
            });
            const data = await response.json();
            setReload(!reload);
            setModalVisible(false);
        } catch (error) {
            console.error('Error al enviar los datos del colaborador', error);
        }
    };

    return (
        <View>
            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <TextInput
                        style={styles.input}
                        value={nombre}
                        onChangeText={setNombre}
                        placeholder="Nombre"
                    />
                    <TextInput
                        style={styles.input}
                        value={edad}
                        onChangeText={setEdad}
                        placeholder="Edad"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        value={fecha}
                        onChangeText={()=>setShow(true)}
                        onFocus={()=>setShow(true)}
                        placeholder="Fecha"
                    />
                    {show&&          <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            if (selectedDate) {
                                setFecha(selectedDate.toISOString().split('T')[0]);
                                setShow(false);
                            }
                        }}
                    />}
                    <Button title="Registrar" onPress={handleSubmit} />
                    <Button title="Cerrar Modal" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
            <Button title="Nuevo Colaborador" onPress={() => setModalVisible(true)} />
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default ColaboradorForm;
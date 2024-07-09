import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal,Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';


interface Post {
    titulo: string;
    id_colaborador: number;
}
interface Colaborador {
    id: number;
    nombre: string;
    edad: string;
    fecha: Date;
    activo: boolean;
}

interface PostFormProps {
    colaborators: Colaborador[];
    reload: boolean;
    setReload: (reload: boolean) => void;
}

const ColaboradorForm: React.FC<PostFormProps> = (props) => {
    const [titulo, setTitulo] = useState('');
    const [colaborador, setColaborador] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const { colaborators,reload,setReload } = props;

    const handleSubmit = async () => {
        const post: Post = { titulo, id_colaborador: colaborador };
        console.log(post);
        try {
            const response = await fetch('http://192.168.1.68:8000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            });
            const data = await response.json();
            setModalVisible(false);
            setReload(!reload);
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
                    <Text>Titulo</Text>
                    <TextInput
                        style={styles.input}
                        value={titulo}
                        onChangeText={setTitulo}
                        placeholder="Titulo"
                    />
                    <Text>Colaborador</Text>
                    <Picker
                        selectedValue={colaborador}
                        onValueChange={(itemValue) => setColaborador(itemValue)}
                        style={styles.input}
                    >
                        {colaborators.map((colaborator) => (
                            <Picker.Item key={colaborator.id} label={colaborator.nombre} value={colaborator.id} />
                        ))}
                    </Picker>
                    <Button title="Registrar" onPress={handleSubmit} />
                    <Button title="Cerrar Modal" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
            <Button title="Nuevo Post" onPress={() => setModalVisible(true)} />
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
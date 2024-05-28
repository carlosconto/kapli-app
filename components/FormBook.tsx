import React, { useState } from 'react';
import {
    Dialog,
    CheckBox,
} from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { isOpen, addBook } from '@/redux/reducers/bookSlice';
import { Input } from '@rneui/base';
import Book from '@/src/model/book';
import Toast from 'react-native-toast-message';
import BookService from '@/src/services/bookService';


type DialogComponentProps = {
    open: boolean;
};

const Dialogs: React.FunctionComponent<DialogComponentProps> = (props) => {
    const isOpenModal = useSelector((state: any) => state.book.openModal);

    const [count, setCount] = useState(0);

    const dispatch = useDispatch();

    const formBook: Book = {
        id: 0,
        title: '',
        author: '',
        genre: '',
        description: '',
    }

    const [form, setForm] = useState(formBook);

    const showToast = () => {
        Toast.show({
            type: 'error',
            text1: 'Datos Requeridos',
            text2: 'Los datos son requeridos',
            position: 'bottom',
            visibilityTime: 2000,
        });
    }

    const createBook = () => {

        if (form.title === '' || form.author === '' || form.genre === '') {
            showToast();
            return;
        }

        setCount(count + 1);
        const book = Book.create(count, form.title, form.author, form.genre, form.description);

        setForm({
            id: 0,
            title: '',
            author: '',
            genre: '',
            description: '',
        });

        BookService.addBook(book).then((response: any) => {
            if (response.status === 201) {
                dispatch(addBook({ ...book } as any));
                dispatch(isOpen());
                Toast.show({
                    type: 'success',
                    text1: 'Exito al crear el libro',
                    text2: response.message,
                    position: 'bottom',
                    visibilityTime: 2000,
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error al crear el libro',
                    text2: response.message,
                    position: 'bottom',
                    visibilityTime: 2000,
                });
            }
        });
    };

    return (
        <View>
            <Dialog
                isVisible={isOpenModal}
                onBackdropPress={() => dispatch(isOpen())}
            >
                <Dialog.Title title="Agrege un nuevo libro" />
                <Input
                    placeholder='Ingrese el nombre del libro'
                    onChangeText={(value) => setForm({ ...form, title: value })}
                />

                <Input
                    placeholder='Ingrese el autor del libro'
                    onChangeText={(value) => setForm({ ...form, author: value })}
                />

                <Input
                    placeholder='Ingrese el genero del libro'
                    onChangeText={(value) => setForm({ ...form, genre: value })}
                />

                <Input
                    placeholder='Ingrese una descripción del libro'
                    onChangeText={(value) => setForm({ ...form, description: value })}
                />

                <Dialog.Actions>
                    <Dialog.Button
                        title="GUARDAR"
                        onPress={() => createBook()}
                    />
                    <Dialog.Button title="CANCELAR" onPress={() => dispatch(isOpen())} />
                </Dialog.Actions>
            </Dialog>

        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 6,
        width: 220,
        margin: 20,
    },
    buttonContainer: {
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Dialogs;
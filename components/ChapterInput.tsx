import React, { useState } from 'react';
import { Dialog, } from '@rneui/themed';
import { StyleSheet, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { isOpenModalChapter, selectedBook } from '@/redux/reducers/bookSlice';
import { Input } from '@rneui/base';
import BookService from '@/src/services/bookService';

type DialogComponentProps = {

};

const ChapterInput: React.FunctionComponent<DialogComponentProps> = () => {
    const openModalChapter = useSelector((state: any) => state.book.openModalChapter);
    const book = useSelector((state: any) => state.book.currenBook);

    const [comment, setComment] = useState('');
    const [chapterName, setChapterName] = useState('');
    const dispatch = useDispatch();

    const addComment = (book: any, comment: string) => {
        const bookService = new BookService();

        const chapter = {
            title: chapterName,
            description: comment,
            book_id: book.id
        }

        BookService.addChapter(chapter).then((response: any) => {
            if (response.status === 201) {
                dispatch(isOpenModalChapter());
                dispatch(selectedBook({} as any));
                setChapterName('');
                setComment('');
            } else {
                console.log(response);
            }
        })
    };

    const closeModal = () => {
        dispatch(isOpenModalChapter());
        dispatch(selectedBook({} as any));
        setChapterName('');
        setComment('');
    };

    return (
        <>
            <Dialog
                isVisible={openModalChapter}
                onBackdropPress={() => closeModal()}
            >
                <Dialog.Title title={`${book.title}`} />

                <Input
                    placeholder='Nombre del capítulo'
                    onChangeText={(text) => setChapterName(text)}
                    value={chapterName}
                />

                <TextInput
                    multiline
                    numberOfLines={10}
                    onChangeText={(text) => setComment(text)}
                    value={comment}
                    placeholder="Escribe aquí..."
                    style={styles.textInput}
                />

                <Dialog.Actions>
                    <Dialog.Button
                        title="GUARDAR"
                        onPress={() => addComment(book, comment)}
                    />
                    <Dialog.Button title="CANCELAR" onPress={() => closeModal()} />
                </Dialog.Actions>
            </Dialog>
        </>
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
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        width: '100%',
        height: 150,
    },
});

export default ChapterInput;
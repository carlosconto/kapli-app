import { StyleSheet, Text } from 'react-native';
import { Avatar, ButtonGroup, Icon, ListItem } from '@rneui/base';
import Header from '@/components/Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Dialogs from '@/components/FormBook';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { Fragment, useEffect, useState } from 'react';
import BookService from '@/src/services/bookService';
import { addBook, clearBooks, deleteBook as _deleteBook, isOpenModalChapter, selectedBook } from '@/redux/reducers/bookSlice';
import ChapterInput from '@/components/ChapterInput';
import { Link, Stack } from 'expo-router';

export default function HomeScreen() {

  const books = useSelector((state: any) => state.book.books);
  const dispatch = useDispatch();
  const openModalChapter = useSelector((state: any) => state.book.openModalChapter);

  useEffect(() => {
    const fetchBooks = async () => {
      BookService.getBooks().then((response: any) => {
        dispatch(clearBooks());
  
        (response.response as any[]).map((book: any) => {
          dispatch(addBook({ ...book }));
        });
      })
    };

    fetchBooks();

    return () => {
      // Limpiar el estado de los libros cuando el componente se desmonte
      dispatch(clearBooks());
    };
  }, [dispatch]);

  const deleteBook = (id: number) => {
    BookService.deleteBook(id).then((response: any) => {
      if (response.status === 204) {
        Toast.show({
          type: 'success',
          text1: 'Exito al borrar el libro',
          text2: response.message,
          position: 'bottom',
          visibilityTime: 2000,
        });

        dispatch(_deleteBook(id as any));

      } else {
        Toast.show({
          type: 'error',
          text1: 'Error al borrar el libro',
          text2: response.message,
          position: 'bottom',
          visibilityTime: 2000,
        });
      }
    })
  }

  const addChapter = (book: any) => {
    dispatch(selectedBook({ ...book } as any));
    dispatch(isOpenModalChapter());
  }


  return (
    <SafeAreaProvider>
      <Header title="BookStore" />

      {books.length > 0 ? books.map((book: any) => {

        return (
          <ListItem.Swipeable key={book.id} rightContent={(reset) => (
            <Fragment>
              <ButtonGroup
                buttonStyle={{ padding: 10 }}
                selectedButtonStyle={{ backgroundColor: '#e2e2e2' }}
                buttons={[
                  <Icon name="delete" color={'red'} onPress={() => {
                    deleteBook(book.id);
                    reset();
                  }} />,
                  <Icon name="comment" color={'blue'} onPress={() => addChapter(book)} />,
                ]}

              />
            </Fragment>
          )}>
            <Link
              href={{
                pathname: `/chapters/[id]`,
                params: { id: book.id }
              }}
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}

            >
              <Avatar
                rounded
                source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
              />
              <ListItem.Content>
                <ListItem.Title>{book.title}</ListItem.Title>
                <ListItem.Subtitle>{book.author}</ListItem.Subtitle>
              </ListItem.Content>
            </Link>
          </ListItem.Swipeable>
        )
      }) : (<Text key={9999} style={{ textAlign: 'center', marginTop: 20, fontSize: 18, fontWeight: 'bold' }}>No hay libros</Text>)}


      <Dialogs open={false} />

      <ChapterInput />

      <Toast />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});

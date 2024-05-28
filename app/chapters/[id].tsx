import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import BookService from '@/src/services/bookService';
import { View, ScrollView, StyleSheet, Image, TextInput } from 'react-native';
import { Text, Card, Button, Icon } from '@rneui/themed';
import Book from '@/src/model/book';
import { useDispatch, useSelector } from 'react-redux';
import { addBook, isOpenModalChapter, selectedBook } from '@/redux/reducers/bookSlice';
import { ButtonGroup, Dialog } from '@rneui/base';

export default function Chapters() {
  //para mostrar los elementos se podria usar mas componentes otra vista etc sin embargo hasta aca lo dejare
  const params = useLocalSearchParams();
  const currenBook = useSelector((state: any) => state.book.currenBook);
  const dispatch = useDispatch();
  const [book, setBook] = useState<Book>({} as Book);

  const openModalChapter = useSelector((state: any) => state.book.openModalChapter);

  useEffect(() => {

    const fetChapters = async () => {
      BookService.getBook(params.id as any).then((response: any) => {
        if (response.status === 200) {
          setBook(
            new Book(
              response.response.id,
              response.response.title,
              response.response.author,
              response.response.genre,
              response.response.description,
              response.response.chapters
            )
          );

          dispatch(addBook({ ...book } as any));
          dispatch(selectedBook({ ...book } as any));
        }
      })
    };

    fetChapters();

    return () => {
     
    };

  }, [dispatch, params.id]);

  const closeModal = () => {
    dispatch(isOpenModalChapter());
    dispatch(selectedBook({} as any));
  };

  const unique = `${(new Date()).getMonth()}_${(new Date()).getDay()}_${(new Date()).getMinutes()}_${(new Date()).getMilliseconds()}`

  return (
    <ScrollView>

        <Header title="Chapters" />

        <View style={styles.container}>

          <Card>
            <Card.Title>{book.title}</Card.Title>
            <Card.Divider />
            {book?.chapters?.length !== undefined && book?.chapters?.length > 0 ? book?.chapters?.map((u, i) => {
              return (
                <View key={`${u.id}_${unique}`} style={styles.user}>
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: 'https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb' }}
                  />
                  <Text style={styles.name}>{u?.name}</Text>

                  <View style={{ flexDirection: 'row', gap: 4, marginHorizontal: 10, position: 'absolute', right: 0 }}>
                    <Button size="sm"
                      onPress={() => {
                        dispatch(isOpenModalChapter());
                      }}
                    >Ver
                    </Button>
                  </View>
                </View>
              );
            }) : <Text style={styles.name}>No chapters</Text>}
          </Card>


        </View>
   
      <Dialog
        isVisible={openModalChapter}
        onBackdropPress={() => closeModal()}
      >
        <Dialog.Title title="Dialog Title" />
        <Text>Dialog body text. Add relevant information here.</Text>
      </Dialog>

    </ScrollView>


  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    height: 150,
    backgroundColor: 'white',
  },
});


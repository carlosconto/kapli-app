import React from 'react';
import {
    StyleSheet,
    View,
    Linking,
} from 'react-native';

import { Link, Stack } from 'expo-router';

import { Header as HeaderRNE, Icon } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux'
import { isOpen } from '@/redux/reducers/bookSlice';


type HeaderComponentProps = {
    title: string;
    view?: string;
};

const Header: React.FunctionComponent<HeaderComponentProps> = (props) => {
    const isOpenModal = useSelector((state: any) => state.book.openModal);

    const dispatch = useDispatch();

    return (
        <>
            <HeaderRNE
                leftComponent={{
                    icon: 'menu',
                    color: '#fff',
                }}
                rightComponent={
                    <View style={styles.headerRight}>
                        <Icon name="book" color="white" style={
                            props.title.toLocaleLowerCase() === 'chapters' ? { display: 'none' } : {}}
                            onPress={() => dispatch(isOpen())} />

                        <Link href={"/"}>
                            <Icon name="redo" color="white"
                                style={
                                    props.title.toLocaleLowerCase() !== 'chapters' ? { display: 'none' } : {}
                                }
                            />
                        </Link>
                    </View>
                }
                centerComponent={{ text: props.title, style: styles.heading }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#397af8',
        marginBottom: 20,
        width: '100%',
        paddingVertical: 15,
    },
    heading: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
    },
    subheaderText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Header;
import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';

const ContentItem = (props) => (

    <View style={styles.container}>
        <Image source={props.img} style={styles.imageStyle}/>
        <View style={styles.textContainer}>
            <Text style={styles.titleStyle}>{props.title.toUpperCase()}</Text>
            <Text style={styles.descriptionStyle}>{props.description}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'black',
        width: '100%',
        height: 200,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    imageStyle: {
        flexGrow:1,
        height:null,
        width:null,
        alignItems: 'center',
        justifyContent:'center',
        opacity: 0.5
    },
    textContainer: {
        position: 'absolute',
        bottom: 0,
        padding: 20,
        flexDirection: 'column',
        width: '100%',
    },
    titleStyle: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    }, 
    descriptionStyle: {
        fontFamily: 'sans-serif-light',
        fontSize: 18,
        color: 'white',
        fontWeight: '100'
    }, 
});

export { ContentItem };
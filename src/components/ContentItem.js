import React from 'react'
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native'

const ContentItem = (props) => (

        <TouchableHighlight onPress={props.onPress}>
            <View>

            <View style={styles.container}>
                <Image source={props.article.img} style={styles.imageStyle}/>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.titleStyle}>{props.article.title.toUpperCase()}</Text>
                <Text style={styles.descriptionStyle}>{props.article.description}}</Text>
            </View>

            </View>
        </TouchableHighlight>
)

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'black',
        width: '100%',
        height: 250,
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
        marginTop: -120,
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
})

export { ContentItem }
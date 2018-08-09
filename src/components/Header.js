import React from 'react'
import { Text, View, Image, TouchableNativeFeedback } from 'react-native'

const Header = (props) => {
    
    const { textStyle, imageContainer, imageStyle, viewStyle } = styles

    return (
        <View style={viewStyle}>
            <TouchableNativeFeedback onPress={props.iconPress} useForeground={true}>
                <View style={imageContainer}>
                    <Image source={require('../assets/icons/ic_menu.png')} style={imageStyle} />
                </View>
            </TouchableNativeFeedback>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    )
}

const styles = {

    viewStyle: {
        backgroundColor: '#FFF',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
    },
    textStyle: {
        fontFamily: 'sans-serif-light',
        fontSize: 24,
        paddingLeft:9,
        color: '#EC008C'
    },
    imageContainer: {
        width:72,
        height: 72,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        height: 18,
        width: 18
    }
}

export { Header }

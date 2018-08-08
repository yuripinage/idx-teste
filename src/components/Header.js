import React from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native';

const Header = (props) => {
    const { textStyle, imageStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <TouchableHighlight onPress={props.iconPress} underlayColor='#EC008C50'>
                <Image source={require('../assets/icons/ic_menu.png')} style={imageStyle} />
            </TouchableHighlight>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
};

const styles = {

    viewStyle: {
        backgroundColor: '#FFF',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        padding: 24,
    },
    textStyle: {
        fontFamily: 'sans-serif-light',
        fontSize: 24,
        paddingLeft:15,
        color: '#EC008C'
    },
    imageStyle: {
        height: 18,
        width: 18
    }
};

export { Header };

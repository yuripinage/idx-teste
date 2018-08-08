import React, { Component, PropTypes } from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native'
import { Actions } from 'react-native-router-flux'

class DrawerMenu extends Component {

    render() {
        
        const { container, headerStyle, headerTextStyle, buttonContainer, buttonStyle, buttonTextStyle } = styles

        return (
            <View style={container} >

                <View style={headerStyle}>
                    <Text style={headerTextStyle}>{this.applyLetterSpacing('IDX')}</Text>
                </View>

                <View style={buttonContainer}>
                    <TouchableNativeFeedback useForeground={true} onPress={() => this.goToScene('Home')}>
                        <View style={buttonStyle}>
                            <Text style={buttonTextStyle}>Home</Text>
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback useForeground={true} onPress={() => this.goToScene('Favorites')}>
                        <View style={buttonStyle}>
                            <Text style={buttonTextStyle}>Favorites</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        )
    }

    goToScene = (title) => {
        this.props.closeDrawer()

        if(title === 'Home')
            Actions.home()
        else if(title === 'Favorites')
            Actions.favorites()
        
        
    }

    //o android não possui uma propriedade para espaçamento de letras
    //essa função serve para gerar esse espaçamento artificialmente
    applyLetterSpacing(string, count = 1) {
        return string.split('').join('\u200A'.repeat(count))
    }
    
}

const styles = StyleSheet.create({
    
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        alignContent: 'center',
        justifyContent: 'flex-start',
    },
    
    headerStyle: {
        backgroundColor: '#EC008C',
        flexDirection: 'column',
        width: '100%',
        height: 200,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        marginBottom: 10
    },
    headerTextStyle: {
        fontSize: 32,
        marginLeft: 20,
        color: 'white',
        fontWeight: 'bold'
    },

    buttonContainer: {
        marginTop: '10%',
        width: '100%'
    },
    buttonStyle: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingVertical: 10,
    },
    buttonTextStyle: {
        fontFamily: 'sans-serif-light',
        color: '#434343',
        fontSize: 28,
        paddingLeft: 20
    }
})

export { DrawerMenu }
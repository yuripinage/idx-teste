import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const img00 = require('../assets/images/phone.jpg')
const backIcon = require('../assets/icons/ic_back.png')
const starIcon = require('../assets/icons/ic_star.png')
const starIconPink = require('../assets/icons/ic_star_pink.png')

class Article extends Component {

    render() {

        const txt = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

        return (
            <ScrollView> 
                <View style={styles.container}>


                    <View style={styles.imageContainer}>
                        <Image source={img00} style={styles.imageStyle}/>
                    </View>

                    <View style={styles.headerContainer}>
                        <Text style={styles.titleStyle}>{this.applyLetterSpacing('MY PHONE')}</Text>
                        <Text style={styles.categoryStyle}>devices</Text>
                    </View>

                    <Text style={styles.contentStyle}>{txt}</Text>

                    <View style={styles.iconsContainer}>
                        <Image source={backIcon} style={styles.iconStyle} resizeMode='contain'/>
                        <Image source={starIcon} style={styles.iconStyle} resizeMode='contain'/>
                    </View>

                </View>
            </ScrollView>
        );
    }

    applyLetterSpacing(string, count = 1) {
        return string.split('').join('\u200A'.repeat(count));
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    imageContainer: {
        width: '100%',
        height: 300,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    imageStyle: {
        flexGrow:1,
        height:null,
        width:null,
        alignItems: 'center',
        justifyContent:'center'
    },

    iconsContainer: {
        position: 'absolute',
        top: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    iconStyle: {
        height:24,
        // width:40,
    },

    headerContainer: {
        padding: 24,
        flexDirection: 'column',
        width: '100%',
    },
    titleStyle: {
        fontSize: 22,
        color: '#434343',
        fontWeight: 'bold'
    }, 
    categoryStyle: {
        fontSize: 20,
        color: '#EC008C'
    }, 
    contentStyle: {
        fontFamily: 'sans-serif-light',
        fontSize: 22,
        lineHeight: 44,
        paddingHorizontal: 20,
        color: '#434343'
    }, 
});

export default Article
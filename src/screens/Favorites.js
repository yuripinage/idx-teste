import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PinkBar, ContentItem} from '../components'

const imgPhone = require('../assets/images/phone.jpg');
const imgApp = require('../assets/images/app.jpg');
const imgDashboard = require('../assets/images/dashboard.jpg');

class Favorites extends Component {

    render() {

        return (
            <View style={styles.container}>
               <ContentItem img={imgPhone} title='My Phone' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'/>
            </View>
        );
    }    

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
    }
});

export default Favorites
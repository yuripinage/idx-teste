import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const PinkBar = (props) => (

    <View style={styles.container}>
        <Text style={styles.textStyle}>{props.title}</Text>
    </View>
)

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#EC008C',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'flex-start',
        padding: 5,
    },

    textStyle: {
        fontSize: 18,
        marginLeft: 20,
        color: 'white',
        fontWeight: 'bold'
    }
})

export { PinkBar }
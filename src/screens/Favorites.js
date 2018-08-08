import React, { Component } from 'react'
import { View, StyleSheet, BackHandler, AsyncStorage, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import SideMenu from 'react-native-side-menu'
import { ContentItem, Header, DrawerMenu } from '../components'
import { artigos } from '../Artigos'

class Favorites extends Component {

    constructor(props) {
        super(props)
        
        this.favorites = []

        this.state = { 
            toggle: () => {this.setState({ isOpen: !this.state.isOpen })},
            menuState: (isOpen) => {this.setState({ isOpen })},
        }
    }

    render() {

        const { toggle, menuState, isOpen } = this.state

        return (
            <SideMenu
                menu={<DrawerMenu closeDrawer={toggle.bind(this)} />}
                isOpen={isOpen}
                onChange={(isOpen) => menuState}
                openMenuOffset={300}
                disableGestures={false}
                >

                <Header iconPress={toggle.bind(this)} headerText='Favorites' />

                {this.favorites.length > 0 
                ?
                <View style={styles.container}>
                    <ContentItem
                        article={artigos[0]}
                        onPress={() => Actions.article({ articleNum: 0 })}
                        />
                </View>
                :
                <View style={styles.container}/>
                }
            </SideMenu>
        )
    }    

    getFavoriteList = async () => {
        try {
            const value = await AsyncStorage.getItem('favorites');

            if (value) {
                // We have data!!
            }
            else {
                Alert.alert('teste00')
            }
        } catch (error) {
            this.favorites = []
        }
    }

    componentWillMount() {
        this.getFavoriteList()
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
    }

    handleBackButton() {
        return true
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
    }
})

export default Favorites
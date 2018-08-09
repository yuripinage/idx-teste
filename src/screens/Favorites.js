import React, { Component } from 'react'
import { View, StyleSheet, BackHandler, AsyncStorage, Alert, ScrollView, Image, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import SideMenu from 'react-native-side-menu'
import { ContentItem, Header, DrawerMenu } from '../components'
import { artigos } from '../Artigos'

const dbz = require('../assets/images/dbz.jpg')

class Favorites extends Component {

    constructor(props) {
        super(props)

        this.state = { 
            toggle: () => {this.setState({ isOpen: !this.state.isOpen })},
            menuState: (isOpen) => {this.setState({ isOpen })},
            favoritesIndex: [],
            loading: true
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
    
    
                <View style={styles.container}>
                    {
                        this.state.loading
                        ?
                        <View/>
                        :
                        this.handleList()
                    }
                </View>

            </SideMenu>
        )
    }

    handleList = () => {

        const { contentContainer, failContainer, failImageStyle, failTextStyle } = styles

        if (this.state.favoritesIndex.length === 0) {
            return (
                <View style={failContainer}>
                    <Image source={dbz} style={failImageStyle} resizeMode='contain' />
                    <Text style={failTextStyle}>Opa! Você não tem artigos favoritos...</Text>
                </View>
            )
        }

        return (
            <ScrollView>
                <View style={contentContainer}>
                    {this.renderList()}
                </View>
            </ScrollView>
        )
    }

    //para cada índice salvo, renderiza o componente com o artigo correspondente a ele
    renderList = () => {

        const { favoritesIndex } = this.state

        return favoritesIndex.map(item =>
            <ContentItem 
                key={item}
                article={artigos[item]} 
                onPress={() => Actions.article({ articleNum: item, fromFavorites: true })}
                />
        )        
    }

    //pega os índices dos artigos favoritados e salva no estado do componente em ordem crescente
    //improvisei uma mensagenzinha caso não haja favoritos só pra não ficar a tela em branco
    getFavoriteList = async () => {
        try {
            const value = await AsyncStorage.getItem('favorites')

            if (value) {

                const data = JSON.parse(value)

                const favSorted = data.sort((a, b) => a - b)

                this.setState({ favoritesIndex: favSorted, loading: false })
            }
            else
                Alert.alert('ERRO', 'Erro ao carregar artigos favoritos!')

        } catch (error) {
            console.log(error)
            Alert.alert('ERRO', 'Erro ao carregar artigos favoritos!')
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
        this.getFavoriteList()
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
        backgroundColor: 'white'
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
    },

    failContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        alignSelf: 'center'
    },
    failImageStyle: {
        height: 250,
        padding: 20
    },
    failTextStyle:{
        fontFamily: 'sans-serif-light',
        color: '#434343',
        padding: 20,
        fontSize: 20,
    }
})

export default Favorites
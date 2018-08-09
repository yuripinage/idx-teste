import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, AsyncStorage, TouchableWithoutFeedback, Alert, BackHandler } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { artigos } from '../Artigos'

const backIcon = require('../assets/icons/ic_back.png')
const starIcon = require('../assets/icons/ic_star.png')
const starIconPink = require('../assets/icons/ic_star_pink.png')

class Article extends Component {

    constructor(props) {
        super(props)

        this.state = { 
            isFavorite: false,
            favoriteList: []
        }
    }

    render() {

        const { 
            container,
            imageContainer, imageStyle,
            headerContainer, titleStyle, categoryStyle,
            contentStyle,
            iconsContainer, iconStyle } = styles

        const currentArticle = artigos[this.props.articleNum]
        
        const txt = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        
        return (
            <ScrollView> 
                <View style={container}>

                    <View style={imageContainer}>
                        <Image source={currentArticle.img} style={imageStyle}/>
                    </View>

                    <View style={headerContainer}>
                        <Text style={titleStyle}>{this.applyLetterSpacing(currentArticle.title.toUpperCase())}</Text>
                        <Text style={categoryStyle}>{currentArticle.category}</Text>
                    </View>

                    <Text style={contentStyle}>{txt}</Text>

                    <View style={iconsContainer}>
                        <TouchableWithoutFeedback onPress={() => this.handleGoBack()}>
                            <Image source={backIcon} style={iconStyle} resizeMode='contain'/>
                        </TouchableWithoutFeedback>
                        
                        <TouchableWithoutFeedback onPress={() => this.setFavorite()}>
                            <Image 
                                source={this.state.isFavorite ? starIconPink : starIcon}
                                style={iconStyle} resizeMode='contain'
                                />
                        </TouchableWithoutFeedback>
                    </View>

                </View>
            </ScrollView>
        )
    }

    //vai checar se já é um artigo favorito e fazer a devida manipulação no storage
    setFavorite = async () => {

        let data = this.state.favoriteList

        const { articleNum } = this.props

        const alreadyFavorite = data.some(item => item === articleNum)

        if(!alreadyFavorite)
            data.push(this.props.articleNum)
        else
            data = data.filter(item => item !== articleNum)

        try {
            await AsyncStorage.setItem('favorites', JSON.stringify(data))
            this.setState({ isFavorite: !alreadyFavorite, favoriteList: data })
            } catch (error) {
            Alert.alert('ERRO', 'Erro ao salvar artigo favorito!')
        }

    }

    //vai pegar a lista de favoritos atual para fazer as devidas manipulações
    getFavoriteList = async () => {

        try {
            const value = await AsyncStorage.getItem('favorites')

            if (value) {

                const data = JSON.parse(value)

                const alreadyFavorite = data.some(item => item === this.props.articleNum)

                this.setState({favoriteList: data, isFavorite: alreadyFavorite})
            }
            else
                Alert.alert('ERRO', 'Erro ao carregar artigos favoritos!')  

        } catch (error) {
            this.favorites = []
            Alert.alert('ERRO', 'Erro ao carregar artigos favoritos!')
        }
    }

    //para atualizar a tela de favoritos (caso vá voltar pra ele), é preciso chamar sua Action respectiva
    //pois o pop() mantém o último estado salvo antes de vir para a tela de artigo
    //ou seja, se eu desfavoritei o artigo e voltasse pelo pop() ele ainda continuaria disponível na tela de favoritos 
    handleGoBack = () => {

        if(this.props.fromFavorites)
            Actions.favorites()
        else
            Actions.pop()
    }

    componentWillMount() {
        this.getFavoriteList()
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleGoBack)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleGoBack)
    }
    
    //o android não possui uma propriedade para espaçamento de letras
    //essa função serve para gerar esse espaçamento artificialmente
    applyLetterSpacing(string, count = 1) {
        return string.split('').join('\u200A'.repeat(count))
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
})

export default Article
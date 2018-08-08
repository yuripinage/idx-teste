import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, AsyncStorage, TouchableWithoutFeedback, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { artigos } from '../Artigos'

const backIcon = require('../assets/icons/ic_back.png')
const starIcon = require('../assets/icons/ic_star.png')
const starIconPink = require('../assets/icons/ic_star_pink.png')
const giphy = require('../assets/images/giphy.gif')

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
            contentStyle, gifStyle,
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

                    <View style={imageContainer}>
                        <Image source={giphy} style={gifStyle} resizeMode='contain'/>
                    </View>

                    <View style={iconsContainer}>
                        <TouchableWithoutFeedback onPress={() => Actions.pop()}>
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

    setFavorite = () => {

        // let data = this.state.favoriteList
        // const { articleNum } = this.props

        // const isNewFavorite = data.some(e => e === articleNum)

        // if(isNewFavorite)
        //     data.push(this.props.articleNum)
        // else
        //     data = data.filter(e => e !== articleNum)

        // console.log(data)
        // this.setState({ isFavorite: isNewFavorite, favoriteList: data })

        // AsyncStorage.setItem('favorites', JSON.stringify(data))
        // .then(
        //     this.setState({ isFavorite: isNewFavorite, favoriteList: data })
        // )

        // try {
        //     await AsyncStorage.setItem('favorites', JSON.stringify(arr))

        //     } catch (error) {
        //     Alert.alert('ERRO', 'Erro ao salvar artigo favorito!')
        // }


    }

    getFavoriteList = async () => {
        try {
            const value = await AsyncStorage.getItem('favorites')

            if (value) {

                const arr = JSON.parse(value)
                this.setState({favoriteList: arr})
                console.log(arr[0])

            }
        } catch (error) {
            this.favorites = []
        }
    }

    componentWillMount() {
        this.getFavoriteList()
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
    gifStyle: {
        width:'100%',
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
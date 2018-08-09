import React, { Component } from 'react'
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager'
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'

const leftArrowImg = require('../assets/icons/arrow_left.png')
const rightArrowImg = require('../assets/icons/arrow_right.png')

class ContentItem extends Component {

    constructor(props) {
        super(props)

        this.state = { currentPage: 0 }
    }

    render() {

        const { article, onPress } = this.props
        const { iconContainer, iconStyle, textContainer, titleStyle, descriptionStyle } = styles

        const leftArrowStyle = [iconContainer, {left: 0, justifyContent: 'flex-start'}]
        const rightArrowStyle = [iconContainer, {right: 0, justifyContent: 'flex-end'}]
        
        return(
            <View>
            
                {this.renderImages()}

                {
                    this.state.currentPage > 0
                    ?
                    <TouchableHighlight
                        onPress={() => this.setCurrentPage(-1)}
                        underlayColor='transparent'
                        style={leftArrowStyle}
                        >
                        <Image source={leftArrowImg} style={iconStyle}/>
                    </TouchableHighlight>
                    :
                    <View/>
                }

                {
                    this.state.currentPage < 2
                    ?
                    <TouchableHighlight
                        onPress={() => this.setCurrentPage(1)}
                        underlayColor='transparent'
                        style={rightArrowStyle}
                        >
                        <Image source={rightArrowImg} style={iconStyle}/>
                    </TouchableHighlight>
                    :
                    <View/>
                }
                
                <TouchableHighlight onPress={onPress} underlayColor='transparent' style={textContainer}>
                    <View>
                        <Text style={titleStyle}>{article.title.toUpperCase()}</Text>
                        <Text style={descriptionStyle}>{article.description}</Text>
                    </View>
                </TouchableHighlight>

            </View>
        )
    }

    //aqui é renderizado um slide repetindo a foto do artigo
    //para navegar entre eles é preciso clicar nas arrows
    renderImages = () => {

        const { article, onPress } = this.props
        const { container, imageStyle } = styles

        return (
            <IndicatorViewPager 
                style={{height:250}}
                horizontalScroll={false}
                ref={(viewpager) => {this.viewpager = viewpager}}
                > 

                    <View>
                        <TouchableHighlight onPress={onPress}>
                            <View style={container}>
                                <Image source={article.img} style={imageStyle}/>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View>
                        <TouchableHighlight onPress={onPress}>
                            <View style={container}>
                                <Image source={article.img} style={imageStyle}/>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View>
                        <TouchableHighlight onPress={onPress}>
                            <View style={container}>
                                <Image source={article.img} style={imageStyle}/>
                            </View>
                        </TouchableHighlight>
                    </View>

            </IndicatorViewPager>
        )
    }

    //aqui faz o gerenciamento do clique nas arrows
    //caso o usuário não possa mover o swipe para um lado específico, a arrow correspondente some 
    setCurrentPage = (amount) => {

        const target = this.state.currentPage + amount

        if(target > 2 || target < 0)
            return

        this.viewpager.setPage(target)
        this.setState({ currentPage: target })
    }
    
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'black',
        width: '100%',
        height: 250,
        alignItems: 'stretch',
        justifyContent: 'center'
    },

    imageStyle: {
        flexGrow:1,
        height:null,
        width:null,
        alignItems: 'center',
        justifyContent:'center',
        opacity: 0.5
    },

    iconContainer: {
        position:'absolute',
        top: 50, 
        flexDirection: 'row',
        alignItems: 'center',
        width: 50,
        padding: 10
    },
    iconStyle: {
        width: 50,
        height: 50
    },

    textContainer: {
        marginTop: -120,
        padding: 20,
        flexDirection: 'column',
        width: '100%',
    },
    titleStyle: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    }, 
    descriptionStyle: {
        fontFamily: 'sans-serif-light',
        fontSize: 18,
        color: 'white',
        fontWeight: '100'
    }, 
})

export { ContentItem }
import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, BackHandler, AsyncStorage, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import SideMenu from 'react-native-side-menu'
import { PinkBar, ContentItem, Header, DrawerMenu } from '../components'
import { artigos } from '../Artigos'

//Yuri Alexandre Pinagé Ribeiro
//yuripinage@gmail.com
//(85) 9-9950-6356

class Home extends Component {

    constructor(props) {
        super(props)

        //states necessários para gerenciar o componente SideMenu
        this.state = { 
            toggle: () => {this.setState({ isOpen: !this.state.isOpen })},
            menuState: (isOpen) => {this.setState({ isOpen })}
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

                <Header iconPress={toggle.bind(this)} headerText='Home' />

                <ScrollView>
                    <View style={styles.container}>

                        <PinkBar title='devices'/>

                        <ContentItem 
                            article={artigos[0]}
                            onPress={() => Actions.article({ articleNum: 0 })}
                            />

                        <PinkBar title='applications'/>

                        <ContentItem 
                            article={artigos[1]}
                            onPress={() => Actions.article({ articleNum: 1 })}
                            />

                        <ContentItem 
                            article={artigos[2]}
                            onPress={() => Actions.article({ articleNum: 2 })}
                            />
                    
                    </View>
                </ScrollView>
            </SideMenu>
        )
    }

    //vai criar um campo no storage para os artigos favoritos, caso ainda não exista algum
    checkStorage = async () => {
        try {
            const value = await AsyncStorage.getItem('favorites')

            if (value) {
                console.log('OK!')
            }
            else {
                try {
                    await AsyncStorage.setItem('favorites', JSON.stringify([]))
                    console.log('Novo item salvo!')
                }catch (error) {
                    console.log(error)
                    Alert.alert('ERRO', 'Erro ao salvar artigo favorito!')
                }
            }
        } catch (error) {
            console.log(error)
            Alert.alert('ERRO', 'Erro ao tratar storage.')
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
        this.checkStorage()
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    }
})

export default Home
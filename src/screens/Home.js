import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, BackHandler } from 'react-native'
import { Actions } from 'react-native-router-flux'
import SideMenu from 'react-native-side-menu'
import { PinkBar, ContentItem, Header, DrawerMenu } from '../components'
import { artigos } from '../Artigos'

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = { 
            toggle: () => {this.setState({ isOpen: !this.state.isOpen })},
            menuState: (isOpen) => {this.setState({ isOpen })}
        }
    }

    render() {

        const { toggle, menuState, isOpen } = this.state;

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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    }
})

export default Home
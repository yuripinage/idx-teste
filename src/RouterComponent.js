import React from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Home from './screens/Home'
import Article from './screens/Article'
import Favorites from './screens/Favorites'

//router-flux é uma biblioteca para navegação que eu gosto de usar mais simples

const RouterComponent = () => {
    return (
        <Router >
            <Scene key="root" hideNavBar={true}>
                <Scene key="home" component={Home} title="Home" initial/>
                <Scene key="article" component={Article} title="Article"  />
                <Scene key="favorites" component={Favorites} title="Favorites" />
            </Scene>
        </Router>
    )
}

export default RouterComponent

const imgPhone = require('./assets/images/phone.jpg')
const imgApp = require('./assets/images/app.jpg')
const imgDashboard = require('./assets/images/dashboard.jpg')

//esse objeto servirá para guardar os dados dos artigos em só lugar
//assim não é preciso repetir essa mesma estrutura em todas as telas

const artigos = [
    {
        title: 'My Phone',
        img: imgPhone,
        category: 'devices',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        title: 'My App',
        img: imgApp,
        category: 'applications',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        title: 'My Dashboard',
        img: imgDashboard,
        category: 'applications',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
]

export {artigos}
// 'trae' es una librería que aprovecha la nueva Fetch API, más potente que XMLHttpRequest 
import trae from 'trae'
import configService from './config.js'

const shoppingCartService = trae.create({
    baseUrl: configService.apiUrl
})

export default shoppingCartService
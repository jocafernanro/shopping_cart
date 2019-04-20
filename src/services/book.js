import shoppingCartService from './shopping-cart'

const bookService = {}

bookService.search = function (q, page, limit) {
    // eslint-disable-next-line
    return shoppingCartService.get('/products',{ 
        params: {title_like: q, _page: page, _limit: limit} 
    })
    .then((res) => res.data)
}


export default bookService
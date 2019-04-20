export default {
    name: 'BookCard',
    
    props: {
      book: {type: Object},       // component book
    },

    data () {
      return {
        selectQuantity  : false,  // shows a modal to choose the number of books to add
        quantity        : 1,      // variable that collects the number of books to add
        prices          : [],     // stores all available book prices
        chosenPrice     : ''      // the price chosen from the user
      }
    },

    // when component is created gets all the available book prices from a given string
    created: function () {
      this.getsAllPrices()
    },
  
    methods: {
      // event emitted to the parent to add a book to the cart
      addBookToCart () {
        this.selectQuantity = false
        // eslint-disable-next-line no-useless-escape
        // let regex = /\$((?:\d|\,)*\.?\d+)/g

        this.$emit('bookToCart', this.book, this.quantity, this.chosenPrice)
        this.quantity = 1
      },

      // activates selectQuantity property to display the quantity selection modal
      quantitySelection () {
        this.selectQuantity = true
      },

      // close the quantity selection modal
      quantitySelected () {
        this.selectQuantity = false
      },

      // sets the chosen quantity from the user to send it to the parent
      setQuantity () {
        this.quantity = this.$refs['book-quantity-select'].value
      },

      // increase quantity to send it to the parent
      increaseQuantity () {
        this.quantity += 1
      },

      // reduce quantity to send it to the parent
      reduceQuantity () {
        this.quantity = this.quantity < 2 ? 1 : this.quantity - 1
      },

      // gets the prices from the text and separes it when comes some books versions
      getsAllPrices () {
        this.prices = this.book.price.split("\n")
        this.chosenPrice = this.prices[0]
      },

      // gets the price chosen by the user
      selectPrice (price) {
        this.chosenPrice = price
      }
    }
  
  }
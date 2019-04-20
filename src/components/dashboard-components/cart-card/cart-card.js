import { OperationEnum } from "../../../../js/vars"

export default {
    name: 'Cart',

    components: {
      OperationEnum
    },
  
    props: {
      book: {type: Object},   // component book
    },
  

    data () {
      return {
        OperationEnum: OperationEnum
      }
    },

    methods: {
      // event emitted to the parent for book removing
      removeBookFromCart () {
        this.$emit('removeFromCart', this.book)
      },

      // change the number of units in a book to buy
      modifyQuantity (operation) {
        this.$emit('modifyQuantity', this.book, operation)
      },

      // sends to the parent the quantity value changed from the cart item
      updateQuantity () {
        this.$emit('updateQuantity', this.book, this.$refs[`book-in-cart-${this.book.id}`].value)
      }
    }
  
  }
// Services
import bookService from "../services/book";

// Owns components
import BookCard from "./dashboard-components/book-card/BookCard.vue";
import CartCard from "./dashboard-components/cart-card/CartCard.vue";

// Components using third parties libs
import SkeletonLoading from "./shared/skeleton-loading/SkeletonLoading.vue";
import SpinnerLoading from "./shared/spinner-loading/SpinnerLoading.vue";

// Vars & Const
import { OperationEnum, mobileWidth } from "../../js/vars"

export default {
  name: "Dashboard",

  components: {
    BookCard,                 // book card to list
    CartCard,                 // item from the cart card
    SkeletonLoading,          // skeleton component when loading
    SpinnerLoading,           // spinner search component when loading
    OperationEnum
  },

  props: {
    window: Object,
  },

  data() {
    return {
      books           : [],     // server response data
      searchQuery     : "",     // query from the user
      booksToBuy      : [],     // books added to the cart
      showCart        : false,  // display the cart on mobile
      isLoading       : false,  // feedback to the user when search
      itemsInTheCart  : 0,      // count the number of items in the cart
      isZoomAnimated  : false,  // animates the cart items total bubble
      totalPrice      : 0,      // calculate the total of the cart
      OperationEnum   : OperationEnum // enum for the management of cart operations
    };
  },

  computed: {
    // checks is the viewport is a mobile
    isMobile: function() {
      return this.window.width <= mobileWidth ? true : false;
    },

    // retrieve the total results from the search
    totalResults: function() {
      return this.books.length;
    }
  },

  watch: {
    // gets new books from the user input each time user type on it
    searchQuery(newVal) {
      this.getBooks(newVal);
    },

    // when it is mobile the cart is displayed, otherwise, no
    isMobile(newVal) {
      this.showCart = newVal ? false : true;
    }
  },

  methods: {
    // returns the list of books based on the user's search
    // ** He puesto un timeout a posta para que se puedan apreciar los components
    // que trabjan cuando se está realizando la búsqueda
    getBooks() {
      this.books = [];
      this.isLoading = true;

      bookService.search(this.searchQuery).then(res => {
        setTimeout(() => (this.isLoading = false), 1000)
        this.books = res.map(function(book) {
          book.quantity = 0
          return book
        });
      });
    },

    // animates the cart items total bubble
    animate() {
      this.isZoomAnimated = true;
      setTimeout(() => (this.isZoomAnimated = false), 1000);
    },

    // add the book selected to the cart
    addBookToCart(book, quantity, price) {
      const bookExistsInTheCart = index => index != -1
      const index = this.booksToBuy.findIndex(e => e.id === book.id);

      bookExistsInTheCart(index)
        ? ( book.quantity += quantity, this.modifyBookQuantityFromCart(index, book))
        : ( book.quantity = quantity, book.price = price, this.booksToBuy.push(book))

      this.updateData()
      this.animate();
    },

    // updates the cart book quantity
    modifyBookQuantityFromCart(index, book) {
      this.$nextTick(function (){
        this.booksToBuy.splice(index, 1, book);
      })
    },

    // removes book from the cart list
    removeBookFromCart(book) {
      const bookExistsInTheCart = index => index != -1
      const index = this.booksToBuy.findIndex(e => e.id === book.id);
      
      if (bookExistsInTheCart(index)) {
        book.quantity = 0;
        this.booksToBuy[index] = book;
        this.booksToBuy.splice(index, 1);
      }

      this.updateData()
      this.animate();
    },

    // show or hide the cart container
    toggleCart() {
      this.showCart = !this.showCart;
    },

    // event emitted from the child to update the cart book quantity
    modifyQuantity(book, operation, quantity = 0) {
      const index = this.booksToBuy.findIndex(e => e.id === book.id);

      if (operation == this.OperationEnum.increase) {
        book.quantity += 1
      } 
      else if (operation == this.OperationEnum.reduce) {
        book.quantity = book.quantity < 2 ? 1 : book.quantity - 1
      }
      else if (operation == this.OperationEnum.set) {
        book.quantity = quantity
      }
       
      this.modifyBookQuantityFromCart(index, book);
      this.updateData()
    },

    // checks and updates the var that contains the total items in the cart
    checkCartQuantity() {
      this.itemsInTheCart = this.booksToBuy.reduce(function(sum, book) {
        return sum + book.quantity;
      }, 0);
    },

    // calculates the total cost from the cart
    calculateTotalPrice() {
      this.totalPrice = 0;
      // eslint-disable-next-line
      let regex = /((?:\d|\,)*\.?\d+)/g

      if (this.booksToBuy.length == 0) { return }

      for (let book of this.booksToBuy) {
        let price = parseFloat(book.price.match(regex))
        this.totalPrice += book.quantity * price;
      }
      this.totalPrice = this.totalPrice.toFixed(2)
    },

    // clean the cart when buy the items
    buy() {
      this.booksToBuy = [];
      this.updateData()
    },

    // event emitted from child when the quantity input changes before add it to cart.
    updateQuantity (book, quantity) {
      this.modifyQuantity(this.OperationEnum.set, book, quantity)
    },

    updateData () {
      this.checkCartQuantity();
      this.calculateTotalPrice();
    }
  }
};

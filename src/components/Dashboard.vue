<template lang="pug">
  .container
    .row.no-gutters.nav-container
      .col.col-xs-12.col-md-1
        img#avatar(src="../assets/avatar.png")
      
      .col.col-xs-12.col-md-8
        h1#dashboard-title Hey, ¿Qué tal?
        h2#dashboard-subtitle ¿Te apetece comprar algo? :) 
          transition(name="fade")
            span.total-resultados(v-show="totalResults == 0 ? false : true") total: {{ totalResults }}

      .col.col-sm-12
        div.search-container
          input#search-book-input(type="text", placeholder="Busca tu libro :)", v-model="searchQuery")
          button#search-input-button(type="button", @click="getBooks()", v-show="!isLoading")
              i.material-icons search
          button#search-input-button(v-show="isLoading")
              SpinnerLoading

    // Items and cart containers
    .row.main-container
      // Books container
      .col-sm-12.col-lg-7.books-container 
        SkeletonLoading.skeleton-container(v-show="isLoading")

        transition(name="fade")
          .book-cart-container(v-show="!isLoading")
            transition-group(name="fade" mode="out-in")
              BookCard(
                v-for="b in books",
                :book="b",
                :key="b.id",
                @bookToCart="addBookToCart",
              )

            .empty-books(v-show="totalResults == 0 ? true : false")
              span Realiza una búsqueda para encontrar tus libros favoritos ^^

      // Shopping cart container
      .modal-mask(v-show="showCart && isMobile", @click="toggleCart")
      .col-sm-12.col-lg-5.cart-container(v-show="isMobile ? showCart : true")
        .cart-body
          h1.cart-title Carrito
          button.cart-close-button(type="button", v-show="isMobile", @click="toggleCart")
            i.material-icons close
          button.shopping-cart-button(type="button", 
              v-show="itemsInTheCart == 0 ? false : true"
              @click="buy") COMPRAR Libros: {{ itemsInTheCart }} Total($): {{ totalPrice }}
            i.material-icons.shopping-cart-icon shopping_cart
          
          
          .cart-cards-container
            CartCard(
              v-for="b in booksToBuy",
              :book="b",
              :key="b.id",
              @removeFromCart="removeBookFromCart",
              @modifyQuantity="modifyQuantity",
              @updateQuantity="updateQuantity"
            )
            .empty-cart(v-show="itemsInTheCart == 0 ? true : false")
              span No hay ítems en tu carrito! :(
              span <-- ¡Compra alguno! :D


    button#shopping-cart-button(type="button", v-show="isMobile", @click="toggleCart")
      .notification(:class="isZoomAnimated ? 'zoom-animation' : ''") {{ itemsInTheCart }}
      i.material-icons shopping_cart
      
        
</template>

<script src="./dashboard.js"></script>
<style src='./dashboard.css' scoped></style>

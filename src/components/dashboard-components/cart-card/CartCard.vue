<template lang="pug">

    .cart-card-container.slide-in-blurred-left
      .cart-card 
        button.card-delete-button(
          type="button", 
          @click="removeBookFromCart"
          )
          i.material-icons delete

        .card-image-container
          img.card-image(:src="book.image")
        
        .card-quantity
          button.card-quantity-button(type="button", @click="modifyQuantity(OperationEnum.increase)")
            i.material-icons add
          input#card-quantity-input.card-quantity-input(
            type="text", 
            :value="book.quantity",
            :ref="`book-in-cart-${book.id}`",
            @change="updateQuantity"
            )
          button.card-quantity-button(type="button",  @click="modifyQuantity(OperationEnum.reduce)")
            i.material-icons remove

        .card-info
          span.card-title {{ book.title }}
          span.card-description {{ book.description }}

          span.card-price {{ book.price }}
  
</template>

<script src="./cart-card.js"></script>
<style src="./cart-card.css" scoped></style>

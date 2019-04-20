<template lang="pug">

    .card-container
        button.floating-button(type="button", @click="quantitySelection")
            i.material-icons add

        .row.book-card.no-gutters
            .card-image-block
                .card-image-container
                    img.card-image(:src="book.image")
            .col.col-xs-9.card-info-container
                h6.card-label.align-middle LECTURA
                h4.card-title.align-middle {{ book.title }} 
                h5.card-description.align-middle {{ book.description }}
                span.card-prices-container
                    span.card-price(
                        v-for="(price, index) of prices", 
                        @click="selectPrice(price)",
                        :ref="`price-${index}`",
                        :class="{active: chosenPrice == price}"
                        ) {{ price }}
                            

        .select-quantity-mask(v-show="selectQuantity")
        .select-quantity-modal(v-show="selectQuantity")
            .select-quantity-button-container.scale-up-ver-top
                button.increase-quantity-button(type="button", @click="increaseQuantity")
                    i.material-icons.increase-quantity-icon add

                input.indicate-quantity-input(
                    type="text", :value="quantity", 
                    ref="book-quantity-select"
                    @change="setQuantity")

                button.reduce-quantity-button(type="button", @click="reduceQuantity")
                    i.material-icons.reduce-quantity-icon remove

            
            .select-cancel-quantity-button-container    
                button.select-quantity-cancel-button.jello-horizontal(type="button", @click="quantitySelected") cancelar
                    i.material-icons clear
                
                button.select-quantity-ok-button.jello-horizontal(type="button", @click="addBookToCart") aceptar
                    i.material-icons check


</template>

<script src="./book-card.js"></script>

<style src= "./book-card.css" scoped></style>

import { shallowMount } from '@vue/test-utils'
import BookCard from '@/components/dashboard-components/book-card/BookCard'

describe('BookCard.vue', () => {
  it('renders props.msg when passed', () => {

    const wrapper = shallowMount(BookCard, {
      propsData: { 
        book: {
          title: 'Test title',
          descripion: 'Test description',
          price: 'Test price',
          image: 'https://images-na.ssl-images-amazon.com/images/I/61yOml3L32L._AC_SR201,266_.jpg',
          quantity: '0'
        }
       }
    })

    expect(wrapper.increaseQuantity)
  })
})

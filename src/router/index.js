import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../components/MainLayout.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Menu from '../views/Menu.vue'
import Contact from '../views/Contact.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import OrderConfirmation from '../views/OrderConfirmation.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'about',
        name: 'About',
        component: About
      },
      {
        path: 'menu',
        name: 'Menu',
        component: Menu
      },
      {
        path: 'contact',
        name: 'Contact',
        component: Contact
      },
      {
        path: 'cart',
        name: 'Cart',
        component: Cart
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: Checkout
      },
      {
        path: 'order-confirmation',
        name: 'OrderConfirmation',
        component: OrderConfirmation
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


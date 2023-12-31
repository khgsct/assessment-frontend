import { createRouter, createWebHistory } from 'vue-router'
import AuthView from "@/views/auth/AuthView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/product/ProductView.vue')
    },
    {
      path: '/products/:id',
      name: 'product-details',
      component: () => import('../views/product/ProductDetailsView.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/cart/CheckoutView.vue')
    },
    {
      path: '/thank-you',
      name: 'checkout-complete',
      component: () => import('../views/cart/CheckoutCompleteView.vue')
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: AuthView },
  ]
})

export default router

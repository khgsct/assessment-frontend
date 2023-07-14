import type { CartSummaryResponse } from "@/models";
import { http } from "./base";

export const cart = () => {
    return {
        getCartSummary: (): Promise<CartSummaryResponse> => {
            return http().get('/api/v1/carts')
                .then(response => response.data)
        },
        updateCart: (productId: string, quantity: number): Promise<void> => {
            return http().put('/api/v1/carts', { productId, quantity })
                .then(response => response.data)
        },
        removeCartItem: (cartItemId: string): Promise<void> => {
            return http().delete('/api/v1/carts/' + cartItemId)
                .then(response => response.data)
        }
    }
}

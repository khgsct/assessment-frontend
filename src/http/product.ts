import type { ProductResponse } from "@/models"
import { http } from "./base"

export const product = () => {
    return {
        listing: (): Promise<ProductResponse[]> => {
            return http(false).get('/api/v1/products')
                .then(response => response.data)
        },
        details: (productId: string): Promise<ProductResponse> => {
            return http().get(`/api/v1/products/${productId}`)
                .then(response => response.data)
        }
    }
}

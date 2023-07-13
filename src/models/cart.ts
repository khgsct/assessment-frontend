export type CartCreationRequest = {
    productId: string,
    quantity: number
}

export type CartResponse = {
    id: string,
    productId: string,
    productName: string,
    productPrice: number,
    quantity: number,
    totalPrice: number
}

export type CartSummaryResponse = {
    cartDetails: CartResponse[],
    totalPrice: number
}


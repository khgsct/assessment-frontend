export type ProductResponse = {
    id: string,
    name: string,
    price: number
}

export type ProductDetailsResponse = {
    description: string
} & ProductResponse
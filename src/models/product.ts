import type { FileResponse } from "."

export type ProductResponse = {
    id: string,
    name: string,
    price: number,
    pictures: PictureProduct[]
}

export type ProductDetailsResponse = {
    description: string
} & ProductResponse

export type PictureProduct = {
    file: FileResponse
}

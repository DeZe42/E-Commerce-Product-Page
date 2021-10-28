export interface Product {
    id: number,
    companyName: string,
    productName: string,
    description: string,
    currency: string,
    price: number,
    discount: boolean,
    discountPercentage: number,
    originalPrice: number,
    images: Images[]
}

export interface Images {
    id: number,
    name: string,
    imageUrl: string,
    imageUrlThumb: string
}
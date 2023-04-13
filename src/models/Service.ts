export interface Service {
    id: string,
    name: string,
    price: number,
    description: string,
    rate: string
}

export interface ServiceWithoutID {
    name: string,
    price: number,
    description: string,
    rate: string
}
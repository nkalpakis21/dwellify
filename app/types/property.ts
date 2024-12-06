import { UUID } from 'crypto'
import { serverTimestamp } from 'firebase/firestore'
export type IPropertyForm = {
    description: string
    address: string
    price: number
    propertyType: string
    type: 'SALE' | 'RENT'
}

export type IPropertyFormRequest = {
    description: string
    address: string
    price: number
    propertyType: string
    type: 'SALE' | 'RENT'
    listedBy: string,
}

export type IProperty = {
    id: UUID,
    description: string
    address: string
    price: number
    propertyType: string
    type: 'SALE' | 'RENT'
    listedBy: string, // Replace with actual user ID when auth is implemented
    createdAt: ReturnType<typeof serverTimestamp>;
    updatedAt: ReturnType<typeof serverTimestamp>; 
    images: []
}
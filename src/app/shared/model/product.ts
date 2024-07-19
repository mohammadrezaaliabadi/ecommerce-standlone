export interface IProduct{
    productId: number;
    unitPrice: number;
    brandId: number;
    categoryId: number;
    title: string;
    sku: string;
    description: string;
    categoryName: string;
    brandName: string;
    imageUrl: string;
}

export interface IBrand{
    brandId:number;
    brandName:string;
}

export interface ICategory {
    categoryId: number;
    categoryName: string;
}
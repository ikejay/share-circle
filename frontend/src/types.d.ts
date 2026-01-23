export interface IProduct {
  id: number
  name: string
  productCode: string
  description: string
  imageUrl: string
  price: number
  stockQuantity: number
  brand: IBrand
  status: string
}

export interface IProductRecord {
  id: number
  name: string
  productCode: string
  description: string
  imageUrl:string
  price: number
  stockQuantity: number
  brandId: number
  status: string
}


export interface IBrand {
  id: number
  name: string
  status: string
}

export interface ICategory {
  id: number
  name: string
  description: string
}

export interface IAttribute {
  id: number
  name: string
  unit: string
}

export interface IPaging {
  page: number
  itemsPerPage: number
}

export interface IProductResponse {
  list: IProduct[]
  totalCount: number
  paging: IPaging
}


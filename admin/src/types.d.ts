import { EnumUserStatus } from './enums'

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
  imageUrl: string
  price: number
  stockQuantity: number
  brandId: number
  status: string
}


export interface IUserPermissions {
  id: number
  value: string
  name: string
}

export interface IIdentityProvider {
  id: number
  name: string
}

export interface IIdentityProvider {
  name: string
}

export interface IIdentityProviderRecord {
  id: number
  name: string
}

export type TAuthStatus = {
  authenticated: boolean
}

export type TRouteMenuItem = {
  icon: string,
  label: string,
  route: string,
  seperator: boolean
}


interface IUser {
  id: number
  accountId: string
  firstName: string
  lastName: string
  email: string
  identityProvider: IIdentityProviderRecord
  status: EnumUserStatus
  isAdmin: boolean
}


interface IRecordUser {
  id: number
  accountId: string
  firstName: string
  lastName: string
  email: string
  status: EnumUserStatus
  isAdmin: boolean
}


export interface IBrand {
  id: number
  name: string
  logoUrl: string | null
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

export interface IBrandResponse {
  list: IBrand[]
  totalCount: number
  paging: IPaging
}


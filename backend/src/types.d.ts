import { EnumUserStatus } from '../types-and-enums/enums'

export interface IProduct {
  id: number
  name: string
  productCode: string
  description: string
  price: number
  stockQuantity: number
  imageUrl: string
  brand: IBrand
  status: string
}

export interface IProductRecord {
  id: number
  name: string
  productCode: string
  description: string
  price: number
  stockQuantity: number
  imageUrl: string
  brandId: number
  status: string
}

export interface IPermissionRecord {
  id: number
  value: string
  name: string
}

export interface IUserPermissionRecord {
  id: number
  userId: number
  permissionId: number
}


export interface IRecordUser {
  id: number
  firstName: string
  lastName: string
  email: string
  accountId: string
  identityProviderId: number
  phone: string | null
  status: EnumUserStatus
  postalAddressId: number | null
  isAdmin: boolean
}

export interface IUserPostalAddressRecord {
  id: number
  postalCode: string
}

interface IUser {
  id: number
  accountId: string
  firstName: string
  lastName: string
  email: string
  identityProvider: IIdentityProviderRecord
  userPermissions: IUserPermission[]
  status: EnumUserStatus
  isAdmin: boolean
}


export interface IIdentityProvider {
  name: string
}

export interface IIdentityProviderRecord {
  id: number
  name: string
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


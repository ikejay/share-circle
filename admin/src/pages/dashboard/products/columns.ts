import { IProduct } from '../../../types'

export const columns = [
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: ( row: IProduct ) => row.name,
  },
  {
    name: 'brand',
    required: true,
    label: 'Brand',
    align: 'left',
    field: ( row: IProduct ) => row.brand.name,
  },
  {
    name: 'price',
    required: true,
    label: 'Price',
    align: 'left',
    field: ( row: IProduct ) => row.price,
  },
  {
    name: 'stock',
    required: true,
    label: 'Stock Left',
    align: 'left',
    field: ( row: IProduct ) => row.stockQuantity,
  },
  {
    name: 'status',
    required: true,
    label: 'Status',
    align: 'left',
    field: ( row: IProduct ) => row.status,
  },
  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    align: 'center',
  },
]

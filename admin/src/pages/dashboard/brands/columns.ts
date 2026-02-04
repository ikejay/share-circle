import { QTableColumn } from 'quasar'
import { IBrand } from '../../../types'

export const columns: QTableColumn[] = [
  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    style: 'width: 150px',
    align: 'left',
  },
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: ( row: IBrand ) => row.name,
  },
  {
    name: 'status',
    required: true,
    label: 'Status',
    align: 'left',
    field: ( row: IBrand ) => row.status,
  },
]

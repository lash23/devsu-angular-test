import { ITableColumn } from '../interfaces/ITable';
import { APP_URL } from './AppURLs.enum';

export const PRODUCT_TABLE_COLUMNS: ITableColumn[] = [
  {
    title: 'Logo',
    property: 'logo',
    type: 'image',
  },
  {
    title: 'Nombre del producto',
    property: 'name',
    type: 'text',
  },
  {
    title: 'Descripción',
    property: 'description',
    type: 'text',
  },
  {
    title: 'Fecha de liberación',
    property: 'date_release',
    type: 'date',
  },
  {
    title: 'Fecha de reestructuración',
    property: 'date_revision',
    type: 'date',
  },
  {
    title: '',
    property: '',
    type: 'actions',
    actions: [
      {
        text: 'Editar',
        action: 'navigate',
        target: APP_URL.EDIT_PRODUCT,
      },
      {
        text: 'Eliminar',
        action: 'openModal',
      },
    ],
  },
];

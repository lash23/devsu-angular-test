import { APP_URL } from '../constants/AppURLs.enum';

export interface ITableColumn {
  title: string;
  property: string;
  type: 'image' | 'text' | 'date' | 'actions';
  actions?: ITableAction[];
}

export interface ITableAction {
  text: string;
  action: 'navigate' | 'openModal';
  target?: APP_URL;
}

export interface IActionTrigger {
  action: ITableAction;
  item: any;
}

export interface ITableItem<T> {
  property: string;
  value: T;
}

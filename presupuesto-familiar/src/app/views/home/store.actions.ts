import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Ingreso } from '../../components/ingreso/ingreso.interfaces';
import { Egreso } from '../../components/egreso/egreso.interface';

export const StoreActions = createActionGroup({
  source: 'Store',
  events: {
    'Load Ingresos Store': emptyProps(),
    'Load Ingresos Store Success': props<{ ingresos: Ingreso[] }>(),
    'Load Ingresos Store Failure': props<{ error: unknown }>(),
    'New Ingreso Store': props<{ ingreso: Ingreso }>(),
    'New Ingreso Store Success': props<{ ingreso: Ingreso[] }>(),
    'New Ingreso Store Failure': props<{ error: unknown }>(),
    'Delete Ingreso Store': props<{ id: number }>(),
    'Delete Ingreso Store Success': props<{ id: number }>(),
    'Delete Ingreso Store Failure': props<{ error: unknown }>(),


    'Load Egresos Store': emptyProps(),
    'Load Egresos Store Success': props<{ egresos: Egreso[] }>(),
    'Load Egresos Store Failure': props<{ error: unknown }>(),
    'New Egreso Store': props<{ egreso: Egreso }>(),
    'New Egreso Store Success': props<{ egreso: Egreso[] }>(),
    'New Egreso Store Failure': props<{ error: unknown }>(),
    'Delete Egreso Store': props<{ id: number }>(),
    'Delete Egreso Store Success': props<{ id: number }>(),
    'Delete Egreso Store Failure': props<{ error: unknown }>(),
  }
});

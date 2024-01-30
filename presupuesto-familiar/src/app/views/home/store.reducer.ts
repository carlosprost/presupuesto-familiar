import { createFeature, createReducer, on } from '@ngrx/store';
import { StoreActions } from './store.actions';
import { Ingreso } from '../../components/ingreso/ingreso.interfaces';
import { Egreso } from '../../components/egreso/egreso.interface';

export const storeFeatureKey = 'store';

export interface State {

  ingresos: Ingreso[];
  egresos: Egreso[];
  error: any;

}

export const initialState: State = {
  ingresos: [],
  egresos: [],
  error: null
};

export const reducer = createReducer(
  initialState,
  on(StoreActions.loadIngresosStore, state => ({...state})),
  on(StoreActions.loadIngresosStoreSuccess, (state, {ingresos}) => ({...state, ingresos: ingresos})),
  on(StoreActions.loadIngresosStoreFailure, (state, {error}) => ({...state, error: error})),
  on(StoreActions.newIngresoStore, state => ({...state})),
  on(StoreActions.newIngresoStoreSuccess, (state, {ingreso}) => ({...state, ingresos: ingreso})),
  on(StoreActions.newIngresoStoreFailure, (state, {error}) => ({...state, error: error})),
  on(StoreActions.deleteIngresoStore, state => ({...state})),
  on(StoreActions.deleteIngresoStoreSuccess, (state, {id}) => ({...state, ingresos: state.ingresos.filter(ingreso => ingreso.id_ingreso !== id)})),
  on(StoreActions.deleteIngresoStoreFailure, (state, {error}) => ({...state, error: error})),
  on(StoreActions.loadEgresosStore, state => ({...state})),
  on(StoreActions.loadEgresosStoreSuccess, (state, {egresos}) => ({...state, egresos: egresos})),
  on(StoreActions.loadEgresosStoreFailure, (state, {error}) => ({...state, error: error})),
  on(StoreActions.newEgresoStore, state => ({...state})),
  on(StoreActions.newEgresoStoreSuccess, (state, {egreso}) => ({...state, egresos: egreso})),
  on(StoreActions.newEgresoStoreFailure, (state, {error}) => ({...state, error: error})),
  on(StoreActions.deleteEgresoStore, state => ({...state})),
  on(StoreActions.deleteEgresoStoreSuccess, (state, {id}) => ({...state, egresos: state.egresos.filter(egreso => egreso.id_egreso !== id)})),
  on(StoreActions.deleteEgresoStoreFailure, (state, {error}) => ({...state, error: error}))
);

export const storeFeature = createFeature({
  name: storeFeatureKey,
  reducer,
});


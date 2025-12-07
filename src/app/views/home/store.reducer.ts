import { createFeature, createReducer, on } from '@ngrx/store';
import { StoreActions } from './store.actions';
import { Ingreso } from '../../components/ingreso/ingreso.interfaces';
import { Egreso } from '../../components/egreso/egreso.interface';
import { Configuracion } from '../../views/configuracion/configuracion.interface';

export const storeFeatureKey = 'store';

export interface State {
  ingresos: Ingreso[];
  egresos: Egreso[];
  configuracion: Configuracion | null;
  loading: boolean;
  error: any;
}

export const initialState: State = {
  ingresos: [],
  egresos: [],
  configuracion: null,
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(StoreActions.loadIngresosStore, state => ({...state, loading: true})),
  on(StoreActions.loadIngresosStoreSuccess, (state, {ingresos}) => ({...state, ingresos: ingresos, loading: false})),
  on(StoreActions.loadIngresosStoreFailure, (state, {error}) => ({...state, error: error, loading: false})),
  on(StoreActions.newIngresoStore, state => ({...state})),
  on(StoreActions.newIngresoStoreSuccess, (state, {ingreso}) => ({...state, ingresos: ingreso})),
  on(StoreActions.newIngresoStoreFailure, (state, {error}) => ({...state, error: error})),
  on(StoreActions.deleteIngresoStore, state => ({...state})),
  on(StoreActions.deleteIngresoStoreSuccess, (state, {id}) => {
    // Loose equality check (==) to handle potential string/number mismatches from server
    const filtered = state.ingresos.filter(ingreso => ingreso.id_ingreso != id);
    return ({...state, ingresos: filtered});
  }),
  on(StoreActions.deleteIngresoStoreFailure, (state, {error}) => ({...state, error: error})),
  on(StoreActions.updateIngresoStoreSuccess, (state, {ingreso}) => {
    const updatedIngresos = state.ingresos.map(item => item.id_ingreso === ingreso.id_ingreso ? ingreso : item);
    return ({...state, ingresos: updatedIngresos});
  }),
  on(StoreActions.updateIngresoStoreFailure, (state, {error}) => ({...state, error: error})),

  on(StoreActions.loadEgresosStore, state => ({...state, loading: true})),
  on(StoreActions.loadEgresosStoreSuccess, (state, {egresos}) => ({...state, egresos: egresos, loading: false})),
  on(StoreActions.loadEgresosStoreFailure, (state, {error}) => ({...state, error: error, loading: false})),
  on(StoreActions.newEgresoStore, state => ({...state})),
  on(StoreActions.newEgresoStoreSuccess, (state, {egreso}) => ({...state, egresos: egreso})),
  on(StoreActions.newEgresoStoreFailure, (state, {error}) => ({...state, error: error})),
  on(StoreActions.deleteEgresoStore, state => ({...state})),
  on(StoreActions.deleteEgresoStoreSuccess, (state, {id}) => {
    const filtered = state.egresos.filter(egreso =>egreso.id_egreso != id);
    return ({...state, egresos: filtered});
  }),
  on(StoreActions.deleteEgresoStoreFailure, (state, {error}) => ({...state, error: error})),
  on(StoreActions.updateEgresoStoreSuccess, (state, {egreso}) => {
    const updatedEgresos = state.egresos.map(item => item.id_egreso === egreso.id_egreso ? egreso : item);
    return ({...state, egresos: updatedEgresos});
  }),
  on(StoreActions.updateEgresoStoreFailure, (state, {error}) => ({...state, error: error})),

  // Config Reducers
  on(StoreActions.loadConfigStoreSuccess, (state, {config}) => ({...state, configuracion: config})),
  on(StoreActions.loadConfigStoreFailure, (state, {error}) => ({...state, error: error})),
  on(StoreActions.updateConfigStoreSuccess, (state, {config}) => ({...state, configuracion: config})),
  on(StoreActions.updateConfigStoreFailure, (state, {error}) => ({...state, error: error}))
);

export const storeFeature = createFeature({
  name: storeFeatureKey,
  reducer,
});


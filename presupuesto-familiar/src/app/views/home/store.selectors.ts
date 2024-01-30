import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStore from './store.reducer';

export const selectStoreState = createFeatureSelector<fromStore.State>(
  fromStore.storeFeatureKey
);

export const selectIngresos = createSelector(
  selectStoreState,
  (state: fromStore.State) => state.ingresos
);

export const selectEgresos = createSelector(
  selectStoreState,
  (state: fromStore.State) => state.egresos
);

export const selectError = createSelector(
  selectStoreState,
  (state: fromStore.State) => state.error
);

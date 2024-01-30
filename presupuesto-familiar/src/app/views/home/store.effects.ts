import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { StoreActions } from './store.actions';
import { IngresoService } from '../../components/ingreso/ingreso.service';
import { EgresoService } from '../../components/egreso/egreso.service';
import { Ingreso } from '../../components/ingreso/ingreso.interfaces';
import { Egreso } from '../../components/egreso/egreso.interface';


@Injectable()
export class StoreEffects {

  
  loadIngresos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StoreActions.loadIngresosStore),
      concatMap(() =>
        this.loadIngresos().pipe(
          map(ingresos => StoreActions.loadIngresosStoreSuccess({ ingresos })),
          catchError(error => of(StoreActions.loadIngresosStoreFailure({ error }))))
      )
    );
  });

  newIngreso$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StoreActions.newIngresoStore),
      concatMap((action) =>
        this.newIngreso(action.ingreso).pipe(
          map(ingreso => StoreActions.newIngresoStoreSuccess({ ingreso })),
          catchError(error => of(StoreActions.newIngresoStoreFailure({ error }))))
      )
    );
  });

  deleteIngreso$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StoreActions.deleteIngresoStore),
      concatMap((action) =>
        this.deleteIngreso(action.id).pipe(
          map(id => StoreActions.deleteIngresoStoreSuccess({ id })),
          catchError(error => of(StoreActions.deleteIngresoStoreFailure({ error }))))
      )
    );
  });

  loadEgresos$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StoreActions.loadEgresosStore),
      concatMap(() =>
        this.loadEgresos().pipe(
          map(egresos => StoreActions.loadEgresosStoreSuccess({ egresos })),
          catchError(error => of(StoreActions.loadEgresosStoreFailure({ error }))))
      )
    );
  });

  newEgreso$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StoreActions.newEgresoStore),
      concatMap((action) =>
        this.newEgreso(action.egreso).pipe(
          map(egreso => StoreActions.newEgresoStoreSuccess({ egreso })),
          catchError(error => of(StoreActions.newEgresoStoreFailure({ error }))))
      )
    );
  });

  deleteEgreso$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StoreActions.deleteEgresoStore),
      concatMap((action) =>
        this.deleteEgreso(action.id).pipe(
          map(id => StoreActions.deleteEgresoStoreSuccess({ id })),
          catchError(error => of(StoreActions.deleteEgresoStoreFailure({ error }))))
      )
    );
  });


  constructor(
    private actions$: Actions,
    private ingresoService: IngresoService,
    private egresoService: EgresoService
    ) {}

    loadIngresos(): Observable<Ingreso[]>{
      return this.ingresoService.getIngresos()
    }

    newIngreso(ingreso: Ingreso): Observable<Ingreso[]>{
      return this.ingresoService.postIngreso(ingreso)
    }

    deleteIngreso(id: number): Observable<number>{
      return this.ingresoService.deleteIngreso(id)
    }

    loadEgresos(): Observable<Egreso[]>{
      return this.egresoService.getEgresos()
    }

    newEgreso(egreso: Egreso): Observable<Egreso[]>{
      return this.egresoService.postEgreso(egreso)
    }

    deleteEgreso(id: number): Observable<number>{
      return this.egresoService.deleteEgreso(id)
    }
}

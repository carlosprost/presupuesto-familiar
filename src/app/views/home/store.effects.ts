import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { StoreActions } from './store.actions';
import { IngresoService } from '../../components/ingreso/ingreso.service';
import { EgresoService } from '../../components/egreso/egreso.service';
import { Ingreso } from '../../components/ingreso/ingreso.interfaces';
import { Egreso } from '../../components/egreso/egreso.interface';
import { ConfiguracionService } from '../../views/configuracion/configuracion.service';
import { Configuracion } from '../../views/configuracion/configuracion.interface';
import { MatSnackBar } from '@angular/material/snack-bar';


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
          tap(() => this.snackBar.open('Ingreso agregado correctamente', 'Cerrar', { duration: 3000 })),
          catchError(error => {
            this.snackBar.open('Error al agregar ingreso', 'Cerrar', { duration: 3000 });
            return of(StoreActions.newIngresoStoreFailure({ error }));
          }))
      )
    );
  });

  deleteIngreso$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StoreActions.deleteIngresoStore),
      concatMap((action) =>
        this.deleteIngreso(action.id).pipe(
          map(() => StoreActions.deleteIngresoStoreSuccess({ id: action.id })),
          tap(() => this.snackBar.open('Ingreso eliminado correctamente', 'Cerrar', { duration: 3000 })),
          catchError(error => {
            this.snackBar.open('Error al eliminar ingreso', 'Cerrar', { duration: 3000 });
            return of(StoreActions.deleteIngresoStoreFailure({ error }));
          }))
      )
    );
  });

  updateIngreso$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.updateIngresoStore),
      concatMap((action) =>
        this.updateIngreso(action.ingreso).pipe(
          map(ingreso => StoreActions.updateIngresoStoreSuccess({ ingreso })),
          tap(() => this.snackBar.open('Ingreso actualizado correctamente', 'Cerrar', { duration: 3000 })),
          catchError(error => {
            this.snackBar.open('Error al actualizar ingreso', 'Cerrar', { duration: 3000 });
            return of(StoreActions.updateIngresoStoreFailure({ error }));
          }))
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
          tap(() => this.snackBar.open('Egreso agregado correctamente', 'Cerrar', { duration: 3000 })),
          catchError(error => {
            this.snackBar.open('Error al agregar egreso', 'Cerrar', { duration: 3000 });
            return of(StoreActions.newEgresoStoreFailure({ error }));
          }))
      )
    );
  });

  deleteEgreso$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(StoreActions.deleteEgresoStore),
      concatMap((action) =>
        this.deleteEgreso(action.id).pipe(
          map(() => StoreActions.deleteEgresoStoreSuccess({ id: action.id })),
          tap(() => this.snackBar.open('Egreso eliminado correctamente', 'Cerrar', { duration: 3000 })),
          catchError(error => {
            this.snackBar.open('Error al eliminar egreso', 'Cerrar', { duration: 3000 });
            return of(StoreActions.deleteEgresoStoreFailure({ error }));
          }))
      )
    );
  });

  updateEgreso$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.updateEgresoStore),
      concatMap((action) =>
        this.updateEgreso(action.egreso).pipe(
          map(egreso => StoreActions.updateEgresoStoreSuccess({ egreso })),
          tap(() => this.snackBar.open('Egreso actualizado correctamente', 'Cerrar', { duration: 3000 })),
          catchError(error => {
            this.snackBar.open('Error al actualizar egreso', 'Cerrar', { duration: 3000 });
            return of(StoreActions.updateEgresoStoreFailure({ error }));
          }))
      )
    );
  });

  loadConfig$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.loadConfigStore),
      concatMap(() =>
        this.loadConfig().pipe(
          map(config => StoreActions.loadConfigStoreSuccess({ config })),
          catchError(error => of(StoreActions.loadConfigStoreFailure({ error }))))
      )
    );
  });

  updateConfig$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.updateConfigStore),
      concatMap((action) =>
        this.updateConfig(action.config).pipe(
          map(config => StoreActions.updateConfigStoreSuccess({ config })),
          tap(() => this.snackBar.open('Configuración actualizada correctamente', 'Cerrar', { duration: 3000 })),
          catchError(error => {
            this.snackBar.open('Error al actualizar configuración', 'Cerrar', { duration: 3000 });
            return of(StoreActions.updateConfigStoreFailure({ error }));
          }))
      )
    );
  });


  constructor(
    private actions$: Actions,
    private ingresoService: IngresoService,
    private egresoService: EgresoService,
    private configService: ConfiguracionService,
    private snackBar: MatSnackBar
    ) {}

    loadConfig(): Observable<Configuracion> {
      return this.configService.getConfig();
    }

    updateConfig(config: Configuracion): Observable<Configuracion> {
      return this.configService.updateConfig(config);
    }

    loadIngresos(): Observable<Ingreso[]>{
      return this.ingresoService.getIngresos()
    }

    newIngreso(ingreso: Ingreso): Observable<Ingreso[]>{
      return this.ingresoService.postIngreso(ingreso)
    }

    deleteIngreso(id: number): Observable<number>{
      return this.ingresoService.deleteIngreso(id)
    }

    updateIngreso(ingreso: Ingreso): Observable<Ingreso> {
      return this.ingresoService.putIngreso(ingreso);
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

    updateEgreso(egreso: Egreso): Observable<Egreso> {
      return this.egresoService.putEgreso(egreso);
    }
}

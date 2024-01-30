import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { StoreModule, provideStore } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { storeFeature } from './views/home/store.reducer';
import { StoreEffects } from './views/home/store.effects';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideClientHydration(),
    provideStore({
        store: storeFeature.reducer,
    }),
    provideEffects([StoreEffects]),
    provideStoreDevtools({
        maxAge: 25,
        logOnly: !isDevMode(),
        connectInZone: true,
    }),
    provideAnimations()
],
};

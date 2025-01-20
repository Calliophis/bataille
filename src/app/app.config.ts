import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngxs/store';
import { PlayerState } from './states/player.state';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { authInterceptor } from './interceptors/auth.interceptor';
import { GameState } from './states/game.state';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideStore(
      [PlayerState, GameState], withNgxsReduxDevtoolsPlugin()),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideAnimations(),
  ]
};

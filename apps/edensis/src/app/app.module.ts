import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { NgxCsvParserModule } from 'ngx-csv-parser';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';
import { DefaultModule } from './layouts/default/default.module';
import { FullwidthModule } from './layouts/fullwidth/fullwidth.module';
import { PROVIDERS } from './providers';
import { environment } from '../environments/environment';
import { ElectionEffects } from './store/effects/election.effects';
import { PositionEffects } from './store/effects/position.effects';
import { reducers } from './store/reducers';
import { CandidateEffects } from './store/effects/candidate.effects';
import { VotersEffects } from './store/effects/voter.effect';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    DefaultModule,
    FullwidthModule,
    RoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([
      ElectionEffects,
      PositionEffects,
      CandidateEffects,
      VotersEffects
    ]),
    NgxCsvParserModule
  ],

  providers: PROVIDERS,
  bootstrap: [AppComponent]
})
export class AppModule {}

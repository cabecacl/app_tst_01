import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
// import { Storage } from '@ionic/storage';
// import { SQLite } from 'ionic-native';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConfClientePage } from '../pages/confCliente/confCliente';
import { SolicitacoesComprasPage } from '../pages/solicitacoes-compras/solicitacoes-compras';
import { DetalhamentoSolicitacaoPage } from '../pages/detalhamento-solicitacao/detalhamento-solicitacao';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConfClientePage,
    SolicitacoesComprasPage,
    DetalhamentoSolicitacaoPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConfClientePage,
    SolicitacoesComprasPage,
    DetalhamentoSolicitacaoPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

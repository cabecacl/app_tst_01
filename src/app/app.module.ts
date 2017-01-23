import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { DaoSolCompras } from "../providers/dao-sol-compras";
// import { Storage } from '@ionic/storage';
// import { SQLite } from 'ionic-native';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConfClientePage } from '../pages/confCliente/confCliente';
import { SolicitacoesComprasPage } from '../pages/solicitacoes-compras/solicitacoes-compras';
import { DetalhamentoSolicitacaoPage } from '../pages/detalhamento-solicitacao/detalhamento-solicitacao';
import { SolicitacoesRejeitadasPage } from "../pages/solicitacoes-rejeitadas/solicitacoes-rejeitadas";
import { SolicitacoesAprovadasPage } from "../pages/solicitacoes-aprovadas/solicitacoes-aprovadas";
import { HomeGraficoPage } from "../pages/home-grafico/home-grafico";
import { ChartsModule } from 'ng2-charts';
import '../../node_modules/chart.js/dist/Chart.bundle.min.js';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConfClientePage,
    SolicitacoesComprasPage,
    DetalhamentoSolicitacaoPage,
    SolicitacoesRejeitadasPage,
    SolicitacoesAprovadasPage,
    HomeGraficoPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConfClientePage,
    SolicitacoesComprasPage,
    DetalhamentoSolicitacaoPage,
    SolicitacoesRejeitadasPage,
    SolicitacoesAprovadasPage,
    HomeGraficoPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, DaoSolCompras]
})
export class AppModule {}

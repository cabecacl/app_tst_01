import { Component,NgModule} from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage, SqlStorage} from '@ionic/ionic';
import { DaoSolCompras } from "../providers/dao-sol-compras";

import { HomePage } from '../pages/home/home';
import { SolicitacoesComprasPage } from '../pages/solicitacoes-compras/solicitacoes-compras';
import { SolicitacoesRejeitadasPage } from "../pages/solicitacoes-rejeitadas/solicitacoes-rejeitadas";
import { SolicitacoesAprovadasPage } from "../pages/solicitacoes-aprovadas/solicitacoes-aprovadas";

@Component({
  templateUrl: 'app.html',
  providers: [DaoSolCompras]
})
export class MyApp {

  home : any;
  // confCliente : any;
  solicitacoesCompras : any;
  solicitacoesRejeitadas: any;
  solicitacoesAprovadas: any;

  // rootPage = HomePage;
  rootPage = SolicitacoesComprasPage;
  // rootPage = ConfClientePage;

  constructor(platform: Platform) {
    this.home = HomePage;
    //this.confCliente = ConfClientePage;
    this.solicitacoesCompras = SolicitacoesComprasPage;
    this.solicitacoesRejeitadas = SolicitacoesRejeitadasPage;
    this.solicitacoesAprovadas = SolicitacoesAprovadasPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

    });
  }

  openPage(opcao){
    this.rootPage = opcao;
  };
}

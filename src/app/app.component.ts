import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { SolicitacoesComprasPage } from '../pages/solicitacoes-compras/solicitacoes-compras';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  home : any;
  // confCliente : any;
  solicitacoesCompras : any;

  //  rootPage = HomePage;
  rootPage = SolicitacoesComprasPage;
  // rootPage = ConfClientePage;

  constructor(platform: Platform) {
    this.home = HomePage;
    //this.confCliente = ConfClientePage;
    this.solicitacoesCompras = SolicitacoesComprasPage;

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

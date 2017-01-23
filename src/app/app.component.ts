import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, SQLite } from 'ionic-native';
// import { Storage} from '@ionic/storage';

import { HomePage } from '../pages/home/home';

import { SolicitacoesComprasPage } from '../pages/solicitacoes-compras/solicitacoes-compras';
import { SolicitacoesRejeitadasPage } from "../pages/solicitacoes-rejeitadas/solicitacoes-rejeitadas";
import { HomeGraficoPage } from '../pages/home-grafico/home-grafico';

import { SolicitacoesAprovadasPage } from "../pages/solicitacoes-aprovadas/solicitacoes-aprovadas";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  home : any;
  // confCliente : any;
  solicitacoesCompras : any;
  solicitacoesRejeitadas: any;
  solicitacoesAprovadas: any;
  homeGraficoPage: any;
  rootPage = HomePage;
  // rootPage = SolicitacoesComprasPage;
  // rootPage = ConfClientePage;
  //rootPage = HomeGraficoPage;

  constructor(platform: Platform) {
    this.home = HomePage;
    //this.confCliente = ConfClientePage;
    this.solicitacoesCompras = SolicitacoesComprasPage;
    this.solicitacoesRejeitadas = SolicitacoesRejeitadasPage;
    this.solicitacoesAprovadas = SolicitacoesAprovadasPage;
    this.homeGraficoPage = HomeGraficoPage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

  /** Criação do banco de dados SQLite **/

      let db = new SQLite();
      db.openDatabase({
                        name: "data.db",
                        location: "default"
                      })
          .then(() => {
                        db.executeSql("CREATE TABLE IF NOT EXISTS solicCompra "+
                                      "(id INTEGER PRIMARY KEY AUTOINCREMENT, "+
                                      " cd_sol_com TEXT, "+
                                      " dt_sol_com TEXT, "+
                                      " tp_situacao TEXT, "+
                                      " vl_total TEXT)",
                                    {})
                          .then((data) => {
                                            console.log("TABLE CREATED: ", data);
                                          },
                                (error) => {
                                            console.error("Unable to execute sql", error);
                                           }
                                )
                     }, (error) => {
                                    console.error("Unable to open database", error);
                                  }
              );
    /** ------------------------------------------------ **/
    });
  }

  openPage(opcao){
    this.rootPage = opcao;
  };
}

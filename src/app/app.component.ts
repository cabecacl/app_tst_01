import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, SQLite } from 'ionic-native';
// import { Storage} from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { ConfClientePage } from '../pages/confCliente/confCliente';
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

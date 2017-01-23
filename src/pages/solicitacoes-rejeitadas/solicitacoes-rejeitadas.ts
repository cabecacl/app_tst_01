import { Component } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import { DaoSolCompras } from '../../providers/dao-sol-compras';
import { SolicCompra } from "../../model/solicCompra";
import { ServiceSolicitacao } from "../../app/services/serviceSolicitacoes";

/*
  Generated class for the SolicitacoesRejeitadas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-solicitacoes-rejeitadas',
  templateUrl: 'solicitacoes-rejeitadas.html',
  providers : [ServiceSolicitacao, DaoSolCompras]
})
export class SolicitacoesRejeitadasPage {

  listaSolicitacoes : SolicCompra[] = new Array<SolicCompra>();
  plataforma : Platform;

  constructor(public navCtrl: NavController, public navParams: NavParams,private platform: Platform,
              private solicitacoesService : ServiceSolicitacao, private daoSolicitacoes : DaoSolCompras) {
    this.plataforma = platform;
  }

  ionViewDidLoad() {
    // this.daoSolicitacoes = new DAOSolicitacoesCompras(this.plataforma);
    this.getSolicitacoesRejeitadas();
  }

  /**
  * Metodo utilizado para recuperar dados da base e atualizar a lista em tela
  */
  getSolicitacoesRejeitadas(){
    this.daoSolicitacoes.getSolicitacoesRejeitadas().then((result) => {
      this.listaSolicitacoes = <Array<SolicCompra>> result;
    }, (error) => {
        console.log("ERROR: ", error);
    });
  }

}

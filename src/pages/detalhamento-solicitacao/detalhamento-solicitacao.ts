import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceSolicitacao } from "../../app/services/serviceSolicitacoes";

/*
  Generated class for the DetalhamentoSolicitacao page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detalhamento-solicitacao',
  templateUrl: 'detalhamento-solicitacao.html',
  providers: [ServiceSolicitacao]
})
export class DetalhamentoSolicitacaoPage {
  solicitacoes:string = "solicitacao";
  public solicitacao:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private solicitacoesService:ServiceSolicitacao) {
    this.solicitacao = navParams.get("solicitacao");


    // this.solicitacoesService.buscarDetalhesSolicitacao(this.solicitacao.cd_sol_com).subscribe(
    //     data => {
    //         this.solicitacao = data;
    //     },
    //     err => {
    //         console.log(err);
    //     },
    //     () => console.log('Detalhamento realizado com sucesso')
    // );;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhamentoSolicitacaoPage');
  }

}

import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ItemSliding } from 'ionic-angular';

import { DAOSolicitacoesCompras } from '../../app/dao/dao-solicitacoesCompras';
import { SolicCompra } from "../../model/solicCompra";
import { ServiceSolicitacao } from "../../app/services/serviceSolicitacoes";
import {DetalhamentoSolicitacaoPage} from "../detalhamento-solicitacao/detalhamento-solicitacao";

@Component({
  selector: 'page-solicitacoes-compras',
  templateUrl: 'solicitacoes-compras.html',
  providers : [ServiceSolicitacao]
})

export class SolicitacoesComprasPage {

  daoSolicitacoes : DAOSolicitacoesCompras;
  listaSolicitacoes : SolicCompra[];
  mostrarCheck: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public toastCtrl: ToastController, private solicitacoesService : ServiceSolicitacao ) {

  //    this.daoSolicitacoes = new DAOSolicitacoesCompras();
      this.buscarSolicitacoes();
      console.log(this.listaSolicitacoes);
  }
  //
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad SolicitacoesComprasPage');
  // }

/**
* Metodo utilizado pado para aprovar a solicitação de compra
* Entrada: solicitacao, itemSlideing
*/
  aprovar(solicitacao : SolicCompra, slidingItem: ItemSliding){
    solicitacao.tp_situacao = 'A';
    this.presentToast("Solicitação aprovada com sucesso!");
    slidingItem.close();
    console.log(solicitacao);
  }

  /**
  * Metodo utilizado pado para rejeitar a solicitação de compra
  * Entrada: solicitacao, itemSlideing
  */
  rejeitar(solicitacao : SolicCompra, slidingItem: ItemSliding){
    solicitacao.tp_situacao = 'R';
    this.presentToast("Solicitação rejeitada com sucesso!");
    slidingItem.close();
  }

  /**
  * Metodo utilizado para recuperar as solicitações do SqlLite ou Servico
  */
  buscarSolicitacoes(){

    //this.listaSolicitacoes = this.daoSolicitacoes.getList();

      this.solicitacoesService.buscarSolicitacoes().subscribe(
          data => {
              this.listaSolicitacoes = data;
          },
          err => {
              console.log(err);
          },
          () => console.log('Busca realizada com sucesso')
      );
  }

/**
* Metodo utilizado para mostrar todos os itens com a opção check da esquerda
*/
  mostrarSelecionarTodos(){
    this.mostrarCheck = !this.mostrarCheck;
  }

 /**
 * Metodo utilizado para exibir o alerta na parte inferiro da tela ao
 * aprovar ou rejeitar uma solicitação
 */
  presentToast(mensagem: string) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 1000
    });
    toast.present();
  }

  /**
  * Metodo utiliozado para checar item quando a opção de marcar varios for mostrada
  */
  checarItem(solicitacao : SolicCompra){
    solicitacao.checado = !solicitacao.checado;
  }

  exibirDetalhes(solicitacao : SolicCompra){
    this.navCtrl.push(DetalhamentoSolicitacaoPage, {solicitacao: solicitacao});
  }

}

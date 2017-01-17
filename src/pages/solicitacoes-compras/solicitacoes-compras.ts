import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ItemSliding, Platform} from 'ionic-angular';

import { DAOSolicitacoesCompras } from '../../app/dao/dao-solicitacoesCompras';
import { SolicCompra } from "../../model/solicCompra";
import { ServiceSolicitacao } from "../../app/services/serviceSolicitacoes";


@Component({
  selector: 'page-solicitacoes-compras',
  templateUrl: 'solicitacoes-compras.html',
  providers : [ServiceSolicitacao]
})

export class SolicitacoesComprasPage {

  daoSolicitacoes : DAOSolicitacoesCompras;
  listaSolicitacoes : SolicCompra[] = new Array<SolicCompra>();
  mostrarCheck: boolean = false;
  plataforma : Platform;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform,
      public toastCtrl: ToastController, private solicitacoesService : ServiceSolicitacao ) {

      this.plataforma = platform;
      console.log('Construtor:' + this.listaSolicitacoes);
  }

ionViewDidLoad() {
  this.daoSolicitacoes = new DAOSolicitacoesCompras(this.plataforma);
  this.buscarSolicitacoes();
  console.log('ionViewDidLoad ModalContasPage');
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

    // this.listaSolicitacoes = this.daoSolicitacoes.getList();

    // let listaRetornoService = new Array<SolicCompra>();

      this.solicitacoesService.buscarSolicitacoes().subscribe(
         data => {
             this.listaSolicitacoes = data;
             console.log(data.value);
         },
         err => {
             console.log(err);
         },
         () => {console.log('Itens recuperados');

           if(this.listaSolicitacoes.length > 0){

             for (let item of this.listaSolicitacoes){
               let sol = new SolicCompra();
               sol.cd_sol_com = item.cd_sol_com;
               sol.dt_sol_com = item.dt_sol_com;
               sol.tp_situacao = item.tp_situacao;
               sol.vl_total = item.vl_total;
               sol.checado = false;

               this.daoSolicitacoes.inserir(sol);
               console.log('Inseriu item:' + sol.cd_sol_com);
             }

             console.log("atualizou dados:" + this.listaSolicitacoes.length);

             this.listaSolicitacoes = this.daoSolicitacoes.getList();
           }

           console.log('Busca realizada com sucesso: ' + this.listaSolicitacoes.length);

         });


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

  inserir(){
    this.daoSolicitacoes.inserir(new SolicCompra());
    this.listaSolicitacoes = this.daoSolicitacoes.getList();
  }

  consultar(){
    // if(this.listaSolicitacoes.length > 0){

      //  for (let item of this.listaSolicitacoes){
      //    let sol = new SolicCompra();
      //    sol.cd_sol_com = item.cd_sol_com;
      //    sol.dt_sol_com = item.dt_sol_com;
      //    sol.tp_situacao = item.tp_situacao;
      //    sol.vl_total = item.vl_total;
      //    sol.checado = false;
       //
      //    this.daoSolicitacoes.inserir(sol);
      //    console.log('Inseriu item:' + sol.cd_sol_com);
      //  }
       //
      //  console.log("atualizou dados:" + this.listaSolicitacoes.length);

       this.listaSolicitacoes = this.daoSolicitacoes.getList();
    //  }

     console.log('Busca realizada com sucesso: ' + this.listaSolicitacoes.length);
  }

}

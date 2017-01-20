import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ItemSliding, Platform, LoadingController, MenuController  } from 'ionic-angular';
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
  listaSolicitacoes : SolicCompra[] = new Array<SolicCompra>();
  mostrarCheck: boolean = false;
  plataforma : Platform;
  loader : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private platform: Platform,
      public toastCtrl: ToastController, private solicitacoesService : ServiceSolicitacao, public menuCtrl :MenuController,
      private loadCtrl : LoadingController ) {

      this.plataforma = platform;
      this.menuCtrl.enable(true);
  }

ionViewDidLoad() {
  this.abrirLoading();
  //this.daoSolicitacoes = new DAOSolicitacoesCompras(this.plataforma);
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

    let sol = new SolicCompra();
    sol.cd_sol_com = '111';
    sol.dt_sol_com = '12/12/2019';
    sol.tp_situacao ='S';
    sol.vl_total = '8888,45';
    sol.checado =false;
    sol.nm_solicitante = 'Bruno';
    sol.dt_maxima = '01/01/2020';
    sol.ds_mot_ped = 'Reposição de estoque';
    sol.nm_setor = 'Farmácia';
    sol.cd_estoque = 1;
    sol.qtd_itens = 2;
    this.listaSolicitacoes.push(sol);

    // this.daoSolicitacoes.inserir(sol);

    sol = new SolicCompra();
    sol.cd_sol_com = '222';
    sol.dt_sol_com = '13/11/2019';
    sol.tp_situacao ='O';
    sol.vl_total = '777,00';
    sol.checado =false;
    sol.nm_solicitante = 'Paulo';
    sol.dt_maxima = '01/01/2020';
    sol.ds_mot_ped = 'Compra de urgência';
    sol.nm_setor = 'Recepção';
    sol.cd_estoque = 12;
    sol.qtd_itens = 2;

    this.listaSolicitacoes.push(sol);
    // this.daoSolicitacoes.inserir(sol);

    sol = new SolicCompra();
    sol.cd_sol_com = '333';
    sol.dt_sol_com = '18/12/2019';
    sol.tp_situacao ='S';
    sol.vl_total = '0112,00';
    sol.checado =false;
    sol.nm_solicitante = 'Jean';
    sol.dt_maxima = '01/01/2020';
    sol.ds_mot_ped = 'Solicitação interna';
    sol.nm_setor = 'Farmácia';
    sol.cd_estoque = 11;
    sol.qtd_itens = 2;

    this.listaSolicitacoes.push(sol);
    // this.daoSolicitacoes.inserir(sol)

    // this.listaSolicitacoes = this.daoSolicitacoes.getList();


      // this.solicitacoesService.buscarSolicitacoes().subscribe(
      //    data => {
      //        this.listaSolicitacoes = data;
      //        console.log(data.value);
      //    },
      //    err => {
      //        console.log(err);
      //    },
      //    () => {console.log('Itens recuperados');
      //
      //      if(this.listaSolicitacoes.length > 0){
      //
      //        for (let item of this.listaSolicitacoes){
      //
      //          let solRec = this.daoSolicitacoes.recuperarSolicitacao(item.cd_sol_com);
      //
      //          if(solRec == null){
      //            this.daoSolicitacoes.inserir(item);
      //          }else{
      //            this.daoSolicitacoes.editar(item);
      //          }
      //          console.log('Inseriu item:' + item.cd_sol_com);
      //        }
      //
      //        console.log("atualizou dados:" + this.listaSolicitacoes.length);
      //
      //        this.listaSolicitacoes = this.daoSolicitacoes.getList();
      //      }
      //
      //      console.log('Busca realizada com sucesso: ' + this.listaSolicitacoes.length);
      //
      //      this.fecharLoading();
      //    });


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

  consultar(){
    //  this.listaSolicitacoes = this.daoSolicitacoes.getList();
     console.log('Busca realizada com sucesso: ' + this.listaSolicitacoes.length);
  }

  inserir(){
    let sol = new SolicCompra();
    sol.cd_sol_com = '999';
    sol.dt_sol_com = '12/12/2019';
    sol.tp_situacao ='S';
    sol.vl_total = '8888';
    sol.checado =false;
    // this.daoSolicitacoes.inserir(sol);
    // this.listaSolicitacoes = this.daoSolicitacoes.getList();
  }

  abrirLoading(){
    this.loader = this.loadCtrl.create({
      content: "Sincronizando...",
      duration: 3000
    });
    this.loader.present();
  }

  fecharLoading(){
    this.loader.dismiss();
  }

}

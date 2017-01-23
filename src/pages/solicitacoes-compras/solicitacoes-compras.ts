import { Component} from '@angular/core';
import { NavController, NavParams, ToastController, ItemSliding, Platform, Loading ,LoadingController, MenuController, AlertController  } from 'ionic-angular';
import { DaoSolCompras } from '../../providers/dao-sol-compras';

import { SolicCompra } from "../../model/solicCompra";
import { ServiceSolicitacao } from "../../app/services/serviceSolicitacoes";
import { DetalhamentoSolicitacaoPage } from "../detalhamento-solicitacao/detalhamento-solicitacao";

@Component({
  selector: 'page-solicitacoes-compras',
  templateUrl: 'solicitacoes-compras.html',
  providers : [ServiceSolicitacao, DaoSolCompras]
})

export class SolicitacoesComprasPage {

  listaSolicitacoes : SolicCompra[] = new Array<SolicCompra>();
  mostrarCheck: boolean = false;
  plataforma : Platform;
  loader : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private platform: Platform,
      public toastCtrl: ToastController, private solicitacoesService : ServiceSolicitacao, public menuCtrl :MenuController,
      public loadCtrl : LoadingController, private alertCtrl : AlertController, private daoSolicitacoes : DaoSolCompras ) {

      this.plataforma = platform;
      this.menuCtrl.enable(true);

  }

/**
* Metodo utilizado para realizar a sincronização ao carregar a tela
*/
  ionViewDidLoad() {
    this.abrirLoading();
    this.consultar();
    this.buscarSolicitacoes();
    console.log('ionViewDidLoad ModalContasPage');
  }

/**
* Metodo utilizado pado para aprovar a solicitação de compra
* Entrada: solicitacao, itemSlideing
*/
  aprovar(solicitacao : SolicCompra, slidingItem: ItemSliding){
    solicitacao.tp_situacao = 'A';
    this.presentToast("Solicitação aprovada com sucesso!");
    this.alterSolicitacao(solicitacao);
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
    this.alterSolicitacao(solicitacao);
    slidingItem.close();
  }

  /**
  * Metodo utilizado para recuperar as solicitações do Servico e
  * atualizar o SQLite do equipamento
  * OBS: TODO: Vai se tornar serviço no futuro
  */
  buscarSolicitacoes(){

    let listaServico : SolicCompra[] = new Array<SolicCompra>();

      this.solicitacoesService.buscarSolicitacoes().subscribe(
         data => {
             listaServico = data;
             console.log(data.value);
         },
         err => {
             console.log(err);
         },
         () => {console.log('Itens recuperados');

           if(listaServico.length > 0){

             for (let solServ of listaServico){

               let existe : boolean = false;

               for (let sol of this.listaSolicitacoes){

                  if (sol.cd_sol_com == solServ.cd_sol_com){
                    // this.showAlert('Item Igual: ' + solServ.cd_sol_com);
                    existe = true;
                  }

               }

               if(existe){
                 this.alterSolicitacao(solServ);
               }else{
                 this.inserirSolicitacao(solServ);
               }

             }
          // Após atualizar os registros atualizar a lista
             this.consultar();
             
           }
           this.fecharLoading();
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

  exibirDetalhes(solicitacao : SolicCompra){
    this.navCtrl.push(DetalhamentoSolicitacaoPage, {solicitacao: solicitacao});
  }

/**
* Metodo utilizado para recuperar dados da base e atualizar a lista em tela
*/
  consultar(){
    this.daoSolicitacoes.getListarTodos().then((result) => {
      this.listaSolicitacoes = <Array<SolicCompra>> result;
    }, (error) => {
        this.showAlert("ERROR: " + error);
        console.log("ERROR: ", error);
    });
  }

/**
* Metodo utilizado para abrir o sincronizando
*/
  abrirLoading(){
    this.loader = this.loadCtrl.create({
      content: "Sincronizando..."
    });
    this.loader.present();
  }

  /**
  * Metodo utilizado para fechar o sincronizando
  */
  fecharLoading(){
    this.loader.dismiss();
  }

  showAlert(texto : string) {
    let alert = this.alertCtrl.create({
      subTitle: texto,
      buttons: ['FECHAR']
    });
    alert.present();
  }

/**
* Metodo utilizado para inserir a solicitação, chamando os metodos do DAO
*/
  public inserirSolicitacao(solicitacao : SolicCompra) {
    this.daoSolicitacoes.createPerson(solicitacao).then((result) => {
        console.log("Solicitação Inserida: " + solicitacao.cd_sol_com);
        //this.showAlert("Inseriu o danado!" + solicitacao.cd_sol_com);
    }, (error) => {
        console.log("ERROR: ", error);
    });
  }

  /**
  * Metodo utilizado para alterar a solicitação, chamando os metodos do DAO
  */
  public alterSolicitacao(solicitacao : SolicCompra) {
    this.daoSolicitacoes.alterPerson(solicitacao).then((result) => {
        console.log("Solicitação Alterada: " + solicitacao.cd_sol_com);
        // this.showAlert("Alterou o danado!" + solicitacao.cd_sol_com);
    }, (error) => {
        console.log("ERROR: ", error);
    });
  }

}

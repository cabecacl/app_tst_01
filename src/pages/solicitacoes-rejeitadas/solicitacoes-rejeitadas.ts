import { Component } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import { DAOSolicitacoesCompras } from '../../app/dao/dao-solicitacoesCompras';
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
  providers : [ServiceSolicitacao]
})
export class SolicitacoesRejeitadasPage {

  daoSolicitacoes : DAOSolicitacoesCompras;
  listaSolicitacoes : SolicCompra[] = new Array<SolicCompra>();
  plataforma : Platform;

  constructor(public navCtrl: NavController, public navParams: NavParams,private platform: Platform,private solicitacoesService : ServiceSolicitacao) {
    this.plataforma = platform;
  }

  ionViewDidLoad() {
    this.daoSolicitacoes = new DAOSolicitacoesCompras(this.plataforma);
    this.buscarSolicitacoes();
  }

  buscarSolicitacoes(){

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

               let solRec = this.daoSolicitacoes.recuperarSolicitacao(item.cd_sol_com);

               if(solRec == null){
                 this.daoSolicitacoes.inserir(item);
               }else{
                 this.daoSolicitacoes.editar(item);
               }
               console.log('Inseriu item:' + item.cd_sol_com);
             }

             console.log("atualizou dados:" + this.listaSolicitacoes.length);

             this.listaSolicitacoes = this.daoSolicitacoes.getList();
           }

           console.log('Busca realizada com sucesso: ' + this.listaSolicitacoes.length);

         });
     }
}

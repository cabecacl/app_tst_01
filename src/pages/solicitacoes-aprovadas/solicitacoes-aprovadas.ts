import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { DAOSolicitacoesCompras } from '../../app/dao/dao-solicitacoesCompras';
import { SolicCompra } from "../../model/solicCompra";
import { ServiceSolicitacao } from "../../app/services/serviceSolicitacoes";

/*
  Generated class for the SolicitacoesAprovadas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-solicitacoes-aprovadas',
  templateUrl: 'solicitacoes-aprovadas.html',
  providers : [ServiceSolicitacao]
})
export class SolicitacoesAprovadasPage {

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

/*  buscarSolicitacoes(){

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
}*/

buscarSolicitacoes(){

  let sol = new SolicCompra();
  sol.cd_sol_com = '444';
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
  sol.cd_sol_com = '555';
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
  sol.cd_sol_com = '777';
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
}

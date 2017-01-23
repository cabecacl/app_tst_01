import { Component } from '@angular/core';

import { NavController, ToastController, ModalController, MenuController } from 'ionic-angular';


import { ConfClientePage } from '../confCliente/confCliente';
import { SolicitacoesComprasPage } from '../solicitacoes-compras/solicitacoes-compras';
import { HomeGraficoPage } from '../home-grafico/home-grafico';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  login : any = {};
  usuario: string = "MV";
  senha: string = "MV12345";
  optionsBoxOpen: boolean;
  optionsBoxData: any;


constructor(public navCtrl: NavController, private toastCtrl: ToastController, private modalCtrl: ModalController,
    public menuCtrl: MenuController) {
    this.menuCtrl.enable(false);
}

  logarConf(req){
      if (req.value != null) {

        if(req.value.senha == this.senha && req.value.usuario == this.usuario){

          this.presentToast('Usuario logado com sucesso!', true);

          console.log("Usuario validado com sucesso!");

          this.navCtrl.push(HomeGraficoPage);

        }else{

          this.presentToast('Usuario Invalido!', false);

          console.log("Usuario Invalido!");
        }
      }else{
          console.log("Nenhum registro para validação!!!");
      }
    }

  criarAlert(texto){

  }

  abrirConfCliente(){
    let modal = this.modalCtrl.create(ConfClientePage);
    modal.onDidDismiss((data) => {
      console.log("contas:" + data);
      //Regrd e salvar configurações
    });

    modal.present();
  }

  /**
* Metodo utilizado para exibir o alerta na parte inferiro da tela ao
* aprovar ou rejeitar uma solicitação
*/
 presentToast(mensagem: string, sucesso : boolean) {
   let toast = this.toastCtrl.create({
     message: mensagem,
     duration: 2000,
     cssClass: sucesso ? "toast-sucesso" : "toast-falha"
   });
   toast.present();
 }

}

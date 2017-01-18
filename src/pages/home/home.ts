import { Component } from '@angular/core';

import { NavController, AlertController, ModalController, MenuController } from 'ionic-angular';

import { ConfClientePage } from '../confCliente/confCliente';
import { SolicitacoesComprasPage } from '../solicitacoes-compras/solicitacoes-compras';


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

  constructor(public navCtrl: NavController, private alertController: AlertController, private modalCtrl: ModalController,
    public menuCtrl: MenuController) {
    this.menuCtrl.enable(false);
  }

  logarConf(req){
    if (req.value != null) {

      if(req.value.senha == this.senha && req.value.usuario == this.usuario){
        let alert = this.alertController.create();
        alert.setTitle('Usuario logado com sucesso!');
        alert.addButton({
          text: 'OK'
        });
        alert.present();
        console.log("Usuario validado com sucesso!");

        this.navCtrl.push(SolicitacoesComprasPage);

      }else{
        let alert = this.alertController.create();
        alert.setTitle('Usuario Invalido!');
        alert.addButton({
          text: 'OK'
        });
        alert.present();
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

}

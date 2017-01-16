import { Component } from '@angular/core';
// import { StatusBar, Splashscreen } from 'ionic-native';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'confCliente.html'
})

export class ConfClientePage{

  view : any;
  conf : any = {};

  constructor(public navCtrl: NavController, public viewCtrl: ViewController){
    this.view = viewCtrl;
  }

  manterConf(req){
    console.log(req.value);
    this.view.dismiss();
  }

  close(){
    this.view.dismiss();
  }
}

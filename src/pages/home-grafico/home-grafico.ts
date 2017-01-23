import { Component } from '@angular/core';
import { NavController, NavParams , MenuController} from 'ionic-angular';


@Component({
  selector: 'page-home-grafico',
  templateUrl: 'home-grafico.html'
})
export class HomeGraficoPage {

  // Grafico
   public pieChartLabels:string[] = ['Solicitações de Compra', 'Ordem de Compra','Solicitação Urgência' ,'Sugestões'];
   public pieChartData:number[] = [100, 70, 50, 20];
   public pieChartType:string = 'doughnut';

   // events
   public chartClicked(e:any):void {
     console.log(e);
   }

   public chartHovered(e:any):void {
     console.log(e);
   }

  constructor(public menuCtrl :MenuController ,public navCtrl: NavController, public navParams: NavParams) {
    this.menuCtrl.enable(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeGraficoPage');
  }

}

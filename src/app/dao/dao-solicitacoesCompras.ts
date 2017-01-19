import { SQLite } from "ionic-native";
import { Platform , AlertController} from 'ionic-angular';

import { SolicCompra } from "../../model/solicCompra";


export class DAOSolicitacoesCompras{

    listaSolicCompra : SolicCompra[];
    database: SQLite;
    plataforma : Platform;

    constructor(private platform: Platform, private alertCtrl : AlertController){

      this.plataforma = platform;

      this.listaSolicCompra = new Array<SolicCompra>();

      this.plataforma.ready().then(() => {
            this.database = new SQLite();
            this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
                // this.refresh();
                console.log('DataBase aberta com sucesso');
            }, (error) => {
                console.log("ERROR: ", error);
            });
        });

    }

    public getList() {

      let listaPesquisa = new Array<SolicCompra>();
      this.plataforma.ready().then(() => {
        this.database.executeSql("SELECT * FROM solicCompra ;", []).then((data) => {

              if(data.rows.length > 0) {

                  for(var i = 0; i < data.rows.length; i++) {

                       let solic: SolicCompra = new SolicCompra();

                       solic.cd_sol_com = data.rows.item(i).cd_sol_com;
                       solic.dt_sol_com = data.rows.item(i).dt_sol_com;
                       solic.tp_situacao = data.rows.item(i).tp_situacao;
                       solic.vl_total = data.rows.item(i).vl_total;
                       solic.checado = false;

                       listaPesquisa.push(solic);
                  }

                  return listaPesquisa;
              }
          }, (error) => {
              console.log("ERROR: " + JSON.stringify(error));
          });
        });
        console.log('Pesquisa retorna:' + listaPesquisa.length);
        return listaPesquisa;
    }



  public inserir(solicitacao : SolicCompra) {

      console.log('Entrou no inserir');
        // this.database.executeSql("INSERT INTO solicCompra (cd_sol_com, dt_sol_com, tp_situacao,vl_total) VALUES ('10', '12/12/2018', 'A', '12345')", []).then((data) => {
      this.plataforma.ready().then(() => {
        this.database.executeSql("INSERT INTO solicCompra (cd_sol_com, dt_sol_com, tp_situacao,vl_total) VALUES (?, ?, ?, ?) ;",
            [solicitacao.cd_sol_com, solicitacao.dt_sol_com, solicitacao.tp_situacao, solicitacao.vl_total]).then((data) => {
            console.log("INSERIDO: " + JSON.stringify(data));
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error.err));
        });
      });
    }

/**
* Metodo utilizado para recuperar uma solicitação através do codigo da solicitação
* Return uma Solicitação ou null
**/
    public recuperarSolicitacao(valor : string) {

      let lista : Array<SolicCompra> = this.getList();

      this.showAlert("DAO Retorno GetList: " +lista.length);

      for(var i = 0; i < lista.length; i++) {

        if(lista[i].cd_sol_com.localeCompare(valor)){
          this.showAlert("DAO item encontrado: " +lista[i].cd_sol_com + ' Do valor passado: ' + valor);
          return lista[i];
        }
      }

      return null;


      // let listaPesquisa = new Array<SolicCompra>();
      // this.plataforma.ready().then(() => {
      //   this.database.executeSql("SELECT * FROM solicCompra where cd_sol_com = " + valor, []).then((data) => {
      //
      //         if(data.rows.length > 0) {
      //
      //             for(var i = 0; i < data.rows.length; i++) {
      //
      //                  let solic: SolicCompra = new SolicCompra();
      //
      //                  solic.cd_sol_com = data.rows.item(i).cd_sol_com;
      //                  solic.dt_sol_com = data.rows.item(i).dt_sol_com;
      //                  solic.tp_situacao = data.rows.item(i).tp_situacao;
      //                  solic.vl_total = data.rows.item(i).vl_total;
      //                  solic.checado = false;
      //
      //                  listaPesquisa.push(solic);
      //             }
      //
      //             return listaPesquisa[0];
      //         }
      //     }, (error) => {
      //         console.log("ERROR: " + JSON.stringify(error));
      //     });
      //   });
      //   console.log('Pesquisa retorna:' + listaPesquisa.length);
      //   return listaPesquisa[0];
    }

/**
* Metodo utilizado para editar uma solicitação de compra na base SQLite
**/
    editar(solicitacao : SolicCompra){
      this.plataforma.ready().then(() => {
        this.database.executeSql("UPDATE solicCompra SET dt_sol_com = ?, tp_situacao = ?, vl_total = ? WHERE dt_sol_com = ?;",
            [solicitacao.cd_sol_com, solicitacao.dt_sol_com, solicitacao.tp_situacao, solicitacao.vl_total, solicitacao.cd_sol_com]).then((data) => {
            console.log("ALTERADO: " + JSON.stringify(data));
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error.err));
        });
      });
    }


    delete(conta){

    }


    showAlert(texto : string) {
      let alert = this.alertCtrl.create({
        subTitle: texto,
        buttons: ['FECHAR']
      });
      alert.present();
    }
}

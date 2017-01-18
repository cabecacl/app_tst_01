import { SQLite } from "ionic-native";
import { Platform } from 'ionic-angular';

import { SolicCompra } from "../../model/solicCompra";


export class DAOSolicitacoesCompras{

    listaSolicCompra : SolicCompra[];
    database: SQLite;

    constructor(private platform: Platform){

      this.listaSolicCompra = new Array<SolicCompra>();

      this.platform.ready().then(() => {
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

      this.database.executeSql("SELECT * FROM solicCompra", []).then((data) => {

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
        console.log('Pesquisa retorna:' + listaPesquisa.length);
        return listaPesquisa;
    }



  public inserir(solicitacao : SolicCompra) {
        console.log('Entrou no inserir');
        // this.database.executeSql("INSERT INTO solicCompra (cd_sol_com, dt_sol_com, tp_situacao,vl_total) VALUES ('10', '12/12/2018', 'A', '12345')", []).then((data) => {
        this.database.executeSql("INSERT INTO solicCompra (cd_sol_com, dt_sol_com, tp_situacao,vl_total) VALUES (?, ?, ?, ?)",
            [solicitacao.cd_sol_com, solicitacao.dt_sol_com, solicitacao.tp_situacao, solicitacao.vl_total]).then((data) => {
            console.log("INSERIDO: " + JSON.stringify(data));
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error.err));
        });
    }

/**
* Metodo utilizado para recuperar uma solicitação através do codigo da solicitação
* Return uma Solicitação ou null
**/
    public recuperarSolicitacao(cd_sol_com : string) {

      this.database.executeSql("SELECT * FROM solicCompra where cd_sol_com = ? ", [cd_sol_com]).then((data) => {

            if(data.rows.length > 0) {

              let sol : SolicCompra = data.rows.item(0);

              return sol;
            }
        }, (error) => {
            console.log(error);
            return null;
        });
    }

/**
* Metodo utilizado para editar uma solicitação de compra na base SQLite
**/
    public editar(solicitacao : SolicCompra){

      this.database.executeSql("UPDATE solicCompra SET dt_sol_com = ?, tp_situacao = ?, vl_total = ? WHERE ID = ?;",
          [solicitacao.cd_sol_com, solicitacao.dt_sol_com, solicitacao.tp_situacao, solicitacao.vl_total, solicitacao.cd_sol_com]).then((data) => {
          console.log("ALTERADO: " + JSON.stringify(data));
      }, (error) => {
          console.log("ERROR: " + JSON.stringify(error.err));
      });

    }



    delete(conta){

    }

}

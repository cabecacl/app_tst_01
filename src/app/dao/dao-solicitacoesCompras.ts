import { SQLite } from "ionic-native";
import { Platform } from 'ionic-angular';

import { SolicCompra } from "../../model/solicCompra";


export class DAOSolicitacoesCompras{

    listaSolicCompra : SolicCompra[];
    public database: SQLite;

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

        return listaPesquisa;
    }

    public inserir(solicitacao : SolicCompra) {
        this.database.executeSql("INSERT INTO solicCompra (cd_sol_com, dt_sol_com, tp_situacao,vl_total) VALUES ('10', '12/12/2018', 'A', '12345')", []).then((data) => {
            console.log("INSERIDO: " + JSON.stringify(data));
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error.err));
        });
    }


//     public getList(){
//
//       let db = new SQLite();
//       db.openDatabase({
//                 name: "data.db",
//                 location: "default"
//             }).then(() => {
//                 db.executeSql("SELECT * FROM solicCompra", []).then((data) => {
//
//             if(data.rows.length > 0) {
//
//                 for(var i = 0; i < data.rows.length; i++) {
//
//                   var solic: SolicCompra = new SolicCompra();
//
//                      solic.cd_sol_com = data.rows.item(i).cd_sol_com;
//                      solic.dt_sol_com = data.rows.item(i).dt_sol_com;
//                      solic.tp_situacao = data.rows.item(i).tp_situacao;
//                      solic.vl_total = data.rows.item(i).vl_total;
//
//                      this.SolicCompra.push(solic);
//               }
//             }
//         }, (error) => {
//             console.error("Unable to execute sql", error);
//             })
//         }, (error) => {
//             console.error("Unable to open database", error);
//         });
//
//   /*    var solic: SolicCompra = new SolicCompra();
//       solic.cd_sol_com = "1";
//       solic.dt_sol_com = "12/01/2017 08:00:00";
//       solic.tp_situacao = "P";
//       solic.vl_total = "125.000,69";
//
//       this.list.push(solic);
//
//       solic = new SolicCompra();
//       solic.cd_sol_com = "5";
//       solic.dt_sol_com = "11/01/2017 13:05:00";
//       solic.tp_situacao = "A";
//       solic.vl_total = "775.055,69";
//
//       this.list.push(solic);
//
//       solic = new SolicCompra();
//       solic.cd_sol_com = "9";
//       solic.dt_sol_com = "10/01/2017 17:30:00";
//       solic.tp_situacao = "R";
//       solic.vl_total = "666.060,41";
//
//       this.list.push(solic);
// */
//       return this.SolicCompra;
//     }

    // inserir(solicitacao : SolicCompra){
    //   let db = new SQLite();
    //   db.openDatabase({
    //             name: "data.db",
    //             location: "default"
    //         }).then(() => {
    //             db.executeSql("INSERT INTO solicCompra (cd_sol_com, dt_sol_com, tp_situacao,vl_total) VALUES (?, ?, ?, ?)",
    //                           [solicitacao.cd_sol_com,
    //                           solicitacao.dt_sol_com,
    //                           solicitacao.tp_situacao,
    //                           solicitacao.vl_total]).then((data) => {
    //                 console.log("INSERIDO: ", data);
    //             }, (error) => {
    //                 console.error("Unable to execute sql", error);
    //             })
    //         }, (error) => {
    //             console.error("Unable to open database", error);
    //         });
    // }

    edit(conta){

    }

    delete(conta){

    }

}

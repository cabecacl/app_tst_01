import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SQLite } from 'ionic-native';
import 'rxjs/add/operator/map';

import { SolicCompra } from "../model/solicCompra";

/*
  Generated class for the DaoSolCompras provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DaoSolCompras {

  private storage: SQLite;
  private isOpen: boolean;

  constructor(public http: Http) {

    if(!this.isOpen) {
    this.storage = new SQLite();
    this.storage.openDatabase({name: "data.db", location: "default"}).then(() => {
        this.storage.executeSql("CREATE TABLE IF NOT EXISTS solicCompra "+
                                        "(id INTEGER PRIMARY KEY AUTOINCREMENT, "+
                                        " cd_sol_com TEXT, "+
                                        " dt_sol_com TEXT, "+
                                        " tp_situacao TEXT, "+
                                        " vl_total TEXT)", []);
          this.isOpen = true;
        });
    }

    console.log('Hello DaoSolCompras Provider');
  }

  public getListarTodos() {
        return new Promise((resolve, reject) => {
          this.storage.openDatabase({name: "data.db", location: "default"}).then(() => {
            this.storage.executeSql("SELECT * FROM solicCompra ", []).then((data) => {
                let listSol = [];
                if(data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++) {
                        listSol.push({
                            cd_sol_com: data.rows.item(i).cd_sol_com,
                            dt_sol_com: data.rows.item(i).dt_sol_com,
                            tp_situacao: data.rows.item(i).tp_situacao,
                            checado: false
                        });
                    }
                }
                resolve(listSol);
            }, (error) => {
                reject(error);
            });
            });
        });
    }

    public createPerson(solicitacao : SolicCompra) {
        return new Promise((resolve, reject) => {
  this.storage.openDatabase({name: "data.db", location: "default"}).then(() => {
            this.storage.executeSql("INSERT INTO solicCompra (cd_sol_com, dt_sol_com, tp_situacao,vl_total) VALUES (?, ?, ?, ?) ",
                                    [solicitacao.cd_sol_com, solicitacao.dt_sol_com, solicitacao.tp_situacao, solicitacao.vl_total]).then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
          });
        });
    }

    public alterPerson(solicitacao : SolicCompra) {
        return new Promise((resolve, reject) => {
            this.storage.openDatabase({name: "data.db", location: "default"}).then(() => {
            this.storage.executeSql("UPDATE solicCompra SET dt_sol_com = ?, tp_situacao = ?, vl_total = ? WHERE cd_sol_com = ?",
                                    [solicitacao.dt_sol_com, solicitacao.tp_situacao, solicitacao.vl_total, solicitacao.cd_sol_com]).then((data) => {
                resolve(data);
            }, (error) => {
                reject(error);
            });
          });
        });
    }

    public getSolicitacoesRejeitadas() {
          return new Promise((resolve, reject) => {
            this.storage.openDatabase({name: "data.db", location: "default"}).then(() => {
              this.storage.executeSql("SELECT * FROM solicCompra tp_situacao = 'R' ", []).then((data) => {
                  let listSol = [];
                  if(data.rows.length > 0) {
                      for(let i = 0; i < data.rows.length; i++) {
                          listSol.push({
                              cd_sol_com: data.rows.item(i).cd_sol_com,
                              dt_sol_com: data.rows.item(i).dt_sol_com,
                              tp_situacao: data.rows.item(i).tp_situacao,
                              checado: false
                          });
                      }
                  }
                  resolve(listSol);
              }, (error) => {
                  reject(error);
              });
              });
          });
      }

      public getSolicitacoesAprovadas() {
            return new Promise((resolve, reject) => {
              this.storage.openDatabase({name: "data.db", location: "default"}).then(() => {
                this.storage.executeSql("SELECT * FROM solicCompra WHERE tp_situacao = 'A' ", []).then((data) => {
                    let listSol = [];
                    if(data.rows.length > 0) {
                        for(let i = 0; i < data.rows.length; i++) {
                            listSol.push({
                                cd_sol_com: data.rows.item(i).cd_sol_com,
                                dt_sol_com: data.rows.item(i).dt_sol_com,
                                tp_situacao: data.rows.item(i).tp_situacao,
                                checado: false
                            });
                        }
                    }
                    resolve(listSol);
                }, (error) => {
                    reject(error);
                });
                });
            });
        }

}

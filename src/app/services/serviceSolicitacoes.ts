import {Http} from '@angular/http';
import 'rxjs/add/operator/map';


export class ServiceSolicitacao {
    static get parameters() {
        return [[Http]];
    }

    constructor(private http:Http) {

    }

    buscarSolicitacoes() {
        var codUsuario = 'dbamv';
        var url = 'http://192.168.6.50:9090/mv-api-solicitacao/solicitacoes?codigo='+codUsuario;
        var response = this.http.get(url).map(res => res.json());
        return response;
    }
}

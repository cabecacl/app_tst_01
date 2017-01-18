import {Http, URLSearchParams, Headers} from '@angular/http';
import 'rxjs/add/operator/map';


export class ServiceSolicitacao {
    static get parameters() {
        return [[Http]];
    }

    constructor(private http:Http) {

    }

    buscarSolicitacoes() {
        var codUsuario = 'dbamv';
        var url = 'http://integracao.mv.com.br:8080/mv-api-solicitacao/solicitacoes?codigo='+codUsuario;
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    buscarDetalhesSolicitacao(codigoSolicitacao : number){
      var url = 'http://integracao.mv.com.br:8080/mv-api-solicitacao/solicitacoes/'+codigoSolicitacao;
      var response = this.http.get(url).map(res => res.json());
      return response;
    }
}

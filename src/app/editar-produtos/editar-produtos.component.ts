import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-produtos',
  templateUrl: './editar-produtos.component.html',
  styleUrls: ['./editar-produtos.component.css'],
})
export class EditarProdutosComponent implements OnInit {
  mensagem: string = '';

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //capturar o id enviado pela URL
    const idProduto = this.activatedRoute.snapshot.paramMap.get('id') as string;

    //consultar o produto na API através do ID
    this.httpClient
      .get(environment.apiUrl + '/produtos/' + idProduto)
      .subscribe(
        (data: any) => {
          //preenchendo os campos do formulario com os dados do produto
          this.formEdicao.patchValue(data);
        },
        (e) => {
          console.log(e);
        }
      );
  }
  //montando a estrutura do formulario
  formEdicao = new FormGroup({
    //campos do formulario ..serao os mesmos campos que temos na consulta, iremos acrescentar o id

    idProduto: new FormControl(''),
    nome: new FormControl('', [Validators.required]),
    preco: new FormControl('', [Validators.required]),
    quantidade: new FormControl('', [Validators.required]),
    descricao: new FormControl('', [Validators.required]),
  });
  get form(): any {
    return this.formEdicao.controls;
  }

  onSubmit(): void {
    this.httpClient.put(environment.apiUrl + '/produtos', this.formEdicao.value,{responseType:'text'}).subscribe(data => {
      this.mensagem = data;

    },
    e =>{
      this.mensagem = " Ocorreu um erro ao tentar editar o produto";
      console.log(e);
    }
    );
  }
}

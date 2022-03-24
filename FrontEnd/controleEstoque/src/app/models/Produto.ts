import { Fornecedor } from './Fornecedor';
import { Categoria } from './categoria';
export class Produto {

  descricao:string='';
  id:number=0;
  imagemUrl:string='';
  quantidadeEstoque:number=0;
  quantidadeMinima:number=0;
  valor:number=0;
  valorTotal:number=0;
  categoria:Categoria[]=[];
  categoriaId:number=0;
  fornecedorId:number=0;
  fornecedor: Fornecedor[]=[];
  destacarImagem: boolean = false;
  imagemDestaque: string='';


}

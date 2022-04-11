# ControleEstoque

- Meu primeiro sistema full stack desenvolvido em .Net 3.1 e Angular 13 com MySQL para fins didáticos e incremento do portifólio.

Sistema de controle de estoque e venda de produtos. 
- O sistema a principio terá acesso liberado somente a pessoas autorizadas, com usuario criado;
- Após seu cadastro, o usuario poderá visualizar todos os produtos, colocar no carrinho e efetuar a compra;
- Na pagina principal será mostrado também imagens dos produtos aleatóriamente;
- Cadastro de usuários (Administrador no primeiro acesso, usuarios, funcionarios, fornecedores);
- O Administrador e funcionário poderão fazer o cadastro de produtos, inserindo quantidade de estoque, valores e imagens. Bem como selecionar imagens de destaque;
- Usuario poderá acessar o sistema e efetuar a compra dos produtos de acordo com a quantidade disponivel. Sua senha poderá expirar após 30 dias do cadastro e será bloqueado
- caso erre mais de 5x;

Tecnologia do sistema:
Desenvolvimento fullstack webApi.Net3.1 e Angular 13

- No BackEnd estou utilizando a liguagem de programação C# webAPI RestFull .net3.1 com Entity Framework;
- Padrão de desenvolvimento DDD, seguindo padronização de camadas;
- JWT para autorização e autenticação dos usuarios cadastrados;
- Não foi utilizado Identity, porque neste projeto preferi fazer todo processo de autenticação e autorização manualmente. Validando o usuario, expiração de senha, 
bloqueio e desbloqueio de usuario com gestão do administrador do sistema.

- No Front estou utilizando a lingaguem de programação Angular 13 e Material Design;
- Databiddings;
- Guarda de Rotas;
- Observables;
- Services com injeção de dependencias;
- TypeScript e JavaScript puro;
- Será implmentado dashboard com relatorios estatisticos e graficos;

Como este é meu primeiro projeto autoral e solo, sofrerá atualizações e correções constantes.
Qualquer sugestão ou duvida estou a disposição.

by rCastilho - rcastilho@gmail.com

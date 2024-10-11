 -- show tables;
-- describe pedidos;
-- describe usuarios;
-- describe perfis;

-- select usuarios.Nome, usuarios.Email, pedidos.Id   
-- from usuarios 
-- inner join pedidos 
-- on usuarios.id = pedidos.UsuarioId;

-- select usuarios.Nome, usuarios.Email, pedidos.Id    
-- from usuarios
-- inner join pedidos 
-- on usuarios.id = pedidos.UsuarioId;

select * from categorias;
-- carregar itens com campo null
SELECT * FROM categorias where Deleted is null;

select * from fornecedores order by razaosocial asc;
select * from itenscarrinho;
select * from pedidos;
select * from perfis;
select * from produtos;
select * from usuarios;
select * from funcao;

-- INSERT INTO FUNCAO (funcao, descricao) VALUES ("Visitante","Consulta e compra produtos");
-- INSERT INTO perfis (usuarioId, funcaoId) VALUES (29, 2);

-- select 
-- produtos.Descricao, produtos.Valor, 
-- itenscarrinho.ProdutoId, itenscarrinho.Quantidade "quantidade  comprada" 
-- from produtos 
-- inner join itenscarrinho 
-- on ProdutoId = produtos.Id;

-- select produtos.Descricao, produtos.QuantidadeEstoque, produtos.Valor, produtos.ImagemUrl, categorias.Descricao 
-- from produtos 
-- inner join categorias on produtos.CategoriaId = categorias.Id
-- where categorias.Descricao like "%%"
-- order by produtos.Descricao asc;

-- Insert into pedidos (UsuarioId, ValorTotal, TiposPagamentos, StatusPedidos)
-- select (1, 500, 3, 1)from usuarios;

-- select perfis.Funcoes from perfis inner join usuarios on perfis.PerfilId = usuarios.id where usuarios.Id = 25;

-- carrega pefil do usuario de acordo com email
-- select usuarios.id as uid , usuarios.Nome , usuarios.Email, funcao.id, funcao.funcao from usuarios
-- inner join perfis on perfis.UsuarioId = usuarios.Id
-- inner join funcao on funcao.id = perfis.FuncaoId
-- where usuarios.Email="vvvvvvvvvvvvv@dmdmd.com";

-- selecionar usuario por id
-- SELECT nome, email, cpf, imagemperfil, UltimoAcesso, PasswordExpirationDate FROM usuarios
-- WHERE usuarios.id = 1;

-- delete from usuarios where id between 5  and 45;
-- select * from usuarios;

-- UPDATE usuarios SET nome="usuarioAtualizado", email="usuarioatualizado@email.com", imagemperfil="perfil.png" where id= 47;

-- SELECT nome, email, cpf, imagemperfil, createAt, blocked, deleted, passwordExpirationDate FROM usuarios;

-- SELECT nome, email, cpf, imagemperfil, createAt, blocked, deleted, passwordExpirationDate FROM usuarios WHERE nome LIKE "%usu%" order by nome asc;

-- paginação
select * from usuarios limit 10 offset 0;

select * from produtos;

SELECT p.Id, p.Descricao produto, p.QuantidadeEstoque, p.QuantidadeMinima, p.Valor, p.ValorTotal, p.ImagemUrl, c.Descricao categoria,f.RazaoSocial
FROM produtos p
inner join categorias c on p.CategoriaId = c.Id
inner join fornecedores f on p.FornecedorId = f.Id
WHERE c.Descricao = "Materiais elétricos"
-- where p.DestacarImagem > 0
order by p.Id asc
-- limit 5 offset 0
;

-- INSERT INTO produtos (createAt, descricao, quantidadeEstoque, quantidadeMinima, Valor, ValorTotal, CategoriaId, ImagemUrl, imagemdestaque, destacarimagem, FornecedorId) 
-- values (now(), "novoproduto", 100, 50, 250, 5000, 2, "imagem", "destaque", 0, 2);

-- UPDATE produtos SET deleteAt=now(), deleted=1 WHERE id = 12; 

-- UPDATE produtos 
-- SET updateAt=now(), descricao="descri", quantidadeEstoque=1, quantidademinima=1, valor=40, valortotal=300, categoriaId=1, imagemurl="testando", imagemdestaque=1, fornecedorid=3
-- where id=12; 

SELECT * FROM produtos
WHERE produtos.Descricao like "%ja%";

SELECT p.Id, p.Descricao produto, p.QuantidadeEstoque, p.QuantidadeMinima, p.Valor, p.ValorTotal, p.ImagemUrl, c.Descricao categoria,f.RazaoSocial
    FROM produtos p
    INNER JOIN categorias c ON p.CategoriaId = c.Id
    INNER JOIN fornecedores f ON p.FornecedorId = f.Id
    WHERE p.Descricao 
    LIKE "%ca%"
    ORDER BY p.Id ASC;
    
    SELECT p.Id, p.Descricao produto, p.QuantidadeEstoque, p.QuantidadeMinima, p.Valor, p.ValorTotal, p.ImagemUrl, c.Descricao categoria,f.RazaoSocial
    FROM produtos p
    INNER JOIN categorias c ON p.CategoriaId = c.Id
    INNER JOIN fornecedores f ON p.FornecedorId = f.Id
    WHERE p.CategoriaId = 2
    ORDER BY p.Id ASC;
    
    INSERT INTO produtos
    (createAt, descricao, quantidadeEstoque, quantidadeMinima, valor, valorTotal, CategoriaId, ImagemUrl, fornecedorId)
    VALUES(now(), "abcdefghij", 100, 10, 2, 200, 1, "imagemteste", 9);
    
    -- pegando usuario que emitiu mais pedidos 
    SELECT pedidos.UsuarioId, count(usuarioId) from pedidos group by usuarioid;

-- selecionando os produtos mais comprados
select ProdutoId, p.descricao, count(ProdutoId) as contagem from itenscarrinho i
inner join produtos p on  i.produtoid = p.id
group by ProdutoId
having (ProdutoId)
order by contagem desc;
-- limit 1
-- se quiser trazer somente o mais comprado

SELECT 	* FROM pedidos;
INSERT INTO PEDIDOS (createAt, UsuarioId, ValorTotal, TiposPagamentos, StatusPedidos) VALUES (now(), 1, 200, 1, 1);

INSERT INTO itenscarrinho (pedidoId, produtoId, quantidade, valor) VALUES (
187, 47, 1, 200),
(187, 46, 2, 400
);
SELECT 	* FROM pedidos;
SELECT * FROM produtos;
SELECT 	* FROM itenscarrinho;

SELECT i.pedidoid, p.descricao, i.Quantidade, i.Valor, pe.valortotal, u.Nome  from itenscarrinho i
inner join produtos p on i.ProdutoId = p.Id
inner join pedidos pe on i.PedidoId = pe.id
inner join usuarios u on pe.UsuarioId = u.Id;
-- group by pe.valortotal;


SELECT f.id idfornecedor, f.razaosocial fornecedores, c.id idcategoria, c.descricao cateorias 
FROM fornecedores f, categorias c;

UPDATE produtos SET quantidadeestoque = (quantidadeestoque-1) where id = 49;
select * from produtos where id = 49;

SELECT quantidadeestoque FROM produtos where id = 1;

SELECT id, CreateAt, UsuarioId, ValorTotal, TiposPagamentos, StatusPedidos FROM pedidos where usuarioId = 48 order by CreateAt desc;
select * from pedidos where id = 260;

SELECT p.id, p.UsuarioId as usuarioId, p.ValorTotal as valorTotal, p.TiposPagamentos as tiposPagamento, p.StatusPedidos as statusPedidos, i.ProdutoId, pr.Descricao, i.quantidade, pr.Valor, pr.ImagemUrl
FROM pedidos p 
INNER JOIN itenscarrinho i ON p.id = i.PedidoId
INNER JOIN produtos pr ON i.produtoId = pr.Id
where p.id = 232;

select * from pedidos where usuarioid = 48  order by createat desc limit 50 offset 0;

select count(id) as totalItens from pedidos where UsuarioId=48;

SELECT p.Id, p.Descricao produto, p.QuantidadeEstoque, p.QuantidadeMinima, p.Valor, p.ValorTotal, p.ImagemUrl, p.deleted, c.Descricao categoria,f.RazaoSocial
    FROM produtos p
    INNER JOIN categorias c ON p.CategoriaId = c.Id
    INNER JOIN fornecedores f ON p.FornecedorId = f.Id
    ORDER BY p.Id ASC
    LIMIT 5 OFFSET 0;
    
    SELECT COUNT(id) FROM produtos;
    
select * from produtos where Descricao="mesa";

SELECT count(id) FROM pedidos;
SELECT * FROM itenscarrinho;
SELECT * FROM produtos;
SELECT * FROM categorias;

-- SELECT  from pedidos;

SELECT count(ped.id) quantidade, c.descricao categoria
FROM itenscarrinho i
inner join produtos p on i.ProdutoId = p.id
inner join categorias c on p.CategoriaId = c.id 
inner join pedidos ped on ped.id = i.PedidoId
group by categoria
;

SELECT count(id) quantidade ,count(deleted) deletados FROM usuarios;

SELECT deleted FROM USUARIOS;

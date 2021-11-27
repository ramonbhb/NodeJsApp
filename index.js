const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
let dados = require('./dados.json');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

/* PRODUTOS */
// Listar todos os Produtos
app.get('/produtos', (req,res) => {
    res.status(200).json(dados);
})


//Listar apenas um produto pelo Id
//* https://localhost:3000/produto/5 */
app.get('/produto/:id', (req,res) => {
    let buscaidProduto = req.params.id;
    let produto;        
    for (i=0;i<dados.length;i++) {                
        if (dados[i].idProduto == buscaidProduto) {
                produto = dados[i];
                break;
        }
    }    
    if (produto) mensagem = "Produto Encontrado"
    else mensagem = "Produto Não Encontrado"    
    res.statusCode = 200;
    res.json({produto: produto, mensagem: mensagem}); 
})

//Filtrar Produtos por Preço
app.get('/buscaProduto', (req,res) => {
    let query = req.query;
    //console.log(query);
    let ratingMin = query.ratingMin;
    let ratingMax = query.ratingMax;
    let produtos = [];

    if (ratingMin && ratingMax) {        
        for (i=0;i<dados.length;i++) {                
            if ((dados[i].rating >= ratingMin) && (dados[i].rating <= ratingMax)) {
                produtos.push(dados[i]);                
            }
        }     
    }
    else if (ratingMin && !ratingMax) {
        for (i=0;i<dados.length;i++) {                
            if ((dados[i].rating >= ratingMin)) {
                produtos.push(dados[i]);                
            }
        } 
    }
    else if (ratingMax && !ratingMin) {
        for (i=0;i<dados.length;i++) {                
            if ((dados[i].rating <= ratingMax)) {
                produtos.push(dados[i]);                
            }
        }
    }
    else {
        res.status(200).json("Utilize parâmetros ratingMin ou ratingMax");
    }
    res.status(200).json(produtos);        
})


/* POST inserir Produto */

app.post('/produto', (req,res) => {
    let produto = req.body;

    if (!produto.descricao || !produto.preco) {
        res.status(200).json("Para cadastrar o produto informe todos os dados")
    }
    else {
        res.status(200).json("Produto inserido com sucesso")
    }    
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
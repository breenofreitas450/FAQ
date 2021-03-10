
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./databases/databases");
const pergunta = require("./databases/Pergunta");
const Pergunta = require("./databases/Pergunta");

//Conexão com o Banco
connection
    .authenticate()
    .then(()=>{
        console.log('Conexão efetuada com sucesso.');
    })
    .catch((msgErro)=>{
        console.log(msgErro);
    })

//Engine de Visualização/ Pastas Estaticas
app.set('view engine', 'ejs');
app.use(express.static('public'));
//Body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//ROTAS
app.get("/", function(req,resp){
    // Select ALL From ou equivalente a estrutura de tabela criada nesse metodo
    Pergunta.findAll({raw: true}).then(perguntas => {
        resp.render("index",{
            perguntas:perguntas
        });
    });
});

app.get("/perguntar", function(req,resp){
    resp.render("perguntar");
});

app.post("/salvarpergunta", (req,resp) =>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    pergunta.create({
        titulo: titulo, 
        descricao: descricao
    }).then(() =>{
        resp.redirect('/');
    })
});


app.listen(4000,() =>{console.log("Aplicação rodando");});
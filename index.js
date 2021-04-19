
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./databases/databases");
const pergunta = require("./databases/Pergunta");
const resposta = require("./databases/Resposta")


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
app.get("/", function(req,res){
    // Select ALL From ou equivalente a estrutura de tabela criada nesse metodo
    pergunta.findAll({raw: true, order:[
        ['id','DESC'] // Order By
    ]}).then(perguntas => {
        res.render("index",{
            perguntas:perguntas
        });
    });
});

app.get("/perguntar", function(req,res){
    res.render("perguntar");
});


app.get("/pergunta/:id", function(req,res){
    var id = req.params.id;
    pergunta.findOne({
        where: {id:id}
    }).then(perguntas => {
        if(pergunta != undefined){
            resposta.findAll({
                where: {perguntaId: id},
                order: [['id', 'DESC']]
            }).then((respostas) =>{
                res.render("pergunta",{
                    pergunta: perguntas,
                    resposta: respostas
                });
            })
        }else{
            Response.redirect("/");
        }
       
    });
});

app.post("/salvarpergunta", (req,res) =>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    pergunta.create({
        titulo: titulo, 
        descricao: descricao
    }).then(() =>{
        res.redirect('/');
    })
});

app.post("/responderpergunta",(req,res) =>{
    var id = req.body.pergunta;
    var corpo = req.body.corpo;
    console.log(id)
    resposta.create({
        corpo: corpo,
        PerguntaId: id
    }).then(() =>{
        res.redirect("/pergunta/"+id);
    })
});


app.listen(4000,() =>{console.log("Aplicação rodando");});
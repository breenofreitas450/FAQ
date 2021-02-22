const Sequelize = require("sequelize");
const connection = require("./databases")

const Pergunta = connection.define('pergunta',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force:false}).then(()=>{
    console.log('Tabela Criada.');
})
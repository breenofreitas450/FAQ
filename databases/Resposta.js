const Sequelize = require("sequelize");
const connection = require("./databases");

const Resposta = connection.define("resposta",{
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    PerguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

//Não recriar a tabela caso ela não exista.
Resposta.sync({force: false});
module.exports = Resposta;
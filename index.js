const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3002; //porta padrão
const mysql = require('mysql');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);


//inicia o servidor
app.listen(port);
console.log('API funcionando!');




//Rota Cliente! Executa a funçao ExecSQL que vem de outra funciao
router.get('/clientes', (req, res) => {
    execSQLQuery('SELECT * FROM Clientes', res);
})

//filtro clientes por ID
router.get('/clientes/:id?', (req, res) => {
    let filter = '';
    if (req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM Clientes' + filter, res);
})

//Deletar cliente pelo {ID} Usar algum Editor!!!
router.delete('/clientes/:id', (req, res) => {
    execSQLQuery('DELETE FROM Clientes WHERE ID=' + parseInt(req.params.id), res);
})



//Criar um Item no banco
router.post('/clientes', (req, res) =>{
    const nome = req.body.nome.substring(0,150);
    const cpf = req.body.cpf.substring(0,11);
    execSQLQuery(`INSERT INTO Clientes(Nome, CPF) VALUES('${nome}','${cpf}')`, res);
});


function execSQLQuery(sqlQry, res) {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'nodesql'
    });


    connection.query(sqlQry, function (error, results, fields) {
        if (error)
            res.json(error);
        else
            res.json(results);
        connection.end();
        console.log('Quary chamada!');
    });
}
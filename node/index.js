const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user:'root',
    password:'root',
    database:'nodedb'
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)


app.get('/', (req, res) => {
    const novoNome = gerarNomeAleatorio();

    // Insere o novo nome no banco de dados
    const sql = `INSERT INTO people (name) VALUES ('${novoNome}')`;
    connection.query(sql, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Erro ao inserir o nome no banco de dados');
        } else {
            // Consulta todos os nomes no banco de dados após a inserção
            const query = 'SELECT name FROM people';
            connection.query(query, (err, results) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).send('Erro ao buscar nomes no banco de dados');
                } else {
                   // Constrói o HTML dinamicamente
                   let htmlResponse = '<h1>Full Cycle Rocks</h1>';
                   htmlResponse += '<ul>';
                   results.forEach(row => {
                       htmlResponse += `<li>${row.name}</li>`;
                   });
                   htmlResponse += '</ul>';

                   // Envia a resposta com o HTML construído
                   res.send(htmlResponse);    }
            });
        }
    });
});
app.listen(port,()=>{
    console.log('Rodando na porta' +port)
})


function gerarNomeAleatorio() { 
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
    let nome = ''; 
     for (let i = 0; i < 5; i++) {  
        nome += letras.charAt(Math.floor(Math.random() * letras.length));  
     }     
    return nome;
}
var objectId = require('mongodb').ObjectId;

function JogoDAO() {}

JogoDAO.prototype.gerarParametros = function (usuario) {
    global.mongo.connect(global.dbUrl, function (error, client) {
        const db = client.db(global.dbName);
        db.collection('jogo', function (error, collection) {
            collection.insert({
                usuario: usuario,
                moeda: 20,
                suditos: 5,
                temor: Math.floor(Math.random() * 1000),
                sabedoria: Math.floor(Math.random() * 1000),
                comercio: Math.floor(Math.random() * 1000),
                magia: Math.floor(Math.random() * 1000)
            });
        });
        client.close();
    });
}

JogoDAO.prototype.iniciaJogo = function (response, usuario, casa, msg) {
    global.mongo.connect(global.dbUrl, function (error, client) {
        if (error) {
            console.log(error);
        } else {
            const db = client.db(global.dbName);
            db.collection('jogo', function (error, collection) {
                collection.find(usuario).toArray(function (error, result) {
                    response.render("jogo", {
                        img_casa: casa,
                        jogo: result[0],
                        msg: msg
                    })
                });
            });
            client.close();
        }
    });
}

JogoDAO.prototype.acao = function (acao) {
    global.mongo.connect(global.dbUrl, function (error, client) {
        const db = client.db(global.dbName);
        db.collection('acao', function (error, collection) {
            let date = new Date();
            let tempo = undefined;
            switch (parseInt(acao.acao)) {
                case 1:
                    tempo = 1 * 60 * 60000;
                    break;
                case 2:
                    tempo = 2 * 60 * 60000;
                    break;
                case 3:
                    tempo = 5 * 60 * 60000;
                    break;
                case 4:
                    tempo = 5 * 60 * 60000;
                    break;
            }
            acao.termino = date.getTime() + tempo;
            collection.insert(acao);
        });
        db.collection('jogo', function (error, collection) {
            var moedas = undefined;
            switch (parseInt(acao.acao)) {
                case 1:
                    moedas = -2 * acao.quantidade;
                    break;
                case 2:
                    moedas = -3 * acao.quantidade;
                    break;
                case 3:
                    moedas = -1 * acao.quantidade;
                    break;
                case 4:
                    moedas = -1 * acao.quantidade;
                    break;
            }
            collection.update({
                usuario: acao.usuario
            }, {
                $inc: {
                    moeda: moedas
                }
            });
        });
        client.close();
    });
}

JogoDAO.prototype.getAcoes = function (usuario, response) {
    global.mongo.connect(global.dbUrl, function (error, client) {
        const db = client.db(global.dbName);
        db.collection('acao', function (error, collection) {
            var agora = new Date().getTime();
            collection.find({
                usuario: usuario,
                termino: {
                    $gt: agora
                }
            }).toArray(function (error, result) {
                response.render("pergaminhos", {
                    data: result
                })
            });
        });
        client.close();
    });
}

JogoDAO.prototype.revogarAcao = function (id, response) {
    global.mongo.connect(global.dbUrl, function (error, client) {
        const db = client.db(global.dbName);
        db.collection('acao', function (error, collection) {
            collection.remove({
                _id: objectId(id)
            }, function (error, result) {
                response.redirect("jogo?msg=success");
            });
        })
    });
}

module.exports = function () {
    return JogoDAO;
}
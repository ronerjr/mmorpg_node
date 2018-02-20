function JogoDAO(){}

JogoDAO.prototype.gerarParametros = function(usuario){
    global.mongo.connect(global.dbUrl, function(error, client){
        const db = client.db(global.dbName);
        db.collection('jogo', function(error, collection){
            collection.insert({
                usuario: usuario,
                moeda: 20,
                suditos: 5,
                temor: Math.floor(Math.random()*1000),
                sabedoria: Math.floor(Math.random()*1000),
                comercio: Math.floor(Math.random()*1000),
                magia: Math.floor(Math.random()*1000)
            });
        });
        client.close();
    });
}

JogoDAO.prototype.iniciaJogo = function(response, usuario, casa, comandoInvalido){
    global.mongo.connect(global.dbUrl, function(error, client){
        if(error) {
            console.log(error);
        } else {
            const db = client.db(global.dbName);
            db.collection('jogo', function(error, collection){
                collection.find(usuario).toArray(function(error, result){
                    response.render("jogo", {img_casa: casa, jogo: result[0], comandoInvalido: comandoInvalido})
                });
            });
            client.close();
        }
    });
}

module.exports = function(){
    return JogoDAO;
}
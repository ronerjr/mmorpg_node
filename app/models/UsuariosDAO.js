function UsuariosDAO(){
}

UsuariosDAO.prototype.inserirUsuario = function(usuario) {
    global.mongo.connect(global.dbUrl, function(error, client){
        const db = client.db(global.dbName);
        db.collection('usuarios', function(error, collection){
            collection.insert(usuario);
        });
        client.close();
    });
}

UsuariosDAO.prototype.autenticar = function(login, request, response) {
    global.mongo.connect(global.dbUrl, function(error, client){
        if(error) {
            console.log(error);
        } else {
            const db = client.db(global.dbName);
            db.collection('usuarios', function(error, collection){
                collection.find(login).toArray(function(error, result){
                    if(error) {
                        console.error(error);
                    } else {
                        if(result[0]){
                            request.session.autorizado = true;
                            request.session.usuario = result[0].usuario;
                            request.session.casa = result[0].casa;
                        }
                        if(request.session.autorizado){
                            response.redirect("jogo");
                        } else {
                            response.render("index", {validacao: {}});                 
                        }
                    }
                });
            });
            client.close();
        }
    });
}

module.exports = function(){
    return UsuariosDAO;
}
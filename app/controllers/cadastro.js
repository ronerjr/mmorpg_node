module.exports.cadastro = function(application, request, response){
    response.render('cadastro', {validacao: {}, formData: {}});
}

module.exports.cadastrar = function(application, request, response){
    var formData = request.body;
    request.assert('nome', 'Nome não pode ser vazio').notEmpty();
    request.assert('usuario', 'Usuario não pode ser vazio').notEmpty();
    request.assert('senha', 'Senha não pode ser vazio').notEmpty();
    request.assert('casa', 'Casa não pode ser vazio').notEmpty();

    var errors = request.validationErrors();

    if(errors){
        response.render('cadastro', {validacao: errors, formData: formData});
        return;
    }
    var usuarioDao = new application.app.models.UsuariosDAO();
    var jogoDao = new application.app.models.JogoDAO();
    usuarioDao.inserirUsuario(formData);
    jogoDao.gerarParametros(formData.usuario);

    response.send('MEU TESTE');
    
}
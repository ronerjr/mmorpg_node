module.exports.jogo = function (application, request, response) {
    if (request.session.autorizado) {
        var jogoDao = new application.app.models.JogoDAO();
        var msg = request.query.msg || undefined;

        jogoDao.iniciaJogo(response, request.session.usuario, request.session.casa, msg);
    } else {
        response.redirect('/');
    }
}

module.exports.sair = function (application, request, response) {
    request.session.destroy(function (error) {
        response.render('index', {
            validacao: {}
        });
    });
}

module.exports.suditos = function (application, request, response) {
    if (!request.session.autorizado) {
        response.send("Precisa fazer login!");
        return;
    }
    response.render("aldeoes");
}

module.exports.pergaminhos = function (application, request, response) {
    if (!request.session.autorizado) {
        response.send("Precisa fazer login!");
    }
    var jogoDAO = new application.app.models.JogoDAO();
    jogoDAO.getAcoes(request.session.usuario, response);
}

module.exports.ordenarAcaoSudito = function (application, request, response) {
    if (!request.session.autorizado) {
        response.send("Precisa fazer login!");
        return;
    }
    var formData = request.body;

    request.assert('acao', 'Ação deve ser informada').notEmpty();
    request.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

    var errors = request.validationErrors();

    if (errors) {
        response.redirect('jogo?msg=error');
        return;
    }

    formData.usuario = request.session.usuario;
    var jogoDAO = new application.app.models.JogoDAO();
    jogoDAO.acao(formData);
    response.redirect('jogo?msg=success');
}

module.exports.revogarAcao = function (application, request, response) {
    var query = request.query;
    var jogoDAO = new application.app.models.JogoDAO();
    jogoDAO.revogarAcao(query.idAcao, response);
}
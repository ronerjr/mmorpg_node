module.exports.jogo = function (application, request, response) {
    if (request.session.autorizado) {
        var jogoDao = new application.app.models.JogoDAO();
        var comandoInvalido = request.query.comandoInvalido || false;

        jogoDao.iniciaJogo(response, request.session.usuario, request.session.casa, comandoInvalido);
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
    if (request.session.autorizado) {
        response.render("aldeoes");
    } else {
        response.redirect("/");
    }
}

module.exports.pergaminhos = function (application, request, response) {
    if (request.session.autorizado) {
        response.render("pergaminhos");
    } else {
        response.redirect("/");
    }
}

module.exports.ordenarAcaoSudito = function (application, request, response) {
    if (!request.session.autorizado) {
        response.redirect("/");
        return;
    }
    var formData = request.body;

    request.assert('acao', 'Ação deve ser informada').notEmpty();
    request.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

    var errors = request.validationErrors();

    if (errors) {
        response.redirect('jogo?comandoInvalido=true');
        return;
    }

    response.send('ok')
}
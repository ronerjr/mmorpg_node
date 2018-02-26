module.exports = function(application){
	application.get('/jogo', function(request, response){
		application.app.controllers.jogo.jogo(application, request, response);
	});

	application.get('/sair', function(request, response){
		application.app.controllers.jogo.sair(application, request, response);
	});

	application.get('/suditos', function(request, response){
		application.app.controllers.jogo.suditos(application, request, response);
	});

	application.get('/pergaminhos', function(request, response){
		application.app.controllers.jogo.pergaminhos(application, request, response);
	});

	application.post('/ordenarAcaoSudito', function(request, response){
		application.app.controllers.jogo.ordenarAcaoSudito(application, request, response);
	});

	application.get('/revogarAcao', function(request, response){
		application.app.controllers.jogo.revogarAcao(application, request, response);
	});
}
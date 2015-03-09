/**
 * New node file
 */

exports.list = function(req, res) {

	req.getConnection(function(err, connexion) {

		var query = connexion.query('SELECT * FROM client',
				function(err, rows) {

					if (err)
						console.log("Error Selecting : %s ", err);

					res.render('client', {
						page_title : "Page du Client",
						data : rows
					});

				});
	});

};

exports.add = function(req, res) {
	res.render('add_client',{page_title:'Hotel - Ajout d\'un Client'});
};


exports.save = function(req,res){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connexion){
		var data = {
			NomClient:input.nomClient,
			AdresseClient:input.adresseClient
		};
		var query = connexion.query("INSERT INTO Client SET ?",data, function(err,rows){
			if(err)
				throw err;
			res.redirect('/client');
		});
	});
};

exports.edit = function(req,res){
	var id = req.params.id;
	
	req.getConnection(function(err,connexion){
		var query = connexion.query('SELECT * FROM client WHERE idClient=?',[id],function(err,rows){
			if (err) throw err;
			res.render('edit_client',{page_title:'Modification des données ',data:rows});
		});
	});
};

exports.save_edit = function(req,res){
	var input = JSON.parse(JSON.stringify(req.body));
	var id = req.params.id;
	req.getConnection(function(err,connexion){
		var data = {
			NomClient:input.nomClient,
			AdresseClient:input.adresseClient
		};
		var query = connexion.query("UPDATE Client SET ? WHERE idClient=?",[data,id], function(err,rows){
			if(err)
				throw err;
			res.redirect('/client');
		});
	});
};

exports.delete_save = function(req,res){
	var id = req.params.id;
	req.getConnection(function(err,connexion){
		var query = connexion.query("DELETE FROM Client WHERE idClient=?",[id],function(err,rows){
			if(err) throw err;
			res.redirect('/client');
		});
	});
};

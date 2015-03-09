exports.list = function(req,res){
	req.getConnection(function(err,connexion){
		var query = connexion.query("SELECT * FROM Chambre",function(err,rows){
			if (err) throw err;
			res.render('./chambre',{page_title:'Hotel - Chambre',data:rows});
		});
	});
};

exports.add = function(req, res) {
	res.render('add_chambre',{page_title:'Hotel - Ajout d\'une Chambre'});
};

exports.save = function(req,res){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err,connexion){
		var data ={
			numeroChambre:input.numeroChambre,
			typeChambre:input.typeChambre,
			tailleChambre:input.tailleChambre
		};
		var query = connexion.query("INSERT INTO Chambre SET ?",data,function(err,rows){
			if (err) throw err;
			res.redirect('/chambre');
		});
	});
};

exports.edit = function(req,res){
var id = req.params.id;
	
	req.getConnection(function(err,connexion){
		var query = connexion.query('SELECT * FROM chambre WHERE idChambre=?',[id],function(err,rows){
			if (err) throw err;
			res.render('edit_chambre',{page_title:'Modification des données ',data:rows});
		});
	});
};

exports.save_edit = function(req,res){
	var input = JSON.parse(JSON.stringify(req.body));
	var id = req.params.id;
	req.getConnection(function(err,connexion){
		var data ={
			numeroChambre:input.numeroChambre,
			typeChambre:input.typeChambre,
			tailleChambre:input.tailleChambre
		};
		var query = connexion.query("UPDATE Chambre SET ? WHERE idChambre=?",[data,id],function(err,rows){
			if (err) throw err;
			res.redirect('/chambre');
		});
	});
};

exports.delete_save = function(req,res){
	var id = req.params.id;
	req.getConnection(function(err,connexion){
		var query = connexion.query("DELETE FROM Chambre WHERE idChambre=?",[id],function(err,rows){
			if(err) throw err;
			res.redirect('/chambre');
		});
	});
};
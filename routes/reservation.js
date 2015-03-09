exports.list = function(req, res) {
	req.getConnection(function(err, connexion) {
		var query = connexion.query("SELECT * FROM Reservation", function(err,
				rows) {
			if (err)
				throw err;
			res.render('./reservation', {
				page_title : 'Page des réservations',
				data : rows
			});
		});
	});
};

exports.add = function(req, res) {
	req.getConnection(function(err,connexion){
		var query= connexion.query("SELECT * FROM Client",function(err,rows){
			if (err) throw err;
			res.render('add_reservation', {
				page_title : 'Ajout d\'une réservation',
				data:rows
			});
		});
	});
};

exports.save = function(req, res) {
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err, connexion) {
		var data = {
			Numero : input.numero,
			Client_int:input.Client,
			DateDebut : input.dateDebut,
			DateFin : input.dateFin
		};
		var query = connexion.query("INSERT INTO Reservation SET ?", [ data ],
				function(err, rows) {
					if (err)
						throw err;
					res.redirect('/reservation');
				});
	});
};

exports.edit = function(req, res) {
	var id = req.params.id;
	req.getConnection(function(err, connexion) {
		var query = connexion.query(
				"SELECT * FROM Reservation WHERE idReservation=?", [ id ],
				function(err, rows) {
					if (err)
						throw err;
					res.render('edit_reservation', {
						page_title : 'Modification des données',
						data : rows
					});
				});
	});
};

exports.save_edit = function(req, res) {
	var input = JSON.parse(JSON.stringify(req.body));
	var id = req.params.id;
	
	req.getConnection(function(err,connexion){
		var data = {
				Numero:input.numero,
				DateDebut:input.dateDebut,
				DateFin:input.dateFin
		};
		var query = connexion.query("UPDATE Reservation SET ? WHERE idReservation=?",[data,id],function(err,rows){
			if(err)throw err;
			res.redirect('/reservation');
		});
	});
};

exports.delete_save = function(req,res){
	var id = req.params.id;
	
	req.getConnection(function(err,connexion){
		var query= connexion.query("DELETE FROM Reservation WHERE idReservation=?",[id],function(err,rows){
			if(err) throw err;
			res.redirect('/reservation');
		});
	});
};

var model = null;


function setModel(m) {
	model = m;
}

function get(socket, callback) {
	model.Link.find({user: socket.handshake.session.userdata.email}, 'name url icon', function(err, links) {
		callback(null, links);
	});
}

function add(data, socket, callback) {
  if (!data || !(data.name && data.url && data.icon)) {
    callback(true);
  } else {
    model.Link.create({user: socket.handshake.session.userdata.email, name: data.name, url: data.url, icon: data.icon},
		  function (err) {
		  if (err) {
			  callback(true);
		  } else {
			  callback(null, true);
		  }
	  });
  }
}

function remove(data, socket, callback) {
  if (!data || !(data.name && data.url)) {
    callback(true);
  } else {
    model.Link.remove({user: socket.handshake.session.userdata.email, name: data.name, url: data.url}, function (err) {
		  if (err) {
			  callback(true);
		  } else {
			  callback(null, true);
		  }
	  });
  }
}

module.exports = {get: get, add: add, remove: remove, setModel: setModel};

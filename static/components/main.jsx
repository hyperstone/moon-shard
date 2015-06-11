var Router = ReactRouter;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var socket;

var routes = (
	<Route>
		<Route name="main" path="/" handler={App}>
			<Route name="about" handler={About}/>
			<DefaultRoute name="dashboard" handler={Dashboard}/>
		</Route>
		<Route name="login" path="/login" handler={Login}>
			<Route name="register" handler={Register}/>
			<DefaultRoute handler={LoginMain}/>
		</Route>
	</Route>
);

function renderRoute () {
	Router.run(routes, function (Handler) {
		React.render(<Handler/>, $('.pusher')[0]);
	});
}

$(document).ready(function () {
	var routeRendered;
	$('.dimmer').dimmer({
		closable: false
	});
	var url = location.protocol + '//' + location.host;
	console.log('trying to connect to ' + url)
	socket = io.connect(url, {
		reconnection: false
	});
	socket.on('connect', function () {
		$('.dimmer').dimmer('hide');
		console.info('socket connected');
		// verify login
		if (localStorage.hasSession) {
			socket.emit('verify_session', function (err, data) {
				if (err) {
					console.info('not logged in');
					location.href = '#/login';
				} else {
					console.info('already logged in');
					location.href = '#/';
				}
				if (!routeRendered) {
					routeRendered = true;
					renderRoute();
				}
			});
		} else {
			location.href = '#/login';
			if (!routeRendered) {
				routeRendered = true;
				renderRoute();
			}
		}
	});
	socket.on('disconnect', function () {
		$('.dimmer').dimmer('show');
		reconnect.attempt();
	});
});

var reconnect = {
	delay: 1500,
	attempt: function () {
		var url = location.protocol + '//' + location.host;
		var request = $.get(url, function (data) {
			socket.connect();
		});
		request.fail(function () {
			console.info('Reconnect failed, trying again in ' + reconnect.delay/1000 + ' seconds.');
			reconnect.delay += 500;
			reconnect.timeout = setTimeout(reconnect.attempt, reconnect.delay);
		});
	}
}

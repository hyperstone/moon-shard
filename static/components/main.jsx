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
			<Route name="dashboard" handler={Dashboard}/>
		</Route>
		<Route name="login" path="/login" handler={Login}>
			<Route name="register" handler={Register}/>
			<DefaultRoute handler={LoginMain}/>
		</Route>
	</Route>
);

function renderRoute () {
	console.log('rendering route');
	Router.run(routes, function (Handler) {
		React.render(<Handler/>, $('.pusher')[0]);
	});
}

$(document).ready(function () {
	socket = io.connect(location.protocol + '//localhost:' + location.port || 80);
	socket.on('connect', function () {
		console.info('socket connected');
		// verify login
		if (!localStorage.loggedIn) {
			api.verify();
		} else {
			renderRoute();
		}
	});
	socket.on('login', function (data) {
		if (data) {
			location.href = '#/dashboard';
		} else {
			alert('login failed');
		}
	});
	socket.on('verify_session', function (data) {
		if (!data) {
			location.href = '#/login';
		}
		renderRoute();
	});
});

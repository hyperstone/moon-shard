var Router = ReactRouter;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

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

$(document).ready(function () {
	// verify login
	if (!localStorage.loggedIn) {
		location.href = '#/login';
	}

	// react-router
	Router.run(routes, function (Handler) {
		React.render(<Handler/>, $('.pusher')[0]);
	});
});

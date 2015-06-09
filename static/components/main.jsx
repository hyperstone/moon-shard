var Router = ReactRouter;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var routes = (
	<Route>
		<Route name="login" path="/" handler={Login}>
			<Route name="register" handler={Register}/>
			<DefaultRoute handler={LoginMain}/>
		</Route>
		<Route name="main" path="/dashboard" handler={App}>
			<Route name="about" handler={About}/>
			<DefaultRoute name="dashboard" handler={Dashboard}/>
		</Route>
	</Route>
);

$(document).ready(function () {
	Router.run(routes, function (Handler) {
		React.render(<Handler/>, $('.pusher')[0]);
	});
});

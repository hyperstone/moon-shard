var App = React.createClass({
	render: function render () {
		return (
			<div id="fuck-react">
				<Header/>
				<div style={{marginTop: 60 + 'px', marginBottom: 60 + 'px'}}>
					<RouteHandler/>
				</div>
				<Footer/>
			</div>
		);
	},
	componentDidMount: function componentDidMount () {
		$('.sidebar')
			.sidebar()
		;
	}
});

var Login = React.createClass({
	render: function render () {
		return (
			<main className="v-container">
				<div className="v-center-area">
					<div className="v-centered">
						<RouteHandler/>
					</div>
				</div>
			</main>
		);
	}
});

var Header = React.createClass({
	render: function render () {
		return (
			<nav className="ui inverted fixed menu">
				<Link to="dashboard" className="item">
					<i className="dashboard icon"></i> dashboard
				</Link>
				<nav className="right menu">
					<Link to="about" className="item">
						<i className="info icon"></i> about
					</Link>
					<a onClick={openSidebar} className="item">
						<i className="settings icon"></i> settings
					</a>
				</nav>
			</nav>
		);
	}
});

var Footer = React.createClass({
	render: function () {
		return (
			<div className="ui page" style={{textAlign: 'center', marginBottom: 20 + 'px'}}>
				moon-shard by hyperstone
			</div>
		);
	}
});

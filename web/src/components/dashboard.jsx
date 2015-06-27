var React = require('react');

var ModuleGrid = require('./modules.jsx').Grid;

var Dashboard = React.createClass({
	render: function render () {
		return (
			<main className="column">
				<ModuleGrid/>
			</main>
		);
	}
});

module.exports = Dashboard;

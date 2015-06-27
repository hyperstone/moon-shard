var React = require('react');

var modules = {
	links: require('./modules/links.jsx')
};

var gridConfig = {
	type: 'grid',
	width: 2,
	children: [
		{
			type: 'grid',
			width: 2,
			children: [
				{
					type: 'plugin',
					name: modules.links
				},
				{
					type: 'static',
					content: 'box two'
				}
			]
		},
		{
			type: 'static',
			content: 'box three'
		},
		{
			type: 'static',
			content: 'box four'
		},
		{
			type: 'grid',
			children: [
				{
					type: 'static',
					content: 'box five'
				},
				{
					type: 'static',
					content: 'box six'
				}
			]
		}
	]
};

var Grid = React.createClass({
	getData: function getData () {
		var data;
		if (this.props.indices) {
			data = gridConfig.children[this.props.indices[0]];
			for (var i = 1; i < this.props.indices.length; i++) {
				data = data.children[i];
			}
		} else {
			data = gridConfig;
		}
		return data;
	},
	render: function render () {
		var data = this.getData();
		rows = [];
		if (data.children) {
			for (var j = 0; j < data.children.length; j++) {
				var item = data.children[j];
				switch (item.type) {
					case 'grid':
						var indices;
						if (this.props.indices) {
							indices = this.props.indices.slice(0);
							indices.push(j);
						} else {
							indices = [j];
						}
						rows.push(
							<div className="column">
								<Grid indices={indices}/>
							</div>
						);
					break;
					case 'plugin':
						rows.push(
							<item.name/>
						);
					break;
					case 'static':
						rows.push(
							<div className="column">
								{item.content}
							</div>
						);
					break;
				}
			}
		}
		return (
			<div className="ui two column grid">
				{rows}
			</div>
		);
	}
});

module.exports = {
	Grid: Grid
};

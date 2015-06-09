var Dashboard = React.createClass({
	render: function () {
		return (
			<main className="column">
				<div className="ui centered grid">
					<div className="fifteen wide column">
						<h1 className="ui top attached header">
							Dashboard
						</h1>
						<div className="ui attached segment">
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.
						</div>
					</div>
				</div>
			</main>
		);
	}
});

var About = React.createClass({
	render: function () {
		return (
			<main className="column">
				<div className="ui centered grid">
					<div className="nine wide column">
						<div className="ui piled segment">
							<img src="/png/moon-shard.png" className="ui medium right floated image"/>
							<h2>
								About Moon Shard
							</h2>
							<p>
								Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc.
							</p>
						</div>
					</div>
				</div>
			</main>
		);
	}
});

var Register = React.createClass({
	render: function () {
		return (
			<div className="ui segment">
				<form className="ui form">
					<div className="three fields">
						<div className="required field">
							<label>Username</label>
							<div className="ui icon input">
								<input type="text" placeholder="Username"/>
								<i className="user icon"></i>
							</div>
						</div>
						<div className="required field">
							<label>Password</label>
							<div className="ui icon input">
								<input type="password"/>
								<i className="lock icon"></i>
							</div>
						</div>
						<div className="field">
							<label>Action</label>
							<div className="ui submit button" onClick={register}>Register</div>
						</div>
					</div>
				</form>
				<a href="#/">Back to login.</a><br/>
			</div>
		);
	}
});

var LoginMain = React.createClass({
	render: function () {
		return (
			<div className="ui segment">
				<form className="ui form">
					<div className="three fields">
						<div className="required field">
							<label>Username</label>
							<div className="ui icon input">
								<input type="text" placeholder="Username"/>
								<i className="user icon"></i>
							</div>
						</div>
						<div className="required field">
							<label>Password</label>
							<div className="ui icon input">
								<input type="password"/>
								<i className="lock icon"></i>
							</div>
						</div>
						<div className="field">
							<label>Action</label>
							<div className="ui submit button" onClick={login}>Login</div>
						</div>
					</div>
				</form>
				Not signed up yet? <a href="#/register">Create an account.</a><br/>
			</div>
		);
	}
});

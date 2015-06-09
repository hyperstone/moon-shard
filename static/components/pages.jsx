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
							<a href="https://github.com/hyperstone/moon-shard" className="ui basic button">
								<i className="github icon"></i>
								View Project on GitHub
							</a>
						</div>
					</div>
				</div>
			</main>
		);
	}
});

var Register = React.createClass({
	getInitialState: function getInitialState () {
		return {
			step: 0,
			username: '',
			password: '',
			email: ''
		}
	},
	nextStep: function nextStep () {
		if (this.state.step < 2) {
			this.setState({
				step: this.state.step + 1
			});
		}
	},
	previousStep: function previousStep () {
		if (this.state.step > 0) {
			this.setState({
				step: this.state.step - 1
			});
		}
	},
	register: function register () {
		api.register(this.state.email, this.state.password, this.state.username);
	},
	change: function (key, event) {
		var nextState = {}
		nextState[key] = event.target.value
		this.setState(nextState);
	},
	changeUsername: function (event) {
		this.change('username', event);
	},
	changePassword: function (event) {
		this.change('password', event);
	},
	changeEmail: function (event) {
		this.change('email', event);
	},
	render: function render () {
		// basic classes
		var classes = {
			steps: [
				'step',
				'step',
				'step'
			],
			registerButton: 'ui positive button'
		}
		
		// assign classes
		for (var i = 0; i < 3; i++) {
			if (i === 0 && this.state.email && this.state.password) {
				classes.steps[i] += ' completed';
			} else if (i === 1 && this.state.username) {
				classes.steps[i] += ' completed';
			}
			if (i === this.state.step) {
				classes.steps[i] += ' active';
			}
		}

		var stepContent;

		// validate form
		if (!this.state.email || !this.state.password || !this.state.username) {
			classes.registerButton += ' disabled';
		}

		// generate steps
		switch (this.state.step) {
			case 0:
				stepContent = (
					<form className="ui form">
						<div className="field">
							<label>E-Mail</label>
							<div className="ui icon input">
								<input type="email" placeholder="your@e-mail.tld" value={this.state.email} onChange={this.changeEmail} required/>
								<i className="mail icon"></i>
							</div>
						</div>
						<div className="field">
							<label>Password</label>
							<div className="ui icon input">
								<input type="password" value={this.state.password} onChange={this.changePassword} required/>
								<i className="lock icon"></i>
							</div>
						</div>
						<div className="ui three wide centered grid">
							<div className="two columns" style={{padding: 20 + 'px'}}>
								<div className="ui buttons">
									<a href="#/login" className="ui negative button">Cancel</a>
									<div className="or"></div>
									<div className="ui positive button" onClick={this.nextStep}>Next</div>
								</div>
							</div>
						</div>
					</form>
				);
			break;
			case 1:
				stepContent = (
					<form className="ui form">
						<div className="field">
							<label>Username</label>
							<div className="ui icon input">
								<input type="text" placeholder="username" value={this.state.username} onChange={this.changeUsername} required/>
								<i className="user icon"></i>
							</div>
						</div>
						<div className="ui three wide centered grid">
							<div className="two columns" style={{padding: 20 + 'px'}}>
								<div className="ui buttons">
									<div className="ui button" onClick={this.previousStep}>Back</div>
									<div className="or"></div>
									<div className="ui positive button" onClick={this.nextStep}>Next</div>
								</div>
							</div>
						</div>
					</form>
				);
			break;
			case 2:
				stepContent = (
					<div>
						<table className="ui unstackable table">
							<thead>
								<tr>
									<th>Name</th>
									<th>Value</th>
								</tr>
							</thead>
							<tbody>
								<tr className="center aligned">
									<td><i className="mail icon"></i> Email</td>
									<td>{this.state.email}</td>
								</tr>
								<tr>
									<td><i className="user icon"></i> Username</td>
									<td>{this.state.username}</td>
								</tr>
								<tr>
									<td><i className="lock icon"></i> Password</td>
									<td>{this.state.password.length} Characters</td>
								</tr>
							</tbody>
						</table>
						<div className="ui three wide centered grid">
							<div className="two columns" style={{padding: 20 + 'px'}}>
								<div className="ui buttons">
									<div className="ui button" onClick={this.previousStep}>Back</div>
									<div className="or"></div>
									<div className={classes.registerButton} onClick={this.register}>Register</div>
								</div>
							</div>
						</div>
					</div>
				);
			break;
		}

		return (
			<div className="ui piled segment">
				<div className="ui small steps">
					<div className={classes.steps[0]}>
						<i className="sign in icon"></i>
						<div className="content">
							<div className="title">Login Data</div>
						</div>
					</div>
					<div className={classes.steps[1]}>
						<i className="user icon"></i>
						<div className="content">
							<div className="title">Username</div>
						</div>
					</div>
					<div className={classes.steps[2]}>
						<i className="info icon"></i>
						<div className="content">
							<div className="title">Confirm</div>
						</div>
					</div>
				</div>
				<br/>
				<div>
					{stepContent}
				</div>
			</div>
		);
	}
});

var LoginMain = React.createClass({
	login: function login () {
		api.login();
	},
	render: function render () {
		return (
			<div className="ui piled segment">
				<form className="ui form">
					<div className="three fields">
						<div className="field">
							<label>E-Mail</label>
							<div className="ui icon input">
								<input type="email" placeholder="your@e-mail.tld" required/>
								<i className="mail icon"></i>
							</div>
						</div>
						<div className="field">
							<label>Password</label>
							<div className="ui icon input">
								<input type="password"/>
								<i className="lock icon"></i>
							</div>
						</div>
						<div className="field">
							<label>Action</label>
							<input type="submit" className="ui fluid submit button" onClick={this.login} value="Login"></input>
						</div>
					</div>
				</form>
				Not signed up yet? <a href="#/login/register">Create an account.</a><br/>
			</div>
		);
	}
});

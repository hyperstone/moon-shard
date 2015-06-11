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
	nextStep: function nextStep (e) {
		e.preventDefault();
		if (this.state.step < 2) {
			// check if current step is valid
			if (this.state.step === 0) {
				if (this.isValid('email') && this.isValid('password')) {
					this.setState({
						step: this.state.step + 1,
						showErrors: false
					});
				} else {
					this.setState({
						showErrors: true
					});
				}
			} else {
				if (this.isValid('username')) {
					this.setState({
						step: this.state.step + 1,
						showErrors: false
					});
				} else {
					this.setState({
						showErrors: true
					});
				}
			}
		}
	},
	isValid: function (key) {
		switch (key) {
			case 'email':
				var regex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
				return regex.test(this.state.email);
			break;
			case 'username':
				return this.state.username.length >= 4;
			break;
			case 'password':
				return this.state.password.length >= 8;
			break;
			default:
				return this.state.email.length > 0 && this.state.username.length > 0 && this.state.password.length >= 8;
		}
	},
	previousStep: function previousStep () {
		if (this.state.step > 0) {
			this.setState({
				step: this.state.step - 1,
				showErrors: false
			});
		}
	},
	register: function register (e) {
		var that = this;
		e.preventDefault();
		socket.emit('register', {
			email: that.state.email,
			password: that.state.password,
			username: that.state.username,
			secret: prompt('Secret?')
		}, function (err, data) {
			if (!err) {
				socket.emit('login', {
					email: that.state.email,
					password: that.state.password
				}, function (err, data) {
					if (!err) {
						localStorage.hasSession = true;
						location.href = '#/';
					} else {
						alert('login failed');
					}
				});
			} else {
				alert('registration failed')
			}
		});
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
	renderSteps: function () {
		var stepClasses = [
			'step',
			'step',
			'step'
		];
		// assign classes
		for (var i = 0; i < 3; i++) {
			if (i === 0 && this.isValid('email') && this.isValid('password')) {
				stepClasses[i] += ' completed';
			} else if (i === 1 && this.isValid('username')) {
				stepClasses[i] += ' completed';
			}
			if (i === this.state.step) {
				stepClasses[i] += ' active';
			}
		}
		return (
			<div className="ui small steps">
				<div className={stepClasses[0]}>
					<i className="sign in icon"></i>
					<div className="content">
						<div className="title">Login Data</div>
					</div>
				</div>
				<div className={stepClasses[1]}>
					<i className="user icon"></i>
					<div className="content">
						<div className="title">Username</div>
					</div>
				</div>
				<div className={stepClasses[2]}>
					<i className="info icon"></i>
					<div className="content">
						<div className="title">Confirm</div>
					</div>
				</div>
			</div>
		);
	},
	renderButtons: function renderButtons () {
		var backButton, nextButton;
		var nextButtonClasses = 'ui button';
		switch (this.state.step) {
			case 0:
				if (this.isValid('email') && this.isValid('password')) {
					nextButtonClasses += ' positive';
				}
				backButton = (<a href="#/login" className="ui negative button">Cancel</a>);
				nextButton = (<input type="submit" className={nextButtonClasses} value="Next"/>);
			break;
			case 1:
				if (this.isValid('username')) {
					nextButtonClasses += ' positive';
				}
				backButton = (<div className="ui button" onClick={this.previousStep}>Back</div>);
				nextButton = (<input type="submit" className={nextButtonClasses} value="Next"/>);
			break;
			case 2:
				if (!this.isValid()) {
					nextButtonClasses += ' disabled';
				} else {
					nextButtonClasses += ' positive';
				}
				backButton = (<div className="ui button" onClick={this.previousStep}>Back</div>);
				nextButton = (<input type="submit" className={nextButtonClasses} value="Register"/>);
			break;
		}
		return (
			<div className="ui three wide centered grid">
				<div className="two columns" style={{padding: 20 + 'px'}}>
					<div className="ui buttons">
						{backButton}
						<div className="or"></div>
						{nextButton}
					</div>
				</div>
			</div>
		);
	},
	renderStepContent: function renderStepContent () {
		switch (this.state.step) {
			case 0:
				var emailClasses = 'field';
				if (this.state.showErrors && !this.isValid('email')) {
					emailClasses += ' error';
				}
				var passwordClasses = 'field';
				if (this.state.showErrors && !this.isValid('password')) {
					passwordClasses += ' error';
				}
				var errorMessage, emailError, passwordError;
				if (this.state.showErrors) {
					if (!this.isValid('email')) {
						emailError = (<p>Invalid E-Mail Address.</p>);
					}
					if (!this.isValid('password')) {
						passwordError = (<p>Your Password is too short.</p>);
					}
					if (emailError || passwordError) {
						errorMessage = (
							<div className="ui visible error message">
								{emailError}
								{passwordError}
							</div>
						);
					}
				}
				return (
					<form className="ui form" onSubmit={this.nextStep}>
						{errorMessage}
						<div className={emailClasses}>
							<label>E-Mail</label>
							<div className="ui icon input">
								<input type="email" placeholder="your@e-mail.tld" value={this.state.email} onChange={this.changeEmail} required/>
								<i className="mail icon"></i>
							</div>
						</div>
						<div className={passwordClasses}>
							<label>Password</label>
							<div className="ui icon input">
								<input type="password" value={this.state.password} onChange={this.changePassword} required/>
								<i className="lock icon"></i>
							</div>
						</div>
						{this.renderButtons()}
					</form>
				);
			break;
			case 1:
				var usernameClasses = 'field';
				if (this.state.showErrors && !this.isValid('username')) {
					usernameClasses += ' error';
				}
				var errorMessage, usernameError;
				if (this.state.showErrors && !this.isValid('username')) {
					errorMessage = (
						<div className="ui visible error message">
							<p>Your username is too short.</p>
						</div>
					);
				}
				return (
					<form className="ui form" onSubmit={this.nextStep}>
						{errorMessage}
						<div className={usernameClasses}>
							<label>Username</label>
							<div className="ui icon input">
								<input type="text" placeholder="username" value={this.state.username} onChange={this.changeUsername} required/>
								<i className="user icon"></i>
							</div>
						</div>
						{this.renderButtons()}
					</form>
				);
			break;
			case 2:
				return (
					<form onSubmit={this.register}>
						<table className="ui unstackable table">
							<thead>
								<tr>
									<th>Name</th>
									<th>Value</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td><i className="user icon"></i> Username</td>
									<td>{this.state.username}</td>
								</tr>
								<tr className="center aligned">
									<td><i className="mail icon"></i> Email</td>
									<td>{this.state.email}</td>
								</tr>
								<tr>
									<td><i className="lock icon"></i> Password</td>
									<td>{this.state.password.length} Characters</td>
								</tr>
							</tbody>
						</table>
						{this.renderButtons()}
					</form>
				);
			break;
		}
	},
	render: function render () {
		return (
			<div className="ui segment">
				{this.renderSteps()}
				<br/>
				{this.renderStepContent()}
			</div>
		);
	}
});

var LoginMain = React.createClass({
	getInitialState: function getInitialState () {
		return {
			email: '',
			password: '',
			loginButtonClasses: 'ui segment'
		}
	},
	login: function login (e) {
		var that = this;
		e.preventDefault();
		this.setState({
			loginButtonClasses: 'ui loading segment'
		});
		socket.emit('login', {
			email: that.state.email,
			password: that.state.password
		}, function (err, data) {
			if (!err) {
				localStorage.hasSession = true;
				location.href = '#/';
			} else {
				that.setState({
					loginButtonClasses: 'ui segment'
				});
				alert('login failed');	
			}
		})
	},
	change: function (key, event) {
		var nextState = {}
		nextState[key] = event.target.value
	},
	changePassword: function (event) {
		this.setState({'password': event.target.value});
	},
	changeEmail: function (event) {
		this.setState({'email': event.target.value});
	},
	render: function render () {
		return (
			<div className={this.state.loginButtonClasses}>
				<form className="ui form" onSubmit={this.login}>
					<h3>
						<i className="sign in icon"></i> Moon-Shard Login
					</h3>
					<div className="field">
						<div className="ui icon input">
							<input type="email" onChange={this.changeEmail} placeholder="your email" required/>
							<i className="mail icon"></i>
						</div>
					</div>
					<div className="field">
						<div className="ui icon input">
							<input type="password" onChange={this.changePassword} placeholder="password" required/>
							<i className="lock icon"></i>
						</div>
					</div>
					<button type="submit" className="ui primary fluid button" onClick={this.login}>Login</button>
					<br/>
					Not signed up yet? <a href="#/login/register">Create an account.</a>
					<br/>
				</form>
			</div>
		);
	}
});

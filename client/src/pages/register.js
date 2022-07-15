import React, { useState } from "react";

function Register() {

	const [name, setName] = useState('')
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [password2, setPassword2] = useState('');
	const [emailValidationMsg, setEmailValidationMsg] = useState(' ');
	const [emailValidationColor, setEmailValidationColor] = useState('');
	const [usernameValidationMsg, setUsernameValidationMsg] = useState(' ');
	const [usernameValidationColor, setUsernameValidationColor] = useState('');
	const [passwordValidationMsg, setPasswordValidationMsg] = useState(' ');
	const [passwordValidationColor, setPasswordValidationColor] = useState('');
	const [passwordMatchMsg, setPasswordMatchMsg] = useState(' ');
	const [passwordMatchColor, setPasswordMatchColor] = useState('');

	async function registerUser(event){
		event.preventDefault();

		if(password !== password2){
			alert('Passwords do not match');
			return;
		}

		const response = await fetch('http://localhost:1111/user/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				email,
				username,
				password
			}),
		})
		const status = await response.status;
		switch(status){
			case 201:
				alert('User registered successfully');
				window.location.href = '/login';
			break;
			case 409:
				alert('Username or Email already taken');
			break;
			case 400:
				alert('Invalid input');
			break;
			case 500:
				alert('Server error');
			break;
		}
	}

	async function validateUsename(tempUserName){
		if(tempUserName.length <6){
			setUsernameValidationMsg('Username must be at least 6 characters long')
			setUsernameValidationColor('darkred')
			return;
		}

		const response = await fetch('http://localhost:1111/user/check', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: tempUserName
			}),
		})
		const status = await response.status;
		switch(status){
			case 200:
				setUsernameValidationMsg('Username available')
				setUsernameValidationColor('Green')
			break;
			case 409:
				setUsernameValidationMsg('Username already taken')
				setUsernameValidationColor('darkred')
			break;
			case 500:
				setUsernameValidationMsg('Server error!! try again')
				setUsernameValidationColor('darkred')
			break;
		}
	}

	function matchPassword(tmpPass1, tmpPass2){
		setPasswordMatchMsg( tmpPass1 === tmpPass2 ? '': 'Password did not match')
		setPasswordMatchColor(tmpPass1 === tmpPass2 ? '' : 'darkred')
	}

	function validatePassword(tempPassword){
		setPasswordValidationMsg( tempPassword.length<6 ? 'Password must be at least 6 characters long': '')
		setPasswordValidationColor(tempPassword.length<6 ? 'darkred' : '')
	}

	function validateEmail(tempEmail){
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const valid = re.test(tempEmail);
		setEmailValidationMsg( !valid ? 'Invalid email format': '')
		setEmailValidationColor( !valid ? 'darkred' : '')
	}

	return (
		<div class='App2 center'>
			<div className='card2 center' id="card_reg">
				<h1>Register</h1>
				<div className='login center2'>

					<div className='login_with_cred center'>
						<input
							className='login_shape'
							value={name} 
							onChange={e => setName(e.target.value)}
							type="text" 
							placeholder="Name" 
						/>
						<div className='linear'>
							<input
								className='login_shape'
								value={email} 
								onChange={e => [setEmail(e.target.value), validateEmail(e.target.value)]}
								type="text" 
								placeholder="Email" 
							/>
							<p style={{color:emailValidationColor}}>{emailValidationMsg}</p>
						</div>
						<div className='linear'>
							<input
								className='login_shape'
								value={username} 
								onChange={e =>[setUsername(e.target.value), validateUsename(e.target.value)]}
								type="text" 
								placeholder="Username" 
							/>
							<p style={{color:usernameValidationColor}}>{usernameValidationMsg}</p>
						</div>
						<div className='linear'>
							<input
								className='login_shape'
								value={password} 
								onChange={e => [setPassword(e.target.value), validatePassword(e.target.value)
											, matchPassword(e.target.value, password2)]}
								type="text" 
								placeholder="Password" 
							/>
							<p style={{color:passwordValidationColor}}>{passwordValidationMsg}</p>
						</div>
						<div className='linear'>
							<input
								className='login_shape'
								value={password2}
								onChange={e => [setPassword2(e.target.value), matchPassword(e.target.value, password)]}
								type="text" 
								placeholder="Confirm Password" 
							/>
							<p style={{color:passwordMatchColor}}>{passwordMatchMsg}</p>
						</div>
					</div>		
				</div>

				<div className='center'>
					<button className='login_shape' onClick={registerUser}>Register</button>
					<pre className='linear'>
						Have an account? <a href="/login">Login</a>
					</pre>
					<pre className='linear '>
						By continuing, you agree to our <a href='/terms'>Terms of Service</a> and <a href='/privacy'>Privacy Policy</a>.
					</pre>
				</div>
			</div>
		</div>
	);
}

export default Register;
import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react';
import {useState} from 'react';

import { Auth } from 'aws-amplify';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [authenticationCode, setAuthenticationCode] = useState("");
  const [step, setStep] = useState(0);

  const signUp = async () => {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          phone_number: phoneNumber
        }
      })
      console.log('successfully signed up!')
      setStep(1);
    } catch(e) {
      console.log('error signing up: ', e);
    }
  }

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(username, authenticationCode);
      console.log('user successfully signed up!');
    } catch(e) {
      console.log('error confirming sign up: ', e);
    }
  }

  return (
    <div className="App">
      {step === 0 && (
        <div>
          <input
            placeholder="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            placeholder="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <input
            placeholder="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            placeholder="phone number"
            name="phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={styles.input}
          />
          <button onClick={signUp}>Sign Up</button>
        </div>
      )}
      {step === 1 && (
        <div>
          <input
            placeholder="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <input
            placeholder="authentication code"
            name="authenticationCode"
            onChange={(e) => setAuthenticationCode(e.target.value)}
            style={styles.input}
          />
          <button onClick={confirmSignUp}>Confirm Sign Up</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  input: {
    height: 35,
    margin: 10,
  }
}

export default withAuthenticator(App, {includedGreetings: true});

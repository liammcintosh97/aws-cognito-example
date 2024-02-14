import React, {useState} from 'react'
import { CognitoUserPool, AuthenticationDetails, CognitoUser} from 'amazon-cognito-identity-js';

function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const poolData = {
    UserPoolId: "",
    ClientId: ""
  }

  const userPool = new CognitoUserPool(poolData)
  const authenticationDetails = new AuthenticationDetails({
    Username : email,
    Password : password,
  });
  const userData = {
    Username : email,
    Pool : userPool
  };
  var cognitoUser = new CognitoUser(userData);


  const onSubmitLogin = event => {
    event.preventDefault()
    console.log('Submitting Login...')
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        var accessToken = result.getAccessToken().getJwtToken();

        /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
        var idToken = result.idToken.jwtToken;
        console.log("ACCESS_TOKEN",accessToken)
        console.log("JWT_TOKEN",idToken)
      },
      onFailure: function(err) {
          console.error(err);
      },
    })
  }

  const onSubmitSignUp = event => {
    event.preventDefault()
    console.log('Submitting Sign Up...')
    userPool.signUp(email,password,[],null,(err,data) => {
      if(err) console.error(err)

      console.log(data)
    })
  }

  return (
    <div>
      <h2>LOGIN</h2>
      <form onSubmit={onSubmitLogin}>
        <input 
          value={email} 
          onChange={event => setEmail(event.target.value)} 
          type="text"
        />
        <input 
          value={password} 
          onChange={event => setPassword(event.target.value)}
          type="text"
        />
        <button>Login</button>
      </form>
      <br></br>
      <h2>SIGN UP</h2>
      <form onSubmit={onSubmitSignUp}>
        <input 
          value={email} 
          onChange={event => setEmail(event.target.value)} 
          type="text"
        />
        <input 
          value={password} 
          onChange={event => setPassword(event.target.value)}
          type="text"
        />
        <button>Sign Up</button>
      </form>
    </div>
    
  );
}

export default App;

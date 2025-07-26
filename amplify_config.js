window.amplifyConfig = {
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_RMhlKuGHS',
    userPoolWebClientId: '4g0bo9ac68vq4g817v1je4e5sf', // Replace with your actual client ID
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    oauth: {
      domain: 'https://us-east-1rmhlkughs.auth.us-east-1.amazoncognito.com', // Replace with your domain
      scope: ['email', 'profile', 'openid'],
      redirectSignIn: 'https://gowthusaidatta.github.io/codeSync/index.html',
      redirectSignOut: 'https://gowthusaidatta.github.io/codeSync/index.html',
      responseType: 'code'
    }
  }
};

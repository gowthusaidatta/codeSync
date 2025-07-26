window.amplifyConfig = {
  Auth: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_RMhlKuGHS',
    userPoolWebClientId: '4g0bo9ac68vq4g817v1je4e5sf',
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    oauth: {
      domain: 'us-east-1rmhlkughs.auth.us-east-1.amazoncognito.com', // Removed https:// prefix
      scope: ['email', 'profile', 'openid'],
      redirectSignIn: 'https://gowthusaidatta.github.io/codeSync/index.html', // Fixed case sensitivity
      redirectSignOut: 'https://gowthusaidatta.github.io/codeSync/index.html', // Fixed case sensitivity
      responseType: 'code'
    }
  }
};

import { AccountsTemplates } from 'meteor/useraccounts:core';

AccountsTemplates.configure({
  defaultLayout: 'App_body',
  defaultLayoutRegions: {},
  defaultContentRegion: 'main',
  confirmPassword: true,
  enablePasswordChange: true,
  forbidClientAccountCreation: false,
  overrideLoginErrors: true,
  sendVerificationEmail: true,
  lowercaseUsername: false,
  focusFirstInput: true,
  showAddRemoveServices: true,
  showForgotPasswordLink: true,
  showLabels: true,
  showPlaceholders: true,
  showResendVerificationEmailLink: true,
  continuousValidation: true,
  negativeFeedback: true,
  negativeValidation: true,
  positiveValidation: true,
  positiveFeedback: true,
  showValidating: true,
  privacyUrl: 'Privacy',
  termsUrl: 'TermsOfUse',
  redirectTimeout: 0,
  texts: {
    button: {
      signUp: 'Create my Profil'
    },
    socialSignUp: 'Create my Profil',
    socialIcons: {
      'meteor-developer': 'fa fa-rocket'
    },
    title: {
      forgotPwd: 'Recover Your Password'
    }
  }
});

// import { TAPi18n } from 'meteor/tap:i18n';
//
// AccountsTemplates.configure({
//   showForgotPasswordLink: true,
//   texts: {
//     errors: {
//       loginForbidden: TAPi18n.__('Incorrect username or password'),
//       pwdMismatch: TAPi18n.__('Passwords don\'t match'),
//     },
//     title: {
//       signIn: TAPi18n.__('Sign In'),
//       signUp: TAPi18n.__('Join'),
//     },
//   },
//   defaultTemplate: 'Auth_page',
//   defaultLayout: 'App_body',
//   defaultContentRegion: 'main',
//   defaultLayoutRegions: {},
// });

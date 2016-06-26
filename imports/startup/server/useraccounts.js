import { AccountsTemplates } from 'meteor/useraccounts:core';
import { Roles } from 'meteor/alanning:roles';

const setUserRolesOnSignUp = (userId, info) => {
  Roles.addUsersToRoles(userId, ['user', 'beginner']);
};

AccountsTemplates.configure({
  postSignUpHook: setUserRolesOnSignUp,
});


// Meteor.startup(() => {
//   ServiceConfiguration.configurations.update(
//     { "service": "facebook" },
//     {
//       $set: {
//         "appId": "XXXXXXXXXXXXXXX",
//         "secret": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
//       }
//     },
//     { upsert: true }
//   );
// });

import { TAPi18n } from 'meteor/tap:i18n';

export const displayError = (error) => {
  if (error) {
    alert(TAPi18n.__(error.error)); // eslint-disable-line no-alert
  }
};

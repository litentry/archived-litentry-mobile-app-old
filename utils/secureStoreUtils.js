import { SecureStore } from 'expo';

const secureDataEntry = {
  password: 'SECURE_PASSWORD',
};

export const comparePasswordAsync = (pincode, resolve, reject) => {
  SecureStore.getItemAsync(secureDataEntry.password)
    .then(password => {
      if (pincode !== password) throw new Error('password is not correct');
      resolve();
    })
    .catch(error => {
      console.log('error is', error.toString());
      reject();
    });
};

export const savePasswordAsync = (password, resolve, reject) => {
  SecureStore.setItemAsync(secureDataEntry.password, password)
    .then(resolve)
    .catch(reject);
};

import { SecureStore } from 'expo';

const secureDataEntry = {
  password: 'SECURE_PASSWORD',
  privateKey: 'SECURE_PRIVATE_KEY',
  mnemonic: 'SECURE_MNEMONIC',
  lockPrivateKey: 'SECURE_LOCK_PRIVATE_KEY',
  lockMnemonic: 'SECURE_LOCK_MNEMONIC',
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

export const savePrivateKeyAsync = (privateKey, resolve, reject) => {
  SecureStore.setItemAsync(secureDataEntry.privateKey, privateKey)
    .then(resolve)
    .catch(reject);
};

export const getPrivateKeyAsync = (resolve, reject) => {
  SecureStore.getItemAsync(secureDataEntry.privateKey)
    .then(resolve)
    .catch(reject);
};

export const saveMnemonicAsync = (mnemonic, resolve, reject) => {
  //TODO Now ethers.js does not support create mnemonic from private key.
  if (mnemonic === undefined) {
    return resolve();
  }
  SecureStore.setItemAsync(secureDataEntry.mnemonic, mnemonic)
    .then(resolve)
    .catch(reject);
};

export const getMnemonicAsync = (resolve, reject) => {
  SecureStore.getItemAsync(secureDataEntry.mnemonic)
    .then(resolve)
    .catch(reject);
};

// Locks Async Function

export const saveLockPrivateKeyAsync = (privateKey, resolve, reject, address, description) => {
  SecureStore.setItemAsync(secureDataEntry.lockPrivateKey + address, privateKey)
    .then(resolve)
    .catch(reject);
};

export const getLockPrivateKeyAsync = (address, resolve, reject) => {
  SecureStore.getItemAsync(secureDataEntry.lockPrivateKey + address)
    .then(resolve)
    .catch(reject);
};

export const saveLockMnemonicAsync = (mnemonic, resolve, reject, address, description) => {
  if (mnemonic === undefined) {
    return resolve();
  }
  SecureStore.setItemAsync(secureDataEntry.lockMnemonic + address, mnemonic)
    .then(resolve)
    .catch(reject);
};

export const getLockMnemonicAsync = (address, resolve, reject) => {
  SecureStore.getItemAsync(secureDataEntry.lockMnemonic + address)
    .then(resolve)
    .catch(reject);
};

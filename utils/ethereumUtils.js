import util from 'ethereumjs-util';
import { Wallet, Contract, ethers, utils as etherUtils } from 'ethers';
import { contractInfo } from '../config';

const path = "m/44'/60'/0'/0/index";
const provider = ethers.getDefaultProvider();

export const getAddressFromPrivateKey = privateKey => {
  if (privateKey.indexOf('0x') === 0) {
    privateKey = privateKey.slice(2);
  }
  const privateBuffer = global.Buffer.from(privateKey, 'hex');
  if (!util.isValidPrivate(privateBuffer)) return false;

  try {
    return new Wallet(privateKey);
  } catch (e) {
    console.log(t.WALLET_ERROR, e);
    return false;
  }
};

export const getAddressFromMnemonic = mnemonic => {
  mnemonic = mnemonic.trim();
  if (mnemonic.split(' ').length !== 12) return false;
  try {
    return Wallet.fromMnemonic(mnemonic);
  } catch (e) {
    console.log(t.WALLET_ERROR, e);
    return false;
  }
};

export const getTokenBalanceABI = [
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    type: 'function',
  },
];

// NES and ETH decimals are both 18, format the bigNumber to a sting (in ether)
export const getNumber = number => etherUtils.formatEther(etherUtils.bigNumberify(number));

export const getTokenBalance = queryAddress => {
  const tokenAddress = contractInfo.address;
  const contract = new Contract(tokenAddress, getTokenBalanceABI, provider);
  return contract.balanceOf(queryAddress).then(
    balance =>
      new Promise(resolve => {
        resolve(parseFloat(getNumber(balance)));
      })
  );
};

export const getEtherBalance = walletAddress => {
  return provider.getBalance(walletAddress).then(
    balance =>
      new Promise(resolve => {
        resolve(parseFloat(getNumber(balance)));
      })
  );
};

const t = {
  WALLET_ERROR: '[Wallet Create Error in EthereumUtils.js]:',
};

class Checker {
  static checkAddress(address, coin) {
      return this.checkAddressETH(address)
  }

  static checkAddressETH(address) {
    const regx = /^0x[0-9A-Fa-f]{40}$/
    if (address.length !== 42) {
      return false
    }
    return address.match(regx)
  }

  static checkAddressQR(address) {
    const  regx = /^0x[0-9A-Fa-f]{40}$/
    return address.match(regx)
  }

  static checkPrivateKey(key) {
    const regx = /^[0-9A-Fa-f]{64}$/
    return key.match(regx)
  }
  static checkWalletIsExist(wallets, address) {
    return wallets.find((w) => {
      if (w.type === 'ethereum') return w.address.toLowerCase() === address.toLowerCase()
      return w.address === address
    })
  }
  static checkNameIsExist(wallets, name) {
    return wallets.find((w) => {
      return w.title.toLowerCase() === name.toLowerCase()
    })
  }
  static async checkInternet() {
    let probablyHasInternet = false
    try {
      const googleCall = await fetch('https://google.com')
      probablyHasInternet = googleCall.status === 200
    } catch (e) {
      probablyHasInternet = false
    }
    return probablyHasInternet
  }
}

export default Checker

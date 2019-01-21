console.log('Buffer is', Buffer);

const util = require('ethereumjs-util')
const privateKey = 'b3520803c444b3e2fe7dcb409a9928a4f5ecd1786c77062133c6d016bb7e94f9'

export const testScript = () => {
  const publicKey = util.privateToPublic(privateKey);
  console.log(publicKey)
}

import { defineChain } from '../../utils/chain/defineChain.js'

export const galadriel = /*#__PURE__*/ defineChain({
  id: 696969,
  name: 'Galadriel Devnet',
  nativeCurrency: { name: 'GAL Ether', symbol: 'GAL', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://devnet.galadriel.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Galadriel Devnet explorer',
      url: 'https://explorer.galadriel.com',
      apiUrl: 'https://explorer.galadriel.com/api/v2',
    },
  },
  testnet: true,
})

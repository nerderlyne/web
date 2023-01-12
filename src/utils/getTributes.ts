import { ethers } from 'ethers'
import { TRIBUTE_ROUTER_ABI, TRIBUTE_ROUTER_ADDRESS } from '~/constants'

export const getTributes = (dao: string, chainId: number) => {
  const provider = new ethers.providers.AlchemyProvider(chainId, process.env.NEXT_PUBLIC_ALCHEMY_ID ?? '')
  const contract = new ethers.Contract(TRIBUTE_ROUTER_ADDRESS, TRIBUTE_ROUTER_ABI, provider)
  const filter = contract.filters.TributeMade()
}

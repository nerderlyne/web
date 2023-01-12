import { ethers } from 'ethers'
import { CID } from 'multiformats'

interface TributeDetails {
  name: string
  reason: string
  contribution_type: 'capital' | 'sweat'
  capital_token: string
  sweat_contribution: {
    guild: string
    skills: string
  }
}

export const getTributeDetails = async (tribute: TributeDetails): Promise<`0xstring`> => {
  const { name, reason, contribution_type, capital_token, sweat_contribution } = tribute
  const obj = {
    name,
    reason,
    contribution_type,
    capital_token,
    sweat_contribution,
  }
  const url = await uploadJSON(obj)

  if (url instanceof Error) throw new Error(url.message)

  console.log('url', url, url?.length)

  return ethers.utils.formatBytes32String(url) as `0xstring`
}

export async function uploadJSON(obj: any) {
  try {
    const result = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
      body: JSON.stringify(obj),
    }).then((res) => res.json())

    const cid = CID.parse(result.IpfsHash)

    return result.IpfsHash
  } catch (e) {
    console.error(e)
    return new Error('Something went wrong with the upload.', {
      cause: e,
    })
  }
}

export const convertIpfsHash = (source: string): string => {
  const desiredGatewayPrefix = 'ipfs://'
  return desiredGatewayPrefix + source
}

import React from 'react'
import { useQuery } from '@tanstack/react-query'

export const getTributes = async () => {
  const url = `https://api.thegraph.com/subgraphs/name/nerderlyne/keep-matic`
  const keep = `0xbb58d667b8963a7022445b9d7c6607aab0efb608`.toLowerCase()
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        query: `query {
            keeps(where: {id: "${keep}"}) {
              id
              tributes {
                id
                amount
                approved
                approvedAt
                approvedDescription
                approvedBy {
                  address
                  id
                }
                asset
                deadline
                requestAmount
                requestDescription
                requestTimestamp
                requestTokenId
                std
                tokenId
                tributeId
              }
            }
          }`,
      }),
    })

    if (!res.ok) throw new Error(res.statusText)

    const data = await res.json()
    return data?.data?.keeps[0]?.tributes
  } catch (e) {
    return e
  }
}

export function useGetTributes() {
  return useQuery(['getTributes'], async () => {
    const data = await getTributes()
    return data
  })
}

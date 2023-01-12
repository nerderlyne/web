import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useContractWrite } from 'wagmi'
import { TRIBUTE_ROUTER_ADDRESS, TRIBUTE_ROUTER_ABI } from '../constants'
import { ethers, BigNumber } from 'ethers'
import { getTributeDetails } from './utils'

// define the zod schema for the JoinForm
const JoinFormSchema = z.object({
  name: z.string().min(1).max(100),
  why: z.string().min(1).max(1000),
  way: z.enum(['capital', 'sweat']),
})

export default function JoinForm() {
  const { register, control, handleSubmit } = useForm({
    resolver: zodResolver(JoinFormSchema),
  })
  const watchedWay = useWatch({ control, name: 'way' })
  const { writeAsync } = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: TRIBUTE_ROUTER_ADDRESS,
    abi: TRIBUTE_ROUTER_ABI,
    functionName: 'makeTribute',
    chainId: 137,
  })

  const submit = async (data: any) => {
    const { name, why, way, guild, skills, token } = data

    let asset: `0xstring` = ethers.constants.AddressZero as `0xstring`
    if (way === 'capital') {
      asset = token as `0xstring`
    }

    // deadline is one month from now in unix time
    const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30
    // const description = await getTributeDetails({
    //   name,
    //   reason: why,
    //   contribution_type: way,
    //   capital_token: asset,
    //   sweat_contribution: {
    //     guild: guild,
    //     skills: skills,
    //   },
    // })

    const tx = await writeAsync?.({
      recklesslySetUnpreparedArgs: [
        '0xbb58d667b8963a7022445b9d7c6607aab0efb608', // to
        asset, // asset
        0, // standard
        BigNumber.from(0), // tokenId
        BigNumber.from(0), // amount
        BigNumber.from(0), // forId
        BigNumber.from(1), // forAmount
        deadline, // deadline
        ethers.utils.formatBytes32String('bleh') as `0xstring`, // description
      ],
    })
  }

  return (
    <form
      className="absolute min-h-screen w-full lg:bg-zinc-50 right-0 top-0 bottom-0 p-10 lg:w-1/2 flex flex-col align-center justify-center space-y-5"
      onSubmit={handleSubmit(submit)}
    >
      <h2 className="text-2xl font-semibold">Your support matters.</h2>
      <p className="text-md font-medium">
        This will generate a NFT on Ethereum. It will allow you to access exclusive token-gated content and discussions.
      </p>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="italic">
            What should we call you?
          </label>
          <input
            type="text"
            id="name"
            className="border-bottom-1 border-brand-200 focus:border-brand-600 focus:ring-brand-500 focus:ring-2"
            autoFocus
            {...register('name')}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="why" className="italic">
            Why do you want to join LexDAO?
          </label>
          <textarea
            id="why"
            className="border-bottom-1 border-brand-200 focus:border-brand-600 focus:ring-brand-500 focus:ring-2"
            {...register('why')}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="way" className="italic">
            Will you contribute capital or sweat to join?
          </label>
          <label htmlFor="way_capital" className="flex flex-row">
            <div className="flex items-center h-5">
              <input
                type="radio"
                id="way_capital"
                value="capital"
                aria-describedby="capital-helper-text"
                className="w-4 h-4 text-brand-600 bg-gray-100 border-gray-300 focus:ring-brand-500  focus:ring-2"
                {...register('way')}
              />
            </div>
            <div className="flex flex-col ml-2 text-sm">
              <span className="font-medium text-gray-900 ">Capital</span>
              <span id="capital-helper-text" className="text-xs font-normal text-gray-500 ">
                Pay 300 USDC/DAI as membership dues. This will be refunded if you&apos;re not accepted as a member by
                the guild.
              </span>
            </div>
          </label>
          <label htmlFor="way_sweat" className="flex flex-row">
            <div className="flex items-center h-5">
              <input
                type="radio"
                id="way_sweat"
                value="sweat"
                aria-describedby="sweat-helper-text"
                className="w-4 h-4 text-brand-600 bg-gray-100 border-gray-300 focus:ring-brand-500  focus:ring-2"
                {...register('way')}
              />
            </div>
            <div className="flex flex-col ml-2 text-sm">
              <span className="font-medium text-gray-900 ">Sweat</span>
              <span id="sweat-helper-text" className="text-xs font-normal text-gray-500 ">
                Apprentice on a project with a legal engineer to earn your membership.
              </span>
            </div>
          </label>
        </div>
      </div>
      {watchedWay === 'sweat' && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="guild" className="italic">
              Which guild are you interested in?
            </label>
            <select
              id="guild"
              className="border-bottom-1 border-brand-200 focus:border-brand-600 focus:ring-brand-500 focus:ring-2"
              {...register('guild')}
            >
              <option value="lex">Clinic</option>
              <option value="lex">Kali</option>
              <option value="lex">Study Group</option>
              <option value="lex">Archive</option>
              <option value="lex">RWA</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="skills" className="italic">
              What skills will you tribute?
            </label>
            <input
              type="text"
              id="skills"
              className="border-bottom-1 border-brand-200 focus:border-brand-600 focus:ring-brand-500 focus:ring-2"
              {...register('skills')}
            />
          </div>
        </div>
      )}
      {watchedWay === 'capital' && (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="token" className="italic">
              What will be the token of your contribution?
            </label>
            <select
              id="token"
              className="border-bottom-1 border-brand-200 focus:border-brand-600 focus:ring-brand-500 focus:ring-2"
              {...register('token')}
            >
              <option value="USDC">USDC</option>
              <option value="DAI">DAI</option>
            </select>
          </div>
        </div>
      )}
      <button
        type="submit"
        className="transition-transform duration-300 ease-in hover:scale-105 p-2 rounded-xl bg-brand-50  hover:bg-brand-100  focus:ring-brand-200  outline-none"
      >
        Submit.
      </button>
    </form>
  )
}

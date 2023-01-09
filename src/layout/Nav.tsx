import Item from './Item'

export default function Nav() {
  return (
    <nav className="w-max fixed bottom-10 left-1/2 right-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-row justify-center align-center border-b-2  text-white">
      <Item link="/join" label="join" />
      <Item link="/" label="home" />
      <Item link="/events" label="events" />
      <Item link="https://lexdao.discourse.group/" label="forum" isExternal={true} />
      <Item link="/library/submit-article" label="library" />
      <Item link="/archivist" label="archivist" />
    </nav>
  )
}

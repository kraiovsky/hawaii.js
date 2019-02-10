import Link from 'next/link'

export default () => (
  <>
    <div>
      <Link href="/dashboard">
        <a>Dashboard</a>
      </Link>{' '}
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
    <div>Welcome to Hawaii.js 🌴</div>
  </>
)

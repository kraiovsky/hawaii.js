import Link from 'next/link'

export default () => (
  <>
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>{' '}
      <Link href="/dashboard">
        <a>Dashboard</a>
      </Link>
    </div>
    <div>About page</div>
    <div>{process.env.NODE_ENV}</div>
    <div>{process.env.PUBLIC_KEY}</div>
    <div>{process.env.PORT}</div>
  </>
)

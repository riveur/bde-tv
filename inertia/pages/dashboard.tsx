import { type db } from '#services/db'

type DashboardPageProps = {
  news: InstanceType<typeof db.news>[]
  events: InstanceType<typeof db.events>[]
}

export default function DashboardPage(props: DashboardPageProps) {
  const { news, events } = props

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>News</h2>
      <pre>
        {JSON.stringify(news, null, 2)}
      </pre>

      <h2>Events</h2>
      <pre>
        {JSON.stringify(events, null, 2)}
      </pre>
    </div>
  )
}

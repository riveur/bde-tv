import { useForm } from '@inertiajs/react'
import { type FormEvent } from 'react'

export default function LoginPage() {
  const form = useForm({
    username: '',
    password: '',
  })

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    form.post('/login')
  }

  return (
    <div>
      <h1>Login</h1>
      <form method="post" onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={form.data.username}
          onChange={(event) => form.setData('username', event.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={form.data.password}
          onChange={(event) => form.setData('password', event.target.value)}
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

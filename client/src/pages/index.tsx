import { ICurrentUser } from '@/types/user'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function Home({currentUser}:{currentUser:ICurrentUser}) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {
        currentUser?`Hey ${currentUser.email}`:"Sign in bitch!"
      }
   
    </main>
  )
}



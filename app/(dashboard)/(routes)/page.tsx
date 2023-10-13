import { auth } from "@clerk/nextjs"

export default function Home() {
  const { userId } = auth();

  if (!userId) return "You need to be connected to access."

  return (
    <div>
      Je suis mon dashboard
    </div>
  )
}
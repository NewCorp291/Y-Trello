import { auth } from "@clerk/nextjs"
import { Column } from "./_components/column";

export default function Home() {
  const { userId } = auth();

  if (!userId) return "You need to be connected to access."

  return (
    <div className="flex gap-x-3 w-full">
      <Column stateLabel="TODO" title="TODO" />
      <Column stateLabel="INPROGRESS" title="IN PROGRESS" />
      <Column stateLabel="DONE" title="DONE" />
    </div>
  )
}
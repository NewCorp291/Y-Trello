import { db } from "@/lib/db";
import { State } from "@prisma/client";
import { AddCard } from "./add-card";
import Cards from "./cards";

interface ColumnProps {
  stateLabel: string;
  title: string;
}

export const Column = async ({stateLabel, title}: ColumnProps) => {
  let stateFilter;

  if (stateLabel == 'TODO' || stateLabel === 'INPROGRESS' || stateLabel === 'DONE') {
    stateFilter = stateLabel as State;
  } else {
    return "invalid state";
  }

  const cards = await db.card.findMany({
    where: {
      state: stateFilter
    }
  })

  return (
    <div className="min-w-[300px] bg-[#f1f2f4] rounded-md px-4 p-4 h-auto">
      <h2 className="font-semibold pb-4">{title}</h2>
      <ul className="flex flex-col gap-2">
        <Cards cards={cards} stateLabel={stateLabel} />
        <AddCard state={stateFilter}/>
      </ul>
    </div>
  )
} 
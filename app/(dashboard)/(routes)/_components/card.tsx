"use client";

import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@prisma/client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface CardProps {
  card: Card;
}

export const CardItem = ({card}: CardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget)
      
      const response = await fetch(`/api/cards/${card.id}`, {
        method: 'PATCH',
        body: JSON.stringify(Object.fromEntries(formData)),
      })

      router.refresh();
      toast.success("The card has been updated successfully !", { position: "top-right" });
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong", { position: "top-right" });
    } finally {
      setIsLoading(false)
    }
  }

  const switchColumnCard = async (card: Card) => {
    let newState = '';

    if (card.state === 'TODO') {
      newState = 'INPROGRESS';
    } else if(card.state === 'INPROGRESS') {
      newState = 'DONE'
    }

    try {
      const response = await fetch(`/api/cards/${card.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: card.title,
          state: newState
        })
      });

      router.refresh();
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong", { position: "top-right" });
    }
  }

  return (
    <li className="bg-white rounded-md shadow-sm border flex flex-col relative">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="text-left py-2 px-3 text-sm flex gap-x-2 items-center">
          {card.title}
        </DialogTrigger>
        {card.state !== 'DONE' && (
          <span onClick={() => switchColumnCard(card)} className="absolute right-2 bottom-2 z-50 flex items-center justify-center shrink-0 hover:no-underline hover:bg-gray-50 p-0 border rounded-xl w-5 h-5 ml-auto">
            <img className="w-4 h-4" src="/chevron-right.svg" alt="chevron-right" loading="lazy" />
          </span>
        )}
        <span className={`absolute w-[7px] h-[7px] rounded-full left-[2px] top-[2px] bg-${card.priority}`}></span>
        <DialogContent>
          <DialogHeader className="flex-row gap-x-2">Edit <span className="font-bold">"{card.title}"</span></DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input name="title" id="title" defaultValue={card.title} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea name="description" id="description" defaultValue={card.description ? card.description : ""} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">Priority</Label>
                <Select name="priority" defaultValue={card.priority}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={card.priority} defaultValue={card.priority}/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">LOW</SelectItem>
                    <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                    <SelectItem value="IMPORTANT">IMPORTANT</SelectItem>            
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="state" className="text-right">State</Label>
                <Select name="state" defaultValue={card.state}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={card.state} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TODO">TODO</SelectItem>
                    <SelectItem value="INPROGRESS">IN PROGRESS</SelectItem>
                    <SelectItem value="DONE">DONE</SelectItem>            
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isLoading} onClick={() => setOpen(false)}>Update</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </li>
  );
}
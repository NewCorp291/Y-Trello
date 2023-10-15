"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

interface AddCardProps {
  state: string;
}

export const AddCard = ({ state }: AddCardProps) => {
  const router = useRouter();
  const [socket, setSocket] = useState<any>(undefined);
  const [title, setTitle] = useState('');
  const [stateCard, setStateCard] = useState(state);

  useEffect(() => {
    const socket = io("http://localhost:3001");
  
    setSocket(socket);
  }, []);



  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget)

      const response = await fetch('/api/cards', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      router.refresh();
      toast.success("The card has been updated successfully !", { position: "top-right" });
      setTitle('');
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong", { position: "top-right" });
    }
  }

  return (
    <li className="bg-white rounded-md shadow-sm border flex flex-col relative mt-auto">
      <form onSubmit={onSubmit}>
        <Input name='state' id='state' className="hidden" value={state} onChange={(e) => setStateCard(state)} />
        <Input name="title" id="title" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Enter the name of the card..." className="col-span-3 shadow-none title-input" required/>
        <Button type="submit" className="hidden"></Button>
      </form>
    </li>

  );
}
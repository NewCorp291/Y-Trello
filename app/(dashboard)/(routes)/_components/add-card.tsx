"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

interface AddCardProps {
  state: string;
}

export const AddCard = ({ state }: AddCardProps) => {
  const router = useRouter();
  const [title, setTitle] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

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
        <Input name='state' id='state' className="hidden" value={state} />
        <Input name="title" id="title" onChange={handleChange} value={title} placeholder="Enter the name of the card..." className="col-span-3 shadow-none title-input" required/>
        <Button type="submit" className="hidden"></Button>
      </form>
    </li>

  );
}
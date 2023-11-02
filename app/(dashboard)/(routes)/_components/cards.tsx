"use client";

import { Card } from '@prisma/client';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { CardItem } from './card';

interface TestProps {
  cards: Card[];
  stateLabel: string;
}

const Cards = ({cards, stateLabel}: TestProps) => {
  const [socket, setSocket] = useState<any>(undefined);
  const [initialCards, setInitialCards] = useState<Card[]>(cards);
  const filteredCards = initialCards.filter(cards => cards.state === stateLabel);

  useEffect(() => {
    const socket = io("http://localhost:3001");
  
    setSocket(socket);

    socket.on('card', (card) => {
      setInitialCards(cards => [...cards, card]);
    });

    socket.on('card:delete', (cardId) => {
      setInitialCards(cards => cards.filter(cardValue => cardValue.id !== cardId));
    })

    socket.on('card:update', (card) => {
      setInitialCards(cards => {
        if (card.state === stateLabel) {
          const index = cards.findIndex((t) => t.id === card.id);
          if (index === -1) {
            return [...cards, card];
          }
          const next = [...cards];
          next[index] = card;
          return next;
        } else {
          return cards.filter(c => c.id !== card.id)
        }
      })
    })
    
    return () => {
      socket.off('card');
      socket.off('card:delete');
      socket.off('card:update');
    }
  }, []);


  return (
    <div>
      {filteredCards.length ? (
        filteredCards.map((card) => {
          return (
            <CardItem card={card} key={card.id} />
          )
        })
        ) : ''}
    </div>
  )
}

export default Cards
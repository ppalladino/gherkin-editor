"use client"

import React, { useEffect, useState } from 'react';
import { getAllFeatures, Item } from '@/_services/'

export default function Features() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        const loadAllFeatures = async () => {
          try {
            const data = await getAllFeatures();
            setItems(data);
          } catch (error) {
            console.error(error);
          }
        };
        loadAllFeatures();
      }, []);
    
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1>Welcome to the Features Page</h1>
          <h1>Items</h1>
            <ul>
                {items.map(item => (
                <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        </footer>
      </div>
    );
}
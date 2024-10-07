'use client'

import { useDarkMode } from '@/global-states/darkMode';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function Home() {
  const translate = useTranslations('Home');
  const { DarkMode, setDarkMode } = useDarkMode();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/test');
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data = await response.json();
        console.log(data); // Procesa los datos como necesites
      } catch (error) {
        console.log('Error');
      }
    };
  
    fetchData();
  }, []);

  return (
    <div>
      <h1>{translate("title")}</h1>
    </div>
  );
}

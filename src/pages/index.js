import Landing from '@/home/Landing'
import { useEffect } from 'react';

export default function LandingPage() {
  useEffect(() => {
    // Scrollni o'chirish
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      // Sahifadan chiqqanda scrollni tiklash
      document.body.style.overflow = prev;
    };
  }, []);

  return <Landing />
}

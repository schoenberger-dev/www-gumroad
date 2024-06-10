import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function imageUrl(image: string) {
  return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/images${image}`;
}

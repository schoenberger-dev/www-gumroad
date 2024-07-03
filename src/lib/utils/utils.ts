import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function imageUrl(image: string) {
  return `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/images${image}`;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: Parameters<T>) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;

  return function (this: any, ...args: Parameters<T>) {
    const context = this;

    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(
        function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - lastRan),
      );
    }
  };
}

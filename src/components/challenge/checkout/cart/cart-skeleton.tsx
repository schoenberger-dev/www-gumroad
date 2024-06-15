import { Skeleton } from '@/components/ui/skeleton';

export function CartSkeleton({ count }: { count: number }) {
  const products = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <div className="h-full rounded-md border border-foreground bg-white">
      {products.map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-[140px_1fr] border-b border-foreground last:border-none"
        >
          <Skeleton className="h-[140px] w-[140px]" />
          <div className="flex flex-col justify-between p-4">
            <div className="flex justify-between">
              <div className="flex flex-col gap-y-2">
                <Skeleton className="h-5 w-44" />
                <Skeleton className="h-4 w-36" />
              </div>
              <Skeleton className="h-5 w-12" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <Skeleton className="h-5 w-12" />
              <div className="flex items-center gap-x-4">
                <Skeleton className="block h-5 w-16" />
                <Skeleton className="block h-5 w-16" />
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="space-y-4 p-4">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-5 w-14" />
        </div>
        <div className="flex justify-between gap-x-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
      <div className="border-t border-foreground">
        <div className="flex justify-between p-4 text-xl">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </div>
  );
}

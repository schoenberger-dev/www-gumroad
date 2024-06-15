import { cn } from '@/lib/utils';
import { SearchResultItem } from './';

type SearchResultGroupProps =
  | { className?: string; title: string; results: Product[]; type: 'product' }
  | { className?: string; title: string; results: Artist[]; type: 'artist' }
  | {
      className?: string;
      title: string;
      results: ProductCategory[];
      type: 'category';
    };

export function SearchResultGroup({
  title,
  results,
  type,
  className,
}: SearchResultGroupProps) {
  return (
    <div className={cn('flex flex-col py-3 last:border-b-0', className)}>
      <h3 className="mb-2 px-4 text-xl">{title}</h3>
      {results.map((item) => (
        <SearchResultItem key={item.id} item={item} type={type} />
      ))}
    </div>
  );
}

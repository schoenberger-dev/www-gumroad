import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

type Props = {
  onChange: (tip: string) => void;
};

export function Tip({ onChange }: Props) {
  const [tip, setTip] = useState<string>('');

  return (
    <div className="space-y-2">
      <label htmlFor="tip" className="mb-2 text-sm">
        Tip
      </label>
      <div className="flex justify-between gap-x-4">
        <Input
          placeholder="Amout"
          id="tip"
          value={tip}
          type="number"
          onKeyDown={(e) => e.key === 'Enter' && onChange(tip)}
          onChange={(e) => setTip(e.target.value)}
          className="bg-white text-foreground"
        />
        <Button
          variant="secondary"
          className="gumroad-hover h-12 bg-white"
          onClick={() => onChange(tip)}
        >
          <span>Apply</span>
        </Button>
      </div>
    </div>
  );
}

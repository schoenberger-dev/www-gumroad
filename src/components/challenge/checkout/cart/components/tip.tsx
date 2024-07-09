import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useRef, useState } from 'react';

type Props = {
  value: number;
  onChange: (tip: string) => void;
  visible: boolean;
};

export function Tip({ value, onChange, visible }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tip, setTip] = useState<string>(value.toString() ?? '');

  useEffect(() => {
    setTip(value === 0 ? '' : value.toString());
  }, [value]);

  useEffect(() => {
    if (visible) inputRef.current?.focus();
  }, [visible]);

  return (
    <div className="flex justify-between gap-x-4">
      <Input
        ref={inputRef}
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
  );
}

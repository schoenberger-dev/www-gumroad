import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  const cards = [
    {
      title: 'hey,',
      description: 'Bits and pieces of myself.',
      link: '/hey',
    },
    {
      title: 'Challenge',
      description: 'The application challenge.',
      link: '/checkout',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-1">
      <div className="flex gap-x-4">
        {cards.map(({ title, description, link }) => (
          <Link href={link}>
            <Card className="gumroad-hover flex h-44 w-72 flex-col items-center justify-center rounded-md">
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription
                className="text-center"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

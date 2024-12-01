import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const FeatureCards: React.FC = () => {
  const cardDetails = [
    {
      title: 'Card 1 Title',
      description: 'Card 1 Description',
      content: 'Card 1 Content',
      footer: 'Card 1 Footer',
    },
    {
      title: 'Card 2 Title',
      description: 'Card 2 Description',
      content: 'Card 2 Content',
      footer: 'Card 2 Footer',
    },
    {
      title: 'Card 3 Title',
      description: 'Card 3 Description',
      content: 'Card 3 Content',
      footer: 'Card 3 Footer',
    },
  ];

  return (
    <section className="mt-40 flex flex-col items-center justify-center gap-y-20 py-20 px-10">
      <p>Key Features</p>
      <div className="flex items-center justify-center gap-x-10">
        {cardDetails.map((card, index) => (
          <Card key={index} className="w-96 h-96">
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{card.content}</p>
            </CardContent>
            <CardFooter>
              <p>{card.footer}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

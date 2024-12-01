import { li } from 'motion/react-client';

export const Footer: React.FC = () => {
  const FooterDetails = [
    {
      label: 'What we offer',
      item1: 'Rate and terms',
      item2: 'Cash out Refinance',
    },
    {
      label: 'Resources',
      item1: 'Customer Reviews',
      item2: 'Docs',
    },
    {
      label: 'About us',
      item1: 'Meet the team',
      item2: 'Contact',
    },
  ];
  return (
    <footer className="p-20 h-72 flex item-center justify-between text-left bg-app-slate m-10 rounded-xl border-app-purple border shadow-lg">
      <h1 className="w-3/4">Logo</h1>
      <div className="flex gap-y-3 justify-between my-auto items-center w-full">
        {FooterDetails.map((footer, index) => (
          <div className="flex flex-col space-y-6" key={index}>
            <h3 className="text-2xl text-app-charteuse">{footer.label}</h3>
            <ul className="flex flex-col gap-y-3 text-lg text-app-pale">
              <li>{footer.item1}</li>
              <li>{footer.item2}</li>
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

import { useNavigate, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const navItems = [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'Lend',
      url: '/Lending',
    },
    {
      name: 'Borrow',
      url: '/Borrowing',
    },
    {
      name: 'Estimate APY',
      url: '/estimate-apy',
    },
    {
      name: 'FeedBack',
      url: '/feedback',
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="text-black">
      <ul className="flex items-center gap-x-6 text-lg font-medium pl-20">
        {navItems.map(item => {
          const isActive = location.pathname === item.url;
          return (
            <li
              key={item.url}
              onClick={() => navigate(item.url)}
              className={`cursor-pointer  ${
                isActive
                  ? 'decoration-app-slate underline underline-offset-8'
                  : 'text-app-violet'
              }`}
            >
              <p>{item.name}</p>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

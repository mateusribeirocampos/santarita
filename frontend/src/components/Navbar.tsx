import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Church } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Inicial', path: '/' },
    { name: 'Eventos', path: '/events' },
    { name: 'Horários', path: '/schedule' },
    { name: 'Notícias', path: '/news' },
    { name: 'Igreja', path: '/churchsr' },
    { name: 'Santa Rita', path: '/santa-rita' },
    { name: 'Dízimo', path: '/tithe' },
  ];

  return (
    <nav className="bg-parchment border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Church className="h-8 w-8 text-wine" strokeWidth={1.5} />
              <span className="ml-3 font-serif text-lg font-semibold text-ink">
                Igreja Santa Rita de Cássia
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                  location.pathname === item.path
                    ? 'border-wine text-wine'
                    : 'border-transparent text-ink-soft hover:text-ink hover:border-line'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 border border-line text-ink hover:border-wine focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-line">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 text-base font-medium border-l-2 ${
                  location.pathname === item.path
                    ? 'border-wine text-wine bg-wine-light'
                    : 'border-transparent text-ink-soft hover:border-line'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

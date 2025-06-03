'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Home, Bell, User, Menu, X, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { icon: <Home size={20} />, label: 'Home', href: '/' },
    { icon: <Bell size={20} />, label: 'Notifications', href: '#' },
    { icon: <User size={20} />, label: 'Profile', href: '/profile' },
    { icon: <LogIn size={20} />, label: 'Sign In', href: '/signin' },
  ];

  return (
    <header className={cn(
      'fixed top-0 w-full z-50 transition-all duration-300',
      isScrolled ? 'bg-white shadow-md' : 'bg-white'
    )}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="mr-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>

    
          <div className="flex items-center space-x-4 flex-1">
            <Link href="/" className="flex items-center">
            <div className="relative w-24 h-24">
  <Image
    src="/Images/glogo.png" 
    alt="Logo"
    layout="fill"
    objectFit="contain" 
  />
</div>
              {/* <span className="ml-2 text-xl font-bold text-gray-900 hidden sm:block">GDG Community</span> */}
            </Link>
          
            <div className="hidden md:flex relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <Input 
                placeholder="Search"
                className="pl-10 bg-gray-100 border-none focus:bg-white"
              />
            </div>

            <div className="flex md:hidden relative flex-1 max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <Input 
                placeholder="Search"
                className="pl-10 bg-gray-100 border-none focus:bg-white w-full"
              />
            </div>
          </div>


          <nav className="hidden md:flex md:space-x-4 lg:space-x-6">
            {navItems.map((item, index) => (
              <Link 
                key={index} 
                href={item.href}
                className="flex flex-col items-center px-2 py-1 text-gray-600 hover:text-blue-600 transition-colors"
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>


      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2">
            <div className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <Link 
                  key={index} 
                  href={item.href}
                  className="flex items-center px-3 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
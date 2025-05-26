import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex-shrink-0">
        <Image 
          src="/Images/gdglogo.png" 
          alt="G Dev Logo" 
          width={120}   
          height={40}  
          className="object-contain"
          priority
        />
      </div>

      <input 
        type="text" 
        placeholder="Search posts..." 
        className="hidden md:block border px-3 py-1 rounded-md w-1/3 text-gray-700" 
      />

      <div className="flex gap-4 items-center">
        <button className="text-sm text-blue-500 hover:underline">Login</button>
        <div className="w-8 h-8 rounded-full bg-gray-300"></div>
      </div>
    </nav>
  );
}

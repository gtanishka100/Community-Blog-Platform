import Feed from '@/components/Feed';
import RightSidebar from '@/components/RightSidebar';
import LeftSidebar from '@/components/LeftSidebar';
import Navbar from '@/components/Navbar';
import { AuthInitializer } from '@/components/authInitializer';

export default function Home() {
  return (
    <AuthInitializer>
      <main className="pt-16 bg-gray-100 min-h-screen">
        <Navbar/>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-20">
              <LeftSidebar />
            </div>
          </div>
          <div className="lg:col-span-6">
            <Feed />
          </div>
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-20">
              <RightSidebar />
            </div>
          </div>
        </div>
      </main>
    </AuthInitializer>
  );
}
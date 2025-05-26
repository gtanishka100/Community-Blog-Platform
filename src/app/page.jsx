import Hero from './components/Hero';
import PostCard from './components/PostCard';
import FriendSuggestions from './components/FriendSuggestions';

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Hero />
        <PostCard />
        <PostCard />
      </div>
      <FriendSuggestions />
    </main>
  );
}

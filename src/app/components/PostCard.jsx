export default function PostCard() {
    return (
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div>
            <h4 className="font-semibold text-gray-800">John Doe</h4>
            <span className="text-sm text-gray-500">2 hrs ago</span>
          </div>
        </div>
        <p className="text-gray-700 mb-2">Excited to join the GDG platform! #GDG #Blog</p>
        {/* <img src="/post-sample.jpg" alt="post" className="w-full rounded-md mb-2" /> */}
        <div className="flex gap-6 text-sm text-gray-500">
          <span>👍 24</span>
          <span>💬 5</span>
          <span>↪️ Share</span>
        </div>
      </div>
    );
  }
  
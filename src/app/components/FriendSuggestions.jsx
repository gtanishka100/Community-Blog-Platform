export default function FriendSuggestions() {
    return (
      <aside className="bg-white p-4 rounded-lg shadow h-fit">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">People You May Know</h3>
        <ul className="space-y-3 ">
          {["Alice", "Bob", "Charlie"].map((name, i) => (
            <li key={i} className="flex items-center justify-between text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span>{name}</span>
              </div>
              <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600">
  Add
</button>
            </li>
          ))}
        </ul>
      </aside>
    );
  }
  
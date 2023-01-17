export const PopOver = () => {
  return (
    <div className="p-4">
      <div class="group relative">
        <button className="bg-gray-800 text-white px-6 h-10 rounded">
          Menü
        </button>
        <nav
          tabindex="0"
          className="border border-2 bg-white invisible border-gray-800 rounded w-60 absolute left-0 top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1"
        >
          <ul className="py-1">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Edit
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Delete
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";

export default function GifPicker({ onSelectGif, onClose }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    fetchGifs("trending");
  }, []);

  async function fetchGifs(query) {
    setLoading(true);
    try {
      let url;

      if (query === "trending") {
        url =
          "https://murmur-production.up.railway.app/gifs/trending";
      } else {
        url = `https://murmur-production.up.railway.app/gifs/search?q=${query}`;
      }

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    if (!search) return;
    fetchGifs(search);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="h-[70vh] w-full max-w-md rounded-lg bg-white p-4 dark:bg-zinc-950 dark:text-white">
        <div className="mb-2 flex gap-2">
          <input
            type="text"
            placeholder="Search GIFs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg bg-zinc-200 p-2 text-sm dark:bg-zinc-900"
          />
          <button
            onClick={(e) => handleSearch(e)}
            className="rounded-lg bg-[#A13333] px-3 py-1 text-sm text-white"
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-500 px-3 py-1 text-sm text-white"
          >
            ✕
          </button>
        </div>

        {loading && (
          <p className="text-center text-gray-500">Loading...</p>
        )}

        <div className="grid h-[90%] grid-cols-3 gap-2 overflow-y-auto">
          {results.map((gif) => (
            <img
              key={gif.id}
              src={gif.images.fixed_height.url}
              alt={gif.title}
              className="cursor-pointer rounded-lg"
              onClick={() => onSelectGif(gif.images.original.url)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

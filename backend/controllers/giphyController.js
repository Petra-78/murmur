export async function searchGifs(req, res) {
  const { q } = req.query;

  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${q}&limit=12&rating=g`,
    );

    const data = await response.json();
    res.json(data.data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch GIFs" });
  }
}

export async function getTrendingGifs(req, res) {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.GIPHY_API_KEY}&limit=12&rating=g`,
    );

    const data = await response.json();
    res.json(data.data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch GIFs" });
  }
}

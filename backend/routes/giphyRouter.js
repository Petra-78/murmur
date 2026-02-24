import { Router } from "express";
import { getTrendingGifs, searchGifs } from "../controllers/giphyController.js";

const router = Router();

router.get("/search", searchGifs);

router.get("/trending", getTrendingGifs);

export { router as giphyRouter };

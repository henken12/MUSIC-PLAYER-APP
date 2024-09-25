import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import UserRouter from "./routes/UserRouter";
import SongRouter from "./routes/SongRouter";
import PlaylistRouter from "./routes/PlayListRoute";
import path from "path"

const app = express();

app.use(express.json());
app.use("/audio", express.static(path.join(__dirname, "audio")))
app.use(cors());
app.use("/user", UserRouter);
app.use("/songs", SongRouter);
app.use("/playlists", PlaylistRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ isSuccess: false, message: err.message });
});

// 404 Not Found middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ isSuccess: false, message: "Page not found!!" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`music player app is running on port ==> ${PORT}`);
});

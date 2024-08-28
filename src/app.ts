import express from "express";
import cors from "cors";
import router from "./app/routes";
import notFound from "./app/middileWare/notFound";
import globalErrorhandler from "./app/middileWare/globalErrorHandler";

const app = express();
app.use(cors());
app.use(express.json());

// application route
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hi, this is Room Booking Server 😁😀!");
});
app.use(notFound);
// global error
app.use(globalErrorhandler);

export default app;

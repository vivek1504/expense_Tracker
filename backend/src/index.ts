import express from "express"
import { userRouter } from "./routes/userRoutes";
import { expenseRouter } from "./routes/expenseRoutes";

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/expense", expenseRouter);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
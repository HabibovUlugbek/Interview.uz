import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import { ENV } from "../common/config";
import { BaseResponse } from "../common/reporter/base.response";
// import fileUpload from "express-fileupload"
import { connectDB } from "../common/db/connectors";
// import path from "path"

import userRouter from "./routes/user/user.route";
// import courseRouter from "./routes/course/course.route";
// import orderRouter from "./routes/order/order.route";
// import orderItemsRouter from "./routes/order/orderItems/orderItems.route"
// import sectionRouter from "./routes/course/section/section.route";
// import lessonRouter from "./routes/course/section/lesson/lesson.route";
// import completeRouter from './routes/course/section/lesson/complete.router'
// import videoRouter from "./routes/videos/video.route"
// import commentRouter from './routes/course/comment/comment.route'
// import savedListRouter from './routes/user/courseSavedList/savedList.route'
// import categoryRouter from './routes/category/category.route'
// import { BaseResponse } from "../common/reporter/base.response";

!(async function () {
    const app = express();
    await connectDB();

    // app.use(fileUpload())
    app.use(express.json());
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));
    app.use(bodyParser.json({ limit: "20mb" }));

    // app.use("/video", videoRouter)
    app.use("/api/users/", userRouter);
    // app.use("/users/courseSavedLists/mySavedList", savedListRouter)
    // app.use("/courses", courseRouter);
    // app.use("/orders", orderRouter);
    // app.use("/orders/cart", orderItemsRouter)
    // app.use("/sections", sectionRouter);
    // app.use("/lessons", lessonRouter);
    // app.use("/complete", completeRouter)
    // app.use('/comments', commentRouter)
    // app.use("/category", categoryRouter)

    // errorHandler
    app.use((error, request, response, next) => {
        console.log(22, error)
        if(error instanceof BaseResponse)  response.send(error)
        else response.send(BaseResponse.UnknownError(error))
    })

    app.listen(ENV.USER_PORT, () =>
        console.log("User server is running on http://localhost:" + ENV.USER_PORT)
    );
})();

process.on('uncaughtException', err => {
    console.log('33', err)
})



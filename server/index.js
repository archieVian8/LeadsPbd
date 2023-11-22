import  express  from "express";
import router from "./routes/indexRoute.js";
// import { indexRouter } from "./routes/indexRoute.js";
// import { adminRouter } from "./routes/adminRoute.js";
// import { userRouter } from "./routes/userRoute.js";
import cors from "cors";

import db from "./config/database.js";

import user from "./models/user.js";
import eventOrganizer from "./models/eventOrganizer.js";
import competition from "./models/competition.js";
import academicEvents from "./models/academicEvents.js";
import userJoinCompetition from "./models/userJoinCompetition.js";
import userJoinAcademicEvents from "./models/userJoinAcademicEvents.js";
import winners from "./models/winners.js";
import userAchievement from "./models/userAchievement.js";

//import tb_disaster from "./models/tb_disaster.js";
// import tb_evac_location from "./models/tb_evac_location.js";
// import tb_victim from "./models/tb_victim.js";
// import tb_medicines from "./models/tb_medicines.js";
// import tb_clothing from "./models/tb_clothing.js";
// import tb_foods from "./models/tb_foods.js";
// import tb_donate from "./models/tb_donate.js";
// import tb_account from "./models/tb_account.js";

const app = express();

try {
    await db.authenticate();
    console.log('database Connected');
    await user.sync();
    await eventOrganizer.sync();
    await competition.sync();
    await academicEvents.sync();
    await userJoinCompetition.sync();
    await userJoinAcademicEvents.sync();
    await winners.sync();
    await userAchievement.sync();
    

    //await tb_disaster.sync();
    // await tb_evac_location.sync();
    // await tb_victim.sync();
    // await tb_medicines.sync();
    // await tb_clothing.sync();
    // await tb_foods.sync();
    // await tb_donate.sync();
    // await tb_account.sync();

} catch (error) {
    console.log( error);
}

app.use(cors({Credential:true, origin:'http://192.168.43.91:8080'})); //ganti
app.use(express.json());
app.use(router);
// app.use('/', indexRouter);
// app.use('/admin', adminRouter);
// app.use('/user', userRouter);
app.listen(3000,()=>{
    console.log ("server running @port3000");

});

import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Datbase.js";
import SequelizeStore from "connect-session-sequelize";
import AreaRoute from "./routes/AreaRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import BuildingRoute from "./routes/BuildingRoute.js";
import CampusRoute from "./routes/CampusRoute.js";
import ClassificationRoute from "./routes/ClassificationRoute.js";
import EmailsRoute from "./routes/EmailsRoute.js";
import EquipmentRoute from "./routes/EquipmentRoute.js";
import FloorRoute from "./routes/FloorRoute.js";
import PartsRoute from "./routes/PartsRoute.js";
import RoleRoute from "./routes/RoleRoute.js";
import SpaceRoute from "./routes/SpaceRoute.js";
import UserRoute from "./routes/UserRoute.js";
import ViewsRoute from "./routes/ViewsRoute.js";
import bodyParser from 'body-parser';
import ServicesRoute from "./routes/EmailsRoute.js";


dotenv.config();
const app= express();
(async()=>{
        await  db.sync();
    }
)();


const sessionStore =SequelizeStore(session.Store);
const store =new sessionStore({
    db: db
});

app.use(session({
    secret:process.env.SESS_SECRET,
    resave:false,
    saveUninitialized:true,
    store:store,
    cookie:{
        secure:'auto'
    }
}))
app.use(cors({
    credentials:true,
    origins: 'http://localhost:5000'
}));
app.use(bodyParser.json({ limit: '5gb' }));
app.use(bodyParser.urlencoded({ limit: '5gb', extended: true }));
app.use(AreaRoute);
app.use(AuthRoute);
app.use(BuildingRoute);
app.use(CampusRoute);
app.use(ClassificationRoute);
app.use(EmailsRoute);
app.use(EquipmentRoute);
app.use(FloorRoute);
app.use(PartsRoute);
app.use(RoleRoute);
app.use(SpaceRoute);
app.use(UserRoute);
app.use(ViewsRoute);
app.set('view engine', 'ejs');
app.set('view cache', false);
app.use('public', express.static(new URL('./public', import.meta.url).pathname));
app.use(express.static('public', { extensions: ['html', 'css','js'], }));

app.get('/', function(req, res) {
    res.render('pages/login', { title: 'Mi aplicación Node.js' });
});
app.use((req, res, next) => {
    res.status(404).redirect('/');
});

store.sync();
app.listen(process.env.APP_PORT,()=>{
    console.log('prendio esta monda')
});
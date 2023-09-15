import express, { Express, Request, Response } from "express";
import dotenv from "dotenv"
import cors from "cors"
import { getXataClient } from "./xata"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 7000;
const xata = getXataClient();

//! Middlewares
app.use(cors());
app.use(express.json());

//! Jobs Routes

//* GET Route [JOBS]
app.get("/api/jobs", async (req: Request, res: Response) => {
    const jobs = await xata.db.Jobs.getAll();
    res.status(200).send(jobs)
});

//! Auth Routes

//* POST Route [SIGNUP]
app.post("/api/signup", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const alreadyUser = await xata.db.Users.read(email);

        if (alreadyUser) return res.status(401).send("User Already Exists");

        const hashedPassword = bcrypt.hashSync(password, 10)
        const createUser = await xata.db.Users.create({
            email, password: hashedPassword
        });
        res.status(201).send(createUser);
    } catch (error) {
        res.status(403).send(error);
    };
});

//* POST Route [SIGNIN]
app.post("/api/signin", async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const validUser = await xata.db.Users.filter({ email }).getFirst();
        if (!validUser) return res.status(403).send("User Not Found");

        const passwordCheck = bcrypt.compareSync(req.body.password, String(validUser.password));
        if (!passwordCheck) return res.status(403).send("Wrong Credentials, Please try again!");

        const token = jwt.sign({ _id: validUser.id }, String(process.env.JWT_SECRET));

        //@ts-ignore
        const { password, ...info } = validUser;

        res.status(200).cookie("token", token, { httpOnly: true }).send(info);
    } catch (error) {
        res.status(403).send(error);
    };
});


//! User Routes

//* GET Route [Users]
app.get("/api/users", async (req: Request, res: Response) => {
    const users = await xata.db.Users.getAll();
    res.status(200).send(users);
});

app.listen(port, () => console.log("Server running at port " + port));
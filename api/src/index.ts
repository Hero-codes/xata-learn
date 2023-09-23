import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv"
import cors from "cors"
import { getXataClient } from "./xata"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 7000;
const xata = getXataClient();

//! Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (!token) return res.status(403).send("Not Authenticated!");

    jwt.verify(token, String(process.env.JWT_KEY), async (err: any, payload: any) => {
        if (err) return res.status(403).send("Token is not valid");
        //@ts-ignore
        req.userID = payload._id
        next();
    });
};

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

        const token = jwt.sign({ _id: validUser.id }, String(process.env.JWT_KEY));

        //@ts-ignore
        const { password, ...info } = validUser;

        res.status(200).cookie("token", token,
            { httpOnly: true }
        ).send(info);
    } catch (error) {
        res.status(403).send(error);
    };
});

//* GET Route [LOGOUT]
app.get("/api/logout", async (req: Request, res: Response) => {
    try {
        res.status(200).cookie("token", null, { httpOnly: true }).send("Logged out successfully!")
    } catch (err) {
        res.status(403).send(err);
    };
});

//! Jobs Routes

//* GET Route [JOBS]
app.get("/api/jobs", async (req: Request, res: Response) => {
    const jobs = await xata.db.Jobs.getAll();
    res.status(200).send(jobs)
});

//* POST Route [JOBS]
app.post("/api/add/:id", verifyToken, async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        if (!req.userID) return res.status(400).send("User not authenticated!");
        const jobID = req.params.id;
        const addApplication = await xata.db.Applications.create({
            jobID,
            // @ts-ignore
            userID: req.userID
        });
        res.status(200).send(addApplication);
    } catch (err) {
        res.status(400).send("Internal Server error " + err);
    };
});

//* GET Route [JOBS -> Specific]

app.get("/api/job/", verifyToken, async (req: Request, res: Response) => {
    try {
        const ownJobs = await xata.db.Applications.filter({
            // @ts-ignore
            userID: req.userID
        }).getMany();
        if (!ownJobs) return res.status(404).send("No Jobs Found!")
        res.status(200).send(ownJobs);
    } catch (err) {
        res.status(400).send(err)
    };
});

//! User Routes

//* GET Route [Users]
app.get("/api/users", async (req: Request, res: Response) => {
    const users = await xata.db.Users.getAll();
    res.status(200).send(users);
});

app.listen(port, () => console.log("Server running at port " + port));
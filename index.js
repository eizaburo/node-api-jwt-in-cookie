const express = require("express");
const app = express();

//JSON POST対応
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CORSを全許可
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //fetchにてcredentials includeの場合、ドメインの指定が必要
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Credentials", true); //クロスオリジンでCookieを使う場合必要
    next();
});

//CookieをParseするため
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//JWT
const jwt = require("jsonwebtoken");
const SECRET = "12345";

//認証無しAPI
app.get("/public", (req, res) => {
    res.json({
        status: "OK",
        message: "Welcome to public api."
    });
});

//認証＋Token発行
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "hoge" && password === "password") {
        const token = jwt.sign({ username: username }, SECRET, { expiresIn: "10m" });
        res.cookie("token", token, { httpOnly: true });
        res.json({
            status: "OK",
            token: token,
            message: "success."
        });
    } else {
        res.json({
            status: "ERROR",
            message: "Auth error."
        });
    }
});

//認証有りAPI（ミドルウエアでCookie中のTokenをチェック）
app.get("/private", verifyTokenOnCookie, (req, res) => {
    res.json({
        status: "OK",
        message: "Welcome to private api."
    });
});

//リッスン開始
app.listen(3001, () => {
    console.log("Start server on port 3001.");
});

//Token検証関数
function verifyTokenOnCookie(req, res, next) {
    //Tokenを取得
    const encoded_token = req.cookies.token;
    // console.log(encoded_token);
    try {
        //Cookieからtokenを検証
        const token = jwt.verify(encoded_token, SECRET);
        next();
    } catch (e) {
        res.json({
            status: "ERROR",
            message: "Verify error."
        });
        return;
    }
}

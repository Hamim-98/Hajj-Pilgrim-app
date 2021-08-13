const express = require('express')
const app = express()
const helmet = require('helmet')
const PORT = process.env.PORT || 5000
const cors = require('cors')
const passport = require( 'passport' );
// require( './config/passport' )( passport )
const cookieParser = require( 'cookie-parser' );
const session = require('express-session')

app.use(helmet());
app.use(cors())
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ));
// app.use( cookieParser() );

// Express Session
app.use(
  session({
    secret: "lask secret key",
    resave: true,
    saveUninitialized: true,
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(async function (user, done) {
  done(null, user);
});

//Routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/user", require("./routes/user"))
app.use("/api/admin", require("./routes/admin"))
app.use("/api/daily", require("./routes/hourlyData"))
app.use("/api/weekly", require("./routes/weeklyData"))
app.use("/api/monthly", require("./routes/monthlyData"))
app.get('/', (req,res)=>{
  console.log('here')
  res.send('Sanity check!')
})

app.get('/try', (reeq,res)=>{
  res.json({
    try:'haha'
  })
})



app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}...`))

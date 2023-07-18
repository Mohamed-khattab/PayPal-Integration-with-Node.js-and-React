const  express = require('express') ; 
const app = express() ; 
const cors = require('cors') ; 
app.use(cors()) ;


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));


const port = 3000 ; 
app.listen(port   , ()=>{
        console.log("App Started To Listen Successfully . . . . . . .");
})

const home = '/' ; 
app.get(home , (req , res)=>{
    res.send(200 , "hello form app ")
}) ; 

var userRouter  = require('./Router/userRouter');
var servicesRouter = require('./Router/serviesRouter') ; 

app.use('/user' , userRouter) ; 
app.use('/paypal', servicesRouter)  


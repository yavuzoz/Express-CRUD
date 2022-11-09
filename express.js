const express = require('express');
const app = express();

app.use(express.json());

var users = [
    {id :"1",fullname: "yavuz özbay", age :39, role: "admin"},
    {id :"2",fullname: "yavuz", age :3, role: "ad"},
    {id :"3",fullname: "yavuz özb", age :9, role: "min"}

]

app.get('/users', (req, res)=>{
    return res.status(301).json({message: "Moved Permanently!"});
})

app.get('/', (req, res)=>{
    return res.status(200).json(users);
})

app.get('/admin/:key', (req, res)=> {
    const key = req.params.key;
    users.forEach((user)=>{
        if(key=== user.id){
            if(user.role!=='admin'){
                return res.status(403).json({message:"Forbidden !"});
            }
        }
    })
    return res.status(200).json('success!')
})

app.post('/create', (req, res)=>{
    const { fullname, age, role}= req.body;
    if(!(fullname && age && role)){
        return res.status(400).json({message:"Bad Request"});
    }
    const newUser = {
        fullname,
        age,
        role
    };
    users.push(newUser);
})

app.delete('/:id', (req, res)=>{
    const id = req.params.id;
    users =users.filter((user)=> user.id !== id);

    return res.json(users);
})

app.put('/user/:id', (req, res)=>{
    const id = req.params.id;
    const {fullname} = req.body;

    users.forEach((user)=> {
        if (user.id===id){
            user.fullname = fullname;
        }
    })
    return res.json(users);
})

const port = 5000;
app.listen(port, ()=> {
    console.log(`localhost:${port} is active!`)
})
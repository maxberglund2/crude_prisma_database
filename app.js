// modules and global variables
const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');
const url = require('url');
let selectedUser = undefined;

// Connection to Prisma DataBase
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
}

main()
  .then(async () => {
    await prisma.$disconnect()
})
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})

// Make the image upload with it's original name (no hash)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, (__dirname + '/img/')); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

app.use(express.static(__dirname));

// Routing for the app
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html');
});

app.get('/create', (req, res) => {
  res.sendFile(__dirname + '/html/create.html');
});

app.get('/edit', async (req, res) => {
  res.sendFile(__dirname + '/html/update.html');
  // Checks for parameter in the url called "user" and takes it's value
  const query = url.parse(req.url, true).query;
  selectedUser = await prisma.user.findUnique({
    where: {
        id: parseInt(query.user)
    }
})
});
app.get('/read', (req, res) => {
  res.sendFile(__dirname + '/html/read.html');
});

// takes data from "form" and puts it in DB, then redirects to read.thml
app.post('/createUser', upload.single('image'), async (req, res) => {
  const newUserData = req.body;
  const image = req.file ? req.file.filename : '';
  try {
    const newUser = await prisma.user.create({
      data: {
        name: newUserData['usernameInput'],
        email: newUserData['emailInput'],
        phone: newUserData['numberInput'],
        image: image,
      },
    });

  } catch (error) {
    console.error('Error (create):', error);
    res.status(500).send('Error (create)');
  }
  res.redirect('/read');
});


// takes data from "form" and updates it in DB, then redirects to read.thml
app.post('/updateUser', upload.single('image'), async (req, res) => {
  const updatedUserData = req.body;
  const image = req.file ? req.file.filename : '';

  const query = url.parse(req.url, true).query;

  try {
    const updatedUser = await prisma.user.update({ 
      where: {
        id: selectedUser.id
    },
      data: {
        name: updatedUserData['usernameInput'],
        email: updatedUserData['emailInput'],
        phone: updatedUserData['numberInput'],
        image: image,
      },
    });
    res.redirect('/read');
  } catch (error) {
    console.error('Error (update):', error);
    res.status(500).send('Error (update)');
  }
});

// when displayUsers is fetched then it will send a response in form of a json file that includes all users, converted from DB data
app.get('/displayUsers', async (req,res)=>{
  const users = await prisma.user.findMany();
  res.json(users);
 });

// when selectedUser is fetched then it will send a response in form of a json file that includes a single user (selectedUser), converted from DB data
app.get('/selectedUser',(req,res)=>{
res.json(selectedUser);
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}/`);
});
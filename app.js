const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();


mongoose.connect('YOUR_CONNECTION_STRING', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
    } else {
      console.log('Connected to MongoDB successfully.');
    }
  });
  

const Schema = mongoose.Schema;
const formDataSchema = new Schema({
  name: String,
  email: String,
  message: String
});
const FormData = mongoose.model('FormData', formDataSchema);


app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.ejs');
});

app.post('/submit', (req, res) => {

  const formData = new FormData({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });

 
  formData.save((err) => {
    if (err) {
      console.error(err);
      res.send('Error saving form data.');
    } else {
      res.send('Form data saved successfully.');
    }
  });
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// mongoose.connect('YOUR_CONNECTION_STRING', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
//   if (err) {
//     console.error('Error connecting to MongoDB:', err);
//   } else {
//     console.log('Connected to MongoDB successfully.');
//   }
// });

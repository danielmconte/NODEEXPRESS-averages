const express = require('express');
const ExpressError = require('./expressError');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.get('/', function(req, res) {
    return res.send('Hello World!');
  });

app.get('/mean', function(req, res) {
    if(!req.query.nums){
        throw new ExpressError('Dude, no numbers.', 400)
    }
    const { nums } = req.query;
    let arr = nums.split(",")
    count = 0;
    for(num of arr){
        numb = Number(num);
        if(isNaN(numb)){
            throw new ExpressError(`${num} is not a number, dude.`, 400);
        }
        count += numb;
    }
    mean = count/arr.length;

    return res.json({response: {operation: "mean", value: mean}});
  });

app.get('/median', function(req, res) {
    if(!req.query.nums){
        throw new ExpressError('Dude, no numbers.', 400)
    }
    const { nums } = req.query;
    let arr = nums.split(",")
    medi = Math.floor(arr.length / 2);
    median = Number(arr[medi])
    if(isNaN(median)){
        throw new ExpressError(`${arr[medi]} is not a number, dude.`, 400);
    }

    return res.json({response: {operation: "median", value: median}});
  });

app.get('/mode', function(req, res) {
    if(!req.query.nums){
        throw new ExpressError('Dude, no numbers.', 400)
    }
    const { nums } = req.query;
    let arr = nums.split(",")
    let count = {};
    let frequency= 0;
    let mostFrequent;
    for(num of arr){
        numb = Number(num);
        if(isNaN(num)){
            throw new ExpressError(`${num} is not a number, dude.`, 400);
        }
        if(count[num]){
            count[num] += 1    
        }else{
            count[num] = 1
        }
    }
    for(let key in count){
        if(count[key] > frequency){
            frequency = count[key];
            mostFrequent = key; 
        }
    }


    return res.json({response: {operation: "mode", value: mostFrequent}});
  });


  app.listen(3000, function() {
    console.log('Server started on port 3000.');
  });

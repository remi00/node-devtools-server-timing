

const app = require('express')();
const DevToolsProfiler = require('./index');


const fetchData = async () => new Promise((resolve) => {
  setTimeout(() => resolve(), Math.random() * 1000);
});


const makeFancyProcessing = async () => new Promise((resolve) => {
  setTimeout(() => resolve(), Math.random() * 1000);
});

app.get('/', async (req, res) => {
  const profiler = new DevToolsProfiler({ seconds: true });

  profiler.log('processing', 'Fancy Processing');
  await makeFancyProcessing(); 
  profiler.log('processing');
  
  profiler.log('fetchdata', 'Fetch the data');
  await fetchData(); 
  profiler.log('fetchdata');

  res.set('Server-Timing', profiler)
  res.send('Some fancy hard heavy nice content is now ready here!');
});


app.listen(3000, () => {
  console.log('App started at 3000');
});

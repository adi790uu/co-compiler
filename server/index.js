const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { compileCpp, compileJava, compileC, compilePy } = require('./Compile');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Working');
});

app.post('/api/v1/compile', async (req, res) => {
  const { lang, userCode, userInput } = req.body;

  try {
    switch (lang) {
      case 'python':
        const pyResult = compilePy(userCode, userInput);
        res.status(200).json({ output: pyResult });
        break;
      case 'cpp':
        const cppResult = compileCpp(userCode, userInput);
        res.status(200).json({ output: cppResult });
        break;
      case 'java':
        const javaResult = compileJava(userCode, userInput);
        res.status(200).json({ output: javaResult });
        break;
      case 'c':
        const cResult = compileC(userCode, userInput);
        res.status(200).json({ output: cResult });
        break;
      default:
        return res.status(400).json({ error: 'Unsupported language.' });
    }
  } catch {
    res.status(500).json({ error: 'An error occurred during compilation.' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

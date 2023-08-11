import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Editor from '@monaco-editor/react';
import api from '../src/api';
import playButton from './play-button.png';
import clearButton from './clear.png';

function App() {
  const [userCode, setUserCode] = useState('');
  const [lang, setLang] = useState('c');
  const [theme, setTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(20);
  const [userInput, setUserInput] = useState('');
  const [userOutput, setUserOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const options = {
    fontSize: fontSize,
  };

  const compile = async () => {
    setLoading(true);
    const data = {
      userCode: userCode,
      lang: lang,
      userInput: userInput,
    };
    const response = await api.post('/compile', data);
    setUserOutput(response.data.output.programOutput);
    // console.log(response);
  };

  const clearOutput = () => {
    setUserOutput('');
  };

  return (
    <div className="App">
      <Navbar
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />
      <div className="main">
        <div className="left-container">
          <Editor
            className="editor"
            options={options}
            height="calc(100vh - 100px)"
            width="100%"
            theme={theme}
            language={lang}
            defaultLanguage="c"
            onChange={value => {
              setUserCode(value);
            }}
          />
        </div>
        <div className="right-container">
          <div className="buttons">
            <button className="run-btn" onClick={() => compile()}>
              <img src={playButton} className="image"></img>
            </button>
            <button
              onClick={() => {
                clearOutput();
              }}
              className="clear-btn"
            >
              <img src={clearButton} className="image"></img>
            </button>
          </div>
          <h4>Input:</h4>
          <div className="input-box">
            <textarea
              id="code-inp"
              onChange={e => setUserInput(e.target.value)}
            ></textarea>
          </div>
          <h4>Output:</h4>
          <div className="output-box">
            <pre className="output">
              {loading ? (
                <div className="boxinbox">
                  <div className="spinner2"></div>
                </div>
              ) : (
                userOutput
              )}
            </pre>
          </div>
          )
        </div>
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import Select from 'react-select';
import '../Styles/Navbar.css';

const Navbar = ({ lang, setLang, theme, setTheme, fontSize, setFontSize }) => {
  const languages = [
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
  ];
  const themes = [
    { value: 'vs-dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
  ];
  return (
    <div className="navbar">
      <h1>Co-compiler</h1>
      <Select
        id="select1"
        options={languages}
        value={lang}
        onChange={e => setLang(e.value)}
        placeholder={lang}
      />
      <Select
        id="select2"
        options={themes}
        value={theme}
        onChange={e => setTheme(e.value)}
        placeholder={theme}
      />
      <div className="inputFont">
        <label>Font Size</label>
        <input
          className="input"
          type="range"
          min="18"
          max="30"
          value={fontSize}
          step="2"
          onChange={e => {
            setFontSize(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;

import { useEffect, useState } from 'react';

const changeTheme = (e) => {
  const theme = process.env.PUBLIC_URL+"/styles/"+e.target.id+"vars.css";
  const themeLink = document.getElementById("stylesheet");
  themeLink.href = theme;
  const activeTheme = document.querySelector(".active-theme");
  activeTheme.classList.remove("active-theme");
  e.target.classList.add("active-theme");
}

function App() {
  const [result, setResult] = useState("0");
  useEffect(() => {
    const resultEle = document.querySelector(".result-div");
    if (result.length > 12) {
      resultEle.style.fontSize = "1.5rem";
    } else if (result.length > 8) {
      resultEle.style.fontSize = "2rem";
    }
    else {
      resultEle.style.fontSize = "2.5rem";
    }
    let formatted = new Intl.NumberFormat('en-US', { maximumFractionDigits: 8 }).format(result);
    if (formatted === "NaN" || result[result.length-1] === ".") {
      formatted = result;
    }
    resultEle.innerHTML = formatted;
  }, [result]);
  const handleClick = (e) => {
    if (e.target.id === "reset") {
      setResult("0");
    } else if (e.target.id === "del") {
      if (result.length === 1) {
        setResult("0");
      } else {
        setResult(result.slice(0, -1));
      }
    } else if (e.target.id === "equal") {
      setResult(eval(result)+"");
    } else if (result.length > 12) {
      alert("Max length exceeded ! ");
      return;
    }
    else if (result === "0") {
      setResult(e.target.id);
    } else if (e.target.id === "+" || e.target.id === "-" || e.target.id === "*" || e.target.id === "/" || e.target.id === ".") {
      if (result[result.length-1] === "+" || result[result.length-1] === "-" || result[result.length-1] === "*" || result[result.length-1] === "/" || result[result.length-1] === ".") {
        setResult(result.slice(0, -1) + e.target.id);
      } else {
        setResult(result + e.target.id);
      }
    }
    else {
      setResult(result + e.target.id);
    }
    console.log(e.target.id);
  }

  const buttonslist = [7,8,9,"del",4,5,6,"+",1,2,3,"-",".",0,"/","*","reset","="];
  const buttons = buttonslist.map((button) => {
    if (button === "=") {
      return <button onClick={handleClick} key={button} id={"equal"} className="equal-button">{button}</button>
    }
    return <button onClick={handleClick} key={button} id={button}>{button}</button>
  });

  return (
    <div className="App">
      <header>
        <h1>Calc</h1>
        <div className="theme-div">
          <label>Theme</label>
          <div className="change-theme-div">
            <p><span>1</span><span>2</span><span>3</span></p>
            <div className="indicator-div">
              <div className="inner-indicator">
                <div id="theme1" className="active-theme" onClick={changeTheme}></div>
                <div id="theme2" onClick={changeTheme}></div>
                <div id="theme3" onClick={changeTheme}></div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="screen">
        <div className="result-div">
          <span className="result">0</span>
        </div>
      </div>
      <div className="dial-pad">
        {buttons}
      </div>
      <div className='footer'>
        <p>Created By <a href='https://www.linkedin.com/in/ritin-tiwari'>@Ritin Tiwari</a></p>
      </div>
    </div>
  );
}

export default App;

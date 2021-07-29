import React, { useRef, useState } from "react";

const Screen = () => {
  const [state, setState] = useState("set");
  const [nav, setNav] = useState("클릭해서 시작하세요.");
  const [color, setColor] = useState("green");
  const [response, setResponse] = useState([]);
  let randomTime = useRef(null);
  let startTime = useRef();
  let endTime = useRef();

  const handleClick = () => {
    setNav("노락색이 나오면 클릭하세요!");
    if (state === "set") {
      setState("ready");
      randomTime.current = setTimeout(() => {
        setState("action");
        setColor("yellow");
        setNav("클릭하세요!");
        startTime.current = new Date();
      }, Math.floor(Math.random() * (2000 - 1000) + 1000));
    } else if (state === "ready") {
      clearTimeout(randomTime.current);
      setState("error");
      setColor("red");
      setNav("너무빨라요");
      setResponse([...response, "땡"]);
    } else if (state === "action") {
      setState("correct");
      setColor("blue");
      setNav("나이스!");
      endTime.current = new Date();
      if ((endTime.current - startTime.current) / 1000 < 0.2) {
        setResponse([...response, "밑장빼기냐?"]);
      } else {
        setResponse([
          ...response,
          ((endTime.current - startTime.current) / 1000).toFixed(2),
        ]);
      }
    } else {
      setState("ready");
      setColor("green");
      randomTime.current = setTimeout(() => {
        setState("action");
        setColor("yellow");
        setNav("클릭하세요!");
        startTime.current = new Date();
      }, Math.floor(Math.random() * (2000 - 1000) + 1000));
    }
  };
  const resetRes = () => {
    setResponse([]);
  };
  return (
    <>
      <div className={`nav ${nav}`}>{nav}</div>
      <div className={`color ${color}`} onClick={handleClick}></div>
      <ul>
        {response.map((res) => {
          return (
            <li>
              {res}
              {typeof Number(res) === "number" && !isNaN(res) ? "초" : null}
            </li>
          );
        })}
      </ul>
      <button onClick={resetRes}>다시 시작</button>
    </>
  );
};

export default Screen;

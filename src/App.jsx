import { useState, useCallback, useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(true);
  const [characterAllow, setCharacterAllow] = useState(true);
  const [password, setPassword] = useState();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllow) str += "01234556789";
    if (characterAllow) str += "!@#$%^&*()_+{}:',.";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    console.log(pass);
    setPassword(pass);
  }, [length, numberAllow, characterAllow, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllow, characterAllow, passwordGenerator]);

  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-full max-w-md mx-auto  bg-slate-900  text-white px-4  my-8 rounded-lg">
        <h1 className="text-3xl grid place-content-center my-3">
          Password Generator
        </h1>
        <div className="flex mb-2">
          <input
            className="my-3 ml-2 w-full py-2 rounded-lg text-black"
            type="text"
            value={password}
            placeholder="passsword"
            readOnly
          />
          <button
            onClick={copyPassword}
            className="my-3  bg-blue-800 text-white ml-2  rounded-md px-3 py-0 "
          >
            Copy
          </button>
        </div>

        <div className="flex ">
          <div className="mx-2">
            <input
              type="range"
              min={5}
              max={20}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>

          <div className="mx-3">
            <input
              type="checkbox"
              defaultChecked={numberAllow}
              onChange={() => {
                setNumberAllow((prev) => !prev);
              }}
            />
            <label>Number</label>
          </div>
          <div className="mx-3">
            <input
              type="checkbox"
              defaultChecked={characterAllow}
              onChange={() => {
                setCharacterAllow((prev) => !prev);
              }}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

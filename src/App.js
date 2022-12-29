import { useRef, memo, useEffect } from "react";
import { useReactive } from "./reactivity/hook";

const logs = document.getElementById("logs");
function useLogRenderCount(name) {
  const renderCount = useRef(0);
  renderCount.current++;
  const p = document.createElement("p");
  p.textContent = `${name} render ${renderCount.current}`;
  logs.append(p);
  logs.scrollTo({top: -100000, behavior: "smooth"});
}

function useFlashingBorder(ref) {
  useEffect(() => {
    requestAnimationFrame(() => {
      ref.current.classList.add("rendered");
      requestAnimationFrame(() => {
        ref.current.classList.remove("rendered");
      });
    });
  });
}

const Child = memo(function Child({ state: parentState, name }) {
  const state = useReactive(parentState);
  const root = useRef(null);
  useLogRenderCount(`${name} Child`);
  useFlashingBorder(root);
  
  return <div className="border rendered" style={{margin: "5px", padding: "5px"}} ref={root}>
    {name}: {state[name].toFixed(5)}
    <br/>
    <button onClick={() => state.left = Math.random()}>Render left</button>{" "}
    <button onClick={() => state.right = Math.random()}>Render right</button>
  </div>
});

function App() {
  const state = useReactive({ toggle: true, left: 0, right: 0 });
  const root = useRef(null);
  useLogRenderCount(`App`);
  useFlashingBorder(root);

  return (
    <div className="border rendered" ref={root}>
      <div onClick={() => state.toggle = !state.toggle}>{state.toggle ? "Render App" : "Rerender App"}</div>
      <div style={{display: "flex"}}>
        <Child state={state} name="left"/>
        <Child state={state} name="right"/>
      </div>
    </div>
  );
}

export default App;

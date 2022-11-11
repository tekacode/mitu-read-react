import logo from './logo.svg';
import './App.css';
import { Stories } from "./Stories";

const App = () => {

  let index = Math.floor(Math.random() * Stories.length)
  let story = Stories[index]
  let storyArray = story.split(" ")

  function* getStory() {
    for (let i = 0; i < storyArray.length; i++) {
      yield storyArray[i];
    }
  }

  function pageScroll() {
    window.scrollBy(0, 1);
    let scrolldelay = setTimeout(pageScroll, 10);
  }
  pageScroll()

  const runReading = () => {
    const p1 = document.getElementById("p1")
    let speedDom = document.getElementById("speed")
    let label1 = document.getElementById("label1")
    let readNewStory = document.getElementById("read-new-story")
    let speed = parseInt(speedDom.value)
    let counter = 0;
    let result;
    let sto = getStory();

    p1.style.fontSize = "50px"

    if (isNaN(speed)) {
      speed = 500
    }
    label1.style.visibility = "hidden"
    readNewStory.style.visibility = "hidden"
    speedDom.style.visibility = "hidden"
    // readAgain.style.visibility = "hidden"

    const interval = setInterval(() => {
      result = sto.next();
      console.log(result)
      result.done === false ? p1.innerHTML += " " + result.value : clearInterval(interval);
      counter++
      if (counter == storyArray.length) {
        p1.innerHTML = "Tell me about the story...<br><br>"
        label1.style.visibility = "visible"
        readNewStory.style.visibility = "visible"
        speedDom.style.visibility = "visible"
        // readAgain.style.visibility = "visible"
      }
    }, speed);
  }

  return (
    <div className="App">
      <p id="p1" align="left"></p>
      <label id="label1">Speed:</label>
      <input type="text" id="speed" />
      <br />
      <br />
      <button onClick={runReading} id="read-new-story">Read New Story</button>
    </div>
  );
}

export default App;

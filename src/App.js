import "./App.css";
import InputComponent from "./component/InputComponent";
import NavbarComponent from "./component/NavbarComponent";

function App() {
  // document.title("Feedback Generator");
  return (
    <div className="App">
      <NavbarComponent />
      <InputComponent></InputComponent>
    </div>
  );
}

export default App;

import "./App.css";
import FooterComponent from "./component/FooterComponent";
import InputComponent from "./component/InputComponent";
import NavbarComponent from "./component/NavbarComponent";
function App() {
  // document.title("Feedback Generator");
  return (
    <div className="app">
      <NavbarComponent />
      <div
        className="App"
        style={{
          backgroundSize: "cover",
          height: "100vh",
          color: "#000000",
        }}
      >
        <InputComponent></InputComponent>
      </div>

      <FooterComponent></FooterComponent>
    </div>
  );
}

export default App;

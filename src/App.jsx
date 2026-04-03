import "./App.css";
import FooterComponent from "./component/FooterComponent";
import InputComponent from "./component/InputComponent";
import NavbarComponent from "./component/NavbarComponent";

function App() {
  return (
    <div className="app">
      <NavbarComponent />
      <div
        className="App"
        style={{
          backgroundSize: "cover",
          minHeight: "calc(100vh - 64px)",
          paddingBottom: "70px",
          color: "#000000",
        }}
      >
        <InputComponent></InputComponent>
        <FooterComponent />
      </div>
    </div>
  );
}

export default App;

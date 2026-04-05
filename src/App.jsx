import { useState, useCallback } from "react";
import FooterComponent from "./component/FooterComponent";
import InputComponent from "./component/InputComponent";
import NavbarComponent from "./component/NavbarComponent";

function App() {
  const [masterDataKey, setMasterDataKey] = useState(0);
  const refreshMasterData = useCallback(
    () => setMasterDataKey((k) => k + 1),
    [],
  );

  return (
    <div className="app">
      <NavbarComponent onSettingsSaved={refreshMasterData} />
      <div
        className="App"
        style={{
          backgroundSize: "cover",
          minHeight: "calc(100vh - 64px)",
          paddingBottom: "70px",
          color: "#000000",
        }}
      >
        <InputComponent key={masterDataKey} />
      </div>
      <FooterComponent />
    </div>
  );
}

export default App;

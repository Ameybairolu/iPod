import WheelContainer from "./UI/WheelContainer";
import DisplayProvider from "./Store/display-provider";

function App() {

  // This file is important mainly to render content and also provide "context" to every child component.

  return (
    <DisplayProvider>
      <WheelContainer />
    </DisplayProvider>
  );
}

export default App;

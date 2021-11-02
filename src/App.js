import WheelContainer from "./UI/WheelContainer";
import DisplayProvider from "./Store/display-provider";

function App() {


  return (
    <DisplayProvider>
      <WheelContainer />
    </DisplayProvider>
  );
}

export default App;

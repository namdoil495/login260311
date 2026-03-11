import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./Login";
function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_KEY}>
      <div className="App">aaa</div>
      <Login />
    </GoogleOAuthProvider>
  );
}

export default App;

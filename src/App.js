import './App.css';
import Header from "components/commons/Header";
import Banner from "components/commons/Banner";
import Welcome from "./components/commons/Welcome";
import Section from "./components/commons/Section";

function App() {
    return (
        <div className="App">
            <Header/>
            <main>
                <Banner/>
                <Welcome/>
                <Section/>
            </main>
        </div>
    );
}

export default App;

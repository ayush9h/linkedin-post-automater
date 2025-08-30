import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Timeline from './components/Timeline';
import Features from './components/Features';
function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div>
        
        <Landing />
        <Features/>
      </div>
    </div>
  );
}


export default App;

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Timeline from './components/Timeline';
function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div>
        
        <Landing />


        <Timeline/>
    
      </div>
    </div>
  );
}


export default App;

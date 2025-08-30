import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Timeline from "../components/Timeline";

export default function ContentGeneration() {
  return (
    <>
      <div className="flex flex-col min-h-screen">

        <Navbar />

        <div className="mt-24 flex-grow max-w-7xl mx-auto w-full">
          <Timeline />
        </div>

        <Footer />
      </div>
    </>
  );
}

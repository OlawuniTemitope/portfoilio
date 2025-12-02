import { Dock, Navbar, Welcome } from "#components";
import gsap from "gsap";

import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable)

function App () {
  return (
   <main>
    <Navbar/>
    <Welcome/>
    <Dock/>
   </main>
  )
};

export default App;
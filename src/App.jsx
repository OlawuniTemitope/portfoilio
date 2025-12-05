import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import { Dock, Navbar, Welcome } from "#components";
import { Contact, Finder, ImageWindowContent, Resume, Safari, Terminal, Text } from "#windows";

gsap.registerPlugin(Draggable)

function App () {
  return (
   <main>
    <Navbar/>
    <Welcome/>
    <Dock/>
    <Terminal/>
    <Safari/>
    <Resume/>
    <Finder/>
    <Text/>
    <ImageWindowContent/>
    <Contact/>
   </main>
  )
};

export default App;
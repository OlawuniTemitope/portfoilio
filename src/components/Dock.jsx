import React, { useRef } from 'react'


import { dockApps } from '#constants/index.js'
import { Tooltip } from 'react-tooltip'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import useWindowStore from '#store/window.js'

const Dock = () => {
  const {openWindow, closeWindow, windows} = useWindowStore()
  const dockRef = useRef(null)
  // console.log(dockRef) 
  useGSAP(()=>{
    const dock = dockRef.current;
    if(!dock) return;

    const icons = dock.querySelectorAll(".dock-icon");
    const animateIcons = (mouseX) => {
      const {left:dockLeft} = dock.getBoundingClientRect()
      icons.forEach((icon)=>{
        const {left: iconLeft, width} = icon.getBoundingClientRect();
        const iconCenter = iconLeft - dockLeft + width/2
        const mouseDistance = Math.abs(mouseX -iconCenter);
        const intensity = Math.exp(-(mouseDistance ** 2.5)/20000);
        // console.log(mouseX, dockLeft, iconLeft,iconCenter,mouseDistance,intensity,width)
        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power1.out"
        })
      })
    }
    const handleMouseMove = (e) =>{
      const {left:mouseLeft, top, down, right} = dock.getBoundingClientRect();
      // console.log(mouseLeft, e.clientX,top, down, right, right-mouseLeft)
      animateIcons(e.clientX - mouseLeft)
    }

    const resetIcons = () => icons.forEach((icon) =>gsap.to(icon,{
      scale:1,
      y:0,
      duration:0.3,
      ease:"power1.out"
    }));
    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);
    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons)
    }
  },[])
  const toggleApp = (app) =>{
    if(!app.canOpen) return;

    const window = windows[app.id];

    if(window.isOpen){
      closeWindow(app.id);
    } else {
      openWindow(app.id);
    }
    console.log(windows)
  }
  return (
    <section id="dock">
      <div ref={dockRef} className='dock-container'>
        {dockApps.map(({id, name, icon, canOpen}) =>(
          <div key={id} className='relative flex justify-center'>
            <button 
            type='button'
            className='dock-icon'
            aria-label={name}
            data-tooltip-id="dock-tooltip"      
            data-tooltip-content={name}
            data-tooltip-delay-show= {150}
            disabled={!canOpen}
            onClick={()=>toggleApp({id, canOpen})}
            >
              <img 
              src={`/images/${icon}`}
               alt={name} 
              loading='lazy'
              className={canOpen ? "" : "opacity-60"}/>
            </button>
          </div>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="tooltip"/>
      </div>
    </section>
  )
}

export default Dock
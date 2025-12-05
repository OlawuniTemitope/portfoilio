import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'

const FONT_WEIGHTS = {
    title: {min: 400, max: 900, default: 400},
    subtitle: {min: 100, max: 400, default: 100}
}

const renderText = (text, className, baseWeight = 400) => {
    return [...text].map((char, i) => (
        //  console.log(char)
            <span 
            key={i}
             className={className}
             style={{fontVariationSettings: `'wght' ${baseWeight}` }}
             >
                {char === " " ? "\u00A0" : char }
             </span>
    ))
}

const setupTextHover = (container, type)=>{
    if (!container) return;
    // console.log(container)

const letters = container.querySelectorAll('span');

const {min, max, default: base} = FONT_WEIGHTS[type];
console.log(max, min)

const animateletter = (letter, weight, duration = 0.25)=>{
    // console.log(weight)
    return gsap.to(letter, {
        duration, 
        ease:'power2.out', 
        fontVariationSettings: `'wght' ${weight}`
    })
};

// console.log(letters)
const handleMouseMove = (e) =>{
    
    const {left} = container.getBoundingClientRect();
    const mouseX = e.clientX - left;


    letters.forEach((letter) =>{

        const {left: l, width: w} = letter.getBoundingClientRect();
        const distance = Math.abs(mouseX - (l - left + w/2));
        const intensity = Math.exp(-(distance ** 2)/2000);

        animateletter(letter, min + (max - min) * intensity)
    })
}
const handleMouseLeave = ()=>
    letters.forEach((letter)=>animateletter(letter, base, 0.3))

container.addEventListener("mousemove", handleMouseMove)

container.addEventListener("mouseleave", handleMouseLeave)

return () =>{
    container.removeEventListener("mousemove", handleMouseMove)
    container.removeEventListener("mouseleave", handleMouseLeave)
}
};

const Welcome = () => {
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    console.log(titleRef.current, subtitleRef.current)
    useGSAP(()=>{
      const titleCleanup =  setupTextHover(titleRef.current, "title");
      const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle")
        return () => {
            subtitleCleanup();
            titleCleanup();
        }
    },[])
  return (
    <section id='welcome'>
        <p ref={subtitleRef}>
            {renderText("Hey, I'm Temitope! Welcome to my ",
                 "text-3xl font-georama", 100)} 
        </p>
        <h1 ref={titleRef} className='mt-7'>
          {renderText("portfolio", "text-9xl italic font-georama")}
        </h1>
        <div className='small-screen'>
            <p>
                This Portfolio is designed for 
            </p>
        </div>
    </section>
  )
}

export default Welcome
import dynamic from 'next/dynamic';
import { useEffect } from "react";
import gsap from "gsap/dist/gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

export default function useLocoScroll(start) {

  console.log(ScrollTrigger)
  console.log('useLocoScroll run')
  useEffect(() => {
    if (!start) return;
    let locoScroll = null;

    const scrollEl = document.querySelector("#main-container-all");

    import("locomotive-scroll").then(locomotiveModule => {
      let locoScroll = new locomotiveModule.default({
        el: scrollEl,
        smooth: true,
        multiplier: 1,
        class: "is-reveal",
      })
      console.log(locoScroll)
      locoScroll.on("scroll", () => {
        ScrollTrigger.update();
       
      });
    })
 
    ScrollTrigger.scrollerProxy(scrollEl, {
      scrollTop(value) {
        if (locoScroll) {
          return arguments.length
            ? locoScroll.scrollTo(value, 0, 0)
            : locoScroll.scroll.instance.scroll.y;
        }
        return null;
      },
      scrollLeft(value) {
        if (locoScroll) {
          return arguments.length
            ? locoScroll.scrollTo(value, 0, 0)
            : locoScroll.scroll.instance.scroll.x;
        }
        return null;
      },
    });

    const lsUpdate = () => {
      if (locoScroll) {
        locoScroll.update();
      }
    };

    ScrollTrigger.addEventListener("refresh", lsUpdate);
    ScrollTrigger.refresh();

    return () => {
      if (locoScroll) {
        ScrollTrigger.removeEventListener("refresh", lsUpdate);
        locoScroll.destroy();
        locoScroll = null;
        console.log("Kill", locoScroll);
      }
    };
  }, [start]);
}
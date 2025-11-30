import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollRevealSection = ({ children, direction = 'up', delay = 0, className = '' }) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const directions = {
            up: { y: 100, x: 0 },
            down: { y: -100, x: 0 },
            left: { y: 0, x: 100 },
            right: { y: 0, x: -100 },
        };

        const { x, y } = directions[direction] || directions.up;

        gsap.fromTo(
            element,
            {
                opacity: 0,
                x,
                y,
            },
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 1,
                delay,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    end: 'top 60%',
                    toggleActions: 'play none none reverse',
                },
            }
        );
    }, [direction, delay]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
};

export default ScrollRevealSection;

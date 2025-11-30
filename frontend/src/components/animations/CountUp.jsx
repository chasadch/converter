import React, { useEffect, useRef, useState } from 'react';

const CountUp = ({ end, duration = 2000, className = '', prefix = '', suffix = '' }) => {
    const countRef = useRef(null);
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true);
                        const startTime = Date.now();
                        const startValue = 0;
                        const endValue = end;

                        const animate = () => {
                            const now = Date.now();
                            const progress = Math.min((now - startTime) / duration, 1);

                            // Easing function (easeOutExpo)
                            const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                            const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutExpo);

                            setCount(currentValue);

                            if (progress < 1) {
                                requestAnimationFrame(animate);
                            } else {
                                setCount(endValue);
                            }
                        };

                        animate();
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, [end, duration, hasAnimated]);

    return (
        <span ref={countRef} className={className}>
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
};

export default CountUp;

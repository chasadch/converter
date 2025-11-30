import React, { useRef, useEffect } from 'react';

const MorphButton = ({ children, onClick, className = '' }) => {
    const buttonRef = useRef(null);

    useEffect(() => {
        if (!buttonRef.current) return;

        // Simplified burst effect using CSS
        const handleClick = (e) => {
            const button = buttonRef.current;
            const circle = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
            circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
            circle.classList.add('ripple');

            const ripple = button.getElementsByClassName('ripple')[0];
            if (ripple) {
                ripple.remove();
            }

            button.appendChild(circle);

            if (onClick) onClick(e);
        };

        const button = buttonRef.current;
        button.addEventListener('click', handleClick);

        return () => {
            button.removeEventListener('click', handleClick);
        };
    }, [onClick]);

    return (
        <button
            ref={buttonRef}
            className={`relative overflow-hidden ${className}`}
            style={{ position: 'relative' }}
        >
            {children}
            <style jsx>{`
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple 600ms ease-out;
                    pointer-events: none;
                }

                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `}</style>
        </button>
    );
};

export default MorphButton;

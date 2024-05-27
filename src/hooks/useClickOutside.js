'use client'
import { useEffect } from 'react';

const useClickOutside = (refs, handler) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!refs.some(ref => ref.current && ref.current.contains(event.target))) {
                handler();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [refs, handler]);
};

export default useClickOutside;

export const getDynamicFontSize = (val: string | number, isQuiz = false) => {
    const len = String(val).length;
    if (isQuiz) {
        if (len >= 6) return 'text-[clamp(0.8rem,2vw,1.5rem)]';
        if (len >= 4) return 'text-[clamp(1rem,3vw,2.5rem)]';
        if (len >= 3) return 'text-[clamp(1.2rem,4vw,3rem)]';
        return 'text-[clamp(2rem,6vw,5.5rem)]';
    }
    if (len >= 6) return 'text-[clamp(0.8rem,2vw,2rem)]';
    if (len >= 4) return 'text-[clamp(1.2rem,3vw,3rem)]';
    if (len >= 3) return 'text-[clamp(1.5rem,4vw,4rem)]';
    return 'text-[clamp(2rem,5vw,5.5rem)]';
};

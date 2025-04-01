import { useState, useEffect } from "react";
import Banner from "./Banner";
import Banner2 from "./Banner_2";

const slides = [Banner, Banner2];

const Slideshow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, []);

    const CurrentComponent = slides[currentSlide];

    return (
        <div className="p-0.5 bg-gradient-to-r from-yellow-800 via-yellow-600 to-yellow-400 rounded-xl">
            <div className="relative aspect-[2.35/1] rounded-lg overflow-hidden">
                {slides.map((SlideComponent, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <SlideComponent />
                    </div>
                ))}

                {/* Navigation dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                index === currentSlide
                                    ? "bg-yellow-400 w-4"
                                    : "bg-white/50 hover:bg-white/75"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Slideshow;
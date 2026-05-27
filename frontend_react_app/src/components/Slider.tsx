import React, { useEffect, useRef, useState, useCallback } from "react";
import "../styles/Slider.css";

export interface SlideItem {
  origin: string;
  destination: string;
  destLabel: string;
  title: string;
  price: number;
  currency?: string;
  badges: string[];
  bgImage: string;
}

const DEFAULT_SLIDES: SlideItem[] = [
  {
    origin: "EZE",
    destination: "CDG",
    destLabel: "Buenos Aires → París, Francia",
    title: "La ciudad luz te espera",
    price: 749,
    currency: "USD",
    badges: ["Directo", "13h 50m", "Clase Turista"],
    bgImage:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=80&auto=format&fit=crop",
  },
  {
    origin: "EZE",
    destination: "DXB",
    destLabel: "Buenos Aires → Dubái, EAU",
    title: "El lujo del desierto moderno",
    price: 890,
    currency: "USD",
    badges: ["1 escala", "20h 10m", "Business"],
    bgImage:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80&auto=format&fit=crop",
  },
  {
    origin: "EZE",
    destination: "NRT",
    destLabel: "Buenos Aires → Tokio, Japón",
    title: "Tradición y futuro en una sola ciudad",
    price: 1120,
    currency: "USD",
    badges: ["1 escala", "26h 30m", "Clase Turista"],
    bgImage:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=900&q=80&auto=format&fit=crop",
  },
  {
    origin: "EZE",
    destination: "JFK",
    destLabel: "Buenos Aires → Nueva York, EE.UU.",
    title: "La gran manzana en tu horizonte",
    price: 520,
    currency: "USD",
    badges: ["Directo", "11h 40m", "Clase Turista"],
    bgImage:
      "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=900&q=80&auto=format&fit=crop",
  },
  {
    origin: "EZE",
    destination: "SYD",
    destLabel: "Buenos Aires → Sídney, Australia",
    title: "El otro lado del mundo, al alcance",
    price: 1340,
    currency: "USD",
    badges: ["2 escalas", "31h 15m", "Business"],
    bgImage:
      "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=900&q=80&auto=format&fit=crop",
  },
];

const AUTOPLAY_DELAY = 4500;

interface SliderProps {
  slides?: SlideItem[];
  autoplay?: boolean;
  delay?: number;
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

const Slider: React.FC<SliderProps> = ({
  slides = DEFAULT_SLIDES,
  autoplay: initialAutoplay = true,
  delay = AUTOPLAY_DELAY,
}) => {
  const total = slides.length;
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(initialAutoplay);
  const [progress, setProgress] = useState(0);

  const elapsedRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const dragStartX = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (n: number) => {
      const next = Math.max(0, Math.min(total - 1, n));
      setCurrent(next);
      elapsedRef.current = 0;
      lastTsRef.current = null;
      setProgress(0);
    },
    [total]
  );

  // Autoplay loop
  useEffect(() => {
    const tick = (ts: number) => {
      if (playing) {
        if (lastTsRef.current === null) lastTsRef.current = ts;
        elapsedRef.current += ts - lastTsRef.current;
        lastTsRef.current = ts;
        const pct = Math.min((elapsedRef.current / delay) * 100, 100);
        setProgress(pct);
        if (elapsedRef.current >= delay) {
          setCurrent((prev) => (prev + 1) % total);
          elapsedRef.current = 0;
          lastTsRef.current = null;
          setProgress(0);
        }
      } else {
        lastTsRef.current = null;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, delay, total]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(current - 1);
      if (e.key === "ArrowRight") goTo(current + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, goTo]);

  // Drag handlers
  const onDragStart = (clientX: number) => {
    dragStartX.current = clientX;
    if (trackRef.current) trackRef.current.style.transition = "none";
  };

  const onDragEnd = (clientX: number) => {
    if (dragStartX.current === null) return;
    const dx = clientX - dragStartX.current;
    dragStartX.current = null;
    if (trackRef.current) trackRef.current.style.transition = "";
    if (dx < -50 && current < total - 1) goTo(current + 1);
    else if (dx > 50 && current > 0) goTo(current - 1);
    else goTo(current);
  };

  const togglePlay = () => {
    setPlaying((p) => {
      if (p) setProgress(0);
      return !p;
    });
    elapsedRef.current = 0;
    lastTsRef.current = null;
  };

  return (
    <div className="slider-wrapper">
      {/* Progress bar */}
      <div className="slider-progress">
        <div
          className="slider-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Viewport */}
      <div
        className="slider-viewport"
        onMouseDown={(e) => onDragStart(e.clientX)}
        onMouseUp={(e) => onDragEnd(e.clientX)}
        onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
        onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
      >
        <div
          ref={trackRef}
          className="slider-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div className="slide" key={i} aria-hidden={i !== current}>
              <div
                className="slide-bg"
                style={{ backgroundImage: `url('${slide.bgImage}')` }}
              />
              <div className="slide-overlay" />
              <div className="slide-content">
                <div className="slide-route">
                  <span className="city-code">{slide.origin}</span>
                  <div className="route-line">
                    <div className="route-dash" />
                    <span className="route-plane" aria-hidden="true">✈</span>
                    <div className="route-dash" />
                  </div>
                  <span className="city-code">{slide.destination}</span>
                </div>
                <p className="slide-dest">{slide.destLabel}</p>
                <h3 className="slide-title">{slide.title}</h3>
                <div className="slide-footer">
                  <div>
                    <div className="price-from">Desde</div>
                    <div className="price-value">
                      <span className="price-currency">
                        {slide.currency ?? "USD"}{" "}
                      </span>
                      {slide.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="badge-row">
                    {slide.badges.map((b, j) => (
                      <span className="badge" key={j}>
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="slider-controls">
        <div className="slider-left">
          <div className="slider-dots" role="tablist" aria-label="Slides">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`dot${i === current ? " active" : ""}`}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === current}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <span className="slide-count">
            {pad(current + 1)} / {pad(total)}
          </span>
        </div>

        <div className="slider-nav">
          <button
            className="play-btn"
            onClick={togglePlay}
            aria-label={playing ? "Pausar autoplay" : "Iniciar autoplay"}
          >
            {playing ? "⏸" : "▶"}
          </button>
          <button
            className="nav-btn"
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            aria-label="Slide anterior"
          >
            ←
          </button>
          <button
            className="nav-btn"
            onClick={() => goTo(current + 1)}
            disabled={current === total - 1}
            aria-label="Siguiente slide"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider;
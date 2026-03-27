import { useEffect, useRef, useState } from "react"

// ─── CHAOS IMAGES ────────────────────────────────────────────────
const processImages = [
  "/overwhelm/img (1).jpeg",
  "/overwhelm/img (2).jpeg",
  "/overwhelm/img (3).jpeg",
  "/overwhelm/img (4).jpeg",
  "/overwhelm/img (5).jpeg",
  "/overwhelm/img (6).jpeg",
  "/overwhelm/img (7).jpeg",
  "/overwhelm/img (8).jpeg",
  "/overwhelm/img (9).jpeg",
  "/overwhelm/img (10).jpeg",
  "/overwhelm/img (11).jpeg",
  "/overwhelm/img (12).jpeg",
  "/overwhelm/img (13).jpeg",
  "/overwhelm/img (14).jpeg",
  "/overwhelm/img (15).jpeg",
  "/overwhelm/img (16).jpeg",
  "/overwhelm/img (17).jpeg",
  "/overwhelm/img (18).jpeg",
  "/overwhelm/img (19).jpeg",
  "/overwhelm/img (20).jpeg",
  "/overwhelm/img (21).jpeg",
  "/overwhelm/img (22).jpeg",
  "/overwhelm/img (23).jpeg",
  "/overwhelm/img (24).jpeg",
  "/overwhelm/img (25).jpeg",
]

// ─── FINAL 4 IMAGES ──────────────────────────────────────────────
const finalImages = [
  "/overwhelm/final/3.jpeg",
  "/overwhelm/final/4.jpeg",
  "/overwhelm/final/5.jpeg",
  "/overwhelm/final/6.jpeg",
]
// ─────────────────────────────────────────────────────────────────

const rand    = (min, max) => Math.random() * (max - min) + min
const randInt = (min, max) => Math.floor(rand(min, max))

export default function OverwhelmMode() {
  const ref          = useRef(null)
  const runIdRef = useRef(0)
  const elementsRef  = useRef([])
  const timeoutsRef  = useRef([])
  const [phase, setPhase] = useState("idle")

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting)
          e.target.querySelectorAll(".fade-up").forEach(el => el.classList.add("visible"))
      })
    }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const clearAll = () => {
    timeoutsRef.current.forEach(t => clearTimeout(t))
    timeoutsRef.current = []

    elementsRef.current.forEach(el => {
      if (el && el.parentNode) el.parentNode.removeChild(el)
    })
    elementsRef.current = []
  }

  const triggerChaos = () => {
    
    if (timeoutsRef.current.length > 0) return

    runIdRef.current += 1        // 🚨 FIRST invalidate
    const currentRun = runIdRef.current

    clearAll()         
    timeoutsRef.current = []          // THEN clean
    setPhase("chaos")

    const shuffled = [...processImages].sort(() => Math.random() - 0.5)

    shuffled.forEach((src, i) => {
      const t = setTimeout(() => {
        if (runIdRef.current !== currentRun) return
        const el     = document.createElement("div")
        const w      = randInt(140, 260)
        const left   = rand(4, 78)
        const top    = rand(8, 72)
        const rotate = rand(-18, 18)

        Object.assign(el.style, {
          position:      "fixed",
          left:          `${left}vw`,
          top:           `${top}vh`,
          width:         `${w}px`,
          transform:     `rotate(${rotate}deg) scale(0.85)`,
          zIndex:        randInt(9100, 9300),
          opacity:       "0",
          transition:    "opacity 0.45s ease, transform 0.45s ease",
          borderRadius:  "10px",
          overflow:      "hidden",
          boxShadow:     "0 8px 32px rgba(0,0,0,0.18)",
          border:        "2px solid rgba(255,255,255,0.6)",
          pointerEvents: "none",
        })

        const img = document.createElement("img")
        img.src = src
        img.alt = ""
        Object.assign(img.style, {
          width:       "100%",
          display:     "block",
          objectFit:   "cover",
          aspectRatio: "4/3",
          userSelect:  "none",
        })

        el.appendChild(img)
        document.body.appendChild(el)
        elementsRef.current.push(el)

        requestAnimationFrame(() => requestAnimationFrame(() => {
          if (runIdRef.current !== currentRun) return
          if (!el || !el.isConnected) return
          el.style.opacity   = "1"
          el.style.transform = `rotate(${rotate}deg) scale(1)`
        }))
      }, i * 280)

      timeoutsRef.current.push(t)
    })

    const resolveDelay = shuffled.length * 280 + 2000

    const resolve = setTimeout(() => {
      if (runIdRef.current !== currentRun) return
      setPhase("resolving")

      elementsRef.current.forEach((el, i) => {
        const t = setTimeout(() => {
          if (runIdRef.current !== currentRun) return

          if (!el || !el.isConnected) return
          el.style.opacity = "0"
          el.style.transform  = el.style.transform.replace(/scale\([^)]+\)/, "scale(0.75)")
          el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
        }, i * 60)

        timeoutsRef.current.push(t) // ✅ THIS WAS MISSING
      })

      const done = setTimeout(() => {
        if (runIdRef.current !== currentRun) return
        setPhase("resolved")
      }, shuffled.length * 60 + 800)

      timeoutsRef.current.push(done)
    }, resolveDelay)

    timeoutsRef.current.push(resolve)
  }

  useEffect(() => () => clearAll(), [])

  return (
    <>
      <style>{`
        .overwhelm-resolved-layout {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: 1fr 1.6fr 1fr;
          align-items: center;
          gap: 24px;
          padding: 80px 4vw;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.5s ease;
        }
        .overwhelm-resolved-layout.visible {
          opacity: 1;
          pointer-events: all;
        }

        .resolved-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .resolved-img-wrap {
          border-radius: 14px;
          overflow: hidden;
          border: 1.5px solid var(--border);
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          opacity: 0;
          transition: opacity 0.65s cubic-bezier(0.16,1,0.3,1),
                      transform 0.65s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.3s ease,
                      border-color 0.3s ease;
        }
        .resolved-img-wrap:hover {
          box-shadow: 0 12px 40px rgba(10,133,140,0.16);
          border-color: var(--indigo);
        }
        .resolved-img-wrap img {
          width: 100%;
          display: block;
          object-fit: cover;
          aspect-ratio: 4/3;
        }

        .resolved-col-left .resolved-img-wrap {
          transform: translateX(-24px) scale(0.95);
        }
        .overwhelm-resolved-layout.visible .resolved-col-left .resolved-img-wrap {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        .resolved-col-right .resolved-img-wrap {
          transform: translateX(24px) scale(0.95);
        }
        .overwhelm-resolved-layout.visible .resolved-col-right .resolved-img-wrap {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        .resolved-center {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          padding: 0 20px;
        }

        @media (max-width: 900px) {
          .overwhelm-resolved-layout {
            position: relative;
            grid-template-columns: 1fr;
            padding: 60px 6vw;
            gap: 32px;
          }
          .resolved-col {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            gap: 12px;
          }
          .resolved-img-wrap { width: 45%; }
        }
      `}</style>

      <section
        id="overwhelm"
        className="overwhelm-section"
        ref={ref}
        style={{ position: "relative", minHeight: "100vh" }}
      >

        <div style={{
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          gap:           44,
          opacity:       phase === "resolved" ? 0 : 1,
          pointerEvents: phase === "resolved" ? "none" : "all",
          transition:    "opacity 0.5s ease",
          position:      "relative",
          zIndex:        2,
        }}>
          <div className="overwhelm-intro">
            <h2 className="fade-up">What Happens<br />Under Pressure?</h2>
            <p className="fade-up" style={{ transitionDelay: "0.1s" }}>
              Design doesn't happen in controlled conditions. It happens in complexity, ambiguity, and noise.
            </p>
          </div>

          <button
            className="stress-btn fade-up"
            style={{
              transitionDelay: "0.2s",
              opacity:         phase === "chaos" || phase === "resolving" ? 0.3 : 1,
              pointerEvents:   phase === "chaos" || phase === "resolving" ? "none" : "auto",
            }}
            onClick={triggerChaos}
          >
            {phase === "chaos"
              ? "System overloading..."
              : phase === "resolving"
              ? "Reorganising..."
              : "Stress Test the System →"}
          </button>
        </div>

        <div className={`overwhelm-resolved-layout ${phase === "resolved" ? "visible" : ""}`}>

          {/* LEFT: 2 images */}
          <div className="resolved-col resolved-col-left">
            {finalImages.slice(0, 2).map((src, i) => (
              <div
                key={i}
                className="resolved-img-wrap"
                style={{ transitionDelay: `${0.05 + i * 0.12}s` }}
              >
                <img src={src} alt="" />
              </div>
            ))}
          </div>

          <div className="resolved-center">
            <p className="resolution-text">
              Designing systems means working<br />within complexity.
            </p>
            <p className="resolution-sub">
              My work focuses on turning chaos into clarity — finding the structures that make complexity navigable for the people who live inside it.
            </p>
            <button
              className="stress-btn"
              style={{ marginTop: 24, fontSize: 13 }}
              onClick={() => {
                runIdRef.current += 1   // 🚨 invalidate EVERYTHING first
                clearAll()
                timeoutsRef.current = []
                setPhase("idle")
              }}
            >
              Reset
            </button>
          </div>

          {/* RIGHT: 2 images */}
          <div className="resolved-col resolved-col-right">
            {finalImages.slice(2, 4).map((src, i) => (
              <div
                key={i}
                className="resolved-img-wrap"
                style={{ transitionDelay: `${0.05 + (i + 2) * 0.12}s` }}
              >
                <img src={src} alt="" />
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
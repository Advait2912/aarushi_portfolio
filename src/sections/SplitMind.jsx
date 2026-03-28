import { useEffect, useRef, useState } from "react"

const steps = [
  {
    name: "Observe",
    desc: (
      <>
        I start by slowing down and paying attention — what people do, what they say, and what they don't.
        <br />
        Often, the most important things are the ones that go unnoticed.
      </>
    ),
  },
  {
    name: "Understand",
    desc: (
      <>
        I try to make sense of what's really going on — people, context, emotions, and contradictions.
        <br />
        It's less about answers, more about asking better questions.
      </>
    ),
  },
  {
    name: "Map",
    desc: (
      <>
        I externalize the mess — connecting dots, patterns, and relationships to see the bigger picture.
        <br />
        Mapping helps me move from confusion to clarity. Make invisible relationships visible and navigable.
      </>
    ),
  },
  {
    name: "Design",
    desc: (
      <>
        I turn insights into something tangible — ideas, systems, or experiences that can exist in the real world.
        <br />
        The goal is not just to solve, but to make it feel right.
      </>
    ),
  },
  {
    name: "Improve",
    desc: (
      <>
        I test, reflect, and adapt.
        <br />
        What works stays, what doesn't becomes learning — and the process continues.
      </>
    ),
  },
]

// Each bg layer drifts with unique sine params, clipped by parent overflow:hidden
function BgLayer({ src, opacity, seedX, seedY, seedPhase }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const tRef = useRef(seedPhase)
  const animRef = useRef(null)

  useEffect(() => {
    const tick = () => {
      tRef.current += 0.020
      const x = Math.sin(tRef.current * seedX) * 18
      const y = Math.sin(tRef.current * seedY + 1.3) * 14
      setOffset({ x, y })
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [seedX, seedY])

  return (
    <img
      src={src}
      alt=""
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        willChange: "transform",
        pointerEvents: "none",
        userSelect: "none",
        mixBlendMode: "screen",
      }}
    />
  )
}

// Main chaos.png — very subtle depth drift
function MainImage() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const tRef = useRef(0)
  const curRef = useRef({ x: 0, y: 0 })
  const animRef = useRef(null)

  useEffect(() => {
    const tick = () => {
      tRef.current += 0.006
      const tx = Math.sin(tRef.current * 0.7) * 5
      const ty = Math.sin(tRef.current * 0.5 + 0.8) * 4
      curRef.current.x += (tx - curRef.current.x) * 0.03
      curRef.current.y += (ty - curRef.current.y) * 0.03
      setOffset({ x: curRef.current.x, y: curRef.current.y })
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  return (
    <img
      src="/images/chaos.png"
      alt="The thinking underneath"
      style={{
        position: "relative",
        zIndex: 10,
        width: "60%",
        height: "auto",
        objectFit: "contain",
        display: "block",
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        willChange: "transform",
        pointerEvents: "none",
        userSelect: "none",
        filter: "drop-shadow(0 8px 40px rgba(0,0,0,0.18))",
      }}
    />
  )
}

export default function SplitMind() {
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            e.target.querySelectorAll(".fade-up").forEach((el) => el.classList.add("visible"))
        })
      },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style>{`
        #split-mind {
          align-items: stretch;
        }
        #split-mind:has(.logic-side:hover),
        #split-mind:has(.chaos-side:hover) {
          grid-template-columns: 1fr 1fr !important;
        }
        .chaos-side {
          position: relative !important;
          overflow: hidden !important;
          display: flex !important;
          flex-direction: column !important;
        }

        .logic-side .section-label { font-size: 13px; letter-spacing: .22em; }
        .logic-title  { font-size: clamp(32px, 3.2vw, 48px) !important; }
        .step-name    { font-size: 20px !important; }
        .step-desc    { font-size: 16px !important; line-height: 1.75 !important; }
        .step-num     { font-size: 14px !important; padding-top: 4px !important; }

        .chaos-title {
          white-space: nowrap;
          font-size: clamp(32px, 3.2vw, 48px) !important;
        }

        .chaos-header {
          position: relative;
          z-index: 20;
          flex-shrink: 0;
        }

        .chaos-intro-text {
          position: relative;
          z-index: 20;
          pointer-events: none;
          font-family: var(--hand);
          font-size: clamp(15px, 1.3vw, 19px);
          line-height: 1.7;
          color: var(--text);
          opacity: 0.85;
          flex-shrink: 0;
          margin-top: 14px;
        }

        /* Arena fills remaining height, clips all layers inside */
        .chaos-image-arena {
          flex: 1;
          min-height: 0;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 24px;
          border-radius: 14px;
        }

        .chaos-bottom-fade {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 70px;
          background: linear-gradient(to bottom, transparent, var(--bg));
          pointer-events: none;
          z-index: 30;
        }
      `}</style>

      <section id="split-mind" className="split-mind" ref={ref}>

        {/* ── LEFT: LOGIC ── */}
        <div className="logic-side">
          <div>
            <p className="section-label fade-up">Logic</p>
            <h2 className="logic-title fade-up" style={{ transitionDelay: "0.1s" }}>
              How I Approach<br />Design
            </h2>
          </div>

          <div className="process-steps fade-up" style={{ transitionDelay: "0.2s" }}>
            {steps.map((step, i) => (
              <div className="process-step" key={i}>
                <span className="step-num">0{i + 1}</span>
                <div className="step-content">
                  <p className="step-name">{step.name}</p>
                  <p className="step-desc">{step.desc}</p>
                </div>
                <span className="step-arrow">→</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: CHAOS ── */}
        <div className="chaos-side">

          <div className="chaos-header">
            <p className="section-label fade-up">Chaos</p>
            <h2 className="chaos-title fade-up" style={{ transitionDelay: "0.1s" }}>
              The Thinking Underneath
            </h2>
          </div>

          <p className="chaos-intro-text fade-up" style={{ transitionDelay: "0.2s" }}>
            This is what my thinking actually looks like. Not clear. Not linear.<br />
            Just questions looping over each other until something starts to settle.
          </p>

          {/* Arena: dark bg + scribble layers + chaos.png on top, all clipped */}
          <div className="chaos-image-arena">

            {/* Dark base so screen-blend scribbles glow */}
            <div style={{
              position: "absolute", inset: 0,
              background: "#080808",
              zIndex: 0,
            }} />

            {/* 5 bg scribble layers drifting at different speeds/phases */}
            <BgLayer src="/images/bg1.png" opacity={0.55} seedX={1.20} seedY={0.60} seedPhase={0.0} />
            <BgLayer src="/images/bg2.png" opacity={0.50} seedX={0.75} seedY={0.90} seedPhase={1.2} />
            <BgLayer src="/images/bg3.png" opacity={0.45} seedX={1.60} seedY={0.40} seedPhase={2.4} />
            <BgLayer src="/images/bg4.png" opacity={0.50} seedX={0.95} seedY={1.00} seedPhase={0.7} />
            <BgLayer src="/images/bg5.png" opacity={0.45} seedX={1.30} seedY={0.55} seedPhase={1.9} />

            {/* Main chaos.png floats gently on top */}
            <MainImage />

            <div className="chaos-bottom-fade" />
          </div>

        </div>

      </section>
    </>
  )
}
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

function FloatingImage() {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const animRef = useRef(null)

  useEffect(() => {
    let t = 0
    const tick = () => {
      // Gentle sine-based drift — no mouse, just organic movement
      t += 0.008
      targetRef.current = {
        x: Math.sin(t * 0.9) * 6,
        y: Math.sin(t * 0.7 + 1) * 5,
      }
      // Lerp toward target for smoothness
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.04
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.04
      setOffset({ x: currentRef.current.x, y: currentRef.current.y })
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
        width: "100%",
        height: "auto",
        objectFit: "contain",
        borderRadius: "4px",
        pointerEvents: "none",
        userSelect: "none",
        display: "block",
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        willChange: "transform",
        filter: "drop-shadow(0 12px 40px rgba(0,0,0,0.10))",
        transition: "transform 0.1s linear",
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
          min-height: 110vh;
          align-items: stretch;
        }
        .chaos-side {
          position: relative !important;
          overflow: hidden !important;
          min-height: 100% !important;
        }

        .logic-side .section-label {
          font-size: 11px;
          letter-spacing: .22em;
        }
        .logic-title {
          font-size: clamp(34px, 3.4vw, 52px) !important;
        }
        .step-name {
          font-size: 17px !important;
        }
        .step-desc {
          font-size: 14px !important;
          line-height: 1.75 !important;
        }
        .step-num {
          font-size: 12px !important;
          padding-top: 4px !important;
        }

        .chaos-title {
          white-space: nowrap;
          font-size: clamp(24px, 2.6vw, 40px) !important;
        }

        .chaos-header {
          position: relative;
          z-index: 20;
          pointer-events: none;
          flex-shrink: 0;
        }

        .chaos-intro-text {
          position: relative;
          z-index: 20;
          pointer-events: none;
          font-family: var(--hand);
          font-size: clamp(22px, 2vw, 28px);
          line-height: 1.8;
          color: var(--text);
          opacity: 0.8;
          flex-shrink: 0;
        }

        .chaos-image-wrap {
          flex: 1;
          min-height: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px 0 40px;
          overflow: hidden;
        }

        .chaos-bottom-fade {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 80px;
          background: linear-gradient(to bottom, transparent, var(--bg));
          pointer-events: none;
          z-index: 10;
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
        <div className="chaos-side" style={{ display: "flex", flexDirection: "column" }}>

          <div className="chaos-header">
            <p className="section-label fade-up">Chaos</p>
            <h2 className="chaos-title fade-up" style={{ transitionDelay: "0.1s" }}>
              The Thinking Underneath
            </h2>
          </div>

          <p className="chaos-intro-text fade-up" style={{ transitionDelay: "0.2s", marginTop: "20px" }}>
            This is what my thinking actually looks like.
            Not clear. Not linear.<br />
            Just questions looping over each other<br />until something starts to settle.
          </p>

          <div className="chaos-image-wrap">
            <FloatingImage />
          </div>

          <div className="chaos-bottom-fade" />
        </div>

      </section>
    </>
  )
}
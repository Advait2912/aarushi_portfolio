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

const chaosItems = [

  // ── CLUSTER A: top-left — "problem framing" ──────────────────────────────
  {
    src: "/chaos/17.png",
    top: "5%", left: "3%",
    width: 160, rotate: "-3deg",
    delay: 0, float: "A", z: 4,
  },
  {
    src: "/chaos/arr.png",
    top: "11%", left: "25%",
    width: 75, rotate: "0deg",
    delay: 0.08, float: "C", z: 2,
  },
  {
    src: "/chaos/6.png",
    top: "5%", left: "35%",
    width: 80, rotate: "5deg",
    delay: 0.12, float: "B", z: 3,
  },

  // ── CLUSTER B: top-right — "assumptions & system change" ─────────────────
  {
    src: "/chaos/9.png",
    top: "4%", left: "57%",
    width: 138, rotate: "2deg",
    delay: 0.05, float: "B", z: 4,
  },
  {
    src: "/chaos/13.png",
    top: "3%", left: "80%",
    width: 138, rotate: "-2deg",
    delay: 0.1, float: "A", z: 4,
  },
  {
    src: "/chaos/2.png",
    top: "9%", left: "70%",
    width: 82, rotate: "-10deg",
    delay: 0.18, float: "C", z: 2,
  },

  // ── CLUSTER C: middle — "user behaviour" ─────────────────────────────────
  {
    src: "/chaos/5.png",
    top: "28%", left: "2%",
    width: 185, rotate: "-2deg",
    delay: 0.22, float: "B", z: 3,
  },
  {
    src: "/chaos/2.png",
    top: "37%", left: "22%",
    width: 82, rotate: "30deg",
    delay: 0.28, float: "C", z: 2,
    opacity: 0.8,
  },
  {
    src: "/chaos/15.png",
    top: "44%", left: "2%",
    width: 240, rotate: "-1deg",
    delay: 0.33, float: "A", z: 5,
  },
  {
    src: "/chaos/1.png",
    top: "29%", left: "46%",
    width: 200, rotate: "3deg",
    delay: 0.38, float: "B", z: 3,
  },
  {
    src: "/chaos/4.png",
    top: "44%", left: "57%",
    width: 92, rotate: "5deg",
    delay: 0.44, float: "C", z: 2,
  },
  {
    src: "/chaos/8.png",
    top: "54%", left: "43%",
    width: 220, rotate: "0deg",
    delay: 0.5, float: "A", z: 5,
  },
  {
    src: "/chaos/7.png",
    top: "29%", left: "78%",
    width: 132, rotate: "2deg",
    delay: 0.42, float: "A", z: 4,
  },
  {
    src: "/chaos/12.png",
    top: "48%", left: "76%",
    width: 142, rotate: "-3deg",
    delay: 0.48, float: "B", z: 4,
  },

  // ── CLUSTER D: bottom — "reset" cluster ──────────────────────────────────
  {
    src: "/chaos/16.png",         // notepad — bigger
    top: "66%", left: "24%",
    width: 130, rotate: "-4deg",
    delay: 0.56, float: "B", z: 3,
  },
  {
    src: "/chaos/3.png",
    top: "68%", left: "4%",
    width: 188, rotate: "1deg",
    delay: 0.6, float: "C", z: 3,
  },
  {
    src: "/chaos/arr.png",
    top: "77%", left: "32%",
    width: 82, rotate: "-8deg",
    delay: 0.65, float: "A", z: 2,
  },
  {
    src: "/chaos/14.png",
    top: "71%", left: "42%",
    width: 225, rotate: "1deg",
    delay: 0.7, float: "B", z: 5,
  },
  {
    src: "/chaos/11.png",
    top: "65%", left: "74%",
    width: 140, rotate: "-2deg",
    delay: 0.62, float: "C", z: 4,
  },
  {
    src: "/chaos/10.png",
    top: "81%", left: "60%",
    width: 168, rotate: "-1deg",
    delay: 0.72, float: "A", z: 3,
  },
]

export default function SplitMind() {
  const ref = useRef(null)
  const [hasRevealed, setHasRevealed] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)
  const intervalRef = useRef(null)

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

  useEffect(() => {
    if (hasRevealed) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setHasRevealed(true)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [hasRevealed])

  useEffect(() => {
    if (!hasRevealed) return
    let count = 0
    intervalRef.current = setInterval(() => {
      count++
      setVisibleCount(count)
      if (count >= chaosItems.length) clearInterval(intervalRef.current)
    }, 110)
    return () => clearInterval(intervalRef.current)
  }, [hasRevealed])

  const sorted = [...chaosItems]
    .map((item, i) => ({ ...item, origIndex: i }))
    .sort((a, b) => a.delay - b.delay)

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

        /* Left side — bigger text */
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

        /* Chaos heading — force single line */
        .chaos-title {
          white-space: nowrap;
          font-size: clamp(24px, 2.6vw, 40px) !important;
        }

        /* Each chaos image */
        .chaos-img {
          position: absolute;
          pointer-events: none;
          user-select: none;
          mix-blend-mode: multiply;
          opacity: 0;
          transform: scale(0.78) translateY(14px);
          transition:
            opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .chaos-img.visible {
          opacity: var(--img-op, 1);
          transform: rotate(var(--rot)) scale(1) translateY(0px);
        }

        /* Faster, more visible float animations */
        .chaos-img.visible.fA { animation: cFA 4s ease-in-out infinite; }
        .chaos-img.visible.fB { animation: cFB 5s ease-in-out infinite; }
        .chaos-img.visible.fC { animation: cFC 3.5s ease-in-out infinite; }

        .chaos-img:nth-child(3n+1) { animation-delay: 0s; }
        .chaos-img:nth-child(3n+2) { animation-delay: -1.6s; }
        .chaos-img:nth-child(3n)   { animation-delay: -3.2s; }

        @keyframes cFA { 0%,100%{translate:0 0} 50%{translate:0 -11px} }
        @keyframes cFB { 0%,100%{translate:0 0} 35%{translate:2px -9px} 70%{translate:-2px -10px} }
        @keyframes cFC { 0%,100%{translate:0 0} 60%{translate:0 -12px} }

        /* Soft bottom fade */
        .chaos-bottom-fade {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 120px;
          background: linear-gradient(to bottom, transparent, var(--bg));
          pointer-events: none;
          z-index: 10;
        }

        .chaos-header {
          position: relative;
          z-index: 20;
          pointer-events: none;
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

          {sorted.map((item, sortedIdx) => (
            <img
              key={item.origIndex}
              src={item.src}
              alt=""
              className={`chaos-img f${item.float} ${sortedIdx < visibleCount ? "visible" : ""}`}
              style={{
                top:        item.top,
                left:       item.left,
                width:      item.width,
                zIndex:     item.z,
                "--rot":    item.rotate,
                "--img-op": item.opacity ?? 1,
              }}
            />
          ))}

          <div className="chaos-bottom-fade" />
        </div>

      </section>
    </>
  )
}
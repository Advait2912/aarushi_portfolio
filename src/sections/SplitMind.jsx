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

// ─────────────────────────────────────────────────────────────────────────────
// PLACE ALL PNGs IN /public/chaos/ named exactly as below.
// Copy files:  1.png → /public/chaos/1.png  etc.  arr.png → /public/chaos/arr.png
//
// Layout is hand-tuned to look like a real thinking board:
//   • Arrows point FROM one thought TO the next
//   • Big statements (ellipses) anchor the centre
//   • Sticky notes cluster near the edges
//   • Scribbles float freely between
// ─────────────────────────────────────────────────────────────────────────────
const chaosItems = [
  // ── TOP BAND ──────────────────────────────────────────────────────────────
  {
    src: "/chaos/17.png",          // yellow sticky "Is this even the right PROBLEM??"
    top: "3%", left: "55%",
    width: 170, rotate: "3deg",
    delay: 0, float: "A", z: 4,
  },
  {
    src: "/chaos/13.png",          // pink sticky "What if the System Changed?"
    top: "2%", left: "78%",
    width: 150, rotate: "-2deg",
    delay: 0.08, float: "B", z: 4,
  },
  {
    src: "/chaos/arr.png",         // right arrow (points into the pink sticky)
    top: "8%", left: "66%",
    width: 100, rotate: "-15deg",
    delay: 0.15, float: "C", z: 2,
  },
  {
    src: "/chaos/6.png",           // ??? question marks
    top: "6%", left: "5%",
    width: 90, rotate: "-5deg",
    delay: 0.05, float: "A", z: 2,
  },

  // ── UPPER-MID: the "user said one thing" block + arrow into it ────────────
  {
    src: "/chaos/5.png",           // "What happens next?" scribble
    top: "17%", left: "4%",
    width: 200, rotate: "-3deg",
    delay: 0.2, float: "B", z: 3,
  },
  {
    src: "/chaos/2.png",           // curved arrow down-left (from top into ellipse)
    top: "14%", left: "48%",
    width: 110, rotate: "10deg",
    delay: 0.25, float: "C", z: 2,
  },
  {
    src: "/chaos/15.png",          // ellipse "user said one thing, did another"
    top: "22%", left: "20%",
    width: 260, rotate: "-1.5deg",
    delay: 0.3, float: "A", z: 5,
  },
  {
    src: "/chaos/9.png",           // green sticky "Assumptions?"
    top: "18%", left: "68%",
    width: 145, rotate: "2.5deg",
    delay: 0.35, float: "B", z: 4,
  },

  // ── MID: "too many steps" + "user drops off" ─────────────────────────────
  {
    src: "/chaos/1.png",           // "too many steps here" scribble
    top: "38%", left: "18%",
    width: 230, rotate: "4deg",
    delay: 0.4, float: "C", z: 3,
  },
  {
    src: "/chaos/4.png",           // long curved arrow (from "too many steps" down into "user drops off")
    top: "42%", left: "44%",
    width: 130, rotate: "5deg",
    delay: 0.45, float: "A", z: 2,
  },
  {
    src: "/chaos/8.png",           // ellipse "User drops off"
    top: "52%", left: "18%",
    width: 240, rotate: "0.5deg",
    delay: 0.5, float: "B", z: 5,
  },
  {
    src: "/chaos/12.png",          // yellow star "Why does this Exist"
    top: "44%", left: "64%",
    width: 155, rotate: "-3deg",
    delay: 0.48, float: "C", z: 4,
  },
  {
    src: "/chaos/7.png",           // green sticky "Is this Scalable?"
    top: "36%", left: "76%",
    width: 140, rotate: "2deg",
    delay: 0.42, float: "A", z: 4,
  },
  {
    src: "/chaos/16.png",          // yellow notepad with crossed-out items
    top: "56%", left: "70%",
    width: 120, rotate: "-4deg",
    delay: 0.55, float: "B", z: 3,
  },

  // ── LOWER: "START OVER?" + arrows + "the brief was wrong" ────────────────
  {
    src: "/chaos/3.png",           // "START OVER?" big text
    top: "66%", left: "30%",
    width: 200, rotate: "1deg",
    delay: 0.62, float: "C", z: 3,
  },
  {
    src: "/chaos/11.png",          // blue sticky "What are we Missing??"
    top: "63%", left: "64%",
    width: 155, rotate: "-2.5deg",
    delay: 0.58, float: "A", z: 4,
  },
  {
    src: "/chaos/10.png",          // "Is this Scalable?" handwritten plain
    top: "72%", left: "5%",
    width: 190, rotate: "-2deg",
    delay: 0.65, float: "B", z: 3,
  },
  {
    src: "/chaos/2.png",           // reuse curved arrow pointing to "brief was wrong"
    top: "72%", left: "44%",
    width: 100, rotate: "20deg",
    delay: 0.7, float: "C", z: 2,
    opacity: 0.7,
  },
  {
    src: "/chaos/14.png",          // ellipse "The brief was wrong"
    top: "80%", left: "16%",
    width: 250, rotate: "1deg",
    delay: 0.75, float: "A", z: 5,
  },
  {
    src: "/chaos/arr.png",         // right arrow → (after "brief was wrong")
    top: "86%", left: "52%",
    width: 110, rotate: "-5deg",
    delay: 0.8, float: "B", z: 2,
  },
]

export default function SplitMind() {
  const ref = useRef(null)
  const [hasRevealed, setHasRevealed] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)
  const intervalRef = useRef(null)

  // Fade-up for text elements
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

  // One-shot trigger on first scroll-into-view
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

  // Stagger images one-by-one, 110ms apart — never resets
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

  // Sort by delay so stagger order matches intended narrative flow
  const sorted = [...chaosItems]
    .map((item, i) => ({ ...item, origIndex: i }))
    .sort((a, b) => a.delay - b.delay)

  return (
    <>
      <style>{`
        /* ── Section sizing ── */
        #split-mind {
          min-height: 160vh;
          align-items: stretch;
        }
        .chaos-side {
          position: relative !important;
          overflow: hidden !important;
          min-height: 100% !important;
        }

        /* ── Each chaos image ── */
        .chaos-img {
          position: absolute;
          pointer-events: none;
          user-select: none;
          /* transparent PNG — black pixels become invisible */
          mix-blend-mode: multiply;
          opacity: 0;
          transform: scale(0.78) translateY(14px);
          transition:
            opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .chaos-img.visible {
          opacity: var(--img-op, 1);
          transform: rotate(var(--rot)) scale(1) translateY(0px);
        }

        /* ── Three gentle float variants ── */
        .chaos-img.visible.fA { animation: cFA 8s ease-in-out infinite; }
        .chaos-img.visible.fB { animation: cFB 10s ease-in-out infinite; }
        .chaos-img.visible.fC { animation: cFC 7s ease-in-out infinite; }

        /* Stagger start time so they don't all move in sync */
        .chaos-img:nth-child(3n+1) { animation-delay: 0s; }
        .chaos-img:nth-child(3n+2) { animation-delay: -3s; }
        .chaos-img:nth-child(3n)   { animation-delay: -6s; }

        @keyframes cFA { 0%,100%{translate:0 0}  50%{translate:0 -6px} }
        @keyframes cFB { 0%,100%{translate:0 0}  35%{translate:1px -4px} 70%{translate:-1px -5px} }
        @keyframes cFC { 0%,100%{translate:0 0}  60%{translate:0 -7px} }

        /* Soft bottom fade into next section */
        .chaos-bottom-fade {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 160px;
          background: linear-gradient(to bottom, transparent, var(--bg));
          pointer-events: none;
          z-index: 10;
        }

        /* Keep chaos header readable above the image layer */
        .chaos-header {
          position: relative;
          z-index: 20;
          pointer-events: none;
        }
      `}</style>

      <section id="split-mind" className="split-mind" ref={ref}>

        {/* ── LEFT: LOGIC ────────────────────────────────────────────── */}
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

        {/* ── RIGHT: CHAOS ───────────────────────────────────────────── */}
        <div className="chaos-side">

          {/* Header — stays on top */}
          <div className="chaos-header">
            <p className="section-label fade-up">Chaos</p>
            <h2 className="chaos-title fade-up" style={{ transitionDelay: "0.1s" }}>
              The Thinking<br />Underneath
            </h2>
          </div>

          {/* All images — positioned absolutely within the chaos side */}
          {sorted.map((item, sortedIdx) => (
            <img
              key={item.origIndex}
              src={item.src}
              alt=""
              className={`chaos-img f${item.float} ${sortedIdx < visibleCount ? "visible" : ""}`}
              style={{
                top:      item.top,
                left:     item.left,
                width:    item.width,
                zIndex:   item.z,
                "--rot":  item.rotate,
                "--img-op": item.opacity ?? 1,
              }}
            />
          ))}

          {/* Fade out at bottom */}
          <div className="chaos-bottom-fade" />
        </div>

      </section>
    </>
  )
}
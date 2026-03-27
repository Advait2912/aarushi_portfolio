import { useRef, useEffect, useState, useCallback } from "react"

const influences = [
  { label: "Psychology",           x: "30%", y: "4%",  desc: "Understanding what people feel, even when they can't explain it." },
  { label: "Pattern Recognition",  x: "58%", y: "20%", desc: "Finding connections across people, systems, and experiences." },
  { label: "Systems Thinking",     x: "60%", y: "45%", desc: "Seeing the bigger picture behind how everything works." },
  { label: "Service Design",       x: "60%", y: "72%", desc: "Bringing everything together into real-world experiences." },
  { label: "Research",             x: "30%", y: "84%", desc: "Sitting with the problem before trying to solve it." },
  { label: "Behavioural Science",  x: "-6%",  y: "72%", desc: "People are irrational in predictable ways. Design for who they are, not who we wish they were." },
  { label: "Visual Communication", x: "-12%",  y: "44%", desc: "Making ideas clear, visual, and meaningful." },
  { label: "Emotional Insight",    x: "-6%",  y: "16%", desc: "Noticing what people feel beneath the surface." },
]

const CENTER = { x: "36%", y: "46%" }
const CENTER_DESC = "Designer, systems thinker, and someone who asks too many questions."

export default function SystemInputs() {
  const sectionRef = useRef(null)
  const constellationRef = useRef(null)
  const [conSize, setConSize] = useState({ w: 0, h: 0 })
  const [hoveredCenter, setHoveredCenter] = useState(false)
  const [hoveredInf, setHoveredInf] = useState(null)
  const [imgHovered, setImgHovered] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll(".fade-up").forEach(el => el.classList.add("visible"))
      })
    }, { threshold: 0.1 })
    if (sectionRef.current) obs.observe(sectionRef.current)

    return () => obs.disconnect()
  }, [])

  // Observe the constellation div specifically for its size
  useEffect(() => {
    if (!constellationRef.current) return
    const sizeObs = new ResizeObserver(entries => {
      const r = entries[0].contentRect
      setConSize({ w: r.width, h: r.height })
    })
    sizeObs.observe(constellationRef.current)
    return () => sizeObs.disconnect()
  }, [])

  const pct = (v, total) => parseFloat(v) / 100 * total
  const cx = pct(CENTER.x, conSize.w)
  const cy = pct(CENTER.y, conSize.h)

  const anyHovered = hoveredCenter || hoveredInf !== null

  const lineOpacity = (i) => {
    if (!anyHovered) return 0.25
    if (hoveredCenter) return 0.6
    if (hoveredInf === i) return 0.75
    return 0.05
  }

  const nodeOpacity = (i) => {
    if (!anyHovered) return 1
    if (hoveredInf === i) return 1
    return 0.15
  }

  const centerOpacity = () => {
    if (!anyHovered) return 1
    if (hoveredCenter) return 1
    return 0.15
  }

  return (
    <section id="system-inputs" className="system-inputs" ref={sectionRef} style={{ alignItems: "stretch", padding: 0 }}>


   
        <div style={{
  display: "grid",
  gridTemplateColumns: "1.1fr 0.9fr",
  width: "100%",
  padding: "100px 60px 100px 2vw",
  gap: "60px",
  alignItems: "start",
}}>

  {/* ───────── LEFT SIDE (TEXT ONLY) ───────── */}
  <div className="fade-up" style={{ maxWidth: "640px" }}>

    <h2 style={{
      fontFamily: "var(--serif)",
      fontSize: "clamp(32px,4vw,52px)",
      fontWeight: 400,
      marginBottom: "28px",
    }}>
      A Little About Me
    </h2>

    <p style={{ lineHeight: 1.9, fontSize: "17px", marginBottom: "20px" }}>
      I’m a Business Services & Systems Designer who’s always been drawn to the messy, in-between spaces - the places where things don’t quite fit neatly 
      into one box. That’s where I find the most interesting problems, and honestly, the most meaningful work.
    </p>

    <p style={{ lineHeight: 1.9, fontSize: "17px", marginBottom: "30px" }}>
      My approach sits at the intersection of research, strategy, and visual thinking. I like to zoom 
      out to understand how systems behave - where they break, who they serve, and why they exist the way they do - 
      and then zoom back in to shape something clearer, more intentional, and easier to navigate. For me, design isn’t just about making things 
      look good; it’s about making sense of complexity and building systems that actually work for people.
    </p>

    <h3 style={{
  fontSize: "20px",          // 👈 slightly bigger
  fontWeight: 600,           // 👈 more emphasis
  marginBottom: "14px",      // 👈 better spacing
  letterSpacing: "-0.01em"   // 👈 subtle polish
}}>
      How I Think
    </h3>

    <p style={{ lineHeight: 1.9, fontSize: "17px", marginBottom: "20px" }}>
      Curiosity is a big part of how I move through the world. I tend to ask “why” a lot - sometimes more than necessary - 
      but it’s how I uncover the assumptions hidden inside systems. I enjoy mapping 
      relationships, connecting dots across disciplines, and noticing patterns that aren’t immediately obvious.
    </p>
    <p style={{ lineHeight: 1.9, fontSize: "17px", marginBottom: "20px" }}>
      I’m especially interested in how people experience systems emotionally, not just functionally. The way something is designed can shape how someone feels - whether that’s 
      clarity, frustration, ease, or overwhelm - and I try to stay mindful of that in the way I approach my work.
    </p>

   <h3 style={{
  fontSize: "20px",          // 👈 slightly bigger
  fontWeight: 600,           // 👈 more emphasis
  marginBottom: "14px",      // 👈 better spacing
  letterSpacing: "-0.01em"   // 👈 subtle polish
}}>
      What I Care About
    </h3>

    <p style={{ lineHeight: 1.9, fontSize: "17px",marginBottom: "20px" }}>
      Alongside systems and strategy, I’ve developed a strong interest in mental health and emotional well-being. I’m curious about how design can create safer, 
      more supportive experiences — especially in spaces where people might already feel vulnerable or uncertain.
    </p>
    <p style={{ lineHeight: 1.9, fontSize: "17px",marginBottom: "20px" }}>
     Whether it’s simplifying access to services, reducing friction, or just making something feel a little more human,
      I think small design decisions can have a real impact on how people navigate their lives. 
     This perspective naturally shapes the kind of problems I’m drawn to and the way I think about solutions.
    </p>

  </div>


  {/* ───────── RIGHT SIDE (IMAGE + CONSTELLATION) ───────── */}
  <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>

    {/* IMAGE (same as yours, unchanged logic) */}
    <div
      className="fade-up"
      style={{ maxWidth: "320px",width:"100%",alignSelf: "center" }} 
      onMouseEnter={() => setImgHovered(true)}
      onMouseLeave={() => setImgHovered(false)}
    >
      <div style={{
        width: "100%",
        aspectRatio: "3/4",
        borderRadius: "16px",
        border: "1px solid var(--border)",
        overflow: "hidden",
        position: "relative",
      }}>
        <img
          src="/images/image-default.png"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: imgHovered ? 0 : 1,
            transition: "0.5s"
          }}
        />
        <img
          src="/images/image-hover.png"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: imgHovered ? 1 : 0,
            transition: "0.5s"
          }}
        />
      </div>
    </div>


    {/* SMALLER HEADING */}
    <div className="fade-up">
      <h2 style={{
        fontFamily: "var(--serif)",
        fontSize: "clamp(24px,3vw,36px)", // 👈 reduced
        fontWeight: 400,
        marginBottom: "10px"
      }}>
        What Shapes My Thinking
      </h2>

      <span style={{
        fontSize: "10px",
        letterSpacing: ".2em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}>
        The disciplines that inform how I design
        <span style={{ flex: 1, height: "1px", background: "var(--border)" }} />
      </span>
    </div>


    {/* CONSTELLATION → KEEP YOUR ORIGINAL BLOCK */}
    <div
      ref={constellationRef}
      className="constellation fade-up"
      style={{
        height: 480,
        position: "relative",
        width: "100%",
        marginLeft: "40px" // 👈 ONLY ADD THIS
      }}
    >

      {/* 🔴 COPY EVERYTHING FROM YOUR ORIGINAL CONSTELLATION HERE */}
      {/* svg + center node + influence nodes — unchanged */}
      <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
              {influences.map((inf, i) => {
                const ix = pct(inf.x, conSize.w)
                const iy = pct(inf.y, conSize.h)
                return (
                  <line
                    key={i}
                    x1={cx} y1={cy}
                    x2={ix} y2={iy}
                    stroke="var(--indigo)"
                    strokeWidth={hoveredInf === i || hoveredCenter ? 1.5 : 1}
                    opacity={lineOpacity(i)}
                    strokeDasharray="4 4"
                    style={{ transition: "opacity 0.4s ease, stroke-width 0.3s ease" }}
                  />
                )
              })}
            </svg>

            {/* Center node — same structure as influence nodes */}
            <div
              className="constellation-node fade-up"
              style={{
                left: CENTER.x,
                top: CENTER.y,
                opacity: centerOpacity(),
                transition: "opacity 0.4s ease",
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => setHoveredCenter(true)}
              onMouseLeave={() => setHoveredCenter(false)}
            >
              <div className="node-pill" style={{
                background: "var(--text)",
                color: "var(--bg)",
                fontWeight: 500,
                fontSize: "14px",
                padding: "12px 24px",
                transform: hoveredCenter ? "scale(1.2)" : "scale(1)",
                transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
              }}>
                Aarushi
              </div>
              <div className="node-card">
                <strong>Aarushi</strong>
                {CENTER_DESC}
              </div>
            </div>

            {/* Influence nodes */}
            {influences.map((inf, i) => (
              <div
                key={i}
                className="constellation-node fade-up"
                style={{
                  left: inf.x,
                  top: inf.y,
                  transitionDelay: `${0.1 + i * 0.05}s`,
                  opacity: nodeOpacity(i),
                  transition: "opacity 0.4s ease",
                }}
                onMouseEnter={() => setHoveredInf(i)}
                onMouseLeave={() => setHoveredInf(null)}
              >
                <div className="node-pill" style={{
                  transform: hoveredInf === i ? "scale(1.2)" : "scale(1)",
                  transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}>
                  {inf.label}
                </div>
                <div className="node-card">
                  <strong>{inf.label}</strong>
                  {inf.desc}
                </div>
              </div>
            ))}

    </div>

  </div>

</div>
        
        

    </section>
  )
}
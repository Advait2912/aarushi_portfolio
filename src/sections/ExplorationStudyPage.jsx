import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"

const explorations = [
  {
    id: "screen-printing",
    title: "Screen Printing",
    subtitle: "Halftones & process",
    desc: "Exploring layered colour separation and halftone patterns through hand-pulled prints.",
    problem: "Screen printing demands a deep understanding of colour as layers rather than blends — each pass of the squeegee builds the image one separation at a time.",
    skills: ["Colour Theory", "Print Making", "Process Design", "Material Craft"],
    outcome: "A series of hand-pulled prints exploring halftone dot patterns, overprint colour mixing, and the beauty of misregistration as a design element.",
    images: [
      "/images/explorations/screen-printing/01.jpeg",
      "/images/explorations/screen-printing/02.jpeg",
      "/images/explorations/screen-printing/03.jpeg",
      "/images/explorations/screen-printing/04.jpeg",
      "/images/explorations/screen-printing/05.jpeg",
      "/images/explorations/screen-printing/06.jpeg",
      "/images/explorations/screen-printing/07.jpeg",
      "/images/explorations/screen-printing/08.jpeg",
      "/images/explorations/screen-printing/09.jpeg",
      "/images/explorations/screen-printing/10.jpeg",
    ],
  },
  {
    id: "3d-modelling",
    title: "3D Modelling",
    subtitle: "Form & space",
    desc: "Experimenting with geometric form, materiality, and light in Blender.",
    problem: "Three-dimensional thinking requires unlearning the flatness of 2D design — objects exist in space with weight, shadow, and material memory.",
    skills: ["Blender", "Lighting Design", "Material Study", "Spatial Thinking"],
    outcome: "A set of explorations into form, light interaction, and material — from matte clay studies to iridescent glass experiments.",
    images: [
      "/images/explorations/3d-modelling/01.jpeg",
      "/images/explorations/3d-modelling/02.jpeg",
      "/images/explorations/3d-modelling/03.jpeg",
    ],
  },
  {
    id: "digital-illustration",
    title: "Digital Illustration",
    subtitle: "Editorial work",
    desc: "Systems diagrams, editorial illustrations, and visual essays.",
    problem: "Editorial illustration must communicate quickly and distinctly — every mark is purposeful, every colour choice carries meaning within a visual argument.",
    skills: ["Editorial Design", "Visual Storytelling", "Systems Mapping", "Typography"],
    outcome: "A body of editorial illustrations spanning systems thinking, visual essays, and diagrams that make complex ideas tangible.",
    images: [
      "/images/explorations/digital-illustration/01.jpeg",
      "/images/explorations/digital-illustration/02.jpeg",
      "/images/explorations/digital-illustration/03.jpeg",
      "/images/explorations/digital-illustration/04.jpeg",
      "/images/explorations/digital-illustration/05.jpeg",
    ],
  },
  {
    id: "material-experiments",
    title: "Material Experiments",
    subtitle: "Tactile design",
    desc: "Exploring how physical materials communicate meaning — paper, texture, weight.",
    problem: "Digital design forgets the body. Material experiments return design to its physical roots — the grain of paper, the weight of an object, the texture under a fingertip.",
    skills: ["Material Research", "Tactile Design", "Paper Craft", "Sensory Design"],
    outcome: "A series of material studies that question how weight, texture, and surface communicate meaning beyond the visual.",
    images: [
      "/images/explorations/material-experiments/01.jpeg",
      "/images/explorations/material-experiments/02.jpeg",
    ],
  },
]

const CARD_W = 160
const CARD_H = 200

// Each card runs its own rAF loop, receiving live container size via ref
function FloatingImage({ src, index, total, boundsRef }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const animRef = useRef(null)
  const posRef = useRef(null)   // null = not yet initialised
  const velRef = useRef({ x: 0, y: 0 })

  // Initialise once boundsRef has real dimensions
  useEffect(() => {
    const tryInit = () => {
      const b = boundsRef.current
      if (!b || b.w === 0 || b.h === 0) { setTimeout(tryInit, 50); return }

      const maxX = b.w / 2 - CARD_W / 2
      const maxY = b.h / 2 - CARD_H / 2

      // Spread cards evenly around the arena
      const angle = (index / total) * Math.PI * 2
      const rx = maxX * 0.6
      const ry = maxY * 0.6
      const initX = Math.cos(angle) * rx * (0.5 + Math.random() * 0.5)
      const initY = Math.sin(angle) * ry * (0.5 + Math.random() * 0.5)

      // Faster initial speed: 1.2 – 2.0 px/frame
      const speed = 1.2 + Math.random() * 0.8
      const dir = angle + Math.PI / 2 + (Math.random() - 0.5) * 1.2
      const vx = Math.cos(dir) * speed
      const vy = Math.sin(dir) * speed

      posRef.current = { x: initX, y: initY }
      velRef.current = { x: vx, y: vy }
      setPos({ x: initX, y: initY })
    }
    tryInit()
  }, [index, total, boundsRef])

  useEffect(() => {
    if (hovered) {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      return
    }
    if (!posRef.current) return   // not yet initialised

    const MIN_SPEED = 0.8
    const MAX_SPEED = 2.2

    const tick = () => {
      const b = boundsRef.current
      if (!b) { animRef.current = requestAnimationFrame(tick); return }

      const maxX = b.w / 2 - CARD_W / 2
      const maxY = b.h / 2 - CARD_H / 2

      let { x, y } = posRef.current
      let { x: vx, y: vy } = velRef.current

      x += vx
      y += vy

      // Hard bounce off all four walls
      if (x >= maxX)  { x = maxX;  vx = -Math.abs(vx) }
      if (x <= -maxX) { x = -maxX; vx =  Math.abs(vx) }
      if (y >= maxY)  { y = maxY;  vy = -Math.abs(vy) }
      if (y <= -maxY) { y = -maxY; vy =  Math.abs(vy) }

      // Keep speed in range — no damping, no slowdown
      const spd = Math.sqrt(vx * vx + vy * vy)
      if (spd < MIN_SPEED) { vx = (vx / spd) * MIN_SPEED; vy = (vy / spd) * MIN_SPEED }
      if (spd > MAX_SPEED) { vx = (vx / spd) * MAX_SPEED; vy = (vy / spd) * MAX_SPEED }

      posRef.current = { x, y }
      velRef.current = { x: vx, y: vy }
      setPos({ x, y })

      animRef.current = requestAnimationFrame(tick)
    }

    animRef.current = requestAnimationFrame(tick)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [hovered, boundsRef])

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: CARD_W,
        height: CARD_H,
        marginLeft: -CARD_W / 2,
        marginTop: -CARD_H / 2,
        transform: hovered
          ? `translate(${pos.x}px, ${pos.y}px) scale(1.8)`
          : `translate(${pos.x}px, ${pos.y}px) scale(1)`,
        transition: hovered
          ? "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
          : "transform 0.05s linear",
        zIndex: hovered ? 20 : index + 1,
        cursor: "default",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.1)",
        boxShadow: hovered
          ? "0 40px 80px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.12)"
          : "0 8px 24px rgba(0,0,0,0.12)",
        background: "#e8e4e0",
      }}
    >
      <div style={{
        width: "100%",
        height: "100%",
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }} />
    </div>
  )
}

// Measures its own size and feeds live bounds to each card
function FloatingArena({ images }) {
  const arenaRef = useRef(null)
  const boundsRef = useRef({ w: 0, h: 0 })

  useEffect(() => {
    const update = () => {
      if (arenaRef.current) {
        const { width, height } = arenaRef.current.getBoundingClientRect()
        boundsRef.current = { w: width, h: height }
      }
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return (
    <div ref={arenaRef} style={{ position: "absolute", inset: 0 }}>
      {images.map((src, i) => (
        <FloatingImage
          key={i}
          src={src}
          index={i}
          total={images.length}
          boundsRef={boundsRef}
        />
      ))}
    </div>
  )
}

export default function ExplorationStudyPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const exploration = explorations.find(e => e.id === id)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  if (!exploration) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "60px", position: "relative", zIndex: 2 }}>
        <p style={{ color: "var(--text-muted)" }}>Exploration not found.</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", paddingTop: "60px", position: "relative", zIndex: 2 }}>
      <div className="case-study">

        {/* LEFT — identical to CaseStudyPage */}
        <div className="case-left">
          <div>
            <p className="section-label">Side Exploration</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px,3vw,40px)", fontWeight: 400, marginTop: 12 }}>
              {exploration.title}
            </h2>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "8px", letterSpacing: ".04em" }}>
              {exploration.subtitle}
            </p>
          </div>

          <div className="case-section">
            <p className="case-section-title">Context</p>
            <p className="case-section-body">{exploration.problem}</p>
          </div>

          <div className="case-section">
            <p className="case-section-title">About</p>
            <p className="case-section-body">{exploration.desc}</p>
          </div>

          <div className="case-section">
            <p className="case-section-title">Methods & Skills</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "4px" }}>
              {exploration.skills.map((s, i) => (
                <span key={i} style={{
                  fontSize: "12px", padding: "5px 13px", borderRadius: "100px",
                  border: `1px solid ${i === 0 ? "var(--terracotta)" : "var(--border)"}`,
                  color: i === 0 ? "var(--terracotta)" : "var(--text-muted)",
                }}>{s}</span>
              ))}
            </div>
          </div>

          <div className="case-section">
            <p className="case-section-title">Outcome</p>
            <div className="framework-block" style={{ borderColor: "var(--terracotta)", background: "var(--terracotta-light, rgba(188,108,77,0.08))" }}>
              {exploration.outcome}
            </div>
          </div>

          <button
            onClick={() => navigate(-1)}
            style={{
              alignSelf: "flex-start", marginTop: "auto",
              display: "flex", alignItems: "center", gap: "8px",
              background: "transparent", border: "1px solid var(--border)",
              borderRadius: "100px", padding: "10px 20px",
              fontSize: "12px", letterSpacing: ".08em",
              color: "var(--text-muted)", cursor: "pointer",
              fontFamily: "var(--sans)", transition: "all .2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--terracotta)"; e.currentTarget.style.color = "var(--terracotta)" }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)" }}
          >
            ← Back to Portfolio
          </button>
        </div>

        {/* RIGHT — floating images */}
        <div className="case-right" style={{ position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>

          {/* Subtle hint text */}
          <p style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 11,
            color: "var(--text-muted)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            opacity: 0.5,
            zIndex: 0,
            whiteSpace: "nowrap",
            fontFamily: "var(--sans)",
          }}>
            Hover to pause · Images coming soon
          </p>

          {/* Floating arena — measures itself */}
          <FloatingArena images={exploration.images} />
        </div>

      </div>
    </div>
  )
}
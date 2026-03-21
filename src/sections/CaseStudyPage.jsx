import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState, useCallback } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString()

const projects = [
  {
    id: "meta-counsel",
    pdf: "/pdfs/KrateKart.pdf",
    title: "Krate Kart",
    subtitle: "Vendor Ecosystem",
    tags: ["Service Design", "Strategy"],
    desc: (
      <>
        <p>
          Krate Kart is a modular storage system designed to fit existing vendor carts,
          enabling better organization, flexibility, and hygiene.
        </p>
        <p>
          It supports vendors in managing perishable goods more efficiently while
          improving the customer's shopping experience.
        </p>
      </>
    ),
    problem: (
      <>
        <p>
          Street vendors operate in limited, cluttered spaces with inadequate storage
          and waste systems.
        </p>
        <p>
          This leads to product damage, inefficiency, and loss of income.
        </p>
      </>
    ),
    skills: ["Field Research", "Product Design", "Prototyping", "User Testing"],
    outcome: (
      <>
        <p>
          A practical, scalable solution that improves vendor workflow, reduces waste,
          and creates cleaner, more organized street retail environments.
        </p>
      </>
    ),
  },

  {
    id: "emotion-ai",
    pdf: "",
    title: "Emotion AI App",
    subtitle: "Experience Design · AI",
    tags: ["Experience Design", "AI"],
    desc: (
      <>
        <p>
          An emotional intelligence interface that helps users understand and navigate
          their emotional patterns.
        </p>
        <p>
          It uses AI-assisted reflection to support awareness and decision-making.
        </p>
      </>
    ),
    problem: (
      <>
        <p>
          People struggle to identify emotional patterns that affect their decisions
          and relationships.
        </p>
      </>
    ),
    skills: ["Psychology", "UX Design", "Behavioural Science", "Prototyping"],
    outcome: (
      <>
        <p>
          A conversational journal concept with emotion mapping and pattern recognition.
        </p>
      </>
    ),
  },

  {
    id: "sleep-system",
    pdf: "/pdfs/YuluWalk.pdf",
    title: "YuluWalk",
    subtitle: "Urban Explorations",
    tags: ["Systems Thinking", "Research"],
    desc: (
      <>
        <p>
          Yulu Walk is a service feature integrated into the Yulu app that transforms
          walking into a guided, engaging experience.
        </p>
        <p>
          It combines curated routes, local insights, and community interaction to make
          city exploration more accessible and meaningful.
        </p>
      </>
    ),
    problem: (
      <>
        <p>
          New residents in Bangalore struggle to explore the city on foot due to unsafe
          infrastructure, unclear routes, and lack of guidance.
        </p>
        <p>
          Walking feels stressful instead of enjoyable.
        </p>
      </>
    ),
    skills: ["Research", "Systems Mapping", "Service Design", "UX Design"],
    outcome: (
      <>
        <p>
          A service concept that reframes walking as a safe, structured, and enjoyable
          way to experience the city.
        </p>
        <p>
          It encourages deeper connection and exploration.
        </p>
      </>
    ),
  },
]
export default function CaseStudyPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projects.find(p => p.id === id)
  const [numPages, setNumPages] = useState(null)
  const [pdfLoading, setPdfLoading] = useState(true)
  const [containerWidth, setContainerWidth] = useState(null)
  const containerRef = useCallback(node => {
    if (node) setContainerWidth(node.getBoundingClientRect().width)
  }, [])

  useEffect(() => { window.scrollTo(0, 0) }, [])
  useEffect(() => { setPdfLoading(true); setNumPages(null) }, [id])

  if (!project) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "60px", position: "relative", zIndex: 2 }}>
        <p style={{ color: "var(--text-muted)" }}>Project not found.</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", paddingTop: "60px", position: "relative", zIndex: 2 }}>
      <div className="case-study">

        {/* LEFT */}
        <div className="case-left">
          <div>
            <p className="section-label">Case Study</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(26px,3vw,40px)", fontWeight: 400, marginTop: 12 }}>
              {project.title}
            </h2>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "8px", letterSpacing: ".04em" }}>
              {project.subtitle}
            </p>
          </div>

          <div className="case-section">
            <p className="case-section-title">Problem Context</p>
            <p className="case-section-body">{project.problem}</p>
          </div>

          <div className="case-section">
            <p className="case-section-title">Description</p>
            <p className="case-section-body">{project.desc}</p>
          </div>

          <div className="case-section">
            <p className="case-section-title">Skills Applied</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "4px" }}>
              {project.skills.map((s, i) => (
                <span key={i} style={{
                  fontSize: "12px", padding: "5px 13px", borderRadius: "100px",
                  border: `1px solid ${i === 0 ? "var(--indigo)" : "var(--border)"}`,
                  color: i === 0 ? "var(--indigo)" : "var(--text-muted)",
                }}>{s}</span>
              ))}
            </div>
          </div>

          <div className="case-section">
            <p className="case-section-title">Outcome</p>
            <div className="framework-block">{project.outcome}</div>
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
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--indigo)"; e.currentTarget.style.color = "var(--indigo)" }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)" }}
          >
            ← Back to Portfolio
          </button>
        </div>

        {/* RIGHT — react-pdf */}
        <div className="case-right" ref={containerRef}>
          {project.pdf ? (
            <>
              {/* Loading bar */}
              <div style={{
                position: "sticky",
                top: 0,
                height: "2px",
                background: "var(--border)",
                zIndex: 10,
                opacity: pdfLoading ? 1 : 0,
                transition: "opacity .5s ease .3s",
              }}>
                <div style={{
                  height: "100%",
                  background: "var(--indigo)",
                  width: pdfLoading ? "80%" : "100%",
                  transition: pdfLoading ? "width 2.5s cubic-bezier(0.1,0.4,0.6,1)" : "width .2s ease",
                }} />
              </div>

              <Document
                file={project.pdf}
                onLoadSuccess={({ numPages }) => { setNumPages(numPages); setPdfLoading(false) }}
                loading={null}
              >
                {Array.from({ length: numPages || 0 }, (_, i) => (
                  <Page
                    key={i + 1}
                    pageNumber={i + 1}
                    width={containerWidth || undefined}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    style={{ display: "block" }}
                  />
                ))}
              </Document>
            </>
          ) : (
            <div style={{
              width: "100%",
              height: "100%",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              color: "var(--text-muted)",
            }}>
              <span style={{ fontSize: 32 }}>📄</span>
              <p style={{ fontSize: 13, letterSpacing: ".06em", textTransform: "uppercase" }}>Process PDF coming soon</p>
              <p style={{ fontSize: 12, opacity: 0.6 }}>Set a <code>pdf</code> path in this project's data</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
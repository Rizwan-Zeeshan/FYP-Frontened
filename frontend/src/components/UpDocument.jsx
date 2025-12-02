import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export default function UpDocument() {
  const [studentStatus, setStudentStatus] = useState(null);
  const [supervisorAssigned, setSupervisorAssigned] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadingDoc, setUploadingDoc] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState({});
  const [error, setError] = useState("");

  const proposalRef = useRef(null);
  const designRef = useRef(null);
  const testRef = useRef(null);
  const thesisRef = useRef(null);

  const documentTypes = [
    {
      id: "proposal",
      title: "Proposal",
      ref: proposalRef,
      canSubmit: studentStatus?.proposal,
    },
    {
      id: "design_document",
      title: "Design Document",
      ref: designRef,
      canSubmit: studentStatus?.design_document,
    },
    {
      id: "test_document",
      title: "Test Document",
      ref: testRef,
      canSubmit: studentStatus?.test_document,
    },
    {
      id: "thesis",
      title: "Thesis",
      ref: thesisRef,
      canSubmit: studentStatus?.thesis,
    },
  ];

  useEffect(() => {
    fetchStudentStatus();
  }, []);

  const fetchStudentStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/student/status`, {
        withCredentials: true,
      });
      setStudentStatus(response.data);
      setSupervisorAssigned(response.data.supervisorId !== -1);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching student status:", err);
      setError("Failed to fetch student status. Please try again.");
      setLoading(false);
    }
  };

  const handleUpload = async (docType, file) => {
    if (!file) return;

    setUploadingDoc(docType);
    setError("");

    try {
      const formData = new FormData();
      
      const metadata = {
        filename: file.name,
      };
      
      formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
      formData.append("doc_type", docType);
      formData.append("file", file);

      await axios.post(`${API_BASE_URL}/student/upload`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploadSuccess((prev) => ({ ...prev, [docType]: true }));
      
      await fetchStudentStatus();
      
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.response?.data?.message || "Failed to upload document. Please try again.");
    } finally {
      setUploadingDoc(null);
    }
  };

  const triggerFileInput = (ref) => {
    ref.current?.click();
  };

  const DocumentIcon = ({ type }) => {
    switch (type) {
      case "proposal":
        return (
          <svg viewBox="0 0 64 64" width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="12" y="4" width="40" height="56" rx="4" fill="url(#proposalGrad)" />
            <path d="M20 20h24M20 28h24M20 36h16" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="44" cy="44" r="12" fill="#10b981" />
            <path d="M40 44l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="proposalGrad" x1="12" y1="4" x2="52" y2="60" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366f1" />
                <stop offset="1" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        );
      case "design_document":
        return (
          <svg viewBox="0 0 64 64" width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="8" width="48" height="48" rx="6" fill="url(#designGrad)" />
            <rect x="16" y="16" width="14" height="14" rx="2" fill="white" fillOpacity="0.9" />
            <rect x="34" y="16" width="14" height="14" rx="2" fill="white" fillOpacity="0.6" />
            <rect x="16" y="34" width="14" height="14" rx="2" fill="white" fillOpacity="0.6" />
            <rect x="34" y="34" width="14" height="14" rx="2" fill="white" fillOpacity="0.9" />
            <defs>
              <linearGradient id="designGrad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ec4899" />
                <stop offset="1" stopColor="#f97316" />
              </linearGradient>
            </defs>
          </svg>
        );
      case "test_document":
        return (
          <svg viewBox="0 0 64 64" width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="6" width="44" height="52" rx="4" fill="url(#testGrad)" />
            <path d="M20 18h8v8h-8zM20 30h8v8h-8zM20 42h8v8h-8z" fill="white" fillOpacity="0.9" />
            <path d="M32 22h12M32 34h12M32 46h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M22 20l2 2 4-4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 32l2 2 4-4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="testGrad" x1="10" y1="6" x2="54" y2="58" gradientUnits="userSpaceOnUse">
                <stop stopColor="#14b8a6" />
                <stop offset="1" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
        );
      case "thesis":
        return (
          <svg viewBox="0 0 64 64" width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12c0-2.2 1.8-4 4-4h28l16 16v36c0 2.2-1.8 4-4 4H12c-2.2 0-4-1.8-4-4V12z" fill="url(#thesisGrad)" />
            <path d="M40 8v12c0 2.2 1.8 4 4 4h12" fill="#fbbf24" fillOpacity="0.5" />
            <path d="M18 32h28M18 40h28M18 48h20" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="32" cy="22" r="6" fill="white" fillOpacity="0.9" />
            <defs>
              <linearGradient id="thesisGrad" x1="8" y1="8" x2="56" y2="60" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f59e0b" />
                <stop offset="1" stopColor="#eab308" />
              </linearGradient>
            </defs>
          </svg>
        );
      default:
        return null;
    }
  };

  // Full card diagonal blocked overlay - TEXT ONLY (no images/SVGs)
  const BlockedOverlay = () => (
    <div style={styles.blockedOverlay}>
      {/* Semi-transparent red background */}
      <div style={styles.blockedBackground}></div>
      
      {/* Diagonal BLOCKED text - just the word, no images */}
      <div style={styles.blockedTextWrapper}>
        <span style={styles.blockedText}>BLOCKED</span>
      </div>
    </div>
  );

  const SuccessOverlay = () => (
    <div style={styles.successOverlay}>
      <svg viewBox="0 0 64 64" width="50" height="50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="28" fill="#10b981" />
        <path d="M20 32l8 8 16-16" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={styles.successText}>UPLOADED</span>
    </div>
  );

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.bgDecor1}></div>
      <div style={styles.bgDecor2}></div>

      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Upload Documents</h1>
          <p style={styles.subtitle}>
            Submit your FYP documents for review
          </p>
        </div>

        {!supervisorAssigned && (
          <div style={styles.alertBox}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#f59e0b">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            <span style={styles.alertText}>
              <strong>Supervisor Not Assigned!</strong> You cannot upload documents until a supervisor is assigned to you.
            </span>
          </div>
        )}

        {error && (
          <div style={styles.errorBox}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="#ef4444">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            <span style={styles.errorText}>{error}</span>
          </div>
        )}

        <div style={styles.grid}>
          {documentTypes.map((doc) => {
           
            
            const isBlocked = !supervisorAssigned;
            const isUploaded = supervisorAssigned && (!doc.canSubmit || uploadSuccess[doc.id]);
            const isUploading = uploadingDoc === doc.id;

            return (
              <div key={doc.id} style={{...styles.card, position: 'relative', overflow: 'hidden'}}>
                {/* BLOCKED text overlay on entire card - shown diagonally */}
                {isBlocked && <BlockedOverlay />}
                
                <div style={styles.iconWrapper}>
                  <DocumentIcon type={doc.id} />
                  
                  {isUploaded && <SuccessOverlay />}
                </div>

                <h3 style={styles.cardTitle}>{doc.title}</h3>

                <div style={{
                  ...styles.statusBadge,
                  background: isBlocked 
                    ? 'linear-gradient(135deg, #ef4444, #f87171)'
                    : isUploaded 
                      ? 'linear-gradient(135deg, #10b981, #34d399)'
                      : 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                }}>
                  {isBlocked ? 'Blocked' : isUploaded ? 'Submitted' : 'Pending'}
                </div>

                <input
                  type="file"
                  ref={doc.ref}
                  style={{ display: 'none' }}
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleUpload(doc.id, e.target.files[0]);
                    }
                  }}
                />

                <button
                  style={{
                    ...styles.uploadButton,
                    ...((!supervisorAssigned || isUploaded || isUploading) ? styles.uploadButtonDisabled : {}),
                  }}
                  disabled={!supervisorAssigned || isUploaded || isUploading}
                  onClick={() => triggerFileInput(doc.ref)}
                >
                  {isUploading ? (
                    <>
                      <div style={styles.buttonSpinner}></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z" />
                      </svg>
                      Upload Document
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    position: "relative",
    overflow: "hidden",
    padding: "40px 20px",
  },
  bgDecor1: {
    position: "absolute",
    top: "-10%",
    right: "-5%",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)",
    animation: "float 6s ease-in-out infinite",
  },
  bgDecor2: {
    position: "absolute",
    bottom: "-15%",
    left: "-10%",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)",
    animation: "float 8s ease-in-out infinite reverse",
  },
  content: {
    maxWidth: "1000px",
    margin: "0 auto",
    position: "relative",
    zIndex: 10,
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: "10px",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: 400,
  },
  alertBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "rgba(245, 158, 11, 0.15)",
    border: "1px solid rgba(245, 158, 11, 0.5)",
    borderRadius: "12px",
    padding: "16px 20px",
    marginBottom: "30px",
  },
  alertText: {
    color: "#fbbf24",
    fontSize: "0.95rem",
  },
  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "rgba(239, 68, 68, 0.15)",
    border: "1px solid rgba(239, 68, 68, 0.5)",
    borderRadius: "12px",
    padding: "16px 20px",
    marginBottom: "30px",
  },
  errorText: {
    color: "#f87171",
    fontSize: "0.95rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "24px",
  },
  card: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "20px",
    padding: "30px",
    textAlign: "center",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  iconWrapper: {
    position: "relative",
    display: "inline-block",
    marginBottom: "20px",
  },
  cardTitle: {
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "#1e293b",
    marginBottom: "12px",
  },
  statusBadge: {
    display: "inline-block",
    padding: "6px 16px",
    borderRadius: "50px",
    color: "white",
    fontSize: "0.85rem",
    fontWeight: 600,
    marginBottom: "20px",
  },
  uploadButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    padding: "14px 24px",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(99, 102, 241, 0.4)",
  },
  uploadButtonDisabled: {
    background: "linear-gradient(135deg, #94a3b8, #cbd5e1)",
    cursor: "not-allowed",
    boxShadow: "none",
  },
  buttonSpinner: {
    width: "18px",
    height: "18px",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  blockedOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
    borderRadius: "20px",
    overflow: "hidden",
    pointerEvents: "none",
  },
  blockedBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(254, 226, 226, 0.7)",
  },
  blockedTextWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(-35deg)",
    whiteSpace: "nowrap",
  },
  blockedText: {
    color: "#dc2626",
    fontSize: "2.5rem",
    fontWeight: 900,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2), 0 0 20px rgba(220, 38, 38, 0.3)",
    opacity: 0.9,
  },
  successOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    background: "rgba(255, 255, 255, 0.95)",
    padding: "10px 15px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(16, 185, 129, 0.3)",
  },
  successText: {
    color: "#10b981",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.05em",
  },
  loadingContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "4px solid rgba(255, 255, 255, 0.2)",
    borderTop: "4px solid #6366f1",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    color: "white",
    marginTop: "20px",
    fontSize: "1.1rem",
  },
};

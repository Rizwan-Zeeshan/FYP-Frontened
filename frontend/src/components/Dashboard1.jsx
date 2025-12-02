import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard1() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.dashboard}>
        <div style={styles.welcomeSection}>
          <div style={styles.avatarCircle}>
            <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <h1 style={styles.welcomeTitle}>Welcome to Dashboard</h1>
          <p style={styles.welcomeSubtitle}>Manage your documents and track submissions</p>
        </div>

        <div style={styles.optionsGrid}>
          <div 
            style={styles.optionCard}
            onClick={() => navigate('/upload-document')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(12, 14, 20, 0.25)';
            }}
          >
            <div style={styles.cardIconWrapper}>
              <div style={styles.cardIconBg}>
                <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                  <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/>
                </svg>
              </div>
            </div>
            <h3 style={styles.optionTitle}>Upload Documents</h3>
            <p style={styles.optionDescription}>Submit your assignments, projects and documents securely</p>
            <div style={styles.cardArrow}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/>
              </svg>
            </div>
          </div>

          <div 
            style={styles.optionCard}
            onClick={() => navigate('/submission-history')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(6, 182, 212, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(12, 14, 20, 0.25)';
            }}
          >
            <div style={styles.cardIconWrapper}>
              <div style={{...styles.cardIconBg, background: 'linear-gradient(135deg, #06b6d4, #0891b2)'}}>
                <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                  <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                </svg>
              </div>
            </div>
            <h3 style={styles.optionTitle}>Submission History</h3>
            <p style={styles.optionDescription}>View and track all your previous document submissions</p>
            <div style={styles.cardArrow}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/>
              </svg>
            </div>
          </div>

          <div 
            style={styles.optionCard}
            onClick={() => navigate('/view-grades')}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(12, 14, 20, 0.25)';
            }}
          >
            <div style={styles.cardIconWrapper}>
              <div style={{...styles.cardIconBg, background: 'linear-gradient(135deg, #10b981, #059669)'}}>
                <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              </div>
            </div>
            <h3 style={styles.optionTitle}>View Grades</h3>
            <p style={styles.optionDescription}>Check your grades and academic performance for all submissions</p>
            <div style={styles.cardArrow}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    padding: '40px 20px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  dashboard: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
  },
  welcomeSection: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  avatarCircle: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
    color: 'white',
    boxShadow: '0 10px 40px rgba(99, 102, 241, 0.4)',
  },
  welcomeTitle: {
    fontSize: '2.5rem',
    fontWeight: 800,
    color: 'white',
    marginBottom: '12px',
    letterSpacing: '-0.02em',
  },
  welcomeSubtitle: {
    fontSize: '1.1rem',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 400,
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '30px',
  },
  optionCard: {
    background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    padding: '40px 30px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 10px 30px rgba(12, 14, 20, 0.25)',
    position: 'relative',
    overflow: 'hidden',
  },
  cardIconWrapper: {
    marginBottom: '24px',
  },
  cardIconBg: {
    width: '70px',
    height: '70px',
    borderRadius: '20px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    color: 'white',
    boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
  },
  optionTitle: {
    fontSize: '1.4rem',
    fontWeight: 700,
    color: 'white',
    marginBottom: '12px',
  },
  optionDescription: {
    fontSize: '0.95rem',
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  cardArrow: {
    color: 'rgba(255, 255, 255, 0.5)',
    transition: 'transform 200ms ease',
  },
};
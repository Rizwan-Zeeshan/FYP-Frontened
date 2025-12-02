import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ViewGrades() {
  const navigate = useNavigate();
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [studentInfo, setStudentInfo] = useState(null);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      // First get student info
      const statusRes = await axios.get('http://localhost:8080/student/status', {
        withCredentials: true
      });
      setStudentInfo(statusRes.data);

      // Then get submissions with grades
      const res = await axios.get('http://localhost:8080/student/mysubmissions', {
        withCredentials: true
      });
      setGrades(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load grades. Please try again.');
      setLoading(false);
    }
  };

  const getGradeColor = (grade) => {
    if (!grade) return { bg: 'rgba(148, 163, 184, 0.2)', text: '#94a3b8' };
    const gradeUpper = grade.toUpperCase();
    if (gradeUpper === 'A' || gradeUpper === 'A+' || gradeUpper === 'A-') 
      return { bg: 'rgba(16, 185, 129, 0.2)', text: '#10b981' };
    if (gradeUpper === 'B' || gradeUpper === 'B+' || gradeUpper === 'B-') 
      return { bg: 'rgba(59, 130, 246, 0.2)', text: '#3b82f6' };
    if (gradeUpper === 'C' || gradeUpper === 'C+' || gradeUpper === 'C-') 
      return { bg: 'rgba(245, 158, 11, 0.2)', text: '#f59e0b' };
    if (gradeUpper === 'D' || gradeUpper === 'D+' || gradeUpper === 'D-') 
      return { bg: 'rgba(249, 115, 22, 0.2)', text: '#f97316' };
    if (gradeUpper === 'F') 
      return { bg: 'rgba(239, 68, 68, 0.2)', text: '#ef4444' };
    return { bg: 'rgba(148, 163, 184, 0.2)', text: '#94a3b8' };
  };

  const getDocTypeInfo = (docType) => {
    const types = {
      'proposal': { label: 'Proposal', color: '#6366f1', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
      'design_document': { label: 'Design Document', color: '#06b6d4', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
      'test_document': { label: 'Test Document', color: '#f59e0b', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
      'thesis': { label: 'Thesis', color: '#10b981', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' }
    };
    return types[docType] || { label: docType, color: '#6366f1', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' };
  };

  const calculateOverallGrade = () => {
    const gradedSubmissions = grades.filter(g => g.submission?.grade);
    if (gradedSubmissions.length === 0) return null;
    
    const gradePoints = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'D-': 0.7,
      'F': 0.0
    };
    
    let total = 0;
    let count = 0;
    gradedSubmissions.forEach(g => {
      const grade = g.submission.grade?.toUpperCase();
      if (gradePoints[grade] !== undefined) {
        total += gradePoints[grade];
        count++;
      }
    });
    
    if (count === 0) return null;
    const gpa = total / count;
    
    if (gpa >= 3.7) return 'A';
    if (gpa >= 3.3) return 'B+';
    if (gpa >= 3.0) return 'B';
    if (gpa >= 2.7) return 'B-';
    if (gpa >= 2.3) return 'C+';
    if (gpa >= 2.0) return 'C';
    if (gpa >= 1.7) return 'C-';
    if (gpa >= 1.3) return 'D+';
    if (gpa >= 1.0) return 'D';
    return 'F';
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingWrapper}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading grades...</p>
        </div>
      </div>
    );
  }

  const overallGrade = calculateOverallGrade();
  const overallColor = getGradeColor(overallGrade);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <button 
            style={styles.backBtn}
            onClick={() => navigate('/Dashboard1')}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            Back
          </button>
          <div style={styles.headerContent}>
            <div style={styles.headerIcon}>
              <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
            <h1 style={styles.title}>View Grades</h1>
            <p style={styles.subtitle}>Track your academic performance across all submissions</p>
          </div>
        </div>

        {error && (
          <div style={styles.errorBox}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            {error}
          </div>
        )}

        {/* Overall Grade Card */}
        <div style={styles.overallCard}>
          <div style={styles.overallLeft}>
            <h2 style={styles.overallTitle}>Overall Performance</h2>
            <p style={styles.overallSubtitle}>Based on {grades.filter(g => g.submission?.grade).length} graded submissions</p>
            {studentInfo && (
              <div style={styles.studentInfo}>
                <span style={styles.studentName}>{studentInfo.name}</span>
                <span style={styles.studentName}>ID: {studentInfo.student_id}</span>
              </div>
            )}
          </div>
          <div style={styles.overallRight}>
            <div style={{
              ...styles.overallGradeBadge,
              background: overallColor.bg,
              color: overallColor.text,
              borderColor: overallColor.text
            }}>
              {overallGrade || 'N/A'}
            </div>
            <span style={styles.overallLabel}>Overall Grade</span>
          </div>
        </div>

        {/* Grade Stats */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: 'rgba(99, 102, 241, 0.2)'}}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="#6366f1">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
              </svg>
            </div>
            <div style={styles.statContent}>
              <span style={styles.statValue}>{grades.length}</span>
              <span style={styles.statLabel}>Total Submissions</span>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: 'rgba(16, 185, 129, 0.2)'}}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="#10b981">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
              </svg>
            </div>
            <div style={styles.statContent}>
              <span style={styles.statValue}>{grades.filter(g => g.submission?.grade).length}</span>
              <span style={styles.statLabel}>Graded</span>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: 'rgba(245, 158, 11, 0.2)'}}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="#f59e0b">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </div>
            <div style={styles.statContent}>
              <span style={styles.statValue}>{grades.filter(g => !g.submission?.grade).length}</span>
              <span style={styles.statLabel}>Pending</span>
            </div>
          </div>
        </div>

        {/* Grades List */}
        <div style={styles.gradesSection}>
          <h2 style={styles.sectionTitle}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"/>
            </svg>
            Submission Grades
          </h2>

          {grades.length === 0 ? (
            <div style={styles.emptyState}>
              <svg viewBox="0 0 24 24" width="64" height="64" fill="rgba(255,255,255,0.3)">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
              </svg>
              <h3 style={styles.emptyTitle}>No Submissions Yet</h3>
              <p style={styles.emptyText}>Upload your documents to see grades here</p>
              <button 
                style={styles.uploadBtn}
                onClick={() => navigate('/upload-document')}
              >
                Upload Documents
              </button>
            </div>
          ) : (
            <div style={styles.gradesList}>
              {grades.map((item, index) => {
                const docInfo = getDocTypeInfo(item.submission?.doc_type);
                const gradeColor = getGradeColor(item.submission?.grade);
                return (
                  <div key={index} style={styles.gradeCard}>
                    <div style={styles.gradeCardLeft}>
                      <div style={{
                        ...styles.docIcon,
                        background: `${docInfo.color}20`,
                        color: docInfo.color
                      }}>
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d={docInfo.icon}/>
                        </svg>
                      </div>
                      <div style={styles.docInfo}>
                        <h4 style={styles.docTitle}>{item.submission?.filename || 'Unknown File'}</h4>
                        <div style={styles.docMeta}>
                          <span style={{
                            ...styles.docTypeBadge,
                            background: `${docInfo.color}20`,
                            color: docInfo.color
                          }}>
                            {docInfo.label}
                          </span>
                          <span style={styles.docDate}>
                            {item.submission?.submission_datetime 
                              ? new Date(item.submission.submission_datetime).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={styles.gradeCardRight}>
                      <div style={{
                        ...styles.gradeBadge,
                        background: gradeColor.bg,
                        color: gradeColor.text,
                        borderColor: gradeColor.text
                      }}>
                        {item.submission?.grade || 'Pending'}
                      </div>
                      {item.submission?.is_approved && (
                        <span style={styles.approvedBadge}>
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                          </svg>
                          Approved
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
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
  content: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  loadingWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid rgba(255,255,255,0.1)',
    borderTopColor: '#6366f1',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    color: 'rgba(255,255,255,0.7)',
    marginTop: '20px',
    fontSize: '1rem',
  },
  header: {
    marginBottom: '40px',
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '0.9rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 200ms ease',
    marginBottom: '30px',
  },
  headerContent: {
    textAlign: 'center',
  },
  headerIcon: {
    width: '70px',
    height: '70px',
    borderRadius: '20px',
    background: 'linear-gradient(135deg, #10b981, #059669)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
    color: 'white',
    boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
  },
  title: {
    fontSize: '2.2rem',
    fontWeight: 800,
    color: 'white',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.6)',
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    background: 'rgba(239, 68, 68, 0.15)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '12px',
    color: '#ef4444',
    marginBottom: '30px',
  },
  overallCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '30px',
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.1))',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '20px',
    marginBottom: '30px',
  },
  overallLeft: {
    flex: 1,
  },
  overallTitle: {
    fontSize: '1.4rem',
    fontWeight: 700,
    color: 'white',
    marginBottom: '8px',
  },
  overallSubtitle: {
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '15px',
  },
  studentInfo: {
    display: 'flex',
    gap: '15px',
  },
  studentName: {
    fontSize: '0.95rem',
    color: 'rgba(255,255,255,0.8)',
    fontWeight: 500,
  },
  studentId: {
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.5)',
    background: 'rgba(99, 102, 241, 0.2)',
    padding: '4px 10px',
    borderRadius: '6px',
  },
  overallRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  overallGradeBadge: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    fontWeight: 800,
    border: '3px solid',
  },
  overallLabel: {
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.6)',
    fontWeight: 500,
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    marginBottom: '40px',
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '20px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px',
  },
  statIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'white',
  },
  statLabel: {
    fontSize: '0.85rem',
    color: 'rgba(255,255,255,0.6)',
  },
  gradesSection: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px',
    padding: '30px',
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '1.3rem',
    fontWeight: 700,
    color: 'white',
    marginBottom: '25px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
  },
  emptyTitle: {
    fontSize: '1.2rem',
    fontWeight: 600,
    color: 'white',
    marginTop: '20px',
    marginBottom: '10px',
  },
  emptyText: {
    fontSize: '0.95rem',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '25px',
  },
  uploadBtn: {
    padding: '12px 28px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 200ms ease',
  },
  gradesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  gradeCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px',
    transition: 'all 200ms ease',
  },
  gradeCardLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  docIcon: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  docInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  docTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'white',
    margin: 0,
  },
  docMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  docTypeBadge: {
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  docDate: {
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.5)',
  },
  gradeCardRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '8px',
  },
  gradeBadge: {
    padding: '10px 20px',
    borderRadius: '10px',
    fontSize: '1.1rem',
    fontWeight: 700,
    border: '2px solid',
  },
  approvedBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    background: 'rgba(16, 185, 129, 0.2)',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#10b981',
  },
};

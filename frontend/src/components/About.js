// src/components/About.js
import React from "react";

export function About() {
  const teamMembers = [
    {
      name: "Muhammad Rizwan",
      role: "Frontend Developer",
      passion: "Building scalable web applications & solving complex problems",
      skills: ["React", "Spring Boot", "Database Design"],
      gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    },
    {
      name: "Ahmad Ali",
      role: "App Developer",
      passion: "Creating mobile applications & system architecture",
      skills: ["Java", "REST APIs", "Security", "Flutter"],
      gradient: "linear-gradient(135deg, #ec4899, #f97316)",
    },
    {
      name: "Faseeh Ur Rehman",
      role: "Backend Developer",
      passion: "Designing robust backend systems & APIs",
      skills: ["UI/UX", "Python", "Django"],
      gradient: "linear-gradient(135deg, #14b8a6, #06b6d4)",
    },
  ];

  return (
    <section id="about" style={styles.section}>
      {/* Background decorations */}
      <div style={styles.bgDecor1}></div>
      <div style={styles.bgDecor2}></div>
      <div style={styles.bgDecor3}></div>

      <div style={styles.content}>
        {/* Header Section */}
        <div style={styles.header}>
          <span style={styles.tagline}>WHO WE ARE</span>
          <h1 style={styles.title}>Meet The Team Behind</h1>
          <h2 style={styles.subtitle}>FYP Management System</h2>
          <p style={styles.description}>
            Three passionate developers united by a common goal — to revolutionize 
            how Final Year Projects are managed, submitted, and evaluated. We believe 
            in creating technology that makes academic life simpler and more efficient.
          </p>
        </div>

        {/* Mission Statement */}
        <div style={styles.missionBox}>
          <h3 style={styles.missionTitle}>Our Mission</h3>
          <p style={styles.missionText}>
            "To bridge the gap between students and faculty through an intuitive platform 
            that streamlines document submissions, feedback, and project tracking — 
            empowering the next generation of innovators."
          </p>
        </div>

        {/* Team Cards */}
        <div style={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div key={index} style={styles.teamCard}>
              {/* Avatar */}
              <div style={{...styles.avatar, background: member.gradient}}>
                <span style={styles.avatarText}>{member.name.charAt(0)}</span>
              </div>
              
              {/* Name & Role */}
              <h3 style={styles.memberName}>{member.name}</h3>
              <span style={{...styles.memberRole, background: member.gradient}}>
                {member.role}
              </span>
              
              {/* Passion */}
              <p style={styles.memberPassion}>"{member.passion}"</p>
              
              {/* Skills Box */}
              <div style={styles.skillsBox}>
                <div style={styles.skillsHeader}>
                  <span style={styles.skillsIcon}>⚡</span>
                  <span style={styles.skillsTitle}>Skills</span>
                </div>
                <div style={styles.skillsContainer}>
                  {member.skills.map((skill, idx) => (
                    <span 
                      key={idx} 
                      style={{
                        ...styles.skillBadge,
                        background: `linear-gradient(135deg, ${member.gradient.includes('#6366f1') ? '#6366f1, #8b5cf6' : member.gradient.includes('#ec4899') ? '#ec4899, #f97316' : '#14b8a6, #06b6d4'})`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* What We Do Section */}
        <div style={styles.whatWeDo}>
          <h3 style={styles.sectionTitle}>What We Built</h3>
          <div style={styles.featuresGrid}>
            <div style={styles.featureItem}>
              <div style={styles.featureIcon}>📄</div>
              <h4 style={styles.featureTitle}>Document Management</h4>
              <p style={styles.featureText}>Upload proposals, designs, tests & thesis with ease</p>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.featureIcon}>💬</div>
              <h4 style={styles.featureTitle}>Real-time Feedback</h4>
              <p style={styles.featureText}>Get supervisor feedback instantly on submissions</p>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.featureIcon}>📊</div>
              <h4 style={styles.featureTitle}>Progress Tracking</h4>
              <p style={styles.featureText}>Monitor your FYP journey from start to finish</p>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.featureIcon}>🔒</div>
              <h4 style={styles.featureTitle}>Secure Platform</h4>
              <p style={styles.featureText}>Role-based access for students & faculty</p>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div style={styles.quoteSection}>
          <p style={styles.bigQuote}>
            "Code is like humor. When you have to explain it, it's bad."
          </p>
          <span style={styles.quoteAuthor}>— Cory House</span>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
      `}</style>
    </section>
  );
}

const styles = {
  section: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "80px 20px",
    background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    position: "relative",
    overflow: "hidden",
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
  bgDecor3: {
    position: "absolute",
    top: "40%",
    left: "50%",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)",
    animation: "pulse 4s ease-in-out infinite",
  },
  content: {
    maxWidth: "1200px",
    position: "relative",
    zIndex: 10,
  },
  header: {
    marginBottom: "60px",
  },
  tagline: {
    display: "inline-block",
    padding: "8px 20px",
    background: "rgba(99, 102, 241, 0.2)",
    borderRadius: "50px",
    color: "#a5b4fc",
    fontSize: "0.85rem",
    fontWeight: 600,
    letterSpacing: "0.15em",
    marginBottom: "20px",
  },
  title: {
    fontSize: "3.5rem",
    fontWeight: 800,
    color: "#ffffff",
    marginBottom: "10px",
    letterSpacing: "-0.02em",
    textShadow: "0 4px 30px rgba(99, 102, 241, 0.5)",
  },
  subtitle: {
    fontSize: "2.5rem",
    fontWeight: 700,
    background: "linear-gradient(135deg, #6366f1, #ec4899, #f59e0b)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "30px",
  },
  description: {
    fontSize: "1.2rem",
    lineHeight: 1.8,
    color: "rgba(255, 255, 255, 0.7)",
    maxWidth: "800px",
    margin: "0 auto",
  },
  missionBox: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "40px",
    marginBottom: "60px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  missionTitle: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: "15px",
  },
  missionText: {
    fontSize: "1.1rem",
    fontStyle: "italic",
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 1.8,
  },
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    marginBottom: "60px",
  },
  teamCard: {
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "24px",
    padding: "40px 30px",
    boxShadow: "0 25px 60px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    margin: "0 auto 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 30px rgba(99, 102, 241, 0.4)",
  },
  avatarText: {
    fontSize: "2.5rem",
    fontWeight: 700,
    color: "white",
  },
  memberName: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#1e293b",
    marginBottom: "10px",
  },
  memberRole: {
    display: "inline-block",
    padding: "6px 16px",
    borderRadius: "50px",
    color: "white",
    fontSize: "0.85rem",
    fontWeight: 600,
    marginBottom: "20px",
  },
  memberPassion: {
    fontSize: "1rem",
    color: "#64748b",
    fontStyle: "italic",
    marginBottom: "20px",
    lineHeight: 1.6,
  },
  skillsBox: {
    background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
    borderRadius: "16px",
    padding: "20px",
    border: "2px solid #e2e8f0",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08), inset 0 2px 4px rgba(255, 255, 255, 0.8)",
  },
  skillsHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "15px",
    paddingBottom: "12px",
    borderBottom: "2px dashed #cbd5e1",
  },
  skillsIcon: {
    fontSize: "1.2rem",
  },
  skillsTitle: {
    fontSize: "0.9rem",
    fontWeight: 700,
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  },
  skillsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
  },
  skillBadge: {
    padding: "8px 18px",
    borderRadius: "12px",
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "white",
    boxShadow: "0 4px 12px rgba(99, 102, 241, 0.35)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "default",
  },
  whatWeDo: {
    marginBottom: "60px",
  },
  sectionTitle: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: "40px",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
  },
  featureItem: {
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    padding: "30px 20px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  featureIcon: {
    fontSize: "2.5rem",
    marginBottom: "15px",
  },
  featureTitle: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "#ffffff",
    marginBottom: "10px",
  },
  featureText: {
    fontSize: "0.9rem",
    color: "rgba(255, 255, 255, 0.6)",
    lineHeight: 1.5,
  },
  quoteSection: {
    padding: "40px",
    background: "rgba(99, 102, 241, 0.1)",
    borderRadius: "20px",
    border: "1px solid rgba(99, 102, 241, 0.3)",
  },
  bigQuote: {
    fontSize: "1.8rem",
    fontWeight: 600,
    color: "#ffffff",
    fontStyle: "italic",
    marginBottom: "15px",
    lineHeight: 1.5,
  },
  quoteAuthor: {
    fontSize: "1rem",
    color: "#a5b4fc",
    fontWeight: 500,
  },
};

export default About;

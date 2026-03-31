import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import sjcetLogo from '../assets/sjcet-logo.png';

const Landing = () => {
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('landingTheme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.setAttribute('data-bs-theme', 'dark');
            document.body.classList.add('dark-mode-active');
        } else if (savedTheme === 'light') {
            setIsDarkMode(false);
            document.documentElement.setAttribute('data-bs-theme', 'light');
            document.body.classList.remove('dark-mode-active');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(prefersDark);
            document.documentElement.setAttribute('data-bs-theme', prefersDark ? 'dark' : 'light');
            if (prefersDark) document.body.classList.add('dark-mode-active');
        }
    }, []);

    const handleRoleSelection = (role) => {
        localStorage.setItem('selectedRole', role);
        navigate('/login');
    };

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        const theme = newMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('landingTheme', theme);

        if (newMode) {
            document.body.classList.add('dark-mode-active');
        } else {
            document.body.classList.remove('dark-mode-active');
        }
    };

    return (
        <div className="landing-wrapper">
            {/* Dark Mode Toggle Button */}
            <button
                onClick={toggleDarkMode}
                className="dark-mode-toggle"
                aria-label="Toggle dark mode"
            >
                {isDarkMode ? (
                    <i className="bi bi-sun-fill"></i>
                ) : (
                    <i className="bi bi-moon-fill"></i>
                )}
            </button>

            {/* Animated Background */}
            <div className="animated-bg">
                <div className="gradient-sphere sphere-1"></div>
                <div className="gradient-sphere sphere-2"></div>
                <div className="gradient-sphere sphere-3"></div>
            </div>

            <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-4 py-md-5">
                <div className="landing-card animate-slide-up">
                    {/* Decorative Elements */}
                    <div className="decorative-blob blob-1"></div>
                    <div className="decorative-blob blob-2"></div>
                    <div className="decorative-blob blob-3"></div>

                    {/* Logo Section */}
                    <div className="logo-section animate-float">
                        <img
                            src={sjcetLogo}
                            alt="SJCET Logo"
                            className="sjcet-logo"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://upload.wikimedia.org/wikipedia/en/2/22/SJCET_Palai_Logo.png';
                            }}
                        />
                    </div>

                    {/* Title Section */}
                    <div className="title-section">
                        <h1 className="main-title animate-fade-in">
                            Welcome to <span className="gradient-text">SJCET</span>
                        </h1>
                        <h2 className="subtitle animate-fade-in-delay">
                            Campus Complaint Portal
                        </h2>
                    </div>

                    {/* Description */}
                    <div className="description-section animate-fade-in-delay-2">
                        <p className="description-text">
                            <i className="bi bi-megaphone-fill me-2"></i>
                            Report issues. Track progress. Improve campus life.
                        </p>
                        <p className="highlight-text">
                            A unified platform designed to ensure your voice is heard instantly by the administration.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="stats-grid animate-scale-in">
                        <div className="stat-card">
                            <i className="bi bi-check-circle-fill stat-icon"></i>
                            <div className="stat-content">
                                <span className="stat-number">1,284+</span>
                                <span className="stat-label">Issues Resolved</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <i className="bi bi-clock-history stat-icon"></i>
                            <div className="stat-content">
                                <span className="stat-number">24/7</span>
                                <span className="stat-label">Active Support</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <i className="bi bi-people-fill stat-icon"></i>
                            <div className="stat-content">
                                <span className="stat-number">2.5K+</span>
                                <span className="stat-label">Active Users</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <i className="bi bi-star-fill stat-icon"></i>
                            <div className="stat-content">
                                <span className="stat-number">98%</span>
                                <span className="stat-label">Satisfaction Rate</span>
                            </div>
                        </div>
                    </div>

                    {/* Features Section */}
                    <div className="features-section animate-fade-in-delay-3">
                        <div className="feature-item">
                            <i className="bi bi-shield-check"></i>
                            <span>Secure & Encrypted</span>
                        </div>
                        <div className="feature-item">
                            <i className="bi bi-clock"></i>
                            <span>Real-time Tracking</span>
                        </div>
                        <div className="feature-item">
                            <i className="bi bi-chat-dots"></i>
                            <span>Direct Communication</span>
                        </div>
                        <div className="feature-item">
                            <i className="bi bi-graph-up"></i>
                            <span>Analytics Dashboard</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="button-group animate-scale-in-delay">
                        <button
                            onClick={() => handleRoleSelection('student')}
                            className="btn-primary-custom"
                        >
                            <i className="bi bi-person-fill"></i>
                            <span>Continue as Student</span>
                            <i className="bi bi-arrow-right-short arrow-icon"></i>
                        </button>
                        <button
                            onClick={() => handleRoleSelection('admin')}
                            className="btn-secondary-custom"
                        >
                            <i className="bi bi-shield-lock-fill"></i>
                            <span>Continue as Admin</span>
                            <i className="bi bi-arrow-right-short arrow-icon"></i>
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="footer-section animate-fade-in-delay-4">
                        <div className="footer-badge">
                            <i className="bi bi-building"></i>
                            <span>St. Joseph's College of Engineering and Technology, Palai</span>
                        </div>
                        <div className="footer-links">
                            <a href="#" className="footer-link">Privacy Policy</a>
                            <span className="separator">•</span>
                            <a href="#" className="footer-link">Terms of Service</a>
                            <span className="separator">•</span>
                            <a href="#" className="footer-link">Contact Support</a>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx="true">{`
                /* Global Dark Mode Styles */
                body {
                    margin: 0;
                    padding: 0;
                    transition: background-color 0.3s ease;
                }
                
                body.dark-mode-active {
                    background: linear-gradient(135deg, #0f172a 0%, #1e1b2e 50%, #1a1c2c 100%);
                }
                
                body:not(.dark-mode-active) {
                    background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
                }
                
                /* Dark Mode Toggle Button */
                .dark-mode-toggle {
                    position: fixed;
                    top: 25px;
                    right: 25px;
                    z-index: 1100;
                    width: 52px;
                    height: 52px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.95);
                    border: 2px solid rgba(13, 71, 161, 0.2);
                    color: #0d47a1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    backdrop-filter: blur(10px);
                }
                
                body.dark-mode-active .dark-mode-toggle {
                    background: rgba(30, 41, 59, 0.95);
                    border-color: rgba(66, 165, 245, 0.3);
                    color: #ffd966;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                }
                
                .dark-mode-toggle:hover {
                    transform: scale(1.1) rotate(15deg);
                }
                
                /* Landing Wrapper */
                .landing-wrapper {
                    position: relative;
                    min-height: 100vh;
                    overflow-x: hidden;
                }
                
                /* Animated Background */
                .animated-bg {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                    overflow: hidden;
                }
                
                .gradient-sphere {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    opacity: 0.4;
                    animation: floatSlow 25s infinite ease-in-out;
                }
                
                body.dark-mode-active .gradient-sphere {
                    opacity: 0.25;
                }
                
                .sphere-1 {
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, #0d47a1, #42a5f5);
                    top: -200px;
                    left: -150px;
                    animation-delay: 0s;
                }
                
                .sphere-2 {
                    width: 600px;
                    height: 600px;
                    background: radial-gradient(circle, #7b1fa2, #ba68c8);
                    bottom: -250px;
                    right: -150px;
                    animation-delay: 5s;
                }
                
                .sphere-3 {
                    width: 450px;
                    height: 450px;
                    background: radial-gradient(circle, #006064, #26c6da);
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    animation-delay: 10s;
                }
                
                @keyframes floatSlow {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(50px, -50px) scale(1.1); }
                    66% { transform: translate(-30px, 30px) scale(0.9); }
                }
                
                /* Landing Card - Perfect Browser Fit */
                .landing-card {
                    max-width: 1000px;
                    width: 90%;
                    margin: 0 auto;
                    background: rgba(255, 255, 255, 0.98);
                    border-radius: 40px;
                    padding: 3rem 2.5rem;
                    position: relative;
                    z-index: 10;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                }
                
                body.dark-mode-active .landing-card {
                    background: rgba(30, 41, 59, 0.95);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                /* Responsive Card Sizing */
                @media (max-width: 1200px) {
                    .landing-card {
                        max-width: 900px;
                        padding: 2.5rem 2rem;
                    }
                }
                
                @media (max-width: 992px) {
                    .landing-card {
                        max-width: 800px;
                        padding: 2rem 1.8rem;
                    }
                }
                
                @media (max-width: 768px) {
                    .landing-card {
                        width: 95%;
                        padding: 1.8rem 1.5rem;
                        border-radius: 30px;
                    }
                }
                
                @media (max-width: 576px) {
                    .landing-card {
                        width: 98%;
                        padding: 1.5rem 1rem;
                        border-radius: 25px;
                    }
                }
                
                /* Logo Section */
                .logo-section {
                    text-align: center;
                    margin-bottom: 1.5rem;
                }
                
                .sjcet-logo {
                    width: 110px;
                    height: auto;
                    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
                }
                
                body.dark-mode-active .sjcet-logo {
                    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
                }
                
                @media (max-width: 768px) {
                    .sjcet-logo {
                        width: 90px;
                    }
                }
                
                /* Title Section */
                .title-section {
                    text-align: center;
                    margin-bottom: 1.2rem;
                }
                
                .main-title {
                    font-size: 3rem;
                    font-weight: 900;
                    margin-bottom: 0.5rem;
                    color: #1e293b;
                    letter-spacing: -1px;
                }
                
                body.dark-mode-active .main-title {
                    color: #f1f5f9;
                }
                
                .gradient-text {
                    background: linear-gradient(135deg, #0d47a1, #42a5f5, #7b1fa2);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    background-size: 200% 200%;
                    animation: gradientShift 3s ease infinite;
                }
                
                .subtitle {
                    font-size: 1.8rem;
                    font-weight: 700;
                    color: #0d47a1;
                    margin: 0;
                }
                
                body.dark-mode-active .subtitle {
                    color: #60a5fa;
                }
                
                @media (max-width: 768px) {
                    .main-title {
                        font-size: 2rem;
                    }
                    .subtitle {
                        font-size: 1.3rem;
                    }
                }
                
                @media (max-width: 480px) {
                    .main-title {
                        font-size: 1.6rem;
                    }
                    .subtitle {
                        font-size: 1.1rem;
                    }
                }
                
                /* Description Section */
                .description-section {
                    text-align: center;
                    margin-bottom: 2rem;
                }
                
                .description-text {
                    font-size: 1.15rem;
                    color: #475569;
                    margin-bottom: 0.8rem;
                }
                
                body.dark-mode-active .description-text {
                    color: #cbd5e1;
                }
                
                .highlight-text {
                    font-size: 1rem;
                    color: #0d47a1;
                    font-weight: 500;
                    background: rgba(13, 71, 161, 0.1);
                    display: inline-block;
                    padding: 0.3rem 1rem;
                    border-radius: 50px;
                }
                
                body.dark-mode-active .highlight-text {
                    color: #90caf9;
                    background: rgba(96, 165, 250, 0.15);
                }
                
                @media (max-width: 768px) {
                    .description-text {
                        font-size: 1rem;
                    }
                    .highlight-text {
                        font-size: 0.9rem;
                    }
                }
                
                /* Stats Grid */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1rem;
                    margin-bottom: 2.5rem;
                }
                
                .stat-card {
                    background: rgba(13, 71, 161, 0.05);
                    border-radius: 20px;
                    padding: 1.2rem 0.8rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.8rem;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(13, 71, 161, 0.1);
                }
                
                body.dark-mode-active .stat-card {
                    background: rgba(96, 165, 250, 0.1);
                    border-color: rgba(96, 165, 250, 0.2);
                }
                
                .stat-card:hover {
                    transform: translateY(-5px);
                    background: rgba(13, 71, 161, 0.1);
                }
                
                .stat-icon {
                    font-size: 2rem;
                    color: #0d47a1;
                }
                
                body.dark-mode-active .stat-icon {
                    color: #60a5fa;
                }
                
                .stat-content {
                    text-align: center;
                }
                
                .stat-number {
                    display: block;
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #0d47a1;
                }
                
                body.dark-mode-active .stat-number {
                    color: #f1f5f9;
                }
                
                .stat-label {
                    font-size: 0.85rem;
                    color: #64748b;
                }
                
                body.dark-mode-active .stat-label {
                    color: #94a3b8;
                }
                
                @media (max-width: 992px) {
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1rem;
                    }
                }
                
                @media (max-width: 576px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
                
                /* Features Section */
                .features-section {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 1.5rem;
                    margin-bottom: 2.5rem;
                    padding: 1rem 0;
                }
                
                .feature-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    background: rgba(13, 71, 161, 0.05);
                    border-radius: 50px;
                    color: #0d47a1;
                    font-size: 0.9rem;
                    font-weight: 500;
                }
                
                body.dark-mode-active .feature-item {
                    background: rgba(96, 165, 250, 0.1);
                    color: #90caf9;
                }
                
                .feature-item i {
                    font-size: 1.1rem;
                }
                
                @media (max-width: 768px) {
                    .features-section {
                        gap: 1rem;
                    }
                    .feature-item {
                        font-size: 0.8rem;
                        padding: 0.4rem 0.8rem;
                    }
                }
                
                /* Button Group */
                .button-group {
                    display: flex;
                    gap: 1.5rem;
                    justify-content: center;
                    margin-bottom: 2rem;
                    flex-wrap: wrap;
                }
                
                .btn-primary-custom, .btn-secondary-custom {
                    padding: 1rem 2rem;
                    font-size: 1rem;
                    font-weight: 600;
                    border: none;
                    border-radius: 60px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.8rem;
                    position: relative;
                    overflow: hidden;
                }
                
                .btn-primary-custom {
                    background: linear-gradient(135deg, #0d47a1, #1976d2);
                    color: white;
                    box-shadow: 0 4px 15px rgba(13, 71, 161, 0.3);
                }
                
                .btn-primary-custom:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(13, 71, 161, 0.4);
                }
                
                .btn-secondary-custom {
                    background: transparent;
                    color: #0d47a1;
                    border: 2px solid #0d47a1;
                }
                
                body.dark-mode-active .btn-secondary-custom {
                    color: #90caf9;
                    border-color: #90caf9;
                }
                
                .btn-secondary-custom:hover {
                    background: rgba(13, 71, 161, 0.1);
                    transform: translateY(-3px);
                }
                
                .arrow-icon {
                    transition: transform 0.3s ease;
                    font-size: 1.2rem;
                }
                
                .btn-primary-custom:hover .arrow-icon,
                .btn-secondary-custom:hover .arrow-icon {
                    transform: translateX(5px);
                }
                
                @media (max-width: 576px) {
                    .btn-primary-custom, .btn-secondary-custom {
                        width: 100%;
                        justify-content: center;
                        padding: 0.9rem 1.5rem;
                    }
                }
                
                /* Footer Section */
                .footer-section {
                    text-align: center;
                    padding-top: 1.5rem;
                    border-top: 1px solid rgba(0, 0, 0, 0.1);
                }
                
                body.dark-mode-active .footer-section {
                    border-top-color: rgba(255, 255, 255, 0.1);
                }
                
                .footer-badge {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    font-size: 0.85rem;
                    color: #64748b;
                    margin-bottom: 0.8rem;
                }
                
                body.dark-mode-active .footer-badge {
                    color: #94a3b8;
                }
                
                .footer-links {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.8rem;
                    flex-wrap: wrap;
                }
                
                .footer-link {
                    color: #0d47a1;
                    text-decoration: none;
                    font-size: 0.8rem;
                    transition: color 0.3s ease;
                }
                
                body.dark-mode-active .footer-link {
                    color: #90caf9;
                }
                
                .footer-link:hover {
                    text-decoration: underline;
                }
                
                .separator {
                    color: #cbd5e1;
                }
                
                @media (max-width: 768px) {
                    .footer-badge {
                        font-size: 0.75rem;
                        flex-direction: column;
                    }
                    .footer-links {
                        gap: 0.5rem;
                    }
                    .footer-link {
                        font-size: 0.7rem;
                    }
                }
                
                /* Decorative Blobs */
                .decorative-blob {
                    position: absolute;
                    border-radius: 50%;
                    background: linear-gradient(135deg, rgba(13, 71, 161, 0.08), rgba(66, 165, 245, 0.04));
                    pointer-events: none;
                    z-index: -1;
                }
                
                .blob-1 {
                    width: 250px;
                    height: 250px;
                    top: -100px;
                    right: -80px;
                    animation: blobMove 12s infinite alternate;
                }
                
                .blob-2 {
                    width: 200px;
                    height: 200px;
                    bottom: -60px;
                    left: -60px;
                    animation: blobMove 15s infinite alternate-reverse;
                }
                
                .blob-3 {
                    width: 150px;
                    height: 150px;
                    bottom: 20%;
                    right: 10%;
                    animation: blobMove 10s infinite alternate;
                }
                
                @keyframes blobMove {
                    0% { transform: translate(0, 0) scale(1); }
                    100% { transform: translate(30px, -30px) scale(1.1); }
                }
                
                /* Animations */
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                @keyframes floatAnimation {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                .animate-slide-up {
                    animation: slideUp 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
                }
                
                .animate-fade-in {
                    animation: fadeIn 1s ease forwards;
                }
                
                .animate-fade-in-delay {
                    animation: fadeIn 1s ease 0.2s forwards;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                
                .animate-fade-in-delay-2 {
                    animation: fadeIn 1s ease 0.4s forwards;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                
                .animate-fade-in-delay-3 {
                    animation: fadeIn 1s ease 0.6s forwards;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                
                .animate-fade-in-delay-4 {
                    animation: fadeIn 1s ease 0.8s forwards;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                
                .animate-scale-in {
                    animation: scaleIn 0.6s ease 0.3s forwards;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                
                .animate-scale-in-delay {
                    animation: scaleIn 0.6s ease 0.5s forwards;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                
                .animate-float {
                    animation: floatAnimation 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default Landing;
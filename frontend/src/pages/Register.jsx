import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import sjcetLogo from '../assets/sjcet-logo.png';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const selectedRole = localStorage.getItem('selectedRole') || 'student';

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.post('/auth/register', { name, email, password });
            navigate('/login');
        } catch (err) {
            console.error('Register Error:', err);
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card position-relative">
                <Link to="/" className="position-absolute top-0 start-0 m-3 text-secondary text-decoration-none border-0 bg-transparent">
                    <i className="bi bi-arrow-left me-1"></i> Back
                </Link>

                <div className="auth-header mt-3">
                    <img src={sjcetLogo} alt="SJCET Logo" className="auth-logo" onError={(e) => { e.target.onerror = null; e.target.src = 'https://upload.wikimedia.org/wikipedia/en/2/22/SJCET_Palai_Logo.png'; }} />
                    <h3 className="fw-bolder text-dynamic mb-1">Create Account</h3>
                    <p className="text-dynamic-muted small mb-0 d-flex justify-content-center align-items-center gap-1">
                        Register as a <span className="badge bg-primary ms-1">{selectedRole.toUpperCase()}</span>
                    </p>
                </div>
                
                <div className="auth-body" style={{ borderTop: '1px solid var(--border-color)' }}>
                    {error && (
                        <div className="alert alert-danger d-flex align-items-center mb-4 py-2 border-0" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                            <i className="bi bi-exclamation-circle-fill me-2"></i> {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister}>
                        <div className="mb-3">
                            <label className="form-label text-dynamic-muted fw-bold small text-uppercase">Full Name</label>
                            <div className="input-group">
                                <span className="input-group-text custom-prepend"><i className="bi bi-person"></i></span>
                                <input 
                                    type="text" 
                                    className="form-control form-control-custom border-start-0 ps-0" 
                                    placeholder="Student Name"
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    disabled={loading}
                                    required 
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label text-dynamic-muted fw-bold small text-uppercase">Email Address</label>
                            <div className="input-group">
                                <span className="input-group-text custom-prepend"><i className="bi bi-envelope"></i></span>
                                <input 
                                    type="email" 
                                    className="form-control form-control-custom border-start-0 ps-0" 
                                    placeholder="yourname@sjcet.edu"
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    disabled={loading}
                                    required 
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="form-label text-dynamic-muted fw-bold small text-uppercase">Password</label>
                            <div className="input-group">
                                <span className="input-group-text custom-prepend"><i className="bi bi-lock"></i></span>
                                <input 
                                    type="password" 
                                    className="form-control form-control-custom border-start-0 ps-0" 
                                    placeholder="••••••••"
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    disabled={loading}
                                    required 
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary-custom w-100 text-white shadow-sm" disabled={loading}>
                            {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Create Profile'}
                        </button>
                    </form>
                    
                    <div className="mt-4 text-center">
                        <span className="text-dynamic-muted small">Already have an account? </span>
                        <Link to="/login" className="text-primary fw-bold text-decoration-none small">
                            Login here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

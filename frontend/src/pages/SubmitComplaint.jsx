import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const SubmitComplaint = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            await api.post('/complaints', { title, description, category });
            
            // Show Success Toast inside UI
            setSuccessMessage('Complaint submitted successfully!');
            
            // Clean forms natively
            setTitle('');
            setDescription('');
            setCategory('');

            // Automatically redirect to Dashboard seamlessly
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);

        } catch (err) {
            console.error('Submit Error:', err);
            setErrorMessage(err.response?.data?.message || 'Could not process submission. Please ensure all inputs are filled.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto" style={{ maxWidth: '800px' }}>
            <div className="mb-4">
               <h2 className="fw-bolder mb-1 text-dynamic">Lodge New Report</h2>
               <p className="text-dynamic-muted fw-medium mb-0">Send issues directly to campus management.</p>
            </div>

            {errorMessage && (
                <div className="alert alert-danger fw-bold shadow-sm rounded-3 py-3 border-0 mb-4 glass-alert d-flex align-items-center">
                    <i className="bi bi-x-circle-fill fs-5 me-2 text-danger"></i> {errorMessage}
                </div>
            )}

            {successMessage && (
                <div className="alert alert-success fw-bold shadow-sm rounded-3 py-3 border-0 mb-4 glass-alert d-flex align-items-center" style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#16a34a' }}>
                    <i className="bi bi-check-circle-fill fs-5 me-2 text-success"></i> {successMessage}
                </div>
            )}

            <div className="dynamic-card p-4 p-md-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="form-label text-dynamic-muted fw-bold text-uppercase small"><i className="bi bi-fonts me-2"></i>Issue Title</label>
                        <input
                            type="text"
                            className="form-control form-control-custom w-100"
                            placeholder="E.g., Missing Projector in Room 2B"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            disabled={loading || successMessage}
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="form-label text-dynamic-muted fw-bold text-uppercase small"><i className="bi bi-tags-fill me-2"></i>Category</label>
                        <select
                            className="form-select form-control-custom w-100"
                            style={{ backgroundImage: 'none' }}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                            disabled={loading || successMessage}
                        >
                            <option value="">Choose category...</option>
                            <option value="Hostel">Hostel & Dorms</option>
                            <option value="Academics">Academics</option>
                            <option value="IT Support">IT & Networking</option>
                            <option value="Maintenance">Infrastructure Maintenance</option>
                            <option value="Other">Other / General</option>
                        </select>
                    </div>

                    <div className="mb-5">
                        <label className="form-label text-dynamic-muted fw-bold text-uppercase small"><i className="bi bi-justify-left me-2"></i>Detailed Description</label>
                        <textarea
                            className="form-control form-control-custom w-100"
                            rows="6"
                            placeholder="Provide deep context, timestamps, or locations so admins can resolve this quickly..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            disabled={loading || successMessage}
                        ></textarea>
                    </div>
                    
                    <div className="d-flex justify-content-end gap-3 mt-4 pt-4 border-top" style={{ borderColor: 'var(--border-color)'}}>
                        <button type="button" className="btn btn-light fw-bold px-4" onClick={() => navigate('/dashboard')} disabled={loading}>
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="btn btn-primary-custom text-white fw-bold px-5"
                            disabled={loading || successMessage}
                        >
                            {loading ? (
                                <span><span className="spinner-border spinner-border-sm me-2"></span>Submitting...</span>
                            ) : (
                                "Submit Report"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubmitComplaint;

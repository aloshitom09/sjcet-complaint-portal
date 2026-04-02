import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ComplaintCard from '../components/ComplaintCard';
import { Link } from 'react-router-dom';

const MyComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            // Using the new user-specific endpoint
            const response = await api.get('/complaints/user');
            setComplaints(response.data);
        } catch (err) {
            console.error('Error fetching complaints:', err);
            setError('Failed to fetch your complaints.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center h-100 mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger rounded-3 shadow-sm border-0">{error}</div>
        );
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-black mb-1" style={{ color: '#2b3674', fontWeight: 800 }}>My Complaints</h2>
                    <p className="text-muted mb-0 fw-medium">View and track the status of issues you've reported.</p>
                </div>
                <Link to="/submit" className="btn btn-primary fw-bold px-4 py-2 rounded-pill shadow-sm d-none d-md-block">
                    + Submit New
                </Link>
            </div>

            {complaints.length === 0 ? (
                <div className="card border-0 shadow-sm p-5 text-center bg-white" style={{ borderRadius: '20px' }}>
                    <div className="mb-4 text-muted" style={{ fontSize: '4rem' }}>📁</div>
                    <h4 className="fw-bold text-dark mb-2" style={{ color: '#2b3674' }}>No complaints yet</h4>
                    <p className="text-muted mb-4 fw-medium">You haven't submitted any campus complaints.</p>
                    <Link to="/submit" className="btn btn-outline-primary fw-bold px-5 py-2 rounded-pill shadow-sm">
                        Start a new report
                    </Link>
                </div>
            ) : (
                <div className="row g-4 mb-5">
                    {complaints.map(complaint => (
                        <div className="col-md-6 col-lg-6 col-xl-4" key={complaint._id}>
                            <ComplaintCard complaint={complaint} isAdmin={false} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyComplaints;

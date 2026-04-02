import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import ComplaintCard from '../components/ComplaintCard';

const AdminDashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    // Default filter to 'All' unless specified in URL query
    const searchParams = new URLSearchParams(location.search);
    const currentFilter = searchParams.get('filter') || 'All';

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const response = await api.get('/complaints');
            setComplaints(response.data);
        } catch (err) {
            console.error('Error fetching admin complaints:', err);
            setError('Failed to fetch the global complaints list.');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (filter) => {
        navigate(`/admin?filter=${filter}`);
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await api.put(`/complaints/${id}`, { status: newStatus });
            // Reconcile state
            setComplaints(complaints.map(c => c._id === id ? { ...c, status: newStatus } : c));
            setSuccessMsg(`Status updated to ${newStatus}`);
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            console.error('Error updating status:', err);
            setError('Failed to update status. Please try again.');
            setTimeout(() => setError(null), 3000);
        }
    };

    const handleRespond = async (id, responseText) => {
        try {
            await api.put(`/complaints/${id}`, { admin_response: responseText });
            setComplaints(complaints.map(c => c._id === id ? { ...c, admin_response: responseText } : c));
            setSuccessMsg('Response saved successfully and published to student!');
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            console.error('Error adding response:', err);
            setError('Failed to add response. Please try again.');
            setTimeout(() => setError(null), 3000);
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
            <div className="alert alert-danger rounded-3 border-0 shadow-sm mt-4">{error}</div>
        );
    }

    const filteredComplaints = complaints.filter(c => {
        if (currentFilter === 'All') return true;
        if (currentFilter === 'In Progress' && c.status === 'In Progress') return true;
        return c.status === currentFilter;
    });

    const filters = [
        { label: 'All', icon: 'bi-border-all' },
        { label: 'Pending', icon: 'bi-clock-history' },
        { label: 'In Progress', icon: 'bi-arrow-repeat' },
        { label: 'Resolved', icon: 'bi-check-circle-fill' },
        { label: 'Rejected', icon: 'bi-x-octagon-fill' }
    ];

    return (
        <div>
            {successMsg && (
                <div className="alert alert-success d-flex align-items-center shadow-sm border-0 rounded-pills mb-4" role="alert">
                    <i className="bi bi-check-circle-fill me-2 fs-5"></i>
                    <div className="fw-bold">{successMsg}</div>
                </div>
            )}
            
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
                <div>
                    <h2 className="fw-black mb-1 text-dynamic" style={{ fontWeight: 800 }}>Admin Panel</h2>
                    <p className="text-dynamic-muted mb-0 fw-medium">Manage and resolve campus complaints globally.</p>
                </div>
                <button className="btn btn-outline-primary fw-bold px-4 rounded-pill shadow-sm" onClick={() => { setLoading(true); fetchComplaints(); }}>
                    <i className="bi bi-arrow-clockwise me-2"></i> Refresh Data
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="d-flex flex-wrap gap-2 mb-4">
                {filters.map(f => (
                    <button
                        key={f.label}
                        onClick={() => handleFilterChange(f.label)}
                        className={`btn rounded-pill px-4 fw-bold shadow-sm d-flex align-items-center gap-2 ${currentFilter === f.label ? 'btn-primary' : 'btn-light text-secondary border'}`}
                    >
                        <i className={`bi ${f.icon}`}></i> {f.label}
                    </button>
                ))}
            </div>

            {filteredComplaints.length === 0 ? (
                <div className="card border-0 shadow-sm p-5 text-center bg-white" style={{ borderRadius: '20px' }}>
                    <div className="mb-3 text-success" style={{ fontSize: '4rem' }}>🎉</div>
                    <h4 className="fw-bold text-dark mb-2" style={{ color: '#2b3674' }}>No active complaints</h4>
                    <p className="text-muted mb-0 fw-medium">The campus is completely issue-free right now.</p>
                </div>
            ) : (
                <div className="row g-4 mb-5">
                    {filteredComplaints.map(complaint => (
                        <div className="col-md-6 col-lg-6 col-xl-4" key={complaint._id}>
                            <ComplaintCard
                                complaint={complaint}
                                isAdmin={true}
                                onStatusUpdate={handleStatusUpdate}
                                onRespond={handleRespond}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;

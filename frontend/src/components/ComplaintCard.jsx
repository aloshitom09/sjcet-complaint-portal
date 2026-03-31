import React, { useState } from 'react';

const ComplaintCard = ({ complaint, isAdmin, onStatusUpdate, onRespond }) => {
    const [responseText, setResponseText] = useState(complaint.admin_response || '');

    const getStatusStyle = (status) => {
        if (!status) return 'status-Pending';
        switch(status) {
            case 'Pending': return 'status-Pending'; 
            case 'In Progress': return 'status-In text-warning'; 
            case 'Resolved': return 'status-Resolved text-success'; 
            case 'Rejected': return 'status-Rejected text-danger'; 
            default: return 'status-Pending';
        }
    };

    const date = complaint.createdAt 
        ? new Date(complaint.createdAt).toLocaleDateString() 
        : new Date().toLocaleDateString();

    const studentName = complaint.student_id ? `${complaint.student_id.name} (${complaint.student_id.email || 'No email'})` : 'Unknown Student';

    return (
        <div className="dynamic-card h-100 p-4 d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="badge rounded-pill text-dynamic-muted border fw-bold tracking-wide" style={{ backgroundColor: 'transparent', borderColor: 'var(--border-color)' }}>
                    {complaint.category}
                </span>
                <span className={`badge rounded-pill px-3 py-1 shadow-sm fs-6 ${getStatusStyle(complaint.status)}`}>
                    {complaint.status || 'Pending'}
                </span>
            </div>
            
            <h5 className="fw-bolder text-dynamic mt-2 mb-2 lh-sm">{complaint.title}</h5>
            {isAdmin && (
                <p className="text-secondary small fw-bold mb-2">
                    <i className="bi bi-person-fill me-1"></i> {studentName}
                </p>
            )}
            
            <p className="text-dynamic-muted small mb-3 flex-grow-1" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                {complaint.description}
            </p>

            {complaint.admin_response && (
                <div className="alert alert-info py-2 px-3 small rounded-3 mt-2">
                    <strong><i className="bi bi-chat-left-text me-2"></i>Admin Response:</strong>
                    <div className="mt-1">{complaint.admin_response}</div>
                </div>
            )}

            {isAdmin && (
                <div className="mt-3 border-top pt-3" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                        <button className="btn btn-sm btn-outline-warning rounded-pill" onClick={() => onStatusUpdate(complaint._id, 'In Progress')}>
                            In Progress
                        </button>
                        <button className="btn btn-sm btn-outline-success rounded-pill" onClick={() => onStatusUpdate(complaint._id, 'Resolved')}>
                            Resolved
                        </button>
                        <button className="btn btn-sm btn-outline-danger rounded-pill" onClick={() => onStatusUpdate(complaint._id, 'Rejected')}>
                            Reject
                        </button>
                    </div>

                    <div className="mb-2">
                        <label className="form-label small fw-bold text-dynamic-muted">Admin Response</label>
                        <textarea 
                            className="form-control form-control-sm mb-2" 
                            style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', border: '1px solid var(--border-color)' }}
                            rows="2" 
                            placeholder="Type response here..."
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                        ></textarea>
                        <button className="btn btn-sm btn-primary w-100 rounded-pill" onClick={() => onRespond(complaint._id, responseText)}>
                            Submit Response
                        </button>
                    </div>
                </div>
            )}

            {!isAdmin && (
                <div className="mt-auto d-flex justify-content-between align-items-center border-top pt-3" style={{ borderColor: 'var(--border-color)' }}>
                    <span className="text-dynamic-muted small fw-medium">
                        <i className="bi bi-calendar-event me-2"></i>{date}
                    </span>
                </div>
            )}
        </div>
    );
};

export default ComplaintCard;

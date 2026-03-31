import React from 'react';

const StatusBadge = ({ status }) => {
    let badgeClass = 'bg-secondary';

    switch (status) {
        case 'Pending':
            badgeClass = 'bg-warning text-dark';
            break;
        case 'In Progress':
            badgeClass = 'bg-info text-dark';
            break;
        case 'Resolved':
            badgeClass = 'bg-success';
            break;
        case 'Rejected':
            badgeClass = 'bg-danger';
            break;
        default:
            badgeClass = 'bg-secondary';
    }

    return (
        <span className={`badge ${badgeClass} rounded-pill px-3 py-2 fw-semibold shadow-sm`} style={{ fontSize: '0.8rem' }}>
            {status}
        </span>
    );
};

export default StatusBadge;

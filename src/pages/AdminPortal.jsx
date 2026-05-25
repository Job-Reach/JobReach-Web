import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, LogOut, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AdminPortal() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchWaitlist();
  }, []);

  const fetchWaitlist = async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setUsers(data || []);
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const { error } = await supabase
        .from('waitlist')
        .update({ status: 'Approved' })
        .eq('id', id);
        
      if (!error) {
        fetchWaitlist(); // Refresh list
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="container" style={{ paddingTop: '5vh', textAlign: 'center' }}>Loading...</div>;
  }

  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '3rem' }}>
        <div className="flex items-center gap-4">
          <div style={{ display: 'inline-flex', padding: '0.75rem', background: 'rgba(0,0,0,0.05)', borderRadius: '12px' }}>
            <Users size={28} color="var(--primary)" />
          </div>
          <div>
            <h1 style={{ fontSize: '2rem' }}>Waitlist Management</h1>
            <p>Total users: {users.length}</p>
          </div>
        </div>
        <button className="btn btn-outline" onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </button>
      </div>

      {error && <div style={{ color: 'var(--status-invalid)', marginBottom: '1rem' }}>{error}</div>}

      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.02)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '500', color: 'var(--text-muted)' }}>Email</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '500', color: 'var(--text-muted)' }}>Date Joined</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '500', color: 'var(--text-muted)' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: '500', color: 'var(--text-muted)', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No users in the waitlist yet.</td>
              </tr>
            ) : (
              users.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-main)' }}>{u.email}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>{new Date(u.created_at).toLocaleString()}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span className={`badge ${u.status === 'Approved' ? 'badge-valid' : 'badge-risky'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    {u.status !== 'Approved' && (
                      <button 
                        className="btn btn-primary" 
                        style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
                        onClick={() => handleApprove(u.id)}
                      >
                        <CheckCircle size={14} /> Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { FiTrash2, FiMail, FiClock, FiCheckCircle } from 'react-icons/fi';

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await api.getContacts();
      setContacts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    const statuses = ['NEW', 'READ', 'REPLIED'];
    const currentIndex = statuses.indexOf(currentStatus);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];

    try {
      // Optimistic UI Update
      setContacts(contacts.map(c => c.id === id ? { ...c, status: nextStatus } : c));
      await api.updateContactStatus(id, nextStatus);
    } catch (err) {
      // Revert on failure
      fetchContacts();
      alert(`Failed to update status: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you absolutely sure you want to delete this message?')) return;
    
    try {
      setContacts(contacts.filter(c => c.id !== id));
      await api.deleteContact(id);
    } catch (err) {
      fetchContacts();
      alert(`Failed to delete: ${err.message}`);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'NEW': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'READ': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'REPLIED': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'NEW': return <FiMail className="mr-1.5" />;
      case 'READ': return <FiClock className="mr-1.5" />;
      case 'REPLIED': return <FiCheckCircle className="mr-1.5" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center font-medium max-w-2xl mx-auto mt-10">
        Error loading contacts: {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Contact Submissions</h2>
          <p className="text-gray-400 text-sm mt-1">Manage inquiries from your portfolio.</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-sm text-gray-400 font-medium">
          Total Messages: <span className="text-emerald-400">{contacts.length}</span>
        </div>
      </div>
      
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-gray-950/80 text-xs uppercase text-gray-500 border-b border-gray-800">
              <tr>
                <th className="px-6 py-5 font-semibold">Date</th>
                <th className="px-6 py-5 font-semibold">Sender Details</th>
                <th className="px-6 py-5 font-semibold">Message Content</th>
                <th className="px-6 py-5 font-semibold">Status</th>
                <th className="px-6 py-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 mb-4">
                      <FiMail className="text-2xl text-gray-500" />
                    </div>
                    <p className="text-gray-400 font-medium text-lg">Inbox Zero</p>
                    <p className="text-gray-500 text-sm mt-1">You have no new messages.</p>
                  </td>
                </tr>
              ) : contacts.map(contact => (
                <tr key={contact.id} className="hover:bg-gray-800/40 transition-colors group">
                  <td className="px-6 py-5 whitespace-nowrap align-top">
                    <div className="text-gray-300 font-medium">{new Date(contact.createdAt).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-500 mt-1">{new Date(contact.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <div className="font-medium text-gray-200">{contact.name}</div>
                    <a href={`mailto:${contact.email}`} className="text-xs text-emerald-500/80 hover:text-emerald-400 mt-1 inline-block transition-colors">
                      {contact.email}
                    </a>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-semibold text-gray-200 mb-2">{contact.subject}</div>
                    <div className="text-gray-400 text-sm leading-relaxed max-w-xl">
                      {contact.message}
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap align-top">
                    <button 
                      onClick={() => handleStatusChange(contact.id, contact.status)}
                      className={`inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all hover:scale-105 active:scale-95 cursor-pointer ${getStatusColor(contact.status)}`}
                      title="Click to toggle status"
                    >
                      {getStatusIcon(contact.status)}
                      {contact.status}
                    </button>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right align-top">
                    <button 
                      onClick={() => handleDelete(contact.id)}
                      className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                      title="Delete Message"
                    >
                      <FiTrash2 className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

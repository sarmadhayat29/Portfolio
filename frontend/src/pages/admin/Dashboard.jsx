import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { FiTrash2, FiMail, FiClock, FiCheckCircle, FiSearch, FiMessageSquare, FiX } from 'react-icons/fi';

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await api.getContacts();
      setContacts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, currentStatus, e) => {
    if (e) e.stopPropagation();
    const statuses = ['NEW', 'READ', 'REPLIED'];
    const currentIndex = statuses.indexOf(currentStatus);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];

    setContacts(contacts.map(c => c.id === id ? { ...c, status: nextStatus } : c));
    try {
      await api.updateContactStatus(id, nextStatus);
    } catch (err) {
      fetchContacts();
    }
  };

  const handleDelete = async (id, e) => {
    if (e) e.stopPropagation();
    if (!window.confirm('Delete this message permanently?')) return;
    
    setContacts(contacts.filter(c => c.id !== id));
    if (selectedMessage?.id === id) setSelectedMessage(null);
    try {
      await api.deleteContact(id);
    } catch (err) {
      fetchContacts();
    }
  };

  const stats = {
    total: contacts.length,
    unread: contacts.filter(c => c.status === 'NEW').length,
    read: contacts.filter(c => c.status === 'READ').length,
    replied: contacts.filter(c => c.status === 'REPLIED').length,
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Dashboard</h2>
          <p className="text-gray-400 mt-1 text-sm">Overview of your portfolio communications.</p>
        </div>
        <div className="relative w-full md:w-72">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search messages..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0d1411] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all placeholder:text-gray-600"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Messages', value: stats.total, icon: <FiMessageSquare />, color: 'text-white' },
          { label: 'Unread', value: stats.unread, icon: <FiMail />, color: 'text-emerald-400' },
          { label: 'Read', value: stats.read, icon: <FiClock />, color: 'text-amber-400' },
          { label: 'Replied', value: stats.replied, icon: <FiCheckCircle />, color: 'text-blue-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#0d1411]/80 backdrop-blur-md border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm font-medium">{stat.label}</span>
              <span className={`p-2 bg-white/5 rounded-lg ${stat.color}`}>{stat.icon}</span>
            </div>
            <div className={`text-3xl font-bold ${stat.color}`}>
              {loading ? <div className="h-8 w-16 bg-white/5 rounded animate-pulse" /> : stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Message Grid */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Recent Inquiries</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="bg-[#0d1411]/50 border border-white/5 rounded-2xl p-6 h-56 animate-pulse flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-5 w-1/3 bg-white/5 rounded" />
                    <div className="h-4 w-12 bg-white/5 rounded" />
                  </div>
                  <div className="h-4 w-1/2 bg-white/5 rounded mb-3" />
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-white/5 rounded" />
                    <div className="h-3 w-5/6 bg-white/5 rounded" />
                    <div className="h-3 w-4/6 bg-white/5 rounded" />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                  <div className="h-6 w-16 bg-white/5 rounded-full" />
                  <div className="h-6 w-6 bg-white/5 rounded-md" />
                </div>
              </div>
            ))
          ) : filteredContacts.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-[#0d1411]/50 border border-white/5 rounded-2xl">
              <FiMail className="mx-auto text-4xl text-gray-600 mb-3" />
              <p className="text-gray-400 font-medium">No messages found.</p>
            </div>
          ) : (
            filteredContacts.map(contact => (
              <div 
                key={contact.id} 
                onClick={() => setSelectedMessage(contact)}
                className="group bg-[#0d1411]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 cursor-pointer hover:bg-white/[0.02] hover:border-white/10 transition-all flex flex-col justify-between h-56"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-200 truncate pr-4">{contact.name}</h4>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(contact.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-300 mb-2 truncate">{contact.subject}</p>
                  <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                    {contact.message}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                  <button 
                    onClick={(e) => handleStatusChange(contact.id, contact.status, e)}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors hover:opacity-80 ${
                      contact.status === 'NEW' ? 'bg-emerald-500/10 text-emerald-400' :
                      contact.status === 'READ' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-blue-500/10 text-blue-400'
                    }`}
                  >
                    {contact.status}
                  </button>
                  <button 
                    onClick={(e) => handleDelete(contact.id, e)}
                    className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Full Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0d1411] border border-white/10 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <h3 className="font-bold text-lg text-white">Message Details</h3>
              <button onClick={() => setSelectedMessage(null)} className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors">
                <FiX />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">From</p>
                  <p className="font-medium text-gray-200">{selectedMessage.name}</p>
                  <a href={`mailto:${selectedMessage.email}`} className="text-sm text-emerald-400 hover:underline">{selectedMessage.email}</a>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Received</p>
                  <p className="font-medium text-gray-200">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Subject</p>
                <p className="font-semibold text-gray-100 bg-white/5 p-3 rounded-xl border border-white/5">{selectedMessage.subject}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Message</p>
                <div className="text-gray-300 bg-white/5 p-4 rounded-xl border border-white/5 whitespace-pre-wrap leading-relaxed min-h-[100px]">
                  {selectedMessage.message}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-white/5 bg-white/[0.01] flex justify-between items-center">
               <button 
                  onClick={() => handleStatusChange(selectedMessage.id, selectedMessage.status)}
                  className={`text-sm px-4 py-2 rounded-xl font-medium transition-all ${
                    selectedMessage.status === 'NEW' ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' :
                    selectedMessage.status === 'READ' ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20' :
                    'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
                  }`}
                >
                  Status: {selectedMessage.status}
                </button>
                <button 
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-colors font-medium"
                >
                  <FiTrash2 /> Delete
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

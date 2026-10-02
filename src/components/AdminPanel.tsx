import { useState, useEffect } from 'react';
import {
  Lock,
  Mail,
  Phone,
  MapPin,
  Trash2,
  CheckCircle,
  RefreshCw,
  LogOut,
  Download,
  Search,
  MessageSquare,
  Shield,
  Clock,
  Eye,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactInquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  place: string;
  message: string;
  status: 'unread' | 'read' | 'contacted';
  created_at: string;
}

export function AdminPanel() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('admin_token'));
  const [username, setUsername] = useState('parasbusinesspark@gmail.com');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [contacts, setContacts] = useState<ContactInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read' | 'contacted'>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);

  // Check token validity on mount
  useEffect(() => {
    if (token) {
      fetchContacts();
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('admin_token', data.token);
      setToken(data.token);
      setPassword('');
    } catch (err: any) {
      setLoginError(err.message || 'An error occurred during login');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
    setContacts([]);
  };

  const fetchContacts = async () => {
    if (!token) return;
    setIsLoading(true);
    setFetchError('');

    try {
      const res = await fetch('/api/admin/contacts', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401 || res.status === 403) {
        handleLogout();
        return;
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load inquiries');

      setContacts(data.contacts || []);
    } catch (err: any) {
      setFetchError(err.message || 'Failed to fetch contact inquiries');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, newStatus: 'unread' | 'read' | 'contacted') => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      setContacts((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );

      if (selectedInquiry?.id === id) {
        setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this contact inquiry?')) return;

    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to delete inquiry');

      setContacts((prev) => prev.filter((item) => item.id !== id));
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const exportToCSV = () => {
    if (contacts.length === 0) return;

    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Place', 'Message', 'Status'];
    const rows = filteredContacts.map((c) => [
      c.id,
      `"${new Date(c.created_at).toLocaleString()}"`,
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.email}"`,
      `"${c.phone}"`,
      `"${c.place.replace(/"/g, '""')}"`,
      `"${c.message.replace(/"/g, '""')}"`,
      `"${c.status}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `paras_business_park_contacts_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredContacts = contacts.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      item.place.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const unreadCount = contacts.filter((c) => c.status === 'unread').length;
  const contactedCount = contacts.filter((c) => c.status === 'contacted').length;

  if (!token) {
    return (
      <div id='admin' className='min-h-screen bg-neutral-900 py-24 px-4 flex items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='w-full max-w-md bg-neutral-800 border border-neutral-700 rounded-2xl shadow-2xl p-8'
        >
          <div className='text-center mb-8'>
            <div className='w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-primary'>
              <Shield className='w-8 h-8' />
            </div>
            <h2 className='text-3xl font-bold text-white mb-2'>Admin Portal</h2>
            <p className='text-gray-400 text-sm'>
              Sign in to manage Paras Business Park contact inquiries stored in Neon DB
            </p>
          </div>

          {loginError && (
            <div className='mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center'>
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className='space-y-5'>
            <div>
              <label className='block text-sm font-medium text-gray-300 mb-2'>
                Username / Email
              </label>
              <div className='relative'>
                <Mail className='w-5 h-5 text-gray-400 absolute left-3 top-3' />
                <input
                  type='email'
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='w-full bg-neutral-900 border border-neutral-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-primary'
                  placeholder='parasbusinesspark@gmail.com'
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-300 mb-2'>
                Password
              </label>
              <div className='relative'>
                <Lock className='w-5 h-5 text-gray-400 absolute left-3 top-3' />
                <input
                  type='password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full bg-neutral-900 border border-neutral-700 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-primary'
                  placeholder='••••••••••••'
                />
              </div>
            </div>

            <button
              type='submit'
              disabled={isLoggingIn}
              className='w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/25'
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className='w-5 h-5 animate-spin' /> Authenticating...
                </>
              ) : (
                'Login to Admin Panel'
              )}
            </button>
          </form>


          <div className='mt-6 text-center border-t border-neutral-700/60 pt-4'>
            <a href='/' className='text-xs text-gray-400 hover:text-white transition-colors'>
              ← Back to Main Website
            </a>
          </div>
        </motion.div>
      </div>
    );
  }


  return (
    <section id='admin' className='min-h-screen bg-neutral-900 text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto space-y-8'>

        {/* Top Header */}
        <div className='bg-neutral-800/80 backdrop-blur-md border border-neutral-700 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl'>
          <div>
            <div className='flex items-center gap-3 mb-1'>
              <h1 className='text-2xl sm:text-3xl font-bold text-white'>Inquiry Database Dashboard</h1>
              <span className='px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30 flex items-center gap-1.5'>
                <span className='w-2 h-2 rounded-full bg-green-400 animate-pulse' />
                Neon DB Live
              </span>
            </div>
            <p className='text-gray-400 text-sm'>
              Logged in as <span className='text-primary font-medium'>parasbusinesspark@gmail.com</span>
            </p>
          </div>

          <div className='flex items-center gap-3'>
            <button
              onClick={fetchContacts}
              disabled={isLoading}
              className='flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 px-4 py-2.5 rounded-xl text-sm font-medium transition-all'
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>

            <button
              onClick={exportToCSV}
              disabled={contacts.length === 0}
              className='flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 px-4 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-50'
            >
              <Download className='w-4 h-4' />
              Export CSV
            </button>

            <a
              href='/'
              className='flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-gray-300 hover:text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all'
            >
              Main Site
            </a>

            <button
              onClick={handleLogout}
              className='flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 px-4 py-2.5 rounded-xl text-sm font-medium transition-all'
            >
              <LogOut className='w-4 h-4' />
              Logout
            </button>

          </div>
        </div>

        {/* Analytics Summary */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          <div className='bg-neutral-800/60 border border-neutral-700/80 rounded-2xl p-6 flex items-center gap-4'>
            <div className='w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center'>
              <MessageSquare className='w-6 h-6' />
            </div>
            <div>
              <p className='text-gray-400 text-sm'>Total Inquiries</p>
              <h3 className='text-3xl font-bold text-white'>{contacts.length}</h3>
            </div>
          </div>

          <div className='bg-neutral-800/60 border border-neutral-700/80 rounded-2xl p-6 flex items-center gap-4'>
            <div className='w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center'>
              <Clock className='w-6 h-6' />
            </div>
            <div>
              <p className='text-gray-400 text-sm'>Unread Inquiries</p>
              <h3 className='text-3xl font-bold text-amber-400'>{unreadCount}</h3>
            </div>
          </div>

          <div className='bg-neutral-800/60 border border-neutral-700/80 rounded-2xl p-6 flex items-center gap-4'>
            <div className='w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center'>
              <CheckCircle className='w-6 h-6' />
            </div>
            <div>
              <p className='text-gray-400 text-sm'>Contacted</p>
              <h3 className='text-3xl font-bold text-green-400'>{contactedCount}</h3>
            </div>
          </div>

          <div className='bg-neutral-800/60 border border-neutral-700/80 rounded-2xl p-6 flex items-center gap-4'>
            <div className='w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center'>
              <Shield className='w-6 h-6' />
            </div>
            <div>
              <p className='text-gray-400 text-sm'>Database Host</p>
              <h3 className='text-lg font-semibold text-gray-200'>Neon PostgreSQL</h3>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className='bg-neutral-800/60 border border-neutral-700 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4'>
          <div className='relative w-full md:w-96'>
            <Search className='w-5 h-5 text-gray-400 absolute left-3 top-2.5' />
            <input
              type='text'
              placeholder='Search by name, email, phone, place...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full bg-neutral-900 border border-neutral-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary'
            />
          </div>

          <div className='flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0'>
            <span className='text-sm text-gray-400 font-medium mr-2'>Filter:</span>
            {(['all', 'unread', 'read', 'contacted'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                  statusFilter === st
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-neutral-900 text-gray-400 hover:text-white border border-neutral-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {fetchError && (
          <div className='p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center'>
            {fetchError}
          </div>
        )}

        {/* Data Table */}
        <div className='bg-neutral-800/80 border border-neutral-700 rounded-2xl overflow-hidden shadow-xl'>
          {isLoading ? (
            <div className='p-16 text-center text-gray-400 flex flex-col items-center justify-center gap-3'>
              <RefreshCw className='w-8 h-8 animate-spin text-primary' />
              <span>Fetching inquiry records from Neon database...</span>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className='p-16 text-center text-gray-400'>
              <MessageSquare className='w-12 h-12 mx-auto mb-3 text-neutral-600' />
              <h3 className='text-lg font-semibold text-gray-300'>No contact inquiries found</h3>
              <p className='text-sm text-gray-500'>
                {searchTerm || statusFilter !== 'all'
                  ? 'Try changing your search keywords or status filters.'
                  : 'New entries submitted on the contact form will appear here automatically.'}
              </p>
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='w-full text-left text-sm text-gray-300'>
                <thead className='bg-neutral-900/90 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-neutral-700'>
                  <tr>
                    <th className='py-4 px-6'>Date & Time</th>
                    <th className='py-4 px-6'>Name</th>
                    <th className='py-4 px-6'>Contact Info</th>
                    <th className='py-4 px-6'>Place</th>
                    <th className='py-4 px-6'>Message</th>
                    <th className='py-4 px-6'>Status</th>
                    <th className='py-4 px-6 text-right'>Actions</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-neutral-700/60'>
                  {filteredContacts.map((item) => (
                    <tr
                      key={item.id}
                      className={`hover:bg-neutral-700/40 transition-colors ${
                        item.status === 'unread' ? 'bg-amber-500/5 font-medium' : ''
                      }`}
                    >
                      <td className='py-4 px-6 whitespace-nowrap text-gray-400 text-xs'>
                        {new Date(item.created_at).toLocaleString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>

                      <td className='py-4 px-6 font-semibold text-white whitespace-nowrap'>
                        {item.name}
                      </td>

                      <td className='py-4 px-6 whitespace-nowrap'>
                        <div className='flex flex-col gap-1'>
                          <a
                            href={`mailto:${item.email}`}
                            className='flex items-center gap-1.5 text-blue-400 hover:underline text-xs'
                          >
                            <Mail className='w-3.5 h-3.5' />
                            {item.email}
                          </a>
                          <a
                            href={`tel:${item.phone}`}
                            className='flex items-center gap-1.5 text-gray-300 hover:text-white text-xs'
                          >
                            <Phone className='w-3.5 h-3.5' />
                            {item.phone}
                          </a>
                        </div>
                      </td>

                      <td className='py-4 px-6 whitespace-nowrap text-gray-300'>
                        <span className='flex items-center gap-1 text-xs'>
                          <MapPin className='w-3.5 h-3.5 text-primary' />
                          {item.place}
                        </span>
                      </td>

                      <td className='py-4 px-6 max-w-xs truncate text-gray-400 text-xs'>
                        {item.message}
                      </td>

                      <td className='py-4 px-6 whitespace-nowrap'>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                            item.status === 'unread'
                              ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                              : item.status === 'contacted'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : 'bg-neutral-700 text-gray-300 border-neutral-600'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className='py-4 px-6 whitespace-nowrap text-right'>
                        <div className='flex items-center justify-end gap-2'>
                          <button
                            onClick={() => {
                              setSelectedInquiry(item);
                              if (item.status === 'unread') {
                                handleUpdateStatus(item.id, 'read');
                              }
                            }}
                            title='View Details'
                            className='p-2 bg-neutral-700 hover:bg-neutral-600 text-gray-200 rounded-lg transition-colors'
                          >
                            <Eye className='w-4 h-4' />
                          </button>

                          {item.status !== 'contacted' ? (
                            <button
                              onClick={() => handleUpdateStatus(item.id, 'contacted')}
                              title='Mark as Contacted'
                              className='p-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 rounded-lg transition-colors'
                            >
                              <CheckCircle className='w-4 h-4' />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUpdateStatus(item.id, 'unread')}
                              title='Mark as Unread'
                              className='p-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 rounded-lg transition-colors'
                            >
                              <Clock className='w-4 h-4' />
                            </button>
                          )}

                          <button
                            onClick={() => handleDelete(item.id)}
                            title='Delete Entry'
                            className='p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg transition-colors'
                          >
                            <Trash2 className='w-4 h-4' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className='fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4'>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='bg-neutral-800 border border-neutral-700 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative'
            >
              <button
                onClick={() => setSelectedInquiry(null)}
                className='absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-lg'
              >
                <X className='w-6 h-6' />
              </button>

              <div className='flex items-center gap-3 border-b border-neutral-700 pb-4'>
                <MessageSquare className='w-6 h-6 text-primary' />
                <div>
                  <h3 className='text-xl font-bold text-white'>Inquiry Details #{selectedInquiry.id}</h3>
                  <p className='text-xs text-gray-400'>
                    Received on {new Date(selectedInquiry.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 bg-neutral-900/60 p-4 rounded-xl border border-neutral-700/60'>
                <div>
                  <span className='text-xs text-gray-400 block'>Name</span>
                  <span className='text-white font-semibold'>{selectedInquiry.name}</span>
                </div>
                <div>
                  <span className='text-xs text-gray-400 block'>Place / City</span>
                  <span className='text-white font-semibold'>{selectedInquiry.place}</span>
                </div>
                <div>
                  <span className='text-xs text-gray-400 block'>Email</span>
                  <a href={`mailto:${selectedInquiry.email}`} className='text-blue-400 hover:underline'>
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <span className='text-xs text-gray-400 block'>Phone Number</span>
                  <a href={`tel:${selectedInquiry.phone}`} className='text-green-400 hover:underline'>
                    {selectedInquiry.phone}
                  </a>
                </div>
              </div>

              <div>
                <span className='text-xs text-gray-400 block mb-2 font-medium'>Inquiry Message</span>
                <div className='bg-neutral-900 p-4 rounded-xl border border-neutral-700 text-gray-200 text-sm whitespace-pre-wrap leading-relaxed'>
                  {selectedInquiry.message}
                </div>
              </div>

              <div className='flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-neutral-700'>
                <div className='flex items-center gap-2'>
                  <span className='text-xs text-gray-400'>Update Status:</span>
                  {(['unread', 'read', 'contacted'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedInquiry.id, st)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase ${
                        selectedInquiry.status === st
                          ? 'bg-primary text-white'
                          : 'bg-neutral-700 text-gray-300 hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedInquiry(null)}
                  className='bg-neutral-700 hover:bg-neutral-600 text-white px-5 py-2 rounded-xl text-sm font-medium'
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

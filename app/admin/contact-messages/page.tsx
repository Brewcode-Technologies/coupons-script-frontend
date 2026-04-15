'use client';

import { useState, useEffect } from 'react';
import {
  Box, Typography, Card, Chip, IconButton, Button,
  TextField, Select, MenuItem, FormControl, InputLabel,
  Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import { Mail, Trash2, Eye, Clock, CheckCircle, MessageSquare, Filter, AlertTriangle } from 'lucide-react';
import { getContactMessages, updateContactMessage, deleteContactMessage } from '@/services/api';
import AdminShell from '@/components/admin/AdminShell';
import toast from 'react-hot-toast';

interface ContactMsg {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  adminNotes: string;
  createdAt: string;
}

const statusConfig = {
  unread: { label: 'Unread', color: 'error' as const, icon: <Mail size={14} /> },
  read: { label: 'Read', color: 'warning' as const, icon: <Eye size={14} /> },
  replied: { label: 'Replied', color: 'success' as const, icon: <CheckCircle size={14} /> },
};

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMsg[]>([]);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<ContactMsg | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<ContactMsg | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await getContactMessages(filter !== 'all' ? filter : undefined);
      setMessages(res.data);
    } catch { toast.error('Failed to load messages'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchMessages(); }, [filter]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateContactMessage(id, { status });
      setMessages(prev => prev.map(m => m._id === id ? { ...m, status: status as ContactMsg['status'] } : m));
      if (selected?._id === id) setSelected(prev => prev ? { ...prev, status: status as ContactMsg['status'] } : null);
      toast.success(`Marked as ${status}`);
    } catch { toast.error('Failed to update'); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteContactMessage(deleteTarget._id);
      setMessages(prev => prev.filter(m => m._id !== deleteTarget._id));
      if (selected?._id === deleteTarget._id) setSelected(null);
      toast.success('Message deleted');
    } catch { toast.error('Failed to delete'); }
    finally { setDeleteTarget(null); }
  };

  const handleSaveNotes = async () => {
    if (!selected) return;
    try {
      await updateContactMessage(selected._id, { status: selected.status, adminNotes });
      setMessages(prev => prev.map(m => m._id === selected._id ? { ...m, adminNotes } : m));
      toast.success('Notes saved');
      setSelected(null);
    } catch { toast.error('Failed to save notes'); }
  };

  const openMessage = (msg: ContactMsg) => {
    setSelected(msg);
    setAdminNotes(msg.adminNotes || '');
    if (msg.status === 'unread') handleStatusChange(msg._id, 'read');
  };

  const unreadCount = messages.filter(m => m.status === 'unread').length;

  return (
    <AdminShell>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Contact Messages
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {messages.length} message{messages.length !== 1 ? 's' : ''}
              {unreadCount > 0 && <Chip label={`${unreadCount} unread`} size="small" color="error" sx={{ ml: 1, height: 22, fontSize: 11 }} />}
            </Typography>
          </Box>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Filter</InputLabel>
            <Select value={filter} label="Filter" onChange={e => setFilter(e.target.value)} sx={{ borderRadius: 2 }}>
              <MenuItem value="all"><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Filter size={14} /> All</span></MenuItem>
              <MenuItem value="unread"><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={14} /> Unread</span></MenuItem>
              <MenuItem value="read"><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Eye size={14} /> Read</span></MenuItem>
              <MenuItem value="replied"><span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle size={14} /> Replied</span></MenuItem>
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <Typography color="text.secondary">Loading...</Typography>
        ) : messages.length === 0 ? (
          <Card sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
            <MessageSquare size={48} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
            <Typography color="text.secondary">No messages found</Typography>
          </Card>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {messages.map(msg => {
              const sc = statusConfig[msg.status];
              return (
                <Card
                  key={msg._id}
                  variant="outlined"
                  sx={{
                    p: 2.5, borderRadius: 2, cursor: 'pointer',
                    borderLeft: msg.status === 'unread' ? '4px solid #ef4444' : '4px solid transparent',
                    bgcolor: msg.status === 'unread' ? '#fefce8' : 'white',
                    '&:hover': { boxShadow: 2 }, transition: 'all 0.15s',
                  }}
                  onClick={() => openMessage(msg)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: msg.status === 'unread' ? 800 : 600 }}>
                          {msg.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">&lt;{msg.email}&gt;</Typography>
                        <Chip icon={sc.icon} label={sc.label} size="small" color={sc.color} variant="outlined" sx={{ height: 22, fontSize: 11 }} />
                      </Box>
                      {msg.subject && (
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>{msg.subject}</Typography>
                      )}
                      <Typography variant="body2" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {msg.message}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, whiteSpace: 'nowrap' }}>
                        <Clock size={12} />
                        {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </Typography>
                      <IconButton size="small" color="error" onClick={e => { e.stopPropagation(); setDeleteTarget(msg); }}>
                        <Trash2 size={15} />
                      </IconButton>
                    </Box>
                  </Box>
                </Card>
              );
            })}
          </Box>
        )}

        {/* Message Detail Dialog */}
        <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="sm" fullWidth>
          {selected && (
            <>
              <DialogTitle sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Message from {selected.name}</Typography>
                  <Chip
                    icon={statusConfig[selected.status].icon}
                    label={statusConfig[selected.status].label}
                    size="small"
                    color={statusConfig[selected.status].color}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">{selected.email}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                  {new Date(selected.createdAt).toLocaleString()}
                </Typography>
              </DialogTitle>
              <DialogContent dividers>
                {selected.subject && (
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Subject: {selected.subject}</Typography>
                )}
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 3, lineHeight: 1.8 }}>
                  {selected.message}
                </Typography>

                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Admin Notes</Typography>
                <TextField
                  fullWidth multiline rows={3}
                  value={adminNotes}
                  onChange={e => setAdminNotes(e.target.value)}
                  placeholder="Add internal notes about this message..."
                  InputProps={{ sx: { borderRadius: 2 } }}
                />

                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>Mark as:</Typography>
                  {(['unread', 'read', 'replied'] as const).map(s => (
                    <Chip
                      key={s}
                      label={statusConfig[s].label}
                      size="small"
                      color={selected.status === s ? statusConfig[s].color : 'default'}
                      variant={selected.status === s ? 'filled' : 'outlined'}
                      onClick={() => handleStatusChange(selected._id, s)}
                      sx={{ cursor: 'pointer' }}
                    />
                  ))}
                </Box>
              </DialogContent>
              <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={() => setSelected(null)} sx={{ textTransform: 'none' }}>Close</Button>
                <Button variant="contained" onClick={handleSaveNotes} sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600 }}>
                  Save Notes
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
        {/* Delete Confirmation Dialog */}
        <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)} maxWidth="xs" fullWidth>
          <DialogTitle sx={{ pb: 1, color: '#ef4444', background: '#fef2f2' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AlertTriangle size={20} />
              <span>Delete Message</span>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Box sx={{ width: 56, height: 56, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2, bgcolor: '#fef2f2' }}>
                <Trash2 size={24} color="#ef4444" />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Delete message from &quot;{deleteTarget?.name}&quot;?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This action cannot be undone.
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2, bgcolor: '#f9fafb' }}>
            <Button onClick={() => setDeleteTarget(null)} sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600 }}>Cancel</Button>
            <Button variant="contained" onClick={handleDelete} sx={{ textTransform: 'none', borderRadius: 2, fontWeight: 600, bgcolor: '#ef4444', '&:hover': { bgcolor: '#dc2626' } }}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AdminShell>
  );
}

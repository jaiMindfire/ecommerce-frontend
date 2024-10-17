
import { useState } from 'react';

export const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<'success' | 'error'>('success');

  const showSnackbar = (msg: string, severityType: 'success' | 'error') => {
    setMessage(msg);
    setSeverity(severityType);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return { open, message, severity, showSnackbar, handleClose };
};

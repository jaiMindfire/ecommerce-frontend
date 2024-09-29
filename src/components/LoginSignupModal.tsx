import React, { useState, Suspense, lazy } from 'react';
import { Dialog, DialogContent, Tabs, Tab, Box } from '@mui/material';
import SkeletonLoader from './LoginSkeleton';


const LoginPage = lazy(() => import('../pages/LoginPage'));
const SignupPage = lazy(() => import('../pages/SignupPage'));

interface LoginSignupModalProps {
  open: boolean;
  handleClose: () => void;
}

const LoginSignupModal: React.FC<LoginSignupModalProps> = ({ open, handleClose }) => {
  const [tabValue, setTabValue] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="login-signup-dialog"
      aria-describedby="login-signup-content"
    >
      <DialogContent
        dividers
        sx={{
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ marginBottom: 2 }}
        >
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>

        <Suspense fallback={<SkeletonLoader/>}>
          {tabValue === 0 && <LoginPage />}
          {tabValue === 1 && <SignupPage />}
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};

export default LoginSignupModal;

import log from 'loglevel';

// Set the default log level based on the environment
if (process.env.NODE_ENV === 'production') {
  log.setLevel('warn'); // Only show warnings and errors in production
} else {
  log.setLevel('debug'); // Show all logs in development
}

log.setDefaultLevel('info');

export default log;

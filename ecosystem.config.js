module.exports = {
  apps: [
    {
      name: 'ai-news',
      script: 'npm',
      args: ['run', 'dev'],
      log_date_format: 'HH:mm::ss DD-MM-YYYY Z',
      watch: true,
      ignore_watch: ['./storage/*'],
      exp_backoff_restart_delay: 100,
    },
  ],
}

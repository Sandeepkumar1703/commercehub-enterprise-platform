export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  stack?: string;
}

class ClientLogger {
  private logs: LogEntry[] = [];
  private readonly maxLogs = 200;

  private log(level: LogLevel, message: string, context?: Record<string, unknown>, error?: Error) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      stack: error?.stack,
    };

    this.logs.unshift(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }

    const consoleMethod = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log;
    consoleMethod(`[${entry.timestamp}] [${level.toUpperCase()}] ${message}`, context || '', error || '');
  }

  info(message: string, context?: Record<string, unknown>) {
    this.log('info', message, context);
  }

  warn(message: string, context?: Record<string, unknown>) {
    this.log('warn', message, context);
  }

  error(message: string, context?: Record<string, unknown>, error?: Error) {
    this.log('error', message, context, error);
  }

  debug(message: string, context?: Record<string, unknown>) {
    if (import.meta.env.DEV) {
      this.log('debug', message, context);
    }
  }

  getLogs() {
    return this.logs;
  }
}

export const logger = new ClientLogger();

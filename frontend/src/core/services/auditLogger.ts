export interface AuditLogEvent {
  timestamp: string;
  action: string;
  userEmail?: string;
  role?: string;
  resource?: string;
  status: 'GRANTED' | 'DENIED' | 'SUCCESS' | 'FAILED';
  ipAddress?: string;
  details?: string;
}

class AuditLoggerService {
  private logs: AuditLogEvent[] = [];

  constructor() {
    this.logs.push({
      timestamp: new Date().toISOString(),
      action: 'SYSTEM_BOOT',
      userEmail: 'system@commercehub.com',
      role: 'SYSTEM',
      status: 'SUCCESS',
      ipAddress: '127.0.0.1',
      details: 'Enterprise RBAC Audit Logger initialized',
    });
  }

  log(event: Omit<AuditLogEvent, 'timestamp'>) {
    const fullEvent: AuditLogEvent = {
      ...event,
      timestamp: new Date().toISOString(),
      ipAddress: event.ipAddress || '127.0.0.1',
    };
    this.logs.unshift(fullEvent);
    if (this.logs.length > 100) {
      this.logs.pop();
    }
    console.info(`[AUDIT LOG] ${fullEvent.action} - ${fullEvent.status} by ${fullEvent.userEmail || 'Anonymous'}`);
  }

  getLogs() {
    return this.logs;
  }
}

export const auditLogger = new AuditLoggerService();

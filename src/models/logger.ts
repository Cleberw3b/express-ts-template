export type LoggerType = 'request' | 'response' | 'event' | 'info' | 'warn' | 'error'

export type SeverityType = 'attention' | 'critical'

export type ServiceType = 'client' | 'senha-vpp' | 'notification'

export interface Logger {
    type: LoggerType
    severity?: SeverityType
    service: ServiceType
    timestamp: number
    message: string
}

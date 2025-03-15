export type ScheduleAction = 'update' | 'delete' | 'publish' | 'create' | 'unpublish';
export type ScheduleStatus = 'pending' | 'completed' | 'failed' | 'canceled';

export interface ScheduleData {
  metadata?: {
    title?: string;
    description?: string;
  };
  blockType?: string;
  blockPosition?: number;
  template?: string;
  variants?: any[];
  pageId?: string;
  [key: string]: any;
}

export interface ScheduleRequest {
  scheduledAt: string; // ISO date string
  scheduledAction: ScheduleAction;
  scheduledData: ScheduleData;
  scheduleType?: 'create' | 'update'; // Indica se é um agendamento de criação ou atualização/exclusão
}

export interface ScheduleResponse {
  id: string;
  tenantId: string;
  blockType: string;
  blockPosition: number;
  template: string;
  variants: any[];
  metadata: {
    title: string;
    description: string;
  };
  pageId: string;
  created_at: string;
  updated_at: string;
  scheduledAt: string | null;
  scheduledAction: ScheduleAction | null;
  scheduleStatus: ScheduleStatus | null;
  scheduledData: ScheduleData | null;
} 
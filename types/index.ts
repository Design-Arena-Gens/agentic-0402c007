export interface DocumentType {
  id: string;
  type: string;
  description: string;
}

export type DocumentTypeEnum =
  | "Manual"
  | "Procedure"
  | "Process"
  | "Work Instruction"
  | "Policy"
  | "Checklist"
  | "Format"
  | "Template"
  | "Masters";

export type DocumentSecurity =
  | "Confidential"
  | "Internal"
  | "Restricted"
  | "Public";

export type DocumentStatus =
  | "Draft"
  | "Under Review"
  | "Approved"
  | "Effective"
  | "Obsolete"
  | "Retired";

export type WorkflowStatus =
  | "Pending"
  | "In Progress"
  | "Approved"
  | "Rejected";

export interface Document {
  id: string;
  documentTitle: string;
  documentNumber: string;
  documentVersion: string;
  dateCreated: string;
  createdBy: string;
  dateOfIssue?: string;
  issuedBy?: string;
  issuerRole?: string;
  effectiveFromDate?: string;
  dateOfNextIssue?: string;
  documentType: DocumentTypeEnum;
  documentCategory: string;
  documentSecurity: DocumentSecurity;
  status: DocumentStatus;
  content?: string;
  attachments?: string[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  documentId: string;
  documentNumber: string;
  documentTitle: string;
  changes?: Record<string, { old: any; new: any }>;
  ipAddress: string;
  userAgent: string;
  electronicSignature?: ElectronicSignature;
}

export interface ElectronicSignature {
  signatureId: string;
  signedBy: string;
  signedByRole: string;
  signedAt: string;
  meaning: string; // e.g., "Reviewed", "Approved", "Issued"
  reason?: string;
  password: string; // In real implementation, this would be hashed
}

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  isActive: boolean;
  lastLogin?: string;
}

export type UserRole =
  | "Administrator"
  | "QA Manager"
  | "Document Controller"
  | "Reviewer"
  | "Approver"
  | "User";

export interface WorkflowStep {
  id: string;
  stepNumber: number;
  stepName: string;
  assignedRole: UserRole;
  assignedUser?: string;
  status: WorkflowStatus;
  completedBy?: string;
  completedAt?: string;
  comments?: string;
  signature?: ElectronicSignature;
}

export interface Workflow {
  id: string;
  workflowName: string;
  documentId: string;
  documentNumber: string;
  documentTitle: string;
  initiatedBy: string;
  initiatedAt: string;
  currentStep: number;
  status: WorkflowStatus;
  steps: WorkflowStep[];
  completedAt?: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  applicableDocumentTypes: DocumentTypeEnum[];
  steps: Omit<WorkflowStep, "id" | "status" | "completedBy" | "completedAt" | "comments" | "signature">[];
}

export interface AccessControl {
  documentId: string;
  allowedRoles: UserRole[];
  allowedUsers: string[];
  restrictedUsers: string[];
}

export interface Notification {
  id: string;
  userId: string;
  type: "workflow" | "review" | "approval" | "expiry" | "system";
  title: string;
  message: string;
  documentId?: string;
  workflowId?: string;
  isRead: boolean;
  createdAt: string;
}

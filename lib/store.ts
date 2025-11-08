import { create } from 'zustand';
import {
  Document,
  DocumentType,
  User,
  AuditLog,
  Workflow,
  WorkflowTemplate,
  Notification,
  ElectronicSignature,
  WorkflowStatus,
} from '@/types';
import { format } from 'date-fns';

interface AppState {
  // Current user
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;

  // Documents
  documents: Document[];
  addDocument: (document: Document) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  getDocument: (id: string) => Document | undefined;

  // Document Types
  documentTypes: DocumentType[];
  addDocumentType: (docType: DocumentType) => void;

  // Users
  users: User[];
  addUser: (user: User) => void;
  updateUser: (id: string, updates: Partial<User>) => void;

  // Audit Logs
  auditLogs: AuditLog[];
  addAuditLog: (log: AuditLog) => void;

  // Workflows
  workflows: Workflow[];
  workflowTemplates: WorkflowTemplate[];
  addWorkflow: (workflow: Workflow) => void;
  updateWorkflow: (id: string, updates: Partial<Workflow>) => void;
  addWorkflowTemplate: (template: WorkflowTemplate) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;

  // Actions with audit trail
  signDocument: (
    documentId: string,
    signature: ElectronicSignature,
    action: string
  ) => void;
  approveWorkflowStep: (
    workflowId: string,
    stepId: string,
    signature: ElectronicSignature,
    comments?: string
  ) => void;
}

// Initial mock data
const initialDocumentTypes: DocumentType[] = [
  { id: '1', type: 'Manual', description: 'Quality manuals and handbooks' },
  { id: '2', type: 'Procedure', description: 'Standard Operating Procedures (SOPs)' },
  { id: '3', type: 'Process', description: 'Process flow documents' },
  { id: '4', type: 'Work Instruction', description: 'Detailed work instructions' },
  { id: '5', type: 'Policy', description: 'Company policies' },
  { id: '6', type: 'Checklist', description: 'Quality checklists' },
  { id: '7', type: 'Format', description: 'Standard formats' },
  { id: '8', type: 'Template', description: 'Document templates' },
  { id: '9', type: 'Masters', description: 'Master documents' },
];

const initialUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    name: 'System Administrator',
    email: 'admin@pharma.com',
    role: 'Administrator',
    department: 'IT',
    isActive: true,
  },
  {
    id: '2',
    username: 'qa_manager',
    name: 'John Smith',
    email: 'john.smith@pharma.com',
    role: 'QA Manager',
    department: 'Quality Assurance',
    isActive: true,
  },
  {
    id: '3',
    username: 'doc_controller',
    name: 'Sarah Johnson',
    email: 'sarah.j@pharma.com',
    role: 'Document Controller',
    department: 'Quality Assurance',
    isActive: true,
  },
  {
    id: '4',
    username: 'reviewer1',
    name: 'Michael Brown',
    email: 'michael.b@pharma.com',
    role: 'Reviewer',
    department: 'Production',
    isActive: true,
  },
  {
    id: '5',
    username: 'approver1',
    name: 'Emily Davis',
    email: 'emily.d@pharma.com',
    role: 'Approver',
    department: 'Quality Assurance',
    isActive: true,
  },
];

const initialWorkflowTemplates: WorkflowTemplate[] = [
  {
    id: '1',
    name: 'Standard SOP Review',
    description: 'Standard workflow for SOP review and approval',
    applicableDocumentTypes: ['Procedure', 'Work Instruction'],
    steps: [
      { stepNumber: 1, stepName: 'Technical Review', assignedRole: 'Reviewer' },
      { stepNumber: 2, stepName: 'QA Review', assignedRole: 'QA Manager' },
      { stepNumber: 3, stepName: 'Final Approval', assignedRole: 'Approver' },
    ],
  },
  {
    id: '2',
    name: 'Policy Approval',
    description: 'Workflow for policy approval',
    applicableDocumentTypes: ['Policy', 'Manual'],
    steps: [
      { stepNumber: 1, stepName: 'Department Review', assignedRole: 'Reviewer' },
      { stepNumber: 2, stepName: 'QA Approval', assignedRole: 'QA Manager' },
      { stepNumber: 3, stepName: 'Executive Approval', assignedRole: 'Approver' },
    ],
  },
];

const initialDocuments: Document[] = [
  {
    id: '1',
    documentTitle: 'Good Manufacturing Practice Guidelines',
    documentNumber: 'QM-001',
    documentVersion: '3.0',
    dateCreated: '2024-01-15',
    createdBy: 'Sarah Johnson',
    dateOfIssue: '2024-02-01',
    issuedBy: 'Emily Davis',
    issuerRole: 'Approver',
    effectiveFromDate: '2024-02-01',
    dateOfNextIssue: '2025-02-01',
    documentType: 'Manual',
    documentCategory: 'Quality Management',
    documentSecurity: 'Internal',
    status: 'Effective',
  },
  {
    id: '2',
    documentTitle: 'Batch Record Review Procedure',
    documentNumber: 'SOP-QA-101',
    documentVersion: '2.1',
    dateCreated: '2024-03-10',
    createdBy: 'John Smith',
    dateOfIssue: '2024-03-20',
    issuedBy: 'Emily Davis',
    issuerRole: 'Approver',
    effectiveFromDate: '2024-03-25',
    dateOfNextIssue: '2025-03-25',
    documentType: 'Procedure',
    documentCategory: 'Quality Assurance',
    documentSecurity: 'Confidential',
    status: 'Effective',
  },
  {
    id: '3',
    documentTitle: 'Equipment Cleaning Validation Protocol',
    documentNumber: 'WI-PRD-205',
    documentVersion: '1.0',
    dateCreated: '2024-10-01',
    createdBy: 'Michael Brown',
    documentType: 'Work Instruction',
    documentCategory: 'Production',
    documentSecurity: 'Internal',
    status: 'Under Review',
  },
];

export const useStore = create<AppState>((set, get) => ({
  // Current user
  currentUser: initialUsers[0], // Default to admin
  setCurrentUser: (user) => set({ currentUser: user }),

  // Documents
  documents: initialDocuments,
  addDocument: (document) =>
    set((state) => {
      const newDocs = [...state.documents, document];

      // Add audit log
      if (state.currentUser) {
        const auditLog: AuditLog = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          userId: state.currentUser.id,
          userName: state.currentUser.name,
          action: 'Document Created',
          documentId: document.id,
          documentNumber: document.documentNumber,
          documentTitle: document.documentTitle,
          ipAddress: '192.168.1.1',
          userAgent: navigator.userAgent,
        };
        get().addAuditLog(auditLog);
      }

      return { documents: newDocs };
    }),
  updateDocument: (id, updates) =>
    set((state) => {
      const doc = state.documents.find((d) => d.id === id);
      const newDocs = state.documents.map((d) =>
        d.id === id ? { ...d, ...updates } : d
      );

      // Add audit log
      if (state.currentUser && doc) {
        const changes: Record<string, { old: any; new: any }> = {};
        Object.keys(updates).forEach((key) => {
          if ((doc as any)[key] !== (updates as any)[key]) {
            changes[key] = {
              old: (doc as any)[key],
              new: (updates as any)[key],
            };
          }
        });

        const auditLog: AuditLog = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          userId: state.currentUser.id,
          userName: state.currentUser.name,
          action: 'Document Updated',
          documentId: id,
          documentNumber: doc.documentNumber,
          documentTitle: doc.documentTitle,
          changes,
          ipAddress: '192.168.1.1',
          userAgent: navigator.userAgent,
        };
        get().addAuditLog(auditLog);
      }

      return { documents: newDocs };
    }),
  deleteDocument: (id) =>
    set((state) => {
      const doc = state.documents.find((d) => d.id === id);
      const newDocs = state.documents.filter((d) => d.id !== id);

      // Add audit log
      if (state.currentUser && doc) {
        const auditLog: AuditLog = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          userId: state.currentUser.id,
          userName: state.currentUser.name,
          action: 'Document Deleted',
          documentId: id,
          documentNumber: doc.documentNumber,
          documentTitle: doc.documentTitle,
          ipAddress: '192.168.1.1',
          userAgent: navigator.userAgent,
        };
        get().addAuditLog(auditLog);
      }

      return { documents: newDocs };
    }),
  getDocument: (id) => get().documents.find((d) => d.id === id),

  // Document Types
  documentTypes: initialDocumentTypes,
  addDocumentType: (docType) =>
    set((state) => ({
      documentTypes: [...state.documentTypes, docType],
    })),

  // Users
  users: initialUsers,
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (id, updates) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, ...updates } : u)),
    })),

  // Audit Logs
  auditLogs: [],
  addAuditLog: (log) =>
    set((state) => ({
      auditLogs: [log, ...state.auditLogs],
    })),

  // Workflows
  workflows: [],
  workflowTemplates: initialWorkflowTemplates,
  addWorkflow: (workflow) =>
    set((state) => ({
      workflows: [...state.workflows, workflow],
    })),
  updateWorkflow: (id, updates) =>
    set((state) => ({
      workflows: state.workflows.map((w) =>
        w.id === id ? { ...w, ...updates } : w
      ),
    })),
  addWorkflowTemplate: (template) =>
    set((state) => ({
      workflowTemplates: [...state.workflowTemplates, template],
    })),

  // Notifications
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
    })),

  // Sign document
  signDocument: (documentId, signature, action) => {
    const state = get();
    const doc = state.documents.find((d) => d.id === documentId);

    if (doc && state.currentUser) {
      const auditLog: AuditLog = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        userId: state.currentUser.id,
        userName: state.currentUser.name,
        action,
        documentId,
        documentNumber: doc.documentNumber,
        documentTitle: doc.documentTitle,
        ipAddress: '192.168.1.1',
        userAgent: navigator.userAgent,
        electronicSignature: signature,
      };

      state.addAuditLog(auditLog);
    }
  },

  // Approve workflow step
  approveWorkflowStep: (workflowId, stepId, signature, comments) => {
    const state = get();
    const workflow = state.workflows.find((w) => w.id === workflowId);

    if (workflow && state.currentUser) {
      const updatedSteps = workflow.steps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              status: 'Approved' as WorkflowStatus,
              completedBy: state.currentUser!.name,
              completedAt: new Date().toISOString(),
              comments,
              signature,
            }
          : step
      );

      const allApproved = updatedSteps.every((s) => s.status === 'Approved');
      const nextStep = updatedSteps.find((s) => s.status === 'Pending');

      state.updateWorkflow(workflowId, {
        steps: updatedSteps,
        currentStep: nextStep ? nextStep.stepNumber : workflow.currentStep,
        status: allApproved ? 'Approved' : 'In Progress',
        completedAt: allApproved ? new Date().toISOString() : undefined,
      });

      // Add audit log
      const doc = state.documents.find((d) => d.id === workflow.documentId);
      if (doc) {
        const auditLog: AuditLog = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          userId: state.currentUser.id,
          userName: state.currentUser.name,
          action: `Workflow Step Approved: ${updatedSteps.find((s) => s.id === stepId)?.stepName}`,
          documentId: workflow.documentId,
          documentNumber: doc.documentNumber,
          documentTitle: doc.documentTitle,
          ipAddress: '192.168.1.1',
          userAgent: navigator.userAgent,
          electronicSignature: signature,
        };

        state.addAuditLog(auditLog);
      }
    }
  },
}));

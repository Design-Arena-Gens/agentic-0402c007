'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Workflow, WorkflowStep, ElectronicSignature } from '@/types';
import { Plus, CheckCircle, Clock, XCircle, FileText } from 'lucide-react';
import WorkflowForm from './WorkflowForm';
import SignatureModal from './SignatureModal';

export default function Workflows() {
  const { workflows, documents, currentUser, approveWorkflowStep } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [selectedStep, setSelectedStep] = useState<WorkflowStep | null>(null);
  const [showSignatureModal, setShowSignatureModal] = useState(false);

  const handleApproveStep = (workflow: Workflow, step: WorkflowStep) => {
    setSelectedWorkflow(workflow);
    setSelectedStep(step);
    setShowSignatureModal(true);
  };

  const handleSignatureSubmit = (signature: ElectronicSignature, comments?: string) => {
    if (selectedWorkflow && selectedStep) {
      approveWorkflowStep(selectedWorkflow.id, selectedStep.id, signature, comments);
    }
    setShowSignatureModal(false);
    setSelectedWorkflow(null);
    setSelectedStep(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Workflows</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Initiate Workflow</span>
        </button>
      </div>

      {/* Workflows List */}
      <div className="space-y-4">
        {workflows.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No workflows initiated yet</p>
          </div>
        ) : (
          workflows.map((workflow) => (
            <div key={workflow.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {workflow.workflowName}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Document: {workflow.documentNumber} - {workflow.documentTitle}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Initiated by {workflow.initiatedBy} on {workflow.initiatedAt}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      workflow.status === 'Approved'
                        ? 'bg-green-100 text-green-800'
                        : workflow.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : workflow.status === 'Rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {workflow.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {workflow.steps.map((step, index) => (
                    <div key={step.id} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            step.status === 'Approved'
                              ? 'bg-green-100 text-green-600'
                              : step.status === 'In Progress'
                              ? 'bg-blue-100 text-blue-600'
                              : step.status === 'Rejected'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {step.status === 'Approved' ? (
                            <CheckCircle className="h-6 w-6" />
                          ) : step.status === 'In Progress' ? (
                            <Clock className="h-6 w-6" />
                          ) : step.status === 'Rejected' ? (
                            <XCircle className="h-6 w-6" />
                          ) : (
                            <span className="text-sm font-semibold">{step.stepNumber}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-gray-900">{step.stepName}</h4>
                              <p className="text-sm text-gray-600 mt-1">
                                Assigned to: {step.assignedRole}
                                {step.assignedUser && ` (${step.assignedUser})`}
                              </p>
                              {step.completedBy && (
                                <p className="text-sm text-gray-600 mt-1">
                                  Completed by {step.completedBy} on {step.completedAt}
                                </p>
                              )}
                              {step.comments && (
                                <p className="text-sm text-gray-700 mt-2 italic">
                                  Comments: {step.comments}
                                </p>
                              )}
                            </div>
                            {step.status === 'Pending' &&
                              workflow.currentStep === step.stepNumber &&
                              currentUser?.role === step.assignedRole && (
                                <button
                                  onClick={() => handleApproveStep(workflow, step)}
                                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                >
                                  Approve Step
                                </button>
                              )}
                          </div>
                        </div>
                      </div>

                      {index < workflow.steps.length - 1 && (
                        <div className="absolute left-[36px] top-[60px] w-0.5 h-12 bg-gray-300"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Workflow Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <WorkflowForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}

      {/* Signature Modal */}
      {showSignatureModal && selectedStep && (
        <SignatureModal
          stepName={selectedStep.stepName}
          onSubmit={handleSignatureSubmit}
          onClose={() => {
            setShowSignatureModal(false);
            setSelectedWorkflow(null);
            setSelectedStep(null);
          }}
        />
      )}
    </div>
  );
}

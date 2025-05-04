'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { uploadPdf } from '@/lib/utils/uploadUtils';
import patientProfileService from '@/service/api/patient/patientProfileService';
import {
  MedicalDocumentType,
  MedicalDocument,
  RecordVisibility,
  MedicalRecordDto,
} from '@/types/patient';

// Helper function to get a readable name from the enum
const getReadableDocumentType = (type: MedicalDocumentType): string => {
  return type
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

interface MedicalDocumentWithFile extends Omit<MedicalDocument, 'documentUrl'> {
  documentUrl?: string;
  file?: File | null;
  id?: string; // Temporary ID for UI operations
}

interface MedicalDocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string | number;
  onSaveComplete?: () => void;
}

export function MedicalDocumentsModal({
  isOpen,
  onClose,
  patientId,
  onSaveComplete,
}: MedicalDocumentsModalProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecordDto | null>(
    null
  );
  const [documentsList, setDocumentsList] = useState<MedicalDocumentWithFile[]>(
    []
  );
  const [newDocumentName, setNewDocumentName] = useState('');
  const [newDocumentType, setNewDocumentType] = useState<
    MedicalDocumentType | ''
  >('');
  const [newDocumentFile, setNewDocumentFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchMedicalRecords();
    }
  }, [isOpen, patientId]);

  const fetchMedicalRecords = async () => {
    setLoading(true);
    try {
      const data = await patientProfileService.getMedicalRecords(patientId);
      setMedicalRecord(data);

      // Transform backend documents to our format
      if (data && data.medicalDocuments) {
        const mappedDocs = data.medicalDocuments.map((doc, index) => ({
          ...doc,
          id: index.toString(), // Add a temp ID for UI operations
        }));
        setDocumentsList(mappedDocs);
      } else {
        setDocumentsList([]);
      }
    } catch (error) {
      console.error('Error fetching medical records:', error);
      // If 404 or other error, set empty list - we'll create new record
      setDocumentsList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDocument = (id: string) => {
    setDocumentsList(documentsList.filter((doc) => doc.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewDocumentFile(e.target.files[0]);
      // Auto-fill name field with file name if empty
      if (!newDocumentName) {
        const fileName = e.target.files[0].name.replace(/\.[^/.]+$/, ''); // Remove extension
        setNewDocumentName(fileName);
      }
    }
  };

  const handleAddDocument = () => {
    if (newDocumentName && newDocumentType && newDocumentFile) {
      const newDocument: MedicalDocumentWithFile = {
        documentName: newDocumentName,
        documentType: newDocumentType as MedicalDocumentType,
        visibility: RecordVisibility.PRIVATE,
        file: newDocumentFile,
        id: Date.now().toString(), // Temporary ID for UI operations
      };
      setDocumentsList([...documentsList, newDocument]);

      // Reset form
      setNewDocumentName('');
      setNewDocumentType('');
      setNewDocumentFile(null);

      // Reset file input
      const fileInput = document.getElementById(
        'document-file'
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // First upload any new files
      const updatedDocuments = await Promise.all(
        documentsList.map(async (doc) => {
          // If there's a file to upload
          if (doc.file) {
            try {
              const uploadedUrl = await uploadPdf(
                doc.file,
                'medical-documents'
              );
              return {
                documentName: doc.documentName,
                documentType: doc.documentType,
                documentUrl: uploadedUrl,
                visibility: doc.visibility || RecordVisibility.PRIVATE,
              };
            } catch (error) {
              console.error(
                `Error uploading document ${doc.documentName}:`,
                error
              );
              toast({
                title: 'Upload Error',
                description: `Failed to upload ${doc.documentName}. Please try again.`,
                variant: 'destructive',
              });
              throw error;
            }
          }
          // Return existing document without changes
          return {
            documentName: doc.documentName,
            documentType: doc.documentType,
            documentUrl: doc.documentUrl || '',
            visibility: doc.visibility || RecordVisibility.PRIVATE,
          };
        })
      );

      // Prepare medical record data
      const recordData: MedicalRecordDto = {
        ...(medicalRecord || {
          cancerType: '',
          cancerStage: '',
          hospitalName: '',
          hospitalAddress: '',
          doctorName: '',
          doctorContact: '',
        }),
        medicalDocuments: updatedDocuments,
      };

      // If we have an existing record, update it, otherwise create new
      if (medicalRecord?.recordId) {
        await patientProfileService.updateMedicalRecord(
          medicalRecord.recordId,
          recordData
        );
        toast({
          title: 'Success',
          description: 'Medical documents updated successfully',
        });
      } else {
        await patientProfileService.createMedicalRecord(patientId, recordData);
        toast({
          title: 'Success',
          description: 'Medical documents created successfully',
        });
      }

      if (onSaveComplete) {
        onSaveComplete();
      }
      onClose();
    } catch (error) {
      console.error('Error saving medical documents:', error);
      toast({
        title: 'Error',
        description: 'Failed to save medical documents. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Medical Documents</DialogTitle>
          <DialogDescription>
            Manage patient medical documents here.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className='py-8 text-center'>Loading medical records...</div>
        ) : (
          <div className='space-y-6 py-4'>
            {/* Document List */}
            <div className='space-y-2'>
              <h3 className='text-sm font-medium'>Uploaded Documents</h3>
              {documentsList.length === 0 ? (
                <p className='text-muted-foreground text-sm'>
                  No documents uploaded yet.
                </p>
              ) : (
                <div className='divide-y rounded-md border'>
                  {documentsList.map((doc) => (
                    <div
                      key={doc.id}
                      className='flex items-center justify-between p-3'
                    >
                      <div className='flex-1'>
                        <p className='font-medium'>{doc.documentName}</p>
                        <p className='text-muted-foreground text-sm'>
                          {getReadableDocumentType(doc.documentType)} •{' '}
                          {doc.file ? doc.file.name : 'PDF Document'}
                        </p>
                      </div>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => handleDeleteDocument(doc.id || '')}
                        className='text-destructive hover:text-destructive hover:bg-destructive/10'
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add New Document */}
            <div className='space-y-4 border-t pt-4'>
              <h3 className='text-sm font-medium'>Add New Document</h3>

              <div className='space-y-2'>
                <Label htmlFor='document-file'>Upload PDF File</Label>
                <Input
                  id='document-file'
                  type='file'
                  accept='.pdf'
                  onChange={handleFileChange}
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='document-name'>Document Name</Label>
                <Input
                  id='document-name'
                  value={newDocumentName}
                  onChange={(e) => setNewDocumentName(e.target.value)}
                  placeholder='Enter document name'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='document-type'>Document Type</Label>
                <Select
                  value={newDocumentType}
                  onValueChange={(value) =>
                    setNewDocumentType(value as MedicalDocumentType)
                  }
                >
                  <SelectTrigger id='document-type'>
                    <SelectValue placeholder='Select document type' />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(MedicalDocumentType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {getReadableDocumentType(type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleAddDocument}
                disabled={
                  !newDocumentName || !newDocumentType || !newDocumentFile
                }
                className='w-full'
              >
                Add Document
              </Button>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving} className='w-full'>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

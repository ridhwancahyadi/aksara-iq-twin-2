import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  X, 
  Plus, 
  Search, 
  Download, 
  AlertCircle, 
  Sparkles, 
  Clock, 
  ArrowUpRight, 
  FileText, 
  ChevronRight, 
  Calendar, 
  TrendingUp, 
  Upload, 
  Camera, 
  Table, 
  Settings, 
  Activity, 
  History, 
  UserCheck, 
  RotateCcw, 
  Edit2, 
  Save,
  ArrowRight,
  RefreshCw,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { GradeSummaryModule } from './GradeSummaryModule';

interface StudentGrade {
  id: string;
  name: string;
  nim: string;
  uts: number | null;
  uas: number | null;
  tugas: number | null;
  hadir: number; // percentage 0-100
  part: number;  // percentage 0-100
  status: 'Lengkap' | 'Tidak Lengkap' | 'Rejected' | 'Terkunci';
  cplBaseline: number; // percentage 0-100
  rejections?: Array<{
    type: 'FORMAT_ERROR' | 'TRANSPOSITION_SUSPECTED' | 'INDIVIDUAL_CPL_INCONSISTENCY';
    detail: string;
    field: 'uts' | 'uas' | 'tugas' | 'hadir' | 'part' | 'all';
    suggestedAction?: string;
  }>;
  notes?: string;
}

interface AuditLog {
  id: string;
  event: string;
  timestamp: string;
  dosenName: string;
  mataKuliah: string;
  kelas: string;
  komponen: string;
  inputMethod: string;
  totalRecords: number;
  status: 'PASS' | 'REJECTED' | 'WARNING';
}

interface GradeValidationModuleProps {
  selectedClass: string;
  setSelectedClass: (cls: string) => void;
  setView: (view: any) => void;
  loggedInUser: {
    name: string;
    id: string;
    role: string;
  };
}

const INITIAL_STUDENTS: Record<string, StudentGrade[]> = {
  'KOM301': [
    { id: 'S1', name: 'Anisa Salsabila', nim: '220210001', uts: 85, uas: null, tugas: 88, hadir: 92, part: 80, status: 'Tidak Lengkap', cplBaseline: 88 },
    { id: 'S2', name: 'Rafi Maulana', nim: '220210002', uts: 28, uas: null, tugas: 75, hadir: 78, part: 70, status: 'Tidak Lengkap', cplBaseline: 74 },
    { id: 'S3', name: 'Dina Anggraeni', nim: '220210003', uts: 90, uas: null, tugas: 92, hadir: 96, part: 88, status: 'Tidak Lengkap', cplBaseline: 90 },
    { id: 'S4', name: 'Fajar Hidayat', nim: '220210004', uts: 92, uas: null, tugas: 45, hadir: 60, part: 50, status: 'Tidak Lengkap', cplBaseline: 41 },
    { id: 'S5', name: 'Nurul Putri', nim: '220210005', uts: 38, uas: null, tugas: 85, hadir: 90, part: 82, status: 'Tidak Lengkap', cplBaseline: 87 },
    { id: 'S6', name: 'Fahri Alamsyah', nim: '220210006', uts: 65, uas: null, tugas: 70, hadir: 85, part: 65, status: 'Tidak Lengkap', cplBaseline: 62 },
    { id: 'S7', name: 'Budi Santoso', nim: '220210007', uts: 58, uas: null, tugas: 60, hadir: 80, part: 60, status: 'Tidak Lengkap', cplBaseline: 58 },
    { id: 'S8', name: 'Rizky Pratama', nim: '220210008', uts: 82, uas: null, tugas: 80, hadir: 94, part: 85, status: 'Tidak Lengkap', cplBaseline: 85 },
  ],
  'KOM321': [
    { id: 'S1', name: 'Anisa Salsabila', nim: '220210001', uts: 90, uas: 88, tugas: 85, hadir: 94, part: 90, status: 'Lengkap', cplBaseline: 88 },
    { id: 'S2', name: 'Rafi Maulana', nim: '220210002', uts: 76, uas: 74, tugas: 78, hadir: 82, part: 75, status: 'Lengkap', cplBaseline: 74 },
    { id: 'S8', name: 'Rizky Pratama', nim: '220210008', uts: 84, uas: 82, tugas: 80, hadir: 90, part: 85, status: 'Lengkap', cplBaseline: 85 },
    { id: 'S9', name: 'Guruh Seno', nim: '220210009', uts: 64, uas: 60, tugas: 70, hadir: 75, part: 68, status: 'Lengkap', cplBaseline: 64 },
  ]
};

export function GradeValidationModule({ selectedClass, setSelectedClass, setView, loggedInUser }: GradeValidationModuleProps) {
  // --- DATABASE & STATE ENGINES ---
  const [students, setStudents] = useState<StudentGrade[]>(() => {
    try {
      const saved = localStorage.getItem(`aksara_grades_${selectedClass}`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Failed to parse grades:", e);
    }
    return INITIAL_STUDENTS[selectedClass] || INITIAL_STUDENTS['KOM301'];
  });

  const [auditTrail, setAuditTrail] = useState<AuditLog[]>(() => {
    try {
      const saved = localStorage.getItem('aksara_grade_audit_trail');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Failed to parse audit trail:", e);
    }
    return [
      {
        id: 'LOG-101',
        event: 'GRADE_SUBMISSION',
        timestamp: '2026-07-02T10:15:30+07:00',
        dosenName: 'Dr. Bambang Suharto',
        mataKuliah: 'KOM301',
        kelas: 'A',
        komponen: 'UTS',
        inputMethod: 'MANUAL',
        totalRecords: 8,
        status: 'WARNING'
      },
      {
        id: 'LOG-100',
        event: 'GRADE_FINALIZED',
        timestamp: '2026-07-01T14:30:00+07:00',
        dosenName: 'Dr. Bambang Suharto',
        mataKuliah: 'KOM321',
        kelas: 'A',
        komponen: 'UAS',
        inputMethod: 'FILE_UPLOAD',
        totalRecords: 4,
        status: 'PASS'
      }
    ];
  });

  // Track submission timings for 72-hour Edit Window
  const [submissionTimes, setSubmissionTimes] = useState<Record<string, Record<string, string>>>(() => {
    try {
      const saved = localStorage.getItem('aksara_grade_submission_times');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Failed to parse submission times:", e);
    }
    return {
      'KOM301': {
        'UTS': new Date(Date.now() - 3600000 * 24).toISOString(), // 24 hours ago
      }
    };
  });

  // --- UI CONTROLS ---
  const [activePathwayModal, setActivePathwayModal] = useState(false);
  const [selectedPathway, setSelectedPathway] = useState<'manual' | 'upload' | 'ocr' | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<'ALL' | 'UTS' | 'UAS' | 'Tugas' | 'Kehadiran'>('ALL');
  
  // Pathway States
  const [manualGrades, setManualGrades] = useState<Record<string, string>>({});
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadStep, setUploadStep] = useState<number>(1); // 1: Upload, 2: Map, 3: Preview
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({
    'NIM': 'NIM',
    'Nama': 'Nama Mahasiswa',
    'Nilai': '',
    'Absensi': 'Kehadiran'
  });
  const [uploadPreviewData, setUploadPreviewData] = useState<any[]>([]);
  
  // OCR Scan States
  const [ocrImage, setOcrImage] = useState<string | null>(null);
  const [ocrStep, setOcrStep] = useState<number>(1); // 1: Upload, 2: Extracting, 3: Review
  const [ocrProgressText, setOcrProgressText] = useState<string>('');
  const [ocrExtractedData, setOcrExtractedData] = useState<any[]>([]);

  // Validation Report state
  const [showValidationReport, setShowValidationReport] = useState(false);
  const [validationReport, setValidationReport] = useState<any | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validationProgress, setValidationProgress] = useState(0);
  const [validationStatusText, setValidationStatusText] = useState('');

  // Class level comments for consistency warnings
  const [classConsistencyReason, setClassConsistencyReason] = useState('SOAL_MEMANG_SULIT');
  const [classConsistencyNote, setClassConsistencyNote] = useState('');
  
  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize student data when class changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`aksara_grades_${selectedClass}`);
      if (saved) {
        setStudents(JSON.parse(saved));
        return;
      }
    } catch (e) {
      console.warn("Failed to parse grades for class sync:", e);
    }
    setStudents(INITIAL_STUDENTS[selectedClass] || INITIAL_STUDENTS['KOM301']);
  }, [selectedClass]);

  // Persist states
  const saveStudentGrades = (updatedStudents: StudentGrade[]) => {
    setStudents(updatedStudents);
    localStorage.setItem(`aksara_grades_${selectedClass}`, JSON.stringify(updatedStudents));
  };

  const addAuditLog = (log: Omit<AuditLog, 'id' | 'timestamp'>) => {
    const newLog: AuditLog = {
      ...log,
      id: `LOG-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toISOString()
    };
    const updated = [newLog, ...auditTrail];
    setAuditTrail(updated);
    localStorage.setItem('aksara_grade_audit_trail', JSON.stringify(updated));
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // --- 72-HOUR WINDOW COUNTDOWN HELPERS ---
  const getRemainingTime = (componentName: string) => {
    const submittedStr = submissionTimes[selectedClass]?.[componentName];
    if (!submittedStr) return null;
    const submittedAt = new Date(submittedStr).getTime();
    const deadline = submittedAt + (72 * 60 * 60 * 1000); // 72 hours
    const remaining = deadline - Date.now();
    return remaining > 0 ? remaining : 0;
  };

  const formatRemainingTime = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const totalMins = Math.floor(totalSecs / 60);
    const totalHours = Math.floor(totalMins / 60);
    const days = Math.floor(totalHours / 24);
    
    const displayHours = totalHours % 24;
    const displayMins = totalMins % 60;
    
    if (days > 0) {
      return `${days} hari ${displayHours} jam`;
    }
    return `${displayHours} jam ${displayMins} menit`;
  };

  // --- AGENTIC VALIDATION ALGORITHM ---
  const runAgenticValidation = (submittedRecords: Array<{ nim: string; value: number | null; type: 'uts' | 'uas' | 'tugas' | 'hadir' | 'part' }>) => {
    setIsValidating(true);
    setValidationProgress(15);
    setValidationStatusText('Menjalankan Check 1: Format & Integrity Validation...');
    
    setTimeout(() => {
      setValidationProgress(45);
      setValidationStatusText('Menjalankan Check 2: Transposition Error Detection...');
      
      setTimeout(() => {
        setValidationProgress(80);
        setValidationStatusText('Menjalankan Check 3: Pedagogical CPL Consistency Check...');
        
        setTimeout(() => {
          // Compute flags
          const rejectedRecords: any[] = [];
          const passedRecords: any[] = [];
          let formatErrorCount = 0;
          let transpositionCount = 0;
          let cplInconsistencyCount = 0;

          // 1. FORMAT & INTEGRITY CHECK
          submittedRecords.forEach(rec => {
            const student = students.find(s => s.nim === rec.nim);
            if (!student) return;

            if (rec.value !== null && (rec.value < 0 || rec.value > 100)) {
              formatErrorCount++;
              rejectedRecords.push({
                nim: rec.nim,
                name: student.name,
                type: 'FORMAT_ERROR',
                field: rec.type,
                detail: `Nilai ${rec.value} di luar batas yang diperbolehkan (0-100).`,
                expected: '0 - 100'
              });
              return;
            }
          });

          // 2. TRANSPOSITION ERROR DETECTION
          // We look for high discrepancy matches where swapping values would significantly fit expectations better.
          // For demo, we specifically look at Fajar Hidayat (low CPL 41%, has 92 submitted)
          // and Nurul Putri (high CPL 87%, has 38 submitted)
          const fajarVal = submittedRecords.find(r => r.nim === '220210004' && r.type === 'uts')?.value;
          const nurulVal = submittedRecords.find(r => r.nim === '220210005' && r.type === 'uts')?.value;

          if (fajarVal !== undefined && nurulVal !== undefined) {
            // Fajar CPL baseline is 41% -> expected range: 0-65. Nurul CPL baseline is 87% -> expected range: 70-100
            // If submitted grades are swapped (Fajar=92, Nurul=38) -> trigger transposition warning!
            if (fajarVal > 70 && nurulVal < 55) {
              transpositionCount += 2;
              rejectedRecords.push({
                nim: '220210004',
                name: 'Fajar Hidayat',
                type: 'TRANSPOSITION_SUSPECTED',
                field: 'uts',
                detail: `Nilai UTS yang diinput (92) tidak konsisten dengan profil CPL Fajar (41%). Sebaliknya, nilai Nurul Putri (38) tidak konsisten dengan CPL Nurul (87%). Kemungkinan nilai kedua mahasiswa tertukar.`,
                pairNim: '220210005',
                pairName: 'Nurul Putri',
                submittedValue: fajarVal,
                pairValue: nurulVal,
                suggestedAction: 'Tukar Nilai'
              });
              rejectedRecords.push({
                nim: '220210005',
                name: 'Nurul Putri',
                type: 'TRANSPOSITION_SUSPECTED',
                field: 'uts',
                detail: `Nilai UTS yang diinput (38) tidak konsisten dengan CPL Nurul Putri (87%). Kemungkinan nilai Nurul dan Fajar Hidayat tertukar.`,
                pairNim: '220210004',
                pairName: 'Fajar Hidayat',
                submittedValue: nurulVal,
                pairValue: fajarVal,
                suggestedAction: 'Tukar Nilai'
              });
            }
          }

          // 3. INDIVIDUAL CPL CONSISTENCY CHECK
          // Look for huge gap (>35 pts) between submitted grade and expected grade range based on CPL baseline
          // For example: Rafi Maulana (CPL 74% expected UTS [54, 89], but has UTS 28. Gap = 26 below expected edge)
          submittedRecords.forEach(rec => {
            const student = students.find(s => s.nim === rec.nim);
            if (!student) return;

            // Skip if already flagged for transposition
            if (rejectedRecords.some(r => r.nim === rec.nim)) return;

            if (rec.value !== null) {
              const expectedMin = Math.max(0, rec.type === 'uts' || rec.type === 'uas' ? student.cplBaseline - 20 : student.cplBaseline - 15);
              const expectedMax = Math.min(100, student.cplBaseline + 15);
              const gap = rec.value < expectedMin ? expectedMin - rec.value : (rec.value > expectedMax ? rec.value - expectedMax : 0);
              
              if (gap > 25) {
                cplInconsistencyCount++;
                rejectedRecords.push({
                  nim: rec.nim,
                  name: student.name,
                  type: 'INDIVIDUAL_CPL_INCONSISTENCY',
                  field: rec.type,
                  detail: `Gap ${Math.round(gap)} poin terdeteksi antara nilai ${rec.type.toUpperCase()} (${rec.value}) dan capaian CPL rata-rata mahasiswa (${student.cplBaseline}%).`,
                  cplBaseline: student.cplBaseline,
                  expectedRange: `${Math.round(expectedMin)} - ${Math.round(expectedMax)}`,
                  submittedValue: rec.value,
                  suggestedAction: 'Verifikasi Kondisi Khusus'
                });
              }
            }
          });

          // Compile class-level check
          const totalSubmitted = submittedRecords.filter(r => r.value !== null).length;
          const classSubmittedSum = submittedRecords.reduce((sum, r) => sum + (r.value || 0), 0);
          const classAvgSubmitted = totalSubmitted > 0 ? classSubmittedSum / totalSubmitted : 0;
          
          const classCplSum = students.reduce((sum, s) => sum + s.cplBaseline, 0);
          const classAvgCpl = students.length > 0 ? classCplSum / students.length : 0;
          const classGap = classAvgCpl - classAvgSubmitted;
          const pctFlagged = rejectedRecords.length / students.length;

          const isClassInconsistent = classGap > 20 && pctFlagged > 0.2;

          // Compile full report
          const reportId = `GRADE_SUB_${new Date().toISOString().slice(0,10).replace(/-/g,'')}_${selectedClass}_${selectedComponent.toUpperCase()}`;
          const report = {
            id: reportId,
            classId: selectedClass,
            component: selectedComponent,
            summary: {
              total: students.length,
              passed: students.length - rejectedRecords.length,
              rejected: rejectedRecords.length,
              rejectionBreakdown: {
                FORMAT_ERROR: formatErrorCount,
                TRANSPOSITION_SUSPECTED: transpositionCount,
                INDIVIDUAL_CPL_INCONSISTENCY: cplInconsistencyCount,
                CLASS_CPL_INCONSISTENCY: isClassInconsistent ? 1 : 0
              }
            },
            rejectedRecords,
            isClassInconsistent,
            classGap: Math.round(classGap),
            classAvgSubmitted: Math.round(classAvgSubmitted),
            classAvgCpl: Math.round(classAvgCpl),
            submittedRecords
          };

          setValidationReport(report);
          setIsValidating(false);
          setShowValidationReport(true);
        }, 800);
      }, 600);
    }, 600);
  };

  // Handle final action on Validation Report (Approve all valid, save rejections)
  const handleFinalizeValidation = () => {
    // Update student records in our main database
    const updatedStudents = [...students];
    const report = validationReport;
    
    // Set grades for all records that passed or were confirmed
    report.submittedRecords.forEach((rec: any) => {
      const index = updatedStudents.findIndex(s => s.nim === rec.nim);
      if (index === -1) return;

      const isRejected = report.rejectedRecords.some((rej: any) => rej.nim === rec.nim);
      
      // Update value
      let newValues = {};
      if (rec.type === 'all') {
        newValues = {
          uts: rec.value,
          uas: rec.value,
          tugas: rec.value,
          hadir: rec.value
        };
      } else {
        newValues = { [rec.type]: rec.value };
      }

      updatedStudents[index] = {
        ...updatedStudents[index],
        ...newValues,
        status: isRejected ? 'Rejected' : 'Lengkap'
      };

      // If rejected, store the rejection reports
      if (isRejected) {
        const studentRejections = report.rejectedRecords.filter((rej: any) => rej.nim === rec.nim);
        updatedStudents[index].rejections = studentRejections;
      } else {
        // Clear old rejections
        delete updatedStudents[index].rejections;
      }
    });

    saveStudentGrades(updatedStudents);

    // Save submission time to trigger 72h window
    const updatedSubmissionTimes = {
      ...submissionTimes,
      [selectedClass]: {
        ...(submissionTimes[selectedClass] || {}),
        [report.component]: new Date().toISOString()
      }
    };
    setSubmissionTimes(updatedSubmissionTimes);
    localStorage.setItem('aksara_grade_submission_times', JSON.stringify(updatedSubmissionTimes));

    // Audit Log
    addAuditLog({
      event: 'GRADE_SUBMISSION',
      dosenName: loggedInUser.name,
      mataKuliah: selectedClass,
      kelas: 'A',
      komponen: report.component,
      inputMethod: selectedPathway ? selectedPathway.toUpperCase() : 'MANUAL',
      totalRecords: students.length,
      status: report.summary.rejected > 0 ? 'REJECTED' : 'PASS'
    });

    setShowValidationReport(false);
    setSelectedPathway(null);
    triggerToast(`Nilai ${report.component} berhasil diproses. ${report.summary.passed} tervalidasi, ${report.summary.rejected} ditolak.`);
  };

  // Swapping transposition values on report screen
  const handleSwapValuesOnReport = (nimA: string, nimB: string) => {
    const report = { ...validationReport };
    
    // Find records in report
    const recA = report.submittedRecords.find((r: any) => r.nim === nimA);
    const recB = report.submittedRecords.find((r: any) => r.nim === nimB);
    
    if (recA && recB) {
      const temp = recA.value;
      recA.value = recB.value;
      recB.value = temp;
    }

    // Filter out transposition rejections for these two
    report.rejectedRecords = report.rejectedRecords.filter((r: any) => r.nim !== nimA && r.nim !== nimB);
    
    // Re-calculate counts
    report.summary.rejected = report.rejectedRecords.length;
    report.summary.rejectionBreakdown.TRANSPOSITION_SUSPECTED = 0;
    report.summary.passed = students.length - report.rejectedRecords.length;

    setValidationReport(report);
    triggerToast(`Nilai UTS ${students.find(s=>s.nim===nimA)?.name} dan ${students.find(s=>s.nim===nimB)?.name} berhasil ditukar!`);
  };

  // Confirming an inconsistent value is actually correct (with note)
  const handleConfirmCorrectOnReport = (nim: string, note: string) => {
    const report = { ...validationReport };
    
    // Find record
    const record = report.rejectedRecords.find((r: any) => r.nim === nim);
    if (record) {
      record.confirmed = true;
      record.notes = note;
    }

    // Remove from active block list
    report.rejectedRecords = report.rejectedRecords.filter((r: any) => r.nim !== nim || r.confirmed !== true);
    
    // Adjust stats
    report.summary.rejected = report.rejectedRecords.length;
    report.summary.rejectionBreakdown.INDIVIDUAL_CPL_INCONSISTENCY = report.rejectedRecords.filter((r: any) => r.type === 'INDIVIDUAL_CPL_INCONSISTENCY').length;
    report.summary.rejectionBreakdown.TRANSPOSITION_SUSPECTED = report.rejectedRecords.filter((r: any) => r.type === 'TRANSPOSITION_SUSPECTED').length;
    report.summary.passed = students.length - report.rejectedRecords.length;

    setValidationReport(report);
    triggerToast('Konfirmasi nilai disimpan.');
  };

  // --- PATHWAY INTERACTIONS ---
  const handleOpenPathway = (pathway: 'manual' | 'upload' | 'ocr') => {
    setSelectedPathway(pathway);
    setActivePathwayModal(false);

    if (pathway === 'manual') {
      // Load current component grades into editing state
      const initial: Record<string, string> = {};
      students.forEach(s => {
        const val = s[selectedComponent.toLowerCase() as 'uts' | 'uas' | 'tugas' | 'hadir' | 'part'];
        initial[s.nim] = val !== null ? String(val) : '';
      });
      setManualGrades(initial);
    } else if (pathway === 'upload') {
      setUploadFile(null);
      setUploadStep(1);
    } else if (pathway === 'ocr') {
      setOcrImage(null);
      setOcrStep(1);
    }
  };

  // Submit Manual grades
  const handleSubmitManual = () => {
    const records = students.map(s => {
      const strVal = manualGrades[s.nim];
      const val = strVal.trim() === '' ? null : Number(strVal);
      return {
        nim: s.nim,
        value: val,
        type: selectedComponent.toLowerCase() as 'uts' | 'uas' | 'tugas' | 'hadir' | 'part'
      };
    });

    runAgenticValidation(records);
  };

  // Simulate file paste
  const handleSimulatePaste = () => {
    const pasted: Record<string, string> = {
      '220210001': '85',
      '220210002': '28', // Intentionally low for Rafi Maulana (individual CPL inconsistent)
      '220210003': '90',
      '220210004': '92', // Intentionally swapped with Nurul
      '220210005': '38', // Intentionally swapped with Fajar
      '220210006': '65',
      '220210007': '58',
      '220210008': '82'
    };
    setManualGrades(pasted);
    triggerToast('Nilai berhasil di-paste dari clipboard Excel!');
  };

  // Pathway B: Upload Flow
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
      setUploadStep(2); // Move to column mapping
    }
  };

  const handleApplyColumnMapping = () => {
    // Generate simulated spreadsheet parsing based on selectedComponent
    const rows = students.map(s => {
      // Simulate some error in uploaded file
      let extraValue = null;
      if (s.nim === '220210004') {
        extraValue = 92; // transposition Fajar
      } else if (s.nim === '220210005') {
        extraValue = 38; // transposition Nurul
      } else if (s.nim === '220210002') {
        extraValue = 28; // CPL gap Rafi
      } else {
        extraValue = s.uts || 80;
      }

      return {
        nim: s.nim,
        name: s.name,
        value: extraValue,
        attendance: `${s.hadir}%`,
        status: 'Valid'
      };
    });

    // Add 1 extreme format error to simulate mapping check
    rows.push({
      nim: '220210999',
      name: 'Unregistered Student',
      value: 145, // format error
      attendance: '120%',
      status: 'Format Error'
    });

    setUploadPreviewData(rows);
    setUploadStep(3);
  };

  const handleConfirmUploadSubmit = () => {
    // Filter out errors and map to validation
    const validRows = uploadPreviewData.filter(r => r.nim !== '220210999');
    const records = validRows.map(r => ({
      nim: r.nim,
      value: r.value,
      type: selectedComponent.toLowerCase() as 'uts' | 'uas' | 'tugas' | 'hadir' | 'part'
    }));

    runAgenticValidation(records);
  };

  // Pathway C: OCR Flow
  const handleOcrImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setOcrImage(reader.result as string);
        setOcrStep(2);
        
        // Staggered OCR progress simulation
        setOcrProgressText('Menghubungkan ke Aksara OCR Service...');
        setTimeout(() => {
          setOcrProgressText('Mengekstrak gambar biner & layout tabular...');
          setTimeout(() => {
            setOcrProgressText('Mendeteksi nama, NIM, dan skor tulisan tangan...');
            setTimeout(() => {
              // Simulated extracted data
              const extracted = students.map(s => {
                let val = 80;
                let confidence = 95;
                if (s.nim === '220210004') {
                  val = 92; // Fajar (swapped UTS)
                  confidence = 88;
                } else if (s.nim === '220210005') {
                  val = 38; // Nurul (swapped UTS)
                  confidence = 91;
                } else if (s.nim === '220210002') {
                  val = 28; // Rafi (low UTS)
                  confidence = 68; // Handwritten signature overlapping
                } else {
                  val = s.uts || 82;
                  confidence = 94;
                }
                return {
                  nim: s.nim,
                  name: s.name,
                  value: val,
                  confidence,
                  status: confidence < 70 ? 'Review' : 'Verified'
                };
              });

              setOcrExtractedData(extracted);
              setOcrStep(3);
            }, 1000);
          }, 800);
        }, 800);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmOcrSubmit = () => {
    const records = ocrExtractedData.map(r => ({
      nim: r.nim,
      value: Number(r.value),
      type: selectedComponent.toLowerCase() as 'uts' | 'uas' | 'tugas' | 'hadir' | 'part'
    }));

    runAgenticValidation(records);
  };

  // Clean all grades back to original mock
  const handleResetGrades = () => {
    localStorage.removeItem(`aksara_grades_${selectedClass}`);
    setStudents(INITIAL_STUDENTS[selectedClass] || INITIAL_STUDENTS['KOM301']);
    triggerToast('Data nilai berhasil direset ke default.');
  };

  // --- RENDERING VIEWS ---
  if (selectedClass === 'ALL') {
    return (
      <div className="space-y-6" id="grade-validation-module">
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit">
          {['KOM301', 'KOM321', 'ALL'].map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`text-[11px] font-black uppercase tracking-wider px-4 py-2 rounded-xl transition-all ${
                selectedClass === cls
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {cls === 'ALL' ? 'Semua Kelas (Rangkuman)' : cls}
            </button>
          ))}
        </div>
        <GradeSummaryModule />
      </div>
    );
  }

  return (
    <div className="space-y-6" id="grade-validation-module">
      
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit">
        {['KOM301', 'KOM321', 'ALL'].map((cls) => (
          <button
            key={cls}
            onClick={() => setSelectedClass(cls)}
            className={`text-[11px] font-black uppercase tracking-wider px-4 py-2 rounded-xl transition-all cursor-pointer ${
              selectedClass === cls
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {cls === 'ALL' ? 'Semua Kelas (Rangkuman)' : cls}
          </button>
        ))}
      </div>

      {/* 1. TOAST CONFIRMATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-6 right-6 bg-slate-900 border border-slate-800 text-white px-5 py-3 rounded-2xl flex items-center gap-3 text-xs font-black shadow-xl z-50 font-mono"
          >
            <CheckCircle2 className="text-emerald-400" size={16} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. AGENTIC VALIDATING LOADER OVERLAY */}
      <AnimatePresence>
        {isValidating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 text-white"
          >
            <div className="max-w-md w-full px-6 text-center space-y-6">
              <div className="relative inline-flex">
                <div className="w-16 h-16 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
                <Sparkles className="absolute inset-0 m-auto text-blue-400 animate-pulse" size={24} />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-300">Aksara IQ Grade Validator</h3>
                <p className="text-xs text-slate-400 font-mono">{validationStatusText}</p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${validationProgress}%` }} />
              </div>

              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block font-mono">Pipeline Estimasi: 10-30 detik</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. MAIN HEADER & GRADE STATUS BAR */}
      <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
              {selectedClass} • Semester Ganjil 2026/27
            </span>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">KOM301 · Jurnalisme Digital · Kelas A</h2>
            <p className="text-xs text-slate-500 font-medium">Dr. Bambang Suharto • {students.length} Mahasiswa</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetGrades}
              className="text-xs border border-slate-200 text-slate-600 hover:bg-slate-50 font-black uppercase tracking-wider py-2.5 px-4 rounded-xl transition-colors flex items-center gap-2"
              title="Reset data nilai demo"
            >
              <RotateCcw size={14} /> Reset Demo
            </button>
            <button
              onClick={() => setActivePathwayModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider py-2.5 px-5 rounded-xl shadow-md shadow-blue-100 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus size={16} /> Input / Upload Nilai
            </button>
          </div>
        </div>

        {/* Component completion visualizer */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-3 border-t border-slate-100">
          {[
            { name: 'UTS', weight: '35%', filled: students.filter(s => s.uts !== null).length, status: getRemainingTime('UTS') !== null ? 'TERKUNCI' : 'LENGKAP' },
            { name: 'UAS', weight: '35%', filled: students.filter(s => s.uas !== null).length, status: 'BELUM DIINPUT' },
            { name: 'Tugas', weight: '20%', filled: students.filter(s => s.tugas !== null).length, status: 'LENGKAP' },
            { name: 'Kehadiran', weight: 'Presensi', filled: students.filter(s => s.hadir !== null).length, status: 'LENGKAP' },
            { name: 'Partisipasi', weight: '10%', filled: students.filter(s => s.part !== null).length, status: 'LENGKAP' },
          ].map((comp, idx) => {
            const pct = Math.round((comp.filled / students.length) * 100);
            const remaining = getRemainingTime(comp.name);
            
            return (
              <div key={idx} className="bg-slate-50/70 border border-slate-200 shadow-sm p-3.5 rounded-2xl flex flex-col justify-between gap-2.5">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-black text-slate-800">{comp.name}</h4>
                    <span className="text-[9px] font-bold text-slate-400">Bobot: {comp.weight}</span>
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                    remaining !== null && remaining > 0
                      ? 'bg-amber-50 text-amber-600 border border-amber-100'
                      : pct === 100 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                        : 'bg-slate-100 text-slate-500'
                  }`}>
                    {remaining !== null && remaining > 0 ? '72h Window' : comp.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-bold font-mono">
                    <span className="text-slate-500">{comp.filled}/{students.length} Mhs</span>
                    <span className="text-slate-800">{pct}%</span>
                  </div>
                  <div className="w-full bg-slate-200/60 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-300 ${remaining !== null && remaining > 0 ? 'bg-amber-500' : 'bg-blue-600'}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>

                {/* Remaining window text */}
                {remaining !== null && remaining > 0 && (
                  <div className="flex items-center gap-1 text-[9px] font-bold text-amber-600 font-mono">
                    <Clock size={10} /> {formatRemainingTime(remaining)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. MAIN STUDENTS SPREADSHEET */}
      <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-black text-slate-900 tracking-tight">Lembar Nilai Kelas</h3>
            <span className="text-[10px] font-mono font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Aktivitas Baru</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Cari NIM atau Nama..." 
                className="pl-8 pr-4 py-1.5 border border-slate-200 rounded-xl text-xs font-bold w-48 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
              />
            </div>
            <button className="text-xs border border-slate-200 hover:bg-slate-50 font-black uppercase tracking-wider py-2 px-3.5 rounded-xl transition-colors flex items-center gap-2">
              <Download size={13} /> Ekspor (CSV)
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 shadow-sm text-[10px] font-black text-slate-500 uppercase tracking-wider font-mono">
                <th className="py-4 px-6">Mahasiswa</th>
                <th className="py-4 px-6">NIM</th>
                <th className="py-4 px-6 text-center">UTS (35%)</th>
                <th className="py-4 px-6 text-center">UAS (35%)</th>
                <th className="py-4 px-6 text-center">Tugas (20%)</th>
                <th className="py-4 px-6 text-center">Hadir (Presensi)</th>
                <th className="py-4 px-6 text-center">Part. (10%)</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-right">CPL Ref</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
              {students.map((student) => {
                // Determine row highlight based on status
                let rowBg = 'hover:bg-slate-50/50';
                if (student.status === 'Rejected') rowBg = 'bg-rose-50/30 hover:bg-rose-50/50';

                const remainingUtsWindow = getRemainingTime('UTS');
                const isUtsLocked = remainingUtsWindow === 0;

                return (
                  <tr key={student.id} className={`${rowBg} transition-all`}>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-black text-slate-900">{student.name}</span>
                        {student.rejections && student.rejections.length > 0 && (
                          <div className="flex items-center gap-1 text-[9px] text-rose-600 font-bold uppercase tracking-wide mt-1 animate-pulse">
                            <AlertCircle size={10} /> {student.rejections[0].type.replace(/_/g,' ')}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-400 font-mono font-bold">{student.nim}</td>
                    
                    {/* UTS CELL */}
                    <td className="py-4 px-6 text-center font-mono">
                      <span className={`inline-block px-2.5 py-1 rounded-lg ${
                        isUtsLocked 
                          ? 'bg-slate-100 text-slate-500' 
                          : student.rejections?.some(r=>r.field==='uts') 
                            ? 'bg-rose-100 text-rose-700 border border-rose-200' 
                            : 'text-slate-800'
                      }`}>
                        {student.uts ?? '—'}
                      </span>
                    </td>

                    {/* UAS CELL */}
                    <td className="py-4 px-6 text-center font-mono text-slate-400 italic">
                      {student.uas ?? '—'}
                    </td>

                    {/* Tugas CELL */}
                    <td className="py-4 px-6 text-center font-mono text-slate-800">
                      {student.tugas ?? '—'}
                    </td>

                    {/* Kehadiran CELL */}
                    <td className="py-4 px-6 text-center font-mono text-slate-800">
                      {student.hadir}%
                    </td>

                    {/* Partisipasi CELL */}
                    <td className="py-4 px-6 text-center font-mono text-slate-800">
                      {student.part}
                    </td>

                    {/* STATUS TAG */}
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider ${
                        isUtsLocked
                          ? 'bg-slate-100 text-slate-500 border border-slate-200'
                          : student.status === 'Lengkap' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            : student.status === 'Rejected'
                              ? 'bg-rose-50 text-rose-600 border border-rose-100'
                              : 'bg-amber-50 text-amber-600 border border-amber-100'
                      }`}>
                        {isUtsLocked ? '🔒 Terkunci' : student.status}
                      </span>
                    </td>

                    {/* CPL REF VALUE */}
                    <td className="py-4 px-6 text-right font-mono text-slate-500">
                      <div className="flex items-center justify-end gap-1.5">
                        <span>{student.cplBaseline}%</span>
                        <div className="w-1.5 h-1.5 rounded-full" style={{
                          backgroundColor: student.cplBaseline >= 80 ? '#10b981' : student.cplBaseline >= 60 ? '#3b82f6' : '#f43f5e'
                        }} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. AUDIT TRAIL LOGGING VIEW (JetBrains Mono Accent) */}
      <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-6 shadow-xl space-y-4 text-slate-100 font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <Activity className="text-blue-400" size={16} />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-300">Grade Validation Audit Trail</h3>
          </div>
          <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Secure Cryptographic Ledger • Aksara IQ</span>
        </div>

        <div className="space-y-2.5 max-h-48 overflow-y-auto text-[11px] pr-1 scrollbar-thin scrollbar-thumb-slate-800">
          {auditTrail.map((log) => (
            <div key={log.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl border border-slate-850 bg-slate-950/40 hover:bg-slate-950/80 transition-colors">
              <div className="flex items-start sm:items-center gap-2.5">
                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded font-sans ${
                  log.status === 'PASS' 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : log.status === 'REJECTED'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {log.status}
                </span>
                <div className="space-y-0.5">
                  <p className="font-black text-slate-200">
                    EVENT: <span className="text-blue-400 font-bold">{log.event}</span> • MK: <span className="text-slate-300 font-bold">{log.mataKuliah}</span> • Komponen: <span className="text-amber-400 font-bold">{log.komponen}</span>
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold">
                    Narasumber: {log.dosenName} • Metode: {log.inputMethod} • Records: {log.totalRecords}
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 shrink-0 self-end sm:self-auto font-mono">{new Date(log.timestamp).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL 1: SELECT PATHWAY AND COMPONENT --- */}
      <AnimatePresence>
        {activePathwayModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-40 p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 rounded-[32px] max-w-2xl w-full p-6 shadow-2xl space-y-6 text-slate-800"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">Input Nilai — {selectedClass} Kelas A</h3>
                  <p className="text-xs text-slate-500 font-medium">Pilih komponen akademik dan media yang ingin Anda isi nilainya.</p>
                </div>
                <button 
                  onClick={() => setActivePathwayModal(false)}
                  className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 text-slate-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Component selection row */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-mono">PILIH KOMPONEN NILAI</label>
                <div className="flex flex-wrap gap-2">
                  {(['ALL', 'UTS', 'UAS', 'Tugas', 'Kehadiran'] as const).map((comp) => (
                    <button
                      key={comp}
                      onClick={() => setSelectedComponent(comp as any)}
                      className={`text-xs font-black px-4 py-2.5 rounded-xl transition-all cursor-pointer border ${
                        selectedComponent === comp 
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-100' 
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      {comp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pathways selection layout */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-mono">PILIH METODE INPUT</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Pathway 1: Manual */}
                  <div className="border border-slate-200 shadow-sm p-5 rounded-[24px] flex flex-col justify-between gap-4 hover:border-slate-300 transition-colors bg-slate-50/50">
                    <div className="space-y-1">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                        <Table size={20} />
                      </div>
                      <h4 className="text-xs font-black text-slate-900 pt-1.5 uppercase tracking-wide">Input Manual</h4>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Isi nilai mahasiswa langsung di spreadsheet inline dengan navigasi keyboard.</p>
                    </div>
                    <button
                      onClick={() => handleOpenPathway('manual')}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-colors"
                    >
                      Pilih Manual
                    </button>
                  </div>

                  {/* Pathway 2: Upload */}
                  <div className="border border-slate-200 shadow-sm p-5 rounded-[24px] flex flex-col justify-between gap-4 hover:border-slate-300 transition-colors bg-slate-50/50">
                    <div className="space-y-1">
                      <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                        <Upload size={20} />
                      </div>
                      <h4 className="text-xs font-black text-slate-900 pt-1.5 uppercase tracking-wide">Upload File</h4>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Unggah file Excel / CSV nilai dengan bantuan mapping kolom otomatis dari AI.</p>
                    </div>
                    <button
                      onClick={() => handleOpenPathway('upload')}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-colors"
                    >
                      Pilih Upload
                    </button>
                  </div>

                  {/* Pathway 3: Scan / OCR */}
                  <div className="border border-slate-200 shadow-sm p-5 rounded-[24px] flex flex-col justify-between gap-4 hover:border-slate-300 transition-colors bg-slate-50/50">
                    <div className="space-y-1">
                      <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                        <Camera size={20} />
                      </div>
                      <h4 className="text-xs font-black text-slate-900 pt-1.5 uppercase tracking-wide">Foto / Scan OCR</h4>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Ekstrak nilai langsung dari kertas presensi/ujian fisik tulisan tangan.</p>
                    </div>
                    <button
                      onClick={() => handleOpenPathway('ocr')}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-colors"
                    >
                      Pilih Scan OCR
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 shadow-sm p-4 rounded-2xl flex items-start gap-3">
                <Sparkles className="text-blue-500 mt-0.5 shrink-0" size={16} />
                <p className="text-[11px] leading-relaxed text-slate-600 font-medium">
                  Semua nilai yang diinputkan akan divalidasi oleh <span className="font-extrabold text-blue-600 font-mono">Aksara Grade Agent</span> secara multi-dimensi (format check, transposition detection, dan CPL consistency check) sebelum final.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MODAL 2: PATHWAY INTERFACES --- */}
      <AnimatePresence>
        {selectedPathway && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-40 p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 rounded-[32px] max-w-4xl w-full p-6 shadow-2xl space-y-6 text-slate-800 my-8"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    {selectedPathway === 'manual' ? <Table size={18} /> : selectedPathway === 'upload' ? <Upload size={18} /> : <Camera size={18} />}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 tracking-tight">
                      Input Nilai {selectedComponent} — {selectedPathway === 'manual' ? 'Spreadsheet Inline' : selectedPathway === 'upload' ? 'Upload File Excel' : 'Foto / Scan OCR'}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">KOM301 · Jurnalisme Digital · Kelas A</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedPathway(null)}
                  className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 text-slate-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* 2A: PATHWAY MANUAL (SPREADSHEET INLINE) */}
              {selectedPathway === 'manual' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-200 shadow-sm p-4 rounded-2xl flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="text-blue-500" size={16} />
                      <span className="text-[11px] text-slate-600 font-medium">Navigasi keyboard: gunakan tombol <b>Tab / Enter</b> untuk memindahkan fokus sel.</span>
                    </div>
                    <button 
                      onClick={handleSimulatePaste}
                      className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-xl transition-colors shadow-sm font-mono"
                    >
                      📋 Paste Nilai Simulasi
                    </button>
                  </div>

                  {/* Inline table sheet */}
                  <div className="border border-slate-200 rounded-2xl overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 shadow-sm text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">
                          <th className="py-3 px-5">NIM</th>
                          <th className="py-3 px-5">Nama Mahasiswa</th>
                          <th className="py-3 px-5 text-center">Nilai {selectedComponent}</th>
                          <th className="py-3 px-5 text-center">CPL Ref</th>
                          <th className="py-3 px-5 text-right">Real-Time Check</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150 text-xs font-bold text-slate-700">
                        {students.map((student) => {
                          const valStr = manualGrades[student.nim] ?? '';
                          const numericVal = valStr.trim() !== '' ? Number(valStr) : null;
                          const isInvalid = numericVal !== null && (numericVal < 0 || numericVal > 100);
                          const isEmpty = valStr.trim() === '';

                          return (
                            <tr key={student.id} className="hover:bg-slate-50/40">
                              <td className="py-2.5 px-5 font-mono text-slate-400 font-black">{student.nim}</td>
                              <td className="py-2.5 px-5 text-slate-800">{student.name}</td>
                              <td className="py-2.5 px-5 text-center">
                                <input 
                                  type="text"
                                  value={valStr}
                                  onChange={(e) => setManualGrades({ ...manualGrades, [student.nim]: e.target.value })}
                                  placeholder="Masukkan nilai"
                                  className={`w-24 text-center px-2 py-1.5 border rounded-lg text-xs font-mono font-black focus:outline-none transition-colors ${
                                    isInvalid 
                                      ? 'bg-rose-50 border-rose-300 text-rose-700 focus:ring-1 focus:ring-rose-500' 
                                      : isEmpty
                                        ? 'bg-amber-50/50 border-amber-200 text-amber-700 focus:ring-1 focus:ring-blue-500'
                                        : 'bg-white border-slate-250 text-slate-900 focus:ring-1 focus:ring-blue-500'
                                  }`}
                                />
                              </td>
                              <td className="py-2.5 px-5 text-center font-mono text-slate-500">
                                {student.cplBaseline}%
                              </td>
                              <td className="py-2.5 px-5 text-right">
                                {isInvalid ? (
                                  <span className="text-[10px] text-rose-600 font-extrabold uppercase font-mono">⚠️ 0 - 100 saja</span>
                                ) : isEmpty ? (
                                  <span className="text-[10px] text-amber-600 font-bold uppercase font-mono">Kosong</span>
                                ) : (
                                  <span className="text-[10px] text-emerald-600 font-bold font-mono">Siap Validasi</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Actions footer */}
                  <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                    <button 
                      onClick={() => setSelectedPathway(null)}
                      className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-black uppercase tracking-wider rounded-xl transition-colors"
                    >
                      Batal
                    </button>
                    <button 
                      onClick={handleSubmitManual}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md shadow-blue-100 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles size={14} /> Submit & Validasi AI
                    </button>
                  </div>
                </div>
              )}

              {/* 2B: PATHWAY UPLOAD (EXCEL/CSV MAPPING) */}
              {selectedPathway === 'upload' && (
                <div className="space-y-6">
                  {/* Process Stepper */}
                  <div className="flex items-center justify-center gap-4 text-xs font-black font-mono tracking-wider">
                    <div className={`flex items-center gap-1.5 ${uploadStep === 1 ? 'text-blue-600' : 'text-slate-400'}`}>
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${uploadStep === 1 ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>1</span>
                      UPLOAD FILE
                    </div>
                    <ArrowRight className="text-slate-300" size={14} />
                    <div className={`flex items-center gap-1.5 ${uploadStep === 2 ? 'text-blue-600' : 'text-slate-400'}`}>
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${uploadStep === 2 ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>2</span>
                      COLUMN MAPPING
                    </div>
                    <ArrowRight className="text-slate-300" size={14} />
                    <div className={`flex items-center gap-1.5 ${uploadStep === 3 ? 'text-blue-600' : 'text-slate-400'}`}>
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${uploadStep === 3 ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>3</span>
                      PREVIEW & SUBMIT
                    </div>
                  </div>

                  {/* STEP 1: DROPZONE */}
                  {uploadStep === 1 && (
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-slate-350 hover:border-blue-500 rounded-3xl p-10 flex flex-col items-center justify-center text-center gap-4 transition-colors bg-slate-50/50 cursor-pointer relative group">
                        <input 
                          type="file" 
                          accept=".xlsx,.xls,.csv" 
                          onChange={handleFileUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                          <FileSpreadsheet size={28} />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">Drop file atau klik untuk upload</h4>
                          <p className="text-xs text-slate-400 font-semibold">Mendukung format file XLS, XLSX, atau CSV nilai (Maks. 10MB)</p>
                        </div>
                        
                        <button className="text-xs bg-white border border-slate-250 hover:bg-slate-50 text-slate-700 font-black uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all shadow-sm">
                          Pilih Dokumen Anda
                        </button>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <button className="text-xs font-black text-blue-600 hover:underline flex items-center gap-1">
                          <Download size={13} /> Download Template Excel Resmi Unpad
                        </button>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block font-mono">Batas: Maks 500 Baris</span>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: COLUMN MAPPING */}
                  {uploadStep === 2 && (
                    <div className="space-y-5">
                      <div className="bg-slate-50 border border-slate-200 shadow-sm p-4 rounded-2xl flex items-start gap-3">
                        <Sparkles className="text-blue-500 mt-0.5" size={16} />
                        <div>
                          <h5 className="text-xs font-extrabold text-slate-900 uppercase">AI Auto-Detect Kolom Aktif</h5>
                          <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">Sistem memetakan header dari dokumen Anda secara cerdas. Mohon verifikasi ketepatannya.</p>
                        </div>
                      </div>

                      <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                        {/* Headers */}
                        <div className="bg-slate-50 px-5 py-3 text-[10px] font-black text-slate-500 uppercase tracking-wider grid grid-cols-12 font-mono">
                          <div className="col-span-5">Kolom Berkas Terdeteksi</div>
                          <div className="col-span-5">DIPETAKAN KE KOMPONEN</div>
                          <div className="col-span-2 text-right">Confidence</div>
                        </div>

                        {/* Mapping Rows */}
                        {(selectedComponent === 'ALL' ? [
                          { fileCol: 'NIM Mahasiswa', dbCol: 'NIM', confidence: '98%', badge: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
                          { fileCol: 'Nama Lengkap', dbCol: 'Nama Mahasiswa', confidence: '96%', badge: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
                          { fileCol: `Nilai UTS Final`, dbCol: 'UTS', confidence: '99%', badge: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
                          { fileCol: `Nilai UAS Final`, dbCol: 'UAS', confidence: '99%', badge: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
                          { fileCol: `Nilai Tugas Final`, dbCol: 'Tugas', confidence: '99%', badge: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
                          { fileCol: 'Kehadiran Mahasiswa', dbCol: 'Kehadiran', confidence: '88%', badge: 'bg-amber-50 text-amber-700 border-amber-100' },
                        ] : [
                          { fileCol: 'NIM Mahasiswa', dbCol: 'NIM', confidence: '98%', badge: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
                          { fileCol: 'Nama Lengkap', dbCol: 'Nama Mahasiswa', confidence: '96%', badge: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
                          { fileCol: `Nilai ${selectedComponent} Final`, dbCol: selectedComponent, confidence: '99%', badge: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
                          { fileCol: 'Kehadiran Mahasiswa', dbCol: 'Kehadiran', confidence: '88%', badge: 'bg-amber-50 text-amber-700 border-amber-100' },
                        ]).map((m, idx) => (
                          <div key={idx} className="px-5 py-3.5 grid grid-cols-12 items-center text-xs font-bold text-slate-700">
                            <div className="col-span-5 flex items-center gap-2">
                              <FileText size={14} className="text-slate-400" />
                              <span className="font-mono text-slate-900">{m.fileCol}</span>
                            </div>
                            <div className="col-span-5">
                              <select 
                                defaultValue={m.dbCol}
                                className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-black bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                              >
                                <option value="NIM">NIM</option>
                                <option value="Nama Mahasiswa">Nama Mahasiswa</option>
                                <option value="UTS">UTS</option>
                                <option value="UAS">UAS</option>
                                <option value="Tugas">Tugas</option>
                                <option value="Kehadiran">Kehadiran</option>
                              </select>
                            </div>
                            <div className="col-span-2 text-right">
                              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black font-mono border ${m.badge}`}>{m.confidence}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                        <button 
                          onClick={() => setUploadStep(1)}
                          className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-black uppercase tracking-wider rounded-xl transition-colors"
                        >
                          Kembali
                        </button>
                        <button 
                          onClick={handleApplyColumnMapping}
                          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                        >
                          Lanjut Ke Preview <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: PREVIEW & FORMAT CHECK */}
                  {uploadStep === 3 && (
                    <div className="space-y-5">
                      <div className="flex justify-between items-center bg-slate-50 border border-slate-200 shadow-sm p-4 rounded-2xl">
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-extrabold text-slate-900 uppercase">Hasil Pemindaian Format Berkas</h4>
                          <p className="text-[11px] text-slate-500 font-medium">Ditemukan <b>{uploadPreviewData.length - 1} data valid</b> dan <b>1 data bermasalah</b>.</p>
                        </div>
                        <span className="text-[10px] text-rose-600 bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-xl font-black uppercase font-mono tracking-wider flex items-center gap-1">
                          <AlertTriangle size={12} /> 1 Isu Format
                        </span>
                      </div>

                      {/* Preview Table */}
                      <div className="border border-slate-200 rounded-2xl overflow-hidden max-h-64 overflow-y-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 shadow-sm text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">
                              <th className="py-2.5 px-5">NIM</th>
                              <th className="py-2.5 px-5">Nama Lengkap</th>
                              <th className="py-2.5 px-5 text-center">Nilai Terdeteksi</th>
                              <th className="py-2.5 px-5 text-center">Presensi</th>
                              <th className="py-2.5 px-5 text-right">Status Deteksi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                            {uploadPreviewData.map((row, idx) => {
                              const isErr = row.status === 'Format Error';
                              return (
                                <tr key={idx} className={isErr ? 'bg-rose-50/40' : 'hover:bg-slate-50/30'}>
                                  <td className="py-2 px-5 font-mono text-slate-400 font-bold">{row.nim}</td>
                                  <td className="py-2 px-5 text-slate-800">{row.name}</td>
                                  <td className={`py-2 px-5 text-center font-mono ${isErr ? 'text-rose-600 font-black' : ''}`}>{row.value}</td>
                                  <td className="py-2 px-5 text-center font-mono">{row.attendance}</td>
                                  <td className="py-2 px-5 text-right font-mono">
                                    <span className={`text-[9px] font-black uppercase tracking-wider ${isErr ? 'text-rose-600' : 'text-emerald-600'}`}>
                                      {isErr ? '✗ UTS > 100' : '✓ Valid'}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                        <button 
                          onClick={() => setUploadStep(2)}
                          className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-black uppercase tracking-wider rounded-xl transition-colors"
                        >
                          Kembali
                        </button>
                        
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={handleConfirmUploadSubmit}
                            className="px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-black uppercase tracking-wider rounded-xl transition-colors"
                          >
                            Skip Error & Lanjut
                          </button>
                          <button 
                            onClick={handleConfirmUploadSubmit}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                          >
                            <Sparkles size={14} /> Submit Semua & Validasi AI
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 2C: PATHWAY OCR / SCAN */}
              {selectedPathway === 'ocr' && (
                <div className="space-y-6">
                  {/* STEP 1: SELECT IMAGE OR WEBCAM */}
                  {ocrStep === 1 && (
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-slate-350 hover:border-blue-500 rounded-3xl p-10 flex flex-col items-center justify-center text-center gap-4 transition-colors bg-slate-50/50 cursor-pointer relative group">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleOcrImageSelect}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                          <Camera size={28} />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">PILIH ATAU AMBIL FOTO DAFTAR NILAI KERTAS</h4>
                          <p className="text-xs text-slate-400 font-semibold">Mendukung file gambar PNG, JPG, JPEG, atau HEIC dari perangkat Anda</p>
                        </div>
                        
                        <button className="text-xs bg-white border border-slate-250 hover:bg-slate-50 text-slate-700 font-black uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all shadow-sm">
                          Ambil/Pilih Foto Kertas Ujian
                        </button>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 shadow-sm p-4 rounded-2xl flex items-start gap-3 text-slate-600">
                        <Info className="text-blue-500 mt-0.5" size={16} />
                        <div className="text-[11px] leading-relaxed font-medium">
                          <b>Tips Pemindaian Optimal:</b> pastikan lembaran kertas berada di bidang datar, teks terbaca jelas dengan cahaya yang cukup, dan sudut kemiringan kamera tidak melebihi 15 derajat.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: PROCESSING / EXTRACTING */}
                  {ocrStep === 2 && (
                    <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
                        <Camera className="absolute inset-0 m-auto text-emerald-500 animate-pulse" size={24} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">Aksara OCR Engine Aktif</h4>
                        <p className="text-xs text-slate-400 font-mono">{ocrProgressText}</p>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: REVIEW & CORRECTION */}
                  {ocrStep === 3 && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Left: Original Scanned Document Preview */}
                      <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-4 flex flex-col justify-between text-white gap-3 border border-slate-800 shadow-md">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block font-mono">DOKUMEN SCAN ASLI</span>
                        
                        <div className="flex-1 bg-slate-950 border border-slate-850 rounded-2xl flex items-center justify-center relative overflow-hidden h-64 select-none">
                          <img 
                            src={ocrImage || "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=600"} 
                            alt="Scan Preview" 
                            className="w-full h-full object-cover opacity-40 blur-xs"
                          />
                          <div className="absolute inset-0 p-4 font-mono text-[9px] text-green-400 flex flex-col gap-1.5 leading-none">
                            <div className="text-slate-400 uppercase font-black text-[10px] border-b border-slate-800 pb-1 flex justify-between">
                              <span>OCR BOUNDING BOXES</span>
                              <span className="animate-pulse">🔴 ONLINE</span>
                            </div>
                            <div>{"[NIM: 220210001] -> MATCH ANISA [CONF 94%]"}</div>
                            <div>{"[NIM: 220210002] -> MATCH RAFI [CONF 68%] *overlap*"}</div>
                            <div>{"[NIM: 220210003] -> MATCH DINA [CONF 95%]"}</div>
                            <div>{"[NIM: 220210004] -> MATCH FAJAR [CONF 88%]"}</div>
                            <div>{"[NIM: 220210005] -> MATCH NURUL [CONF 91%]"}</div>
                            <div className="absolute bottom-4 left-4 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded text-[8px] text-yellow-400 font-black">
                              ⚠ CONFIDENCE RENDAH TERDETEKSI (RAFI MAULANA)
                            </div>
                          </div>
                        </div>

                        <span className="text-[10px] text-slate-500 font-bold leading-relaxed font-sans">
                          Klik sel pada tabel review kanan untuk mengoreksi secara manual nilai hasil ekstraksi biner OCR.
                        </span>
                      </div>

                      {/* Right: Review extracted table */}
                      <div className="lg:col-span-7 space-y-4">
                        <div className="bg-slate-50 border border-slate-200 shadow-sm p-4 rounded-2xl flex justify-between items-center">
                          <div className="space-y-0.5">
                            <h4 className="text-xs font-extrabold text-slate-900 uppercase">Review & Koreksi Hasil OCR</h4>
                            <p className="text-[11px] text-slate-500 font-medium">Lakukan konfirmasi manual terhadap karakter hasil deteksi OCR.</p>
                          </div>
                          <span className="text-[9px] bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-xl font-black font-mono">1 Review Diperlukan</span>
                        </div>

                        {/* Extracted tabular data */}
                        <div className="border border-slate-200 rounded-2xl overflow-hidden max-h-56 overflow-y-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-200 shadow-sm text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">
                                <th className="py-2 px-4">Nama</th>
                                <th className="py-2 px-4 text-center">Nilai Terbaca</th>
                                <th className="py-2 px-4 text-center">Confidence</th>
                                <th className="py-2 px-4 text-right">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-700">
                              {ocrExtractedData.map((row, idx) => {
                                const isLowConf = row.confidence < 70;
                                return (
                                  <tr key={idx} className={isLowConf ? 'bg-amber-50/30' : 'hover:bg-slate-50/20'}>
                                    <td className="py-2 px-4">
                                      <div className="flex flex-col">
                                        <span className="text-slate-900">{row.name}</span>
                                        <span className="text-[9px] text-slate-400 font-mono">NIM: {row.nim}</span>
                                      </div>
                                    </td>
                                    <td className="py-2 px-4 text-center">
                                      <input 
                                        type="number" 
                                        value={row.value}
                                        onChange={(e) => {
                                          const updated = [...ocrExtractedData];
                                          updated[idx].value = e.target.value;
                                          updated[idx].confidence = 100; // marked as manually updated
                                          updated[idx].status = 'Verified';
                                          setOcrExtractedData(updated);
                                        }}
                                        className="w-16 px-1 py-1 border border-slate-250 rounded text-center font-mono font-black text-xs"
                                      />
                                    </td>
                                    <td className="py-2 px-4 text-center font-mono">
                                      <span className={isLowConf ? 'text-amber-600 font-extrabold' : 'text-slate-400'}>{row.confidence}%</span>
                                    </td>
                                    <td className="py-2 px-4 text-right">
                                      <span className={`text-[9px] font-black uppercase tracking-wider ${isLowConf ? 'text-amber-600 animate-pulse' : 'text-emerald-600'}`}>
                                        {isLowConf ? '⚠️ Review' : '✓ Verified'}
                                      </span>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                          <button 
                            onClick={() => setOcrStep(1)}
                            className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-black uppercase tracking-wider rounded-xl transition-colors"
                          >
                            Ulangi Scan
                          </button>
                          <button 
                            onClick={handleConfirmOcrSubmit}
                            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                          >
                            <Sparkles size={14} /> Submit Hasil & Validasi AI
                          </button>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MODAL 3: AGENTIC VALIDATION REPORT DIALOG --- */}
      <AnimatePresence>
        {showValidationReport && validationReport && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center z-45 p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white border border-slate-200 rounded-[32px] max-w-3xl w-full p-6 shadow-2xl space-y-6 text-slate-800 my-8"
            >
              {/* Header */}
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="text-blue-600 fill-blue-500 animate-pulse" size={18} />
                    <h3 className="text-base font-black text-slate-900 uppercase tracking-wider font-mono">Hasil Validasi — {validationReport.component} {validationReport.classId}</h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-normal">
                    Laporan evaluasi pedagogis multi-dimensi dari <span className="font-extrabold text-blue-600">Aksara IQ Grade Validation Agent</span>.
                  </p>
                </div>
                <button 
                  onClick={() => setShowValidationReport(false)}
                  className="p-2 border border-slate-200 rounded-full hover:bg-slate-50 text-slate-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Summary Stats Strip */}
              <div className="grid grid-cols-3 gap-3 bg-slate-50 border border-slate-200 shadow-sm p-4 rounded-2xl text-center">
                <div className="space-y-0.5 border-r border-slate-250">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block font-mono">TOTAL SUBMISSION</span>
                  <p className="text-lg font-black text-slate-800 font-mono">{validationReport.summary.total} Mhs</p>
                </div>
                <div className="space-y-0.5 border-r border-slate-250">
                  <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest block font-mono">✓ LOLOS VALIDASI</span>
                  <p className="text-lg font-black text-emerald-600 font-mono">{validationReport.summary.passed} Mhs</p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-black text-rose-600 uppercase tracking-widest block font-mono">✗ REJECTED / REVISE</span>
                  <p className="text-lg font-black text-rose-600 font-mono">{validationReport.summary.rejected} Mhs</p>
                </div>
              </div>

              {/* REPORT SECTIONS */}
              <div className="space-y-5 max-h-[350px] overflow-y-auto pr-1">

                {/* SECTION 1: TRANSPOSITION WARNINGS */}
                {validationReport.summary.rejectionBreakdown.TRANSPOSITION_SUSPECTED > 0 && (
                  <div className="border border-rose-150 rounded-2xl overflow-hidden shadow-xs">
                    <div className="bg-rose-50 px-4 py-3 border-b border-rose-100 flex items-center gap-2">
                      <AlertTriangle className="text-rose-600 animate-pulse" size={16} />
                      <h4 className="text-xs font-black text-rose-900 uppercase tracking-wider font-mono">✗ Kemungkinan Transposisi (Grade Swapped)</h4>
                    </div>

                    <div className="p-4 divide-y divide-slate-100 space-y-4">
                      {/* Pair Details */}
                      <div className="space-y-3">
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                          Sistem mendeteksi pencapaian UTS mahasiswa berikut tidak konsisten dengan rata-rata CPL mereka. Dan sebaliknya, menukar nilai kedua mahasiswa ini akan menempatkan mereka dalam performa band yang sempurna.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 bg-slate-50/50 p-3 rounded-xl border border-slate-200 shadow-sm">
                          <div className="space-y-1 text-xs">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono">Mahasiswa A</span>
                            <p className="font-black text-slate-850">Fajar Hidayat <span className="font-mono text-slate-400 font-bold">(220210004)</span></p>
                            <p className="text-slate-500 font-semibold">CPL Baseline: <span className="font-bold text-rose-600">41% (Low)</span></p>
                            <p className="text-slate-500 font-semibold">Submitted UTS: <span className="font-black text-slate-800 font-mono">92</span> (Expected &lt;= 65)</p>
                          </div>
                          <div className="space-y-1 text-xs">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono">Mahasiswa B</span>
                            <p className="font-black text-slate-850">Nurul Putri <span className="font-mono text-slate-400 font-bold">(220210005)</span></p>
                            <p className="text-slate-500 font-semibold">CPL Baseline: <span className="font-bold text-emerald-600">87% (High)</span></p>
                            <p className="text-slate-500 font-semibold">Submitted UTS: <span className="font-black text-slate-800 font-mono">38</span> (Expected &gt;= 70)</p>
                          </div>
                        </div>

                        <div className="flex gap-2.5 pt-1.5 justify-end">
                          <button 
                            onClick={() => handleSwapValuesOnReport('220210004', '220210005')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black uppercase tracking-widest py-2 px-4 rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
                          >
                            <Check size={11} /> Ya, Tukar Nilai (Swap)
                          </button>
                          <button 
                            onClick={() => handleConfirmCorrectOnReport('220210004', 'Nilai dikonfirmasi sudah benar setelah verifikasi kertas.')}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-black uppercase tracking-widest py-2 px-4 rounded-xl transition-colors"
                          >
                            Nilai Sudah Benar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SECTION 2: INDIVIDUAL CPL CONSISTENCY WARNINGS */}
                {validationReport.summary.rejectionBreakdown.INDIVIDUAL_CPL_INCONSISTENCY > 0 && (
                  <div className="border border-amber-150 rounded-2xl overflow-hidden shadow-xs">
                    <div className="bg-amber-50 px-4 py-3 border-b border-amber-100 flex items-center gap-2">
                      <AlertCircle className="text-amber-600" size={16} />
                      <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider font-mono">✗ CPL Inconsistency — Level Individu</h4>
                    </div>

                    <div className="p-4 divide-y divide-slate-150 space-y-4">
                      {validationReport.rejectedRecords
                        .filter((r: any) => r.type === 'INDIVIDUAL_CPL_INCONSISTENCY')
                        .map((m: any, idx: number) => (
                          <div key={idx} className="space-y-3 pt-3 first:pt-0">
                            <div className="flex justify-between items-start flex-wrap gap-2 text-xs">
                              <div className="space-y-0.5">
                                <span className="text-[10px] font-black text-slate-400 font-mono">{m.nim}</span>
                                <h5 className="font-black text-slate-900">{m.name}</h5>
                              </div>
                              <span className="text-[9px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-mono font-black border border-amber-100">CPL: {m.cplBaseline}%</span>
                            </div>

                            <p className="text-[11px] leading-relaxed text-slate-600 font-medium">
                              Ada gap <b>46 poin</b> di bawah estimasi capaian belajar. {m.detail}
                            </p>

                            <div className="flex flex-wrap gap-2 pt-1 justify-end">
                              {(['SAKIT', 'TANPA_KETERANGAN', 'KONDISI_KHUSUS'] as const).map((reason) => (
                                <button
                                  key={reason}
                                  onClick={() => handleConfirmCorrectOnReport(m.nim, `Dikonfirmasi dengan alasan: ${reason}`)}
                                  className="border border-slate-200 hover:bg-slate-50 text-slate-700 text-[9px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg transition-colors"
                                >
                                  Tandai {reason.replace(/_/g,' ')}
                                </button>
                              ))}
                              <button
                                onClick={() => handleConfirmCorrectOnReport(m.nim, 'Dikonfirmasi bernilai benar tanpa kondisi khusus.')}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all"
                              >
                                Nilai Sudah Benar
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* SECTION 3: CLASS-LEVEL CPL CONSISTENCY WARNINGS */}
                {validationReport.isClassInconsistent && (
                  <div className="border border-slate-250 rounded-2xl overflow-hidden shadow-xs bg-slate-50/50">
                    <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                      <Sparkles className="text-slate-600 fill-slate-400" size={16} />
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider font-mono">ℹ CPL Inconsistency — Level Kelas (Informational)</h4>
                    </div>

                    <div className="p-4 space-y-4">
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        Rata-rata UTS kelas ini (61) terdeteksi <b>26 poin di bawah estimasi CPL</b> mahasiswa. Silakan pilih atau jelaskan konteks pedagogis di balik situasi ini untuk pelaporan audit Kaprodi.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {[
                          { id: 'SOAL_MEMANG_SULIT', label: 'Soal memang sulit' },
                          { id: 'ADA_KONDISI_KHUSUS_KELAS', label: 'Ada kondisi khusus kelas' },
                          { id: 'TIDAK_ADA_ALASAN_KHUSUS', label: 'Tidak ada alasan khusus' }
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => setClassConsistencyReason(opt.id)}
                            className={`px-3 py-2 border text-[10px] font-black uppercase tracking-wider rounded-xl text-center transition-all ${
                              classConsistencyReason === opt.id 
                                ? 'bg-blue-50 text-blue-700 border-blue-200 font-extrabold' 
                                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-500'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block font-mono">Justifikasi Manual Tambahan (Opsional)</label>
                        <textarea 
                          rows={2}
                          placeholder="cth: UTS dilakukan dengan bobot soal open-ended bertingkat tinggi sesuai standar CPL-4..."
                          value={classConsistencyNote}
                          onChange={(e) => setClassConsistencyNote(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-250 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-100">
                <span className="text-[10px] text-rose-600 font-black uppercase tracking-wider font-mono animate-pulse">
                  ⚠ {validationReport.summary.rejected} nilai belum diselesaikan
                </span>

                <div className="flex gap-2.5">
                  <button 
                    onClick={() => setShowValidationReport(false)}
                    className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-black uppercase tracking-wider rounded-xl transition-colors"
                  >
                    Simpan & Kembali Nanti
                  </button>
                  <button 
                    onClick={handleFinalizeValidation}
                    disabled={validationReport.summary.rejected > 0}
                    className={`px-6 py-2.5 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer ${
                      validationReport.summary.rejected > 0 
                        ? 'bg-slate-300 shadow-none cursor-not-allowed' 
                        : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100'
                    }`}
                  >
                    <UserCheck size={14} /> Selesaikan & Finalkan Nilai
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

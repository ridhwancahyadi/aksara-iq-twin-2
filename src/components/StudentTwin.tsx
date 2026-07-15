import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { 
  Sparkles, FileText, CheckCircle, AlertCircle, Target, 
  Award, Compass, ClipboardCheck, BookOpen, Clock, ChevronRight,
  TrendingUp, Users, Heart, Briefcase, GraduationCap, ArrowUpRight, HelpCircle, Calendar,
  Download, ArrowRight, Check, CheckCircle2, Circle, Star, Edit3, User, MapPin, Monitor, Video,
  Trophy, Link2, Plus, Info, ExternalLink, ChevronDown, ChevronUp
} from 'lucide-react';
import { learning } from './StudentDnaProfiling';
import { View } from '../types';

const BIODATA_DATA = {
  "sumber": "SIAT Unpad - Halaman Data Mahasiswa",
  "data_mahasiswa": {
    "npm": "210110253004",
    "nama": "Muhammad Arasy Anggadwipa",
    "angkatan": "2025",
    "fakultas": "Ilmu Komunikasi",
    "program": "10 - Sarjana",
    "program_studi": "210110 - Ilmu Komunikasi",
    "pengelolaan_administratif": "K10A10 - Ilmu Komunikasi Kelas Internasional",
    "peminatan_kekhususan": "",
    "dosen_wali": "Dr. Andika Vinianto Adiputra , S.Sos., M.A.",
    "foto_url": "https://media.unpad.ac.id/photo/mahasiswa/210110/2025/210110253004.JPG?t=459"
  },
  "data_pribadi": {
    "tempat_lahir": "Bekasi",
    "tanggal_lahir": "07-12-2005",
    "jenis_kelamin": "Laki-laki",
    "golongan_darah": "B",
    "warga_negara": "WNI",
    "agama": "Islam",
    "status_sipil": "Belum Kawin",
    "telepon": "02188953710",
    "handphone": "081807122005",
    "fax": "",
    "website": "",
    "email": "arasy.882@gmail.com"
  },
  "alamat": {
    "alamat_ktp": {
      "alamat": "JL. AL-FALLAH KP. DUA",
      "rt": "012",
      "rw": "002",
      "kota": "Kota Bekasi",
      "kode_pos": "17145",
      "ktp_bandung": false
    },
    "alamat_kost_bandung": {
      "nama_wisma_kost": "-",
      "alamat": "-",
      "rt": "-",
      "rw": "-",
      "kota": "-",
      "telepon": "-",
      "hp_pemilik_kost": "-",
      "email_pemilik_kost": "-"
    }
  },
  "data_keluarga": {
    "ayah": {
      "nama": "H.R. Bagus Natanegara",
      "pendidikan": "S2",
      "pekerjaan": "Wiraswasta",
      "status": "Hidup"
    },
    "ibu": {
      "nama": "Henny Rosida",
      "pendidikan": "S1",
      "pekerjaan": "Wiraswasta",
      "status": "Hidup"
    },
    "alamat_orang_tua": {
      "penghasilan_orang_tua": "Rp 15.000.000 - Rp 25.000.000",
      "alamat": "JL. AL-FALLAH KP. DUA",
      "rt": "012",
      "rw": "002",
      "kota": "Kota Bekasi",
      "kode_pos": "17145"
    },
    "kontak_orang_tua": {
      "telepon": "081380003681",
      "handphone": "-"
    },
    "posisi_dalam_keluarga": {
      "jumlah_kakak": 0,
      "jumlah_adik": 0,
      "anak_ke": 1
    }
  },
  "status_registrasi": [
    {
      "semester_tahun_ajaran": "2025/2026 Ganjil",
      "status_akademik": "B-Aktif",
      "tanggal_registrasi": "17-03-2025 08:52:35",
      "keterangan": "Bayar Mandiri H2H"
    },
    {
      "semester_tahun_ajaran": "2025/2026 Genap",
      "status_akademik": "B-Aktif",
      "tanggal_registrasi": "06-01-2026 10:14:31",
      "keterangan": "Bayar Mandiri H2H"
    }
  ],
  "info_tagihan": [
    {
      "semester_tahun_ajaran": "Ganjil 2025/2026 [ 2025 ]",
      "pembayaran_utk_tahun_ajaran": "Genap 2025/2026 [ 2025 ]",
      "no_tagihan": "210110253004001",
      "total_bayar": "Rp. 13.000.000,00",
      "status_bayar": "Sudah Bayar",
      "link_download": "https://students.unpad.ac.id/pacis/pembayaran/info_tagihan/tagihan/210110253004001"
    },
    {
      "semester_tahun_ajaran": "Genap 2024/2025 [ 2024 ]",
      "pembayaran_utk_tahun_ajaran": "Ganjil 2025/2026 [ 2025 ]",
      "no_tagihan": "251550008525001",
      "total_bayar": "Rp. 75.000.000,00",
      "status_bayar": "Sudah Bayar",
      "link_download": "https://siat.unpad.ac.id/padi/index.php/pengumuman/tagihanregistrasi/download/tagihan/2515500085/251550008525001"
    }
  ],
  "prestasi_akademik": {
    "mata_kuliah_digunakan_ipk": [
      {
        "no": 1,
        "sandi_mk": "UNX01-001",
        "mata_kuliah": "Religion",
        "tahun_ajaran": "2025/2026",
        "semester": "Ganjil",
        "sks": 2,
        "huruf_mutu": "A-",
        "angka_mutu": 3.66
      },
      {
        "no": 2,
        "sandi_mk": "UNX01-004",
        "mata_kuliah": "Indonesian Language",
        "tahun_ajaran": "2025/2026",
        "semester": "Ganjil",
        "sks": 2,
        "huruf_mutu": "A",
        "angka_mutu": 4.0
      },
      {
        "no": 3,
        "sandi_mk": "UNX01-006",
        "mata_kuliah": "Creativity and Entrepreneurship",
        "tahun_ajaran": "2025/2026",
        "semester": "Ganjil",
        "sks": 3,
        "huruf_mutu": "A-",
        "angka_mutu": 3.66
      },
      {
        "no": 4,
        "sandi_mk": "UNX01-007",
        "mata_kuliah": "Indonesian Ideology",
        "tahun_ajaran": "2025/2026",
        "semester": "Ganjil",
        "sks": 2,
        "huruf_mutu": "A-",
        "angka_mutu": 3.66
      },
      {
        "no": 5,
        "sandi_mk": "UNX01-008",
        "mata_kuliah": "Civil Education",
        "tahun_ajaran": "2025/2026",
        "semester": "Ganjil",
        "sks": 2,
        "huruf_mutu": "A",
        "angka_mutu": 4.0
      },
      {
        "no": 6,
        "sandi_mk": "K10A1001IUP",
        "mata_kuliah": "Introduction to Communication",
        "tahun_ajaran": "2025/2026",
        "semester": "Ganjil",
        "sks": 3,
        "huruf_mutu": "B+",
        "angka_mutu": 3.33
      },
      {
        "no": 7,
        "sandi_mk": "K10A1027IUP",
        "mata_kuliah": "Creative Writing",
        "tahun_ajaran": "2025/2026",
        "semester": "Ganjil",
        "sks": 3,
        "huruf_mutu": "A-",
        "angka_mutu": 3.66
      },
      {
        "no": 8,
        "sandi_mk": "K10A0164xxIUP",
        "mata_kuliah": "Creative & Design Thinking",
        "tahun_ajaran": "2025/2026",
        "semester": "Ganjil",
        "sks": 3,
        "huruf_mutu": "B-",
        "angka_mutu": 2.66
      },
      {
        "no": 9,
        "sandi_mk": "K10D1005xIUP",
        "mata_kuliah": "Public Speaking",
        "tahun_ajaran": "2025/2026",
        "semester": "Ganjil",
        "sks": 4,
        "huruf_mutu": "B+",
        "angka_mutu": 3.33
      }
    ],
    "ringkasan_ipk": {
      "jumlah_sks": 24,
      "jumlah_sks_lulus": 24,
      "jumlah_angka_mutu": 83.89,
      "ipk": 3.5
    },
    "mata_kuliah_tidak_digunakan_ipk": [
      {
        "no": 1,
        "sandi_mk": "K10A1002IUP",
        "mata_kuliah": "Communication Psychology",
        "tahun_ajaran": "2025/2026",
        "semester": "Genap",
        "sks": 3,
        "huruf_mutu": "",
        "angka_mutu": 0.0
      },
      {
        "no": 2,
        "sandi_mk": "K10A1004IUP",
        "mata_kuliah": "Interpersonal Communication",
        "tahun_ajaran": "2025/2026",
        "semester": "Genap",
        "sks": 3,
        "huruf_mutu": "",
        "angka_mutu": 0.0
      },
      {
        "no": 3,
        "sandi_mk": "K10A1008IUP",
        "mata_kuliah": "Intercultural Communication",
        "tahun_ajaran": "2025/2026",
        "semester": "Genap",
        "sks": 3,
        "huruf_mutu": "",
        "angka_mutu": 0.0
      },
      {
        "no": 4,
        "sandi_mk": "K10A163IUP",
        "mata_kuliah": "Digital Communication",
        "tahun_ajaran": "2025/2026",
        "semester": "Genap",
        "sks": 3,
        "huruf_mutu": "",
        "angka_mutu": 0.0
      },
      {
        "no": 5,
        "sandi_mk": "K10A164IUP",
        "mata_kuliah": "Visual Communication Design and Production",
        "tahun_ajaran": "2025/2026",
        "semester": "Genap",
        "sks": 4,
        "huruf_mutu": "",
        "angka_mutu": 0.0
      },
      {
        "no": 6,
        "sandi_mk": "K10A177IUP",
        "mata_kuliah": "Mass Communication and Media",
        "tahun_ajaran": "2025/2026",
        "semester": "Genap",
        "sks": 3,
        "huruf_mutu": "",
        "angka_mutu": 0.0
      },
      {
        "no": 7,
        "sandi_mk": "K10A178IUP",
        "mata_kuliah": "Group and Organizational Communication",
        "tahun_ajaran": "2025/2026",
        "semester": "Genap",
        "sks": 4,
        "huruf_mutu": "",
        "angka_mutu": 0.0
      }
    ],
    "ringkasan_tidak_digunakan_ipk": {
      "jumlah_sks": 23,
      "shadow": 0.0
    }
  },
  "jadwal_kuliah": {
    "semester": "GENAP TAHUN AKADEMIK 2025/2026",
    "daftar": [
      {
        "no": 1,
        "hari": "Senin",
        "waktu": "07:00-09:30",
        "kur": "2025",
        "sandi": "K10A163IUP",
        "mata_kuliah": "Digital Communication",
        "sks": 3,
        "kelas": "A",
        "ruang": "0201-0641-0201",
        "dosen": [
          "Dr. Andika Vinianto Adiputra S.Sos., M.A.",
          "Kelana Ashil Siddhawira M.I.Kom."
        ]
      },
      {
        "no": 2,
        "hari": "Senin",
        "waktu": "09:30-12:00",
        "kur": "2025",
        "sandi": "K10A164IUP",
        "mata_kuliah": "Visual Communication Design and Production",
        "sks": 4,
        "kelas": "A",
        "ruang": "0201-0641-0204",
        "dosen": [
          "Syauqy Lukman S.Sos., M.S.M, Ph.D.",
          "Weny Widyowati S.Sos., M.Si."
        ]
      },
      {
        "no": 3,
        "hari": "Selasa",
        "waktu": "09:30-12:00",
        "kur": "2025",
        "sandi": "K10A178IUP",
        "mata_kuliah": "Group and Organizational Communication",
        "sks": 4,
        "kelas": "A",
        "ruang": "0201-0641-0201",
        "dosen": [
          "Dr. Hj. Purwanti Hadisiwi M.Ext.Ed",
          "Dr. Sri Seti Indriani S.IP., M.Si.",
          "Nadia Febriani S.I.Kom., M.Si."
        ]
      },
      {
        "no": 4,
        "hari": "Rabu",
        "waktu": "09:30-12:00",
        "kur": "2025",
        "sandi": "K10A1002IUP",
        "mata_kuliah": "Communication Psychology",
        "sks": 3,
        "kelas": "A",
        "ruang": "0201-0641-0204",
        "dosen": [
          "Prof. Dr. Hj. Jenny Ratna Suminar M.Si.",
          "Frila Nurfadila S.Psi., M.A.B.",
          "Tantri Annisa Hanjani M.I.Kom."
        ]
      },
      {
        "no": 5,
        "hari": "Rabu",
        "waktu": "13:00-15:30",
        "kur": "2025",
        "sandi": "K10A177IUP",
        "mata_kuliah": "Mass Communication and Media",
        "sks": 3,
        "kelas": "A",
        "ruang": "0201-0641-0201",
        "dosen": [
          "Dwi Masrina S.Sos., M.Med.Kom.",
          "Tantri Annisa Hanjani M.I.Kom."
        ]
      },
      {
        "no": 6,
        "hari": "Kamis",
        "waktu": "07:00-09:30",
        "kur": "2025",
        "sandi": "K10A1004IUP",
        "mata_kuliah": "Interpersonal Communication",
        "sks": 3,
        "kelas": "A",
        "ruang": "0201-0641-0204",
        "dosen": [
          "Ika Merdekawati Kusmayadi S.I.Kom., MA",
          "Siti Fatimah Zahrah Fibaeti M.I.Kom."
        ]
      },
      {
        "no": 7,
        "hari": "Kamis",
        "waktu": "13:00-15:30",
        "kur": "2025",
        "sandi": "K10A1008IUP",
        "mata_kuliah": "Intercultural Communication",
        "sks": 3,
        "kelas": "A",
        "ruang": "0201-0641-0201",
        "dosen": [
          "Weny Widyowati S.Sos., M.Si.",
          "Kelana Ashil Siddhawira M.I.Kom."
        ]
      }
    ]
  }
};

const SEMESTER_REPORTS: Record<string, {
  semesterLabel: string;
  semesterNumber: number;
  totalSks: number;
  ips: number;
  totalPoints: number;
  courses: {
    courseName: string;
    sks: number;
    grade: string;
    points: number;
    uts: number;
    uas: number;
    tugas: number;
  }[];
}> = {
  "1": {
    semesterLabel: "Semester I",
    semesterNumber: 1,
    totalSks: 15,
    ips: 3.62,
    totalPoints: 54.3,
    courses: [
      { courseName: "Introduction to Communication", sks: 3, grade: "B+", points: 9.9, uts: 80, uas: 82, tugas: 85 },
      { courseName: "Creative Writing", sks: 3, grade: "A-", points: 11.1, uts: 84, uas: 88, tugas: 92 },
      { courseName: "Religion", sks: 2, grade: "A", points: 8.0, uts: 88, uas: 92, tugas: 90 },
      { courseName: "Indonesian Language", sks: 2, grade: "A", points: 8.0, uts: 85, uas: 90, tugas: 95 },
      { courseName: "Civil Education", sks: 2, grade: "A-", points: 7.4, uts: 86, uas: 88, tugas: 90 },
      { courseName: "Creativity & Entrepreneurship", sks: 3, grade: "B+", points: 9.9, uts: 82, uas: 84, tugas: 88 }
    ]
  },
  "2": {
    semesterLabel: "Semester II",
    semesterNumber: 2,
    totalSks: 16,
    ips: 3.74,
    totalPoints: 59.9,
    courses: [
      { courseName: "Communication Psychology", sks: 3, grade: "A-", points: 11.1, uts: 82, uas: 86, tugas: 88 },
      { courseName: "Interpersonal Communication", sks: 3, grade: "A", points: 12.0, uts: 85, uas: 90, tugas: 92 },
      { courseName: "Intercultural Communication", sks: 3, grade: "A", points: 12.0, uts: 88, uas: 84, tugas: 90 },
      { courseName: "Digital Communication", sks: 3, grade: "B+", points: 10.0, uts: 80, uas: 85, tugas: 88 },
      { courseName: "Visual Communication Design", sks: 4, grade: "A-", points: 14.8, uts: 84, uas: 82, tugas: 90 }
    ]
  },
  "3": {
    semesterLabel: "Semester III",
    semesterNumber: 3,
    totalSks: 16,
    ips: 3.56,
    totalPoints: 57.1,
    courses: [
      { courseName: "Communication Research Methods", sks: 4, grade: "B", points: 12.0, uts: 74, uas: 78, tugas: 82 },
      { courseName: "Media Relations", sks: 3, grade: "A", points: 12.0, uts: 88, uas: 85, tugas: 90 },
      { courseName: "Public Relations Writing", sks: 3, grade: "A-", points: 11.1, uts: 80, uas: 84, tugas: 86 },
      { courseName: "Sociology of Communication", sks: 3, grade: "B+", points: 10.0, uts: 78, uas: 82, tugas: 85 },
      { courseName: "Strategic Communication Issues", sks: 3, grade: "A", points: 12.0, uts: 85, uas: 88, tugas: 90 }
    ]
  },
  "4": {
    semesterLabel: "Semester IV",
    semesterNumber: 4,
    totalSks: 17,
    ips: 3.71,
    totalPoints: 63.1,
    courses: [
      { courseName: "Media Law and Ethics", sks: 3, grade: "B+", points: 10.0, uts: 82, uas: 80, tugas: 85 },
      { courseName: "Corporate Reputation Management", sks: 4, grade: "A", points: 16.0, uts: 85, uas: 90, tugas: 92 },
      { courseName: "Audience Research Methods", sks: 3, grade: "B+", points: 10.0, uts: 76, uas: 80, tugas: 84 },
      { courseName: "International Communication", sks: 3, grade: "A-", points: 11.1, uts: 80, uas: 85, tugas: 88 },
      { courseName: "PR Campaign Planning", sks: 4, grade: "A", points: 16.0, uts: 88, uas: 90, tugas: 94 }
    ]
  },
  "5": {
    semesterLabel: "Semester V",
    semesterNumber: 5,
    totalSks: 17,
    ips: 3.65,
    totalPoints: 62.1,
    courses: [
      { courseName: "Political Communication", sks: 3, grade: "A-", points: 11.1, uts: 84, uas: 82, tugas: 88 },
      { courseName: "Integrated Marketing Comm.", sks: 4, grade: "A", points: 16.0, uts: 88, uas: 92, tugas: 90 },
      { courseName: "Global Media Studies", sks: 3, grade: "B+", points: 10.0, uts: 78, uas: 82, tugas: 85 },
      { courseName: "Seminar Usulan Penelitian", sks: 4, grade: "A", points: 16.0, uts: 85, uas: 85, tugas: 90 },
      { courseName: "Metodologi Penelitian Sosial", sks: 3, grade: "B", points: 9.0, uts: 72, uas: 75, tugas: 80 }
    ]
  },
  "6": {
    semesterLabel: "Semester VI",
    semesterNumber: 6,
    totalSks: 14,
    ips: 3.74,
    totalPoints: 52.3,
    courses: [
      { courseName: "Advanced Algorithmic Design", sks: 4, grade: "A", points: 16.0, uts: 84, uas: 88, tugas: 90 },
      { courseName: "Data Science Ethics", sks: 3, grade: "A-", points: 11.1, uts: 78, uas: 82, tugas: 85 },
      { courseName: "Human-Computer Interaction", sks: 3, grade: "A", points: 12.0, uts: 88, uas: 92, tugas: 90 },
      { courseName: "Distributed Systems", sks: 4, grade: "B+", points: 13.2, uts: 80, uas: 85, tugas: 88 }
    ]
  }
};

interface StudentTwinProps {
  loggedInUser?: {
    name: string;
    id: string;
    role: 'mahasiswa' | 'dosen' | 'admin';
    email?: string;
    nim?: string;
  } | null;
  setView: (view: View) => void;
  activeTwinSubMenu?: 'overview' | 'learning' | 'career' | 'biodata';
  setActiveTwinSubMenu?: (tab: 'overview' | 'learning' | 'career' | 'biodata') => void;
}

export function StudentTwin({ 
  loggedInUser, 
  setView, 
  activeTwinSubMenu: propActiveTwinSubMenu, 
  setActiveTwinSubMenu: propSetActiveTwinSubMenu 
}: StudentTwinProps) {
  const isStudent = loggedInUser?.role === 'mahasiswa';
  const initialStudentId = isStudent && loggedInUser?.id
    ? loggedInUser.id 
    : learning.students[0].student_id;

  const [selectedStudentId, setSelectedStudentId] = useState<string>(initialStudentId);
  const [internalActiveTwinSubMenu, setInternalActiveTwinSubMenu] = useState<'overview' | 'learning' | 'career' | 'biodata'>('overview');
  
  const activeTwinSubMenu = propActiveTwinSubMenu !== undefined ? propActiveTwinSubMenu : internalActiveTwinSubMenu;
  const setActiveTwinSubMenu = propSetActiveTwinSubMenu !== undefined ? propSetActiveTwinSubMenu : setInternalActiveTwinSubMenu;
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [biodataSubTab, setBiodataSubTab] = useState<'personal_family' | 'registration_billing' | 'organisasi_portfolio'>('personal_family');
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [selectedSemesterFilter, setSelectedSemesterFilter] = useState<string>("6");

  const handleExportCSV = (semesterKey: string) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "MATA KULIAH,UTS (30%),UAS (40%),TUGAS (30%),GRADE\n";
    
    if (semesterKey === "all") {
      Object.entries(SEMESTER_REPORTS).forEach(([semNum, report]) => {
        report.courses.forEach(c => {
          csvContent += `"${c.courseName}",${c.uts},${c.uas},${c.tugas},"${c.grade}"\n`;
        });
      });
    } else {
      const report = SEMESTER_REPORTS[semesterKey];
      if (report) {
        report.courses.forEach(c => {
          csvContent += `"${c.courseName}",${c.uts},${c.uas},${c.tugas},"${c.grade}"\n`;
        });
      }
    }
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rekap_Nilai_Semester_${semesterKey}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = (semesterKey: string) => {
    let reportText = "";
    if (semesterKey === "all") {
      reportText += "LAPORAN HASIL STUDI (ALL SEMESTERS)\n";
      reportText += "===================================\n\n";
      Object.entries(SEMESTER_REPORTS).forEach(([semNum, report]) => {
        reportText += `${report.semesterLabel}\n`;
        reportText += "-----------------------------------\n";
        report.courses.forEach(c => {
          reportText += `${c.courseName.padEnd(40)} | ${c.sks} SKS | Grade: ${c.grade.padEnd(2)} | Points: ${c.points.toFixed(1)}\n`;
        });
        reportText += `SKS Semester: ${report.totalSks} | IPS: ${report.ips.toFixed(2)} | Points: ${report.totalPoints.toFixed(1)}\n\n`;
      });
      reportText += "-----------------------------------\n";
      reportText += "GRAND TOTALS:\n";
      reportText += "Total SKS: 95 SKS\n";
      reportText += "Cumulative GPA (IPK): 3.67\n";
    } else {
      const report = SEMESTER_REPORTS[semesterKey];
      if (report) {
        reportText += `LAPORAN HASIL STUDI - ${report.semesterLabel.toUpperCase()}\n`;
        reportText += "===================================\n\n";
        report.courses.forEach(c => {
          reportText += `${c.courseName.padEnd(40)} | ${c.sks} SKS | Grade: ${c.grade.padEnd(2)} | Points: ${c.points.toFixed(1)}\n`;
        });
        reportText += "\n-----------------------------------\n";
        reportText += `Semester Totals: ${report.totalSks} SKS | IPS: ${report.ips.toFixed(2)} | Points: ${report.totalPoints.toFixed(1)}\n`;
      }
    }
    
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Grade_Report_Semester_${semesterKey}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const currentStudent = learning.students.find(s => s.student_id === selectedStudentId) || learning.students[0];

  useEffect(() => {
    if (activeTwinSubMenu === 'overview') {
      setActiveTab('overview');
    } else if (activeTwinSubMenu === 'learning') {
      setActiveTab('learning');
    } else if (activeTwinSubMenu === 'career') {
      setActiveTab('career');
    } else if (activeTwinSubMenu === 'biodata') {
      setActiveTab('biodata');
    }
  }, [activeTwinSubMenu]);

  // Simulated tasks for interactive task card
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Simulasi Krisis PR: Perusahaan Aviasi', subject: 'Komunikasi Organisasional', timeLeft: '6 jam lagi', type: 'FGD', isCritical: true, completed: false },
    { id: 't2', title: 'Presentasi Manajemen Reputasi Korporat', subject: 'Strategi Komunikasi Persuasif', timeLeft: '2 hari lagi', type: 'Presentation', isCritical: false, completed: false },
    { id: 't3', title: 'Analisis Framing Berita TV Swasta', subject: 'Sosiologi Komunikasi', timeLeft: '3 hari lagi', type: 'Reguler', isCritical: false, completed: false },
    { id: 't4', title: 'Policy Brief: Regulasi AI di Indonesia', subject: 'Penulisan Komunikasi Strategis', timeLeft: '18 jam lagi', type: 'Writing', isCritical: true, completed: false },
    { id: 't5', title: 'Media Interview - Skenario Krisis Korporat', subject: 'Simulasi Praktik Komunikasi', timeLeft: '5 hari lagi', type: 'Simulation', isCritical: false, completed: false }
  ]);

  const toggleTaskCompleted = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  // Helper colors for avatars
  const avatarColors: Record<string, string> = {
    "John Tosh": "from-indigo-500 to-blue-600 text-indigo-50",
    "Adinda": "from-emerald-400 to-teal-600 text-emerald-50",
    "Fatima": "from-rose-400 to-pink-600 text-rose-50",
    "Adi": "from-amber-400 to-orange-600 text-amber-50"
  };

  // Calendar states & helpers
  const [calendarView, setCalendarView] = useState<'today' | 'week' | 'month'>('month');
  const [selectedDay, setSelectedDay] = useState<number>(7);

  const eventDays = [6, 7, 9, 15, 22];

  const calendarEvents: Record<number, { title: string; time: string; room: string; desc: string }> = {
    6: { title: "Praktikum Sosiologi Komunikasi", time: "13:00 - 15:00", room: "Lab Audio Visual", desc: "Analisis Framing Berita TV Swasta" },
    7: { title: "Praktikum Komunikasi Persuasif", time: "09:00 - 11:30", room: "Lab Komunikasi 2", desc: "Sesi Presentasi Manajemen Reputasi Korporat" },
    9: { title: "Praktikum Penulisan Komunikasi", time: "10:00 - 12:00", room: "Lab Jurnalistik", desc: "Penyusunan Policy Brief Regulasi AI" },
    15: { title: "Praktikum Riset Media", time: "14:00 - 16:30", room: "Lab Komunikasi 1", desc: "FGD Skenario Krisis & Media Research" },
    22: { title: "Praktikum Simulasi Krisis Humas", time: "08:30 - 11:00", room: "Aula Lantai 3", desc: "Simulasi Krisis PR Perusahaan Aviasi" }
  };

  const dayNamesIndo = ["MINGGU", "SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"];

  const getDayNameIndo = (day: number) => {
    const idx = (3 + day - 1) % 7;
    return dayNamesIndo[idx];
  };

  // Convert aggregate competency radar for recharts
  const radarData = Object.entries(currentStudent.aggregate_competency.radar).map(([key, value]) => ({
    subject: key,
    Score: value,
    fullMark: 100
  }));

  // GPA line chart data (includes current semester GPA)
  const gpaChartData = [
    ...currentStudent.academic_core.gpa_trend,
    { semester: 6, gpa: currentStudent.academic_core.gpa }
  ];

  const completedChecklistCount = tasks.filter(t => t.completed).length;
  const activeCriticalCount = tasks.filter(t => !t.completed && t.isCritical).length;
  const activeRegularCount = tasks.filter(t => !t.completed && !t.isCritical).length;

  const totalTasks = 45;
  const completedTasks = 24 + completedChecklistCount;
  const pendingTasks = 11 + activeRegularCount;
  const overdueTasks = 5 + activeCriticalCount;

  // ================================= DIALOG ASPIRASI STATES & CONFIG =================================
  const [isDialogueActive, setIsDialogueActive] = useState(false);
  const [dialogueStep, setDialogueStep] = useState(0); // 0 = Intro, 1-10 = Qs, 11 = Success
  const [dialogueAnswers, setDialogueAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: {
      "Dampak Sosial": 8,
      "Pembelajaran": 8,
      "Stabilitas": 5,
      "Kreativitas": 8,
      "Kepemimpinan": 7
    } as Record<string, number>,
    q6: [] as string[],
    q6_text: "",
    q7: "",
    q8: [] as string[],
    q9: "Pagi",
    q10: 9
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [customAspirationResult, setCustomAspirationResult] = useState<any>(null);

  const DEFAULT_ASPIRATIONS: Record<string, any> = {
    "2254100011": { // John Tosh
      target_role: "PR & Communication Strategist",
      target_industry: "Agensi Komunikasi Strategis & Korporasi",
      target_timeframe: "3 - 4 Tahun",
      aspiration_narrative_summary: "John Tosh bercita-cita menjadi Communication Strategist di agensi komunikasi strategis terkemuka, berfokus pada manajemen krisis, analisis isu-isu strategis, dan penguatan literasi data untuk menyeimbangkan dominasinya dalam diskusi publik.",
      learning_style_preference: { hands_on: true, collaborative: true, video_tutorials: false, reading_books: true },
      commitment_level: 9,
      work_values: ["Kepemimpinan", "Pembelajaran", "Dampak Sosial"],
      target_competencies: [
        { rank: 1, name: "Analitik & Data Komunikasi", cpl: "CPL-PP-01", gap: 26, evidence: "Kelemahan pada Statistika Terapan dan Research & Data (74)", reasoning: "Gap Research & Data (74) menahan kelayakan penuh profil strategist.", confidence: "HIGH" },
        { rank: 2, name: "Manajemen Komunikasi Visual", cpl: "CPL-KK-05", gap: 21, evidence: "Mata kuliah terlemah kedua adalah Manajemen Komunikasi Visual (79)", reasoning: "Dibutuhkan integrasi visual dalam merancang strategi kampanye krisis.", confidence: "HIGH" },
        { rank: 3, name: "Fasilitasi Diskusi Tanpa Dominasi", cpl: "CPL-KU-05", gap: 15, evidence: "Kecenderungan mendominasi diskusi forum FGD hingga 47%", reasoning: "Kolaborasi membutuhkan porsi partisipasi yang lebih seimbang agar tim tidak tertekan.", confidence: "HIGH" }
      ],
      identified_barriers: [
        { barrier: "Kecenderungan mendominasi diskusi kelas & FGD kelompok", action: "Latih peran aktif sebagai fasilitator / moderator untuk menarik kontribusi dari anggota tim lain." },
        { barrier: "Kesenjangan kemampuan analisis data kuantitatif / statistik", action: "Selesaikan pelatihan mandiri 'Riset Kuantitatif' dan gunakan alat bantu visualisasi analytics." }
      ],
      content_recommendations: [
        { judul: "Storytelling untuk Komunikasi Strategis", sumber: "Coursera", tipe: "Kursus", level: "Menengah", durasi: "8 jam", bahasa: "Indonesia", cpl: "CPL-KK-05", score: 4.8, relevance: 96, url: "https://www.coursera.org/learn/storytelling-komunikasi-strategis", priority: "priority" },
        { judul: "Data Analytics & Visualization for Public Relations", sumber: "Udemy", tipe: "Kursus", level: "Pemula", durasi: "12 jam", bahasa: "Inggris", cpl: "CPL-PP-01", score: 4.7, relevance: 92, url: "https://www.udemy.com/topic/data-analytics/", priority: "priority" },
        { judul: "Manajemen Krisis Komunikasi & Reputasi Korporat", sumber: "YouTube", tipe: "Video", level: "Menengah", durasi: "45 menit", bahasa: "Indonesia", cpl: "CPL-KK-02", score: 4.9, relevance: 88, url: "https://www.youtube.com/results?search_query=crisis+communication+management", priority: "standard" }
      ]
    },
    "225410073": { // Adinda
      target_role: "Strategic Communication Planner",
      target_industry: "Corporate Communications & NGO",
      target_timeframe: "4 - 5 Tahun",
      aspiration_narrative_summary: "Adinda bercita-cita menjadi Strategic Communication Planner profesional yang ahli dalam menyusun program kampanye komunikasi terintegrasi dengan penekanan pada penyusunan pesan persuasif berbasis riset lapangan.",
      learning_style_preference: { hands_on: true, collaborative: true, video_tutorials: true, reading_books: false },
      commitment_level: 8,
      work_values: ["Dampak Sosial", "Kreativitas", "Stabilitas"],
      target_competencies: [
        { rank: 1, name: "Statistika & Metodologi Riset Komunikasi", cpl: "CPL-PP-01", gap: 27, evidence: "Kelemahan pada Statistika Terapan (nilai B, score 73)", reasoning: "Membutuhkan penguasaan analisis data agar perencanaan program didukung bukti empiris.", confidence: "HIGH" },
        { rank: 2, name: "Komunikasi Bisnis & Negosiasi", cpl: "CPL-PP-01", gap: 20, evidence: "Kelemahan pada mata kuliah Komunikasi Bisnis (nilai B+)", reasoning: "Sangat krusial untuk melobi stakeholder korporasi dan mengamankan kemitraan program.", confidence: "HIGH" },
        { rank: 3, name: "Evaluasi Dampak Program Komunikasi", cpl: "CPL-KK-05", gap: 14, evidence: "Nilai Evaluasi Program Komunikasi adalah A-", reasoning: "Meningkatkan ketajaman pengukuran efektivitas kampanye sosial pasca-implementasi.", confidence: "HIGH" }
      ],
      identified_barriers: [
        { barrier: "Pemahaman statistika terapan untuk mengukur keberhasilan program", action: "Ikuti pendampingan mentoring berkala dan pelajari use-case audit komunikasi praktis." },
        { barrier: "Keterampilan negosiasi dalam situasi bisnis lintas korporat", action: "Simulasikan role-play negosiasi bisnis di kelas atau tonton masterclass taktik komunikasi persuasif." }
      ],
      content_recommendations: [
        { judul: "Strategic Communication Planning & Campaign Design", sumber: "Coursera", tipe: "Kursus", level: "Menengah", durasi: "10 jam", bahasa: "Indonesia", cpl: "CPL-KK-05", score: 4.8, relevance: 95, url: "https://www.coursera.org/learn/storytelling-komunikasi-strategis", priority: "priority" },
        { judul: "Analisis Data untuk Keputusan Komunikasi Publik", sumber: "Dicoding", tipe: "Kursus", level: "Pemula", durasi: "6 jam", bahasa: "Indonesia", cpl: "CPL-PP-01", score: 4.6, relevance: 90, url: "https://www.dicoding.com/", priority: "priority" },
        { judul: "Masterclass Negosiasi Bisnis & Persuasi Stakeholder", sumber: "Udemy", tipe: "Kursus", level: "Lanjutan", durasi: "14 jam", bahasa: "Inggris", cpl: "CPL-PP-01", score: 4.7, relevance: 85, url: "https://www.udemy.com/", priority: "standard" }
      ]
    }
  };

  const getAspirationForStudent = (student: any) => {
    if (DEFAULT_ASPIRATIONS[student.student_id]) {
      return DEFAULT_ASPIRATIONS[student.student_id];
    }
    const isFatima = student.name.toLowerCase().includes("fatima");
    const role = isFatima ? "Marketing Communication Specialist" : "Human Resource Developer & Trainer";
    const industry = isFatima ? "Creative Digital Agency & E-Commerce" : "Corporate HRD & EdTech";
    const timeframe = "4 - 5 Tahun";
    const name = student.name;
    
    return {
      target_role: role,
      target_industry: industry,
      target_timeframe: timeframe,
      aspiration_narrative_summary: `${name} memiliki visi kuat untuk berkembang sebagai ${role} di sektor ${industry} dalam ${timeframe}. Tertarik pada perancangan program komunikasi yang berorientasi pada manusia dan pengembangan talenta secara kreatif.`,
      learning_style_preference: { hands_on: true, collaborative: true, video_tutorials: true, reading_books: false },
      commitment_level: 9,
      work_values: ["Kreativitas", "Pembelajaran", "Dampak Sosial"],
      target_competencies: [
        { rank: 1, name: "Komunikasi Pemasaran Terpadu", cpl: "CPL-KK-05", gap: 24, evidence: `Aspirasi berkarir di bidang ${industry}`, reasoning: "Diperlukan penguatan analisis segmentasi khalayak.", confidence: "HIGH" },
        { rank: 2, name: "Riset Khalayak & Evaluasi Media", cpl: "CPL-PP-01", gap: 19, evidence: "Kebutuhan riset empiris penunjang program", reasoning: "Mempertajam instrumen evaluasi feedback dari audiens.", confidence: "HIGH" }
      ],
      identified_barriers: [
        { barrier: "Minimnya portofolio implementasi kampanye skala industri", action: "Selesaikan mini-project riset pemasaran atau program magang di agensi digital." }
      ],
      content_recommendations: [
        { judul: "Integrated Marketing Communications & Brand Strategy", sumber: "Coursera", tipe: "Kursus", level: "Menengah", durasi: "12 jam", bahasa: "Indonesia", cpl: "CPL-KK-05", score: 4.8, relevance: 94, url: "https://www.coursera.org/", priority: "priority" },
        { judul: "Audience Research Methods & Data Analytics", sumber: "Udemy", tipe: "Kursus", level: "Menengah", durasi: "8 jam", bahasa: "Inggris", cpl: "CPL-PP-01", score: 4.7, relevance: 88, url: "https://www.udemy.com/", priority: "priority" }
      ]
    };
  };

  const ASPIRATION_QUESTIONS = [
    {
      id: 1,
      phase: "Fase 1: Eksplorasi Minat",
      title: "Bidang atau Isu Menarik",
      text: "Bidang atau isu apa yang paling menarik perhatianmu akhir-akhir ini?",
      placeholder: "Contoh: Komunikasi sosial & advokasi, digital marketing, pengembangan masyarakat...",
      type: "text"
    },
    {
      id: 2,
      phase: "Fase 1: Eksplorasi Minat",
      title: "Sosok Inspiratif",
      text: "Siapa sosok yang caranya bekerja atau berkomunikasi paling kamu kagumi? Apa yang membuatnya menarik?",
      placeholder: "Contoh: Najwa Shihab - cara beliau membangun narasi yang kuat dan menggerakkan opini publik.",
      type: "text"
    },
    {
      id: 3,
      phase: "Fase 2: Visi Karier",
      title: "Peran Sasaran (Target Role)",
      text: "Membayangkan dirimu 4-5 tahun dari sekarang, peran seperti apa yang ingin kamu jalani?",
      placeholder: "Contoh: Communication Strategist di lembaga advokasi sosial.",
      type: "text"
    },
    {
      id: 4,
      phase: "Fase 2: Visi Karier",
      title: "Hari Kerja Ideal",
      text: "Ceritakan gambaran hari kerja idealmu di peran tersebut - apa yang kamu kerjakan, dengan siapa, untuk tujuan apa?",
      placeholder: "Contoh: Merancang kampanye komunikasi yang menggerakkan perubahan nyata, berkolaborasi dengan berbagai pemangku kepentingan.",
      type: "text"
    },
    {
      id: 5,
      phase: "Fase 3: Nilai Kerja",
      title: "Nilai Kerja Utama (Work Values)",
      text: "Seberapa penting hal berikut bagimu dalam bekerja nanti? Sesuaikan skala prioritas Anda (1-10):",
      type: "values"
    },
    {
      id: 6,
      phase: "Fase 4: Hambatan",
      title: "Kompetensi Perlu Dikembangkan",
      text: "Kompetensi atau keterampilan apa yang menurutmu masih perlu kamu kembangkan?",
      type: "skills"
    },
    {
      id: 7,
      phase: "Fase 4: Hambatan",
      title: "Keraguan & Kekhawatiran",
      text: "Adakah hal yang membuatmu ragu atau khawatir dalam mengejar visi ini?",
      placeholder: "Contoh: Kurang pengalaman riset lapangan; ragu dengan kemampuan public speaking.",
      type: "text"
    },
    {
      id: 8,
      phase: "Fase 5: Preferensi Belajar",
      title: "Gaya Belajar Nyaman",
      text: "Bagaimana caramu paling nyaman belajar hal baru? (Pilih yang sesuai)",
      type: "learning_style"
    },
    {
      id: 9,
      phase: "Fase 5: Preferensi Belajar",
      title: "Waktu Belajar Produktif",
      text: "Kapan waktu yang biasanya paling produktif untukmu belajar?",
      type: "learning_time"
    },
    {
      id: 10,
      phase: "Fase 5: Preferensi Belajar",
      title: "Tingkat Komitmen",
      text: "Seberapa besar komitmenmu saat ini untuk mengejar visi karier ini? (Skala 1-10)",
      type: "commitment"
    }
  ];

  const handleCompleteDialogue = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const topValues = Object.entries(dialogueAnswers.q5)
        .sort((a: any, b: any) => b[1] - a[1])
        .slice(0, 3)
        .map(([key]) => key);

      const computedResult = {
        target_role: dialogueAnswers.q3 || "Professional Komunikasi",
        target_industry: dialogueAnswers.q1 || "Industri Komunikasi Kreatif",
        target_timeframe: "4 - 5 Tahun",
        aspiration_narrative_summary: `"${currentStudent.name} ingin menjadi ${dialogueAnswers.q3 || 'Professional Komunikasi'} di bidang ${dialogueAnswers.q1 || 'Komunikasi'} dalam 4-5 tahun ke depan. Terinspirasi oleh sosok ${dialogueAnswers.q2 || 'komunikator hebat'}, ${currentStudent.name} berkomitmen kuat untuk menguasai ${dialogueAnswers.q6_text || 'keahlian baru'} melalui pembelajaran terstruktur."`,
        learning_style_preference: {
          hands_on: dialogueAnswers.q8.includes("Hands-on projects"),
          collaborative: dialogueAnswers.q8.includes("Collaborative learning"),
          video_tutorials: dialogueAnswers.q8.includes("Video tutorials"),
          reading_books: dialogueAnswers.q8.includes("Reading books/articles")
        },
        commitment_level: dialogueAnswers.q10,
        work_values: topValues,
        target_competencies: [
          {
            rank: 1,
            name: dialogueAnswers.q6_text || "Komunikasi Strategis Terapan",
            cpl: "CPL-KK-05",
            gap: 28,
            evidence: `Menyebutkan kebutuhan: "${dialogueAnswers.q6_text || 'Keahlian taktis'}"`,
            reasoning: "Merupakan fondasi utama untuk merancang kampanye program yang efektif.",
            confidence: "HIGH"
          },
          {
            rank: 2,
            name: "Riset Komunikasi & Analitik",
            cpl: "CPL-PP-01",
            gap: 22,
            evidence: `Hambatan teridentifikasi: "${dialogueAnswers.q7 || 'Metodologi / Kekhawatiran krisis'}"`,
            reasoning: "Mengukur keberhasilan implementasi program membutuhkan instrumen analitik yang presisi.",
            confidence: "HIGH"
          },
          {
            rank: 3,
            name: "Public Speaking & Presentasi Persuasif",
            cpl: "CPL-KK-02",
            gap: 17,
            evidence: "Ingin mengasah kemampuan komunikasi persuasif seperti tokoh panutan",
            reasoning: "Public speaking adalah representasi utama kredibilitas ahli strategi.",
            confidence: "HIGH"
          }
        ],
        identified_barriers: [
          {
            barrier: dialogueAnswers.q7 || "Kurang pengalaman taktis lapangan",
            action: "Selesaikan program mentoring intensif dengan dosen atau magang di agensi krisis."
          },
          {
            barrier: "Ragu mengejar visi karena keterbatasan teknis riset",
            action: "Ikuti kelas mandiri 'Riset Kuantitatif' dan buat 1 portofolio analisis kampanye."
          }
        ],
        content_recommendations: [
          {
            judul: `Storytelling & Kampanye ${dialogueAnswers.q3 || 'Komunikasi'}`,
            sumber: "Coursera",
            tipe: "Kursus",
            level: "Menengah",
            durasi: "8 jam",
            bahasa: "Indonesia",
            cpl: "CPL-KK-05",
            score: 4.8,
            relevance: 97,
            url: "https://www.coursera.org/learn/storytelling-komunikasi-strategis",
            priority: "priority"
          },
          {
            judul: "Riset Media & Penggalian Insight Khalayak",
            sumber: "Udemy",
            tipe: "Kursus",
            level: "Pemula",
            durasi: "10 jam",
            bahasa: "Indonesia",
            cpl: "CPL-PP-01",
            score: 4.7,
            relevance: 91,
            url: "https://www.udemy.com/",
            priority: "priority"
          },
          {
            judul: "Teknik Presentasi Komunikasi & Persuasi Publik",
            sumber: "YouTube",
            tipe: "Video",
            level: "Pemula",
            durasi: "45 menit",
            bahasa: "Indonesia",
            cpl: "CPL-KK-02",
            score: 4.9,
            relevance: 85,
            url: "https://www.youtube.com/results?search_query=public+speaking+skills",
            priority: "standard"
          }
        ]
      };

      setCustomAspirationResult(computedResult);
      setIsAnalyzing(false);
      setDialogueStep(11); // Success step
    }, 2500);
  };

  const activeAspiration = customAspirationResult || getAspirationForStudent(currentStudent);

  return (
    <div id="student-twin-root" className="flex flex-col gap-6 h-full overflow-y-auto pr-1 pb-10 custom-scrollbar max-w-7xl mx-auto px-4 w-full">
      
      {/* ================================= 1. IDENTITY & PROFILE HEADER ================================= */}
      {activeTwinSubMenu !== 'biodata' && (
        <div id="student-profile-header-card" className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-5 relative overflow-hidden shrink-0">
          {/* Top section: Identity details on left, KPI metrics on right */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
            <div className="flex flex-col gap-5 flex-1">
              <div className="flex items-center gap-5 flex-wrap sm:flex-nowrap">
                <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm shrink-0">
                  <img 
                    src={BIODATA_DATA.data_mahasiswa.foto_url} 
                    alt={currentStudent.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop';
                    }}
                  />
                </div>
                
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-2xl font-bold text-slate-900 leading-none">{currentStudent.name}</h1>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1.5 text-[9px] font-bold text-[#993633] bg-blue-50 border border-blue-200 px-2 py-1 rounded tracking-wide uppercase">
                        <CheckCircle2 size={12} className="text-[#bf4440]" />
                        TOP 5% HIGHEST SCORE
                      </span>
                      <span className="flex items-center gap-1.5 text-[9px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-1 rounded tracking-wide uppercase">
                        <Award size={12} className="text-teal-600" />
                        {currentStudent.academic_core.gpa_band} TRACK
                      </span>
                      <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-1 rounded">
                        #1 {learning.context.graduate_profiles[currentStudent.career_readiness.best_fit_profile as keyof typeof learning.context.graduate_profiles]}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-[13px] text-slate-600 font-medium flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <User size={14} className="text-slate-400" />
                      NIM: {currentStudent.nim}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1.5">
                      <GraduationCap size={14} className="text-slate-400" />
                      Semester {currentStudent.semester}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={14} className="text-slate-400" />
                      {learning.context.program_name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick documents buttons */}
              <div className="flex items-center gap-3">
                <a 
                  href={currentStudent.academic_core.documents.transcript} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#732926] text-white rounded-md text-sm font-semibold hover:bg-[#732926] transition-colors shadow-sm"
                >
                  <FileText size={16} />
                  Transkrip
                </a>
                <a 
                  href={currentStudent.academic_core.documents.skpi} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-[#993633] rounded-md text-sm font-semibold hover:bg-blushed-brick-50 transition-colors shadow-sm"
                >
                  <CheckCircle2 size={16} className="text-[#bf4440]" />
                  SKPI
                </a>
                <a 
                  href={currentStudent.academic_core.documents.attendance} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-[#993633] rounded-md text-sm font-semibold hover:bg-blushed-brick-50 transition-colors shadow-sm"
                >
                  <Calendar size={16} className="text-[#bf4440]" />
                  Kehadiran
                </a>
              </div>

              {/* Ringkasan Profil Belajar */}
              <div className="flex flex-col gap-2 max-w-4xl mt-2">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-[#bf4440] shrink-0" />
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-tight">RINGKASAN PROFIL BELAJAR</h3>
                </div>
                <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                  {currentStudent.passion_competency_fit.summary} Berdasarkan analisis prediktif, profil ini mengindikasikan potensi kepemimpinan strategis yang sangat kuat di masa depan. Mahasiswa sangat disarankan untuk terus memperkuat aspek negosiasi lintas budaya guna memaksimalkan kesiapannya menghadapi dinamika industri komunikasi global.
                </p>
              </div>
            </div>

            {/* Right side Stack: IPK & Fokus Pengembangan */}
            <div className="flex flex-col gap-3 shrink-0 lg:w-[320px]">
              <div className="flex gap-3">
                <div className="bg-white border border-slate-200 rounded-lg p-3.5 flex items-center justify-between flex-1 shadow-xs">
                  <div>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-0.5">IPK Kumulatif</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-900 leading-none tracking-tight">{currentStudent.academic_core.gpa}</span>
                      <span className="text-[11px] font-bold text-[#bf4440]/80">/ 4.0</span>
                    </div>
                  </div>
                  <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-12 h-12 transform -rotate-90 absolute top-0 left-0">
                      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="125.6" strokeDashoffset={125.6 - (125.6 * (Number(currentStudent.academic_core.gpa) / 4.0))} className="text-emerald-500" strokeLinecap="round" />
                    </svg>
                    <TrendingUp size={16} className="text-emerald-500 relative z-10" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-black text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                      Fokus Utama
                    </span>
                    <h3 className="text-xs font-black text-slate-800">Fokus Pengembangan</h3>
                  </div>
                  
                  <div className="space-y-2 bg-slate-50/50 border border-slate-200 p-3 rounded-xl">
                    <p className="text-[10px] font-black text-slate-800 leading-snug">{currentStudent.self_development_plan.priority_focus}</p>
                    
                    <div className="space-y-1.5 mt-2">
                      <div className="flex gap-2 items-start">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="text-[9px] font-medium text-slate-600 leading-tight">Implementasi statistika parametris dalam riset periklanan digital</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="text-[9px] font-medium text-slate-600 leading-tight">Mempelajari dasbor interaktif visual menggunakan Tableau</span>
                      </div>
                      <div className="flex gap-2 items-start">
                        <Circle className="w-3 h-3 text-slate-400 mt-1 shrink-0 ml-px" />
                        <span className="text-[9px] font-medium text-slate-600 leading-tight">Mengikuti pelatihan mediasi krisis untuk skenario FGD Advance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}



      {/* ================================= 2. HOLISTIC 12-COLUMN DASHBOARD HUB ================================= */}
      <div id="twin-dashboard-content-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Column Wrapper */}
        <div className={`${activeTwinSubMenu === 'overview' ? 'lg:col-span-7' : 'lg:col-span-12'} flex flex-col gap-5`}>{/* ================================= 1.5 TODAY'S SCHEDULE ================================= */}
          {activeTwinSubMenu === 'overview' && (
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
              <div className="mb-4">
                <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5"><Calendar size={14} className="text-blue-500" /> Jadwal Hari Ini</h2>
                <p className="text-[10px] text-slate-400 font-bold mt-0.5">Tuesday, October 24, 2024</p>
              </div>

              <div className="relative pl-1 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
                {/* Vertical Line */}
                <div className="absolute top-4 bottom-4 left-[2.2rem] w-px bg-slate-200"></div>

                {/* Item 1: Selesai */}
                <div className="flex items-start gap-3 relative mb-2.5">
                  <div className="w-8 pt-1.5 text-right text-slate-400 font-sans text-[9px] font-bold">
                    08:00
                  </div>
                  <div className="relative pt-2 z-10 flex flex-col items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300 border-[2px] border-white shadow-sm" />
                  </div>
                  <div className="flex-1 bg-slate-50/50 border border-slate-100 rounded-lg p-2.5 flex justify-between items-start transition-all">
                    <div className="space-y-1">
                      <h3 className="text-[11px] font-bold text-slate-600 leading-tight">Komunikasi Massa</h3>
                      <div className="flex items-center gap-3 text-slate-400 text-[9px] font-medium pt-0.5">
                        <div className="flex items-center gap-1">
                          <MapPin size={10} className="text-slate-400 shrink-0" />
                          <span>R.204</span>
                        </div>
                      </div>
                    </div>
                    <span className="bg-slate-100 text-slate-400 text-[8px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider shrink-0">Selesai</span>
                  </div>
                </div>

                {/* Item 2: Berlangsung */}
                <div className="flex items-start gap-3 relative mb-2.5">
                  <div className="w-8 pt-1.5 text-right text-[#bf4440] font-black font-sans text-[9px]">
                    13:00
                  </div>
                  <div className="relative pt-2 z-10 flex flex-col items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 border-[2px] border-white shadow-sm" />
                  </div>
                  <div className="flex-1 bg-white border border-[#bf4440] rounded-lg p-2.5 flex justify-between items-start transition-all relative overflow-hidden shadow-[0_2px_10px_rgba(59,130,246,0.1)]">
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500"></div>
                    <div className="space-y-1 pl-1">
                      <h3 className="text-[11px] font-bold text-slate-800 leading-tight">Strategi Komunikasi Persuasif</h3>
                      <div className="flex items-center gap-3 text-slate-500 text-[9px] font-medium pt-0.5">
                        <div className="flex items-center gap-1 text-[#bf4440] font-bold">
                          <MapPin size={10} className="text-blue-500 shrink-0" />
                          <span>Gd. D Lt.3 - R.301</span>
                        </div>
                      </div>
                    </div>
                    <span className="bg-[#047857] text-white text-[8px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider flex items-center gap-1 shrink-0">
                      <span className="w-1 h-1 rounded-full bg-white animate-pulse"></span>
                      Now
                    </span>
                  </div>
                </div>

                {/* Item 3: Akan Datang */}
                <div className="flex items-start gap-3 relative">
                  <div className="w-8 pt-1.5 text-right text-slate-500 font-bold font-sans text-[9px]">
                    16:00
                  </div>
                  <div className="relative pt-2 z-10 flex flex-col items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-white border-[2px] border-slate-300 shadow-sm" />
                  </div>
                  <div className="flex-1 bg-white border border-slate-200 rounded-lg p-2.5 flex justify-between items-start transition-all">
                    <div className="space-y-1">
                      <h3 className="text-[11px] font-bold text-slate-700 leading-tight">Riset Audiens</h3>
                      <div className="flex items-center gap-3 text-slate-500 text-[9px] font-medium pt-0.5">
                        <div className="flex items-center gap-1 text-[#bf4440] font-bold cursor-pointer hover:underline">
                          <Video size={10} className="text-blue-500 shrink-0" />
                          <span>MS Teams</span>
                        </div>
                      </div>
                    </div>
                    <span className="bg-slate-50 text-slate-500 text-[8px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider border border-slate-200 shrink-0">16:00</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* Left: Twin Academic DNA & Competencies Tab View */}
        <div id="academic-dna-primary-panel" className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5 transition-all duration-300">
          {activeTwinSubMenu !== 'biodata' && (() => {
            let headerTitle = "Profil & Perkembangan Saya";
            let headerSubtitle = "Analisis ketercapaian akademik, matriks CPL, dan bimbingan";
            let tabs: { id: string; label: string; icon: any }[] = [];

            if (activeTwinSubMenu === 'overview') {
              headerTitle = "Ringkasan Akademik";
              headerSubtitle = "Analisis ringkasan ketercapaian akademik, matriks CPL, dan rekomendasi bimbingan";
              tabs = [{ id: "overview", label: "Ringkasan Profil Belajar", icon: Sparkles }];
            } else if (activeTwinSubMenu === 'learning') {
              headerTitle = "Profil Gaya Belajar";
              headerSubtitle = "Analisis perkembangan indeks prestasi kumulatif (IPK) dan radar peta kompetensi mahasiswa";
              tabs = [];
            } else if (activeTwinSubMenu === 'career') {
              headerTitle = "Perencanaan Karier";
              headerSubtitle = "Pencocokan aspirasi karir dengan minat personal serta peta rencana aksi pengembangan";
              tabs = [];
            }

            return (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-md font-black text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                    <Target size={18} className="text-[#bf4440]" />
                    {headerTitle}
                  </h2>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5 font-sans">
                    {headerSubtitle}
                  </p>
                </div>
     
                {/* Dynamic Tab Navigation for DNA */}
                {tabs.length > 1 && (
                  <div className="flex gap-1 overflow-x-auto scrollbar-none shrink-0">
                    {tabs.map((tab) => {
                      const isTabActive = activeTab === tab.id;
                      const TabIcon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`px-2.5 py-1.5 rounded-lg border font-bold text-[10px] flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                            isTabActive 
                              ? "bg-slate-900 border-slate-900 text-white shadow-sm" 
                              : "bg-slate-50 hover:bg-slate-100 border-slate-200/60 text-slate-600"
                          }`}
                        >
                          <TabIcon size={11} className={isTabActive ? "text-amber-400" : "text-slate-400"} />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()}

              {/* Tab Contents Block */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.18 }}
              className="space-y-4"
            >
              
              {/* TABS 1: OVERVIEW */}
              {activeTab === "overview" && (
                <div className="space-y-4 animate-fade-in">
                  {/* Middle row: IPK Trend only */}
                  <div className="grid grid-cols-1 gap-4">
                    {/* IPK Trend (light theme) */}
                    <div className="bg-white border border-slate-200 p-4.5 rounded-xl flex flex-col justify-between">
                      <div>
                        <span className="text-[8px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded uppercase tracking-wider font-mono">
                          Academic Metrics
                        </span>
                        <h3 className="text-xs font-black text-slate-800 mt-2">Tren Indeks Prestasi Kumulatif (IPK)</h3>
                      </div>
                      <div className="h-44 w-full mt-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={gpaChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                            <XAxis 
                              dataKey="semester" 
                              tickFormatter={(v) => `Sem ${v}`} 
                              tick={{ fill: '#475569', fontSize: 9, fontWeight: 600 }}
                            />
                            <YAxis 
                              domain={[3.0, 4.0]} 
                              tick={{ fill: '#475569', fontSize: 9, fontWeight: 600 }}
                            />
                            <Tooltip 
                              content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                  return (
                                    <div className="bg-white border border-slate-200 rounded-xl p-2 shadow-md text-[10px]">
                                      <p className="font-extrabold text-slate-700">Semester {payload[0].payload.semester}</p>
                                      <p className="font-bold text-[#bf4440] font-mono mt-0.5">IPK: {payload[0].value}</p>
                                    </div>
                                  );
                                }
                                return null;
                              }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="gpa" 
                              stroke="#bf4440" 
                              strokeWidth={2.5} 
                              dot={{ r: 4, strokeWidth: 2, fill: "#FFFFFF" }} 
                              activeDot={{ r: 6 }} 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* Bottom row: Comm Labs Agregat (Image 2) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Card 1: Presentation */}
                    <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col justify-between min-h-[160px] shadow-sm">
                      <div>
                        <h4 className="text-[10px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded w-max uppercase tracking-widest mb-2 border border-purple-100">PRESENTATION</h4>
                        <h3 className="text-[12.5px] font-bold text-slate-800 mb-2 leading-snug">Manajemen Reputasi Korporat di Era Media Sosial</h3>
                        <div className="flex gap-2">
                          <span className="bg-slate-50 text-slate-500 font-mono text-[8.5px] font-bold px-2 py-0.5 rounded border border-slate-200">Strategi Komunikasi Persuasif</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-black text-[#bf4440]">85</span>
                          <span className="text-xs text-slate-400 font-bold">/ 100</span>
                          <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full ml-1">Sangat Baik</span>
                        </div>
                        <div className="bg-purple-50 border border-purple-100 rounded-lg p-2.5 flex items-center gap-3">
                          <Star size={14} className="text-purple-600" />
                          <div>
                            <p className="text-[9px] text-slate-500 font-bold">Dimensi Terkuat</p>
                            <p className="text-[11px] font-bold text-purple-700">Content Mastery</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Writing */}
                    <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col justify-between min-h-[160px] shadow-sm">
                      <div>
                        <h4 className="text-[10px] font-black text-[#bf4440] bg-blue-50 px-2 py-0.5 rounded w-max uppercase tracking-widest mb-2 border border-blue-100">WRITING</h4>
                        <h3 className="text-[12.5px] font-bold text-slate-800 mb-2 leading-snug">Policy Brief: Regulasi Konten AI-Generated</h3>
                        <div className="flex gap-2">
                          <span className="bg-slate-50 text-slate-500 font-mono text-[8.5px] font-bold px-2 py-0.5 rounded border border-slate-200">Penulisan Komunikasi Strategis</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-black text-[#bf4440]">78</span>
                          <span className="text-xs text-slate-400 font-bold">/ 100</span>
                          <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full ml-1">Baik</span>
                        </div>
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-2.5 flex items-center gap-3">
                          <Edit3 size={14} className="text-[#bf4440]" />
                          <div>
                            <p className="text-[9px] text-slate-500 font-bold">Dimensi Terkuat</p>
                            <p className="text-[11px] font-bold text-[#993633]">Argumentation</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card 3: Simulation */}
                    <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col justify-between min-h-[160px] shadow-sm">
                      <div>
                        <h4 className="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded w-max uppercase tracking-widest mb-2 border border-amber-100">SIMULATION</h4>
                        <h3 className="text-[12.5px] font-bold text-slate-800 mb-2 leading-snug">Crisis Communication &amp; Media Handling</h3>
                        <div className="flex gap-2">
                          <span className="text-slate-600 font-bold text-[8.5px] bg-slate-50 px-2 py-0.5 rounded border border-slate-200">Peran: PR Officer</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-black text-[#bf4440]">80</span>
                          <span className="text-xs text-slate-400 font-bold">/ 100</span>
                          <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full ml-1">Baik</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                           <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">Completed</span>
                           <span className="text-[10px] text-slate-600 font-medium"><span className="text-slate-400 font-normal">• Tingkat:</span> Hard</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Card 4: FGD */}
                    <div className="bg-white rounded-xl p-4 border border-slate-200 flex flex-col justify-between min-h-[160px] shadow-sm">
                      <div>
                        <h4 className="text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded w-max uppercase tracking-widest mb-2 border border-rose-100">FGD</h4>
                        <h3 className="text-[12.5px] font-bold text-slate-800 mb-2 leading-snug">Studi Kasus Manajemen Isu PT KAI</h3>
                        <div className="flex gap-2">
                          <span className="text-slate-600 font-bold text-[8.5px] bg-slate-50 px-2 py-0.5 rounded border border-slate-200">Peran: Lead Strategist</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-black text-[#bf4440]">92</span>
                          <span className="text-xs text-slate-400 font-bold">/ 100</span>
                          <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full ml-1">Sangat Baik</span>
                        </div>
                        <div className="bg-rose-50 border border-rose-100 rounded-lg p-2.5 flex items-center gap-3">
                          <Users size={14} className="text-rose-600" />
                          <div>
                            <p className="text-[9px] text-slate-500 font-bold">Dimensi Terkuat</p>
                            <p className="text-[11px] font-bold text-rose-700">Persuasion</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LEARNING PROFILE (INTEGRATED) */}
              {activeTab === "learning" && (
                <div className="space-y-8 animate-fade-in">
                  {/* Bagian 1: IPK & Nilai */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-2 gap-3">
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} className="text-[#bf4440]" />
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">IPK &amp; Nilai</h3>
                      </div>
                      
                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        {/* SKS Info */}
                        <div className="flex items-baseline gap-0.5 bg-slate-50 border border-slate-200 px-3 py-1 rounded-xl">
                          <span className="text-[9px] text-slate-400 font-bold uppercase mr-1.5">Total SKS:</span>
                          <span className="text-sm font-black text-slate-800 font-mono">112</span>
                          <span className="text-[10px] text-slate-400 font-bold font-mono">/144</span>
                        </div>
                        
                        {/* Jadwal Kuliah Button */}
                        <button
                          onClick={() => setIsScheduleOpen(true)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#bf4440] hover:bg-[#993633] text-white font-bold text-[10px] rounded-lg shadow-sm transition-all cursor-pointer"
                        >
                          <Clock size={12} />
                          Jadwal Kuliah
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                      {/* Kiri: Tren IPK */}
                      <div className="lg:col-span-5 bg-white border border-slate-200 p-4 rounded-xl flex flex-col justify-between h-[360px]">
                        <div>
                          <span className="text-[8px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded uppercase tracking-wider font-mono">
                            Academic Metrics
                          </span>
                          <h3 className="text-xs font-black text-slate-800 mt-2">Tren Indeks Prestasi Kumulatif (IPK)</h3>
                          <p className="text-[10px] text-slate-400 font-bold mt-1">
                            Perkembangan IPK mahasiswa dari semester ke semester
                          </p>
                        </div>
                        <div className="h-56 w-full mt-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={gpaChartData} margin={{ top: 10, right: 15, left: -25, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                              <XAxis 
                                dataKey="semester" 
                                tickFormatter={(v) => `Sem ${v}`} 
                                tick={{ fill: '#475569', fontSize: 9, fontWeight: 600 }}
                              />
                              <YAxis 
                                domain={[3.0, 4.0]} 
                                tick={{ fill: '#475569', fontSize: 9, fontWeight: 600 }}
                              />
                              <Tooltip 
                                content={({ active, payload }) => {
                                  if (active && payload && payload.length) {
                                    return (
                                      <div className="bg-white border border-slate-200 rounded-xl p-2 shadow-md text-[10px]">
                                        <p className="font-extrabold text-slate-700">Semester {payload[0].payload.semester}</p>
                                        <p className="font-bold text-[#bf4440] font-mono mt-0.5">IPK: {payload[0].value}</p>
                                      </div>
                                    );
                                  }
                                  return null;
                                }}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="gpa" 
                                stroke="#bf4440" 
                                strokeWidth={2.5} 
                                dot={{ r: 4, strokeWidth: 2, fill: "#FFFFFF" }} 
                                activeDot={{ r: 6 }} 
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="text-[9px] text-slate-400 font-semibold italic text-center mt-2">
                          IPK Saat Ini: <span className="text-[#bf4440] font-black">{currentStudent.academic_core.gpa}</span>
                        </div>
                      </div>

                      {/* Kanan: Mata Kuliah Terkuat & Terlemah (Dua Kolom) */}
                      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Mata Kuliah Terkuat */}
                        <div className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col justify-between h-[360px]">
                          <div className="space-y-2">
                            <span className="text-[8px] font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                              Mata Kuliah Terkuat
                            </span>
                            <div className="space-y-1.5 overflow-y-auto max-h-[230px] pr-0.5 scrollbar-thin">
                              {currentStudent.academic_core.strongest_courses.map((c, i) => (
                                <div key={i} className="p-2 bg-emerald-50/10 border border-emerald-100 rounded-lg flex items-center justify-between transition">
                                  <div className="overflow-hidden pr-2">
                                    <h4 className="text-[10px] font-extrabold text-slate-800 leading-tight truncate">{c.course}</h4>
                                    <span className="text-[8px] text-slate-400 font-semibold font-mono uppercase">CPL: {c.mapped_cpl.join(', ')}</span>
                                  </div>
                                  <div className="text-right shrink-0 font-mono">
                                    <span className="text-[10px] font-black text-emerald-600 block leading-none">{c.score}</span>
                                    <span className="text-[8.5px] font-extrabold text-slate-400 uppercase leading-none mt-0.5 block">{c.grade}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="text-[8.5px] text-emerald-700/80 font-bold bg-emerald-50/40 border border-emerald-100/30 p-2 rounded-lg text-center leading-normal mt-2">
                            Kapasitas analisis teoretis sangat unggul
                          </div>
                        </div>

                        {/* Mata Kuliah Terlemah */}
                        <div className="bg-white border border-slate-200 p-4 rounded-xl flex flex-col justify-between h-[360px]">
                          <div className="space-y-2">
                            <span className="text-[8px] font-black text-rose-700 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                              Mata Kuliah Lemah
                            </span>
                            <div className="space-y-1.5 overflow-y-auto max-h-[230px] pr-0.5 scrollbar-thin">
                              {currentStudent.academic_core.weakest_courses.map((c, i) => (
                                <div key={i} className="p-2 bg-rose-50/10 border border-rose-100 rounded-lg flex items-center justify-between transition">
                                  <div className="overflow-hidden pr-2">
                                    <h4 className="text-[10px] font-extrabold text-slate-800 leading-tight truncate">{c.course}</h4>
                                    <span className="text-[8px] text-slate-400 font-semibold font-mono uppercase">CPL: {c.mapped_cpl.join(', ')}</span>
                                  </div>
                                  <div className="text-right shrink-0 font-mono">
                                    <span className="text-[10px] font-black text-rose-600 block leading-none">{c.score}</span>
                                    <span className="text-[8.5px] font-extrabold text-slate-400 uppercase leading-none mt-0.5 block">{c.grade}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="text-[8.5px] text-rose-700/80 font-bold bg-rose-50/40 border border-rose-100/30 p-2 rounded-lg text-center leading-normal mt-2">
                            Membutuhkan pendampingan mentoring berkala
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Jadwal Kuliah & Mata Kuliah Digunakan IPK dihapus */}
                  </div>

                  {/* Bagian 2: Radar Kompetensi & CPL */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                      <Target size={16} className="text-[#bf4440]" />
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Radar Kompetensi &amp; CPL</h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                      <div className="lg:col-span-5 bg-slate-50/40 border border-slate-200 p-4 rounded-xl h-[320px] flex flex-col justify-between">
                        <div>
                          <span className="text-[8px] font-black text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                            Competency Radar
                          </span>
                          <h3 className="text-xs font-black text-slate-800 mt-2">6 Pilar Kompetensi Mahasiswa</h3>
                        </div>

                        <div className="h-56 w-full mt-2">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                              <PolarGrid stroke="#CBD5E1" />
                              <PolarAngleAxis dataKey="subject" tick={{ fill: '#334155', fontSize: 8, fontWeight: 700 }} />
                              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748B', fontSize: 8 }} />
                              <Radar 
                                name={currentStudent.name} 
                                dataKey="Score" 
                                stroke="#bf4440" 
                                fill="#bf4440" 
                                fillOpacity={0.25} 
                              />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="lg:col-span-7 bg-white border border-slate-200 p-4 rounded-xl flex flex-col justify-between h-[320px]">
                        <div className="space-y-2">
                          <span className="text-[8px] font-black text-[#bf4440] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                            CPL Attainment
                          </span>
                          <h3 className="text-xs font-black text-slate-800">Capaian Pembelajaran Lulusan (CPL)</h3>
                          
                          <div className="space-y-2 overflow-y-auto max-h-[220px] pr-1.5 custom-scrollbar">
                            {currentStudent.aggregate_competency.cpl_attainment.map((cpl, i) => (
                              <div key={i} className="space-y-1">
                                <div className="flex justify-between items-center text-[10px] font-bold">
                                  <span className="text-slate-700 font-mono text-[9px] bg-slate-100 px-1 py-0.2 rounded mr-1.5 shrink-0">{cpl.cpl_id}</span>
                                  <span className="text-slate-600 truncate flex-1">{cpl.label}</span>
                                  <span className="font-mono text-[#bf4440] mr-2 shrink-0">{cpl.cumulative_pct}%</span>
                                  <span className={`text-[8px] px-1.5 py-0.2 rounded font-extrabold uppercase shrink-0 ${
                                    cpl.level === "Sangat Baik" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-blue-50 text-[#993633] border border-blue-100"
                                  }`}>{cpl.level}</span>
                                </div>
                                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${cpl.level === "Sangat Baik" ? "bg-emerald-500" : "bg-blue-500"}`}
                                    style={{ width: `${cpl.cumulative_pct}%` }} 
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CAREER & PASSION (INTEGRATED) */}
              {activeTab === "career" && (
                <div className="space-y-8 animate-fade-in">
                  {/* Bagian 1: Passion & Karir */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                      <Heart size={16} className="text-[#bf4440]" />
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Passion &amp; Karir</h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                      {currentStudent.passion_competency_fit.alignment.map((align, index) => (
                        <div key={index} className="lg:col-span-6 bg-slate-50/50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between min-h-[200px]">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-[8px] font-black text-purple-700 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded uppercase font-mono">
                                PASSION AREA #{index + 1}
                              </span>
                              <span className="text-[10px] font-black text-slate-800 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded font-mono">
                                {align.verdict}
                              </span>
                            </div>
                            <h4 className="text-xs font-black text-slate-800 leading-snug">{align.passion}</h4>
                            
                            <div className="space-y-1 mt-2">
                              <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Supporting Competencies:</span>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {align.supporting_competencies.map((sc, i) => (
                                  <span key={i} className="text-[8.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">
                                    {sc}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {align.competency_gaps.length > 0 && (
                              <div className="space-y-1 mt-2">
                                <span className="text-[9px] text-rose-500 font-extrabold uppercase tracking-wider block">Gaps &amp; Roadblock:</span>
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  {align.competency_gaps.map((cg, i) => (
                                    <span key={i} className="text-[8.5px] font-bold text-rose-700 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded">
                                      {cg}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-200/50 flex justify-between items-center text-[10px] font-bold">
                            <span className="text-slate-400">Passion Alignment Score:</span>
                            <span className="font-mono text-purple-600 font-black text-sm">{align.alignment_score}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bagian 2: Pengembangan Karir */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                      <Compass size={16} className="text-[#bf4440]" />
                      <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Pengembangan Karir &amp; Roadmap</h3>
                    </div>

                    <div className="bg-blue-50/40 border border-blue-100/60 p-4 rounded-xl">
                      <span className="text-[8px] font-black text-[#993633] bg-blue-100/50 border border-blue-200 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                        Priority Focus
                      </span>
                      <p className="text-[11px] text-slate-700 font-semibold leading-relaxed mt-1.5">
                        "{currentStudent.self_development_plan.priority_focus}"
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {currentStudent.self_development_plan.horizon.map((hz, i) => (
                        <div key={i} className="bg-slate-50/50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between min-h-[200px]">
                          <div className="space-y-2">
                            <span className="text-[8.5px] font-black text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                              {hz.term}
                            </span>
                            
                            <div className="space-y-3 mt-2">
                              {hz.goals.map((goal, gidx) => (
                                <div key={gidx} className="space-y-1">
                                  <h5 className="text-[10px] font-black text-slate-800 uppercase tracking-wider block">{goal.area}</h5>
                                  <p className="text-[10px] text-slate-600 font-semibold leading-relaxed">
                                    {goal.action}
                                  </p>
                                  <span className="text-[8.5px] text-slate-400 block italic leading-tight mt-1">
                                    Rationale: {goal.rationale}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: BIODATA MAHASISWA */}
              {activeTab === "biodata" && (
                <div className="space-y-6">
                  {/* Simple Header with Title and Export Button */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <GraduationCap size={16} className="text-indigo-600" />
                      Biodata
                    </h3>
                    
                    <button
                      onClick={() => {
                        setIsExportingPdf(true);
                        setTimeout(() => {
                          setIsExportingPdf(false);
                          // Trigger print dialog or create dummy download
                          const reportText = `BIODATA MAHASISWA UNPAD\n====================\nNPM: ${BIODATA_DATA.data_mahasiswa.npm}\nNama: ${BIODATA_DATA.data_mahasiswa.nama}\nAngkatan: ${BIODATA_DATA.data_mahasiswa.angkatan}\nProgram Studi: ${BIODATA_DATA.data_mahasiswa.program_studi}\nFakultas: ${BIODATA_DATA.data_mahasiswa.fakultas}\n\nLulus IPK: ${BIODATA_DATA.prestasi_akademik.ringkasan_ipk.ipk}\nTotal SKS: ${BIODATA_DATA.prestasi_akademik.ringkasan_ipk.jumlah_sks}`;
                          const blob = new Blob([reportText], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `biodata_${BIODATA_DATA.data_mahasiswa.npm}.txt`;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                        }, 1500);
                      }}
                      disabled={isExportingPdf}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold text-[10px] rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
                    >
                      <Download size={12} className={isExportingPdf ? "animate-bounce" : ""} />
                      {isExportingPdf ? "Generating PDF..." : "Export PDF"}
                    </button>
                  </div>

                  {/* Main Grid: Profile Left, Details Tabbed Right */}
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
                    
                    {/* Left profile card (4 columns) */}
                    <div className="xl:col-span-4 bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col items-center text-center">
                      <div className="relative w-36 h-48 rounded-xl overflow-hidden shadow-md border-2 border-slate-200 bg-slate-100 flex items-center justify-center">
                        {!imgError ? (
                          <img 
                            src={BIODATA_DATA.data_mahasiswa.foto_url} 
                            alt={BIODATA_DATA.data_mahasiswa.nama}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            onError={() => setImgError(true)}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex flex-col items-center justify-center p-3 text-white">
                            <span className="text-3xl font-black tracking-wide font-sans">MA</span>
                            <span className="text-[10px] font-black text-indigo-100 uppercase tracking-widest mt-2">IUP Student</span>
                          </div>
                        )}
                        <span className="absolute bottom-2 right-2 bg-emerald-500 text-white text-[8px] font-black uppercase px-2 py-0.5 rounded shadow-sm border border-emerald-400">
                          B-Aktif
                        </span>
                      </div>

                      <h3 className="text-sm font-black text-slate-800 mt-4 leading-tight">
                        {BIODATA_DATA.data_mahasiswa.nama}
                      </h3>
                      <p className="text-[11px] font-mono font-bold text-[#bf4440] mt-1">
                        NPM {BIODATA_DATA.data_mahasiswa.npm}
                      </p>
                      
                      <div className="w-full border-t border-slate-200 my-4"></div>
                      
                      <div className="w-full space-y-2 text-left">
                        <div className="flex justify-between text-[10px] py-1 border-b border-slate-100 animate-fade-in">
                          <span className="text-slate-400 font-bold">Fakultas</span>
                          <span className="text-slate-700 font-black text-right">{BIODATA_DATA.data_mahasiswa.fakultas}</span>
                        </div>
                        <div className="flex justify-between text-[10px] py-1 border-b border-slate-100 animate-fade-in">
                          <span className="text-slate-400 font-bold">Program Studi</span>
                          <span className="text-slate-700 font-black text-right">{BIODATA_DATA.data_mahasiswa.program_studi.split(" - ")[1]}</span>
                        </div>
                        <div className="flex justify-between text-[10px] py-1 border-b border-slate-100 animate-fade-in">
                          <span className="text-slate-400 font-bold">Angkatan</span>
                          <span className="text-slate-700 font-black">{BIODATA_DATA.data_mahasiswa.angkatan}</span>
                        </div>
                        <div className="flex justify-between text-[10px] py-1 border-b border-slate-100 animate-fade-in">
                          <span className="text-slate-400 font-bold">Dosen Wali</span>
                          <span className="text-slate-700 font-black text-right text-[9px] leading-tight max-w-[150px]">{BIODATA_DATA.data_mahasiswa.dosen_wali}</span>
                        </div>
                        
                        <div className="flex justify-between text-[10px] py-1 border-b border-slate-100 animate-fade-in">
                          <span className="text-slate-400 font-bold">Alamat KTP</span>
                          <span className="text-slate-700 font-black text-right max-w-[150px] leading-tight text-[9px]">{BIODATA_DATA.alamat.alamat_ktp.alamat}</span>
                        </div>
                        <div className="flex justify-between text-[10px] py-1 border-b border-slate-100 animate-fade-in">
                          <span className="text-slate-400 font-bold">RT / RW</span>
                          <span className="text-slate-700 font-black">{BIODATA_DATA.alamat.alamat_ktp.rt} / {BIODATA_DATA.alamat.alamat_ktp.rw}</span>
                        </div>
                        <div className="flex justify-between text-[10px] py-1 border-b border-slate-100 animate-fade-in">
                          <span className="text-slate-400 font-bold">Kabupaten / Kota</span>
                          <span className="text-slate-700 font-black text-right max-w-[150px] leading-tight text-[9px]">{BIODATA_DATA.alamat.alamat_ktp.kota}</span>
                        </div>
                        <div className="flex justify-between text-[10px] py-1 border-b border-slate-100 animate-fade-in font-mono">
                          <span className="text-slate-400 font-bold font-sans">Kode Pos</span>
                          <span className="text-slate-700 font-black">{BIODATA_DATA.alamat.alamat_ktp.kode_pos}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 w-full mt-4 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                        <div className="text-center">
                          <span className="text-[8px] font-bold text-slate-400 block uppercase">IPK</span>
                          <span className="text-xs font-black text-[#bf4440] font-mono">{BIODATA_DATA.prestasi_akademik.ringkasan_ipk.ipk}</span>
                        </div>
                        <div className="text-center border-x border-slate-100">
                          <span className="text-[8px] font-bold text-slate-400 block uppercase">SKS</span>
                          <span className="text-xs font-black text-slate-800 font-mono">{BIODATA_DATA.prestasi_akademik.ringkasan_ipk.jumlah_sks}</span>
                        </div>
                        <div className="text-center">
                          <span className="text-[8px] font-bold text-slate-400 block uppercase">SMT</span>
                          <span className="text-xs font-black text-emerald-600 font-mono">2</span>
                        </div>
                      </div>
                    </div>

                    {/* Right tabbed details panel (8 columns) */}
                    <div className="xl:col-span-8 space-y-5">
                      {/* Sub-tabs header */}
                      <div className="bg-slate-50 border border-slate-200 p-2 rounded-xl overflow-x-auto scrollbar-none flex gap-1 shrink-0 shadow-sm">
                        {[
                          { id: 'personal_family', label: 'Data Pribadi & Keluarga' },
                          { id: 'registration_billing', label: 'Registrasi & Keuangan' },
                          { id: 'organisasi_portfolio', label: 'Organisasi & Portfolio' },
                        ].map((sub) => {
                          const isSubActive = biodataSubTab === sub.id;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => setBiodataSubTab(sub.id as any)}
                              className={`px-3 py-1.5 rounded-lg font-bold text-[10px] transition-all shrink-0 cursor-pointer ${
                                isSubActive 
                                  ? "bg-white text-slate-800 border border-slate-250 shadow-xs" 
                                  : "text-slate-500 hover:text-slate-800 border border-transparent"
                              }`}
                            >
                              {sub.label}
                            </button>
                          );
                        })}
                      </div>

                      {/* Content panel */}
                      <div className="border border-slate-200 rounded-xl p-5 bg-white space-y-4 shadow-xs">
                        
                        {/* 1. BIODATA PRIBADI & KELUARGA */}
                        {biodataSubTab === 'personal_family' && (
                          <div className="space-y-6 animate-fade-in">
                            {/* Data Pribadi Section */}
                            <div>
                              <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider mb-3 pb-1.5 border-b border-slate-100 flex items-center gap-1.5">
                                <span className="w-1.5 h-3 bg-[#bf4440] rounded-xs"></span>
                                Data Pribadi
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Nama Lengkap</label>
                                  <div className="text-[11px] font-bold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg font-mono">
                                    {BIODATA_DATA.data_mahasiswa.nama}
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Jenis Kelamin</label>
                                  <div className="text-[11px] font-bold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg">
                                    {BIODATA_DATA.data_pribadi.jenis_kelamin}
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Tempat / Tanggal Lahir</label>
                                  <div className="text-[11px] font-bold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg">
                                    {BIODATA_DATA.data_pribadi.tempat_lahir}, {BIODATA_DATA.data_pribadi.tanggal_lahir}
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Warga Negara / Agama</label>
                                  <div className="text-[11px] font-bold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg">
                                    {BIODATA_DATA.data_pribadi.warga_negara} / {BIODATA_DATA.data_pribadi.agama}
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Golongan Darah</label>
                                  <div className="text-[11px] font-bold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg">
                                    {BIODATA_DATA.data_pribadi.golongan_darah || "-"}
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Email Address</label>
                                  <div className="text-[11px] font-bold text-[#bf4440] bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg font-mono">
                                    {BIODATA_DATA.data_pribadi.email}
                                  </div>
                                </div>
                                <div className="space-y-1 md:col-span-2">
                                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Telepon / HP</label>
                                  <div className="text-[11px] font-bold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg font-mono">
                                    {BIODATA_DATA.data_pribadi.telepon} / {BIODATA_DATA.data_pribadi.handphone}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Data Keluarga Section */}
                            <div className="space-y-4 pt-2">
                              <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider mb-1 pb-1.5 border-b border-slate-100 flex items-center gap-1.5">
                                <span className="w-1.5 h-3 bg-indigo-600 rounded-xs"></span>
                                Data Keluarga & Orang Tua
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                                  <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wider">Data Ayah</h4>
                                  <div className="space-y-2 mt-2">
                                    <div>
                                      <span className="text-[8px] text-slate-400 font-bold uppercase block">Nama</span>
                                      <span className="text-[10px] text-slate-700 font-black">{BIODATA_DATA.data_keluarga.ayah.nama}</span>
                                    </div>
                                    <div className="flex gap-4">
                                      <div>
                                        <span className="text-[8px] text-slate-400 font-bold uppercase block">Pendidikan</span>
                                        <span className="text-[10px] text-slate-700 font-black">{BIODATA_DATA.data_keluarga.ayah.pendidikan}</span>
                                      </div>
                                      <div>
                                        <span className="text-[8px] text-slate-400 font-bold uppercase block">Pekerjaan</span>
                                        <span className="text-[10px] text-slate-700 font-black">{BIODATA_DATA.data_keluarga.ayah.pekerjaan}</span>
                                      </div>
                                      <div>
                                        <span className="text-[8px] text-slate-400 font-bold uppercase block">Status</span>
                                        <span className="text-[10px] text-emerald-600 font-black">{BIODATA_DATA.data_keluarga.ayah.status}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-1.5 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                                  <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wider">Data Ibu</h4>
                                  <div className="space-y-2 mt-2">
                                    <div>
                                      <span className="text-[8px] text-slate-400 font-bold uppercase block">Nama</span>
                                      <span className="text-[10px] text-slate-700 font-black">{BIODATA_DATA.data_keluarga.ibu.nama}</span>
                                    </div>
                                    <div className="flex gap-4">
                                      <div>
                                        <span className="text-[8px] text-slate-400 font-bold uppercase block">Pendidikan</span>
                                        <span className="text-[10px] text-slate-700 font-black">{BIODATA_DATA.data_keluarga.ibu.pendidikan}</span>
                                      </div>
                                      <div>
                                        <span className="text-[8px] text-slate-400 font-bold uppercase block">Pekerjaan</span>
                                        <span className="text-[10px] text-slate-700 font-black">{BIODATA_DATA.data_keluarga.ibu.pekerjaan}</span>
                                      </div>
                                      <div>
                                        <span className="text-[8px] text-slate-400 font-bold uppercase block">Status</span>
                                        <span className="text-[10px] text-emerald-600 font-black">{BIODATA_DATA.data_keluarga.ibu.status}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-1.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-[10px]">
                                <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wider mb-2">Kontak &amp; Alamat Orang Tua</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div>
                                    <span className="text-[8px] text-slate-400 font-bold uppercase block">Alamat Rumah</span>
                                    <span className="text-slate-700 font-black">{BIODATA_DATA.data_keluarga.alamat_orang_tua.alamat}, RT {BIODATA_DATA.data_keluarga.alamat_orang_tua.rt}/RW {BIODATA_DATA.data_keluarga.alamat_orang_tua.rw}, Kota Bekasi</span>
                                  </div>
                                  <div>
                                    <span className="text-[8px] text-slate-400 font-bold uppercase block">Nomor HP Orang Tua</span>
                                    <span className="text-slate-700 font-black font-mono">{BIODATA_DATA.data_keluarga.kontak_orang_tua.telepon}</span>
                                  </div>
                                  <div>
                                    <span className="text-[8px] text-slate-400 font-bold uppercase block">Penghasilan Orang Tua</span>
                                    <span className="text-slate-700 font-black">{BIODATA_DATA.data_keluarga.alamat_orang_tua.penghasilan_orang_tua || "Rp 15.000.000 - Rp 25.000.000"}</span>
                                  </div>
                                  <div>
                                    <span className="text-[8px] text-slate-400 font-bold uppercase block">Posisi Anak</span>
                                    <span className="text-slate-700 font-black">Anak ke-1 (Tunggal)</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 4. REGISTRASI & KEUANGAN */}
                        {biodataSubTab === 'registration_billing' && (
                          <div className="space-y-6">
                            {/* STATUS REGISTRASI */}
                            <div className="bg-slate-50/50 border border-slate-200 p-4 rounded-xl space-y-2">
                              <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wider">Histori Registrasi Akademik</h4>
                              <div className="overflow-x-auto">
                                <table className="w-full text-left text-[9.5px] border-collapse">
                                  <thead>
                                    <tr className="border-b border-slate-200 bg-slate-100/50 text-slate-500 font-bold">
                                      <th className="py-2 px-3">Semester &amp; Tahun Ajaran</th>
                                      <th className="py-2 px-3 text-center">Status Akademik</th>
                                      <th className="py-2 px-3">Waktu Registrasi</th>
                                      <th className="py-2 px-3">Keterangan</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100 bg-white">
                                    {BIODATA_DATA.status_registrasi.map((reg, idx) => (
                                      <tr key={idx} className="hover:bg-slate-50/50">
                                        <td className="py-2 px-3 font-bold text-slate-800">{reg.semester_tahun_ajaran}</td>
                                        <td className="py-2 px-3 text-center">
                                          <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 font-black font-mono px-2 py-0.5 rounded text-[9px]">
                                            {reg.status_akademik}
                                          </span>
                                        </td>
                                        <td className="py-2 px-3 font-mono text-slate-600">{reg.tanggal_registrasi}</td>
                                        <td className="py-2 px-3 text-slate-700 font-semibold">{reg.keterangan}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>

                            {/* BILLING INFO */}
                            <div className="bg-slate-50/50 border border-slate-200 p-4 rounded-xl space-y-2">
                              <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wider">Tagihan Keuangan &amp; Billing</h4>
                              <div className="overflow-x-auto">
                                <table className="w-full text-left text-[9.5px] border-collapse">
                                  <thead>
                                    <tr className="border-b border-slate-200 bg-slate-100/50 text-slate-500 font-bold">
                                      <th className="py-2 px-3">Semester Tagihan</th>
                                      <th className="py-2 px-3">No Tagihan</th>
                                      <th className="py-2 px-3 text-right">Jumlah Tagihan</th>
                                      <th className="py-2 px-3 text-center">Status Pembayaran</th>
                                      <th className="py-2 px-3 text-center">Bukti</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100 bg-white">
                                    {BIODATA_DATA.info_tagihan.map((bill, idx) => (
                                      <tr key={idx} className="hover:bg-slate-50/50">
                                        <td className="py-2 px-3 font-bold text-slate-800 leading-tight">
                                          {bill.semester_tahun_ajaran}
                                          <div className="text-[8px] text-slate-400 font-medium mt-0.5">Untuk: {bill.pembayaran_utk_tahun_ajaran}</div>
                                        </td>
                                        <td className="py-2 px-3 font-mono text-slate-600">{bill.no_tagihan}</td>
                                        <td className="py-2 px-3 font-mono text-slate-800 font-black text-right">{bill.total_bayar}</td>
                                        <td className="py-2 px-3 text-center">
                                          <span className="bg-emerald-500 text-white font-black px-2 py-0.5 rounded text-[8.5px] shadow-xs">
                                            {bill.status_bayar}
                                          </span>
                                        </td>
                                        <td className="py-2 px-3 text-center">
                                          <a
                                            href={bill.link_download}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#bf4440] hover:underline font-bold"
                                          >
                                            Download PDF
                                          </a>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 5. ORGANISASI & PORTFOLIO */}
                        {biodataSubTab === 'organisasi_portfolio' && (
                          <div className="space-y-6 animate-fade-in text-slate-800">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              
                              {/* BLOCK 1: Riwayat Organisasi & Peran Kepemimpinan */}
                              <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col justify-between">
                                <div className="p-5 space-y-4">
                                  {/* Header */}
                                  <div className="flex items-start gap-3">
                                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600 shrink-0">
                                      <Users size={18} />
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-black text-slate-800 leading-tight">Riwayat Organisasi &amp; Peran Kepemimpinan</h4>
                                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5 leading-normal">
                                        Kontekstualisasi bakat kepemimpinan &amp; kolaborasi
                                      </p>
                                    </div>
                                  </div>

                                  <div className="space-y-4 divide-y divide-slate-100">
                                    {/* Item 1 */}
                                    <div className="pt-0 space-y-2">
                                      <div className="flex justify-between items-start gap-2">
                                        <div>
                                          <h5 className="text-[12.5px] font-black text-slate-900 leading-snug">
                                            Himpunan Mahasiswa Manajemen Komunikasi
                                          </h5>
                                          <p className="text-[11.5px] font-bold text-slate-500 mt-0.5">
                                            Ketua Divisi Kajian Strategis
                                          </p>
                                        </div>
                                        <span className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded text-[8.5px] font-black uppercase tracking-wider shrink-0">
                                          Kepemimpinan Utama
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold">
                                        <span className="flex items-center gap-1">
                                          <Clock size={11} />
                                          2024 - 2025
                                        </span>
                                        <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.2 rounded-xs">
                                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                          Aktif
                                        </span>
                                      </div>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="pt-3 space-y-2">
                                      <div className="flex justify-between items-start gap-2">
                                        <div>
                                          <h5 className="text-[12.5px] font-black text-slate-900 leading-snug">
                                            Unit Debat &amp; Public Speaking Unpad
                                          </h5>
                                          <p className="text-[11.5px] font-bold text-slate-500 mt-0.5">
                                            Anggota Inti
                                          </p>
                                        </div>
                                        <span className="bg-blue-50 text-[#993633] border border-blue-100 px-2 py-0.5 rounded text-[8.5px] font-black uppercase tracking-wider shrink-0">
                                          Kontributor Aktif
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold">
                                        <span className="flex items-center gap-1">
                                          <Clock size={11} />
                                          2023 - 2025
                                        </span>
                                        <span className="flex items-center gap-1 text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.2 rounded-xs">
                                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                          Aktif
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Footer */}
                                <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] text-slate-400 font-bold">
                                  <Info size={12} className="text-slate-400" />
                                  <span>Metode validasi: Verifikasi SK Rektor &amp; Transkrip Aktivitas</span>
                                </div>
                              </div>

                              {/* BLOCK 2: Prestasi & Penghargaan */}
                              <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col justify-between">
                                <div className="p-5 space-y-4">
                                  {/* Header */}
                                  <div className="flex items-start gap-3">
                                    <div className="p-2 bg-amber-50 rounded-lg text-amber-600 shrink-0">
                                      <Trophy size={18} />
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-black text-slate-800 leading-tight">Prestasi &amp; Penghargaan</h4>
                                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5 leading-normal">
                                        Rekor pencapaian kompetitif eksternal dan internal
                                      </p>
                                    </div>
                                  </div>

                                  <div className="space-y-4 divide-y divide-slate-100">
                                    {/* Item 1 */}
                                    <div className="pt-0 space-y-1.5">
                                      <div className="flex justify-between items-start gap-2">
                                        <h5 className="text-[12.5px] font-black text-slate-900 leading-snug">
                                          Juara 2 Lomba Debat Komunikasi Nasional
                                        </h5>
                                        <span className="bg-amber-100 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded text-[8.5px] font-black uppercase tracking-wider shrink-0">
                                          Nasional
                                        </span>
                                      </div>
                                      <p className="text-[11px] font-medium text-slate-600 leading-normal">
                                        Penghargaan bergengsi tingkat nasional di bidang kajian argumentatif komunikasi publik.
                                      </p>
                                      <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
                                        <span className="bg-slate-100 text-slate-700 text-[9px] font-bold px-2 py-0.5 rounded-full border border-slate-200">
                                          FISIP Communication Week
                                        </span>
                                        <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                                          <Calendar size={11} />
                                          2024
                                        </span>
                                      </div>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="pt-3 space-y-1.5">
                                      <div className="flex justify-between items-start gap-2">
                                        <h5 className="text-[12.5px] font-black text-slate-900 leading-snug">
                                          Best Speaker Crisis Simulation Class
                                        </h5>
                                        <span className="bg-slate-100 text-slate-700 border border-slate-200 px-1.5 py-0.5 rounded text-[8.5px] font-black uppercase tracking-wider shrink-0">
                                          Internal
                                        </span>
                                      </div>
                                      <p className="text-[11px] font-medium text-slate-600 leading-normal">
                                        Predikat pembicara terbaik dalam simulasi penanganan krisis PR bagi korporasi skala besar.
                                      </p>
                                      <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
                                        <span className="bg-slate-100 text-slate-700 text-[9px] font-bold px-2 py-0.5 rounded-full border border-slate-200">
                                          Lab Mangkom Unpad
                                        </span>
                                        <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                                          <Calendar size={11} />
                                          2025
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Footer */}
                                <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-bold">
                                  <span>Nilai Indeks Reputasi Prestasi</span>
                                  <span className="text-amber-600 font-black text-sm">A+</span>
                                </div>
                              </div>

                              {/* BLOCK 3: Sertifikasi & Workshop */}
                              <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col justify-between">
                                <div className="p-5 space-y-4">
                                  {/* Header */}
                                  <div className="flex items-start gap-3">
                                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 shrink-0">
                                      <Award size={18} />
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-black text-slate-800 leading-tight">Sertifikasi &amp; Workshop</h4>
                                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5 leading-normal">
                                        Validasi kompetensi teknis dari badan tersertifikasi
                                      </p>
                                    </div>
                                  </div>

                                  <div className="space-y-3">
                                    {/* Item 1 */}
                                    <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:border-slate-200 transition-colors bg-white">
                                      <div className="flex items-center gap-2.5">
                                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                                        <div>
                                          <h5 className="text-[12px] font-black text-slate-900 leading-none">BNSP Public Relations (Muda)</h5>
                                          <p className="text-[10px] text-slate-400 font-semibold mt-1">Asosiasi Humas Indonesia • Valid s.d. 2027</p>
                                        </div>
                                      </div>
                                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[8.5px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider">
                                        Kompeten
                                      </span>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:border-slate-200 transition-colors bg-white">
                                      <div className="flex items-center gap-2.5">
                                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                                        <div>
                                          <h5 className="text-[12px] font-black text-slate-900 leading-none">Crisis Communication Workshop</h5>
                                          <p className="text-[10px] text-slate-400 font-semibold mt-1">Eurasia PR Summit • Issued 2025</p>
                                        </div>
                                      </div>
                                      <span className="bg-blue-50 text-[#993633] border border-blue-100 text-[8.5px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider">
                                        Selesai
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Footer */}
                                <div className="bg-slate-50 px-5 py-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold">
                                  <span className="text-slate-400">Kompetensi Digital ter-link ke LinkedIn</span>
                                  <button className="text-[#bf4440] hover:text-[#993633] flex items-center gap-1 cursor-pointer bg-transparent border-none">
                                    <Plus size={12} strokeWidth={2.5} />
                                    <span>Tambah Baru</span>
                                  </button>
                                </div>
                              </div>

                              {/* BLOCK 4: Riwayat Kerja & Magang */}
                              <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col justify-between">
                                <div className="p-5 space-y-4">
                                  {/* Header */}
                                  <div className="flex items-start gap-3">
                                    <div className="p-2 bg-blue-50 rounded-lg text-[#bf4440] shrink-0">
                                      <Briefcase size={18} />
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-black text-slate-800 leading-tight">Riwayat Kerja &amp; Magang</h4>
                                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5 leading-normal">
                                        Eksposur industri nyata dan implementasi praktis
                                      </p>
                                    </div>
                                  </div>

                                  <div className="space-y-3">
                                    <div className="flex items-start justify-between gap-3">
                                      <div>
                                        <h5 className="text-[13px] font-black text-slate-900 leading-tight">Agensi PR Nasional</h5>
                                        <p className="text-[11.5px] font-semibold text-slate-500 mt-0.5">Strategy &amp; Crisis Management Support</p>
                                      </div>
                                      <span className="bg-blue-50 text-[#993633] border border-blue-100 px-2 py-0.5 rounded text-[8.5px] font-black uppercase tracking-wider shrink-0">
                                        Strategy Intern
                                      </span>
                                    </div>

                                    {/* Duration and Period Box */}
                                    <div className="grid grid-cols-2 gap-4 border-y border-slate-100 py-2.5 text-xs">
                                      <div>
                                        <span className="text-[8.5px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Durasi Magang</span>
                                        <span className="font-bold text-slate-700">4 Bulan Pekerjaan</span>
                                      </div>
                                      <div>
                                        <span className="text-[8.5px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Periode</span>
                                        <span className="font-bold text-slate-700">Sep - Des 2024</span>
                                      </div>
                                    </div>

                                    {/* Bullet achievement box */}
                                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-[11px] font-medium leading-relaxed text-slate-600">
                                      Berhasil menyusun <strong className="text-slate-800">4 Executive Crisis Dossier</strong> untuk BUMN, terverifikasi oleh Mentor Agensi dengan predikat memuaskan.
                                    </div>
                                  </div>
                                </div>

                                {/* Footer */}
                                <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-bold">
                                  <span>SKS Magang Setara:</span>
                                  <span className="text-slate-700 font-black">4 SKS (MMS-302)</span>
                                </div>
                              </div>

                            </div>
                          </div>
                        )}

                      </div>
                    </div>

                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
        </div>

        {/* Right Stack: Kehadiran Radial Progress + New Task Stats + Unfinished Tasks Checklist */}
        {activeTwinSubMenu === 'overview' && (
          <div id="twin-secondary-widgets-stack" className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Card A: Presensi Kehadiran Radial Chart */}
          <div id="attendance-compact-pie-card" className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex items-center justify-between group hover:border-emerald-300 transition-all duration-300">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="p-1 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                  <ClipboardCheck size={13} />
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Presensi Kehadiran</span>
              </div>
              <div className="pt-0.5">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-slate-900 tracking-tight">92%</span>
                  <span className="text-[8.5px] font-bold text-emerald-600 font-mono bg-emerald-50 px-1 py-0.2 rounded">▲ 4%</span>
                </div>
                <p className="text-[9px] font-bold text-slate-500 leading-snug mt-0.5">
                  23 dari 25 sesi kelas dihadiri. Sisa 2 toleransi izin tersedia.
                </p>
              </div>
            </div>

            {/* Radial Pie Chart */}
            <div className="relative w-14 h-14 flex items-center justify-center shrink-0 ml-3">
              <svg className="w-14 h-14 transform -rotate-90">
                <circle cx="28" cy="28" r="21" className="stroke-slate-100" strokeWidth="4.5" fill="transparent" />
                <circle 
                  cx="28" 
                  cy="28" 
                  r="21" 
                  className="stroke-emerald-500" 
                  strokeWidth="4.5" 
                  fill="transparent" 
                  strokeDasharray={131.9} 
                  strokeDashoffset={131.9 - (131.9 * 92) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-[10px] font-black text-slate-800 leading-none">92%</span>
                <span className="text-[6px] font-black text-slate-400 uppercase tracking-tight">Hadir</span>
              </div>
            </div>
          </div>


          {/* Card C: Compact Unfinished Assignments list with check actions */}
<div id="tasks-unfinished-checklist-card" className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex flex-col justify-between hover:border-blue-300 transition-all duration-300 min-h-[220px]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="p-1 bg-blue-50 text-[#bf4440] rounded-lg">
                  <FileText size={13} />
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Tugas Belum Selesai</span>
              </div>
              <span className="text-[8.5px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">Rasio: 76%</span>
            </div>

            {/* Micro Task Checklist Scroller */}
            <div className="flex-1 overflow-y-auto max-h-[140px] my-3 pr-0.5 space-y-2 custom-scrollbar">
              {tasks.map((task) => (
                <div key={task.id} className={`p-2 rounded-lg border transition-all flex items-start gap-2 ${
                  task.completed 
                    ? 'bg-slate-50/50 border-slate-100 text-slate-400' 
                    : 'bg-white border-slate-100 text-slate-700 hover:border-slate-200'
                }`}>
                  <input 
                    type="checkbox" 
                    checked={task.completed} 
                    onChange={() => toggleTaskCompleted(task.id)}
                    className="w-3.5 h-3.5 mt-0.5 rounded border-slate-300 text-[#bf4440] focus:ring-[#bf4440]/20 cursor-pointer"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className={`text-[8.5px] font-black uppercase tracking-tight ${
                        task.type === 'FGD' ? 'text-purple-600' :
                        task.type === 'Presentation' ? 'text-amber-600' :
                        task.type === 'Writing' ? 'text-indigo-600' : 'text-slate-500'
                      }`}>
                        {task.type}
                      </span>
                      <span className={`text-[8px] font-bold ${task.isCritical ? 'text-rose-500 font-extrabold' : 'text-slate-400'}`}>
                        {task.timeLeft}
                      </span>
                    </div>
                    <p className={`text-[10px] font-extrabold leading-tight truncate mt-0.5 ${task.completed ? 'line-through' : 'text-slate-800'}`}>
                      {task.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick access footer */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[8.5px] font-bold text-slate-400">Total Tugas Aktif: {tasks.filter(t=>!t.completed).length}</span>
              <button 
                onClick={() => setView('courses')} 
                className="text-[8.5px] font-black text-[#bf4440] hover:text-[#732926] flex items-center gap-0.5"
              >
                Ke LMS Tugas →
              </button>
            </div>
          </div>




          {/* Card B: Interactive Jadwal Comm Labs Calendar */}
          <div id="jadwal-praktikum-calendar-card" className="bg-white border border-slate-200 p-4.5 rounded-2xl shadow-sm hover:border-blue-300 transition-all duration-300">
            {/* Header: Icon, Title & View Switcher */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#bf4440] shadow-sm shrink-0">
                  <Calendar size={18} className="stroke-[2.5]" />
                </div>
                <h3 className="text-xs font-black text-slate-800 tracking-wider">JADWAL COMM LABS</h3>
              </div>

              {/* View Selector: Today, Week, Month */}
              <div className="bg-slate-50 border border-slate-100 p-0.5 rounded-xl flex items-center">
                {(['today', 'week', 'month'] as const).map((view) => (
                  <button
                    key={view}
                    onClick={() => setCalendarView(view)}
                    className={`text-[8.5px] font-black uppercase px-2 py-1 rounded-lg transition-all cursor-pointer ${
                      calendarView === view
                        ? 'bg-white text-slate-800 shadow-xs border border-slate-200/50'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {view === 'today' ? 'Today' : view === 'week' ? 'Week' : 'Month'}
                  </button>
                ))}
              </div>
            </div>

            {/* Subheader: Current month & active day name */}
            <div className="flex items-center justify-between mb-3.5 px-1">
              <span className="text-[11px] font-black text-slate-800 uppercase tracking-wide">JULI 2026</span>
              <span className="text-[10px] font-black tracking-widest text-[#bf4440] uppercase">{getDayNameIndo(selectedDay)}</span>
            </div>

            {/* Views rendering */}
            {calendarView === 'month' && (
              <>
                {/* Weekdays indicator */}
                <div className="grid grid-cols-7 text-center text-[9.5px] font-black text-slate-400 mb-2">
                  <span>S</span>
                  <span>S</span>
                  <span>R</span>
                  <span>K</span>
                  <span>J</span>
                  <span>S</span>
                  <span>M</span>
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-y-2 gap-x-1.5 text-center text-[11px] font-bold">
                  {/* July 1st is Wednesday, so we add 2 offset cells */}
                  <div className="py-1"></div>
                  <div className="py-1"></div>

                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                    const isSelected = selectedDay === day;
                    const hasEvent = eventDays.includes(day);

                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`py-1.5 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#bf4440] text-white shadow-sm'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="leading-none">{day}</span>
                        {hasEvent ? (
                          <span className={`w-1 h-1 rounded-full mt-0.5 ${isSelected ? 'bg-white' : 'bg-[#bf4440]'}`} />
                        ) : (
                          <span className="w-1 h-1 mt-0.5 bg-transparent" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {calendarView === 'week' && (
              <div className="space-y-4">
                {/* Week row */}
                <div className="grid grid-cols-7 text-center text-[10px] font-black text-slate-400 mb-1">
                  <span>S</span>
                  <span>S</span>
                  <span>R</span>
                  <span>K</span>
                  <span>J</span>
                  <span>S</span>
                  <span>M</span>
                </div>
                <div className="grid grid-cols-7 gap-1 text-[11px] font-bold">
                  {/* Find the week row dynamically for selectedDay */}
                  {(() => {
                    const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
                    const allSlots = [null, null, ...daysInMonth];
                    const idx = allSlots.indexOf(selectedDay);
                    const startIdx = Math.floor(idx / 7) * 7;
                    const weekSlots = allSlots.slice(startIdx, startIdx + 7);

                    return weekSlots.map((day, i) => {
                      if (day === null) return <div key={`empty-${i}`} className="py-1"></div>;
                      const isSelected = selectedDay === day;
                      const hasEvent = eventDays.includes(day);

                      return (
                        <button
                          key={day}
                          onClick={() => setSelectedDay(day)}
                          className={`py-2 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-[#bf4440] text-white shadow-sm'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="leading-none">{day}</span>
                          {hasEvent ? (
                            <span className={`w-1 h-1 rounded-full mt-0.5 ${isSelected ? 'bg-white' : 'bg-[#bf4440]'}`} />
                          ) : (
                            <span className="w-1 h-1 mt-0.5 bg-transparent" />
                          )}
                        </button>
                      );
                    });
                  })()}
                </div>
              </div>
            )}

            {calendarView === 'today' && (
              <div className="py-2">
                {calendarEvents[selectedDay] ? (
                  <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-black text-[#993633] bg-blue-100/50 px-2 py-0.5 rounded font-mono uppercase">PRAKTIKUM AKTIF</span>
                      <span className="text-[8.5px] font-mono font-bold text-slate-500">{calendarEvents[selectedDay].time}</span>
                    </div>
                    <h4 className="text-xs font-black text-slate-800 leading-tight">{calendarEvents[selectedDay].title}</h4>
                    <p className="text-[10px] text-slate-600 font-semibold leading-relaxed">{calendarEvents[selectedDay].desc}</p>
                    <div className="flex items-center gap-1.5 text-[8.5px] font-bold text-slate-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>Lokasi: {calendarEvents[selectedDay].room}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 bg-slate-50/50 border border-dashed border-slate-200 rounded-xl">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tidak Ada Praktikum Terjadwal</p>
                    <p className="text-[9px] text-slate-400 mt-1">Silakan pilih tanggal lain yang memiliki indikator titik</p>
                  </div>
                )}
              </div>
            )}

            {/* Event detail description footer if on month/week views */}
            {calendarView !== 'today' && (
              <div className="mt-3.5 pt-3.5 border-t border-slate-100">
                {calendarEvents[selectedDay] ? (
                  <div className="flex items-start gap-2.5 bg-indigo-50/40 border border-indigo-100/30 p-2.5 rounded-xl">
                    <div className="p-1.5 bg-indigo-500/10 text-indigo-600 rounded-lg shrink-0 mt-0.5">
                      <Sparkles size={12} className="animate-pulse" />
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <span className="text-[8px] font-black text-indigo-700 uppercase tracking-wider">PRAKTIKUM TERJADWAL</span>
                        <span className="text-[8.5px] font-mono font-bold text-slate-500">{calendarEvents[selectedDay].time}</span>
                      </div>
                      <h4 className="text-[11px] font-black text-slate-800 leading-tight truncate">{calendarEvents[selectedDay].title}</h4>
                      <p className="text-[9.5px] text-slate-600 font-medium leading-tight">{calendarEvents[selectedDay].desc}</p>
                      <div className="flex items-center gap-1 mt-1 text-[8.5px] font-semibold text-slate-400">
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span className="truncate">Ruang: {calendarEvents[selectedDay].room}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-2 text-[9px] font-medium text-slate-400 italic">
                    Pilih tanggal bertitik untuk melihat rincian praktikum
                  </div>
                )}
              </div>
            )}
          </div>

        


          {/* Card D: Match Indexes */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:border-indigo-300 transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">Career Match Indexes</h3>
                <p className="text-[10px] text-slate-500 mt-1 max-w-[85%]">Curated alignment scores based on your major and semester performance.</p>
              </div>
              <div className="text-[#bf4440] bg-blue-50 p-1.5 rounded-lg border border-blue-100">
                <Sparkles size={16} />
              </div>
            </div>

            <div className="space-y-4">
              {/* Top Match */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black bg-[#bf4440] text-white px-1.5 py-0.5 rounded-sm">#1</span>
                    <span className="text-sm font-bold text-slate-800">Ahli Strategi Komunikasi</span>
                  </div>
                  <span className="text-lg font-black text-[#993633]">92%</span>
                </div>
                <div className="w-full bg-blue-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#732926] h-full rounded-full" style={{ width: '92%' }}></div>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={10} className="text-emerald-600 fill-emerald-600" />
                  <span className="text-[9px] font-bold text-emerald-600">Highest Compatibility</span>
                </div>
              </div>

              {/* Grid for #2 to #5 */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-[18px] pt-2.5">
                {/* #2 */}
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-1.5">
                      <span className="text-[9px] font-bold text-slate-500 mt-0.5">#2</span>
                      <span className="text-[10px] font-bold text-slate-800 leading-tight">Spesialis Hubungan<br/>Masyarakat</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-700">78%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#bf4440] h-full rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                {/* #3 */}
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-1.5">
                      <span className="text-[9px] font-bold text-slate-500 mt-0.5">#3</span>
                      <span className="text-[10px] font-bold text-slate-800 leading-tight">Analis Media Massa</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-700">78%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#bf4440] h-full rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>

                {/* #4 */}
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-1.5">
                      <span className="text-[9px] font-bold text-slate-500 mt-0.5">#4</span>
                      <span className="text-[10px] font-bold text-slate-800 leading-tight">Spesialis Komunikasi<br/>Internal</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-700">65%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-400 h-full rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>

                {/* #5 */}
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-1.5">
                      <span className="text-[9px] font-bold text-slate-500 mt-0.5">#5</span>
                      <span className="text-[10px] font-bold text-slate-800 leading-tight">Analis Riset<br/>Konsumen</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-700">55%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-300 h-full rounded-full" style={{ width: '55%' }}></div>
                  </div>
                </div>
              </div>

              {/* Bottom Button */}
              <button className="w-full mt-4 py-2.5 bg-indigo-50/50 hover:bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-lg border border-indigo-100/50 transition-colors flex items-center justify-center gap-1.5">
                Explore Detailed Skill Requirements <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>
        )}
{/* SECTION: REKAP NILAI (REPLACES HISTORY ASSIGNMENTS IN LEARNING PROFILE) */}
          {activeTwinSubMenu === 'learning' && (
            <div className="lg:col-span-12 mt-4 space-y-6 w-full animate-fade-in">
              {/* Semester Filter Selector */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono">Filter Rekap Akademik</h3>
                  <p className="text-sm font-bold text-slate-800">Pilih semester untuk melihat rincian nilai UTS, UAS, Tugas, dan IPK</p>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none shrink-0">
                  {[
                    { id: 'all', label: 'All Semesters' },
                    { id: '1', label: 'Sem I' },
                    { id: '2', label: 'Sem II' },
                    { id: '3', label: 'Sem III' },
                    { id: '4', label: 'Sem IV' },
                    { id: '5', label: 'Sem V' },
                    { id: '6', label: 'Sem VI' }
                  ].map((sem) => {
                    const isSelected = selectedSemesterFilter === sem.id;
                    return (
                      <button
                        key={sem.id}
                        onClick={() => setSelectedSemesterFilter(sem.id)}
                        className={`px-3.5 py-1.5 rounded-xl border font-bold text-[10.5px] transition-all cursor-pointer whitespace-nowrap ${
                          isSelected
                            ? "bg-[#732926] border-[#732926] text-white shadow-sm"
                            : "bg-white hover:bg-slate-50 border-slate-200 text-slate-600"
                        }`}
                      >
                        {sem.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 1. TOP TABLE: Exam Grade Summary (Rekap Nilai) */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                      <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-3.5 bg-[#bf4440] rounded-xs"></span>
                        Exam Grade Summary (Rekap Nilai)
                      </h3>
                      <button
                        onClick={() => handleExportCSV(selectedSemesterFilter)}
                        className="flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 text-slate-700 hover:text-[#bf4440] font-extrabold text-[9px] rounded-lg shadow-xs transition-all cursor-pointer uppercase tracking-wider font-mono"
                      >
                        <Download size={10} />
                        EXPORT CSV
                      </button>
                    </div>

                    <div className="max-h-[300px] overflow-y-auto overflow-x-auto custom-scrollbar pr-1">
                      <table className="w-full text-left border-collapse min-w-[400px]">
                        <thead className="sticky top-0 bg-white z-10">
                          <tr className="border-b border-slate-150 bg-slate-50/70">
                            <th className="py-2.5 px-3 text-[10px] font-black text-slate-500 uppercase tracking-wider font-mono">MATA KULIAH</th>
                            <th className="py-2.5 px-3 text-[10px] font-black text-slate-500 uppercase tracking-wider font-mono text-center">UTS (30%)</th>
                            <th className="py-2.5 px-3 text-[10px] font-black text-slate-500 uppercase tracking-wider font-mono text-center">UAS (40%)</th>
                            <th className="py-2.5 px-3 text-[10px] font-black text-slate-500 uppercase tracking-wider font-mono text-center">TUGAS (30%)</th>
                            <th className="py-2.5 px-3 text-[10px] font-black text-slate-500 uppercase tracking-wider font-mono text-center">GRADE</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {(() => {
                            let coursesToRender: any[] = [];
                            if (selectedSemesterFilter === 'all') {
                              Object.values(SEMESTER_REPORTS).forEach(report => {
                                coursesToRender = [...coursesToRender, ...report.courses];
                              });
                            } else {
                              const report = SEMESTER_REPORTS[selectedSemesterFilter];
                              if (report) {
                                coursesToRender = report.courses;
                              }
                            }

                            if (coursesToRender.length === 0) {
                              return (
                                <tr>
                                  <td colSpan={5} className="py-6 text-center text-slate-400 font-medium text-[11px]">
                                    Tidak ada data nilai tersedia.
                                  </td>
                                </tr>
                              );
                            }

                            return coursesToRender.map((c, idx) => (
                              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                <td className="py-3 px-3 text-[11px] font-bold text-slate-800 leading-tight">{c.courseName}</td>
                                <td className="py-3 px-3 text-[11px] font-mono font-bold text-slate-700 text-center">{c.uts}</td>
                                <td className="py-3 px-3 text-[11px] font-mono font-bold text-slate-700 text-center">{c.uas}</td>
                                <td className="py-3 px-3 text-[11px] font-mono font-bold text-slate-700 text-center">{c.tugas}</td>
                                <td className="py-3 px-3 text-center">
                                  <span className={`inline-block text-[9px] font-black uppercase px-2 py-0.5 rounded font-mono border ${
                                    c.grade.startsWith('A') 
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                                      : c.grade.startsWith('B') 
                                        ? "bg-blue-50 text-[#993633] border-blue-200" 
                                        : "bg-amber-50 text-amber-700 border-amber-200"
                                  }`}>
                                    {c.grade}
                                  </span>
                                </td>
                              </tr>
                            ));
                          })()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* 2. BOTTOM TABLE: Semester Grade Report */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                      <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-1.5 h-3.5 bg-[#bf4440] rounded-xs"></span>
                        {selectedSemesterFilter === 'all' ? 'Overall Grade Report' : `${SEMESTER_REPORTS[selectedSemesterFilter]?.semesterLabel} Grade Report`}
                      </h3>
                      <button
                        onClick={() => handleExportPDF(selectedSemesterFilter)}
                        className="flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 text-slate-700 hover:text-[#bf4440] font-extrabold text-[9px] rounded-lg shadow-xs transition-all cursor-pointer uppercase tracking-wider font-mono"
                      >
                        <Download size={10} />
                        EXPORT PDF
                      </button>
                    </div>

                    <div className="max-h-[300px] overflow-y-auto overflow-x-auto custom-scrollbar pr-1 mb-2">
                      <table className="w-full text-left border-collapse min-w-[400px]">
                        <thead className="sticky top-0 bg-white z-10">
                          <tr className="border-b border-slate-150 bg-slate-50/70">
                            <th className="py-2.5 px-3 text-[10px] font-black text-slate-500 uppercase tracking-wider font-mono">COURSE NAME</th>
                            <th className="py-2.5 px-3 text-[10px] font-black text-slate-500 uppercase tracking-wider font-mono text-center">CREDITS</th>
                            <th className="py-2.5 px-3 text-[10px] font-black text-slate-500 uppercase tracking-wider font-mono text-center">GRADE</th>
                            <th className="py-2.5 px-3 text-[10px] font-black text-slate-500 uppercase tracking-wider font-mono text-right">POINTS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {(() => {
                            let coursesToRender: any[] = [];
                            if (selectedSemesterFilter === 'all') {
                              Object.values(SEMESTER_REPORTS).forEach(report => {
                                coursesToRender = [...coursesToRender, ...report.courses];
                              });
                            } else {
                              const report = SEMESTER_REPORTS[selectedSemesterFilter];
                              if (report) {
                                coursesToRender = report.courses;
                              }
                            }

                            if (coursesToRender.length === 0) {
                              return (
                                <tr>
                                  <td colSpan={4} className="py-6 text-center text-slate-400 font-medium text-[11px]">
                                    Tidak ada data nilai tersedia.
                                  </td>
                                </tr>
                              );
                            }

                            return coursesToRender.map((c, idx) => (
                              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                <td className="py-3 px-3 text-[11px] font-bold text-slate-800 leading-tight">{c.courseName}</td>
                                <td className="py-3 px-3 text-[11px] font-bold text-slate-700 font-mono text-center">{c.sks} SKS</td>
                                <td className="py-3 px-3 text-center">
                                  <span className={`inline-block text-[9px] font-black uppercase px-2 py-0.5 rounded font-mono border ${
                                    c.grade.startsWith('A') 
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                                      : c.grade.startsWith('B') 
                                        ? "bg-blue-50 text-[#993633] border-blue-200" 
                                        : "bg-amber-50 text-amber-700 border-amber-200"
                                  }`}>
                                    {c.grade}
                                  </span>
                                </td>
                                <td className="py-3 px-3 text-[11px] font-mono font-bold text-slate-700 text-right">{c.points.toFixed(1)}</td>
                              </tr>
                            ));
                          })()}
                        </tbody>
                      </table>
                    </div>

                    {/* TOTALS FOOTER ROW */}
                    <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between text-[11px] font-black text-slate-800 font-mono gap-2">
                      <span className="uppercase tracking-wider font-sans">Semester Totals</span>
                      <div className="flex items-center gap-6">
                        <span>
                          {selectedSemesterFilter === 'all' 
                            ? "95 SKS" 
                            : `${SEMESTER_REPORTS[selectedSemesterFilter]?.totalSks || 0} SKS`
                          }
                        </span>
                        <span className="text-[#732926]">
                          {selectedSemesterFilter === 'all'
                            ? "IPK: 3.67"
                            : `IPS: ${(SEMESTER_REPORTS[selectedSemesterFilter]?.ips || 0).toFixed(2)}`
                          }
                        </span>
                        <span className="text-slate-600">
                          {selectedSemesterFilter === 'all'
                            ? "348.8 Points"
                            : `${(SEMESTER_REPORTS[selectedSemesterFilter]?.totalPoints || 0).toFixed(1)}`
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      {/* Jadwal Kuliah Popup Modal */}
      <AnimatePresence>
        {isScheduleOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsScheduleOpen(false)}
              className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs"
            />
            
            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#bf4440] shadow-xs animate-pulse">
                    <Clock size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Jadwal Kuliah Semester Ini</h3>
                    <p className="text-[9px] text-slate-400 font-bold">{BIODATA_DATA.jadwal_kuliah.semester}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsScheduleOpen(false)}
                  className="w-6 h-6 rounded-full border border-slate-200 hover:border-slate-300 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors font-bold text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 overflow-y-auto max-h-[55vh] scrollbar-thin">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[10px] border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-100/50 text-slate-500 font-bold">
                        <th className="py-2 px-2">Hari</th>
                        <th className="py-2 px-2">Waktu</th>
                        <th className="py-2 px-3">Mata Kuliah</th>
                        <th className="py-2 px-2 text-center">SKS</th>
                        <th className="py-2 px-2">Ruang</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
                      {BIODATA_DATA.jadwal_kuliah.daftar.map((sched, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-2 font-bold text-slate-800">{sched.hari}</td>
                          <td className="py-3 px-2 font-mono text-slate-500 text-[9px]">{sched.waktu}</td>
                          <td className="py-3 px-3 font-bold text-slate-800 leading-tight">
                            <div className="flex flex-col">
                              <span>{sched.mata_kuliah}</span>
                              <span className="text-[8px] text-slate-400 font-mono font-normal mt-0.5">{sched.sandi} • Kelas {sched.kelas}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-center font-black">{sched.sks}</td>
                          <td className="py-3 px-2 font-mono text-[9px] text-slate-500">{sched.ruang}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-3 border-t border-slate-100 bg-slate-50/50 flex justify-end">
                <button 
                  onClick={() => setIsScheduleOpen(false)}
                  className="px-4 py-1.5 bg-slate-800 hover:bg-slate-950 text-white font-bold text-[10px] rounded-lg transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
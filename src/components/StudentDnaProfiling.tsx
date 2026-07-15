import { useState } from 'react';
import { BentoCard } from './BentoCard';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { 
  Sparkles, FileText, CheckCircle2, AlertCircle, Target, AlertTriangle, 
  Layers, Check, X, Info, GraduationCap, ChevronRight, Briefcase, 
  TrendingUp, Users, Award, Zap, Heart, Compass, ClipboardList, BookOpen, Clock, ClipboardCheck
} from 'lucide-react';

// Flexible JSON data source for Student Holistic Profiles
export const learning = {
  document_type: "student_holistic_profiles",
  generated_by: "AKSARA IQ - AI Assessment Engine",
  generated_at: "2026-06-24",
  context: {
    curriculum_id: "CUR-UNPAD-MANKOM-2020",
    program_name: "Manajemen Komunikasi",
    faculty: "Fakultas Ilmu Komunikasi",
    institution_name: "Universitas Padjadjaran",
    linked_fgd_session: "FGD-2026-0623-MANKOM-A",
    current_semester: 6,
    grade_scale: {
      "A": 4.0,
      "A-": 3.7,
      "B+": 3.3,
      "B": 3.0,
      "B-": 2.7,
      "C+": 2.3,
      "C": 2.0
    },
    graduate_profiles: {
      "P1": "Ahli Strategi Komunikasi (Communication Strategist)",
      "P2": "Ahli Komunikasi Pemasaran (Marketing Communication Specialist)",
      "P3": "Ahli Pengembangan Komunikasi SDM (HR Communication Development Specialist)"
    },
    competency_radar_axes: [
      "Critical Thinking",
      "Teori Komunikasi Strategis",
      "Communication Skill",
      "Collaboration / Teamwork",
      "Research & Data",
      "Leadership"
    ],
    passion_inference_note: "Data passion tidak berasal dari survei minat eksplisit; diinferensikan (terinferensi) dari lensa argumen pada FGD, pilihan organisasi & magang, serta mata kuliah terkuat. Skor keselarasan (alignment) membandingkan passion terinferensi dengan kompetensi aktual; gap menjadi basis self_development_plan.",
    fit_bands: [
      { "label": "Perlu Dijembatani", "min": 0, "max": 64 },
      { "label": "Sebagian Selaras", "min": 65, "max": 79 },
      { "label": "Selaras", "min": 80, "max": 89 },
      { "label": "Sangat Selaras", "min": 90, "max": 100 }
    ]
  },
  students: [
    {
      "student_id": "2254100011",
      "name": "John Tosh",
      "nim": "2254100011",
      "semester": 6,
      "academic_core": {
        "gpa": 3.72,
        "gpa_band": "Cumlaude",
        "class_rank_percentile": 95,
        "gpa_trend": [
          { "semester": 1, "gpa": 3.55 },
          { "semester": 2, "gpa": 3.62 },
          { "semester": 3, "gpa": 3.7 },
          { "semester": 4, "gpa": 3.74 },
          { "semester": 5, "gpa": 3.78 }
        ],
        "strongest_courses": [
          { "course": "Strategi Komunikasi Persuasif", "grade": "A", "score": 91, "mapped_cpl": ["CPL-KK-05"] },
          { "course": "Komunikasi Organisasional dan Keterampilan Manajerial", "grade": "A", "score": 90, "mapped_cpl": ["CPL-PP-01"] },
          { "course": "Teori Komunikasi", "grade": "A", "score": 89, "mapped_cpl": ["CPL-PP-01"] },
          { "course": "Public Speaking", "grade": "A-", "score": 87, "mapped_cpl": ["CPL-KK-02"] }
        ],
        "weakest_courses": [
          { "course": "Statistika Terapan", "grade": "B", "score": 74, "mapped_cpl": ["CPL-PP-01"] },
          { "course": "Manajemen Komunikasi Visual", "grade": "B+", "score": 79, "mapped_cpl": ["CPL-KK-05"] }
        ],
        "exam_history": [
          { "course": "Analysis of Strategic Communication Issues", "uts": 88, "uas": 90, "tugas": 92, "final_score": 90, "grade": "A" },
          { "course": "Komunikasi Organisasional dan Keterampilan Manajerial", "uts": 89, "uas": 91, "tugas": 90, "final_score": 90, "grade": "A" },
          { "course": "Statistika Terapan", "uts": 70, "uas": 75, "tugas": 78, "final_score": 74, "grade": "B" }
        ],
        "documents": {
          "transcript": "https://drive.google.com/file/d/19AN4bH5PJzgCq5-H3xMgm5OqYfNHAjUt/view?usp=sharing",
          "skpi": "https://drive.google.com/file/d/1DmiJ3qw-i74RWZqejQz9BA39Tg9GoMhX/view?usp=sharing",
          "attendance": "https://drive.google.com/file/d/1DKmisFqgdtH3QHq-gSQQXP9CwsbXwQKb/view?usp=sharing"
        }
      },
      "aggregate_competency": {
        "cpl_attainment": [
          { "cpl_id": "CPL-KK-01", "label": "Berpikir tingkat tinggi", "cumulative_pct": 90, "level": "Sangat Baik" },
          { "cpl_id": "CPL-PP-01", "label": "Teori & riset komunikasi strategis", "cumulative_pct": 89, "level": "Sangat Baik" },
          { "cpl_id": "CPL-KK-02", "label": "Public speaking & menyimak", "cumulative_pct": 85, "level": "Sangat Baik" },
          { "cpl_id": "CPL-KK-05", "label": "Merancang & mengevaluasi strategi", "cumulative_pct": 88, "level": "Sangat Baik" },
          { "cpl_id": "CPL-KU-05", "label": "Kolaborasi", "cumulative_pct": 84, "level": "Baik" }
        ],
        "radar": {
          "Critical Thinking": 90,
          "Teori Komunikasi Strategis": 91,
          "Communication Skill": 84,
          "Collaboration / Teamwork": 85,
          "Research & Data": 74,
          "Leadership": 88
        }
      },
      "non_academic": {
        "organizations": [
          { "name": "Himpunan Mahasiswa Manajemen Komunikasi", "role": "Ketua Divisi Kajian Strategis", "period": "2024-2025", "is_leadership": true },
          { "name": "Unit Debat & Public Speaking Unpad", "role": "Anggota inti", "period": "2023-2025", "is_leadership": false }
        ],
        "leadership_score": 88,
        "achievements": [
          { "title": "Juara 2 Lomba Debat Komunikasi Nasional", "year": 2024, "level": "Nasional" },
          { "title": "Best Speaker Crisis Simulation Class", "year": 2025, "level": "Internal" }
        ],
        "certifications": [
          "BNSP Public Relations (Muda)",
          "Crisis Communication Workshop"
        ],
        "internship": {
          "organization": "Agensi PR Nasional",
          "role": "Strategy Intern",
          "duration_months": 4
        },
        "portfolio_items": 6
      },
      "career_readiness": {
        "best_fit_profile": "P1",
        "profile_match": [
          { "profile": "P1", "match_pct": 92 },
          { "profile": "P3", "match_pct": 78 },
          { "profile": "P2", "match_pct": 70 }
        ],
        "engagement": {
          "attendance_pct": 96,
          "class_activeness": "tinggi"
        },
        "development_recommendations": [
          "Perkuat kompetensi analitik data (Statistika/Riset) untuk melengkapi profil strategist.",
          "Latih peran fasilitator agar kepemimpinan tidak menjadi dominasi."
        ]
      },
      "fgd_summary": {
        "session_id": "FGD-2026-0623-MANKOM-A",
        "weighted_score": 82,
        "band": "Baik",
        "rank_in_group": 1,
        "top_indicators": [
          "Analytical Reasoning",
          "Argumentation",
          "Synthesis"
        ]
      },
      "passion_competency_fit": {
        "inferred_passions": [
          {
            "area": "Komunikasi Krisis & Manajemen Isu Strategis",
            "basis": "Dominasi & kedalaman teori pada FGD krisis PT KAI (SCCT, image restoration); nilai A pada Strategi Komunikasi Persuasif & Komunikasi Organisasional."
          },
          {
            "area": "Kepemimpinan & Public Speaking / Debat",
            "basis": "Ketua Divisi Kajian Strategis Himpunan; anggota inti Unit Debat; Juara 2 Debat Komunikasi Nasional."
          }
        ],
        "alignment": [
          {
            "passion": "Komunikasi Krisis & Manajemen Isu Strategis",
            "supporting_competencies": [
              "Teori Komunikasi Strategis (91)",
              "Critical Thinking (90)",
              "Leadership (88)"
            ],
            "competency_gaps": [
              "Research & Data (74)"
            ],
            "alignment_score": 90,
            "verdict": "Sangat Selaras"
          },
          {
            "passion": "Kepemimpinan & Public Speaking / Debat",
            "supporting_competencies": [
              "Leadership (88)",
              "Communication Skill (84)",
              "Collaboration (85)"
            ],
            "competency_gaps": [
              "Keterampilan fasilitasi (mengurangi dominasi floor 47%)"
            ],
            "alignment_score": 85,
            "verdict": "Selaras"
          }
        ],
        "overall_fit_score": 88,
        "fit_band": "Selaras",
        "summary": "Passion utama (komunikasi krisis & kepemimpinan) sangat didukung kompetensi terkuatnya. Satu-satunya penghambat scaling adalah kompetensi analitik data dan kecenderungan mendominasi diskusi."
      },
      "self_development_plan": {
        "priority_focus": "Melengkapi profil strategist dengan literasi data & keterampilan fasilitasi.",
        "horizon": [
          {
            "term": "Jangka Pendek (semester berjalan)",
            "goals": [
              {
                "area": "Analitik Data",
                "action": "Optimalkan nilai Statistika/Riset & ikuti kursus data analysis untuk komunikasi.",
                "rationale": "Gap Research & Data (74) menahan kelengkapan profil strategist.",
                "resource": "Riset Kuantitatif/Kualitatif Manajemen Komunikasi; kursus Data Analysis for Communication",
                "target_indicator": "Research & Data >= 80"
              },
              {
                "area": "Fasilitasi Diskusi",
                "action": "Ambil peran moderator/fasilitator pada diskusi kelas untuk menarik kontribusi rekan.",
                "rationale": "Dominasi floor 47% berisiko menekan partisipasi lain.",
                "resource": "Praktik FGD/seminar kelas",
                "target_indicator": "Porsi bicara lebih merata; skor kolaborasi naik"
              }
            ]
          },
          {
            "term": "Jangka Menengah (1-2 semester)",
            "goals": [
              {
                "area": "Spesialisasi Krisis",
                "action": "Sertifikasi crisis communication lanjutan & magang di tim PR/crisis.",
                "rationale": "Mengonversi minat menjadi kredensial profesional.",
                "resource": "Workshop/sertifikasi crisis comm; program magang",
                "target_indicator": "1 sertifikasi + 1 pengalaman magang relevan"
              }
            ]
          },
          {
            "term": "Jangka Panjang (menuju kelulusan)",
            "goals": [
              {
                "area": "Portofolio Konsultan Strategi",
                "action": "Bangun portofolio studi kasus strategi komunikasi (P1 Communication Strategist).",
                "rationale": "Selaras dengan best-fit profile P1 (92%).",
                "resource": "Skripsi/Job Training bertema komunikasi strategis",
                "target_indicator": "Portofolio konsultasi strategi siap untuk rekrutmen"
              }
            ]
          }
        ]
      }
    },
    {
      "student_id": "225410073",
      "name": "Adinda",
      "nim": "225410073",
      "semester": 6,
      "academic_core": {
        "gpa": 3.58,
        "gpa_band": "Cumlaude",
        "class_rank_percentile": 85,
        "gpa_trend": [
          { "semester": 1, "gpa": 3.45 },
          { "semester": 2, "gpa": 3.5 },
          { "semester": 3, "gpa": 3.55 },
          { "semester": 4, "gpa": 3.6 },
          { "semester": 5, "gpa": 3.62 }
        ],
        "strongest_courses": [
          { "course": "Perencanaan Komunikasi", "grade": "A", "score": 90, "mapped_cpl": ["CPL-KK-05"] },
          { "course": "Komunikasi Organisasional dan Keterampilan Manajerial", "grade": "A-", "score": 87, "mapped_cpl": ["CPL-PP-01"] },
          { "course": "Evaluasi Program Komunikasi", "grade": "A-", "score": 86, "mapped_cpl": ["CPL-KK-05"] },
          { "course": "Public Speaking", "grade": "A-", "score": 85, "mapped_cpl": ["CPL-KK-02"] }
        ],
        "weakest_courses": [
          { "course": "Statistika Terapan", "grade": "B", "score": 73, "mapped_cpl": ["CPL-PP-01"] },
          { "course": "Komunikasi Bisnis", "grade": "B+", "score": 80, "mapped_cpl": ["CPL-PP-01"] }
        ],
        "exam_history": [
          { "course": "Analysis of Strategic Communication Issues", "uts": 82, "uas": 85, "tugas": 86, "final_score": 84, "grade": "A-" },
          { "course": "Perencanaan Komunikasi", "uts": 88, "uas": 90, "tugas": 91, "final_score": 90, "grade": "A" },
          { "course": "Statistika Terapan", "uts": 70, "uas": 73, "tugas": 76, "final_score": 73, "grade": "B" }
        ],
        "documents": {
          "transcript": "https://drive.google.com/file/d/14O_kO3lelIXN5zzYJxCoHqMuwgA9cjnR/view?usp=sharing",
          "skpi": "https://drive.google.com/file/d/1pq_y3DNi7Z7m88NtFWVRnbYukOUPINSF/view?usp=sharing",
          "attendance": "https://drive.google.com/file/d/1cf6Ox5ws4DKdto9vp7TILRVU-gOCxKSw/view?usp=sharing"
        }
      },
      "aggregate_competency": {
        "cpl_attainment": [
          { "cpl_id": "CPL-KK-01", "label": "Berpikir tingkat tinggi", "cumulative_pct": 80, "level": "Baik" },
          { "cpl_id": "CPL-PP-01", "label": "Teori & riset komunikasi strategis", "cumulative_pct": 82, "level": "Baik" },
          { "cpl_id": "CPL-KK-02", "label": "Public speaking & menyimak", "cumulative_pct": 84, "level": "Baik" },
          { "cpl_id": "CPL-KK-05", "label": "Merancang & mengevaluasi strategi", "cumulative_pct": 87, "level": "Sangat Baik" },
          { "cpl_id": "CPL-KU-05", "label": "Kolaborasi", "cumulative_pct": 82, "level": "Baik" }
        ],
        "radar": {
          "Critical Thinking": 79,
          "Teori Komunikasi Strategis": 82,
          "Communication Skill": 84,
          "Collaboration / Teamwork": 82,
          "Research & Data": 73,
          "Leadership": 75
        }
      },
      "non_academic": {
        "organizations": [
          { "name": "Himpunan Mahasiswa Manajemen Komunikasi", "role": "Sekretaris Umum", "period": "2024-2025", "is_leadership": true },
          { "name": "Komunitas Volunteer Sosial Kampus", "role": "Koordinator Acara", "period": "2023-2024", "is_leadership": true }
        ],
        "leadership_score": 80,
        "achievements": [
          { "title": "Best Event Coordinator Pekan Komunikasi", "year": 2024, "level": "Internal" }
        ],
        "certifications": [
          "Project Management Dasar",
          "Public Relations Workshop"
        ],
        "internship": {
          "organization": "Divisi Humas Pemerintah Daerah",
          "role": "Communication Planning Intern",
          "duration_months": 3
        },
        "portfolio_items": 4
      },
      "career_readiness": {
        "best_fit_profile": "P1",
        "profile_match": [
          { "profile": "P1", "match_pct": 85 },
          { "profile": "P3", "match_pct": 82 },
          { "profile": "P2", "match_pct": 68 }
        ],
        "engagement": {
          "attendance_pct": 94,
          "class_activeness": "sedang-tinggi"
        },
        "development_recommendations": [
          "Perkuat rujukan teori eksplisit untuk menaikkan kedalaman analisis.",
          "Ambil peran sintesis/penyimpulan dalam diskusi kelompok."
        ]
      },
      "fgd_summary": {
        "session_id": "FGD-2026-0623-MANKOM-A",
        "weighted_score": 72,
        "band": "Baik",
        "rank_in_group": 2,
        "top_indicators": [
          "Communication",
          "Argumentation",
          "Persuasion & Negotiation"
        ]
      },
      "passion_competency_fit": {
        "inferred_passions": [
          {
            "area": "Public Relations & Pemulihan Kepercayaan Publik",
            "basis": "Fokus FGD pada kepercayaan publik & kampanye pemulihan; nilai A Perencanaan Komunikasi, A- Evaluasi Program."
          },
          {
            "area": "Perencanaan Program & Manajemen Acara",
            "basis": "Sekretaris Umum Himpunan; Koordinator Acara; magang Communication Planning di Humas Pemda."
          }
        ],
        "alignment": [
          {
            "passion": "Public Relations & Pemulihan Kepercayaan Publik",
            "supporting_competencies": [
              "Communication Skill (84)",
              "Merancang & mengevaluasi strategi (87)"
            ],
            "competency_gaps": [
              "Teori Komunikasi Strategis (82)",
              "Research & Data (73)"
            ],
            "alignment_score": 83,
            "verdict": "Selaras"
          },
          {
            "passion": "Perencanaan Program & Manajemen Acara",
            "supporting_competencies": [
              "Leadership (75)",
              "Perencanaan Komunikasi (A)"
            ],
            "competency_gaps": [
              "Analitik evaluasi program berbasis data"
            ],
            "alignment_score": 80,
            "verdict": "Selaras"
          }
        ],
        "overall_fit_score": 81,
        "fit_band": "Selaras",
        "summary": "Passion PR & perencanaan program konsisten dengan kekuatan perencanaan-evaluasi dan peran organisasinya. Penguatan kedalaman teori dan analitik data akan menaikkan kualitas keputusan PR."
      },
      "self_development_plan": {
        "priority_focus": "Memperdalam fondasi teori PR dan kemampuan evaluasi berbasis data.",
        "horizon": [
          {
            "term": "Jangka Pendek (semester berjalan)",
            "goals": [
              {
                "area": "Kedalaman Teori",
                "action": "Tautkan analisis ke kerangka teori (SCCT, tahap respon krisis) secara eksplisit.",
                "rationale": "Gap Teori (82) - analisis masih kurang berlapis.",
                "resource": "Teori Komunikasi; literatur PR/crisis",
                "target_indicator": "Teori Komunikasi Strategis >= 85"
              },
              {
                "area": "Peran Sintesis",
                "action": "Latih merangkum/menyimpulkan diskusi kelompok.",
                "rationale": "Skor Synthesis pada FGD masih cukup.",
                "resource": "Praktik diskusi kelas",
                "target_indicator": "Mampu memimpin penyimpulan diskusi"
              }
            ]
          },
          {
            "term": "Jangka Menengah (1-2 semester)",
            "goals": [
              {
                "area": "Evaluasi Berbasis Data",
                "action": "Pelajari analitik evaluasi program & metrik PR.",
                "rationale": "Gap Research & Data (73).",
                "resource": "Evaluasi Program Komunikasi; kursus analytics; sertifikasi PR",
                "target_indicator": "Research & Data >= 80 + 1 sertifikasi PR"
              }
            ]
          },
          {
            "term": "Jangka Panjang (menuju kelulusan)",
            "goals": [
              {
                "area": "Jalur PR Strategist",
                "action": "Arahkan magang & skripsi ke PR/corporate communication.",
                "rationale": "Best-fit P1 (85%), P3 (82%) berdekatan.",
                "resource": "Job Training PR/Humas korporat",
                "target_indicator": "Pengalaman PR strategis terdokumentasi"
              }
            ]
          }
        ]
      }
    },
    {
      "student_id": "225410016",
      "name": "Fatima",
      "nim": "225410016",
      "semester": 6,
      "academic_core": {
        "gpa": 3.55,
        "gpa_band": "Cumlaude",
        "class_rank_percentile": 82,
        "gpa_trend": [
          { "semester": 1, "gpa": 3.48 },
          { "semester": 2, "gpa": 3.52 },
          { "semester": 3, "gpa": 3.54 },
          { "semester": 4, "gpa": 3.56 },
          { "semester": 5, "gpa": 3.58 }
        ],
        "strongest_courses": [
          { "course": "Komunikasi Multikultural", "grade": "A", "score": 90, "mapped_cpl": ["CPL-KK-03"] },
          { "course": "Manajemen Kampanye Sosial", "grade": "A", "score": 89, "mapped_cpl": ["CPL-KK-05"] },
          { "course": "Psikologi Komunikasi", "grade": "A-", "score": 86, "mapped_cpl": ["CPL-PP-01"] },
          { "course": "Strategic Writing", "grade": "A-", "score": 85, "mapped_cpl": ["CPL-KK-02"] }
        ],
        "weakest_courses": [
          { "course": "Statistika Terapan", "grade": "B", "score": 72, "mapped_cpl": ["CPL-PP-01"] },
          { "course": "Riset Kuantitatif Manajemen Komunikasi", "grade": "B+", "score": 80, "mapped_cpl": ["CPL-PP-01"] }
        ],
        "exam_history": [
          { "course": "Analysis of Strategic Communication Issues", "uts": 80, "uas": 83, "tugas": 85, "final_score": 83, "grade": "A-" },
          { "course": "Komunikasi Multikultural", "uts": 89, "uas": 90, "tugas": 91, "final_score": 90, "grade": "A" },
          { "course": "Statistika Terapan", "uts": 68, "uas": 72, "tugas": 75, "final_score": 72, "grade": "B" }
        ],
        "documents": {
          "transcript": "https://drive.google.com/file/d/1uDgsZev1l7FUcWVom1GbmxVSDL4j0nTH/view?usp=sharing",
          "skpi": "https://drive.google.com/file/d/1kBUbKIjpobUA2wKAgkcMXFnQBJ81Y6DF/view?usp=sharing",
          "attendance": "https://drive.google.com/file/d/1YfxocWnS7RhaPkt_l5YerVyttxcy-JSj/view?usp=sharing"
        }
      },
      "aggregate_competency": {
        "cpl_attainment": [
          { "cpl_id": "CPL-KK-01", "label": "Berpikir tingkat tinggi", "cumulative_pct": 80, "level": "Baik" },
          { "cpl_id": "CPL-PP-01", "label": "Teori & riset komunikasi strategis", "cumulative_pct": 81, "level": "Baik" },
          { "cpl_id": "CPL-KK-02", "label": "Public speaking & menyimak", "cumulative_pct": 83, "level": "Baik" },
          { "cpl_id": "CPL-KK-03", "label": "Analisis situasi & kolaborasi", "cumulative_pct": 85, "level": "Sangat Baik" },
          { "cpl_id": "CPL-KU-05", "label": "Kolaborasi", "cumulative_pct": 83, "level": "Baik" }
        ],
        "radar": {
          "Critical Thinking": 79,
          "Teori Komunikasi Strategis": 81,
          "Communication Skill": 83,
          "Collaboration / Teamwork": 83,
          "Research & Data": 75,
          "Leadership": 70
        }
      },
      "non_academic": {
        "organizations": [
          { "name": "Divisi Sosial & Kemanusiaan BEM Fikom", "role": "Staf Kampanye Sosial", "period": "2024-2025", "is_leadership": false },
          { "name": "Komunitas Relawan Kemanusiaan", "role": "Relawan Aktif", "period": "2022-2025", "is_leadership": false }
        ],
        "leadership_score": 70,
        "achievements": [
          { "title": "Kontributor Kampanye Sosial Terbaik", "year": 2024, "level": "Internal" }
        ],
        "certifications": [
          "Social Campaign Design",
          "Content Writing Dasar"
        ],
        "internship": {
          "organization": "NGO Komunikasi Sosial",
          "role": "Social Campaign Intern",
          "duration_months": 3
        },
        "portfolio_items": 5
      },
      "career_readiness": {
        "best_fit_profile": "P3",
        "profile_match": [
          { "profile": "P3", "match_pct": 84 },
          { "profile": "P1", "match_pct": 80 },
          { "profile": "P2", "match_pct": 66 }
        ],
        "engagement": {
          "attendance_pct": 93,
          "class_activeness": "sedang-tinggi"
        },
        "development_recommendations": [
          "Perdalam kerangka teori komunikasi krisis agar analisis lebih berlapis.",
          "Tingkatkan kompetensi riset kuantitatif untuk mendukung pengambilan keputusan berbasis data."
        ]
      },
      "fgd_summary": {
        "session_id": "FGD-2026-0623-MANKOM-A",
        "weighted_score": 71,
        "band": "Baik",
        "rank_in_group": 3,
        "top_indicators": [
          "Communication",
          "Argumentation",
          "Collaboration"
        ]
      },
      "passion_competency_fit": {
        "inferred_passions": [
          {
            "area": "Komunikasi Sosial & Kemanusiaan / CSR",
            "basis": "Lensa kemanusiaan-empati konsisten di FGD; Staf Kampanye Sosial BEM; relawan kemanusiaan; magang NGO."
          },
          {
            "area": "Kampanye Sosial & Komunikasi Multikultural",
            "basis": "Nilai A Manajemen Kampanye Sosial & Komunikasi Multikultural; A- Strategic Writing."
          }
        ],
        "alignment": [
          {
            "passion": "Komunikasi Sosial & Kemanusiaan / CSR",
            "supporting_competencies": [
              "Collaboration (83)",
              "Communication Skill (83)",
              "Analisis situasi & kolaborasi (85)"
            ],
            "competency_gaps": [
              "Research & Data (75)",
              "Teori Komunikasi Strategis (81)"
            ],
            "alignment_score": 84,
            "verdict": "Selaras"
          },
          {
            "passion": "Kampanye Sosial & Komunikasi Multikultural",
            "supporting_competencies": [
              "Komunikasi Multikultural (A)",
              "Strategic Writing (A-)"
            ],
            "competency_gaps": [
              "Pengukuran dampak kampanye berbasis data"
            ],
            "alignment_score": 82,
            "verdict": "Selaras"
          }
        ],
        "overall_fit_score": 83,
        "fit_band": "Selaras",
        "summary": "Passion sosial-kemanusiaan sangat cocok dengan kekuatan kolaborasi, multikultural, dan penulisan kampanye. Gap utama adalah kapasitas riset/pengukuran dampak dan kedalaman teori."
      },
      "self_development_plan": {
        "priority_focus": "Menjembatani passion sosial dengan kapasitas riset & pengukuran dampak.",
        "horizon": [
          {
            "term": "Jangka Pendek (semester berjalan)",
            "goals": [
              {
                "area": "Kedalaman Teori",
                "action": "Perdalam teori komunikasi krisis/strategis dalam analisis kasus.",
                "rationale": "Gap Teori (81).",
                "resource": "Teori Komunikasi; studi kasus krisis",
                "target_indicator": "Teori Komunikasi Strategis >= 85"
              },
              {
                "area": "Riset & Pengukuran",
                "action": "Perkuat riset kuantitatif untuk mengukur efektivitas kampanye.",
                "rationale": "Gap Research & Data (75).",
                "resource": "Riset Kuantitatif Manajemen Komunikasi",
                "target_indicator": "Research & Data >= 80"
              }
            ]
          },
          {
            "term": "Jangka Menengah (1-2 semester)",
            "goals": [
              {
                "area": "Spesialisasi CSR/Social Campaign",
                "action": "Sertifikasi social campaign analytics & magang lanjutan di NGO/CSR korporat.",
                "rationale": "Mengonversi minat menjadi keahlian terukur.",
                "resource": "Sertifikasi social campaign; magang CSR",
                "target_indicator": "1 sertifikasi + portofolio kampanye dengan data dampak"
              }
            ]
          },
          {
            "term": "Jangka Panjang (menuju kelulusan)",
            "goals": [
              {
                "area": "Jalur Communication for Development / HR-Comm",
                "action": "Arahkan skripsi ke komunikasi sosial/pengembangan SDM.",
                "rationale": "Best-fit P3 (84%), P1 (80%).",
                "resource": "Job Training bidang sosial/CSR",
                "target_indicator": "Spesialisasi communication-for-development terbentuk"
              }
            ]
          }
        ]
      }
    },
    {
      "student_id": "225410028",
      "name": "Adi",
      "nim": "225410028",
      "semester": 6,
      "academic_core": {
        "gpa": 3.49,
        "gpa_band": "Sangat Memuaskan",
        "class_rank_percentile": 78,
        "gpa_trend": [
          { "semester": 1, "gpa": 3.4 },
          { "semester": 2, "gpa": 3.44 },
          { "semester": 3, "gpa": 3.48 },
          { "semester": 4, "gpa": 3.5 },
          { "semester": 5, "gpa": 3.52 }
        ],
        "strongest_courses": [
          { "course": "Industri Media", "grade": "A", "score": 89, "mapped_cpl": ["CPL-PP-01"] },
          { "course": "Logika dan Berpikir Kritis", "grade": "A", "score": 88, "mapped_cpl": ["CPL-KK-01"] },
          { "course": "Komunikasi Massa dan Konvergensi Media", "grade": "A-", "score": 86, "mapped_cpl": ["CPL-PP-01"] },
          { "course": "Riset Kualitatif Manajemen Komunikasi", "grade": "A-", "score": 85, "mapped_cpl": ["CPL-PP-01"] }
        ],
        "weakest_courses": [
          { "course": "Public Speaking", "grade": "B+", "score": 79, "mapped_cpl": ["CPL-KK-02"] },
          { "course": "Wirausaha Komunikasi", "grade": "B+", "score": 80, "mapped_cpl": ["CPL-KK-05"] }
        ],
        "exam_history": [
          { "course": "Analysis of Strategic Communication Issues", "uts": 84, "uas": 82, "tugas": 80, "final_score": 82, "grade": "A-" },
          { "course": "Logika dan Berpikir Kritis", "uts": 87, "uas": 89, "tugas": 88, "final_score": 88, "grade": "A" },
          { "course": "Public Speaking", "uts": 76, "uas": 80, "tugas": 81, "final_score": 79, "grade": "B+" }
        ],
        "documents": {
          "transcript": "https://drive.google.com/file/d/1CL_MCPalIQAV0X5CzL5Uxk3SFC3CxEko/view?usp=sharing",
          "skpi": "https://drive.google.com/file/d/18RWbb9fk23OAuKzvPjyQV-vNHVG59AvK/view?usp=sharing",
          "attendance": "https://drive.google.com/file/d/1xd-ZZahdQS9KJb2KPU5lWF7W0Cfpjd3S/view?usp=sharing"
        }
      },
      "aggregate_competency": {
        "cpl_attainment": [
          { "cpl_id": "CPL-KK-01", "label": "Berpikir tingkat tinggi", "cumulative_pct": 86, "level": "Sangat Baik" },
          { "cpl_id": "CPL-PP-01", "label": "Teori & riset komunikasi strategis", "cumulative_pct": 85, "level": "Sangat Baik" },
          { "cpl_id": "CPL-KK-02", "label": "Public speaking & menyimak", "cumulative_pct": 76, "level": "Baik" },
          { "cpl_id": "CPL-KK-03", "label": "Analisis situasi & kolaborasi", "cumulative_pct": 83, "level": "Baik" },
          { "cpl_id": "CPL-KU-05", "label": "Kolaborasi", "cumulative_pct": 78, "level": "Baik" }
        ],
        "radar": {
          "Critical Thinking": 88,
          "Teori Komunikasi Strategis": 85,
          "Communication Skill": 76,
          "Collaboration / Teamwork": 78,
          "Research & Data": 84,
          "Leadership": 70
        }
      },
      "non_academic": {
        "organizations": [
          { "name": "Lembaga Pers Mahasiswa Fikom", "role": "Reporter & Editor", "period": "2023-2025", "is_leadership": false },
          { "name": "Komunitas Riset & Kajian Media", "role": "Anggota", "period": "2024-2025", "is_leadership": false }
        ],
        "leadership_score": 68,
        "achievements": [
          { "title": "Artikel Analisis Media Terbaik LPM", "year": 2024, "level": "Internal" }
        ],
        "certifications": [
          "Data Analysis for Communication (Dasar)",
          "Jurnalistik Investigatif"
        ],
        "internship": {
          "organization": "Media & Riset Digital",
          "role": "Media Analyst Intern",
          "duration_months": 4
        },
        "portfolio_items": 5
      },
      "career_readiness": {
        "best_fit_profile": "P2",
        "profile_match": [
          { "profile": "P2", "match_pct": 80 },
          { "profile": "P1", "match_pct": 79 },
          { "profile": "P3", "match_pct": 65 }
        ],
        "engagement": {
          "attendance_pct": 90,
          "class_activeness": "sedang"
        },
        "development_recommendations": [
          "Tingkatkan public speaking & frekuensi bicara - kualitas argumen sudah tinggi namun kontribusi lisan rendah.",
          "Kembangkan argumen kritis menjadi sintesis solusi yang lebih lengkap."
        ]
      },
      "fgd_summary": {
        "session_id": "FGD-2026-0623-MANKOM-A",
        "weighted_score": 71,
        "band": "Baik",
        "rank_in_group": 4,
        "top_indicators": [
          "Argumentation",
          "Analytical Reasoning",
          "Persuasion & Negotiation"
        ]
      },
      "passion_competency_fit": {
        "inferred_passions": [
          {
            "area": "Analisis Media & Riset Komunikasi",
            "basis": "Sudut kritis-sistemik pada FGD (peran media, regulator); nilai A Industri Media & Logika/Berpikir Kritis, A- Riset Kualitatif; magang Media Analyst."
          },
          {
            "area": "Jurnalistik & Komunikasi Digital",
            "basis": "Reporter/Editor Lembaga Pers Mahasiswa; A- Komunikasi Massa & Konvergensi Media; sertifikat Data Analysis & Jurnalistik Investigatif."
          }
        ],
        "alignment": [
          {
            "passion": "Analisis Media & Riset Komunikasi",
            "supporting_competencies": [
              "Critical Thinking (88)",
              "Research & Data (84)",
              "Teori Komunikasi Strategis (85)"
            ],
            "competency_gaps": [
              "Communication Skill / Public Speaking (76)",
              "Leadership (70)"
            ],
            "alignment_score": 86,
            "verdict": "Selaras"
          },
          {
            "passion": "Jurnalistik & Komunikasi Digital",
            "supporting_competencies": [
              "Komunikasi Massa & Konvergensi Media (A-)",
              "Riset Kualitatif (A-)"
            ],
            "competency_gaps": [
              "Public speaking & visibilitas",
              "Kepemimpinan"
            ],
            "alignment_score": 80,
            "verdict": "Selaras"
          }
        ],
        "overall_fit_score": 83,
        "fit_band": "Selaras",
        "summary": "Kompetensi inti (analitis, riset, media) sangat mendukung passion analisis media & jurnalistik. Gap utama bukan pada substansi melainkan pada penyampaian lisan & visibilitas - terlihat dari porsi bicara terendah (13%) pada FGD meski kualitas argumen tinggi."
      },
      "self_development_plan": {
        "priority_focus": "Mengubah kekuatan analitis menjadi pengaruh melalui penyampaian lisan & visibilitas.",
        "horizon": [
          {
            "term": "Jangka Pendek (semester berjalan)",
            "goals": [
              {
                "area": "Public Speaking",
                "action": "Latih public speaking & tingkatkan frekuensi bicara/presentasi.",
                "rationale": "Gap Communication (76) & porsi bicara FGD terendah (13%).",
                "resource": "Public Speaking (remedial/club); presentasi kelas",
                "target_indicator": "Communication Skill >= 82"
              },
              {
                "area": "Presentasi Riset",
                "action": "Ambil peran mempresentasikan hasil riset/analisis di forum.",
                "rationale": "Mengangkat visibilitas dari kualitas analisis yang sudah tinggi.",
                "resource": "Seminar/scientific session",
                "target_indicator": "Rutin presentasi hasil analisis"
              }
            ]
          },
          {
            "term": "Jangka Menengah (1-2 semester)",
            "goals": [
              {
                "area": "Data Journalism / Media Analytics",
                "action": "Dalami data journalism & analitik media lanjutan.",
                "rationale": "Memperkuat keunggulan riset-media menuju keahlian bernilai pasar.",
                "resource": "Kursus media analytics; LPM/portofolio analisis",
                "target_indicator": "Portofolio analisis media berbasis data"
              }
            ]
          },
          {
            "term": "Jangka Panjang (menuju kelulusan)",
            "goals": [
              {
                "area": "Jalur Media Analyst / Strategic Insight",
                "action": "Arahkan magang & skripsi ke analisis media / riset komunikasi pemasaran.",
                "rationale": "Best-fit P2 (80%), P1 (79%) berdekatan.",
                "resource": "Job Training media/riset",
                "target_indicator": "Peran media analyst/insight terdokumentasi"
              }
            ]
          }
        ]
      }
    }
  ]
};

interface StudentDnaProfilingProps {
  loggedInUser?: {
    name: string;
    id: string;
    role: 'mahasiswa' | 'dosen' | 'admin';
    email?: string;
    nim?: string;
  } | null;
}

export function StudentDnaProfiling({ loggedInUser }: StudentDnaProfilingProps = {}) {
  const isStudent = loggedInUser?.role === 'mahasiswa';
  const initialStudentId = isStudent && loggedInUser?.id
    ? loggedInUser.id 
    : learning.students[0].student_id;

  const [selectedStudentId, setSelectedStudentId] = useState<string>(initialStudentId);
  const [activeTab, setActiveTab] = useState<string>("overview");

  const currentStudent = learning.students.find(s => s.student_id === selectedStudentId) || learning.students[0];

  // Helper colors for avatars
  const avatarColors: Record<string, string> = {
    "John Tosh": "from-indigo-500 to-blue-600 text-indigo-50",
    "Adinda": "from-emerald-400 to-teal-600 text-emerald-50",
    "Fatima": "from-rose-400 to-pink-600 text-rose-50",
    "Adi": "from-amber-400 to-orange-600 text-amber-50"
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
    { semester: 6, gpa: currentStudent.academic_core.gpa } // Mapped current semester cumulative GPA
  ];

  return (
    <div className="max-w-7xl mx-auto w-full col-span-3 row-span-6 flex flex-col xl:flex-row gap-5 h-full overflow-hidden pb-4">
      {/* LEFT COLUMN: Student list & core selector */}
      {!isStudent && (
        <div className="xl:w-80 flex flex-col gap-4 shrink-0 h-full overflow-y-auto pr-1.5 scroll-smooth scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300">
        <div className="space-y-2">
          {learning.students
            .filter((student) => !isStudent || student.student_id === loggedInUser?.id)
            .map((student) => {
              const isSelected = student.student_id === selectedStudentId;
              const avatarBg = avatarColors[student.name] || "from-slate-400 to-slate-600";
              
              return (
                <button
                  key={student.student_id}
                  onClick={() => {
                    setSelectedStudentId(student.student_id);
                    setActiveTab("overview");
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-center gap-3 cursor-pointer ${
                  isSelected 
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
                    : 'bg-white hover:bg-slate-50 border-border text-slate-700'
                }`}
              >
                {/* Custom Avatar with initials */}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${isSelected ? 'bg-white/25 text-white border border-white/20' : avatarBg} flex items-center justify-center font-black text-sm shrink-0 shadow-xs`}>
                  {student.name.split(' ').map(n => n[0]).join('')}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className={`text-[8px] font-extrabold px-1.5 py-0.2 rounded uppercase font-mono tracking-wider ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}>
                      NIM: {student.nim}
                    </span>
                    <span className={`text-[8px] font-bold ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                      Sem {student.semester}
                    </span>
                  </div>
                  <h4 className="text-[12px] font-black truncate mt-1 leading-tight">{student.name}</h4>
                  
                  <div className="flex items-center gap-2 mt-1.5 text-[10px] font-bold">
                    <span className={isSelected ? 'text-indigo-100' : 'text-slate-600'}>
                      IPK: {student.academic_core.gpa}
                    </span>
                    <span className="opacity-40">•</span>
                    <span className={isSelected ? 'text-emerald-200' : 'text-emerald-600'}>
                      Match: {student.career_readiness.profile_match[0].match_pct}%
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
      )}

      {/* RIGHT COLUMN: Selected Student's Complete Dashboard */}
      <div className="flex-1 bg-white border border-border rounded-3xl p-5 shadow-xs flex flex-col justify-between overflow-hidden">
        {/* Profile Card Header (Full Info) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${avatarColors[currentStudent.name]} flex items-center justify-center font-black text-xl shadow-md border-2 border-white`}>
              {currentStudent.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[9px] font-black text-primary bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded font-mono">
                  MHS-ID: {currentStudent.student_id}
                </span>
                <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded font-mono">
                  Rank: Top {100 - currentStudent.academic_core.class_rank_percentile}%
                </span>
                <span className="text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded font-mono uppercase">
                  {currentStudent.academic_core.gpa_band}
                </span>
              </div>
              <h1 className="text-xl font-black text-slate-800 leading-tight mt-1">{currentStudent.name}</h1>
              <p className="text-[11px] text-slate-500 font-semibold">
                NIM: {currentStudent.nim} • Semester {currentStudent.semester} • Program {learning.context.program_name}
              </p>
              
              {/* Student Documents Links */}
              {currentStudent.academic_core.documents && (
                <div className="flex items-center gap-2 mt-2.5">
                  <a 
                    href={currentStudent.academic_core.documents.transcript} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all cursor-pointer shadow-xs"
                  >
                    <GraduationCap size={12} className="shrink-0" />
                    Transkip
                  </a>
                  <a 
                    href={currentStudent.academic_core.documents.skpi} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-all cursor-pointer shadow-xs"
                  >
                    <Award size={12} className="shrink-0" />
                    SKPI
                  </a>
                  <a 
                    href={currentStudent.academic_core.documents.attendance} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:text-amber-600 hover:border-amber-200 hover:bg-amber-50 transition-all cursor-pointer shadow-xs"
                  >
                    <ClipboardCheck size={12} className="shrink-0" />
                    Kehadiran
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Quick Core Aggregate Cards */}
          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-2 px-3 text-center min-w-[70px]">
              <span className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">IPK Kumulatif</span>
              <span className="text-sm font-black text-indigo-600 font-mono">{currentStudent.academic_core.gpa}</span>
            </div>
            <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-2 px-3 text-center min-w-[70px]">
              <span className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">FGD Score</span>
              <span className="text-sm font-black text-emerald-600 font-mono">{currentStudent.fgd_summary.weighted_score}</span>
            </div>
            <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-2 px-3 text-center min-w-[70px]">
              <span className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-wider">Best Career</span>
              <span className="text-sm font-black text-violet-600 font-mono">{currentStudent.career_readiness.best_fit_profile}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Tab Navigation */}
        <div className="flex gap-1.5 border-b border-slate-100/60 py-2 shrink-0 overflow-x-auto scrollbar-none">
          {[
            { id: "overview", label: "Ringkasan DNA", icon: Sparkles },
            { id: "academic", label: "Akademik & Nilai", icon: BookOpen },
            { id: "competencies", label: "Kompetensi & CPL", icon: Target },
            { id: "passion", label: "Passion & Keselarasan", icon: Heart },
            { id: "portfolio", label: "Portfolio & Organisasi", icon: Briefcase },
            { id: "roadmap", label: "Roadmap Pengembangan", icon: Compass }
          ].map((tab) => {
            const isTabActive = activeTab === tab.id;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl border font-bold text-[10px] sm:text-[11px] flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                  isTabActive 
                    ? "bg-slate-900 border-slate-900 text-white" 
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200/50 text-slate-600"
                }`}
              >
                <TabIcon size={12} className={isTabActive ? "text-primary-light" : "text-slate-400"} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Contents (Scrollable, full-height available) */}
        <div className="flex-1 overflow-y-auto mt-4 pr-1.5 min-h-0 space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Profile summary block */}
              <div className="lg:col-span-8 bg-slate-50/40 border border-slate-100 rounded-2xl p-4 flex flex-col justify-between min-h-[160px]">
                <div className="space-y-1">
                  <span className="text-[8px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                    Ringkasan Profil Belajar
                  </span>
                  <h3 className="text-xs font-black text-slate-800">Analisis Holistik & Kecocokan Profil Karir</h3>
                  <p className="text-[10px] text-slate-600 font-semibold leading-relaxed mt-1">
                    {currentStudent.passion_competency_fit.summary}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-200/50">
                   <div className="space-y-1">
                    <span className="text-[8.5px] font-extrabold text-slate-400 uppercase tracking-wider block">Kesesuaian Profil Karir Terbaik</span>
                    <p className="text-[10.5px] font-black text-slate-800">
                      {learning.context.graduate_profiles[currentStudent.career_readiness.best_fit_profile as keyof typeof learning.context.graduate_profiles]}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8.5px] font-extrabold text-slate-400 uppercase tracking-wider block">Keaktifan &amp; Kehadiran di Kelas</span>
                    <p className="text-[10.5px] font-black text-slate-800 flex items-center gap-1 capitalize">
                      ● keaktifan {currentStudent.career_readiness.engagement.class_activeness} ({currentStudent.career_readiness.engagement.attendance_pct}% kehadiran)
                    </p>
                  </div>
                </div>
              </div>

              {/* Match profile scores radial simulation */}
              <div className="lg:col-span-4 bg-slate-50/40 border border-slate-100 rounded-2xl p-4 flex flex-col justify-between min-h-[160px]">
                <div className="space-y-1">
                  <span className="text-[8px] font-black text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                    Indeks Kesesuaian
                  </span>
                  <h3 className="text-xs font-black text-slate-800">Kesesuaian Profil</h3>
                </div>
                
                <div className="space-y-2 mt-3">
                  {currentStudent.career_readiness.profile_match.map((pm, idx) => {
                    const profileName = learning.context.graduate_profiles[pm.profile as keyof typeof learning.context.graduate_profiles]?.split(' (')[0];
                    return (
                      <div key={idx} className="space-y-0.5">
                        <div className="flex justify-between items-center text-[9px] font-bold">
                          <span className="text-slate-600">{pm.profile} - {profileName}</span>
                          <span className="font-mono text-indigo-600">{pm.match_pct}%</span>
                        </div>
                        <div className="w-full bg-slate-200/50 h-1 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${idx === 0 ? 'bg-indigo-600' : 'bg-slate-400'}`} 
                            style={{ width: `${pm.match_pct}%` }} 
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* FGD Highlights */}
              <div className="lg:col-span-6 bg-slate-50/30 border border-slate-100 rounded-2xl p-4 space-y-2">
                <span className="text-[8.5px] font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                  Ringkasan Diskusi Kelompok
                </span>
                <h3 className="text-xs font-black text-slate-800">Refleksi Kompetensi dalam FGD</h3>
                <div className="flex items-center justify-between text-[11px] font-semibold py-1">
                  <span className="text-slate-500">ID Sesi Diskusi:</span>
                  <span className="font-mono text-slate-700">{currentStudent.fgd_summary.session_id}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-semibold py-1 border-t border-slate-100">
                  <span className="text-slate-500">Peringkat dalam Grup:</span>
                  <span className="font-bold text-slate-800">Juara {currentStudent.fgd_summary.rank_in_group} dari 4</span>
                </div>
                <div className="flex items-start gap-1 flex-wrap pt-1.5 border-t border-slate-100">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block w-full mb-1">Indikator Terkuat di FGD:</span>
                  {currentStudent.fgd_summary.top_indicators.map((ind, i) => (
                    <span key={i} className="text-[8.5px] font-bold text-emerald-700 bg-emerald-50/50 border border-emerald-100 px-2 py-0.5 rounded-lg">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              {/* Short terms summary action */}
              <div className="lg:col-span-6 bg-indigo-50/30 border border-indigo-100/30 rounded-2xl p-4 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-[8.5px] font-black text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                    Fokus Utama
                  </span>
                  <h3 className="text-xs font-black text-indigo-950">Prioritas Rencana Pengembangan</h3>
                  <p className="text-[10px] text-indigo-900 leading-relaxed font-semibold mt-1">
                    "{currentStudent.self_development_plan.priority_focus}"
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab("roadmap")}
                  className="mt-3 text-[9px] font-black text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer self-start"
                >
                  Lihat Detail Roadmap Pengembangan <ChevronRight size={10} />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: ACADEMIC & GRADES */}
          {activeTab === "academic" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
              {/* GPA Trend Line Chart */}
              <div className="lg:col-span-6 bg-slate-50/40 border border-slate-100 rounded-2xl p-4.5 h-[320px] flex flex-col justify-between hover:border-indigo-100/60 transition-all duration-300">
                <div>
                  <span className="text-[8px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                    Academic Metrics
                  </span>
                  <h3 className="text-xs font-black text-slate-800 mt-2">Tren Indeks Prestasi Kumulatif (IPK)</h3>
                  <p className="text-[9px] text-slate-500 font-semibold leading-normal">
                    Peningkatan atau perkembangan konsistensi akademik dari semester 1 hingga semester berjalan.
                  </p>
                </div>

                <div className="h-44 w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={gpaChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
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
                                <p className="font-bold text-indigo-600 font-mono mt-0.5">IPK: {payload[0].value}</p>
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

              {/* Strongest Courses */}
              <div className="lg:col-span-3 bg-white border border-slate-100 rounded-2xl p-4 flex flex-col justify-between shadow-3xs hover:border-emerald-100/60 hover:shadow-xs transition-all duration-300 h-[320px]">
                <div className="space-y-2">
                  <span className="text-[8px] font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                    Mata Kuliah Terkuat
                  </span>
                  <div className="space-y-1.5 overflow-y-auto max-h-[175px] pr-0.5 scrollbar-thin">
                    {currentStudent.academic_core.strongest_courses.map((c, i) => (
                      <div key={i} className="p-2 bg-emerald-50/5 hover:bg-emerald-50/15 border border-emerald-100/40 rounded-xl flex items-center justify-between transition">
                        <div className="overflow-hidden pr-2">
                          <h4 className="text-[10px] font-extrabold text-slate-800 leading-tight truncate" title={c.course}>{c.course}</h4>
                          <span className="text-[8px] text-slate-400 font-semibold font-mono uppercase">CPL: {c.mapped_cpl.join(', ')}</span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[10px] font-black text-emerald-600 font-mono block leading-none">{c.score}</span>
                          <span className="text-[8.5px] font-extrabold text-slate-400 uppercase leading-none mt-0.5 block">Grade {c.grade}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-[8px] text-emerald-700/80 font-bold bg-emerald-50/40 border border-emerald-100/30 p-2 rounded-xl text-center leading-normal">
                   Menunjukkan kapabilitas kognitif &amp; analisis tinggi
                </div>
              </div>

              {/* Weakest Courses */}
              <div className="lg:col-span-3 bg-white border border-slate-100 rounded-2xl p-4 flex flex-col justify-between shadow-3xs hover:border-rose-100/60 hover:shadow-xs transition-all duration-300 h-[320px]">
                <div className="space-y-2">
                  <span className="text-[8px] font-black text-rose-700 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                    Mata Kuliah Lemah
                  </span>
                  <div className="space-y-1.5 overflow-y-auto max-h-[175px] pr-0.5 scrollbar-thin">
                    {currentStudent.academic_core.weakest_courses.map((c, i) => (
                      <div key={i} className="p-2 bg-rose-50/5 hover:bg-rose-50/15 border border-rose-100/40 rounded-xl flex items-center justify-between transition">
                        <div className="overflow-hidden pr-2">
                          <h4 className="text-[10px] font-extrabold text-slate-800 leading-tight truncate" title={c.course}>{c.course}</h4>
                          <span className="text-[8px] text-slate-400 font-semibold font-mono uppercase">CPL: {c.mapped_cpl.join(', ')}</span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[10px] font-black text-rose-600 font-mono block leading-none">{c.score}</span>
                          <span className="text-[8.5px] font-extrabold text-slate-400 uppercase leading-none mt-0.5 block">Grade {c.grade}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-[8px] text-rose-700/80 font-bold bg-rose-50/40 border border-rose-100/30 p-2 rounded-xl text-center leading-normal">
                   Rekomendasi pendampingan &amp; mentoring berkala
                </div>
              </div>

              {/* Detailed Exam Marks History */}
              <div className="lg:col-span-12 bg-white border border-slate-100 rounded-2xl p-4 shadow-3xs">
                <span className="text-[8px] font-black text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded uppercase tracking-wider font-mono">
                  Detailed Exam History
                </span>
                <h3 className="text-xs font-black text-slate-800 mt-2 mb-3">Rekap Nilai Ujian Mata Kuliah Inti</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-[11px]">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 uppercase text-[9px] font-black tracking-wider">
                        <th className="py-2.5 px-3">Mata Kuliah</th>
                        <th className="py-2.5 px-3 text-center">UTS (30%)</th>
                        <th className="py-2.5 px-3 text-center">UAS (40%)</th>
                        <th className="py-2.5 px-3 text-center">Tugas (30%)</th>
                        <th className="py-2.5 px-3 text-center">Nilai Akhir</th>
                        <th className="py-2.5 px-3 text-center">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                      {currentStudent.academic_core.exam_history.map((exam, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-3 px-3 font-bold text-slate-800">{exam.course}</td>
                          <td className="py-3 px-3 text-center font-mono">{exam.uts}</td>
                          <td className="py-3 px-3 text-center font-mono">{exam.uas}</td>
                          <td className="py-3 px-3 text-center font-mono">{exam.tugas}</td>
                          <td className="py-3 px-3 text-center font-bold font-mono text-primary">{exam.final_score}</td>
                          <td className="py-3 px-3 text-center">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black bg-indigo-50 text-indigo-700 border border-indigo-100">
                              {exam.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COMPETENCIES & CPL */}
          {activeTab === "competencies" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* Radar Chart Panel */}
              <div className="lg:col-span-5 bg-slate-50/40 border border-slate-100 rounded-2xl p-4 flex flex-col justify-between min-h-[300px]">
                <div>
                  <span className="text-[8px] font-black text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                    Competency Matrix
                  </span>
                  <h3 className="text-xs font-black text-slate-800 mt-2">6 Pilar Kompetensi Mahasiswa</h3>
                  <p className="text-[9px] text-slate-500 font-semibold leading-normal">
                    Pencapaian berbasis FGD, tugas, dan ujian diintegrasikan dalam radar kompetensi holistik.
                  </p>
                </div>

                <div className="h-56 w-full mt-3 relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                      <PolarGrid stroke="#E2E8F0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 8.5, fontWeight: 700 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#CBD5E1" tick={{ fontSize: 7 }} />
                      <Radar 
                        name={currentStudent.name} 
                        dataKey="Score" 
                        stroke="#bf4440" 
                        fill="#bf4440" 
                        fillOpacity={0.15} 
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* CPL Attainment Progress */}
              <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-4 shadow-3xs flex flex-col justify-between">
                <div>
                  <span className="text-[8px] font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded uppercase tracking-wider font-mono">
                    CPL Attainment (Capaian Pembelajaran Lulusan)
                  </span>
                  <h3 className="text-xs font-black text-slate-800 mt-2 mb-3">Persentase Pencapaian Terhadap Kriteria Kelulusan</h3>
                </div>

                <div className="space-y-4 flex-1 overflow-y-auto max-h-[250px] pr-1">
                  {currentStudent.aggregate_competency.cpl_attainment.map((cpl) => (
                    <div key={cpl.cpl_id} className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-extrabold">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[9px] bg-indigo-50 text-indigo-700 border border-indigo-100 px-1.5 py-0.2 rounded">
                            {cpl.cpl_id}
                          </span>
                          <span className="text-slate-700">{cpl.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[8px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider border ${
                            cpl.level === "Sangat Baik" 
                              ? "text-emerald-700 bg-emerald-50 border-emerald-100" 
                              : "text-[#993633] bg-blue-50 border-blue-100"
                          }`}>
                            {cpl.level}
                          </span>
                          <span className="font-mono text-indigo-600">{cpl.cumulative_pct}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-indigo-600 h-full rounded-full transition-all duration-300" 
                          style={{ width: `${cpl.cumulative_pct}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PASSION & ALIGNMENT */}
          {activeTab === "passion" && (
            <div className="space-y-4">
              {/* Inferred Passions */}
              <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-3xs">
                <span className="text-[8.5px] font-black text-rose-700 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                  Inferred Passion Areas
                </span>
                <h3 className="text-xs font-black text-slate-800 mt-2 mb-3">Area Minat yang Terinferensi dari Aktivitas</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentStudent.passion_competency_fit.inferred_passions.map((p, idx) => (
                    <div key={idx} className="p-3 bg-slate-50/40 hover:bg-white border border-slate-100 hover:border-indigo-100/60 rounded-xl space-y-1 shadow-3xs hover:shadow-2xs transition-all duration-300 flex gap-3 items-start">
                      <span className="p-1.5 bg-rose-50 text-rose-500 rounded-lg shrink-0">
                        <Heart size={14} className="fill-rose-500" />
                      </span>
                      <div>
                        <h4 className="text-[11px] font-extrabold text-slate-800 leading-tight">{p.area}</h4>
                        <p className="text-[10px] text-slate-500 leading-normal font-semibold mt-1">
                          <span className="font-bold text-slate-400 block text-[9px] uppercase tracking-wider">Basis Bukti Inferensi:</span>
                          {p.basis}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Passion Alignment Scores */}
              <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-3xs">
                <span className="text-[8.5px] font-black text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                  Alignment Matrix
                </span>
                <h3 className="text-xs font-black text-slate-800 mt-2 mb-3">Tingkat Keselarasan Passion vs Kompetensi</h3>

                <div className="space-y-3">
                  {currentStudent.passion_competency_fit.alignment.map((align, idx) => {
                    const verdictColor = align.verdict === "Sangat Selaras" 
                      ? "text-emerald-700 bg-emerald-50 border-emerald-100" 
                      : "text-[#993633] bg-blue-50 border-blue-100";

                    return (
                      <div key={idx} className="p-3 bg-slate-50/30 hover:bg-white/60 border border-slate-200/60 rounded-xl space-y-2.5 shadow-3xs transition-all duration-300">
                        <div className="flex items-start justify-between gap-4 flex-wrap pb-1.5 border-b border-slate-100">
                          <div>
                            <h4 className="text-[11px] font-black text-slate-800">{align.passion}</h4>
                            <span className={`inline-block text-[8px] font-extrabold px-1.5 py-0.2 rounded-full border uppercase font-mono mt-0.5 ${verdictColor}`}>
                              Status: {align.verdict}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-black text-indigo-600 font-mono">{align.alignment_score}%</span>
                            <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">Alignment Score</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                          <div className="space-y-1">
                            <h5 className="text-[9px] font-black text-emerald-800 flex items-center gap-1 uppercase tracking-wider">
                              <Check size={9} className="stroke-[3]" /> Kompetensi Pendukung
                            </h5>
                            <div className="flex gap-1 flex-wrap">
                              {align.supporting_competencies.map((sc, i) => (
                                <span key={i} className="text-[8.5px] font-extrabold text-slate-600 bg-white border border-slate-200/60 px-1.5 py-0.2 rounded-md">
                                  {sc}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <h5 className="text-[9px] font-black text-rose-800 flex items-center gap-1 uppercase tracking-wider">
                              <X size={9} className="stroke-[3]" /> Hambatan / Kesenjangan Kompetensi
                            </h5>
                            <div className="flex gap-1 flex-wrap">
                              {align.competency_gaps.map((cg, i) => (
                                <span key={i} className="text-[8.5px] font-extrabold text-rose-700 bg-rose-50/30 border border-rose-100 px-1.5 py-0.2 rounded-md">
                                  {cg}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PORTFOLIO & NON-ACADEMIC */}
          {activeTab === "portfolio" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Organizations */}
              <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-4 shadow-3xs flex flex-col justify-between min-h-[180px]">
                <div className="space-y-1">
                  <span className="text-[8.5px] font-black text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                    Organizations
                  </span>
                  <h3 className="text-xs font-black text-slate-800">Riwayat Organisasi & Peran Kepemimpinan</h3>
                  <p className="text-[9px] text-slate-500 font-semibold leading-normal mb-3">
                    Keaktifan non-akademik di dalam dan di luar lingkungan kampus.
                  </p>
                </div>

                <div className="space-y-2 flex-1">
                  {currentStudent.non_academic.organizations.map((org, i) => (
                    <div key={i} className="p-3 bg-slate-50/40 hover:bg-white border border-slate-100 hover:border-indigo-100/60 rounded-xl space-y-1 hover:shadow-2xs transition-all duration-300">
                      <div className="flex justify-between items-start">
                        <h4 className="text-[11px] font-extrabold text-slate-800 leading-snug">{org.name}</h4>
                        <span className="text-[8px] font-extrabold bg-slate-100 text-slate-500 border border-slate-200/60 px-1.5 py-0.2 rounded font-mono uppercase">
                          {org.period}
                        </span>
                      </div>
                      <p className="text-[10px] text-indigo-600 font-bold">{org.role}</p>
                      
                      {org.is_leadership && (
                        <span className="inline-flex items-center gap-0.5 text-[8px] font-black text-amber-700 bg-amber-50 border border-amber-100 px-1.5 py-0.2 rounded-full uppercase tracking-wider mt-1.5">
                          <Zap size={8} className="fill-amber-500" /> Kepemimpinan Utama
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements & Certifications */}
              <div className="lg:col-span-5 space-y-4">
                {/* Achievements */}
                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-3xs space-y-2.5">
                  <span className="text-[8px] font-black text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                    Prestasi & Penghargaan
                  </span>
                  <div className="space-y-1.5">
                    {currentStudent.non_academic.achievements.map((ach, i) => (
                      <div key={i} className="p-2.5 bg-slate-50/40 hover:bg-white border border-slate-100 hover:border-amber-100/60 rounded-xl flex items-center justify-between shadow-3xs hover:shadow-2xs transition-all duration-300">
                        <div>
                          <h4 className="text-[10px] font-extrabold text-slate-800 leading-tight">{ach.title}</h4>
                          <span className="text-[8px] text-slate-400 font-bold uppercase">{ach.level} • {ach.year}</span>
                        </div>
                        <span className="p-1.5 bg-amber-50 text-amber-500 rounded-lg shrink-0">
                          <Award size={12} className="fill-amber-500/20" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-3xs space-y-2">
                  <span className="text-[8px] font-black text-violet-700 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                    Sertifikasi & Workshop
                  </span>
                  <div className="flex gap-1.5 flex-wrap pt-1">
                    {currentStudent.non_academic.certifications.map((cert, i) => (
                      <span key={i} className="text-[9px] font-bold text-slate-600 bg-slate-50 border border-slate-200/60 px-2 py-1 rounded-lg flex items-center gap-1 shadow-3xs">
                        <CheckCircle2 size={10} className="text-violet-500" /> {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Internship Profile */}
              <div className="lg:col-span-12 bg-white border border-slate-100 rounded-2xl p-4 shadow-3xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-50 text-[#bf4440] rounded-xl border border-blue-100/60 shrink-0">
                    <Briefcase size={16} />
                  </div>
                  <div>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">Riwayat Kerja & Magang</span>
                    <h3 className="text-xs font-black text-slate-800">{currentStudent.non_academic.internship.organization}</h3>
                    <p className="text-[10px] text-slate-500 font-semibold">
                      Peran: <span className="font-bold text-slate-700">{currentStudent.non_academic.internship.role}</span> • Durasi: {currentStudent.non_academic.internship.duration_months} Bulan
                    </p>
                  </div>
                </div>

                <div className="bg-indigo-50/50 border border-indigo-100/50 rounded-xl p-2 px-3 text-center self-start md:self-auto shrink-0">
                  <span className="block text-[8px] font-extrabold text-indigo-700 uppercase tracking-wider">Item Portofolio Terverifikasi</span>
                  <span className="text-sm font-black text-indigo-600 font-mono">{currentStudent.non_academic.portfolio_items} Portofolio</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: ROADMAP & DEVELOPMENT PLAN */}
          {activeTab === "roadmap" && (
            <div className="space-y-4">
              {/* Main plan summary block */}
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-3xl p-5 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-44 h-44 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl -ml-16 -mb-16 pointer-events-none" />
                
                <div className="space-y-1.5 relative z-10 max-w-2xl">
                  <span className="text-[8px] font-black text-indigo-100 bg-white/15 px-2.5 py-0.5 rounded uppercase tracking-wider font-mono">
                    Development Vision
                  </span>
                  <h3 className="text-base font-black tracking-tight">Fokus Strategis Pengembangan Mandiri</h3>
                  <p className="text-[11px] text-indigo-50 leading-relaxed font-semibold italic">
                    "{currentStudent.self_development_plan.priority_focus}"
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl p-3 px-5 text-center shrink-0 relative z-10 self-start md:self-auto shadow-inner">
                  <span className="block text-[8px] font-extrabold text-indigo-100 uppercase tracking-wider">Overall Fit Band</span>
                  <span className="text-sm font-black font-mono text-emerald-300 flex items-center justify-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> {currentStudent.passion_competency_fit.fit_band}
                  </span>
                </div>
              </div>

              {/* Roadmap Timeline */}
              <div className="space-y-4 pl-1">
                {currentStudent.self_development_plan.horizon.map((h, i) => {
                  let badgeStyle = "text-indigo-700 bg-indigo-50 border-indigo-100";
                  let bulletStyle = "bg-indigo-500 ring-4 ring-indigo-50/80";
                  
                  if (h.term.includes("Menengah")) {
                    badgeStyle = "text-violet-700 bg-violet-50 border-violet-100";
                    bulletStyle = "bg-violet-500 ring-4 ring-violet-50/80";
                  }
                  if (h.term.includes("Panjang")) {
                    badgeStyle = "text-emerald-700 bg-emerald-50 border-emerald-100";
                    bulletStyle = "bg-emerald-500 ring-4 ring-emerald-50/80";
                  }

                  return (
                    <div key={i} className="relative pl-7 border-l-2 border-slate-100 pb-5 last:pb-2">
                      {/* Timeline Bullet */}
                      <div className={`absolute -left-[5.5px] top-1.5 w-2.5 h-2.5 rounded-full ${bulletStyle} z-10 transition-all duration-300`} />
                      
                      <div className="space-y-3">
                        <span className={`inline-block text-[9px] font-black px-2.5 py-0.5 rounded-full border uppercase tracking-wider font-mono ${badgeStyle}`}>
                          {h.term}
                        </span>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {h.goals.map((g, idx) => (
                            <div key={idx} className="bg-slate-50/40 hover:bg-white border border-slate-100 hover:border-indigo-100/80 rounded-2xl p-4.5 space-y-4 hover:shadow-sm transition-all duration-300 flex flex-col justify-between group">
                              <div className="space-y-3">
                                <div className="flex items-center justify-between gap-1 pb-2 border-b border-slate-100">
                                  <span className="text-[10.5px] font-extrabold text-slate-800 uppercase tracking-wider">
                                    {g.area}
                                  </span>
                                  <span className="text-[9px] font-black text-indigo-700 bg-indigo-50/80 border border-indigo-100/60 px-2.5 py-0.5 rounded-lg font-mono">
                                    Target: {g.target_indicator}
                                  </span>
                                </div>

                                <div className="space-y-2.5">
                                  <div className="p-3 bg-white border border-slate-100/55 rounded-xl space-y-1">
                                    <span className="font-extrabold text-slate-500 block text-[8px] uppercase tracking-wider leading-none">Rencana Tindakan:</span>
                                    <p className="text-[10.5px] text-slate-600 font-semibold leading-relaxed mt-0.5">
                                      {g.action}
                                    </p>
                                  </div>
                                  <div className="p-3 bg-indigo-50/15 border border-indigo-100/20 rounded-xl space-y-1">
                                    <span className="font-extrabold text-indigo-700 block text-[8px] uppercase tracking-wider leading-none">Rasionalisasi:</span>
                                    <p className="text-[10.5px] text-slate-600 font-semibold leading-relaxed mt-0.5">
                                      {g.rationale}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-3 pt-2.5 border-t border-slate-100/60 flex items-center gap-1.5 text-[9.5px] text-slate-500 font-bold">
                                <BookOpen size={11} className="text-slate-400 shrink-0" />
                                <span className="truncate" title={g.resource}>Acuan/Sumber: <span className="text-slate-700 font-bold">{g.resource}</span></span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer info stamp */}
        <div className="shrink-0 border-t border-slate-100 pt-3.5 mt-4 text-[9px] text-slate-400 font-semibold flex items-center justify-between">
          <span>{learning.generated_by} • {learning.generated_at}</span>
          <span>Semua analisis ini disesuaikan dengan kurikulum {learning.context.curriculum_id}</span>
        </div>
      </div>
    </div>
  );
}

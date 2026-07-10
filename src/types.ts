export type View = 'home' | 'student_twin' | 'lobby' | 'history' | 'playback' | 'curriculum' | 'dna' | 'fgd_assignment' | 'schedule' | 'courses' | 'settings' | 'comm_labs' | 'aksara_ai' | 'course_class_details' | 'competitions' | 'internships' | 'career_aspirations' | 
  'dosen_home' | 'dosen_classes' | 'dosen_grades' | 'dosen_fgd_results' | 'dosen_assignments' | 
  'dosen_advised_students' | 'dosen_krs_approval' | 'dosen_advising_notes' | 
  'dosen_research_tracker' | 'dosen_publications' | 'dosen_research_analytics' | 
  'dosen_thesis_supervision' | 'dosen_thesis_schedule' | 
  'dosen_cpl' | 'dosen_accreditation' | 'dosen_faculty_overview' |
  'admin_home' | 'admin_campus_profile' | 'admin_study_programs' | 'admin_academic_calendar' |
  'admin_all_users' | 'admin_roles_permissions' | 'admin_active_invitations' | 'admin_active_sessions' |
  'admin_curriculum' | 'admin_student_biodata' | 'admin_lecturer_data' |
  'admin_integration_siakad' | 'admin_integration_pddikti' | 'admin_integration_sso' |
  'admin_system_health' | 'admin_activity_logs' | 'admin_audit_trail';

export interface Evidence {
  timestamp: string;
  quote: string;
}

export interface IndicatorScore {
  indicator_id: string;
  name: string;
  score: number;
  band: string;
  confidence: string;
  evidence: Evidence[];
  note?: string;
}

export interface CplAttainment {
  cpl_id: string;
  attained: boolean;
  level: string;
}

export interface Participant {
  participant_id: string;
  name: string;
  nim: string;
  talk_share_pct: number;
  turns: number;
  word_count: number;
  dominance_flag: string;
  profile: {
    discussion_role: string;
    communication_style: string;
    theoretical_grounding: string;
    summary: string;
  };
  indicator_scores: IndicatorScore[];
  overall: {
    weighted_score: number;
    band: string;
    meets_standard: boolean;
    rank_in_group: number;
    score_excluding_low_confidence?: number;
    score_excluding_low_confidence_note?: string;
  };
  cpl_attainment: CplAttainment[];
  feedback: {
    strengths: string[];
    areas_for_improvement: string[];
    recommendation: string;
  };
}

export interface Meeting {
  id: string;
  date: string;
  topic: string;
  duration: string;
}

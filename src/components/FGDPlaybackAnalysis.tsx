import { useState, useMemo } from 'react';
import { View } from '../types';
import { BentoCard } from './BentoCard';
import { ParticipantDetail } from './ParticipantDetail';
import { mockParticipants, Participant } from '../data';
import { 
  Play, Pause, Volume2, Search, ArrowUpCircle, Info, Radio, Video, Mic, MicOff, Camera, CameraOff, 
  Hand, MessageCircle, Disc, AlertTriangle, CheckSquare, PlusCircle, ArrowRightLeft, BookOpen, User, Sparkles, ChevronRight, ChevronDown,
  ExternalLink, Award, FileText, Lightbulb, Calendar, Clock, HelpCircle, Users, Database
} from 'lucide-react';

const getSpeakerMeta = (speaker: string) => {
  const normalized = speaker.toLowerCase();
  if (normalized.includes('nafisya')) {
    return {
      displayName: "Moderator - Nafisya",
      color: "border-pink-200/60 bg-pink-50/30 text-pink-700",
      dot: "bg-pink-500",
      avatarBg: "bg-pink-100 text-pink-700 font-bold border-pink-200"
    };
  }
  if (normalized.includes('john') || normalized.includes('tosh')) {
    return {
      displayName: "John Tosh - 2254100011",
      color: "border-blue-200/60 bg-blue-50/30 text-blue-700",
      dot: "bg-blue-500",
      avatarBg: "bg-blue-100 text-blue-700 font-bold border-blue-200"
    };
  }
  if (normalized.includes('fatima')) {
    return {
      displayName: "FATIMA - 225410016",
      color: "border-emerald-200/60 bg-emerald-50/30 text-emerald-700",
      dot: "bg-emerald-500",
      avatarBg: "bg-emerald-100 text-emerald-700 font-bold border-emerald-200"
    };
  }
  if (normalized.includes('adinda')) {
    return {
      displayName: "225410073 - ADINDA",
      color: "border-purple-200/60 bg-purple-50/30 text-purple-700",
      dot: "bg-purple-500",
      avatarBg: "bg-purple-100 text-purple-700 font-bold border-purple-200"
    };
  }
  if (normalized.includes('adi')) {
    return {
      displayName: "Adi - 225410028",
      color: "border-amber-200/60 bg-amber-50/30 text-amber-700",
      dot: "bg-amber-500",
      avatarBg: "bg-amber-100 text-amber-700 font-bold border-amber-200"
    };
  }
  return {
    displayName: speaker,
    color: "border-slate-200/60 bg-slate-50/30 text-slate-700",
    dot: "bg-slate-500",
    avatarBg: "bg-slate-100 text-slate-700 font-bold border-slate-200"
  };
};

interface FGDPlaybackAnalysisProps {
  setView?: (view: View) => void;
  loggedInUser?: {
    name: string;
    id: string;
    role: 'mahasiswa' | 'dosen' | 'admin';
    nim?: string;
  };
}

export function FGDPlaybackAnalysis({ setView, loggedInUser }: FGDPlaybackAnalysisProps) {
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  
  // Filter participants if the user is a student
  const displayParticipants = useMemo(() => {
    if (loggedInUser?.role === 'mahasiswa' && loggedInUser.nim) {
      return mockParticipants.filter(p => p.nim === loggedInUser.nim);
    }
    return mockParticipants;
  }, [loggedInUser]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcriptSearch, setTranscriptSearch] = useState('');
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0x');
  const [playbackTime, setPlaybackTime] = useState('00:10:04');
  const [isMetadataExpanded, setIsMetadataExpanded] = useState(false);
  const [isMethodologyExpanded, setIsMethodologyExpanded] = useState(false);
  const [selectedTimeInSeconds, setSelectedTimeInSeconds] = useState<number | null>(null);

  // Convert "MM:SS" to total seconds
  const parseTimeToSeconds = (timeStr: string): number => {
    const parts = timeStr.split(':');
    if (parts.length === 2) {
      const mins = parseInt(parts[0], 10) || 0;
      const secs = parseInt(parts[1], 10) || 0;
      return mins * 60 + secs;
    }
    return 0;
  };

  // WebVTT formatted transcript block
  const fullTranscript = [
    { speaker: "FATIMA - 225410016", text: "Application.", time: "01:05" },
    { speaker: "FATIMA - 225410016", text: "Bukan yang.", time: "01:07" },
    { speaker: "225410073 - ADINDA", text: "Sudah ya.", time: "01:57" },
    { speaker: "Moderator - Nafisya", text: "Baik, apakah bisa kita mulai?", time: "02:51" },
    { speaker: "Moderator - Nafisya", text: "Oke, selam.", time: "02:55" },
    { speaker: "Moderator - Nafisya", text: "Baik,", time: "02:56" },
    { speaker: "Moderator - Nafisya", text: "selamat pagi, semuanya. Rekan rekan. Pada kesempatan ini, Perkenalkan nama saya Nafisha yang akan memoderatory Focus Group Discussion pada mata kuliah Analysis of Strategic Communication Issues. Diskusi hari ini akan membahas evaluasi strategi krisis manajemen dari Pt Kai terkait kasus tabrakan yang terjadi di Bekasi Timur. Dua puluh tujuh, April, dua ribu, dua puluh, enam Lalu", time: "02:58" },
    { speaker: "Moderator - Nafisya", text: "fokus di sini adalah Untuk identifikasi Isu Strategis Analisis respon organisasi juga rekomendasi komunikasi yang dapat diberikan sebagai awalan silakan. Berikan pandangan kalian masing masing menurut. Kalian apakah, Peristiwa ini dapat dikategorikan sebagai isu strategis bagi Pt Kai. Dan mengapa", time: "03:22" },
    { speaker: "Moderator - Nafisya", text: "boleh silakan dijawab?", time: "03:40" },
    { speaker: "John Tosh - 2254100011", text: "Saya boleh, Bu. Menurut saya, ini adalah", time: "03:43" },
    { speaker: "John Tosh - 2254100011", text: "Pastinya itu strategis, Bu. Ya, karena korban jiwanya cukup banyak,", time: "03:47" },
    { speaker: "John Tosh - 2254100011", text: "baik. Korban jiwa itu yang meninggal ataupun yang luka luka didominasi oleh perempuan.", time: "03:54" },
    { speaker: "John Tosh - 2254100011", text: "Maka dari itu, kecelakaan ini termasuk isu yang strategis karena kecelakaan yang besar dan Tidak hanya berdampak pada", time: "04:01" },
    { speaker: "John Tosh - 2254100011", text: "operasional terkait tersendiri, tapi nanti bisa berdampak ke yang.", time: "04:10" },
    { speaker: "Moderator - Nafisya", text: "Baik, ada pendapat lain.", time: "04:17" },
    { speaker: "FATIMA - 225410016", text: "Saya ibu. Kalau dari saya sendiri, Saya setuju, Kar. Karena korbannya ini cukup banyak dan mayoritas perempuan. Jadi, secara emosional, Ini merupakan isu yang cukup sensitif.", time: "04:19" },
    { speaker: "FATIMA - 225410016", text: "Jadi, publik tidak hanya melihat dari sisi kecelakaannya juga. Tapi dari sisi kemanusiaannya.", time: "04:33" },
    { speaker: "Moderator - Nafisya", text: "Baik, selanjutnya.", time: "04:43" },
    { speaker: "Adi - 225410028", text: "Saya, Bu,", time: "04:44" },
    { speaker: "Adi - 225410028", text: "Kalau menurut saya sendiri, itu yang membuatnya menjadi isu Strategi itu adalah tingginya perhatian media. Ketika media nasional Itu terus memberitakan perkembangan korban dan investigasi isu tersebut. Itu berkembang menjadi perhatian publik yang lebih luas dan berpotensi mempengaruhi citra organisasi.", time: "04:46" },
    { speaker: "Moderator - Nafisya", text: "Oke, Next.", time: "05:08" },
    { speaker: "Moderator - Nafisya", text: "Baik, Bu.", time: "05:09" },
    { speaker: "225410073 - ADINDA", text: "Saya Bu Syifa. Bu. Kalau saya melihat isu ini juga berkaitan dengan kepercayaan masyarakat terhadap transportasi publiknya sendiri, Bu. Jadi Jika kita tidak. Maksud saya, jika tidak dikelola dengan baik, masyarakat bisa merasa khawatir ketika menggulingkan moda transportasi kereta api seperti itu. Bu.", time: "05:11" },
    { speaker: "Moderator - Nafisya", text: "Masing masing pandangan kalian. Menurut kalian siapa stakeholder utama yang harus menjadi prioritas penanganan dalam situasi ini oleh Pt. Kai.", time: "05:32" },
    { speaker: "FATIMA - 225410016", text: "Menurut saya, ibu Stakeholder utama itu, tentu saja dari korban dan juga keluarga korban. Karena mereka adalah pihak yang paling terdampak sehingga seharusnya menjadi prioritas utama untuk dijalin komunikasi Perusahaan.", time: "05:44" },
    { speaker: "John Tosh - 2254100011", text: "Saya menambahkan, Bu.", time: "06:03" },
    { speaker: "John Tosh - 2254100011", text: "Jadi, menurut saya bukan hanya korban. Korban memang prioritas utama, tapi ada tambahan yakni penumpang Kai yang lainnya juga karena kecelakaan yang besar ini bisa membuat penumpang lain itu khawatir dan takut untuk menaiki kereta, maka dari itu, Pt Kai itu Juga, selain", time: "06:06" },
    { speaker: "John Tosh - 2254100011", text: "korban jiwa itu dan keluarganya,", time: "06:26" },
    { speaker: "John Tosh - 2254100011", text: "penumpang penumpang yang aktif juga perlu diyakinkan bahwa Pt Kai sedang memperbaiki ini mencari masalahnya dan sedang Dikembangkan untuk Tidak berulang lagi.", time: "06:29" },
    { speaker: "Adi - 225410028", text: "Izin menjawab juga, Bu. Bagi saya, pemerintah dan regulator transportasi juga penting. Karena mereka itu memiliki peran dalam proses investigasi dan pengawasan keselamatan.", time: "06:40" },
    { speaker: "225410073 - ADINDA", text: "Bu. Izin menjawab juga, Bu. Jadi, menurut saya, media juga menjadi stakeholder yang punya peran penting, Bu. Karena kan informasi Selama ini, yang mereka sampaikan akan sangat mempengaruhi persepsi publik terhadap Pt Kai sendiri. Bu.", time: "06:53" },
    { speaker: "Moderator - Nafisya", text: "Oke, dari itu.", time: "07:10" },
    { speaker: "Moderator - Nafisya", text: "Karena Pt Kai sudah merespon kejadian ini. Bagaimana kalian masing masing menilai respon awal Pt. Kai setelah kecelakaan terjadi.", time: "07:13" },
    { speaker: "John Tosh - 2254100011", text: "Menurut saya, respon Kai sudah bagus, Bu. Dan cepat, Bu.", time: "07:23" },
    { speaker: "John Tosh - 2254100011", text: "Karena Pt Kai segera mengeluarkan pernyataan resmi dan memberikan informasi Bela sungkawa terus langsung bertindak, mengevakuasi korban. Karena dalam ilmu ilmu komunikasi itu, kan? Ada", time: "07:28" },
    { speaker: "John Tosh - 2254100011", text: "beberapa hal yang tepat, kecepatan akurasi empati dan transparansi, Dan Kai itu sudah melakukan empat. Empatnya Itu cepat", time: "07:41" },
    { speaker: "John Tosh - 2254100011", text: "menanggapi. Akurasinya juga bagus. Mengutamakan korban jiwa dan keluarganya terus bela Sungkawa mengucapkan bela sungkawa Empati terus transparansi. Juga Ada kelalaian juga dari Pt. Pt.", time: "07:50" },
    { speaker: "John Tosh - 2254100011", text: "Pihak Pt. Kai Selain dari pihak yang lain.", time: "08:04" },
    { speaker: "FATIMA - 225410016", text: "Saya mau menambahkan ibu kalau dari kasus ini sangat terlihat bahwa Pt Kai itu menerapkan aspek yang paling banyak. Itu adalah empati. Dimana Pt Kai? Itu menyampaikan terlebih dahulu. Bella sukawa dan juga permohonan maaf kepada keluarga korban.", time: "08:09" },
    { speaker: "FATIMA - 225410016", text: "Sebenarnya apa yang dilakukan Pt Kai Itu sudah tepat, karena itu penting dalam situasi krisis seperti ini.", time: "08:26" },
    { speaker: "Adi - 225410028", text: "Tapi bagi saya, respon tersebut tuh masih berfokus pada penanganan korban sih. Pabrik itu juga membutuhkan informasi mengenai apa yang sebenarnya terjadi. Dan bagaimana investigasi itu dilakukan.", time: "08:35" },
    { speaker: "225410073 - ADINDA", text: "Saya setuju juga, Bu. Jadi, menurut saya juga respon awal itu sebenarnya sudah baik, Bu. Tetapi komunikasi lanjutan mengenai langkah Perbaikan itu perlu diperjelas, Bu. Agar ke depannya, itu publik bisa tahu dan publik juga bisa merasa tenang terkait dari dampak dampak tersebut. Bu.", time: "08:50" },
    { speaker: "Moderator - Nafisya", text: "Oke, oke,", time: "09:10" },
    { speaker: "Moderator - Nafisya", text: "jika kita nilai menggunakan Te Situational Crisis Communication Theory yang kita pelajari minggu lalu, bagaimana menurut kalian strategi Komunikasi yang sudah dilakukan oleh Pt. Kai.", time: "09:11" },
    { speaker: "Adi - 225410028", text: "Oke, izin mendagri, Bu. Dalam Sct sendiri, itu. Organisasi perlu memberikan informasi yang membantu publik memahami situasi saya. Melihat pt Kai itu sudah memberikan informasi dasar terkait korban dan proses evakuasi.", time: "09:25" },
    { speaker: "Moderator - Nafisya", text: "Ada pendapat lain.", time: "09:42" },
    { speaker: "John Tosh - 2254100011", text: "Saya coba, Bu. Coba untuk menjawab", time: "09:44" },
    { speaker: "John Tosh - 2254100011", text: "Pt. Kai yang sudah berusaha sih Mengurangi ketidakpastian publik, mengurangi kekhawatiran dan memberikan pernyataan resmi yang", time: "09:49" },
    { speaker: "John Tosh - 2254100011", text: "relatif cepat itu. Tapi dalam hal ini, dalam Situational Crisis Communication Theory dari Koms Itu kasus ini, Itu minimal masuk kategori escidential Crisis.", time: "09:59" },
    { speaker: "John Tosh - 2254100011", text: "Nah, tetapi dalam seiring waktu, ini juga bisa menjadi Preventible Crisis. Jika ditemukan kelalaian sistem ataupun human error seperti itu, maka dari itu Sebaiknya Pt Ka ini juga", time: "10:11" },
    { speaker: "John Tosh - 2254100011", text: "membangun komunikasi yang baik. Ketika berjalannya waktu. Investigasi.", time: "10:23" },
    { speaker: "FATIMA - 225410016", text: "Saya mau menambahkan Ibu. Selain apa yang sudah disampaikan oleh teman teman sebelumnya dari Pt. Kai, itu sebenarnya juga sudah menambahkan Adjusting Information di mana ada penyampaian empati dan juga perhatian kepada korban serta keluarga korban.", time: "10:31" },
    { speaker: "225410073 - ADINDA", text: "Bu. Tapi kalau menurut saya pribadi nih, Bu, komunikasi krisis yang sekarang terjadi, itu tidak bisa berhenti sampai di situ saja, Bu. Karena menurut saya, Pt Kai, itu harus terus memberikan informasi pembaruan agar kepercayaan publik juga bisa tetap terjaga selama proses investigasi berlangsung seperti itu.", time: "10:52" },
    { speaker: "John Tosh - 2254100011", text: "Saya boleh menambahkan Bu Yang dari Fatimah", time: "11:14" },
    { speaker: "John Tosh - 2254100011", text: "tentang Just Information. Jadi, Kai, itu tidak hanya", time: "11:19" },
    { speaker: "John Tosh - 2254100011", text: "membutuhkan adjusting information. Tapi instructing Information ini mem yaitu memberikan informasi praktis bagi korban keluarga. Terus ada rebild strategi Meminta maaf Memberikan kompensasi terhadap korban terus membolehkan kepercayaan terus Perlu juga adanya Corrective action yang menjelaskan langkah perbaikan.", time: "11:23" },
    { speaker: "John Tosh - 2254100011", text: "Bagaimana ke depannya yang seperti saya sudah jelaskan sebelumnya, mungkin itu sih Bu yang bisa saya tambahkan. Dari.", time: "11:42" },
    { speaker: "Moderator - Nafisya", text: "Oke, kita langsung lanjut ke dampaknya saja. Jadi, dari kalian, Ap, kalian membayangkan dampak yang mungkin terjadi. Apa sih jika Komunikasi krisis ini tidak dikelola dengan baik. Boleh dijawab satu per satu, Silakan.", time: "11:55" },
    { speaker: "FATIMA - 225410016", text: "Saya mau menjawab, Bu Ka. Kalau komunikasi krisis ini tidak dikelola dengan baik, itu bisa membuat keluarga korban dan juga Masyarakat", time: "12:18" },
    { speaker: "FATIMA - 225410016", text: "itu bisa merasa bahwa Pt. Kai ini tidak transparan. Jadi, karena krisisnya ini cukup besar. Kemudian korbannya juga banyak. Jika tidak disampaikan dengan baik, maka kredibilitas dari Kai dan juga Kai. Ini dianggap tidak transparan oleh masyarakat.", time: "12:31" },
    { speaker: "Adi - 225410028", text: "Izin Nagabi juga, Bu. Kalau bagi saya sih, media sosial juga memperbesar spekulasi dan informasi yang belum tentu benar", time: "12:52" },
    { speaker: "Adi - 225410028", text: "dari saya, itu aja deh.", time: "13:00" },
    { speaker: "Moderator - Nafisya", text: "Ada pendapat lain.", time: "13:05" },
    { speaker: "225410073 - ADINDA", text: "Baik, Miss Bu. Kalau dari saya", time: "13:09" },
    { speaker: "225410073 - ADINDA", text: "dalam rangka dalam jangka panjang ini, Bu. Jadi reputasi Kai sebagai moda transportasi yang Aman itu dapat terganggu. Dan menurut saya juga ini dapat mempengaruhi loyalitas pelanggan sendiri. Bu.", time: "13:13" },
    { speaker: "John Tosh - 2254100011", text: "Kalau Saya coba menyimpulkan dari teman teman saja, Bu. Ya, Jadi ini bisa berdampak", time: "13:28" },
    { speaker: "John Tosh - 2254100011", text: "ke banyak hal, ya? Efek dominonya juga lumayan bisa terlihat jika", time: "13:34" },
    { speaker: "John Tosh - 2254100011", text: "Pt. Kai ini tidak menangani komunikasinya dengan baik.", time: "13:40" },
    { speaker: "John Tosh - 2254100011", text: "Dari kepercayaan masyarakat yang sudah disampaikan Fatimah tadi terus", time: "13:45" },
    { speaker: "John Tosh - 2254100011", text: "Adi menyampaikan Media juga harus ikut membangun kepercayaan masyarakat. Ibu tersendiri terus. Yang dari adinda juga menyatakan hal yang benar. Jadi, menurut saya, efek dominanya itu besar dari kepercayaan masyarakat. Media juga bisa membantu kalau masyarakat tidak percaya. Jadi,", time: "13:49" },
    { speaker: "John Tosh - 2254100011", text: "Kai itu bisa berdampak pada pendapatannya, operasionalnya dan yang lainnya.", time: "14:08" },
    { speaker: "Moderator - Nafisya", text: "Oke, sebagai penutup diskusi kita hari ini. Jika kalian menjadi konsultan komunikasi di Pt. Kai itu sendiri dalam menangani menangani Kasus krisis yang terjadi. Strategi apa yang Kira Kira akan kalian rekomendasikan?", time: "14:14" },
    { speaker: "Moderator - Nafisya", text: "Boleh ini dijawab satu per satu. Silakan.", time: "14:29" },
    { speaker: "John Tosh - 2254100011", text: "Saya izin menjawab deh. Bu.", time: "14:41" },
    { speaker: "John Tosh - 2254100011", text: "Mohon dikoreksi, Bu. Ya, tapi menurut pandangan saya, jika saya member kesempatan menduduki posisi sebagai", time: "14:44" },
    { speaker: "John Tosh - 2254100011", text: "Manajer atau Direktur Komunikasi Kai. Saya akan melakukan beberapa hal. Mungkin salah satunya sudah saya sampaikan, yaitu yang pertama. Mortification. Mortification. Itu adalah permintaan Maaf, dan pengakuan pes. Kesalahan", time: "14:55" },
    { speaker: "John Tosh - 2254100011", text: "terus yang kedua. Corrective Action. Bahwa kita tidak akan mengulanginya lagi. Kita akan coba untuk memperbaiki apa yang menyebab", time: "15:08" },
    { speaker: "John Tosh - 2254100011", text: "Kecelakaan yang terjadi. Yang kedua itu ada compensation. Jadi, kita Ti tidak hanya meminta maaf atau memberikan pernyataan bela tungkawa, tapi kita juga perlu Untuk menyampaikan kompensasi dan bod di atas atas, itu juga perlu memberikan kompensasi. Maka dari itu,", time: "15:16" },
    { speaker: "John Tosh - 2254100011", text: "itu tiga hal yang perlu, dan saya harus Menghindari denial terus", time: "15:35" },
    { speaker: "John Tosh - 2254100011", text: "tidak merasa bertanggung jawab. Itu yang akan saya lakukan.", time: "15:41" },
    { speaker: "FATIMA - 225410016", text: "Saya mau menambahkan ibu yang paling penting untuk Pt Kai ini.", time: "15:47" },
    { speaker: "FATIMA - 225410016", text: "Itu harus memperkuat komunikasi dengan keluarga korban dan juga Memastikan semua bantuan dan kompensasi itu tersampaikan dengan baik.", time: "15:54" },
    { speaker: "Adi - 225410028", text: "Izin menanggapi juga, Bu. Kalau bagi saya sih, malah Pt Kai itu perlu memiliki satu juru bicara utama di mana Agar seluruh pesan itu bisa disampaikan secara konsisten dan juga tidak menimbulkan kebingungan.", time: "16:05" },
    { speaker: "225410073 - ADINDA", text: "Kalau menurut saya pribadi, Bu, karena yang terpenting adalah kepercayaan publik, jadi saya akan merekomendasikan bahwa bagaimana caranya Pt. Kai melakukan kampanye pemulihan kepercayaan publik yang dapat langkah langkah perbaikan bagi keselamatan. Setelah dilakukan, investigasi itu selesai. Begitu Bu.", time: "16:22" },
    { speaker: "John Tosh - 2254100011", text: "Saya menambahkan Bu dari Adi Jontos. Ini menambahkan.", time: "16:42" },
    { speaker: "Moderator - Nafisya", text: "Oke, ada lagi tanggapannya? Rekan rekan sekalian.", time: "16:53" },
    { speaker: "Moderator - Nafisya", text: "Baik, terima kasih atas pandangan teman teman dalam isu ini. Saya simpulkan bahwa Memang kecelakaan yang terjadi. Itu menjadi isu strategis yang dialami yang juga berdampak pada reputasi dari Pt. Kai.", time: "17:11" },
    { speaker: "Moderator - Nafisya", text: "Terima kasih atas pandangan teman teman Masing masing. Saya akhiri diskusi hari ini. Wassalamualaikum warahmatullahi. Wabarakatuh.", time: "17:19" },
    { speaker: "225410073 - ADINDA", text: "Terima kasih, Bu, terima kasih.", time: "17:19" },
    { speaker: "Adi - 225410028", text: "Terima kasih.", time: "17:20" },
    { speaker: "John Tosh - 2254100011", text: "Jadi, dia.", time: "17:20" },
    { speaker: "225410073 - ADINDA", text: "Bu, Izin, lift, Bu. Terima kasih, Bu.", time: "17:21" },
    { speaker: "John Tosh - 2254100011", text: "Ibu tasik.", time: "17:23" },
    { speaker: "225410073 - ADINDA", text: "Bu Fatimah makan.", time: "17:27" }
  ];

  const [selectedSpeaker, setSelectedSpeaker] = useState<string>('Semua');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('Semua');

  const handleMetadataClick = (keyword: string) => {
    setTranscriptSearch(keyword);
    // Reset other filters to make sure search results show up properly
    setSelectedSpeaker('Semua');
    setSelectedTimeRange('Semua');
    // Scroll to the Audio Transcript Analysis box
    document.getElementById('audio-transcript-analysis')?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredTranscript = useMemo(() => {
    return fullTranscript.filter(line => {
      // 1. Text Search Filter
      const matchesSearch = !transcriptSearch || 
        line.text.toLowerCase().includes(transcriptSearch.toLowerCase()) || 
        line.speaker.toLowerCase().includes(transcriptSearch.toLowerCase());

      // 2. Speaker Filter
      let matchesSpeaker = true;
      if (selectedSpeaker !== 'Semua') {
        const lineSpeakerLower = line.speaker.toLowerCase();
        if (selectedSpeaker === 'Nafisya') {
          matchesSpeaker = lineSpeakerLower.includes('nafisya');
        } else if (selectedSpeaker === 'John Tosh') {
          matchesSpeaker = lineSpeakerLower.includes('john') || lineSpeakerLower.includes('tosh');
        } else if (selectedSpeaker === 'Fatima') {
          matchesSpeaker = lineSpeakerLower.includes('fatima');
        } else if (selectedSpeaker === 'Adinda') {
          matchesSpeaker = lineSpeakerLower.includes('adinda');
        } else if (selectedSpeaker === 'Adi') {
          matchesSpeaker = lineSpeakerLower.includes('adi') && !lineSpeakerLower.includes('adinda');
        }
      }

      // 3. Time range Filter
      let matchesTime = true;
      if (selectedTimeRange !== 'Semua') {
        const parts = line.time.split(':');
        if (parts.length === 2) {
          const mins = parseInt(parts[0], 10);
          if (selectedTimeRange === '00:00 - 05:00') {
            matchesTime = mins >= 0 && mins < 5;
          } else if (selectedTimeRange === '05:00 - 10:00') {
            matchesTime = mins >= 5 && mins < 10;
          } else if (selectedTimeRange === '10:00 - 15:00') {
            matchesTime = mins >= 10 && mins < 15;
          } else if (selectedTimeRange === '15:00+') {
            matchesTime = mins >= 15;
          }
        }
      }

      return matchesSearch && matchesSpeaker && matchesTime;
    });
  }, [transcriptSearch, selectedSpeaker, selectedTimeRange]);

  if (selectedParticipant) {
    return <ParticipantDetail participant={selectedParticipant} onBack={() => setSelectedParticipant(null)} />;
  }

  return (
    <div className="max-w-7xl mx-auto w-full col-span-3 row-span-6 flex flex-col gap-5 h-full overflow-y-auto pr-1 pb-6 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 scrollbar-track-transparent">
      {/* Collapsible FGD Case Study Metadata Card */}
      <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden shrink-0 transition-all duration-200">
        <button
          onClick={() => setIsMetadataExpanded(!isMetadataExpanded)}
          className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 px-4 pb-5 hover:bg-slate-50/50 transition-colors text-left gap-3.5"
        >
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-indigo-50 text-primary rounded-xl shrink-0">
              <BookOpen size={18} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">Mata Kuliah: Analysis of Strategic Communication Issues</span>
                <span className="h-1 w-1 bg-slate-300 rounded-full" />
                <span className="text-[9px] font-bold text-primary bg-blue-50 px-2 py-0.5 rounded-full">FGD Use Case</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-text-main mt-0.5">
                Tema: Evaluasi strategi manajemen krisis PT KAI atas kasus tabrakan di Bekasi Timur
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
            {/* Compact Rataan Skor Sesi (Average Score) Badge */}
            <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-100/80 px-3 py-1.5 rounded-xl shrink-0">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <div className="flex flex-col text-left">
                <span className="text-[8px] text-emerald-700 font-extrabold uppercase tracking-widest block leading-none">Rataan Skor</span>
                <span className="text-xs sm:text-sm font-black text-emerald-800 font-mono leading-none mt-1">
                  82.5 <span className="text-[9px] font-bold text-emerald-600">/ 100</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-primary bg-indigo-50/50 hover:bg-indigo-100/50 px-3.5 py-2 rounded-xl border border-indigo-100/40 transition shrink-0">
              <span>{isMetadataExpanded ? 'Sembunyikan' : 'Detail & Pertanyaan'}</span>
              {isMetadataExpanded ? (
                <ChevronDown size={16} className="text-primary transition-transform duration-200" />
              ) : (
                <ChevronRight size={16} className="text-primary transition-transform duration-200" />
              )}
            </div>
          </div>
        </button>

        {isMetadataExpanded && (
          <div className="p-5 bg-slate-50/30 border-t border-slate-100">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
              {/* Left Side: Course Info & Institutional Details */}
              <div className="xl:col-span-7 bg-white border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                <div>
                  {/* Institution & Faculty Header */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-3">
                    <span className="text-slate-600">Universitas Padjadjaran</span>
                    <span>•</span>
                    <span>Fakultas Ilmu Komunikasi</span>
                    <span>•</span>
                    <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[8px]">Manajemen Komunikasi</span>
                  </div>

                  {/* Grid for Course & Theme */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pb-4 border-b border-slate-100">
                    <div 
                      onClick={() => handleMetadataClick('Strategic')}
                      className="space-y-1 p-2 -m-2 rounded-xl hover:bg-blue-50/40 cursor-pointer transition-all duration-200 group"
                      title="Klik untuk menyaring topik komunikasi strategis"
                    >
                      <span className="text-[10px] font-bold text-text-sub uppercase tracking-wider flex items-center gap-1.5">
                        <BookOpen size={12} className="text-blue-500" /> Mata Kuliah
                      </span>
                      <p className="text-xs font-bold text-text-main leading-snug group-hover:text-primary transition-colors">
                        Analysis of Strategic Communication Issues
                      </p>
                    </div>

                    <div 
                      onClick={() => handleMetadataClick('krisis')}
                      className="space-y-1 p-2 -m-2 rounded-xl hover:bg-amber-50/40 cursor-pointer transition-all duration-200 group"
                      title="Klik untuk menyaring topik manajemen krisis KAI"
                    >
                      <span className="text-[10px] font-bold text-text-sub uppercase tracking-wider flex items-center gap-1.5">
                        <FileText size={12} className="text-amber-500" /> Tema & Kasus
                      </span>
                      <p className="text-xs font-bold text-text-main leading-relaxed group-hover:text-amber-700 transition-colors">
                        Evaluasi strategi manajemen krisis PT KAI atas kasus tabrakan di Bekasi Timur (27 April 2026)
                      </p>
                    </div>
                  </div>

                  {/* Grid for Theories & Target Outputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-text-sub uppercase tracking-wider flex items-center gap-1.5">
                        <Lightbulb size={12} className="text-amber-500" /> Teori Acuan
                      </span>
                      <ul className="space-y-1 text-[11px] text-text-main font-semibold pl-1">
                        <li 
                          onClick={() => handleMetadataClick('SCCT')}
                          className="flex items-start gap-1 p-1 -m-1 rounded hover:bg-slate-50 cursor-pointer transition-all group"
                          title="Klik untuk menyaring percakapan tentang SCCT"
                        >
                          <span className="text-primary font-bold">1.</span>
                          <span className="hover:text-primary transition-colors">Situational Crisis Communication Theory (SCCT) – Coombs</span>
                        </li>
                        <li 
                          onClick={() => handleMetadataClick('Image Restoration')}
                          className="flex items-start gap-1 p-1 -m-1 rounded hover:bg-slate-50 cursor-pointer transition-all group"
                          title="Klik untuk menyaring percakapan tentang Image Restoration"
                        >
                          <span className="text-primary font-bold">2.</span>
                          <span className="hover:text-primary transition-colors">Image Restoration Theory – Benoit</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-text-sub uppercase tracking-wider flex items-center gap-1.5">
                        <Award size={12} className="text-emerald-500" /> Target Output
                      </span>
                      <ul className="space-y-1 text-[10px] text-text-sub font-semibold pl-1">
                        <li 
                          onClick={() => handleMetadataClick('identifikasi')}
                          className="flex items-start gap-1 p-1 -m-1 rounded hover:bg-slate-50 cursor-pointer transition-all text-left"
                          title="Klik untuk melihat percakapan mengidentifikasi isu"
                        >
                          <CheckSquare size={10} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span className="hover:text-emerald-700 transition-colors">Kemampuan mengidentifikasi isu krisis & menganalisis respons organisasi.</span>
                        </li>
                        <li 
                          onClick={() => handleMetadataClick('rekomendasi')}
                          className="flex items-start gap-1 p-1 -m-1 rounded hover:bg-slate-50 cursor-pointer transition-all text-left"
                          title="Klik untuk melihat percakapan tentang rekomendasi strategis"
                        >
                          <CheckSquare size={10} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span className="hover:text-emerald-700 transition-colors">Kemampuan mengaitkan temuan dengan teori & memberikan rekomendasi strategis.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Session Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-[11px]">
                  <div 
                    onClick={() => handleMetadataClick('2026-06-23')}
                    className="bg-slate-50 hover:bg-slate-100/80 cursor-pointer p-2 rounded-lg border border-slate-100 flex flex-col justify-center transition-all duration-200"
                    title="Klik untuk menyaring percakapan pada tanggal ini"
                  >
                    <span className="text-[9px] font-bold text-text-sub uppercase tracking-wider flex items-center gap-1">
                      <Calendar size={10} className="text-slate-400" /> Tanggal
                    </span>
                    <span className="font-bold text-text-main mt-0.5">2026-06-23</span>
                  </div>

                  <div 
                    onClick={() => handleMetadataClick('')}
                    className="bg-slate-50 hover:bg-slate-100/80 cursor-pointer p-2 rounded-lg border border-slate-100 flex flex-col justify-center transition-all duration-200"
                    title="Klik untuk mereset pencarian"
                  >
                    <span className="text-[9px] font-bold text-text-sub uppercase tracking-wider flex items-center gap-1">
                      <Clock size={10} className="text-slate-400" /> Durasi
                    </span>
                    <span className="font-bold text-text-main mt-0.5">17 Menit</span>
                  </div>

                  <div 
                    onClick={() => { setSelectedSpeaker('Nafisya'); setTranscriptSearch(''); }}
                    className="bg-slate-50 hover:bg-pink-50/50 cursor-pointer p-2 rounded-lg border border-slate-100 hover:border-pink-200/50 flex flex-col justify-center transition-all duration-200"
                    title="Klik untuk menyaring pembicaraan Moderator (Nafisya)"
                  >
                    <span className="text-[9px] font-bold text-text-sub uppercase tracking-wider flex items-center gap-1">
                      <User size={10} className="text-pink-500" /> Moderator
                    </span>
                    <span className="font-bold text-text-main mt-0.5 truncate" title="Nafisya (dosen/moderator)">Nafisya</span>
                  </div>

                  <div 
                    onClick={() => { setSelectedSpeaker('Semua'); setTranscriptSearch(''); }}
                    className="bg-slate-50 hover:bg-blue-50/50 cursor-pointer p-2 rounded-lg border border-slate-100 hover:border-blue-200/50 flex flex-col justify-center transition-all duration-200"
                    title="Klik untuk menampilkan semua peserta"
                  >
                    <span className="text-[9px] font-bold text-text-sub uppercase tracking-wider flex items-center gap-1">
                      <Users size={10} className="text-blue-500" /> Peserta
                    </span>
                    <span className="font-bold text-text-main mt-0.5">4 Anggota</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Discussion Questions */}
              <div className="xl:col-span-5 bg-white border border-border rounded-2xl p-5 shadow-sm flex flex-col">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3 shrink-0">
                  <span className="text-xs font-bold text-text-main flex items-center gap-2">
                    <HelpCircle size={15} className="text-primary" /> Pertanyaan Diskusi FGD
                  </span>
                  <a 
                    href="https://www.bbc.com/indonesia/articles/c5yvynj08z7o" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[9px] font-extrabold text-primary hover:underline hover:text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100 transition-colors shrink-0"
                  >
                    BBC Use Case <ExternalLink size={10} />
                  </a>
                </div>

                <div className="flex-1 overflow-y-auto max-h-[220px] xl:max-h-[240px] pr-1 space-y-2.5 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 scrollbar-track-transparent">
                  {[
                    { q: "Apakah peristiwa ini dapat dikategorikan sebagai isu strategis bagi PT KAI, dan mengapa?", kw: "strategis" },
                    { q: "Siapa stakeholder utama yang harus diprioritaskan PT KAI?", kw: "stakeholder" },
                    { q: "Bagaimana penilaian terhadap respon awal PT KAI?", kw: "respon" },
                    { q: "Bagaimana strategi komunikasi PT KAI dinilai melalui kerangka SCCT?", kw: "SCCT" },
                    { q: "Apa dampak jika komunikasi krisis tidak dikelola dengan baik?", kw: "dampak" },
                    { q: "Sebagai konsultan komunikasi, strategi apa yang direkomendasikan?", kw: "rekomendasi" }
                  ].map((item, index) => (
                    <div 
                      key={index} 
                      onClick={() => handleMetadataClick(item.kw)}
                      className="p-3 bg-slate-50/50 hover:bg-blue-50/20 active:scale-[0.99] border border-slate-100 hover:border-blue-100 rounded-xl flex items-start gap-2.5 transition-all duration-200 cursor-pointer"
                      title={`Klik untuk menyaring transkrip dengan kata kunci "${item.kw}"`}
                    >
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-primary font-bold text-[10px] flex items-center justify-center shrink-0 border border-blue-200 mt-0.5">
                        {index + 1}
                      </span>
                      <p className="text-[11px] font-semibold text-text-main leading-relaxed">
                        {item.q}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

        {/* Row 3: Group Discussion Summary */}
        <div className="w-full">
          <BentoCard title="Group Discussion Summary" className="bg-slate-50/40 border border-slate-200/60 p-6 rounded-2xl shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.1em]">Aksara IQ Group Summary</span>
                </div>
                <h3 className="text-base font-extrabold text-slate-800 mt-1">
                  Analisis & Evaluasi Kolektif Kelompok
                </h3>
              </div>
              
              {/* Score & Status Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-white border border-slate-200/80 px-4 py-2 rounded-xl flex items-center gap-3 shadow-sm">
                  <div className="text-left">
                    <span className="text-[9px] text-text-sub font-bold uppercase tracking-wider block leading-none">Rataan Skor Kelompok</span>
                    <span className="text-lg font-black text-primary font-mono mt-1 block leading-none">
                      74 <span className="text-xs font-normal text-text-sub">/ 100</span>
                    </span>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <div className="text-left">
                    <span className="text-[9px] text-emerald-700 font-extrabold uppercase tracking-wider block leading-none font-sans">Status Kelompok</span>
                    <span className="text-xs font-bold text-emerald-800 mt-1 block leading-none">
                      Semua Memenuhi Standar
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Analysis Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              {/* Text Summaries Column */}
              <div className="xl:col-span-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
                    <h4 className="text-xs font-bold text-slate-700 flex items-center gap-2 mb-1.5">
                      <span className="p-1 bg-indigo-50 text-indigo-600 rounded-md"><Users size={12} /></span>
                      Dinamika Diskusi
                    </h4>
                    <p className="text-xs text-text-sub leading-relaxed">
                      Diskusi konsensual, kolaboratif, dan progresif — argumen saling melengkapi dari isu strategis, stakeholder, evaluasi respon, kerangka SCCT, dampak, hingga rekomendasi. Tidak terjadi konflik terbuka, sehingga indikator Conflict Resolution berbukti terbatas untuk semua peserta.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
                    <h4 className="text-xs font-bold text-slate-700 flex items-center gap-2 mb-1.5">
                      <span className="p-1 bg-amber-50 text-amber-600 rounded-md"><BookOpen size={12} /></span>
                      Penerapan Teori
                    </h4>
                    <p className="text-xs text-text-sub leading-relaxed">
                      Kelompok menerapkan SCCT secara kolektif (tipe krisis, instructing/adjusting information) serta Image Restoration Theory (mortification, corrective action, compensation) — dipimpin John Tosh dan dilengkapi rekan.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
                    <h4 className="text-xs font-bold text-slate-700 flex items-center gap-2 mb-1.5">
                      <span className="p-1 bg-blue-50 text-blue-600 rounded-md"><User size={12} /></span>
                      Observasi Dominasi
                    </h4>
                    <p className="text-xs text-text-sub leading-relaxed">
                      John Tosh mendominasi (47,3% talk share, 39 giliran), tiga peserta lain relatif seimbang (13-21%). Disarankan moderator menyeimbangkan giliran bicara.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
                    <h4 className="text-xs font-bold text-slate-700 flex items-center gap-2 mb-1.5">
                      <span className="p-1 bg-pink-50 text-pink-600 rounded-md"><ArrowRightLeft size={12} /></span>
                      Pola Turn-Taking
                    </h4>
                    <p className="text-xs text-text-sub leading-relaxed">
                      Pola tertib dipandu moderator; peserta umumnya menunggu dipersilakan. Adi paling jarang bicara meski kualitas argumen tinggi.
                    </p>
                  </div>
                </div>
              </div>

              {/* Strengths & Improvements Lists */}
              <div className="xl:col-span-4 space-y-4">
                {/* Strengths */}
                <div className="bg-emerald-50/30 border border-emerald-100/50 p-4 rounded-xl">
                  <h4 className="text-xs font-bold text-emerald-800 flex items-center gap-2 mb-2.5">
                    <span className="p-1 bg-emerald-100 text-emerald-700 rounded-md"><Award size={12} /></span>
                    Kelebihan Kelompok
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "Cakupan analisis lengkap atas seluruh pertanyaan diskusi.",
                      "Penerapan teori komunikasi krisis yang relevan.",
                      "Sikap kolaboratif dan saling membangun argumen."
                    ].map((str, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-emerald-900 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Areas of Improvement */}
                <div className="bg-blue-50/30 border border-blue-100/50 p-4 rounded-xl">
                  <h4 className="text-xs font-bold text-blue-800 flex items-center gap-2 mb-2.5">
                    <span className="p-1 bg-blue-100 text-blue-700 rounded-md"><Lightbulb size={12} /></span>
                    Area Peningkatan
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "Pemerataan partisipasi.",
                      "Lebih banyak interaksi antarpeserta (bukan hanya merespon moderator).",
                      "Eksplorasi perbedaan pandangan untuk melatih resolusi konflik."
                    ].map((imp, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-blue-950 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </BentoCard>
        </div>

        {/* Row 1: Video Playback (Full 100% Width) */}
        <div className="w-full shrink-0">
          {/* Playback Container */}
          <BentoCard id="fgd-video-player-card" className="w-full h-[650px] bg-[#0F172A] relative flex flex-col justify-between overflow-hidden p-0 border-none rounded-2xl group shrink-0">
            <div className="absolute inset-0 w-full h-full bg-slate-950">
              <iframe 
                key={selectedTimeInSeconds ?? 'default'}
                src={`https://drive.google.com/file/d/1gzzaJBo-NH7NjnYlzpI4sBnIKdi5qBnF/preview${selectedTimeInSeconds !== null ? `?t=${selectedTimeInSeconds}s` : ''}`} 
                className="w-full h-full border-none"
                allow="autoplay"
                referrerPolicy="no-referrer"
                title="FGD Video Recording Player"
              />
            </div>
            
            {/* Smooth time selection floating badge */}
            {selectedTimeInSeconds !== null && (
              <div className="absolute top-4 left-4 z-10 bg-slate-900/95 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800 text-[10px] text-slate-300 font-extrabold flex items-center gap-2.5 shadow-lg animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="font-mono text-[11px] bg-slate-800 text-white px-2 py-0.5 rounded">{Math.floor(selectedTimeInSeconds / 60).toString().padStart(2, '0')}:{(selectedTimeInSeconds % 60).toString().padStart(2, '0')}</span>
                <button 
                  onClick={() => setSelectedTimeInSeconds(null)}
                  className="bg-black/30 hover:bg-black/60 text-slate-400 hover:text-white border border-white/5 text-[9px] px-2 py-0.5 rounded-lg transition-all duration-200 cursor-pointer"
                  title="Kembali ke awal video"
                >
                  Reset ke Awal
                </button>
              </div>
            )}
          </BentoCard>
        </div>

        {/* Row 2: Audio Transcript & Assessed Participants (Side-by-Side 70:30 Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-5 items-start">
          {/* Audio Transcript Analysis (70% width) */}
          <div className="lg:col-span-7 w-full">
            <BentoCard id="audio-transcript-analysis" title="Audio Transcript Analysis" className="w-full flex flex-col h-[500px]">
              {/* Controls Toolbar: Search & Filters */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-4 shrink-0 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                {/* Search box */}
                <div className="relative md:col-span-5">
                  <Search size={14} className="absolute left-3 top-2.5 text-text-sub" />
                  <input
                    type="text"
                    placeholder="Cari kata kunci percakapan..."
                    value={transcriptSearch}
                    onChange={(e) => setTranscriptSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary text-text-main bg-white transition-all duration-200"
                  />
                </div>

                {/* Filter by Speaker */}
                <div className="md:col-span-4 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-text-sub uppercase tracking-wider whitespace-nowrap">Pembicara:</span>
                  <select
                    value={selectedSpeaker}
                    onChange={(e) => setSelectedSpeaker(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-text-main focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {['Semua', 'Nafisya', 'John Tosh', 'Fatima', 'Adinda', 'Adi'].map(sp => (
                      <option key={sp} value={sp}>
                        {sp === 'Semua' ? 'Semua Pembicara' : sp === 'Nafisya' ? 'Nafisya (Moderator)' : sp}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filter by Time */}
                <div className="md:col-span-3 flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-text-sub uppercase tracking-wider whitespace-nowrap">Waktu:</span>
                  <select
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-slate-200 bg-white text-text-main focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    {['Semua', '00:00 - 05:00', '05:00 - 10:00', '10:00 - 15:00', '15:00+'].map(tr => (
                      <option key={tr} value={tr}>
                        {tr === 'Semua' ? 'Semua Waktu' : tr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Scrollable list of synced audio transcripts */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 scroll-smooth min-h-[300px] scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 scrollbar-track-transparent">
                {filteredTranscript.length === 0 ? (
                  <div className="text-center py-10 text-text-sub text-xs">
                    Tidak ada transkrip yang cocok dengan filter yang dipilih.
                  </div>
                ) : (
                  filteredTranscript.map((line, index) => {
                    const meta = getSpeakerMeta(line.speaker);
                    const isModerator = line.speaker.toLowerCase().includes('moderator');
                    const itemSeconds = parseTimeToSeconds(line.time);
                    const isActive = selectedTimeInSeconds === itemSeconds;
                    
                    return (
                      <div 
                        key={index} 
                        onClick={() => {
                          setSelectedTimeInSeconds(itemSeconds);
                          const el = document.getElementById('fgd-video-player-card');
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }
                        }}
                        className={`p-3 rounded-xl border transition-all duration-300 hover:shadow-md cursor-pointer flex gap-3 items-start select-none ${
                          isActive
                            ? 'bg-indigo-50/70 border-indigo-500 ring-2 ring-indigo-500/20 shadow-sm'
                            : isModerator 
                              ? 'bg-pink-50/20 border-pink-100/50 hover:border-pink-200/50' 
                              : 'bg-white border-slate-100 hover:border-indigo-200'
                        }`}
                      >
                        {/* Avatar / Initial */}
                        <div className={`w-8 h-8 rounded-full ${meta.avatarBg} font-extrabold text-[10px] flex items-center justify-center shrink-0 shadow-sm border border-black/5`}>
                          {meta.displayName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-xs font-bold text-text-main flex items-center gap-1.5">
                              {meta.displayName}
                              {isModerator && (
                                <span className="text-[8px] font-extrabold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 border border-pink-200 uppercase tracking-wider">
                                  MODERATOR
                                </span>
                              )}
                              {isActive && (
                                <span className="text-[8px] font-black px-1.5 py-0.5 rounded-md bg-indigo-500 text-white animate-pulse uppercase tracking-wider">
                                  SEDANG DIPUTAR
                                </span>
                              )}
                            </span>
                            <span className={`text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full transition-colors flex items-center gap-1 ${
                              isActive 
                                ? 'bg-indigo-500 text-white' 
                                : 'bg-slate-100 group-hover:bg-indigo-50 text-text-sub hover:text-indigo-600'
                            }`}>
                              <Video size={10} className="shrink-0" />
                              {line.time}
                            </span>
                          </div>
                          <p className={`text-xs leading-relaxed whitespace-pre-line ${
                            isActive ? 'text-indigo-950 font-semibold' : 'text-text-sub'
                          }`}>{line.text}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Resume autoscrolling CTA */}
              <button 
                onClick={() => {
                  setSelectedSpeaker('Semua');
                  setSelectedTimeRange('Semua');
                  setTranscriptSearch('');
                }}
                className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 bg-primary/5 hover:bg-primary/10 text-primary rounded-lg text-xs font-bold transition shrink-0"
              >
                <ArrowUpCircle size={14} /> Reset semua filter pencarian
              </button>
            </BentoCard>
          </div>

          {/* Assessed Participants (30% width) */}
          <div className="lg:col-span-3 w-full">
            <BentoCard title="Assessed Participants" className="w-full h-[500px] flex flex-col min-h-0">
              <p className="text-[11px] text-text-sub mb-3 leading-relaxed shrink-0">
                Click a participant card to view their deep AI feedback report & competency metrics.
              </p>
              
              {/* Smooth scrolling scrollable participant container */}
              <div className="flex-1 overflow-y-auto scroll-smooth pr-1 space-y-2.5 select-none scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 scrollbar-track-transparent">
                {displayParticipants.map((p) => {
                  const initials = p.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                  const avatarColors: Record<string, string> = {
                    "2254100011": "bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-blue-400",
                    "225410016": "bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-emerald-400",
                    "225410028": "bg-gradient-to-br from-amber-500 to-orange-600 text-white border-amber-400",
                    "225410073": "bg-gradient-to-br from-purple-500 to-pink-600 text-white border-purple-400",
                  };
                  const colorClass = avatarColors[p.participant_id] || "bg-gradient-to-br from-slate-500 to-slate-600 text-white border-slate-400";

                  return (
                    <button 
                      key={p.participant_id} 
                      onClick={() => setSelectedParticipant(p)}
                      className="w-full flex items-center justify-between p-3 bg-slate-50/80 hover:bg-blue-50/40 hover:border-blue-200 hover:shadow-sm border border-slate-200/50 rounded-xl transition-all duration-300 ease-out text-left group transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${colorClass} border-2 flex items-center justify-center font-bold text-xs shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105`}>
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-text-main group-hover:text-primary transition-colors duration-200 truncate">{p.name}</h4>
                          <p className="text-[9px] text-text-sub font-mono mt-0.5">NIM: {p.nim}</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        <div className="text-right">
                          <div className="text-xs font-extrabold text-primary font-mono">{p.overall.weighted_score} pts</div>
                          <span className="inline-block mt-1 text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-100 uppercase tracking-wider">
                            {p.overall.band}
                          </span>
                        </div>
                        <ChevronRight size={14} className="text-text-sub/40 group-hover:text-primary group-hover:translate-x-0.5 transition shrink-0" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Download Button within Card */}
              <div className="mt-4 pt-4 border-t border-slate-100 shrink-0">
                <a 
                  href="https://drive.google.com/file/d/1jOFcX-mtqmV0H5DG2tFUNTGfVNjYGit2/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer group"
                >
                  <FileText size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                  <span className="text-xs font-black uppercase tracking-wider">Download Berita Acara (PDF)</span>
                </a>
              </div>
            </BentoCard>
          </div>
        </div>

        {/* Row 2.5: Target CPL Achievement & Syllabus Mapping */}
        <div className="w-full">
          <BentoCard 
            title={
              <div className="flex items-center justify-between w-full">
                <span className="flex items-center gap-2">
                  <Award size={16} className="text-primary animate-pulse" />
                  Target Capaian Pembelajaran Lulusan (CPL) Kelompok
                </span>
                {setView && loggedInUser?.role !== 'mahasiswa' && (
                  <button 
                    onClick={() => setView('curriculum')}
                    className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-blue-700 bg-blue-50 hover:bg-blue-100/50 px-3.5 py-1.5 rounded-xl border border-blue-100 transition-all cursor-pointer shadow-xs"
                  >
                    See Detail Curriculum <ChevronRight size={14} />
                  </button>
                )}
              </div>
            }
            className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm"
          >
            <p className="text-xs text-text-sub -mt-2 mb-4 leading-relaxed font-semibold">
              Pemetaan tingkat pencapaian CPL (Capaian Pembelajaran Lulusan) kurikulum UNPAD MANKOM 2020 berdasarkan akumulasi kompetensi dari seluruh anggota kelompok FGD. Klik tombol di kanan atas untuk membandingkan dengan kebutuhan industri secara mendalam.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {[
                { 
                  id: "CPL-KK-01", 
                  domain: "Keterampilan Khusus", 
                  desc: "Mampu berpikir tingkat tinggi (kritis, logis, reflektif, kreatif).",
                  score: 81.5,
                  level: "Sangat Baik"
                },
                { 
                  id: "CPL-PP-01", 
                  domain: "Penguasaan Pengetahuan", 
                  desc: "Menguasai konsep, teori, dan riset komunikasi strategis (komunikasi krisis/SCCT).",
                  score: 80.0,
                  level: "Baik"
                },
                { 
                  id: "CPL-KK-02", 
                  domain: "Keterampilan Khusus", 
                  desc: "Terampil berbicara di depan publik, menyimak secara efektif, dan membaca secara kritis.",
                  score: 78.5,
                  level: "Baik"
                },
                { 
                  id: "CPL-KK-03", 
                  domain: "Keterampilan Khusus", 
                  desc: "Mampu menganalisis situasi, memformulasikan masalah komunikasi, berkolaborasi dan bersaing untuk mengembangkan alternatif solusi.",
                  score: 79.5,
                  level: "Baik"
                },
                { 
                  id: "CPL-KK-05", 
                  domain: "Keterampilan Khusus", 
                  desc: "Mampu merancang, mengimplementasikan, dan mengevaluasi strategi komunikasi.",
                  score: 76.5,
                  level: "Baik"
                },
                { 
                  id: "CPL-KU-05", 
                  domain: "Keterampilan Umum", 
                  desc: "Mampu memelihara/mengembangkan jaringan kerja serta berkolaborasi dengan kolega.",
                  score: 76.8,
                  level: "Baik"
                }
              ].map((cpl) => (
                <div 
                  key={cpl.id} 
                  onClick={() => setView && loggedInUser?.role !== 'mahasiswa' && setView('curriculum')}
                  className={`p-4 bg-slate-50/50 hover:bg-indigo-50/20 hover:border-indigo-100 rounded-xl border border-slate-100 flex flex-col justify-between transition-all duration-200 group shadow-xs hover:shadow-sm ${loggedInUser?.role !== 'mahasiswa' ? 'cursor-pointer' : ''}`}
                  title={loggedInUser?.role !== 'mahasiswa' ? "Klik untuk melihat detail evaluasi kurikulum lengkap" : undefined}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-black text-slate-800">{cpl.id}</span>
                      <span className="text-[8.5px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-100/80 border border-slate-200/50 px-2 py-0.5 rounded">
                        {cpl.domain}
                      </span>
                    </div>
                    <p className="text-[11.5px] text-text-sub font-semibold leading-relaxed line-clamp-2 group-hover:text-text-main transition-colors">
                      {cpl.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100/60 flex items-center justify-between">
                    <div className="flex-1 mr-3">
                      <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                        <span>Pencapaian Rata-Rata</span>
                        <span className="font-mono text-primary font-black">{cpl.score}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${cpl.score}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[9px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                        {cpl.level}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>
        </div>



        {/* Methodology Notes */}
        <div className="w-full mt-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-200/60 rounded-xl transition-all duration-200 overflow-hidden shadow-xs">
          <button
            onClick={() => setIsMethodologyExpanded(!isMethodologyExpanded)}
            className="w-full flex items-center justify-between p-4 text-left select-none outline-none focus:outline-none"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1.5 bg-slate-100 text-slate-500 rounded-lg shrink-0">
                <Info size={14} className="text-slate-500" />
              </span>
              <span className="text-xs font-bold text-slate-700">Metodologi & Batasan Analisis (Methodology Notes)</span>
            </div>
            {isMethodologyExpanded ? (
              <ChevronDown size={14} className="text-slate-500 transition-transform duration-200" />
            ) : (
              <ChevronRight size={14} className="text-slate-400 transition-transform duration-200" />
            )}
          </button>
          
          {isMethodologyExpanded && (
            <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4 text-xs text-slate-600 leading-relaxed">
              <div>
                <span className="font-bold text-slate-800 block mb-0.5">Evidence Principle:</span>
                <p className="text-slate-500">No Evidence, No Grade — setiap skor indikator dengan confidence 'tinggi'/'sedang' ditautkan ke kutipan transkrip bertimestamp.</p>
              </div>
              <div>
                <span className="font-bold text-slate-800 block mb-0.5">Human in the Loop:</span>
                <p className="text-slate-500">Seluruh skor adalah rekomendasi awal AI. Keputusan & nilai final wajib divalidasi dosen.</p>
              </div>
              <div>
                <span className="font-bold text-slate-800 block mb-0.5">Limitations (Batasan):</span>
                <ul className="list-disc ml-4 mt-1 space-y-1.5 text-slate-500">
                  <li>Indikator Gesture (GEN-05) & Facial Expression (GEN-06) dinilai dari screenshot frame statis tunggal — confidence rendah, tidak valid sebagai dasar keputusan. John Tosh bermasker sehingga ekspresi tidak terbaca.</li>
                  <li>Indikator Conflict Resolution (GEN-07) berbukti terbatas karena diskusi tidak memunculkan konflik nyata.</li>
                  <li>Transkrip VTT memuat sejumlah artefak speech-to-text (mis. istilah teknis salah eja); penilaian fokus pada substansi makna, bukan ejaan literal.</li>
                  <li>Talk share dihitung dari durasi cue VTT sebagai proksi waktu bicara, bukan dari analisis audio penuh.</li>
                </ul>
              </div>
              <div>
                <span className="font-bold text-slate-800 block mb-0.5">Recommended Next Step:</span>
                <p className="text-slate-500">Untuk produksi nyata, gunakan rekaman video penuh + diarization untuk menilai gesture/facial/turn-taking secara valid (Phase 2 FRD).</p>
              </div>
            </div>
          )}
        </div>
    </div>
  );
}

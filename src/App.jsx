import React, { useState, useMemo, useEffect } from "react";
import {
  Calendar, DollarSign, FileText, Bot, Home, Menu, X, Plus,
  TrendingUp, TrendingDown, CheckCircle2, Lock, Search, Send,
  ChevronRight, Stethoscope, ShieldCheck, ArrowRight, Clock,
  PenLine, Sparkles, MessageCircle, RefreshCw, Link2, Copy,
  ClipboardList, Building2, Trash2, Save, Pencil, FlaskConical,
  Share2, Pill, AlertTriangle, Star, UserPlus, MapPin, Users, Activity, LogIn,
  Printer, Download, StickyNote, FileCheck2, LifeBuoy, Phone, Contact, BedDouble,
  DoorOpen, Syringe, Package, ArrowDownCircle, ArrowUpCircle, History,
  Image, Camera, Paperclip, Tv, Volume2, Monitor, Smartphone, Laptop2
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

/* ---------------------------------------------------------
   DESIGN TOKENS
   ink:      #16202E  (texto principal)
   paper:    #F5F6F8  (fundo, papel clínico)
   primary:  #14213D  (azul-marinho profundo — autoridade/confiança)
   accent:   #C6A15B  (dourado — CTA / plano Pro)
   slate:    #6B8CA3  (secundário / sucesso)
   line:     #D9DCE1  (bordas)
   Display:  Fraunces | Body: Instrument Sans | Dados: Spectral
----------------------------------------------------------*/

const FONT_IMPORT = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=Instrument+Sans:wght@400;500;600&family=Spectral:ital,wght@0,400;0,500;1,400&display=swap');
  .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; letter-spacing: -0.01em; }
  .font-body { font-family: 'Instrument Sans', sans-serif; }
  .font-mono { font-family: 'Spectral', serif; font-variant-numeric: tabular-nums; font-feature-settings: "tnum"; }
  /* Impressão — mostra só o documento assinado, escondendo o resto da tela */
  @media print {
    body * { visibility: hidden; }
    .printable-doc, .printable-doc * { visibility: visible; }
    .printable-doc { position: absolute; top: 0; left: 0; width: 100%; }
  }

  /* Cores da identidade visual (CSS puro, garante renderização independente do build do Tailwind) */
  .c-bg-2E7D46 { background-color: #2E7D46; }
  .c-text-2E7D46 { color: #2E7D46; }
  .hoverc-text-2E7D46:hover { color: #2E7D46; }
  .c-bg-D97706 { background-color: #D97706; }
  .c-text-D97706 { color: #D97706; }
  .c-text-DC2626 { color: #DC2626; }
  .c-bg-B91C1C { background-color: #B91C1C; }
  .c-bg-25D366 { background-color: #25D366; }
  .hoverc-bg-1EBE57:hover { background-color: #1EBE57; }
  .hoverc-text-FFFFFF:hover { color: #fff; }
  .c-text-white70 { color: rgba(255,255,255,0.7); }
  .c-bg-black30 { background-color: rgba(0,0,0,0.3); }
  .c-bg-white10 { background-color: rgba(255,255,255,0.1); }
  .c-text-white75 { color: rgba(255,255,255,0.75); }
  .hoverc-bg-white5:hover { background-color: rgba(255,255,255,0.05); }
  .c-border-white10 { border-color: rgba(255,255,255,0.1); }
  .c-text-white50 { color: rgba(255,255,255,0.5); }
  .c-text-white60 { color: rgba(255,255,255,0.6); }
  .c-bg-white5 { background-color: rgba(255,255,255,0.05); }
  .c-bg-black40 { background-color: rgba(0,0,0,0.4); }
  .c-bg-E6ECF1 { background-color: #E6ECF1; }
  .c-text-3D5A70 { color: #3D5A70; }
  .c-bg-F4E9D2 { background-color: #F4E9D2; }
  .c-text-8A6A24 { color: #8A6A24; }
  .c-bg-E7E9E5 { background-color: #E7E9E5; }
  .c-text-16202E { color: #16202E; }
  .c-border-D9DCE1 { border-color: #D9DCE1; }
  .c-text-6B8CA3 { color: #6B8CA3; }
  .c-bg-14213D { background-color: #14213D; }
  .c-bg-16202E { background-color: #16202E; }
  .c-bg-D9DCE1 { background-color: #D9DCE1; }
  .c-bg-EDEFF3 { background-color: #EDEFF3; }
  .c-bg-F9F5E8 { background-color: #F9F5E8; }
  .hoverc-text-C6A15B:hover { color: #C6A15B; }
  .hoverc-bg-F4E9D2:hover { background-color: #F4E9D2; }
  .c-border-14213D { border-color: #14213D; }
  .c-text-3C4654 { color: #3C4654; }
  .hoverc-border-14213D:hover { border-color: #14213D; }
  .c-text-14213D { color: #14213D; }
  .c-text-C6A15B { color: #C6A15B; }
  .c-bg-F4E9D2-40 { background-color: rgba(244,233,210,0.4); }
  .c-border-EDEFF3 { border-color: #EDEFF3; }
  .c-bg-F4E9D2-20 { background-color: rgba(244,233,210,0.2); }
  .c-text-D9DCE1 { color: #D9DCE1; }
  .c-bg-F5F6F8 { background-color: #F5F6F8; }
  .hoverc-bg-14213D:hover { background-color: #14213D; }
  .c-bg-C6A15B { background-color: #C6A15B; }
  .hoverc-bg-A98649:hover { background-color: #A98649; }
  .c-text-7C3B34 { color: #7C3B34; }
  .c-ring-14213D { box-shadow: 0 0 0 2px #14213D; }
  .hoverc-bg-0B1729:hover { background-color: #0B1729; }
  .c-fill-C6A15B { fill: #C6A15B; }
  .hoverc-text-14213D:hover { color: #14213D; }
  .c-bg-7C3B34 { background-color: #7C3B34; }
  .hoverc-text-16202E:hover { color: #16202E; }
  .hoverc-bg-F5F6F8:hover { background-color: #F5F6F8; }
  .hoverc-text-7C3B34:hover { color: #7C3B34; }
  .c-border-E4D3A8 { border-color: #E4D3A8; }
`;

const PLAN_ORDER = ["basico", "avancado", "pro", "hospital"];

// Limites de acesso (contas de médico e recepção) por plano
const PLAN_SEATS = {
  basico: { medico: 1, recepcao: 1 },
  avancado: { medico: 2, recepcao: 1 },
  pro: { medico: 10, recepcao: 5 },
  hospital: { medico: Infinity, recepcao: Infinity },
};

const PLANS = [
  {
    id: "basico",
    name: "Básico",
    price: "R$ 89",
    tagline: "Organize a rotina do consultório",
    features: ["Agenda médica", "Prontuário eletrônico", "1 acesso médico + 1 acesso recepção"],
    locked: [],
  },
  {
    id: "avancado",
    name: "Avançado",
    price: "R$ 179",
    tagline: "Some o controle financeiro",
    features: ["Agenda médica", "Prontuário eletrônico", "Controle contábil completo", "Farmácia e Estoque", "2 acessos médicos + 1 acesso recepção"],
    locked: [],
    highlight: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "R$ 329",
    tagline: "Clínica completa, com IA de apoio",
    features: ["Agenda médica", "Prontuário eletrônico", "Controle contábil completo", "Farmácia e Estoque", "IA de pesquisa rápida", "Até 10 acessos médicos + 5 recepção"],
    locked: [],
  },
  {
    id: "hospital",
    name: "Hospital",
    price: "Sob consulta",
    tagline: "Redes e hospitais, acesso ilimitado",
    features: ["Agenda médica", "Prontuário eletrônico", "Controle contábil completo", "Farmácia e Estoque", "IA de pesquisa rápida", "Internação hospitalar (setores, quartos e leitos)", "Permissões granulares por setor", "Acessos ilimitados"],
    locked: [],
  },
];

const FEATURE_TABS = [
  {
    id: "agenda",
    label: "Agenda médica",
    icon: Calendar,
    title: "Sua agenda, sem retrabalho",
    description: "Marcações, lembretes automáticos e reorganização de horários em poucos toques — para você e para a recepção.",
    bullets: ["Confirmação automática por WhatsApp/SMS", "Bloqueio de horários e encaixes", "Visão dia, semana e mês"],
  },
  {
    id: "prontuario",
    label: "Prontuário",
    icon: FileText,
    title: "Histórico clínico sempre à mão",
    description: "Registre a consulta, anexe exames e assine digitalmente — tudo com validade jurídica via VidaaS.",
    bullets: ["Busca rápida por paciente", "Anexos de exames e imagens", "Assinatura eletrônica ICP-Brasil"],
  },
  {
    id: "financeiro",
    label: "Financeiro",
    icon: DollarSign,
    title: "Contabilidade sem depender de planilha",
    description: "Entradas e saídas categorizadas automaticamente, com relatórios prontos para o seu contador.",
    bullets: ["Categorias por procedimento, consulta e cirurgia", "Fluxo de caixa mensal", "Exportação em PDF/Excel"],
  },
  {
    id: "ia",
    label: "IA de apoio",
    icon: Bot,
    title: "Dúvidas rápidas, sem trocar de tela",
    description: "Pergunte em linguagem natural e receba respostas objetivas para decisões clínicas e administrativas do dia a dia.",
    bullets: ["Interação medicamentosa", "Códigos e protocolos", "Resumo automático de prontuário"],
  },
];

const COMPARISON_ROWS = [
  { label: "Agenda médica", basico: true, avancado: true, pro: true, hospital: true },
  { label: "Prontuário eletrônico (com histórico completo)", basico: true, avancado: true, pro: true, hospital: true },
  { label: "Assinatura eletrônica (VidaaS)", basico: false, avancado: true, pro: true, hospital: true },
  { label: "Controle contábil (entradas/saídas)", basico: false, avancado: true, pro: true, hospital: true },
  { label: "Relatórios financeiros", basico: false, avancado: true, pro: true, hospital: true },
  { label: "Farmácia (controle de medicações)", basico: false, avancado: true, pro: true, hospital: true },
  { label: "Estoque (demais materiais)", basico: false, avancado: true, pro: true, hospital: true },
  { label: "IA de apoio para dúvidas rápidas", basico: false, avancado: false, pro: true, hospital: true },
  { label: "Internação hospitalar (setores, quartos e leitos)", basico: false, avancado: false, pro: false, hospital: true },
  { label: "Permissões granulares por setor", basico: false, avancado: false, pro: false, hospital: true },
  { label: "Acessos médicos", basico: "1", avancado: "2", pro: "até 10", hospital: "Ilimitado" },
  { label: "Acessos recepção", basico: "1", avancado: "1", pro: "até 5", hospital: "Ilimitado" },
];

const TESTIMONIALS = [
  { name: "Dra. Camila Nogueira", role: "Clínica Geral", quote: "Parei de usar três apps diferentes. Hoje a agenda, o financeiro e o prontuário estão no mesmo lugar." },
  { name: "Dr. Felipe Aguiar", role: "Ortopedista", quote: "A assinatura eletrônica no prontuário economiza um tempo enorme entre um paciente e outro." },
  { name: "Dra. Renata Bicudo", role: "Pediatra", quote: "Consigo ver o fluxo de caixa do mês sem precisar pedir nada para o contador." },
];

const FAQS = [
  { q: "Preciso ter certificado digital para usar a assinatura eletrônica?", a: "Não é necessário comprar nada à parte: a plataforma se integra ao VidaaS, o certificado digital gratuito oferecido pelo CFM." },
  { q: "Posso trocar de plano depois?", a: "Sim, o upgrade ou downgrade pode ser feito a qualquer momento, direto no seu perfil." },
  { q: "Os dados do prontuário são seguros?", a: "Sim, seguimos boas práticas de proteção de dados de saúde, com controle de acesso e criptografia." },
];

const NAV_ITEMS = [
  { id: "dashboard", label: "Início", icon: Home, minPlan: "basico" },
  { id: "agenda", label: "Agenda", icon: Calendar, minPlan: "basico" },
  { id: "pacientes", label: "Pacientes", icon: Users, minPlan: "basico" },
  { id: "prontuario", label: "Prontuário", icon: FileText, minPlan: "basico" },
  { id: "financeiro", label: "Financeiro", icon: DollarSign, minPlan: "avancado" },
  { id: "farmacia", label: "Farmácia", icon: Pill, minPlan: "avancado" },
  { id: "estoque", label: "Estoque", icon: Package, minPlan: "avancado" },
  { id: "ia", label: "IA de apoio", icon: Bot, minPlan: "pro" },
  { id: "equipe", label: "Equipe", icon: Contact, minPlan: "basico" },
  { id: "painel-chamada", label: "Painel de Chamada", icon: Tv, minPlan: "basico" },
  { id: "internacao-busca", label: "Internação", icon: Search, minPlan: "hospital" },
  { id: "internacao", label: "Internação Hospitalar", icon: BedDouble, minPlan: "hospital" },
  { id: "quadro-geral", label: "Quadro Geral", icon: Tv, minPlan: "hospital" },
  { id: "cadastro", label: "Cadastro", icon: Building2, minPlan: "basico" },
  { id: "suporte", label: "Suporte", icon: LifeBuoy, minPlan: "basico" },
];

// Papel "recepção" — acesso restrito, sem prontuário, atendimento clínico, financeiro ou IA.
// Serve para clínicas com múltiplos usuários (recurso do plano Pro).
const RECEPTION_ALLOWED_TABS = ["dashboard", "agenda", "pacientes", "suporte"];

// Módulos ("setores") que o usuário mestre do plano Hospital pode conceder,
// individualmente, a cada funcionário que ele cadastrar.
const HOSPITAL_MODULES = [
  { id: "agenda", label: "Agenda" },
  { id: "atendimento", label: "Atendimento" },
  { id: "pacientes", label: "Dados dos pacientes" },
  { id: "prontuario", label: "Prontuário" },
  { id: "financeiro", label: "Finanças" },
  { id: "farmacia", label: "Farmácia" },
  { id: "estoque", label: "Estoque" },
  { id: "internacao-busca", label: "Internação (busca)" },
  { id: "internacao", label: "Internação Hospitalar" },
  { id: "quadro-geral", label: "Quadro Geral (TV do setor)" },
  { id: "cadastro", label: "Cadastro da clínica" },
  { id: "ia", label: "IA de apoio" },
];

// Telas sempre liberadas pra qualquer usuário, em qualquer plano
const ALWAYS_ALLOWED_TABS = ["dashboard", "suporte"];

const initialHospitalUsers = [
  { id: 1, name: "Você (usuário mestre)", email: "voce@hospital.com.br", isAdmin: true, allowedModules: [] },
];

function planAllows(userPlan, minPlan) {
  return PLAN_ORDER.indexOf(userPlan) >= PLAN_ORDER.indexOf(minPlan);
}

function formatBirthDate(isoDate) {
  if (!isoDate) return null;
  const [y, m, d] = isoDate.split("-");
  if (!y || !m || !d) return null;
  return `${d}/${m}/${y}`;
}

function patientLabel(p) {
  const bd = formatBirthDate(p.birthDate);
  return bd ? `${p.name} - ${bd}` : p.name;
}

// Calcula o status de chegada do paciente a partir do horário agendado:
// chegou (verde) · aguardando (cinza, dentro de 15min) · atrasado (laranja, 15-45min) · não compareceu (vermelho, 45min+)
function checkinStatus(appointment, now) {
  if (appointment.checkinAt) return "chegou";
  const [h, m] = appointment.time.split(":").map(Number);
  const scheduled = new Date(now);
  scheduled.setHours(h, m, 0, 0);
  const diffMin = (now - scheduled) / 60000;
  if (diffMin >= 45) return "nao_compareceu";
  if (diffMin >= 15) return "atrasado";
  return "aguardando";
}

const CHECKIN_LABELS = {
  chegou: "Chegou",
  aguardando: "Aguardando",
  atrasado: "Atrasado (15min+)",
  nao_compareceu: "Não compareceu (45min+)",
};

function CheckinDot({ status }) {
  const cls = {
    chegou: "c-bg-2E7D46",
    aguardando: "c-bg-D9DCE1",
    atrasado: "c-bg-D97706",
    nao_compareceu: "c-bg-B91C1C",
  }[status];
  return <span className={`inline-block w-2.5 h-2.5 rounded-full ${cls}`} title={CHECKIN_LABELS[status]} />;
}

/* ---------------------------------------------------------
   MOCK DATA
----------------------------------------------------------*/

const initialAppointments = [
  { id: 1, time: "08:00", patient: "Marina Costa", type: "Consulta", status: "confirmado", priority: "rotina", checkinAt: null },
  { id: 2, time: "09:00", patient: "João Pereira", type: "Retorno", status: "confirmado", priority: "rotina", checkinAt: null },
  { id: 3, time: "10:30", patient: "Helena Duarte", type: "Procedimento", status: "aguardando", priority: "importante", checkinAt: null },
  { id: 4, time: "14:00", patient: "Ricardo Alves", type: "Consulta", status: "confirmado", priority: "rotina", checkinAt: null },
  { id: 5, time: "15:30", patient: "Beatriz Lima", type: "Cirurgia (avaliação)", status: "aguardando", priority: "importante", checkinAt: null },
];

const initialTransactions = [
  { id: 1, date: "01/07", type: "entrada", category: "Consulta médica", amount: 350 },
  { id: 2, date: "02/07", type: "entrada", category: "Procedimento", amount: 620 },
  { id: 3, date: "03/07", type: "saida", category: "Aluguel", amount: 2800 },
  { id: 4, date: "04/07", type: "saida", category: "Taxa de máquina", amount: 145 },
  { id: 5, date: "05/07", type: "entrada", category: "Cirurgia", amount: 4200 },
  { id: 6, date: "07/07", type: "saida", category: "Marketing", amount: 380 },
  { id: 7, date: "08/07", type: "saida", category: "Impostos", amount: 910 },
  { id: 8, date: "09/07", type: "entrada", category: "Consulta médica", amount: 350 },
];

const ENTRADA_CATEGORIES = ["Consulta médica", "Procedimento", "Cirurgia", "Outra"];
const SAIDA_CATEGORIES = ["Impostos", "Marketing", "Aluguel", "Taxa de máquina", "Outra"];

const initialPatients = [
  {
    id: 1,
    name: "Marina Costa",
    birthDate: "1988-04-12",
    lastVisit: "01/07/2026",
    records: [
      { id: 1, date: "01/07/2026", note: "Consulta de rotina. Pressão arterial normal. Retorno em 3 meses.", signed: true },
    ],
    vitals: [
      { id: 1, data: "01/07/2026", peso: "68", altura: "165", imc: "25.0", pressaoSistolica: "120", pressaoDiastolica: "80", satO2: "98", frequenciaCardiaca: "72", pulso: "72", frequenciaRespiratoria: "16", cintura: "78", abdomen: "82", glicemiaJejum: "88", glicemiaPosPrandial: "110", alergias: "NEGA" },
    ],
  },
  {
    id: 2,
    name: "João Pereira",
    birthDate: "1975-11-30",
    lastVisit: "28/06/2026",
    records: [
      { id: 1, date: "10/05/2026", note: "Queixa de dor lombar. Solicitado raio-X.", signed: true },
      { id: 2, date: "28/06/2026", note: "Retorno: raio-X sem alterações. Encaminhado à fisioterapia.", signed: false },
    ],
    vitals: [],
  },
  {
    id: 3,
    name: "Helena Duarte",
    birthDate: "1992-02-08",
    lastVisit: "20/06/2026",
    records: [
      { id: 1, date: "20/06/2026", note: "Avaliação pré-procedimento. Exames em dia.", signed: false },
    ],
    vitals: [],
  },
];

const AI_SUGGESTIONS = [
  "Interações entre dipirona e varfarina?",
  "Código TUSS para consulta de retorno",
  "Protocolo atual para hipertensão estágio 1",
];

const defaultProntuarioTemplates = [
  { id: 1, title: "Consulta de rotina", text: "Paciente assintomático. Exame físico sem alterações. Orientações gerais fornecidas." },
  { id: 2, title: "Retorno pós-procedimento", text: "Paciente em bom estado geral. Ferida operatória em processo de cicatrização normal. Sem sinais de infecção." },
];

const defaultExamShortcuts = [
  { id: 1, name: "Hemograma completo" },
  { id: 2, name: "Glicemia de jejum" },
  { id: 3, name: "TSH e T4 livre" },
  { id: 4, name: "Raio-X de tórax" },
];

const defaultReferralOptions = [
  { id: 1, specialty: "Cardiologia" },
  { id: 2, specialty: "Ortopedia" },
  { id: 3, specialty: "Fisioterapia" },
];

// Estrutura de internação: Setor → Quarto → Leitos. patientName é livre (texto), já que
// nem todo paciente internado precisa estar no cadastro ambulatorial de Pacientes.
// Tudo aqui (setores, quartos, leitos) é gerenciável pelo usuário principal do plano Hospital.
const initialSectors = [
  {
    id: "setor-enfermaria",
    name: "Enfermaria",
    rooms: [
      {
        id: "quarto-101",
        name: "101",
        beds: [
          { id: "101-A", label: "Leito A", patientName: "Marina Costa", admittedAt: "10/07/2026", status: "Enfermaria", evolutions: [], medications: [{ id: 1, name: "Insulina Regular", schedule: "8/8h", administered: false }, { id: 2, name: "Dobutamina", schedule: "contínuo", administered: false }], idade: 45, sexo: "Feminino", comorbidades: "Diabetes tipo 2", motivoInternacao: "Cetoacidose diabética", observacoes: "Paciente em dieta hipocalórica, Glasgow 8" },
          { id: "101-B", label: "Leito B", patientName: null, admittedAt: null, evolutions: [], medications: [], idade: null, sexo: "", comorbidades: "", motivoInternacao: "", observacoes: "" },
        ],
      },
      {
        id: "quarto-102",
        name: "102",
        beds: [
          { id: "102-A", label: "Leito A", patientName: "João Pereira", admittedAt: "08/07/2026", status: "Pós-operatório", evolutions: [], medications: [], idade: 64, sexo: "Masculino", comorbidades: "HAS, Alzheimer", motivoInternacao: "Demência, epilepsia", observacoes: "Paciente com necessidade de sonda nasoenteral" },
          { id: "102-B", label: "Leito B", patientName: null, admittedAt: null, evolutions: [], medications: [], idade: null, sexo: "", comorbidades: "", motivoInternacao: "", observacoes: "" },
        ],
      },
    ],
  },
  {
    id: "setor-uti",
    name: "UTI",
    rooms: [
      { id: "quarto-uti-1", name: "UTI 01", beds: [
        { id: "uti-1-A", label: "Leito A", patientName: null, admittedAt: null, evolutions: [], medications: [], idade: null, sexo: "", comorbidades: "", motivoInternacao: "", observacoes: "" },
      ]},
    ],
  },
  { id: "setor-recuperacao", name: "Recuperação", rooms: [] },
  { id: "setor-triagem", name: "Triagem", rooms: [] },
];

// Classificação de risco por cores (protocolo de triagem) — exclusiva do plano Hospital.
// Quem categoriza é a enfermagem (via permissões granulares), não o médico.
const RISK_LEVELS = [
  { id: "vermelho", name: "Vermelho", label: "Emergência", time: "Imediato", maxMinutes: 0, color: "#B91C1C", bg: "#FDECEA",
    criteria: ["Parada cardiorrespiratória ou risco iminente", "Via aérea comprometida", "Inconsciência / rebaixamento súbito", "Hemorragia grave e não controlada", "Sinais vitais gravemente alterados (choque)"] },
  { id: "laranja", name: "Laranja", label: "Muito urgente", time: "Até 10 min", maxMinutes: 10, color: "#D97706", bg: "#FDF0E6",
    criteria: ["Dor intensa (EVA 8-10)", "Alteração aguda do nível de consciência", "Dispneia importante", "Sinais vitais alterados sem risco de morte imediato", "Sangramento moderado ativo"] },
  { id: "amarelo", name: "Amarelo", label: "Urgente", time: "Até 60 min", maxMinutes: 60, color: "#C6A15B", bg: "#FDF8E7",
    criteria: ["Dor moderada (EVA 4-7)", "Febre alta associada a outros sintomas", "Vômitos persistentes", "Sinais vitais discretamente alterados", "Doença crônica descompensada"] },
  { id: "verde", name: "Verde", label: "Pouco urgente", time: "Até 120 min", maxMinutes: 120, color: "#2E7D46", bg: "#EAF6EF",
    criteria: ["Dor leve (EVA 1-3)", "Sintomas estáveis há mais de 24h", "Sinais vitais dentro da normalidade", "Queixa localizada sem sinais de gravidade"] },
  { id: "azul", name: "Azul", label: "Não urgente", time: "Até 240 min", maxMinutes: 240, color: "#3D5A70", bg: "#EAF1F8",
    criteria: ["Consulta de rotina / renovação de receita", "Queixas crônicas sem sinais de alarme", "Procedimento agendado / retorno", "Ausência de sintomas agudos"] },
];

// Setores de alta agilidade: classificação de risco de 1 toque (sem checklist).
// Os demais setores usam o fluxo clínico, com critérios detalhados.
const FAST_TRACK_SECTOR_NAMES = ["Pronto Socorro", "Emergência", "Urgência", "UTI", "Centro Cirúrgico de Emergência"];

function isFastTrackSector(sectorName) {
  return FAST_TRACK_SECTOR_NAMES.includes(sectorName);
}

// Status possíveis do paciente internado — editável pelo usuário principal (ver tela "Internação")
const DEFAULT_STATUS_OPTIONS = [
  "Enfermaria",
  "Internação",
  "UTI",
  "Berçário",
  "Triagem",
  "Pré-operatório",
  "Pós-operatório",
  "Sala de medicação",
  "Sala de procedimento",
];

// Setores para transferência de paciente — recurso a partir do plano Avançado.
// Editável pelo usuário (ver Pacientes > Gerenciar setores de transferência).
const DEFAULT_TRANSFER_SECTORS = [
  "Recepção",
  "Triagem",
  "Pronto Atendimento",
  "Sala de Medicação",
  "Sala de Procedimento",
  "Consultório",
  "Internação",
];

// Salas de atendimento — cadastradas pelo usuário administrador (ver tela Cadastro).
// O médico é obrigado a escolher uma delas ao abrir a Agenda, pra saber onde chamar o paciente.
const DEFAULT_ROOMS = ["Consultório 1", "Consultório 2"];

// Dados iniciais da Farmácia (medicações) e do Estoque (demais materiais).
// Cada item guarda a quantidade atual + um histórico de movimentações (entrada/saída).
const initialPharmacyItems = [
  { id: 1, name: "Dipirona 500mg", unit: "comprimidos", quantity: 200, minQuantity: 30, movements: [] },
  { id: 2, name: "Soro Fisiológico 0,9% 500ml", unit: "frascos", quantity: 50, minQuantity: 10, movements: [] },
  { id: 3, name: "Paracetamol 750mg", unit: "comprimidos", quantity: 150, minQuantity: 30, movements: [] },
  { id: 4, name: "Adrenalina 1mg/ml", unit: "ampolas", quantity: 20, minQuantity: 5, movements: [] },
];

const initialStockItems = [
  { id: 1, name: "Luvas descartáveis", unit: "caixas", quantity: 30, minQuantity: 5, movements: [] },
  { id: 2, name: "Seringas 10ml", unit: "unidades", quantity: 100, minQuantity: 20, movements: [] },
  { id: 3, name: "Álcool 70%", unit: "litros", quantity: 15, minQuantity: 3, movements: [] },
  { id: 4, name: "Gaze estéril", unit: "pacotes", quantity: 50, minQuantity: 10, movements: [] },
  { id: 5, name: "Máscaras cirúrgicas", unit: "caixas", quantity: 20, minQuantity: 5, movements: [] },
];

// Medicamentos de receita simples — curadoria representativa a partir das listas
// oficiais (RENAME, REMUME São Paulo/Guarulhos, ANVISA). Não é a lista completa
// (que soma mais de 300 itens em cada fonte) — é uma amostra para o protótipo.
const SIMPLE_DRUGS = [
  "Dipirona 500mg", "Amoxicilina 500mg", "Ibuprofeno 600mg", "Paracetamol 750mg",
  "Ácido acetilsalicílico 100mg", "Ácido fólico 5mg", "Alopurinol 100mg",
  "Anlodipino 5mg", "Atenolol 50mg", "Azitromicina 500mg", "Captopril 25mg",
  "Cefalexina 500mg", "Ciprofloxacino 500mg", "Doxiciclina 100mg", "Enalapril 20mg",
  "Furosemida 40mg", "Hidroclorotiazida 25mg", "Loratadina 10mg", "Losartana potássica 50mg",
  "Metformina 850mg", "Nifedipino 20mg", "Omeprazol 20mg", "Prednisona 20mg",
  "Propranolol 40mg", "Sinvastatina 20mg", "Varfarina sódica 5mg",
];

// Medicamentos de controle especial — cada um com o tipo/cor de receituário exigido
// pela Portaria SVS/MS nº 344/1998 (atualizada). Curadoria representativa, com base
// nas mesmas listas oficiais. IMPORTANTE: antes de ir para produção, essa
// classificação precisa ser validada por um farmacêutico responsável — um erro
// aqui tem consequência legal e clínica real.
const CONTROLLED_DRUGS = [
  { name: "Diazepam 10mg", control: "B1 (azul)" },
  { name: "Clonazepam 2mg", control: "B1 (azul)" },
  { name: "Fenobarbital 100mg", control: "B1 (azul)" },
  { name: "Clorpromazina 25mg", control: "C1 (branca, 2 vias)" },
  { name: "Haloperidol 5mg", control: "C1 (branca, 2 vias)" },
  { name: "Amitriptilina 25mg", control: "C1 (branca, 2 vias)" },
  { name: "Carbamazepina 200mg", control: "C1 (branca, 2 vias)" },
  { name: "Risperidona 2mg", control: "C1 (branca, 2 vias)" },
  { name: "Sertralina 50mg", control: "C1 (branca, 2 vias)" },
  { name: "Fluoxetina 20mg", control: "C1 (branca, 2 vias)" },
  { name: "Ácido valproico 500mg", control: "C1 (branca, 2 vias)" },
  { name: "Isotretinoína (uso oral)", control: "C2 (branca, 2 vias)" },
  { name: "Tramadol 50mg", control: "A1 (amarela)" },
  { name: "Morfina 30mg (liberação modificada)", control: "A1 (amarela)" },
  { name: "Metilfenidato 10mg", control: "A3 (amarela)" },
];

// Tabela de CID-10 — classificação pública da OMS/DATASUS. Lista com os
// códigos mais usados no dia a dia; pode ser ampliada depois com a tabela
// oficial completa (~14 mil códigos) vinda de uma base de dados real.
const CID10_TABLE = [
  // Capítulo I — Doenças infecciosas e parasitárias
  { code: "A00", name: "Cólera" },
  { code: "A09", name: "Diarreia e gastroenterite de origem infecciosa presumível" },
  { code: "A15", name: "Tuberculose respiratória, com confirmação bacteriológica e histológica" },
  { code: "A41.9", name: "Septicemia não especificada" },
  { code: "A90", name: "Dengue [dengue clássico]" },
  { code: "A91", name: "Febre hemorrágica devida ao vírus do dengue" },
  { code: "B00.9", name: "Infecção pelo vírus do herpes não especificada" },
  { code: "B01.9", name: "Varicela sem complicações" },
  { code: "B05.9", name: "Sarampo sem complicações" },
  { code: "B24", name: "Doença pelo vírus da imunodeficiência humana [HIV] não especificada" },
  { code: "B34.9", name: "Infecção viral não especificada" },
  { code: "B37.9", name: "Candidíase não especificada" },

  // Capítulo II — Neoplasias
  { code: "C34.9", name: "Neoplasia maligna dos brônquios ou dos pulmões, não especificada" },
  { code: "C50.9", name: "Neoplasia maligna da mama, não especificada" },
  { code: "C53.9", name: "Neoplasia maligna do colo do útero, não especificada" },
  { code: "C61", name: "Neoplasia maligna da próstata" },
  { code: "C18.9", name: "Neoplasia maligna do cólon, não especificada" },
  { code: "D50.9", name: "Anemia por deficiência de ferro não especificada" },

  // Capítulo IV — Doenças endócrinas, nutricionais e metabólicas
  { code: "E03.9", name: "Hipotireoidismo não especificado" },
  { code: "E05.9", name: "Tireotoxicose não especificada" },
  { code: "E10", name: "Diabetes mellitus tipo 1" },
  { code: "E11", name: "Diabetes mellitus tipo 2" },
  { code: "E11.9", name: "Diabetes mellitus tipo 2, sem complicações" },
  { code: "E66.9", name: "Obesidade não especificada" },
  { code: "E78.0", name: "Hipercolesterolemia pura" },
  { code: "E78.5", name: "Hiperlipidemia não especificada" },
  { code: "E86", name: "Depleção de volume (desidratação)" },

  // Capítulo V — Transtornos mentais e comportamentais
  { code: "F10.1", name: "Uso nocivo para a saúde de álcool" },
  { code: "F17.2", name: "Síndrome de dependência de tabaco" },
  { code: "F20.9", name: "Esquizofrenia não especificada" },
  { code: "F31.9", name: "Transtorno afetivo bipolar não especificado" },
  { code: "F32.9", name: "Episódio depressivo não especificado" },
  { code: "F33.9", name: "Transtorno depressivo recorrente não especificado" },
  { code: "F41.1", name: "Transtorno de ansiedade generalizada" },
  { code: "F41.9", name: "Transtorno ansioso não especificado" },
  { code: "F43.1", name: "Estado de estresse pós-traumático" },
  { code: "F50.0", name: "Anorexia nervosa" },
  { code: "F50.2", name: "Bulimia nervosa" },
  { code: "F84.0", name: "Autismo infantil" },
  { code: "F90.0", name: "Transtorno de déficit de atenção e hiperatividade" },

  // Capítulo VI — Doenças do sistema nervoso
  { code: "G40.9", name: "Epilepsia não especificada" },
  { code: "G43.9", name: "Enxaqueca não especificada" },
  { code: "G47.0", name: "Distúrbios do início e da manutenção do sono (insônia)" },
  { code: "G47.3", name: "Apneia do sono" },

  // Capítulo VII — Doenças do olho
  { code: "H10.9", name: "Conjuntivite não especificada" },
  { code: "H52.1", name: "Miopia" },
  { code: "H52.4", name: "Presbiopia" },
  { code: "H65.9", name: "Otite média não supurativa não especificada" },
  { code: "H66.9", name: "Otite média não especificada" },
  { code: "H81.1", name: "Vertigem paroxística benigna" },

  // Capítulo IX — Doenças do aparelho circulatório
  { code: "I10", name: "Hipertensão essencial (primária)" },
  { code: "I20.9", name: "Angina pectoris não especificada" },
  { code: "I21.9", name: "Infarto agudo do miocárdio não especificado" },
  { code: "I25.9", name: "Doença isquêmica crônica do coração não especificada" },
  { code: "I48", name: "Fibrilação e flutter atrial" },
  { code: "I50.0", name: "Insuficiência cardíaca congestiva" },
  { code: "I63.9", name: "Acidente vascular cerebral isquêmico não especificado" },
  { code: "I83.9", name: "Varizes dos membros inferiores sem úlcera ou inflamação" },
  { code: "I84.9", name: "Hemorroidas não especificadas" },

  // Capítulo X — Doenças do aparelho respiratório
  { code: "J00", name: "Nasofaringite aguda (resfriado comum)" },
  { code: "J01.9", name: "Sinusite aguda não especificada" },
  { code: "J02.9", name: "Faringite aguda não especificada" },
  { code: "J03.9", name: "Amigdalite aguda não especificada" },
  { code: "J06.9", name: "Infecção aguda das vias aéreas superiores não especificada" },
  { code: "J11.1", name: "Influenza com outras manifestações respiratórias" },
  { code: "J18.9", name: "Pneumonia não especificada" },
  { code: "J20.9", name: "Bronquite aguda não especificada" },
  { code: "J44.9", name: "Doença pulmonar obstrutiva crônica não especificada" },
  { code: "J45", name: "Asma" },
  { code: "J45.0", name: "Asma predominantemente alérgica" },
  { code: "J45.9", name: "Asma não especificada" },

  // Capítulo XI — Doenças do aparelho digestivo
  { code: "K02.9", name: "Cárie dentária não especificada" },
  { code: "K21.0", name: "Doença de refluxo gastroesofágico com esofagite" },
  { code: "K25.9", name: "Úlcera gástrica não especificada" },
  { code: "K29.7", name: "Gastrite não especificada" },
  { code: "K35.9", name: "Apendicite aguda não especificada" },
  { code: "K52.9", name: "Gastroenterite e colite não infecciosas não especificadas" },
  { code: "K57.9", name: "Doença diverticular do intestino não especificada" },
  { code: "K59.0", name: "Constipação" },
  { code: "K59.1", name: "Diarreia funcional" },
  { code: "K80.2", name: "Cálculo da vesícula biliar sem colecistite" },

  // Capítulo XII — Doenças da pele
  { code: "L03.9", name: "Celulite não especificada" },
  { code: "L20.9", name: "Dermatite atópica não especificada" },
  { code: "L23.9", name: "Dermatite alérgica de contato não especificada" },
  { code: "L30.9", name: "Dermatite não especificada" },
  { code: "L50.9", name: "Urticária não especificada" },
  { code: "L70.0", name: "Acne vulgar" },

  // Capítulo XIII — Doenças do sistema osteomuscular
  { code: "M17.9", name: "Gonartrose não especificada" },
  { code: "M25.5", name: "Dor articular" },
  { code: "M45", name: "Espondilite ancilosante" },
  { code: "M54.2", name: "Cervicalgia" },
  { code: "M54.5", name: "Dor lombar baixa" },
  { code: "M62.6", name: "Distensão muscular" },
  { code: "M79.1", name: "Mialgia" },
  { code: "M79.7", name: "Fibromialgia" },

  // Capítulo XIV — Doenças do aparelho geniturinário
  { code: "N18.9", name: "Doença renal crônica não especificada" },
  { code: "N20.0", name: "Cálculo do rim" },
  { code: "N30.9", name: "Cistite não especificada" },
  { code: "N39.0", name: "Infecção do trato urinário não especificada" },
  { code: "N40", name: "Hiperplasia da próstata" },
  { code: "N76.0", name: "Vaginite aguda" },
  { code: "N92.0", name: "Menstruação excessiva e frequente com ciclo regular" },

  // Capítulo XV — Gravidez, parto e puerpério
  { code: "O26.9", name: "Afecção relacionada com a gravidez não especificada" },
  { code: "O80", name: "Parto único espontâneo" },
  { code: "Z32.1", name: "Gravidez confirmada" },
  { code: "Z34.9", name: "Supervisão de gravidez normal, não especificada" },

  // Capítulo XVIII — Sintomas, sinais e achados anormais
  { code: "R05", name: "Tosse" },
  { code: "R10.4", name: "Dor abdominal não especificada" },
  { code: "R11", name: "Náusea e vômitos" },
  { code: "R42", name: "Tontura e instabilidade" },
  { code: "R50.9", name: "Febre não especificada" },
  { code: "R51", name: "Cefaleia" },
  { code: "R53", name: "Mal-estar e fadiga" },
  { code: "R55", name: "Síncope e colapso" },

  // Capítulo XIX — Lesões, envenenamento e outras causas externas
  { code: "S06.9", name: "Traumatismo intracraniano não especificado" },
  { code: "S52.9", name: "Fratura do antebraço não especificada" },
  { code: "S93.4", name: "Entorse e distensão do tornozelo" },
  { code: "T14.9", name: "Traumatismo não especificado" },

  // Capítulo XXI — Fatores que influenciam o estado de saúde
  { code: "Z00.0", name: "Exame médico geral" },
  { code: "Z01.0", name: "Exame de olhos e da visão" },
  { code: "Z23", name: "Necessidade de imunização contra doença bacteriana única" },
  { code: "Z51.1", name: "Sessão de quimioterapia por neoplasia" },
  { code: "Z71.3", name: "Aconselhamento e orientação sobre dieta e regime alimentar" },
];

function cidLookup(query) {
  if (!query || query.trim().length < 2) return [];
  const q = query.trim().toUpperCase().replace(/\s+/g, "");
  return CID10_TABLE.filter(
    (c) => c.code.replace(".", "").startsWith(q.replace(".", "")) || c.name.toUpperCase().includes(query.trim().toUpperCase())
  ).slice(0, 6);
}

function cidExactMatch(code) {
  if (!code) return null;
  const q = code.trim().toUpperCase();
  return CID10_TABLE.find((c) => c.code.toUpperCase() === q) || null;
}

// Campo de CID-10 reutilizável: busca por código ou nome, com sugestões e
// exibição do nome da doença assim que o código bate com a tabela.
function CidField({ value, onChange, label = "CID-10 (opcional)" }) {
  const [focused, setFocused] = useState(false);
  const suggestions = focused ? cidLookup(value) : [];
  const exact = cidExactMatch(value);

  return (
    <div className="relative mb-2">
      {label && <p className="font-body text-xs uppercase tracking-wide c-text-6B8CA3 mb-2">{label}</p>}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        placeholder="Digite o código (ex.: J45) ou o nome da doença"
        className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
      />
      {exact && (
        <p className="font-body text-xs c-text-14213D mt-1 flex items-center gap-1">
          <CheckCircle2 size={12} /> {exact.code} — {exact.name.toUpperCase()}
        </p>
      )}
      {focused && !exact && suggestions.length > 0 && (
        <div className="absolute z-10 left-0 right-0 mt-1 bg-white border c-border-D9DCE1 rounded-lg shadow-lg overflow-hidden">
          {suggestions.map((s) => (
            <button
              key={s.code}
              onMouseDown={() => onChange(s.code)}
              className="w-full text-left px-3 py-2 font-body text-xs hoverc-bg-F5F6F8 border-b c-border-EDEFF3 last:border-0"
            >
              <span className="font-mono c-text-14213D">{s.code}</span> — {s.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   SMALL UI PRIMITIVES
----------------------------------------------------------*/

function Badge({ children, tone = "sage" }) {
  const tones = {
    sage: "c-bg-E6ECF1 c-text-3D5A70",
    accent: "c-bg-F4E9D2 c-text-8A6A24",
    ink: "c-bg-E7E9E5 c-text-16202E",
  };
  return (
    <span className={`font-body text-xs font-medium px-2.5 py-1 rounded-full ${tones[tone]}`}>
      {children}
    </span>
  );
}

// Badge visual da cor de risco atual do paciente
function RiskBadge({ riskId, size = "normal" }) {
  if (!riskId) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-body c-bg-E7E9E5 c-text-6B8CA3 border c-border-D9DCE1">
        Sem classificação
      </span>
    );
  }
  const risk = RISK_LEVELS.find((r) => r.id === riskId);
  if (!risk) return null;
  const pad = size === "large" ? "px-3 py-1 text-sm" : "px-2 py-0.5 text-xs";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-body font-medium ${pad}`}
      style={{ backgroundColor: risk.bg, color: risk.color, border: `1px solid ${risk.color}55` }}
    >
      <span className="inline-block rounded-full" style={{ width: 8, height: 8, backgroundColor: risk.color }} />
      {risk.name} · {risk.label}
    </span>
  );
}

// Linha de classificação de 1 toque — usada nos setores de fluxo rápido
function FastTrackRiskRow({ waitMinutes = 0, riskId, onClassify }) {
  const current = RISK_LEVELS.find((r) => r.id === riskId);
  const overdue = current && current.maxMinutes > 0 && waitMinutes > current.maxMinutes;
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span
        className={`inline-flex items-center gap-1 text-xs font-body font-mono ${overdue ? "c-text-DC2626 font-medium" : "c-text-6B8CA3"}`}
      >
        {overdue && <AlertTriangle size={12} />}
        <Clock size={12} /> {waitMinutes} min
      </span>
      <div className="flex items-center gap-1.5">
        {RISK_LEVELS.map((r) => (
          <button
            key={r.id}
            onClick={() => onClassify(r.id)}
            title={`${r.name} — ${r.label}`}
            className="rounded-full flex items-center justify-center"
            style={{
              width: 26,
              height: 26,
              backgroundColor: r.color,
              border: riskId === r.id ? "2px solid white" : "1px solid rgba(0,0,0,0.15)",
              boxShadow: riskId === r.id ? `0 0 0 2px ${r.color}` : "none",
            }}
          >
            {riskId === r.id && <CheckCircle2 size={13} color="#fff" />}
          </button>
        ))}
      </div>
    </div>
  );
}

// Painel de classificação clínica (checklist de critérios) — usado nos demais setores
function ClinicalRiskModal({ patientName, riskId, onClose, onConfirm }) {
  const [checked, setChecked] = useState([]);
  const [note, setNote] = useState("");

  function toggle(key) {
    setChecked((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }

  const suggested = RISK_LEVELS.find((r) => checked.some((k) => k.startsWith(r.id + "|")));

  return (
    <div className="fixed inset-0 c-bg-black40 z-50 flex items-center justify-center p-4">
      <Card className="p-0 max-w-lg w-full max-h-[85vh] overflow-y-auto">
        <div className="c-bg-14213D px-6 py-4 rounded-t-xl">
          <h3 className="font-display text-lg text-white">{patientName}</h3>
          <p className="font-body text-xs c-text-white70 mt-1">Classificação de risco — fluxo clínico</p>
        </div>
        <div className="p-6">
          <p className="font-body text-xs c-text-6B8CA3 mb-4 flex items-center gap-1.5">
            <Activity size={13} /> Marque os critérios observados no paciente
          </p>
          {RISK_LEVELS.map((r) => (
            <div key={r.id} className="mb-4">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-block rounded-full" style={{ width: 9, height: 9, backgroundColor: r.color }} />
                <span className="font-body text-sm font-medium" style={{ color: r.color }}>{r.name} — {r.label}</span>
                <span className="font-body text-xs c-text-6B8CA3">({r.time})</span>
              </div>
              <div className="flex flex-col gap-1 pl-4">
                {r.criteria.map((c, i) => {
                  const key = `${r.id}|${i}`;
                  const marked = checked.includes(key);
                  return (
                    <label key={key} className="flex items-center gap-2 font-body text-xs c-text-3C4654 cursor-pointer">
                      <span
                        onClick={() => toggle(key)}
                        className="rounded flex items-center justify-center flex-shrink-0"
                        style={{ width: 15, height: 15, border: `1.5px solid ${marked ? r.color : "#D9DCE1"}`, backgroundColor: marked ? r.color : "#fff" }}
                      >
                        {marked && <CheckCircle2 size={11} color="#fff" />}
                      </span>
                      {c}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            placeholder="Justificativa clínica (opcional)..."
            className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-xs mb-4"
          />
          {suggested && (
            <p className="font-body text-xs c-text-6B8CA3 mb-3 c-bg-F5F6F8 rounded-lg px-3 py-2">
              Sugestão com base nos critérios: <strong style={{ color: suggested.color }}>{suggested.name}</strong>. Confirme abaixo ou escolha outra cor.
            </p>
          )}
          <p className="font-body text-xs c-text-6B8CA3 mb-2">Confirmar classificação:</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {RISK_LEVELS.map((r) => (
              <button
                key={r.id}
                onClick={() => onConfirm(r.id, note)}
                className="rounded-full font-body text-xs font-medium px-3 py-1.5"
                style={{
                  backgroundColor: suggested?.id === r.id ? r.color : r.bg,
                  color: suggested?.id === r.id ? "#fff" : r.color,
                  border: `1px solid ${r.color}`,
                }}
              >
                {r.name}
              </button>
            ))}
          </div>
          <button onClick={onClose} className="w-full font-body text-xs c-text-6B8CA3 mt-2 py-2">
            Cancelar
          </button>
        </div>
      </Card>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white border c-border-D9DCE1 rounded-2xl ${className}`}>
      {children}
    </div>
  );
}

// Versão compacta da logo (Bastão de Asclépio) — só o símbolo, sem o nome/slogan.
// Traço dourado sem preenchimento, para funcionar tanto em fundo claro quanto na sidebar escura.
function LogoMark({ size = 24, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" className={className}>
      <circle cx="48" cy="48" r="42" fill="none" stroke="#E4C766" strokeWidth="1.6" />
      <circle cx="48" cy="48" r="37" fill="#14213D" />
      <g stroke="#C6A15B" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <line x1="48" y1="26" x2="48" y2="70" />
        <path d="M40,32 C56,38 38,44 56,50 C38,56 56,62 42,68" />
        <path d="M40,32 L36,29 M40,32 L37,35" />
      </g>
      <circle cx="36.5" cy="29" r="1.8" fill="#C6A15B" />
    </svg>
  );
}

/* ---------------------------------------------------------
   FEATURE SHOWCASE (tabs) — inspirado na estrutura do Whitebook
----------------------------------------------------------*/

function FeatureShowcase() {
  const [active, setActive] = useState(FEATURE_TABS[0].id);
  const tab = FEATURE_TABS.find((t) => t.id === active);

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 border-t c-border-D9DCE1">
      <p className="font-body text-xs uppercase tracking-[0.2em] c-text-6B8CA3 mb-3">Conheça a plataforma</p>
      <h2 className="font-display text-3xl mb-8">Um recurso para cada etapa do seu dia</h2>

      <div className="flex flex-wrap gap-2 mb-10">
        {FEATURE_TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-body text-sm font-medium transition-colors border
                ${active === t.id ? "c-bg-14213D text-white c-border-14213D" : "c-border-D9DCE1 c-text-3C4654 hoverc-border-14213D"}`}
            >
              <Icon size={15} /> {t.label}
            </button>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h3 className="font-display text-2xl mb-3">{tab.title}</h3>
          <p className="font-body c-text-3C4654 mb-6 leading-relaxed">{tab.description}</p>
          <ul className="space-y-2">
            {tab.bullets.map((b) => (
              <li key={b} className="flex items-center gap-2 font-body text-sm c-text-16202E">
                <CheckCircle2 size={15} className="c-text-14213D shrink-0" /> {b}
              </li>
            ))}
          </ul>
        </div>
        <Card className="p-8 c-bg-14213D text-white flex flex-col items-center justify-center min-h-[220px]">
          <tab.icon size={40} className="mb-4 c-text-C6A15B" />
          <p className="font-mono text-sm c-text-white70">preview · {tab.label}</p>
        </Card>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   COMPARISON TABLE — matriz de recursos por plano
----------------------------------------------------------*/

function ComparisonTable() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 border-t c-border-D9DCE1">
      <h2 className="font-display text-3xl mb-2">Compare os planos</h2>
      <p className="font-body c-text-3C4654 mb-10">Veja exatamente o que cada plano libera.</p>

      <Card className="overflow-x-auto">
        <table className="w-full text-sm font-body min-w-[640px]">
          <thead>
            <tr className="border-b c-border-D9DCE1">
              <th className="text-left px-6 py-4 font-medium c-text-6B8CA3">Recurso</th>
              <th className="px-6 py-4 font-medium">Básico</th>
              <th className="px-6 py-4 font-medium c-bg-F4E9D2-40">Avançado</th>
              <th className="px-6 py-4 font-medium">Pro</th>
              <th className="px-6 py-4 font-medium">Hospital</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row) => (
              <tr key={row.label} className="border-b c-border-EDEFF3 last:border-0">
                <td className="text-left px-6 py-3.5 c-text-16202E">{row.label}</td>
                {["basico", "avancado", "pro", "hospital"].map((col) => (
                  <td key={col} className={`px-6 py-3.5 text-center ${col === "avancado" ? "c-bg-F4E9D2-20" : ""}`}>
                    {typeof row[col] === "string" ? (
                      <span className="font-mono text-xs c-text-16202E">{row[col]}</span>
                    ) : row[col] ? (
                      <CheckCircle2 size={16} className="inline c-text-14213D" />
                    ) : (
                      <span className="c-text-D9DCE1">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </section>
  );
}

/* ---------------------------------------------------------
   TESTIMONIALS
----------------------------------------------------------*/

function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 border-t c-border-D9DCE1">
      <h2 className="font-display text-3xl mb-10">Quem usa, recomenda</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <Card key={t.name} className="p-6">
            <p className="font-body text-sm c-text-3C4654 leading-relaxed mb-6">"{t.quote}"</p>
            <p className="font-body text-sm font-medium">{t.name}</p>
            <p className="font-body text-xs c-text-6B8CA3">{t.role}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   FAQ (accordion)
----------------------------------------------------------*/

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section className="max-w-3xl mx-auto px-6 py-20 border-t c-border-D9DCE1">
      <h2 className="font-display text-3xl mb-10">Perguntas frequentes</h2>
      <div className="space-y-2">
        {FAQS.map((f, i) => (
          <Card key={f.q} className="overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left font-body text-sm font-medium"
            >
              {f.q}
              <ChevronRight size={16} className={`transition-transform ${open === i ? "rotate-90" : ""}`} />
            </button>
            {open === i && (
              <p className="font-body text-sm c-text-3C4654 px-5 pb-4 leading-relaxed">{f.a}</p>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   LANDING PAGE
----------------------------------------------------------*/

function AuthModal({ mode, onClose, onSubmit }) {
  const isSignup = mode === "signup";
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nomeClinica, setNomeClinica] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center p-4">
      <Card className="p-8 max-w-sm w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-2xl">{isSignup ? "Criar cadastro" : "Entrar"}</h3>
          <button onClick={onClose} className="c-text-6B8CA3 hoverc-text-16202E">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {isSignup && (
            <input
              value={nomeClinica}
              onChange={(e) => setNomeClinica(e.target.value)}
              placeholder="Nome da clínica ou do médico"
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
            />
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            type="email"
            className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
          />
          <input
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            type="password"
            className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
          />
        </div>

        <button
          onClick={onSubmit}
          className="w-full c-bg-14213D text-white font-body text-sm font-medium py-2.5 rounded-lg hoverc-bg-0B1729"
        >
          {isSignup ? "Criar minha conta" : "Entrar"}
        </button>

        <p className="font-body text-xs c-text-6B8CA3 text-center mt-4">
          Simulação de {isSignup ? "cadastro" : "login"} — não requer dados reais neste protótipo.
        </p>
      </Card>
    </div>
  );
}

function CheckoutModal({ plan, onClose, onConfirm }) {
  const [method, setMethod] = useState("CREDIT_CARD"); // CREDIT_CARD | PIX | BOLETO
  const [billingCycle, setBillingCycle] = useState("monthly"); // monthly | annual
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [stage, setStage] = useState("form"); // form | processing | done

  const numericPrice = parseInt(String(plan.price).replace(/\D/g, ""), 10);
  const hasNumericPrice = !isNaN(numericPrice);
  const annualMonthlyEquivalent = hasNumericPrice ? Math.round(numericPrice * 0.9) : null;
  const displayMonthly = billingCycle === "annual" && hasNumericPrice ? annualMonthlyEquivalent : numericPrice;

  function field(key, value) {
    setCard((c) => ({ ...c, [key]: value }));
  }

  function confirm() {
    setStage("processing");
    // Em produção, aqui entra a chamada real:
    // POST /api/payments/subscribe { plano: plan.id, billingType: method, ciclo: billingCycle, ...dadosDoCartao }
    setTimeout(() => {
      setStage("done");
      setTimeout(() => onConfirm(), 900);
    }, 1200);
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center p-4 overflow-y-auto">
      <Card className="p-8 max-w-sm w-full my-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display text-2xl">Fechar plano</h3>
          <button onClick={onClose} className="c-text-6B8CA3 hoverc-text-16202E">
            <X size={18} />
          </button>
        </div>
        <p className="font-body text-sm c-text-6B8CA3 mb-6">Confira os detalhes antes de confirmar</p>

        {hasNumericPrice && (
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`flex-1 py-2 rounded-lg font-body text-xs ${billingCycle === "monthly" ? "c-bg-14213D text-white" : "border c-border-D9DCE1"}`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`flex-1 py-2 rounded-lg font-body text-xs flex items-center justify-center gap-1 ${billingCycle === "annual" ? "c-bg-14213D text-white" : "border c-border-D9DCE1"}`}
            >
              Anual <span className={billingCycle === "annual" ? "c-text-C6A15B" : "c-text-14213D"}>(-10%)</span>
            </button>
          </div>
        )}

        <div className="border c-border-D9DCE1 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-1">
            <span className="font-display text-lg">{plan.name}</span>
            <span className="font-mono text-lg c-text-14213D">
              {hasNumericPrice ? `R$ ${displayMonthly}` : plan.price}
              {hasNumericPrice && <span className="text-xs c-text-6B8CA3">/mês</span>}
            </span>
          </div>
          {billingCycle === "annual" && hasNumericPrice && (
            <p className="font-body text-xs c-text-14213D mb-2">
              Cobrado anualmente: R$ {displayMonthly * 12} · 10% mais barato que o mensal
            </p>
          )}
          <p className="font-body text-xs c-text-6B8CA3 mb-3">{plan.tagline}</p>
          <ul className="space-y-1.5">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 font-body text-xs c-text-3C4654">
                <CheckCircle2 size={13} className="c-text-6B8CA3 shrink-0" /> {f}
              </li>
            ))}
          </ul>
        </div>

        {stage === "done" ? (
          <div className="text-center py-6">
            <CheckCircle2 size={32} className="c-text-14213D mx-auto mb-3" />
            <p className="font-body text-sm font-medium">Forma de pagamento salva!</p>
            <p className="font-body text-xs c-text-6B8CA3">Você não será cobrado agora — só depois dos 14 dias grátis.</p>
          </div>
        ) : (
          <>
            <p className="font-body text-xs uppercase tracking-wide c-text-6B8CA3 mb-2">Forma de pagamento</p>
            <div className="flex gap-2 mb-4">
              {[
                { id: "CREDIT_CARD", label: "Cartão" },
                { id: "PIX", label: "Pix" },
                { id: "BOLETO", label: "Boleto" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`flex-1 py-2 rounded-lg font-body text-xs ${method === m.id ? "c-bg-14213D text-white" : "border c-border-D9DCE1"}`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {method === "CREDIT_CARD" && (
              <div className="space-y-2 mb-4">
                <input
                  value={card.number}
                  onChange={(e) => field("number", e.target.value)}
                  placeholder="Número do cartão"
                  className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
                />
                <input
                  value={card.name}
                  onChange={(e) => field("name", e.target.value)}
                  placeholder="Nome impresso no cartão"
                  className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
                />
                <div className="flex gap-2">
                  <input
                    value={card.expiry}
                    onChange={(e) => field("expiry", e.target.value)}
                    placeholder="MM/AA"
                    className="flex-1 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
                  />
                  <input
                    value={card.cvv}
                    onChange={(e) => field("cvv", e.target.value)}
                    placeholder="CVV"
                    className="flex-1 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
                  />
                </div>
              </div>
            )}
            {method === "PIX" && (
              <p className="font-body text-xs c-text-6B8CA3 mb-4 c-bg-F5F6F8 rounded-lg p-3">
                Ao confirmar, você recebe um QR Code Pix para pagar — a assinatura é ativada assim que o pagamento é confirmado.
              </p>
            )}
            {method === "BOLETO" && (
              <p className="font-body text-xs c-text-6B8CA3 mb-4 c-bg-F5F6F8 rounded-lg p-3">
                Ao confirmar, geramos um boleto mensal que chega por e-mail antes de cada vencimento.
              </p>
            )}

            <p className="font-body text-xs c-text-6B8CA3 mb-4 text-center">
              14 dias grátis · cancele quando quiser · cobrança só após o teste
            </p>

            <div className="flex gap-2">
              <button onClick={onClose} className="flex-1 border c-border-D9DCE1 rounded-lg py-2.5 font-body text-sm">
                Voltar
              </button>
              <button
                onClick={confirm}
                disabled={stage === "processing"}
                className="flex-1 c-bg-C6A15B text-white font-body text-sm font-medium py-2.5 rounded-lg hoverc-bg-A98649 disabled:opacity-60"
              >
                {stage === "processing" ? "Processando…" : "Fechar plano"}
              </button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

const SUPPORT_PHONE = "5511963347762"; // (11) 96334-7762
const SUPPORT_PHONE_DISPLAY = "(11) 96334-7762";

function whatsappSupportLink(message) {
  return `https://wa.me/${SUPPORT_PHONE}?text=${encodeURIComponent(message)}`;
}

function WhatsAppSupportButton() {
  const link = whatsappSupportLink("Olá! Preciso de suporte técnico com a plataforma Kosium.");

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      title="Suporte técnico via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 c-bg-25D366 text-white pl-4 pr-5 py-3 rounded-full shadow-lg hoverc-bg-1EBE57 transition-colors"
    >
      <MessageCircle size={20} />
      <span className="font-body text-sm font-medium hidden sm:inline">Suporte</span>
    </a>
  );
}

const SUPPORT_FAQS = [
  { q: "Como funciona a assinatura eletrônica?", a: "Usamos o VidaaS, certificado digital gratuito do CFM. Veja o passo a passo na aba Prontuário ao assinar qualquer documento." },
  { q: "Posso mudar de plano depois?", a: "Sim, o upgrade ou downgrade pode ser feito a qualquer momento." },
  { q: "Meus dados estão seguros?", a: "Sim, seguimos boas práticas de proteção de dados de saúde (LGPD), com controle de acesso e criptografia." },
];

function HospitalTeamManager({ hospitalUsers, setHospitalUsers }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedModules, setSelectedModules] = useState([]);
  const [editingId, setEditingId] = useState(null);

  function toggleModule(id) {
    setSelectedModules((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]));
  }

  function addUser() {
    if (!name.trim() || !email.trim()) return;
    setHospitalUsers((prev) => [
      ...prev,
      { id: Date.now(), name, email, isAdmin: false, allowedModules: selectedModules },
    ]);
    setName("");
    setEmail("");
    setSelectedModules([]);
  }

  function removeUser(id) {
    setHospitalUsers((prev) => prev.filter((u) => u.id !== id));
    if (editingId === id) setEditingId(null);
  }

  function toggleUserModule(userId, moduleId) {
    setHospitalUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              allowedModules: u.allowedModules.includes(moduleId)
                ? u.allowedModules.filter((m) => m !== moduleId)
                : [...u.allowedModules, moduleId],
            }
          : u
      )
    );
  }

  return (
    <div>
      <Card className="p-6 mb-8">
        <p className="font-body text-sm font-medium mb-4 flex items-center gap-2">
          <UserPlus size={15} /> Cadastrar novo usuário
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
            className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            type="email"
            className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
          />
        </div>
        <p className="font-body text-xs uppercase tracking-wide c-text-6B8CA3 mb-2">
          Setores que esse usuário poderá acessar
        </p>
        <div className="grid sm:grid-cols-2 gap-2 mb-4">
          {HOSPITAL_MODULES.map((m) => (
            <label key={m.id} className="flex items-center gap-2 font-body text-sm border c-border-D9DCE1 rounded-lg px-3 py-2">
              <input type="checkbox" checked={selectedModules.includes(m.id)} onChange={() => toggleModule(m.id)} />
              {m.label}
            </label>
          ))}
        </div>
        <button
          onClick={addUser}
          disabled={!name.trim() || !email.trim()}
          className="w-full c-bg-14213D text-white font-body text-sm font-medium py-2.5 rounded-lg hoverc-bg-0B1729 disabled:opacity-50"
        >
          Cadastrar usuário
        </button>
      </Card>

      <p className="font-body text-sm font-medium mb-4">Usuários da conta</p>
      <div className="space-y-3">
        {hospitalUsers.map((u) => (
          <Card key={u.id} className="p-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <p className="font-body text-sm font-medium flex items-center gap-2">
                  {u.name}
                  {u.isAdmin && <Badge tone="accent">Administrador</Badge>}
                </p>
                <p className="font-body text-xs c-text-6B8CA3">{u.email}</p>
              </div>
              <div className="flex items-center gap-2">
                {!u.isAdmin && (
                  <button
                    onClick={() => setEditingId(editingId === u.id ? null : u.id)}
                    className="font-body text-xs border c-border-D9DCE1 px-3 py-1.5 rounded-lg hoverc-bg-F5F6F8"
                  >
                    {editingId === u.id ? "Concluir" : "Editar acessos"}
                  </button>
                )}
                {!u.isAdmin && (
                  <button onClick={() => removeUser(u.id)} className="c-text-6B8CA3 hoverc-text-7C3B34" title="Remover usuário">
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
            </div>

            {u.isAdmin ? (
              <p className="font-body text-xs c-text-6B8CA3 mt-2">Acesso completo a todos os setores.</p>
            ) : editingId === u.id ? (
              <div className="grid sm:grid-cols-2 gap-2 mt-3 pt-3 border-t c-border-EDEFF3">
                {HOSPITAL_MODULES.map((m) => (
                  <label key={m.id} className="flex items-center gap-2 font-body text-xs">
                    <input
                      type="checkbox"
                      checked={u.allowedModules.includes(m.id)}
                      onChange={() => toggleUserModule(u.id, m.id)}
                    />
                    {m.label}
                  </label>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {u.allowedModules.length === 0 ? (
                  <span className="font-body text-xs c-text-6B8CA3 italic">Nenhum setor liberado ainda</span>
                ) : (
                  u.allowedModules.map((mId) => (
                    <Badge key={mId} tone="sage">{HOSPITAL_MODULES.find((m) => m.id === mId)?.label}</Badge>
                  ))
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

function Equipe({ userPlan, hospitalUsers, setHospitalUsers }) {
  if (userPlan === "hospital") {
    return (
      <div className="p-6 md:p-10 max-w-2xl">
        <h1 className="font-display text-3xl mb-1">Equipe</h1>
        <p className="font-body c-text-6B8CA3 mb-8">
          Como usuário mestre, você escolhe exatamente quais setores cada funcionário pode acessar.
        </p>
        <HospitalTeamManager hospitalUsers={hospitalUsers} setHospitalUsers={setHospitalUsers} />
      </div>
    );
  }

  return <EquipeSeats userPlan={userPlan} />;
}

function EquipeSeats({ userPlan }) {
  const seats = PLAN_SEATS[userPlan];
  const [team, setTeam] = useState([
    { id: 1, name: "Você", email: "voce@clinica.com.br", papel: "medico" },
  ]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [papel, setPapel] = useState("recepcao");

  const medicoCount = team.filter((t) => t.papel === "medico").length;
  const recepcaoCount = team.filter((t) => t.papel === "recepcao").length;
  const medicoFull = medicoCount >= seats.medico;
  const recepcaoFull = recepcaoCount >= seats.recepcao;
  const limitReached = papel === "medico" ? medicoFull : recepcaoFull;

  function addMember() {
    if (!name.trim() || !email.trim() || limitReached) return;
    setTeam((prev) => [...prev, { id: Date.now(), name, email, papel }]);
    setName("");
    setEmail("");
  }

  function seatLabel(n) {
    return n === Infinity ? "ilimitado" : n;
  }

  return (
    <div className="p-6 md:p-10 max-w-2xl">
      <h1 className="font-display text-3xl mb-1">Equipe</h1>
      <p className="font-body c-text-6B8CA3 mb-8">Gerencie os acessos de médicos e recepção da sua conta.</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Card className="p-5">
          <p className="font-body text-xs c-text-6B8CA3 mb-2">Acessos médicos</p>
          <p className="font-mono text-2xl">{medicoCount} <span className="text-sm c-text-6B8CA3">/ {seatLabel(seats.medico)}</span></p>
        </Card>
        <Card className="p-5">
          <p className="font-body text-xs c-text-6B8CA3 mb-2">Acessos recepção</p>
          <p className="font-mono text-2xl">{recepcaoCount} <span className="text-sm c-text-6B8CA3">/ {seatLabel(seats.recepcao)}</span></p>
        </Card>
      </div>

      <Card className="p-6 mb-8">
        <p className="font-body text-sm font-medium mb-4 flex items-center gap-2">
          <UserPlus size={15} /> Convidar novo acesso
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
            className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            type="email"
            className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
          />
        </div>
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setPapel("medico")}
            disabled={medicoFull}
            className={`flex-1 py-2 rounded-lg font-body text-sm disabled:opacity-40 ${papel === "medico" ? "c-bg-14213D text-white" : "border c-border-D9DCE1"}`}
          >
            Médico {medicoFull && "(limite atingido)"}
          </button>
          <button
            onClick={() => setPapel("recepcao")}
            disabled={recepcaoFull}
            className={`flex-1 py-2 rounded-lg font-body text-sm disabled:opacity-40 ${papel === "recepcao" ? "c-bg-14213D text-white" : "border c-border-D9DCE1"}`}
          >
            Recepção {recepcaoFull && "(limite atingido)"}
          </button>
        </div>
        <button
          onClick={addMember}
          disabled={!name.trim() || !email.trim() || limitReached}
          className="w-full c-bg-14213D text-white font-body text-sm font-medium py-2.5 rounded-lg hoverc-bg-0B1729 disabled:opacity-50"
        >
          Adicionar à equipe
        </button>
        {limitReached && (
          <p className="font-body text-xs c-text-7C3B34 mt-3">
            Limite de acessos {papel === "medico" ? "médicos" : "de recepção"} do plano {userPlan} atingido — faça upgrade para adicionar mais.
          </p>
        )}
      </Card>

      <p className="font-body text-sm font-medium mb-4">Membros da equipe</p>
      <div className="space-y-2">
        {team.map((t) => (
          <div key={t.id} className="flex items-center justify-between border c-border-EDEFF3 rounded-lg px-4 py-3">
            <div>
              <p className="font-body text-sm font-medium">{t.name}</p>
              <p className="font-body text-xs c-text-6B8CA3">{t.email}</p>
            </div>
            <Badge tone={t.papel === "medico" ? "ink" : "sage"}>{t.papel === "medico" ? "Médico" : "Recepção"}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function InternacaoBusca({ sectors, setSectors, statusOptions }) {
  const [query, setQuery] = useState("");
  const [selectedBedId, setSelectedBedId] = useState(null);
  const [riskModalBedId, setRiskModalBedId] = useState(null);
  const [waitMinutes, setWaitMinutes] = useState({}); // { [bedId]: minutos } — simulação de tempo de espera

  // Avança o cronômetro de espera dos setores de fluxo rápido (demonstração)
  useEffect(() => {
    const id = setInterval(() => {
      setWaitMinutes((prev) => {
        const next = { ...prev };
        sectors.forEach((sector) => {
          if (!isFastTrackSector(sector.name)) return;
          sector.rooms.forEach((room) =>
            room.beds.forEach((bed) => {
              if (bed.patientName) next[bed.id] = (next[bed.id] || 0) + 1;
            })
          );
        });
        return next;
      });
    }, 5000);
    return () => clearInterval(id);
  }, [sectors]);

  // Lista achatada de todos os pacientes atualmente internados, com localização
  const admitted = [];
  sectors.forEach((sector) =>
    sector.rooms.forEach((room) =>
      room.beds.forEach((bed) => {
        if (bed.patientName) admitted.push({ sector, room, bed });
      })
    )
  );

  const filtered = query.trim()
    ? admitted.filter((a) => a.bed.patientName.toLowerCase().includes(query.toLowerCase()))
    : admitted;

  const fastTrackEntries = filtered.filter((a) => isFastTrackSector(a.sector.name));
  const clinicalEntries = filtered.filter((a) => !isFastTrackSector(a.sector.name));

  const riskOrder = ["vermelho", "laranja", "amarelo", "verde", "azul", undefined];
  fastTrackEntries.sort((a, b) => {
    const g = riskOrder.indexOf(a.bed.risco) - riskOrder.indexOf(b.bed.risco);
    if (g !== 0) return g;
    return (waitMinutes[b.bed.id] || 0) - (waitMinutes[a.bed.id] || 0);
  });

  const selectedEntry = admitted.find((a) => a.bed.id === selectedBedId);
  const riskModalEntry = admitted.find((a) => a.bed.id === riskModalBedId);

  function updateStatus(bedId, newStatus) {
    setSectors((prev) =>
      prev.map((sector) => ({
        ...sector,
        rooms: sector.rooms.map((room) => ({
          ...room,
          beds: room.beds.map((b) => (b.id === bedId ? { ...b, status: newStatus } : b)),
        })),
      }))
    );
  }

  function updateRisk(bedId, riskId, note) {
    setSectors((prev) =>
      prev.map((sector) => ({
        ...sector,
        rooms: sector.rooms.map((room) => ({
          ...room,
          beds: room.beds.map((b) =>
            b.id === bedId
              ? { ...b, risco: riskId, riscoNota: note || "", riscoPor: "Enf. responsável", riscoEm: new Date().toLocaleString("pt-BR") }
              : b
          ),
        })),
      }))
    );
    setWaitMinutes((prev) => ({ ...prev, [bedId]: 0 }));
  }

  return (
    <div className="p-6 md:p-10">
      <h1 className="font-display text-3xl mb-1">Internação</h1>
      <p className="font-body c-text-6B8CA3 mb-6">Busque pacientes internados, classifique o risco e atualize o status</p>

      <div className="flex items-center gap-2 border c-border-D9DCE1 rounded-lg px-3 py-2 mb-6 max-w-sm bg-white">
        <Search size={14} className="c-text-6B8CA3" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar paciente internado…"
          className="font-body text-sm outline-none flex-1"
        />
      </div>

      {/* Fluxo rápido — classificação de 1 toque */}
      {fastTrackEntries.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={15} className="c-text-C6A15B" />
            <span className="font-body text-sm font-semibold">Fluxo rápido</span>
            <span className="font-body text-xs c-text-6B8CA3">Pronto socorro, emergência, urgência, UTI e centro cirúrgico de emergência</span>
          </div>
          <div className="space-y-2">
            {fastTrackEntries.map((a) => {
              const overdue = a.bed.risco && RISK_LEVELS.find((r) => r.id === a.bed.risco)?.maxMinutes > 0 &&
                (waitMinutes[a.bed.id] || 0) > RISK_LEVELS.find((r) => r.id === a.bed.risco).maxMinutes;
              return (
                <div
                  key={a.bed.id}
                  className={`border rounded-lg px-4 py-3 flex items-center justify-between flex-wrap gap-3 ${overdue ? "c-border-EDEFF3" : "c-border-D9DCE1"}`}
                  style={overdue ? { backgroundColor: "#FCEBEB", borderColor: "#E24B4A" } : { backgroundColor: "#fff" }}
                >
                  <div>
                    <p className="font-body text-sm font-medium mb-1">{a.bed.patientName}</p>
                    <Badge tone="sage">{a.sector.name} · {a.room.name ? `Quarto ${a.room.name} · ` : ""}Leito {a.bed.label}</Badge>
                  </div>
                  <FastTrackRiskRow
                    waitMinutes={waitMinutes[a.bed.id] || 0}
                    riskId={a.bed.risco}
                    onClassify={(riskId) => updateRisk(a.bed.id, riskId, "")}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Fluxo clínico — checklist detalhado */}
      <div className="flex items-center gap-2 mb-3">
        <Stethoscope size={15} className="c-text-14213D" />
        <span className="font-body text-sm font-semibold">Fluxo clínico</span>
        <span className="font-body text-xs c-text-6B8CA3">Internação, ambulatório e demais setores</span>
      </div>
      <div className="space-y-2">
        {clinicalEntries.map((a) => (
          <button
            key={a.bed.id}
            onClick={() => setSelectedBedId(a.bed.id)}
            className="w-full text-left border c-border-D9DCE1 rounded-lg px-4 py-3 flex items-center justify-between hoverc-bg-F5F6F8 bg-white"
          >
            <div>
              <p className="font-body text-sm font-medium mb-1.5">{a.bed.patientName}</p>
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge tone="sage">
                  {a.sector.name} · Quarto {a.room.name} · Leito {a.bed.label}
                </Badge>
                {a.bed.status && <Badge tone="ink">{a.bed.status}</Badge>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <RiskBadge riskId={a.bed.risco} />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setRiskModalBedId(a.bed.id);
                }}
                className="font-body text-xs c-text-14213D underline"
              >
                Classificar
              </button>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="font-body text-sm c-text-6B8CA3 italic">Nenhum paciente internado encontrado.</p>
        )}
      </div>

      {selectedEntry && (
        <div className="fixed inset-0 c-bg-black40 z-40 flex items-center justify-center p-4">
          <Card className="p-6 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl">{selectedEntry.bed.patientName}</h3>
              <button onClick={() => setSelectedBedId(null)} className="c-text-6B8CA3 hoverc-text-16202E">
                <X size={18} />
              </button>
            </div>
            <div className="mb-4">
              <Badge tone="sage">
                {selectedEntry.sector.name} · Quarto {selectedEntry.room.name} · Leito {selectedEntry.bed.label}
              </Badge>
              <p className="font-body text-xs c-text-6B8CA3 mt-2">Internado em {selectedEntry.bed.admittedAt}</p>
              <div className="mt-2"><RiskBadge riskId={selectedEntry.bed.risco} /></div>
              {selectedEntry.bed.riscoPor && (
                <p className="font-body text-xs c-text-6B8CA3 mt-1">Classificado por {selectedEntry.bed.riscoPor} · {selectedEntry.bed.riscoEm}</p>
              )}
            </div>
            <label className="font-body text-xs c-text-6B8CA3 block mb-1">Status atual</label>
            <select
              value={selectedEntry.bed.status || ""}
              onChange={(e) => updateStatus(selectedEntry.bed.id, e.target.value)}
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm mb-4 c-text-16202E"
            >
              {statusOptions.map((s) => <option key={s}>{s}</option>)}
            </select>
            <button
              onClick={() => setSelectedBedId(null)}
              className="w-full c-bg-14213D text-white font-body text-sm font-medium py-2.5 rounded-lg hoverc-bg-0B1729"
            >
              Concluir
            </button>
          </Card>
        </div>
      )}

      {riskModalEntry && (
        <ClinicalRiskModal
          patientName={riskModalEntry.bed.patientName}
          riskId={riskModalEntry.bed.risco}
          onClose={() => setRiskModalBedId(null)}
          onConfirm={(riskId, note) => {
            updateRisk(riskModalEntry.bed.id, riskId, note);
            setRiskModalBedId(null);
          }}
        />
      )}
    </div>
  );
}

function InternacaoHospitalar({ sectors, setSectors, statusOptions, setStatusOptions }) {
  const [selectedBedId, setSelectedBedId] = useState("101-A");
  const [admitName, setAdmitName] = useState("");
  const [admitIdade, setAdmitIdade] = useState("");
  const [admitSexo, setAdmitSexo] = useState("");
  const [admitComorbidades, setAdmitComorbidades] = useState("");
  const [admitMotivo, setAdmitMotivo] = useState("");
  const [admitObservacoes, setAdmitObservacoes] = useState("");
  const [showManage, setShowManage] = useState(false);

  const [newSectorName, setNewSectorName] = useState("");
  const [newRoomName, setNewRoomName] = useState({}); // { [sectorId]: valor digitado }
  const [newBedLabel, setNewBedLabel] = useState({}); // { [sectorId+roomId]: valor digitado }
  const [newStatusName, setNewStatusName] = useState("");

  const [evolutionText, setEvolutionText] = useState("");
  const [medName, setMedName] = useState("");
  const [medSchedule, setMedSchedule] = useState("");

  // Localiza o leito selecionado, junto com o setor/quarto a que pertence
  function findBed(bedId) {
    for (const sector of sectors) {
      for (const room of sector.rooms) {
        const bed = room.beds.find((b) => b.id === bedId);
        if (bed) return { sector, room, bed };
      }
    }
    return null;
  }

  const located = findBed(selectedBedId);
  const selectedBed = located?.bed;

  function updateBed(bedId, updater) {
    setSectors((prev) =>
      prev.map((sector) => ({
        ...sector,
        rooms: sector.rooms.map((room) => ({
          ...room,
          beds: room.beds.map((b) => (b.id === bedId ? updater(b) : b)),
        })),
      }))
    );
  }

  function admitPatient() {
    if (!admitName.trim()) return;
    updateBed(selectedBedId, (b) => ({
      ...b,
      patientName: admitName,
      admittedAt: new Date().toLocaleDateString("pt-BR"),
      status: statusOptions[0] || "Internação",
      idade: admitIdade ? Number(admitIdade) : null,
      sexo: admitSexo,
      comorbidades: admitComorbidades,
      motivoInternacao: admitMotivo,
      observacoes: admitObservacoes,
    }));
    setAdmitName(""); setAdmitIdade(""); setAdmitSexo(""); setAdmitComorbidades(""); setAdmitMotivo(""); setAdmitObservacoes("");
  }

  function updateStatus(newStatus) {
    updateBed(selectedBedId, (b) => ({ ...b, status: newStatus }));
  }

  function updateClinicalField(field, value) {
    updateBed(selectedBedId, (b) => ({ ...b, [field]: value }));
  }

  function addStatusOption() {
    if (!newStatusName.trim() || statusOptions.includes(newStatusName.trim())) return;
    setStatusOptions((prev) => [...prev, newStatusName.trim()]);
    setNewStatusName("");
  }

  function removeStatusOption(status) {
    setStatusOptions((prev) => prev.filter((s) => s !== status));
  }

  function dischargePatient() {
    updateBed(selectedBedId, (b) => ({ ...b, patientName: null, admittedAt: null, status: null, evolutions: [], medications: [], idade: null, sexo: "", comorbidades: "", motivoInternacao: "", observacoes: "", risco: null, riscoNota: "", riscoPor: null, riscoEm: null }));
  }

  function addEvolution() {
    if (!evolutionText.trim()) return;
    updateBed(selectedBedId, (b) => ({
      ...b,
      evolutions: [{ id: Date.now(), date: new Date().toLocaleString("pt-BR"), text: evolutionText }, ...b.evolutions],
    }));
    setEvolutionText("");
  }

  function addMedication() {
    if (!medName.trim() || !medSchedule.trim()) return;
    updateBed(selectedBedId, (b) => ({
      ...b,
      medications: [...b.medications, { id: Date.now(), name: medName, schedule: medSchedule, administered: false }],
    }));
    setMedName("");
    setMedSchedule("");
  }

  function toggleMedication(medId) {
    updateBed(selectedBedId, (b) => ({
      ...b,
      medications: b.medications.map((m) => (m.id === medId ? { ...m, administered: !m.administered } : m)),
    }));
  }

  // --- Gestão de setores / quartos / leitos (usuário principal) ---
  function addSector() {
    if (!newSectorName.trim()) return;
    setSectors((prev) => [...prev, { id: `setor-${Date.now()}`, name: newSectorName, rooms: [] }]);
    setNewSectorName("");
  }

  function removeSector(sectorId) {
    setSectors((prev) => prev.filter((s) => s.id !== sectorId));
  }

  function addRoom(sectorId) {
    const name = (newRoomName[sectorId] || "").trim();
    if (!name) return;
    setSectors((prev) =>
      prev.map((s) => (s.id === sectorId ? { ...s, rooms: [...s.rooms, { id: `quarto-${Date.now()}`, name, beds: [] }] } : s))
    );
    setNewRoomName((prev) => ({ ...prev, [sectorId]: "" }));
  }

  function removeRoom(sectorId, roomId) {
    setSectors((prev) =>
      prev.map((s) => (s.id === sectorId ? { ...s, rooms: s.rooms.filter((r) => r.id !== roomId) } : s))
    );
  }

  function addBed(sectorId, roomId) {
    const key = sectorId + roomId;
    const label = (newBedLabel[key] || "").trim();
    if (!label) return;
    setSectors((prev) =>
      prev.map((s) =>
        s.id === sectorId
          ? {
              ...s,
              rooms: s.rooms.map((r) =>
                r.id === roomId
                  ? { ...r, beds: [...r.beds, { id: `${roomId}-${Date.now()}`, label, patientName: null, admittedAt: null, evolutions: [], medications: [] }] }
                  : r
              ),
            }
          : s
      )
    );
    setNewBedLabel((prev) => ({ ...prev, [key]: "" }));
  }

  function removeBed(sectorId, roomId, bedId) {
    setSectors((prev) =>
      prev.map((s) =>
        s.id === sectorId
          ? { ...s, rooms: s.rooms.map((r) => (r.id === roomId ? { ...r, beds: r.beds.filter((b) => b.id !== bedId) } : r)) }
          : s
      )
    );
    if (selectedBedId === bedId) setSelectedBedId("");
  }

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-1">
        <h1 className="font-display text-3xl">Internação Hospitalar</h1>
        <button
          onClick={() => setShowManage((s) => !s)}
          className="flex items-center gap-2 text-sm font-body border c-border-D9DCE1 px-3 py-1.5 rounded-lg hoverc-bg-F5F6F8"
        >
          <Pencil size={14} /> {showManage ? "Concluir edição" : "Gerenciar setores, quartos e leitos"}
        </button>
      </div>
      <p className="font-body c-text-6B8CA3 mb-6">Setor → Quarto → Leito → Paciente → Evolução diária → Medicações</p>

      {showManage ? (
        <div className="space-y-6">
          <Card className="p-6">
            <p className="font-body text-sm font-medium mb-3">Status possíveis do paciente internado</p>
            <p className="font-body text-xs c-text-6B8CA3 mb-3">
              Ex.: Enfermaria, UTI, Berçário, Triagem, Pré-operatório, Pós-operatório, Sala de medicação, Sala de procedimento…
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {statusOptions.map((s) => (
                <span key={s} className="flex items-center gap-1.5 c-bg-F5F6F8 rounded-full px-3 py-1 font-body text-xs">
                  {s}
                  <button onClick={() => removeStatusOption(s)} className="c-text-6B8CA3 hoverc-text-7C3B34">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={newStatusName}
                onChange={(e) => setNewStatusName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addStatusOption()}
                placeholder="Novo status (ex.: Sala de recuperação)"
                className="flex-1 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
              />
              <button onClick={addStatusOption} className="border c-border-D9DCE1 px-4 rounded-lg font-body text-sm hoverc-bg-F5F6F8 flex items-center gap-1.5">
                <Plus size={14} /> Status
              </button>
            </div>
          </Card>

          <Card className="p-6">
            <p className="font-body text-sm font-medium mb-3">Novo setor (ex.: Enfermaria, UTI, Recuperação, Triagem…)</p>
            <div className="flex gap-2">
              <input
                value={newSectorName}
                onChange={(e) => setNewSectorName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSector()}
                placeholder="Nome do setor"
                className="flex-1 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
              />
              <button onClick={addSector} className="c-bg-14213D text-white px-4 rounded-lg font-body text-sm hoverc-bg-0B1729 flex items-center gap-1.5">
                <Plus size={14} /> Criar setor
              </button>
            </div>
          </Card>

          {sectors.map((sector) => (
            <Card key={sector.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="font-display text-lg flex items-center gap-2">
                  <DoorOpen size={16} className="c-text-14213D" /> {sector.name}
                </p>
                <button onClick={() => removeSector(sector.id)} className="c-text-6B8CA3 hoverc-text-7C3B34" title="Excluir setor">
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="space-y-4 mb-4">
                {sector.rooms.map((room) => (
                  <div key={room.id} className="border c-border-EDEFF3 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-body text-sm font-medium">Quarto {room.name}</p>
                      <button onClick={() => removeRoom(sector.id, room.id)} className="c-text-6B8CA3 hoverc-text-7C3B34" title="Excluir quarto">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {room.beds.map((bed) => (
                        <span key={bed.id} className="flex items-center gap-1.5 c-bg-F5F6F8 rounded-full px-3 py-1 font-body text-xs">
                          {bed.label}
                          <button onClick={() => removeBed(sector.id, room.id, bed.id)} className="c-text-6B8CA3 hoverc-text-7C3B34">
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                      {room.beds.length === 0 && <span className="font-body text-xs c-text-6B8CA3 italic">Nenhum leito ainda</span>}
                    </div>
                    <div className="flex gap-2">
                      <input
                        value={newBedLabel[sector.id + room.id] || ""}
                        onChange={(e) => setNewBedLabel((prev) => ({ ...prev, [sector.id + room.id]: e.target.value }))}
                        onKeyDown={(e) => e.key === "Enter" && addBed(sector.id, room.id)}
                        placeholder="Nome do leito (ex.: Leito C)"
                        className="flex-1 border c-border-D9DCE1 rounded-lg px-3 py-1.5 font-body text-xs"
                      />
                      <button
                        onClick={() => addBed(sector.id, room.id)}
                        className="border c-border-D9DCE1 px-3 rounded-lg font-body text-xs hoverc-bg-F5F6F8"
                      >
                        + Leito
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  value={newRoomName[sector.id] || ""}
                  onChange={(e) => setNewRoomName((prev) => ({ ...prev, [sector.id]: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && addRoom(sector.id)}
                  placeholder="Nome do quarto (ex.: 103)"
                  className="flex-1 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
                />
                <button onClick={() => addRoom(sector.id)} className="border c-border-D9DCE1 px-4 rounded-lg font-body text-sm hoverc-bg-F5F6F8 flex items-center gap-1.5">
                  <Plus size={14} /> Quarto
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-4 gap-6">
          {/* Navegação Setor → Quarto → Leito */}
          <Card className="p-4 h-fit md:col-span-1">
            <p className="font-body text-xs uppercase tracking-wide c-text-6B8CA3 mb-3 flex items-center gap-1.5">
              <DoorOpen size={13} /> Setores, quartos e leitos
            </p>
            <div className="space-y-5">
              {sectors.map((sector) => (
                <div key={sector.id}>
                  <p className="font-body text-xs font-bold c-text-14213D mb-2 uppercase tracking-wide">{sector.name}</p>
                  {sector.rooms.length === 0 && (
                    <p className="font-body text-xs c-text-6B8CA3 italic mb-2">Nenhum quarto cadastrado</p>
                  )}
                  <div className="space-y-3">
                    {sector.rooms.map((room) => (
                      <div key={room.id}>
                        <p className="font-body text-xs font-medium c-text-6B8CA3 mb-1.5">Quarto {room.name}</p>
                        <div className="space-y-1">
                          {room.beds.map((bed) => (
                            <button
                              key={bed.id}
                              onClick={() => setSelectedBedId(bed.id)}
                              className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg font-body text-sm ${
                                selectedBedId === bed.id ? "c-bg-14213D text-white" : "hoverc-bg-F5F6F8"
                              }`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full shrink-0 ${bed.patientName ? "c-bg-D97706" : "c-bg-2E7D46"}`}
                                title={bed.patientName ? "Ocupado" : "Vago"}
                              />
                              <span className="flex-1">{bed.label}</span>
                              {bed.status && (
                                <span className={`text-[10px] ${selectedBedId === bed.id ? "text-white/70" : "c-text-6B8CA3"}`}>
                                  {bed.status}
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Detalhe do leito selecionado */}
          <div className="md:col-span-3 space-y-6">
            {!selectedBed ? (
              <Card className="p-6 text-center">
                <p className="font-body text-sm c-text-6B8CA3">
                  Selecione um leito ao lado, ou clique em "Gerenciar setores, quartos e leitos" para começar a cadastrar.
                </p>
              </Card>
            ) : !selectedBed.patientName ? (
              <Card className="p-6">
                <p className="font-body text-sm font-medium mb-1">
                  Leito {selectedBed.label} — {located.sector.name}, Quarto {located.room.name} <span className="c-text-2E7D46">(vago)</span>
                </p>
                <p className="font-body text-xs c-text-6B8CA3 mb-4">Internar um paciente neste leito</p>
                <div className="grid sm:grid-cols-2 gap-2 mb-2">
                  <input
                    value={admitName}
                    onChange={(e) => setAdmitName(e.target.value)}
                    placeholder="Nome do paciente *"
                    className="sm:col-span-2 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
                  />
                  <input
                    value={admitIdade}
                    onChange={(e) => setAdmitIdade(e.target.value)}
                    type="number"
                    min="0"
                    placeholder="Idade"
                    className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
                  />
                  <select
                    value={admitSexo}
                    onChange={(e) => setAdmitSexo(e.target.value)}
                    className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm c-text-16202E"
                  >
                    <option value="">Sexo (biológico)</option>
                    <option>Feminino</option>
                    <option>Masculino</option>
                  </select>
                  <input
                    value={admitComorbidades}
                    onChange={(e) => setAdmitComorbidades(e.target.value)}
                    placeholder="Comorbidades (ex.: Diabetes tipo 2)"
                    className="sm:col-span-2 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
                  />
                  <input
                    value={admitMotivo}
                    onChange={(e) => setAdmitMotivo(e.target.value)}
                    placeholder="Motivo da internação"
                    className="sm:col-span-2 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
                  />
                  <textarea
                    value={admitObservacoes}
                    onChange={(e) => setAdmitObservacoes(e.target.value)}
                    rows={2}
                    placeholder="Observações"
                    className="sm:col-span-2 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
                  />
                </div>
                <button onClick={admitPatient} className="w-full c-bg-14213D text-white py-2 rounded-lg font-body text-sm hoverc-bg-0B1729">
                  Internar
                </button>
              </Card>
            ) : (
              <>
                <Card className="p-6">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                    <div>
                      <p className="font-display text-xl">{selectedBed.patientName}</p>
                      <p className="font-body text-xs c-text-6B8CA3">
                        {located.sector.name} · Quarto {located.room.name} · Leito {selectedBed.label} · Internado em {selectedBed.admittedAt}
                      </p>
                    </div>
                    <button
                      onClick={dischargePatient}
                      className="font-body text-xs c-text-7C3B34 border c-border-D9DCE1 px-3 py-1.5 rounded-lg hoverc-bg-F5F6F8"
                    >
                      Dar alta / liberar leito
                    </button>
                  </div>
                  <div className="flex items-center gap-2 pt-4 border-t c-border-EDEFF3">
                    <label className="font-body text-xs c-text-6B8CA3">Status atual:</label>
                    <select
                      value={selectedBed.status || ""}
                      onChange={(e) => updateStatus(e.target.value)}
                      className="border c-border-D9DCE1 rounded-lg px-3 py-1.5 font-body text-sm c-text-16202E"
                    >
                      {statusOptions.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </Card>

                <Card className="p-6">
                  <p className="font-body text-sm font-medium mb-4 flex items-center gap-2">
                    <ClipboardList size={15} /> Dados clínicos (exibidos no Quadro geral)
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-body text-xs c-text-6B8CA3 block mb-1">Idade</label>
                      <input
                        type="number" min="0"
                        value={selectedBed.idade ?? ""}
                        onChange={(e) => updateClinicalField("idade", e.target.value ? Number(e.target.value) : null)}
                        className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
                      />
                    </div>
                    <div>
                      <label className="font-body text-xs c-text-6B8CA3 block mb-1">Sexo (biológico)</label>
                      <select
                        value={selectedBed.sexo || ""}
                        onChange={(e) => updateClinicalField("sexo", e.target.value)}
                        className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm c-text-16202E"
                      >
                        <option value="">—</option>
                        <option>Feminino</option>
                        <option>Masculino</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-body text-xs c-text-6B8CA3 block mb-1">Comorbidades</label>
                      <input
                        value={selectedBed.comorbidades || ""}
                        onChange={(e) => updateClinicalField("comorbidades", e.target.value)}
                        className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-body text-xs c-text-6B8CA3 block mb-1">Motivo da internação</label>
                      <input
                        value={selectedBed.motivoInternacao || ""}
                        onChange={(e) => updateClinicalField("motivoInternacao", e.target.value)}
                        className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-body text-xs c-text-6B8CA3 block mb-1">Observações</label>
                      <textarea
                        rows={2}
                        value={selectedBed.observacoes || ""}
                        onChange={(e) => updateClinicalField("observacoes", e.target.value)}
                        className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <p className="font-body text-sm font-medium mb-4 flex items-center gap-2">
                    <FileText size={15} /> Evolução diária
                  </p>
                  <textarea
                    value={evolutionText}
                    onChange={(e) => setEvolutionText(e.target.value)}
                    rows={3}
                    placeholder="Estado geral, sinais vitais, conduta do dia…"
                    className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm mb-3"
                  />
                  <button onClick={addEvolution} className="c-bg-14213D text-white px-4 py-2 rounded-lg font-body text-sm mb-4 hoverc-bg-0B1729">
                    Adicionar evolução
                  </button>
                  <div className="space-y-3">
                    {selectedBed.evolutions.map((e) => (
                      <div key={e.id} className="border c-border-EDEFF3 rounded-lg p-3">
                        <p className="font-mono text-xs c-text-6B8CA3 mb-1">{e.date}</p>
                        <p className="font-body text-sm c-text-3C4654 whitespace-pre-wrap">{e.text}</p>
                      </div>
                    ))}
                    {selectedBed.evolutions.length === 0 && (
                      <p className="font-body text-sm c-text-6B8CA3 italic">Nenhuma evolução registrada ainda.</p>
                    )}
                  </div>
                </Card>

                <Card className="p-6">
                  <p className="font-body text-sm font-medium mb-4 flex items-center gap-2">
                    <Syringe size={15} /> Medicações prescritas
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 mb-4">
                    <input
                      value={medName}
                      onChange={(e) => setMedName(e.target.value)}
                      placeholder="Medicação (ex.: Dipirona 1g EV)"
                      className="flex-1 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
                    />
                    <input
                      value={medSchedule}
                      onChange={(e) => setMedSchedule(e.target.value)}
                      placeholder="Horário (ex.: 8h-16h-24h)"
                      className="sm:w-48 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
                    />
                    <button onClick={addMedication} className="c-bg-14213D text-white px-4 py-2 rounded-lg font-body text-sm hoverc-bg-0B1729">
                      Prescrever
                    </button>
                  </div>
                  <div className="space-y-2">
                    {selectedBed.medications.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => toggleMedication(m.id)}
                        className="w-full flex items-center justify-between border c-border-EDEFF3 rounded-lg px-4 py-2.5 text-left"
                      >
                        <div>
                          <p className="font-body text-sm">{m.name}</p>
                          <p className="font-mono text-xs c-text-6B8CA3">{m.schedule}</p>
                        </div>
                        <Badge tone={m.administered ? "sage" : "accent"}>
                          {m.administered ? "Administrada" : "Não administrada"}
                        </Badge>
                      </button>
                    ))}
                    {selectedBed.medications.length === 0 && (
                      <p className="font-body text-sm c-text-6B8CA3 italic">Nenhuma medicação prescrita ainda.</p>
                    )}
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function InventoryManager({ title, subtitle, icon: Icon, items, setItems, unitPlaceholder }) {
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? null);
  const [showSheet, setShowSheet] = useState(false);
  const [newName, setNewName] = useState("");
  const [newUnit, setNewUnit] = useState("");
  const [newQty, setNewQty] = useState("");
  const [newMin, setNewMin] = useState("");

  const [moveType, setMoveType] = useState("entrada"); // entrada | saida
  const [moveQty, setMoveQty] = useState("");
  const [moveNote, setMoveNote] = useState("");

  const selected = items.find((i) => i.id === selectedId);

  function addItem() {
    if (!newName.trim() || !newUnit.trim()) return;
    const item = {
      id: Date.now(),
      name: newName,
      unit: newUnit,
      quantity: parseInt(newQty, 10) || 0,
      minQuantity: parseInt(newMin, 10) || 0,
      movements: [],
    };
    setItems((prev) => [...prev, item]);
    setSelectedId(item.id);
    setNewName("");
    setNewUnit("");
    setNewQty("");
    setNewMin("");
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function registerMovement() {
    const qty = parseInt(moveQty, 10);
    if (!selectedId || !qty || qty <= 0) return;
    setItems((prev) =>
      prev.map((i) => {
        if (i.id !== selectedId) return i;
        const delta = moveType === "entrada" ? qty : -qty;
        const movement = {
          id: Date.now(),
          type: moveType,
          qty,
          note: moveNote,
          date: new Date().toLocaleString("pt-BR"),
        };
        return { ...i, quantity: Math.max(0, i.quantity + delta), movements: [movement, ...i.movements] };
      })
    );
    setMoveQty("");
    setMoveNote("");
  }

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-1">
        <h1 className="font-display text-3xl">{title}</h1>
        <button
          onClick={() => setShowSheet(true)}
          className="flex items-center gap-2 text-sm font-body border c-border-D9DCE1 px-3 py-1.5 rounded-lg hoverc-bg-F5F6F8"
        >
          <FileText size={14} /> Ver planilha
        </button>
      </div>
      <p className="font-body c-text-6B8CA3 mb-6">{subtitle}</p>

      {showSheet && (
        <div className="fixed inset-0 c-bg-black40 z-40 flex items-center justify-center p-4">
          <Card className="p-0 max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b c-border-D9DCE1">
              <p className="font-body text-sm font-medium flex items-center gap-2">
                <Icon size={15} /> {title} — planilha
              </p>
              <button onClick={() => setShowSheet(false)} className="c-text-6B8CA3 hoverc-text-16202E">
                <X size={18} />
              </button>
            </div>
            <div className="overflow-y-auto">
              <table className="w-full font-mono text-sm">
                <thead>
                  <tr className="font-body text-xs uppercase tracking-wide c-text-6B8CA3 c-bg-F5F6F8">
                    <th className="text-left px-4 py-2.5">Item</th>
                    <th className="text-right px-4 py-2.5">Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((i, idx) => {
                    const low = i.quantity <= i.minQuantity;
                    return (
                      <tr key={i.id} className={idx % 2 === 0 ? "bg-white" : "c-bg-F5F6F8"}>
                        <td className="px-4 py-2.5 font-body c-text-16202E">{i.name}</td>
                        <td className={`px-4 py-2.5 text-right ${low ? "c-text-D97706 font-bold" : "c-text-16202E"}`}>
                          {i.quantity} {i.unit}
                        </td>
                      </tr>
                    );
                  })}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={2} className="px-4 py-6 text-center font-body c-text-6B8CA3 italic">
                        Nenhum item cadastrado ainda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 border-t c-border-D9DCE1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full c-bg-D97706" />
              <p className="font-body text-xs c-text-6B8CA3">Em laranja: itens no ou abaixo do estoque mínimo</p>
            </div>
          </Card>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Lista de itens */}
        <Card className="p-4 h-fit md:col-span-1">
          <p className="font-body text-xs uppercase tracking-wide c-text-6B8CA3 mb-3 flex items-center gap-1.5">
            <Icon size={13} /> Itens cadastrados
          </p>
          <div className="space-y-1 mb-4">
            {items.map((i) => {
              const low = i.quantity <= i.minQuantity;
              return (
                <button
                  key={i.id}
                  onClick={() => setSelectedId(i.id)}
                  className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg font-body text-sm ${
                    selectedId === i.id ? "c-bg-14213D text-white" : "hoverc-bg-F5F6F8"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${low ? "c-bg-D97706" : "c-bg-2E7D46"}`} title={low ? "Estoque baixo" : "Estoque normal"} />
                  <span className="flex-1">{i.name}</span>
                  <span className={`text-xs ${selectedId === i.id ? "text-white/70" : "c-text-6B8CA3"}`}>{i.quantity}</span>
                </button>
              );
            })}
            {items.length === 0 && <p className="font-body text-xs c-text-6B8CA3 italic">Nenhum item cadastrado ainda.</p>}
          </div>

          <div className="border-t c-border-EDEFF3 pt-4">
            <p className="font-body text-xs font-medium mb-2">Cadastrar novo item</p>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nome"
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm mb-2"
            />
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input
                value={newUnit}
                onChange={(e) => setNewUnit(e.target.value)}
                placeholder={unitPlaceholder}
                className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
              />
              <input
                value={newQty}
                onChange={(e) => setNewQty(e.target.value)}
                placeholder="Qtd. inicial"
                className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
              />
            </div>
            <input
              value={newMin}
              onChange={(e) => setNewMin(e.target.value)}
              placeholder="Estoque mínimo (alerta)"
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm mb-2"
            />
            <button onClick={addItem} className="w-full c-bg-14213D text-white font-body text-sm py-2 rounded-lg hoverc-bg-0B1729 flex items-center justify-center gap-1.5">
              <Plus size={14} /> Cadastrar
            </button>
          </div>
        </Card>

        {/* Detalhe do item selecionado */}
        <div className="md:col-span-2 space-y-6">
          {!selected ? (
            <Card className="p-6 text-center">
              <p className="font-body text-sm c-text-6B8CA3">Selecione um item ao lado, ou cadastre um novo.</p>
            </Card>
          ) : (
            <>
              <Card className="p-6">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                  <div>
                    <p className="font-display text-xl">{selected.name}</p>
                    <p className="font-body text-xs c-text-6B8CA3">
                      Estoque mínimo: {selected.minQuantity} {selected.unit}
                    </p>
                  </div>
                  <button onClick={() => removeItem(selected.id)} className="c-text-6B8CA3 hoverc-text-7C3B34" title="Excluir item">
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <p className="font-mono text-3xl c-text-14213D">{selected.quantity}</p>
                  <span className="font-body text-sm c-text-6B8CA3">{selected.unit}</span>
                  {selected.quantity <= selected.minQuantity && <Badge tone="accent">Estoque baixo</Badge>}
                </div>
              </Card>

              <Card className="p-6">
                <p className="font-body text-sm font-medium mb-4">Registrar movimentação</p>
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => setMoveType("entrada")}
                    className={`flex-1 py-2 rounded-lg font-body text-sm flex items-center justify-center gap-1.5 ${moveType === "entrada" ? "c-bg-2E7D46 text-white" : "border c-border-D9DCE1"}`}
                  >
                    <ArrowDownCircle size={14} /> Entrada
                  </button>
                  <button
                    onClick={() => setMoveType("saida")}
                    className={`flex-1 py-2 rounded-lg font-body text-sm flex items-center justify-center gap-1.5 ${moveType === "saida" ? "c-bg-7C3B34 text-white" : "border c-border-D9DCE1"}`}
                  >
                    <ArrowUpCircle size={14} /> Saída
                  </button>
                </div>
                <div className="flex gap-2 mb-3">
                  <input
                    value={moveQty}
                    onChange={(e) => setMoveQty(e.target.value)}
                    placeholder={`Quantidade (${selected.unit})`}
                    className="flex-1 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
                  />
                  <input
                    value={moveNote}
                    onChange={(e) => setMoveNote(e.target.value)}
                    placeholder="Motivo (opcional)"
                    className="flex-1 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
                  />
                </div>
                <button
                  onClick={registerMovement}
                  className="w-full c-bg-14213D text-white font-body text-sm font-medium py-2.5 rounded-lg hoverc-bg-0B1729"
                >
                  Registrar {moveType === "entrada" ? "entrada" : "saída"}
                </button>
              </Card>

              <Card className="p-6">
                <p className="font-body text-sm font-medium mb-4 flex items-center gap-2">
                  <History size={15} /> Histórico de movimentações
                </p>
                <div className="space-y-2">
                  {selected.movements.map((m) => (
                    <div key={m.id} className="flex items-center justify-between border c-border-EDEFF3 rounded-lg px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        {m.type === "entrada" ? (
                          <ArrowDownCircle size={15} className="c-text-2E7D46" />
                        ) : (
                          <ArrowUpCircle size={15} className="c-text-7C3B34" />
                        )}
                        <div>
                          <p className="font-body text-sm">
                            {m.type === "entrada" ? "+" : "−"}{m.qty} {selected.unit}
                            {m.note && <span className="c-text-6B8CA3"> · {m.note}</span>}
                          </p>
                          <p className="font-mono text-xs c-text-6B8CA3">{m.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {selected.movements.length === 0 && (
                    <p className="font-body text-sm c-text-6B8CA3 italic">Nenhuma movimentação registrada ainda.</p>
                  )}
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function PainelChamada({ callQueue }) {
  const latest = callQueue[0];
  const rest = callQueue.slice(1, 7);

  return (
    <div className="p-6 md:p-10 c-bg-16202E min-h-screen">
      <div className="flex items-center gap-2 mb-6">
        <Tv size={20} className="text-white" />
        <h1 className="font-display text-2xl text-white">Painel de Chamada</h1>
      </div>

      {!latest ? (
        <p className="font-body c-text-white50">Nenhuma chamada ainda. Chame um paciente na Agenda.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2 c-bg-F4E9D2 rounded-2xl p-8">
            <p className="font-mono text-6xl md:text-8xl font-bold c-text-14213D mb-2">{latest.senha}</p>
            <p className="font-display text-2xl md:text-3xl c-text-14213D mb-1">{latest.patient}</p>
            <p className="font-body text-2xl md:text-3xl font-medium c-text-8A6A24">{latest.room}</p>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {rest.map((c) => (
              <div key={c.id} className="bg-white rounded-xl p-4">
                <p className="font-mono text-3xl font-bold c-text-14213D">{c.senha}</p>
                <p className="font-body text-base font-medium c-text-3C4654">{c.room}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function QuadroGeral({ sectors }) {
  const sectorsWithBeds = sectors.filter((s) => s.rooms.some((r) => r.beds.length > 0));
  const [activeSectorId, setActiveSectorId] = useState(sectorsWithBeds[0]?.id || sectors[0]?.id);
  const activeSector = sectors.find((s) => s.id === activeSectorId) || sectorsWithBeds[0];

  // Gira automaticamente entre os setores que têm leitos, a cada 12s — pensado pra rodar na TV do setor sem intervenção
  useEffect(() => {
    if (sectorsWithBeds.length < 2) return;
    const id = setInterval(() => {
      setActiveSectorId((prev) => {
        const idx = sectorsWithBeds.findIndex((s) => s.id === prev);
        return sectorsWithBeds[(idx + 1) % sectorsWithBeds.length].id;
      });
    }, 12000);
    return () => clearInterval(id);
  }, [sectorsWithBeds.length]);

  const rows = [];
  activeSector?.rooms.forEach((room) => {
    room.beds.forEach((bed) => {
      if (bed.patientName) rows.push({ room, bed });
    });
  });
  const showQuarto = activeSector?.rooms.some((r) => r.name);

  return (
    <div className="p-6 md:p-10 c-bg-16202E min-h-screen">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Tv size={20} className="text-white" />
          <h1 className="font-display text-2xl text-white">Quadro Geral</h1>
        </div>
        <div className="flex gap-2 flex-wrap">
          {sectors.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSectorId(s.id)}
              className={`font-body text-sm px-4 py-1.5 rounded-full transition-colors ${
                activeSectorId === s.id ? "c-bg-C6A15B text-white" : "c-bg-white10 c-text-white75"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border c-border-white10">
        <table className="w-full font-body">
          <thead>
            <tr className="c-bg-14213D text-left">
              <th className="px-5 py-4 text-white font-medium">Paciente</th>
              <th className="px-5 py-4 text-white font-medium">Idade</th>
              <th className="px-5 py-4 text-white font-medium">Sexo (biológico)</th>
              {showQuarto && <th className="px-5 py-4 text-white font-medium">Quarto</th>}
              <th className="px-5 py-4 text-white font-medium">Leito</th>
              <th className="px-5 py-4 text-white font-medium">Comorbidades</th>
              <th className="px-5 py-4 text-white font-medium">Medicações prescritas</th>
              <th className="px-5 py-4 text-white font-medium">Motivo da internação</th>
              <th className="px-5 py-4 text-white font-medium">Observações</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ room, bed }, i) => {
              const risk = RISK_LEVELS.find((r) => r.id === bed.risco);
              return (
                <tr key={bed.id} className={i % 2 === 0 ? "bg-white" : "c-bg-F5F6F8"}>
                  <td className="px-5 py-4 c-text-16202E font-medium">
                    <div className="flex items-center gap-2">
                      {risk && <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: risk.color }} />}
                      {bed.patientName}
                    </div>
                  </td>
                  <td className="px-5 py-4 c-text-3C4654">{bed.idade ?? "—"}</td>
                  <td className="px-5 py-4 c-text-3C4654">{bed.sexo || "—"}</td>
                  {showQuarto && <td className="px-5 py-4 c-text-3C4654">{room.name || "—"}</td>}
                  <td className="px-5 py-4 c-text-3C4654">{bed.label}</td>
                  <td className="px-5 py-4 c-text-3C4654">{bed.comorbidades || "—"}</td>
                  <td className="px-5 py-4 c-text-3C4654">
                    {bed.medications?.length ? bed.medications.map((m) => m.name).join(", ") : "—"}
                  </td>
                  <td className="px-5 py-4 c-text-3C4654">{bed.motivoInternacao || "—"}</td>
                  <td className="px-5 py-4 c-text-3C4654">{bed.observacoes || "—"}</td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={showQuarto ? 9 : 8} className="px-5 py-8 text-center c-text-6B8CA3 italic bg-white">
                  Nenhum paciente internado neste setor no momento.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Suporte() {
  const [open, setOpen] = useState(null);

  return (
    <div className="p-6 md:p-10 max-w-2xl">
      <h1 className="font-display text-3xl mb-1">Suporte técnico</h1>
      <p className="font-body c-text-6B8CA3 mb-8">Estamos por aqui para ajudar com qualquer dúvida ou problema.</p>

      <Card className="p-6 mb-8 flex flex-col sm:flex-row items-center gap-6 c-bg-F5F6F8 border-none">
        <div className="w-14 h-14 rounded-full c-bg-25D366 flex items-center justify-center shrink-0">
          <MessageCircle size={26} className="text-white" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <p className="font-body text-sm font-medium mb-1">Fale com a gente pelo WhatsApp</p>
          <p className="font-mono text-sm c-text-6B8CA3 flex items-center justify-center sm:justify-start gap-1.5">
            <Phone size={13} /> {SUPPORT_PHONE_DISPLAY}
          </p>
        </div>
        <a
          href={whatsappSupportLink("Olá! Preciso de suporte técnico com a plataforma Kosium.")}
          target="_blank"
          rel="noopener noreferrer"
          className="c-bg-25D366 text-white font-body text-sm font-medium px-5 py-2.5 rounded-lg hoverc-bg-1EBE57 flex items-center gap-2 shrink-0"
        >
          <MessageCircle size={15} /> Abrir WhatsApp
        </a>
      </Card>

      <p className="font-body text-sm font-medium mb-4">Perguntas frequentes</p>
      <div className="space-y-2">
        {SUPPORT_FAQS.map((f, i) => (
          <Card key={f.q} className="overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left font-body text-sm font-medium"
            >
              {f.q}
              <ChevronRight size={16} className={`transition-transform ${open === i ? "rotate-90" : ""}`} />
            </button>
            {open === i && (
              <p className="font-body text-sm c-text-3C4654 px-5 pb-4 leading-relaxed">{f.a}</p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   GUIA DE INSTALAÇÃO — organograma clicável por sistema operacional
----------------------------------------------------------*/

const INSTALL_OS_OPTIONS = [
  {
    id: "windows",
    label: "Windows",
    icon: Monitor,
    steps: [
      "Abra o site da Kosium no Chrome ou Edge",
      'Clique no ícone de instalação (⊕) na barra de endereço',
      'Clique em "Instalar"',
    ],
  },
  {
    id: "mac",
    label: "macOS",
    icon: Laptop2,
    steps: [
      "Abra o site da Kosium no Safari ou Chrome",
      'No Safari: menu Arquivo → "Adicionar ao Dock..."',
      'Confirme o nome e clique em "Adicionar"',
    ],
  },
  {
    id: "android",
    label: "Android",
    icon: Smartphone,
    steps: [
      "Abra o site da Kosium no Chrome do celular",
      'Toque no menu (⋮) → "Adicionar à tela inicial"',
      'Confirme em "Instalar"',
    ],
  },
  {
    id: "ios",
    label: "iPhone / iPad",
    icon: Smartphone,
    steps: [
      "Abra o site da Kosium no Safari (obrigatório)",
      "Toque no ícone de compartilhar (□↑)",
      'Toque em "Adicionar à Tela de Início"',
    ],
  },
];

// Mockup ilustrativo do menu do celular, com a opção certa destacada —
// recriação estilizada (não é print real de nenhum app), só pra guiar visualmente.
function InstallMockup({ osId }) {
  const isIOS = osId === "ios";
  const isAndroid = osId === "android";
  const highlight = isIOS ? "Adicionar à Tela de Início" : isAndroid ? "Adicionar à tela inicial" : "Instalar";
  const otherOptions = isIOS
    ? ["Copiar", "Adicionar aos Favoritos", "Buscar na Página"]
    : ["Nova guia", "Histórico", "Downloads"];

  return (
    <div className="rounded-xl border c-border-D9DCE1 bg-white shadow-sm overflow-hidden max-w-[220px] mx-auto">
      <div className="c-bg-EDEFF3 px-3 py-2 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full c-bg-D9DCE1" />
        <span className="w-2 h-2 rounded-full c-bg-D9DCE1" />
        <span className="font-body text-[10px] c-text-6B8CA3 ml-1">kosium.com.br</span>
      </div>
      <div className="p-2">
        {otherOptions.slice(0, 2).map((opt) => (
          <div key={opt} className="font-body text-[11px] c-text-3C4654 px-2 py-2 border-b c-border-EDEFF3">
            {opt}
          </div>
        ))}
        <div className="font-body text-[11px] font-semibold c-text-14213D px-2 py-2 rounded-md flex items-center justify-between" style={{ backgroundColor: "#FDF8E7", border: "1.5px solid #C6A15B" }}>
          {highlight} <Plus size={12} className="c-text-C6A15B" />
        </div>
        <div className="font-body text-[11px] c-text-3C4654 px-2 py-2 border-t c-border-EDEFF3 mt-1">
          {otherOptions[2]}
        </div>
      </div>
    </div>
  );
}

function InstallGuide() {
  const [activeOs, setActiveOs] = useState("windows");
  const current = INSTALL_OS_OPTIONS.find((o) => o.id === activeOs);

  return (
    <section className="max-w-5xl mx-auto px-6 py-20 border-t c-border-D9DCE1">
      <h2 className="font-display text-3xl mb-2 text-center">Instale a Kosium como um app</h2>
      <p className="font-body c-text-3C4654 text-center mb-10 max-w-lg mx-auto">
        Sem loja de aplicativos, sem custo extra — direto do navegador. Toque no seu sistema para ver o passo a passo.
      </p>

      {/* organograma: ícones dos sistemas */}
      <div className="flex justify-center gap-4 sm:gap-8 mb-10 flex-wrap">
        {INSTALL_OS_OPTIONS.map((os) => {
          const Icon = os.icon;
          const active = activeOs === os.id;
          return (
            <button
              key={os.id}
              onClick={() => setActiveOs(os.id)}
              className="flex flex-col items-center gap-2"
            >
              <span
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                  active ? "c-bg-14213D" : "c-bg-F5F6F8 hoverc-bg-F4E9D2"
                }`}
              >
                <Icon size={26} className={active ? "text-white" : "c-text-14213D"} />
              </span>
              <span className={`font-body text-xs ${active ? "font-semibold c-text-14213D" : "c-text-6B8CA3"}`}>
                {os.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* conector visual do organograma */}
      <div className="flex justify-center mb-8">
        <div className="w-px h-8 c-bg-D9DCE1" />
      </div>

      {/* painel de passos + mockup do sistema escolhido */}
      <div className="grid md:grid-cols-2 gap-8 items-center c-bg-F5F6F8 rounded-2xl p-8">
        <div>
          <p className="font-body text-xs uppercase tracking-wide c-text-6B8CA3 mb-3">{current.label}</p>
          <ol className="space-y-3">
            {current.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 font-body text-sm c-text-3C4654">
                <span className="w-5 h-5 rounded-full c-bg-14213D text-white text-[11px] flex items-center justify-center shrink-0 font-medium">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
        <InstallMockup osId={activeOs} />
      </div>
    </section>
  );
}



const HERO_SCREENS = [
  { id: "agenda", label: "Agenda", icon: Calendar },
  { id: "prontuario", label: "Prontuário", icon: FileText },
  { id: "financeiro", label: "Financeiro", icon: DollarSign },
  { id: "internacao", label: "Internação", icon: BedDouble },
];

function HeroMockup() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((prev) => (prev + 1) % HERO_SCREENS.length), 3800);
    return () => clearInterval(id);
  }, []);

  const screenId = HERO_SCREENS[active].id;

  return (
    <div className="relative">
      <div className="rounded-xl overflow-hidden shadow-[0_25px_70px_-15px_rgba(11,31,58,0.4)] border c-border-D9DCE1 bg-white">
        <div className="c-bg-EDEFF3 px-4 py-2.5 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full c-bg-D9DCE1" />
            <span className="w-2.5 h-2.5 rounded-full c-bg-D9DCE1" />
            <span className="w-2.5 h-2.5 rounded-full c-bg-D9DCE1" />
          </div>
          <div className="flex gap-1 font-body text-[11px]">
            {HERO_SCREENS.map((s, i) => (
              <span
                key={s.id}
                className={`px-2.5 py-1 rounded-md transition-colors ${i === active ? "bg-white c-text-14213D font-medium shadow-sm" : "c-text-6B8CA3"}`}
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex min-h-[230px]">
          {/* mini navegação lateral */}
          <div className="hidden sm:flex flex-col items-center gap-4 c-bg-14213D py-5 px-2.5">
            {HERO_SCREENS.map((s, i) => (
              <s.icon key={s.id} size={15} className={i === active ? "c-text-C6A15B" : "c-text-white50"} />
            ))}
          </div>

          {/* conteúdo rotativo */}
          <div className="flex-1 p-4">
            {screenId === "agenda" && (
              <>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-body text-xs font-medium c-text-14213D">Agenda de hoje</p>
                  <span className="font-body text-[11px] c-text-6B8CA3">Qui, 09 de julho</span>
                </div>
                <div className="space-y-2">
                  {[
                    { time: "08:00", name: "Marina Costa", tag: "Confirmado", dot: "#2E7D46" },
                    { time: "09:15", name: "Renato Aquino", tag: "Retorno", dot: "#6B8CA3" },
                    { time: "10:00", name: "Beatriz Nogueira", tag: "Importante", dot: "#C6A15B" },
                    { time: "10:45", name: "Caio Alves", tag: "Aguardando", dot: "#B9B7AE" },
                  ].map((row) => (
                    <div key={row.time} className="flex items-center justify-between border c-border-EDEFF3 rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: row.dot }} />
                        <span className="font-mono text-[11px] c-text-6B8CA3">{row.time}</span>
                        <span className="font-body text-xs c-text-16202E">{row.name}</span>
                      </div>
                      <span className="font-body text-[10px] c-text-6B8CA3">{row.tag}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {screenId === "prontuario" && (
              <>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-body text-xs font-medium c-text-14213D">Prontuário — Marina Costa</p>
                  <span className="font-body text-[10px] c-bg-F4E9D2-40 c-text-8A6A24 px-2 py-0.5 rounded-full">CID-10: J45</span>
                </div>
                <div className="border c-border-EDEFF3 rounded-lg p-3 font-body text-[11px] c-text-3C4654 leading-relaxed mb-2">
                  Paciente refere falta de ar aos esforços há 3 dias, sem febre. Ausculta com sibilos
                  discretos bilaterais. Prescrito broncodilatador e retorno em 7 dias.
                </div>
                <span className="inline-flex items-center gap-1.5 font-body text-[10px] c-text-14213D">
                  <PenLine size={11} className="c-text-C6A15B" /> Assinado digitalmente — ICP-Brasil
                </span>
              </>
            )}

            {screenId === "financeiro" && (
              <>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-body text-xs font-medium c-text-14213D">Fluxo do dia</p>
                  <span className="font-body text-[11px] c-text-6B8CA3">09 de julho</span>
                </div>
                <div className="space-y-2 font-mono text-[11px]">
                  <div className="flex justify-between items-center border-b border-dashed c-border-D9DCE1 pb-1.5">
                    <span className="c-text-3C4654">+ Consulta médica</span>
                    <span className="c-text-14213D">R$ 350,00</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dashed c-border-D9DCE1 pb-1.5">
                    <span className="c-text-3C4654">+ Retorno</span>
                    <span className="c-text-14213D">R$ 180,00</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dashed c-border-D9DCE1 pb-1.5">
                    <span className="c-text-3C4654">− Taxa de máquina</span>
                    <span className="c-text-7C3B34">R$ 14,50</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="font-body font-medium text-[11px]">Saldo do dia</span>
                    <span className="c-text-14213D font-medium">R$ 515,50</span>
                  </div>
                </div>
              </>
            )}

            {screenId === "internacao" && (
              <>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-body text-xs font-medium c-text-14213D">Internação — UTI</p>
                  <span className="font-body text-[11px] c-text-6B8CA3">4 leitos ocupados</span>
                </div>
                <div className="space-y-2">
                  {[
                    { bed: "Leito 01", name: "Antônio Ferreira", risk: "#B91C1C", riskLabel: "Vermelho" },
                    { bed: "Leito 02", name: "Eduarda Martins", risk: "#D97706", riskLabel: "Laranja" },
                    { bed: "Leito 03", name: "Carlos Lima", risk: "#2E7D46", riskLabel: "Verde" },
                  ].map((row) => (
                    <div key={row.bed} className="flex items-center justify-between border c-border-EDEFF3 rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: row.risk }} />
                        <span className="font-mono text-[11px] c-text-6B8CA3">{row.bed}</span>
                        <span className="font-body text-xs c-text-16202E">{row.name}</span>
                      </div>
                      <span className="font-body text-[10px]" style={{ color: row.risk }}>{row.riskLabel}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* painel lateral contextual */}
          <div className="hidden lg:flex flex-col w-36 border-l c-border-EDEFF3 p-3">
            {screenId === "agenda" && (
              <>
                <div className="w-9 h-9 rounded-full c-bg-F4E9D2 flex items-center justify-center mb-2 font-display text-sm c-text-8A6A24">M</div>
                <p className="font-body text-xs font-medium mb-0.5">Marina Costa</p>
                <p className="font-body text-[10px] c-text-6B8CA3 mb-3">32 anos · Retorno</p>
                <span className="inline-flex items-center gap-1 font-body text-[10px] c-text-2E7D46 rounded-full px-2 py-1 w-fit" style={{ backgroundColor: "#EAF6EF" }}>
                  <MessageCircle size={10} /> Confirmado
                </span>
              </>
            )}
            {screenId === "prontuario" && (
              <>
                <FileCheck2 size={20} className="c-text-C6A15B mb-2" />
                <p className="font-body text-[11px] font-medium mb-0.5">Histórico completo</p>
                <p className="font-body text-[10px] c-text-6B8CA3">6 registros anteriores nesta ficha</p>
              </>
            )}
            {screenId === "financeiro" && (
              <>
                <TrendingUp size={20} className="c-text-2E7D46 mb-2" />
                <p className="font-body text-[11px] font-medium mb-0.5">Mês em alta</p>
                <p className="font-body text-[10px] c-text-6B8CA3">+12% vs. mês anterior</p>
              </>
            )}
            {screenId === "internacao" && (
              <>
                <ShieldCheck size={20} className="c-text-C6A15B mb-2" />
                <p className="font-body text-[11px] font-medium mb-0.5">Classificação de risco</p>
                <p className="font-body text-[10px] c-text-6B8CA3">Triagem de enfermagem em tempo real</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* cartão flutuante — gráfico de faturamento */}
      <div className="hidden md:block absolute -bottom-7 -right-6 w-40 bg-white rounded-2xl shadow-xl border c-border-D9DCE1 p-3">
        <p className="font-body text-[10px] font-medium c-text-14213D mb-1">Faturamento — julho</p>
        <ResponsiveContainer width="100%" height={64}>
          <BarChart data={[{ v: 30 }, { v: 45 }, { v: 38 }, { v: 60 }, { v: 52 }, { v: 70 }]}>
            <Bar dataKey="v" fill="#C6A15B" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* cartão flutuante — assinatura digital */}
      <div className="hidden md:flex absolute -top-5 -left-5 c-bg-14213D text-white rounded-xl px-4 py-2.5 items-center gap-2.5 shadow-lg">
        <PenLine size={15} className="c-text-C6A15B" />
        <div>
          <p className="font-body text-[11px] font-medium">Receita assinada</p>
          <p className="font-body text-[9px] c-text-white60">ICP-Brasil · VidaaS</p>
        </div>
      </div>
    </div>
  );
}

function Landing({ onEnter }) {
  const [authMode, setAuthMode] = useState(null); // null | "login" | "signup"
  const [checkoutPlan, setCheckoutPlan] = useState(null);

  return (
    <div className="min-h-screen c-bg-F5F6F8 c-text-16202E">
      <header className="max-w-6xl mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <LogoMark size={26} />
          <span className="font-display text-lg tracking-tight">Kosium</span>
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={() => setAuthMode("signup")}
            className="font-body text-sm font-medium c-text-3C4654 hoverc-text-14213D"
          >
            Criar cadastro
          </button>
          <button
            onClick={() => setAuthMode("login")}
            className="flex items-center gap-2 font-body text-sm font-medium px-4 py-2 rounded-lg border c-border-14213D c-text-14213D hoverc-bg-14213D hoverc-text-FFFFFF transition-colors"
          >
            <LogIn size={15} /> Entrar
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 border c-border-14213D rounded-full px-4 py-1.5 font-body text-xs c-text-14213D mb-6">
            <Sparkles size={13} className="c-text-C6A15B" /> Com IA de apoio embutida
          </div>
          <h1 className="font-display text-5xl leading-[1.1] mb-6">
            O software médico feito para acompanhar sua clínica em cada etapa
          </h1>
          <p className="font-body c-text-3C4654 text-lg leading-relaxed mb-8 max-w-lg">
            Agenda, prontuário eletrônico, prescrição assinada digitalmente e controle financeiro em
            um só lugar — do consultório de um médico ao hospital de grande porte.
          </p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setAuthMode("signup")}
              className="font-body font-medium px-7 py-3 rounded-lg c-bg-14213D text-white hoverc-bg-0B1729 transition-colors flex items-center gap-2"
            >
              Começar teste grátis de 14 dias <ArrowRight size={16} />
            </button>
            <a
              href="#planos"
              className="font-body font-medium px-7 py-3 rounded-lg border c-border-14213D c-text-14213D hoverc-bg-14213D hoverc-text-FFFFFF transition-colors"
            >
              Ver planos
            </a>
          </div>
        </div>

        <HeroMockup />
      </section>

      {/* Faixa de confiança */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid sm:grid-cols-3 gap-6 text-center">
        {[
          { icon: ShieldCheck, title: "LGPD & CFM", text: "Conformidade com a Resolução CFM sobre prescrição eletrônica" },
          { icon: Clock, title: "14 dias grátis", text: "Teste qualquer plano sem compromisso" },
          { icon: MessageCircle, title: "Suporte humanizado", text: "Atendimento direto pelo WhatsApp, sem robô" },
        ].map((item) => (
          <div key={item.title} className="flex flex-col items-center gap-2">
            <item.icon size={22} className="c-text-C6A15B" />
            <p className="font-body text-sm font-medium">{item.title}</p>
            <p className="font-body text-xs c-text-6B8CA3 max-w-[220px]">{item.text}</p>
          </div>
        ))}
      </section>

      {/* PLANS */}
      <section id="planos" className="c-bg-14213D px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl mb-2 text-white text-center">Planos para cada estágio</h2>
          <p className="font-body text-sm c-text-white70 mb-12 text-center">14 dias grátis em qualquer plano · 10% de desconto no plano anual</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`p-6 flex flex-col rounded-2xl relative ${
                  plan.highlight ? "bg-white" : "c-bg-white5 border c-border-white10"
                }`}
                style={plan.highlight ? { border: "2px solid #C6A15B" } : undefined}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 c-bg-C6A15B text-white font-body text-xs font-semibold rounded-full px-3 py-1">
                    Mais escolhido
                  </span>
                )}
                <h3 className={`font-display text-xl mt-2 ${plan.highlight ? "c-text-14213D" : "text-white"}`}>{plan.name}</h3>
                <p className={`font-body text-xs mb-4 ${plan.highlight ? "c-text-6B8CA3" : "c-text-white60"}`}>{plan.tagline}</p>
                <p className={`font-mono text-3xl mb-1 ${plan.highlight ? "c-text-14213D" : "text-white"}`}>
                  {plan.price}
                  {plan.price !== "Sob consulta" && <span className={`text-sm ${plan.highlight ? "c-text-6B8CA3" : "c-text-white60"}`}>/mês</span>}
                </p>
                <ul className="font-body text-xs space-y-2 my-5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 ${plan.highlight ? "c-text-3C4654" : "c-text-white75"}`}>
                      <CheckCircle2 size={13} className="c-text-C6A15B shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setCheckoutPlan(plan)}
                  className={`font-body font-medium text-sm px-4 py-2.5 rounded-lg transition-colors ${
                    plan.highlight
                      ? "c-bg-14213D text-white hoverc-bg-0B1729"
                      : "c-bg-C6A15B text-white hoverc-bg-A98649"
                  }`}
                >
                  Escolher {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeatureShowcase />
      <ComparisonTable />

      {/* Atendimento humanizado */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t c-border-D9DCE1">
        <h2 className="font-display text-3xl mb-2">Atendimento de verdade, não de robô</h2>
        <p className="font-body c-text-3C4654 mb-10">Alguém te responde quando você precisa — do onboarding ao dia a dia.</p>
        <div className="grid sm:grid-cols-2 gap-6">
          <Card className="p-6">
            <MessageCircle size={22} className="c-text-C6A15B mb-3" />
            <h3 className="font-display text-xl mb-2">Suporte via WhatsApp</h3>
            <p className="font-body text-sm c-text-3C4654 leading-relaxed">
              Precisa de ajuda? Fale direto com nosso time por WhatsApp, sem menu de robô e sem espera longa.
            </p>
          </Card>
          <Card className="p-6">
            <UserPlus size={22} className="c-text-C6A15B mb-3" />
            <h3 className="font-display text-xl mb-2">Onboarding assistido</h3>
            <p className="font-body text-sm c-text-3C4654 leading-relaxed">
              Te ajudamos a configurar clínica, agenda e equipe logo no primeiro acesso, para você começar a usar no mesmo dia.
            </p>
          </Card>
        </div>
      </section>

      <Testimonials />
      <FAQ />
      <InstallGuide />

      <section className="max-w-6xl mx-auto px-6 py-20 text-center border-t c-border-D9DCE1">
        <h2 className="font-display text-3xl mb-4">Pronta para organizar sua clínica?</h2>
        <button
          onClick={() => setAuthMode("signup")}
          className="font-body font-medium px-6 py-3 rounded-lg c-bg-C6A15B text-white hoverc-bg-A98649 transition-colors inline-flex items-center gap-2"
        >
          Experimentar agora <ArrowRight size={16} />
        </button>
      </section>

      <footer className="border-t c-border-D9DCE1 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <LogoMark size={20} />
            <span className="font-display text-base c-text-14213D">Kosium</span>
          </div>
          <p className="font-body text-xs c-text-6B8CA3 tracking-wide">Inspired by Kos. Built for the future.</p>
        </div>
      </footer>

      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSubmit={() => { onEnter("avancado"); setAuthMode(null); }}
        />
      )}
      {checkoutPlan && (
        <CheckoutModal
          plan={checkoutPlan}
          onClose={() => setCheckoutPlan(null)}
          onConfirm={() => { onEnter(checkoutPlan.id); setCheckoutPlan(null); }}
        />
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   APP SHELL
----------------------------------------------------------*/

function Sidebar({ active, setActive, userPlan, userRole, setUserRole, doctorRoom, setDoctorRoom, mobileOpen, setMobileOpen, onExit, isDesktop, hospitalUsers, currentHospitalUserId, setCurrentHospitalUserId }) {
  const currentHospitalUser = hospitalUsers?.find((u) => u.id === currentHospitalUserId);

  function itemRoleOk(itemId) {
    if (ALWAYS_ALLOWED_TABS.includes(itemId)) return true;
    if (userPlan === "hospital") {
      if (!currentHospitalUser) return false;
      if (currentHospitalUser.isAdmin) return true;
      if (itemId === "equipe") return false;
      return currentHospitalUser.allowedModules.includes(itemId);
    }
    return userRole === "medico" || RECEPTION_ALLOWED_TABS.includes(itemId);
  }

  return (
    <>
      {mobileOpen && !isDesktop && (
        <div className="fixed inset-0 c-bg-black30 z-20" onClick={() => setMobileOpen(false)} />
      )}
      <aside
        className="c-bg-14213D text-white flex flex-col transition-transform h-full w-64"
        style={
          isDesktop
            ? { position: "static", transform: "none" }
            : {
                position: "fixed",
                zIndex: 30,
                top: 0,
                left: 0,
                transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
              }
        }
      >
        <div className="flex items-center gap-2 px-6 py-6">
          <LogoMark size={22} />
          <span className="font-display text-lg">Kosium</span>
          {!isDesktop && (
            <button className="ml-auto" onClick={() => setMobileOpen(false)}>
              <X size={18} />
            </button>
          )}
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const planOk = planAllows(userPlan, item.minPlan);
            const roleOk = itemRoleOk(item.id);
            const allowed = planOk && roleOk;
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => allowed && setActive(item.id)}
                title={!roleOk ? "Setor não liberado para este usuário" : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-body text-sm transition-colors
                  ${isActive ? "c-bg-white10 text-white" : "c-text-white75 hoverc-bg-white5"}
                  ${!allowed ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Icon size={17} />
                <span className="flex-1 text-left">{item.label}</span>
                {!allowed && <Lock size={13} />}
              </button>
            );
          })}
        </nav>

        <div className="px-6 py-5 border-t c-border-white10">
          {userPlan === "hospital" ? (
            <>
              <p className="font-body text-xs c-text-white50 mb-2">Usuário ativo (simular login)</p>
              <select
                value={currentHospitalUserId}
                onChange={(e) => setCurrentHospitalUserId(Number(e.target.value))}
                className="w-full c-bg-white10 text-white border-0 rounded-lg px-2 py-1.5 font-body text-xs mb-4"
              >
                {hospitalUsers.map((u) => (
                  <option key={u.id} value={u.id} className="text-black">
                    {u.name}{u.isAdmin ? " (mestre)" : ""}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <>
              <p className="font-body text-xs c-text-white50 mb-2">Papel de acesso</p>
              <div className="flex gap-1.5 mb-4">
                <button
                  onClick={() => setUserRole("medico")}
                  className={`flex-1 py-1.5 rounded-lg font-body text-xs ${userRole === "medico" ? "c-bg-C6A15B text-white" : "c-bg-white10 c-text-white75"}`}
                >
                  Médico
                </button>
                <button
                  onClick={() => setUserRole("recepcao")}
                  className={`flex-1 py-1.5 rounded-lg font-body text-xs ${userRole === "recepcao" ? "c-bg-C6A15B text-white" : "c-bg-white10 c-text-white75"}`}
                >
                  Recepção
                </button>
              </div>
              {userRole === "medico" && (
                <>
                  <p className="font-body text-xs c-text-white50 mb-1">Sua sala de atendimento</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-body text-xs text-white">{doctorRoom || "Ainda não escolhida"}</span>
                    <button onClick={() => setDoctorRoom(null)} className="font-body text-[11px] c-text-C6A15B underline">
                      Trocar
                    </button>
                  </div>
                </>
              )}
            </>
          )}
          <p className="font-body text-xs c-text-white50 mb-2">Plano atual</p>
          <p className="font-body text-sm capitalize mb-3">{userPlan}</p>
          <button onClick={onExit} className="font-body text-xs c-text-white60 hover:text-white">
            ← Voltar à página inicial
          </button>
        </div>
      </aside>
    </>
  );
}

function UpgradeNotice({ requiredPlan, roleRestricted }) {
  if (roleRestricted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-24 px-6">
        <Lock size={28} className="c-text-6B8CA3 mb-4" />
        <h3 className="font-display text-2xl mb-2">Acesso restrito</h3>
        <p className="font-body c-text-3C4654 max-w-sm">
          Este setor não está liberado para o usuário/papel atual. Fale com o usuário mestre (Equipe) para solicitar acesso.
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-6">
      <Lock size={28} className="c-text-6B8CA3 mb-4" />
      <h3 className="font-display text-2xl mb-2">Recurso do plano {requiredPlan}</h3>
      <p className="font-body c-text-3C4654 max-w-sm">
        Este módulo faz parte de um plano superior. Faça upgrade para liberar o acesso.
      </p>
    </div>
  );
}

/* ---------------------------------------------------------
   DASHBOARD
----------------------------------------------------------*/

function Dashboard({ userPlan, appointments, transactions }) {
  const today = appointments.length;
  const entradas = transactions.filter((t) => t.type === "entrada").reduce((s, t) => s + t.amount, 0);
  const saidas = transactions.filter((t) => t.type === "saida").reduce((s, t) => s + t.amount, 0);
  const highlights = appointments.filter((a) => a.priority === "importante");

  return (
    <div className="p-6 md:p-10">
      <h1 className="font-display text-3xl mb-1">Bom dia, Doutora.</h1>
      <p className="font-body c-text-6B8CA3 mb-8">Aqui está um resumo do seu consultório hoje.</p>

      {highlights.length > 0 && (
        <div className="c-bg-14213D rounded-2xl p-6 mb-8 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full c-bg-white5" />
          <p className="font-body text-xs uppercase tracking-[0.2em] c-text-C6A15B mb-4 flex items-center gap-2">
            <Star size={13} className="c-fill-C6A15B" /> Destaques de hoje
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 relative">
            {highlights.map((h) => (
              <div key={h.id} className="c-bg-white10 rounded-xl px-4 py-3 backdrop-blur-sm">
                <p className="font-mono text-white text-sm mb-0.5">{h.time}</p>
                <p className="font-body text-white text-sm font-medium">{h.patient}</p>
                <p className="font-body c-text-white60 text-xs">{h.type}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <Card className="p-5">
          <p className="font-body text-xs c-text-6B8CA3 mb-2">Consultas hoje</p>
          <p className="font-mono text-3xl">{today}</p>
        </Card>
        {planAllows(userPlan, "avancado") ? (
          <>
            <Card className="p-5">
              <p className="font-body text-xs c-text-6B8CA3 mb-2 flex items-center gap-1">
                <TrendingUp size={13} /> Entradas (mês)
              </p>
              <p className="font-mono text-3xl c-text-14213D">R$ {entradas.toLocaleString("pt-BR")}</p>
            </Card>
            <Card className="p-5">
              <p className="font-body text-xs c-text-6B8CA3 mb-2 flex items-center gap-1">
                <TrendingDown size={13} /> Saídas (mês)
              </p>
              <p className="font-mono text-3xl c-text-7C3B34">R$ {saidas.toLocaleString("pt-BR")}</p>
            </Card>
          </>
        ) : (
          <Card className="p-5 sm:col-span-2 flex items-center gap-3 c-text-6B8CA3">
            <Lock size={16} /> <span className="font-body text-sm">Financeiro disponível no plano Avançado</span>
          </Card>
        )}
      </div>

      <Card className="p-6">
        <p className="font-body text-sm font-medium mb-4">Próximos atendimentos</p>
        <div className="space-y-3">
          {appointments.slice(0, 4).map((a) => (
            <div key={a.id} className="flex items-center justify-between text-sm font-body border-b c-border-EDEFF3 last:border-0 pb-3 last:pb-0">
              <span className="flex items-center gap-2 c-text-3C4654">
                {a.priority === "importante" && <Star size={12} className="c-text-C6A15B c-fill-C6A15B" />}
                <Clock size={14} className="c-text-6B8CA3" /> {a.time}
              </span>
              <span>{a.patient}</span>
              <Badge tone={a.status === "confirmado" ? "sage" : "ink"}>{a.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------
   AGENDA
----------------------------------------------------------*/

function WhatsAppConfirmModal({ appointment, onClose, onConfirmed }) {
  const [stage, setStage] = useState("sending"); // sending -> sent -> confirmed
  const fakeLink = `kosium.app/c/${appointment.id}`;

  React.useEffect(() => {
    const t = setTimeout(() => setStage("sent"), 1000);
    return () => clearTimeout(t);
  }, []);

  function simulatePatientConfirm() {
    setStage("confirmed");
    setTimeout(() => {
      onConfirmed();
      onClose();
    }, 900);
  }

  return (
    <div className="fixed inset-0 c-bg-black40 z-40 flex items-center justify-center p-6">
      <Card className="p-8 max-w-sm w-full text-center">
        <MessageCircle size={28} className="mx-auto c-text-14213D mb-4" />
        <h3 className="font-display text-xl mb-1">Confirmação por WhatsApp</h3>
        <p className="font-body text-sm c-text-6B8CA3 mb-6">
          Template "Utility" · {appointment.patient}
        </p>

        {stage === "sending" && (
          <p className="font-body text-sm c-text-6B8CA3 animate-pulse mb-6">Enviando template aprovado…</p>
        )}

        {(stage === "sent" || stage === "confirmed") && (
          <div className="c-bg-F5F6F8 rounded-xl p-4 text-left mb-6">
            <p className="font-body text-sm c-text-16202E mb-3">
              Olá {appointment.patient.split(" ")[0]}! Sua consulta está marcada para{" "}
              <strong>{appointment.time}</strong>. Confirme aqui:
            </p>
            <div className="flex items-center gap-2 bg-white border c-border-D9DCE1 rounded-lg px-3 py-2">
              <Link2 size={14} className="c-text-6B8CA3 shrink-0" />
              <span className="font-mono text-xs c-text-14213D truncate">{fakeLink}</span>
              <Copy size={13} className="c-text-6B8CA3 ml-auto shrink-0" />
            </div>
          </div>
        )}

        {stage === "confirmed" && (
          <p className="font-body text-sm c-text-14213D mb-6 flex items-center justify-center gap-2">
            <CheckCircle2 size={16} /> Paciente confirmou pelo link
          </p>
        )}

        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 border c-border-D9DCE1 rounded-lg py-2 font-body text-sm">
            Fechar
          </button>
          {stage === "sent" && (
            <button
              onClick={simulatePatientConfirm}
              className="flex-1 c-bg-14213D text-white rounded-lg py-2 font-body text-sm"
            >
              Simular confirmação
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}

function GoogleSyncBanner({ synced, onSync }) {
  return (
    <div className="flex items-center justify-between bg-white border c-border-D9DCE1 rounded-xl px-4 py-3 mb-4">
      <div className="flex items-center gap-2 font-body text-sm c-text-3C4654">
        <RefreshCw size={15} className={synced ? "c-text-14213D" : "c-text-6B8CA3"} />
        {synced ? "Sincronizado com o Google Calendar" : "Google Calendar não conectado"}
      </div>
      <button
        onClick={onSync}
        className={`font-body text-xs font-medium px-3 py-1.5 rounded-lg ${
          synced ? "c-bg-E6ECF1 c-text-3D5A70" : "c-bg-14213D text-white"
        }`}
      >
        {synced ? "Conectado" : "Conectar"}
      </button>
    </div>
  );
}

function Agenda({ appointments, setAppointments, userRole, doctorRoom, setDoctorRoom, rooms, onCallPatient, onGoToAttendance }) {
  const [form, setForm] = useState({ time: "", patient: "", type: "Consulta", priority: "rotina" });
  const [gcalSynced, setGcalSynced] = useState(false);
  const [waTarget, setWaTarget] = useState(null);
  const [now, setNow] = useState(new Date());
  const [callingId, setCallingId] = useState(null);
  const [callRoom, setCallRoom] = useState(doctorRoom || "Consultório");

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 30000); // recalcula a cada 30s
    return () => clearInterval(interval);
  }, []);

  // Portão obrigatório: o médico precisa escolher em qual sala está antes de usar a Agenda.
  // A recepção não passa por essa exigência (não atende em sala própria).
  if (userRole === "medico" && !doctorRoom) {
    return (
      <div className="p-6 md:p-10 flex items-center justify-center min-h-[70vh]">
        <Card className="p-8 max-w-sm w-full text-center">
          <DoorOpen size={28} className="c-text-C6A15B mx-auto mb-3" />
          <h2 className="font-display text-xl mb-2">Em qual sala você vai atender hoje?</h2>
          <p className="font-body text-xs c-text-6B8CA3 mb-5">
            Essa escolha é obrigatória — é o que aparece pro paciente no Painel de Chamada.
          </p>
          {rooms.length === 0 ? (
            <p className="font-body text-xs c-text-6B8CA3 italic">
              Nenhuma sala cadastrada ainda. Peça ao administrador para cadastrar em Cadastro → Salas de atendimento.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {rooms.map((room) => (
                <button
                  key={room}
                  onClick={() => setDoctorRoom(room)}
                  className="w-full border c-border-D9DCE1 rounded-lg py-2.5 font-body text-sm hoverc-bg-14213D hoverc-text-FFFFFF transition-colors"
                >
                  {room}
                </button>
              ))}
            </div>
          )}
        </Card>
      </div>
    );
  }

  function addAppointment() {
    if (!form.time || !form.patient) return;
    setAppointments((prev) =>
      [...prev, { id: Date.now(), status: "aguardando", checkinAt: null, ...form }].sort((a, b) => a.time.localeCompare(b.time))
    );
    setForm({ time: "", patient: "", type: "Consulta", priority: "rotina" });
  }

  function markConfirmed(id) {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status: "confirmado" } : a)));
  }

  function markArrived(id) {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, checkinAt: new Date().toISOString() } : a)));
  }

  function togglePriority(id) {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, priority: a.priority === "importante" ? "rotina" : "importante" } : a))
    );
  }

  function confirmCall(appointment) {
    onCallPatient(appointment, callRoom || "Consultório");
    setCallingId(null);
  }

  return (
    <div className="p-6 md:p-10">
      <h1 className="font-display text-3xl mb-1">Agenda médica</h1>
      <div className="flex items-center gap-3 flex-wrap mb-6">
        <p className="font-body c-text-6B8CA3">Terça-feira, 09 de julho de 2026</p>
        {userRole === "medico" && doctorRoom && (
          <span className="inline-flex items-center gap-1.5 font-body text-xs c-text-14213D c-bg-F4E9D2-40 rounded-full px-3 py-1">
            <DoorOpen size={12} /> {doctorRoom}
          </span>
        )}
      </div>

      <GoogleSyncBanner synced={gcalSynced} onSync={() => setGcalSynced((s) => !s)} />

      <div className="flex items-center gap-4 mb-4 font-body text-xs c-text-6B8CA3">
        <span className="flex items-center gap-1.5"><CheckinDot status="chegou" /> Chegou</span>
        <span className="flex items-center gap-1.5"><CheckinDot status="aguardando" /> Aguardando</span>
        <span className="flex items-center gap-1.5"><CheckinDot status="atrasado" /> Atraso (15min+)</span>
        <span className="flex items-center gap-1.5"><CheckinDot status="nao_compareceu" /> Não compareceu (45min+)</span>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-2">
          <div className="space-y-2">
            {appointments.map((a) => {
              const status = checkinStatus(a, now);
              return (
              <div key={a.id} className="flex items-center gap-3 font-body text-sm py-3 border-b c-border-EDEFF3 last:border-0">
                <button
                  onClick={() => togglePriority(a.id)}
                  title={a.priority === "importante" ? "Marcar como rotina" : "Marcar como importante"}
                >
                  <Star
                    size={16}
                    className={a.priority === "importante" ? "c-text-C6A15B c-fill-C6A15B" : "c-text-D9DCE1"}
                  />
                </button>
                <CheckinDot status={status} />
                <span className="font-mono c-text-14213D w-14">{a.time}</span>
                <span className="flex-1">{a.patient}</span>
                <Badge tone="ink">{a.type}</Badge>
                <Badge tone={a.status === "confirmado" ? "sage" : "accent"}>{a.status}</Badge>
                {!a.checkinAt && (
                  <button
                    onClick={() => markArrived(a.id)}
                    title="Marcar que o paciente chegou"
                    className="c-text-6B8CA3 hoverc-text-2E7D46"
                  >
                    <CheckCircle2 size={16} />
                  </button>
                )}
                {a.status !== "confirmado" && (
                  <button
                    onClick={() => setWaTarget(a)}
                    title="Enviar confirmação por WhatsApp"
                    className="c-text-6B8CA3 hoverc-text-14213D"
                  >
                    <MessageCircle size={16} />
                  </button>
                )}
                {callingId === a.id ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      value={callRoom}
                      onChange={(e) => setCallRoom(e.target.value)}
                      placeholder="Sala"
                      className="w-24 border c-border-D9DCE1 rounded-lg px-2 py-1 font-body text-xs"
                    />
                    <button onClick={() => confirmCall(a)} className="c-text-2E7D46" title="Confirmar chamada">
                      <CheckCircle2 size={16} />
                    </button>
                    <button onClick={() => setCallingId(null)} className="c-text-6B8CA3" title="Cancelar">
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setCallingId(a.id); setCallRoom(doctorRoom || "Consultório"); }}
                    title="Chamar paciente no painel"
                    className="flex items-center gap-1 c-text-6B8CA3 hoverc-text-C6A15B"
                  >
                    <Volume2 size={16} />
                  </button>
                )}
                <button
                  onClick={() => onGoToAttendance(a)}
                  title="Ir direto para o atendimento deste paciente"
                  className="flex items-center gap-1 c-text-6B8CA3 hoverc-text-14213D"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6 h-fit">
          <p className="font-body text-sm font-medium mb-4 flex items-center gap-2"><Plus size={15} /> Novo agendamento</p>
          <div className="space-y-3">
            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
            />
            <input
              type="text"
              placeholder="Nome do paciente"
              value={form.patient}
              onChange={(e) => setForm({ ...form, patient: e.target.value })}
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
            />
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
            >
              <option>Consulta</option>
              <option>Retorno</option>
              <option>Procedimento</option>
              <option>Cirurgia (avaliação)</option>
            </select>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setForm({ ...form, priority: "rotina" })}
                className={`flex-1 py-2 rounded-lg font-body text-sm ${form.priority === "rotina" ? "c-bg-14213D text-white" : "border c-border-D9DCE1"}`}
              >
                Rotina
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, priority: "importante" })}
                className={`flex-1 py-2 rounded-lg font-body text-sm flex items-center justify-center gap-1 ${form.priority === "importante" ? "c-bg-C6A15B text-white" : "border c-border-D9DCE1"}`}
              >
                <Star size={13} /> Importante
              </button>
            </div>
            <button
              onClick={addAppointment}
              className="w-full c-bg-14213D text-white font-body text-sm font-medium py-2.5 rounded-lg hoverc-bg-0B1729"
            >
              Adicionar
            </button>
          </div>
        </Card>
      </div>

      {waTarget && (
        <WhatsAppConfirmModal
          appointment={waTarget}
          onClose={() => setWaTarget(null)}
          onConfirmed={() => markConfirmed(waTarget.id)}
        />
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   FINANCEIRO
----------------------------------------------------------*/

function Financeiro({ transactions, setTransactions }) {
  const [form, setForm] = useState({ type: "entrada", category: ENTRADA_CATEGORIES[0], amount: "" });

  const entradas = transactions.filter((t) => t.type === "entrada").reduce((s, t) => s + t.amount, 0);
  const saidas = transactions.filter((t) => t.type === "saida").reduce((s, t) => s + t.amount, 0);

  const chartData = useMemo(() => {
    const byDate = {};
    transactions.forEach((t) => {
      byDate[t.date] = byDate[t.date] || { date: t.date, entrada: 0, saida: 0 };
      byDate[t.date][t.type] += t.amount;
    });
    return Object.values(byDate);
  }, [transactions]);

  function addTransaction() {
    const amount = parseFloat(form.amount);
    if (!amount) return;
    setTransactions((prev) => [
      { id: Date.now(), date: "hoje", type: form.type, category: form.category, amount },
      ...prev,
    ]);
    setForm({ ...form, amount: "" });
  }

  return (
    <div className="p-6 md:p-10">
      <h1 className="font-display text-3xl mb-1">Controle contábil</h1>
      <p className="font-body c-text-6B8CA3 mb-8">Entradas e saídas do consultório</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <Card className="p-5">
          <p className="font-body text-xs c-text-6B8CA3 mb-2">Total entradas</p>
          <p className="font-mono text-3xl c-text-14213D">R$ {entradas.toLocaleString("pt-BR")}</p>
        </Card>
        <Card className="p-5">
          <p className="font-body text-xs c-text-6B8CA3 mb-2">Total saídas</p>
          <p className="font-mono text-3xl c-text-7C3B34">R$ {saidas.toLocaleString("pt-BR")}</p>
        </Card>
      </div>

      <Card className="p-6 mb-6">
        <p className="font-body text-sm font-medium mb-4">Fluxo de caixa</p>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid stroke="#EDEFF3" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 12, fontFamily: "Instrument Sans" }} />
              <YAxis tick={{ fontSize: 12, fontFamily: "Instrument Sans" }} />
              <Tooltip />
              <Bar dataKey="entrada" fill="#14213D" radius={[4, 4, 0, 0]} />
              <Bar dataKey="saida" fill="#7C3B34" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-2 overflow-x-auto">
          <p className="font-body text-sm font-medium mb-4">Lançamentos</p>
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="text-left c-text-6B8CA3 text-xs">
                <th className="pb-2">Data</th>
                <th className="pb-2">Categoria</th>
                <th className="pb-2 text-right">Valor</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-t c-border-EDEFF3">
                  <td className="py-2 font-mono text-xs">{t.date}</td>
                  <td className="py-2">{t.category}</td>
                  <td className={`py-2 text-right font-mono ${t.type === "entrada" ? "c-text-14213D" : "c-text-7C3B34"}`}>
                    {t.type === "entrada" ? "+" : "−"} R$ {t.amount.toLocaleString("pt-BR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="p-6 h-fit">
          <p className="font-body text-sm font-medium mb-4 flex items-center gap-2"><Plus size={15} /> Novo lançamento</p>
          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                onClick={() => setForm({ type: "entrada", category: ENTRADA_CATEGORIES[0], amount: form.amount })}
                className={`flex-1 py-2 rounded-lg font-body text-sm ${form.type === "entrada" ? "c-bg-14213D text-white" : "border c-border-D9DCE1"}`}
              >
                Entrada
              </button>
              <button
                onClick={() => setForm({ type: "saida", category: SAIDA_CATEGORIES[0], amount: form.amount })}
                className={`flex-1 py-2 rounded-lg font-body text-sm ${form.type === "saida" ? "c-bg-7C3B34 text-white" : "border c-border-D9DCE1"}`}
              >
                Saída
              </button>
            </div>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
            >
              {(form.type === "entrada" ? ENTRADA_CATEGORIES : SAIDA_CATEGORIES).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Valor (R$)"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm font-mono"
            />
            <button
              onClick={addTransaction}
              className="w-full c-bg-14213D text-white font-body text-sm font-medium py-2.5 rounded-lg hoverc-bg-0B1729"
            >
              Lançar
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   PRONTUÁRIO + ASSINATURA (VidaaS, simulada)
----------------------------------------------------------*/

function SignModal({ record, onClose, onSigned }) {
  const [stage, setStage] = useState("qrcode"); // qrcode -> signing -> done

  function proceed() {
    if (stage === "qrcode") {
      setStage("signing");
      setTimeout(() => setStage("done"), 1400);
    } else if (stage === "done") {
      onSigned();
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 c-bg-black40 z-40 flex items-center justify-center p-6">
      <Card className="p-8 max-w-sm w-full text-center">
        <ShieldCheck size={28} className="mx-auto c-text-14213D mb-4" />
        <h3 className="font-display text-xl mb-2">Assinatura eletrônica</h3>
        <p className="font-body text-sm c-text-6B8CA3 mb-6">via certificado VidaaS (ICP-Brasil)</p>

        {stage === "qrcode" && (
          <>
            <div className="w-32 h-32 mx-auto c-bg-F5F6F8 border border-dashed c-border-D9DCE1 rounded-lg flex items-center justify-center mb-4 font-mono text-xs c-text-6B8CA3">
              QR Code
            </div>
            <p className="font-body text-xs c-text-6B8CA3 mb-6">Simulação: escaneie com o app VidaaS para autorizar</p>
          </>
        )}
        {stage === "signing" && (
          <p className="font-body text-sm c-text-6B8CA3 mb-6 animate-pulse">Aguardando confirmação no app…</p>
        )}
        {stage === "done" && (
          <p className="font-body text-sm c-text-14213D mb-6 flex items-center justify-center gap-2">
            <CheckCircle2 size={16} /> Documento assinado com validade jurídica
          </p>
        )}

        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 border c-border-D9DCE1 rounded-lg py-2 font-body text-sm">
            Cancelar
          </button>
          <button
            onClick={proceed}
            disabled={stage === "signing"}
            className="flex-1 c-bg-14213D text-white rounded-lg py-2 font-body text-sm disabled:opacity-50"
          >
            {stage === "done" ? "Concluir" : "Assinar"}
          </button>
        </div>
      </Card>
    </div>
  );
}

// Lê um arquivo de imagem selecionado e devolve como data URL (base64),
// pra funcionar 100% no navegador, sem precisar de servidor de arquivos.
function readImageFile(file, callback) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => callback(e.target.result);
  reader.readAsDataURL(file);
}

// Botão de anexar foto — reutilizado em qualquer lugar do sistema que precise
// de upload de imagem (prontuário, histórico de prontuários anteriores etc.)
function PhotoAttachButton({ onAttach, label = "Anexar foto" }) {
  const inputRef = React.useRef(null);
  return (
    <>
      <button
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-1.5 text-xs font-body border c-border-D9DCE1 px-3 py-1.5 rounded-lg hoverc-bg-F5F6F8"
      >
        <Camera size={13} /> {label}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          readImageFile(e.target.files?.[0], onAttach);
          e.target.value = "";
        }}
      />
    </>
  );
}

function ImageLightbox({ src, caption, onClose }) {
  return (
    <div className="fixed inset-0 c-bg-black40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="max-w-2xl w-full bg-white rounded-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 border-b c-border-D9DCE1">
          <p className="font-body text-sm font-medium">{caption || "Anexo"}</p>
          <button onClick={onClose} className="c-text-6B8CA3 hoverc-text-16202E">
            <X size={18} />
          </button>
        </div>
        <img src={src} alt={caption || "Anexo"} className="w-full h-auto max-h-[70vh] object-contain c-bg-F5F6F8" />
      </div>
    </div>
  );
}

function DocumentPdfModal({ title, meta, children, onClose }) {
  const [downloaded, setDownloaded] = useState(false);

  function handleDownload() {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  }

  return (
    <div className="fixed inset-0 c-bg-black40 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <Card className="max-w-xl w-full my-8 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b c-border-D9DCE1">
          <div className="flex items-center gap-2">
            <FileCheck2 size={18} className="c-text-14213D" />
            <div>
              <p className="font-body text-sm font-medium">{title}</p>
              {meta && <p className="font-body text-xs c-text-6B8CA3">{meta}</p>}
            </div>
          </div>
          <button onClick={onClose} className="c-text-6B8CA3 hoverc-text-16202E">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 c-bg-F5F6F8 max-h-[55vh] overflow-y-auto">
          <div className="printable-doc bg-white p-5 font-mono text-[11px] leading-relaxed text-black rounded-lg shadow-sm">
            {children}
          </div>
        </div>

        <div className="px-6 py-4 border-t c-border-D9DCE1 flex flex-wrap items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 c-bg-14213D text-white font-body text-sm font-medium px-4 py-2 rounded-lg hoverc-bg-0B1729"
          >
            <Printer size={15} /> Imprimir
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 border c-border-D9DCE1 font-body text-sm font-medium px-4 py-2 rounded-lg"
          >
            <Download size={15} /> {downloaded ? "PDF baixado ✓" : "Baixar PDF"}
          </button>
          <span className="font-body text-xs c-text-6B8CA3 ml-auto">Assinado digitalmente · VidaaS (ICP-Brasil)</span>
        </div>
      </Card>
    </div>
  );
}

function NewPatientModal({ onClose, onSave }) {
  const emptyForm = {
    name: "", birthDate: "", motherName: "", cpf: "", rg: "", phone: "", email: "", sex: "", cns: "",
    race: "", ethnicity: "",
    cep: "", street: "", number: "", complement: "", city: "", state: "",
  };
  const [form, setForm] = useState(emptyForm);
  const [cepStatus, setCepStatus] = useState("idle"); // idle | loading | found | notfound

  function field(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function lookupCep(rawCep) {
    const cep = rawCep.replace(/\D/g, "");
    if (cep.length !== 8) return;
    setCepStatus("loading");
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (data.erro) {
        setCepStatus("notfound");
      } else {
        setForm((f) => ({
          ...f,
          street: data.logradouro || f.street,
          city: data.localidade || f.city,
          state: data.uf || f.state,
        }));
        setCepStatus("found");
      }
    } catch (e) {
      setCepStatus("notfound");
    }
  }

  function submit() {
    if (!form.name.trim()) return;
    onSave(form);
  }

  return (
    <div className="fixed inset-0 c-bg-black40 z-40 flex items-center justify-center p-4 overflow-y-auto">
      <Card className="p-6 md:p-8 max-w-2xl w-full my-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-2xl flex items-center gap-2">
            <UserPlus size={22} className="c-text-14213D" /> Novo paciente
          </h3>
          <button onClick={onClose} className="c-text-6B8CA3 hoverc-text-16202E">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <p className="font-body text-xs uppercase tracking-wide c-text-6B8CA3 mb-2">Dados pessoais</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                value={form.name}
                onChange={(e) => field("name", e.target.value)}
                placeholder="Nome completo"
                className="sm:col-span-2 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
              />
              <input
                value={form.motherName}
                onChange={(e) => field("motherName", e.target.value)}
                placeholder="Nome da mãe"
                className="sm:col-span-2 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
              />
              <div>
                <label className="font-body text-xs c-text-6B8CA3 block mb-1">Data de nascimento</label>
                <input
                  type="date"
                  value={form.birthDate}
                  onChange={(e) => field("birthDate", e.target.value)}
                  className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
                />
              </div>
              <input
                value={form.cpf}
                onChange={(e) => field("cpf", e.target.value)}
                placeholder="CPF"
                className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
              />
              <input
                value={form.rg}
                onChange={(e) => field("rg", e.target.value)}
                placeholder="RG"
                className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
              />
              <input
                value={form.phone}
                onChange={(e) => field("phone", e.target.value)}
                placeholder="Telefone"
                className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
              />
              <input
                value={form.email}
                onChange={(e) => field("email", e.target.value)}
                placeholder="E-mail"
                type="email"
                className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
              />
              <select
                value={form.sex}
                onChange={(e) => field("sex", e.target.value)}
                className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm c-text-3C4654"
              >
                <option value="">Sexo</option>
                <option>Feminino</option>
                <option>Masculino</option>
                <option>Outro</option>
              </select>
              <input
                value={form.cns}
                onChange={(e) => field("cns", e.target.value)}
                placeholder="CNS (Cartão Nacional de Saúde)"
                className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
              />
              <select
                value={form.race}
                onChange={(e) => field("race", e.target.value)}
                className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm c-text-3C4654"
              >
                <option value="">Raça/Cor (autoinformada)</option>
                <option>Branca</option>
                <option>Preta</option>
                <option>Parda</option>
                <option>Amarela</option>
                <option>Indígena</option>
              </select>
              {form.race === "Indígena" && (
                <input
                  value={form.ethnicity}
                  onChange={(e) => field("ethnicity", e.target.value)}
                  placeholder="Etnia"
                  className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
                />
              )}
            </div>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-wide c-text-6B8CA3 mb-2 flex items-center gap-1">
              <MapPin size={12} /> Endereço
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="relative sm:col-span-1">
                <input
                  value={form.cep}
                  onChange={(e) => field("cep", e.target.value)}
                  onBlur={(e) => lookupCep(e.target.value)}
                  placeholder="CEP"
                  className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
                />
                {cepStatus === "loading" && (
                  <span className="absolute right-3 top-2.5 text-[10px] font-body c-text-6B8CA3">buscando…</span>
                )}
              </div>
              <input
                value={form.street}
                onChange={(e) => field("street", e.target.value)}
                placeholder="Rua"
                className="sm:col-span-2 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
              />
              <input
                value={form.number}
                onChange={(e) => field("number", e.target.value)}
                placeholder="Número"
                className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
              />
              <input
                value={form.complement}
                onChange={(e) => field("complement", e.target.value)}
                placeholder="Complemento"
                className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
              />
              <input
                value={form.city}
                onChange={(e) => field("city", e.target.value)}
                placeholder="Cidade"
                className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
              />
              <input
                value={form.state}
                onChange={(e) => field("state", e.target.value)}
                placeholder="Estado"
                className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
              />
            </div>
            {cepStatus === "notfound" && (
              <p className="font-body text-xs c-text-7C3B34 mt-2">CEP não encontrado — preencha o endereço manualmente.</p>
            )}
            {cepStatus === "found" && (
              <p className="font-body text-xs c-text-3D5A70 mt-2">Endereço preenchido automaticamente a partir do CEP.</p>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button onClick={onClose} className="flex-1 border c-border-D9DCE1 rounded-lg py-2.5 font-body text-sm">
            Cancelar
          </button>
          <button
            onClick={submit}
            className="flex-1 c-bg-14213D text-white rounded-lg py-2.5 font-body text-sm hoverc-bg-0B1729"
          >
            Salvar paciente
          </button>
        </div>
      </Card>
    </div>
  );
}

function Pacientes({ patients, setPatients, userPlan, transferSectors, setTransferSectors }) {
  const [query, setQuery] = useState("");
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [transferringId, setTransferringId] = useState(null);
  const [newSector, setNewSector] = useState("");
  const [showManageSectors, setShowManageSectors] = useState(false);
  const [newSectorName, setNewSectorName] = useState("");

  const canTransfer = planAllows(userPlan, "avancado");
  const filtered = patients.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  function saveNewPatient(form) {
    setPatients((prev) => [...prev, { id: Date.now(), lastVisit: "—", records: [], ...form }]);
    setShowAddPatient(false);
  }

  function openTransfer(patientId) {
    setTransferringId(patientId);
    setNewSector("");
  }

  function confirmTransfer(patientId) {
    if (!newSector) return;
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id !== patientId) return p;
        const entry = {
          id: Date.now(),
          from: p.currentSector || "Recepção",
          to: newSector,
          date: new Date().toLocaleString("pt-BR"),
        };
        return { ...p, currentSector: newSector, transferHistory: [entry, ...(p.transferHistory || [])] };
      })
    );
    setTransferringId(null);
    setNewSector("");
  }

  function addTransferSector() {
    if (!newSectorName.trim() || transferSectors.includes(newSectorName.trim())) return;
    setTransferSectors((prev) => [...prev, newSectorName.trim()]);
    setNewSectorName("");
  }

  function removeTransferSector(sector) {
    setTransferSectors((prev) => prev.filter((s) => s !== sector));
  }

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between mb-1 flex-wrap gap-3">
        <h1 className="font-display text-3xl">Pacientes</h1>
        <div className="flex items-center gap-2">
          {canTransfer && (
            <button
              onClick={() => setShowManageSectors(true)}
              className="flex items-center gap-2 border c-border-D9DCE1 rounded-lg px-4 py-2.5 font-body text-sm hoverc-bg-F5F6F8"
            >
              <Pencil size={14} /> Setores de transferência
            </button>
          )}
          <button
            onClick={() => setShowAddPatient(true)}
            className="flex items-center gap-2 c-bg-14213D text-white rounded-lg px-4 py-2.5 font-body text-sm hoverc-bg-0B1729"
          >
            <UserPlus size={15} /> Novo paciente
          </button>
        </div>
      </div>
      <p className="font-body c-text-6B8CA3 mb-6">Cadastro completo dos pacientes da clínica</p>

      <div className="flex items-center gap-2 border c-border-D9DCE1 rounded-lg px-3 py-2 mb-6 max-w-sm bg-white">
        <Search size={14} className="c-text-6B8CA3" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nome"
          className="font-body text-sm outline-none flex-1"
        />
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full text-sm font-body min-w-[720px]">
          <thead>
            <tr className="border-b c-border-D9DCE1 text-left text-xs c-text-6B8CA3">
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">Nascimento</th>
              <th className="px-6 py-3">CPF</th>
              <th className="px-6 py-3">Telefone</th>
              <th className="px-6 py-3">Sexo</th>
              <th className="px-6 py-3">CNS</th>
              <th className="px-6 py-3">Cidade/UF</th>
              {canTransfer && <th className="px-6 py-3">Setor atual</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b c-border-EDEFF3 last:border-0">
                <td className="px-6 py-3 font-medium">{p.name}</td>
                <td className="px-6 py-3 font-mono text-xs">{formatBirthDate(p.birthDate) || "—"}</td>
                <td className="px-6 py-3 font-mono text-xs">{p.cpf || "—"}</td>
                <td className="px-6 py-3">{p.phone || "—"}</td>
                <td className="px-6 py-3">{p.sex || "—"}</td>
                <td className="px-6 py-3 font-mono text-xs">{p.cns || "—"}</td>
                <td className="px-6 py-3">{p.city ? `${p.city}/${p.state}` : "—"}</td>
                {canTransfer && (
                  <td className="px-6 py-3">
                    {transferringId === p.id ? (
                      <div className="flex items-center gap-1.5">
                        <select
                          value={newSector}
                          onChange={(e) => setNewSector(e.target.value)}
                          className="border c-border-D9DCE1 rounded-lg px-2 py-1 font-body text-xs"
                        >
                          <option value="">Para onde?</option>
                          {transferSectors.map((s) => <option key={s}>{s}</option>)}
                        </select>
                        <button onClick={() => confirmTransfer(p.id)} className="c-text-2E7D46" title="Confirmar">
                          <CheckCircle2 size={16} />
                        </button>
                        <button onClick={() => setTransferringId(null)} className="c-text-6B8CA3" title="Cancelar">
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {p.currentSector ? <Badge tone="sage">{p.currentSector}</Badge> : <span className="c-text-6B8CA3 text-xs">—</span>}
                        <button
                          onClick={() => openTransfer(p.id)}
                          title="Transferir paciente para outro setor"
                          className="c-text-6B8CA3 hoverc-text-14213D"
                        >
                          <ArrowUpCircle size={15} />
                        </button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={canTransfer ? 8 : 7} className="px-6 py-8 text-center c-text-6B8CA3 italic">
                  Nenhum paciente encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      {showManageSectors && (
        <div className="fixed inset-0 c-bg-black40 z-40 flex items-center justify-center p-4">
          <Card className="p-6 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl">Setores de transferência</h3>
              <button onClick={() => setShowManageSectors(false)} className="c-text-6B8CA3 hoverc-text-16202E">
                <X size={18} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {transferSectors.map((s) => (
                <span key={s} className="flex items-center gap-1.5 c-bg-F5F6F8 rounded-full px-3 py-1 font-body text-xs">
                  {s}
                  <button onClick={() => removeTransferSector(s)} className="c-text-6B8CA3 hoverc-text-7C3B34">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={newSectorName}
                onChange={(e) => setNewSectorName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTransferSector()}
                placeholder="Novo setor (ex.: Especialidade X)"
                className="flex-1 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
              />
              <button onClick={addTransferSector} className="c-bg-14213D text-white px-4 rounded-lg font-body text-sm hoverc-bg-0B1729">
                <Plus size={14} />
              </button>
            </div>
          </Card>
        </div>
      )}

      {showAddPatient && (
        <NewPatientModal onClose={() => setShowAddPatient(false)} onSave={saveNewPatient} />
      )}
    </div>
  );
}

function VitalsModal({ onClose, onSave }) {
  const emptyForm = {
    peso: "", altura: "", pressaoSistolica: "", pressaoDiastolica: "",
    satO2: "", frequenciaCardiaca: "", pulso: "", frequenciaRespiratoria: "",
    cintura: "", abdomen: "", glicemiaJejum: "", glicemiaPosPrandial: "", alergias: "",
  };
  const [form, setForm] = useState(emptyForm);

  function field(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  const imc = (() => {
    const pesoNum = parseFloat(form.peso);
    const alturaNum = parseFloat(form.altura) / 100; // cm → m
    if (!pesoNum || !alturaNum) return null;
    return (pesoNum / (alturaNum * alturaNum)).toFixed(1);
  })();

  function submit() {
    onSave({ ...form, imc, data: new Date().toLocaleDateString("pt-BR") });
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center p-4 overflow-y-auto">
      <Card className="p-6 md:p-8 max-w-2xl w-full my-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-2xl flex items-center gap-2">
            <Activity size={22} className="c-text-14213D" /> Dados de saúde
          </h3>
          <button onClick={onClose} className="c-text-6B8CA3 hoverc-text-16202E">
            <X size={18} />
          </button>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          <div>
            <label className="font-body text-xs c-text-6B8CA3 block mb-1">Peso (kg)</label>
            <input value={form.peso} onChange={(e) => field("peso", e.target.value)}
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm" />
          </div>
          <div>
            <label className="font-body text-xs c-text-6B8CA3 block mb-1">Altura (cm)</label>
            <input value={form.altura} onChange={(e) => field("altura", e.target.value)}
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm" />
          </div>
          <div>
            <label className="font-body text-xs c-text-6B8CA3 block mb-1">IMC</label>
            <input value={imc ?? ""} disabled placeholder="calculado"
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm c-bg-F5F6F8 c-text-6B8CA3" />
          </div>

          <div>
            <label className="font-body text-xs c-text-6B8CA3 block mb-1">Pressão sistólica (mmHg)</label>
            <input value={form.pressaoSistolica} onChange={(e) => field("pressaoSistolica", e.target.value)}
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm" />
          </div>
          <div>
            <label className="font-body text-xs c-text-6B8CA3 block mb-1">Pressão diastólica (mmHg)</label>
            <input value={form.pressaoDiastolica} onChange={(e) => field("pressaoDiastolica", e.target.value)}
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm" />
          </div>
          <div>
            <label className="font-body text-xs c-text-6B8CA3 block mb-1">Saturação de O2 (%)</label>
            <input value={form.satO2} onChange={(e) => field("satO2", e.target.value)}
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm" />
          </div>

          <div>
            <label className="font-body text-xs c-text-6B8CA3 block mb-1">Frequência cardíaca (bpm)</label>
            <input value={form.frequenciaCardiaca} onChange={(e) => field("frequenciaCardiaca", e.target.value)}
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm" />
          </div>
          <div>
            <label className="font-body text-xs c-text-6B8CA3 block mb-1">Pulso (bpm)</label>
            <input value={form.pulso} onChange={(e) => field("pulso", e.target.value)}
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm" />
          </div>
          <div>
            <label className="font-body text-xs c-text-6B8CA3 block mb-1">Frequência respiratória (rpm)</label>
            <input value={form.frequenciaRespiratoria} onChange={(e) => field("frequenciaRespiratoria", e.target.value)}
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm" />
          </div>

          <div>
            <label className="font-body text-xs c-text-6B8CA3 block mb-1">Circunferência da cintura (cm)</label>
            <input value={form.cintura} onChange={(e) => field("cintura", e.target.value)}
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm" />
          </div>
          <div>
            <label className="font-body text-xs c-text-6B8CA3 block mb-1">Circunferência do abdome (cm)</label>
            <input value={form.abdomen} onChange={(e) => field("abdomen", e.target.value)}
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm" />
          </div>
          <div />

          <div>
            <label className="font-body text-xs c-text-6B8CA3 block mb-1">Glicemia capilar em jejum (mg/dL)</label>
            <input value={form.glicemiaJejum} onChange={(e) => field("glicemiaJejum", e.target.value)}
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm" />
          </div>
          <div className="sm:col-span-2">
            <label className="font-body text-xs c-text-6B8CA3 block mb-1">Glicemia capilar pós-prandial (mg/dL)</label>
            <input value={form.glicemiaPosPrandial} onChange={(e) => field("glicemiaPosPrandial", e.target.value)}
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm" />
          </div>
        </div>

        <label className="font-body text-xs c-text-6B8CA3 block mb-1">Alergias</label>
        <textarea
          value={form.alergias}
          onChange={(e) => field("alergias", e.target.value)}
          rows={2}
          placeholder="Ex.: NEGA, ou descreva as alergias conhecidas"
          className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm mb-6"
        />

        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 border c-border-D9DCE1 rounded-lg py-2.5 font-body text-sm">
            Cancelar
          </button>
          <button onClick={submit} className="flex-1 c-bg-14213D text-white rounded-lg py-2.5 font-body text-sm hoverc-bg-0B1729">
            Salvar dados de saúde
          </button>
        </div>
      </Card>
    </div>
  );
}

function Prontuario({ patients, setPatients }) {
  const [selectedId, setSelectedId] = useState(patients[0].id);
  const [query, setQuery] = useState("");
  const [newNote, setNewNote] = useState("");
  const [signingRecord, setSigningRecord] = useState(null);
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showVitals, setShowVitals] = useState(false);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [lightbox, setLightbox] = useState(null); // { src, caption }
  const [legacyCaption, setLegacyCaption] = useState("");
  const [legacyDate, setLegacyDate] = useState("");

  const selected = patients.find((p) => p.id === selectedId);
  const filtered = patients.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  function attachLegacyPhoto(dataUrl) {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === selectedId
          ? {
              ...p,
              legacyPhotos: [
                { id: Date.now(), src: dataUrl, caption: legacyCaption, date: legacyDate || "Data não informada" },
                ...(p.legacyPhotos || []),
              ],
            }
          : p
      )
    );
    setLegacyCaption("");
    setLegacyDate("");
  }

  function removeLegacyPhoto(photoId) {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === selectedId ? { ...p, legacyPhotos: (p.legacyPhotos || []).filter((ph) => ph.id !== photoId) } : p
      )
    );
  }

  function addNote() {
    if (!newNote.trim()) return;
    setPatients((prev) =>
      prev.map((p) =>
        p.id === selectedId
          ? { ...p, records: [{ id: Date.now(), date: "hoje", note: newNote, signed: false }, ...p.records] }
          : p
      )
    );
    setNewNote("");
  }

  function markSigned(recordId) {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === selectedId
          ? { ...p, records: p.records.map((r) => (r.id === recordId ? { ...r, signed: true } : r)) }
          : p
      )
    );
    const record = selected.records.find((r) => r.id === recordId);
    setPdfDoc({
      title: "Prontuário — " + patientLabel(selected),
      meta: "Registro de " + (record ? record.date : "hoje"),
      note: record ? record.note : "",
    });
  }

  function saveNewPatient(form) {
    const id = Date.now();
    setPatients((prev) => [...prev, { id, lastVisit: "—", records: [], vitals: [], ...form }]);
    setSelectedId(id);
    setShowAddPatient(false);
  }

  function saveVitals(data) {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === selectedId
          ? { ...p, vitals: [{ id: Date.now(), ...data }, ...(p.vitals || [])] }
          : p
      )
    );
    setShowVitals(false);
  }

  function deleteVitals(vitalsId) {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === selectedId
          ? { ...p, vitals: (p.vitals || []).filter((v) => v.id !== vitalsId) }
          : p
      )
    );
  }

  return (
    <div className="p-6 md:p-10">
      <h1 className="font-display text-3xl mb-1">Prontuário médico</h1>
      <p className="font-body c-text-6B8CA3 mb-8">Histórico e registros clínicos por paciente</p>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-4 h-fit">
          <button
            onClick={() => setShowAddPatient(true)}
            className="w-full flex items-center justify-center gap-2 c-bg-14213D text-white rounded-lg py-2.5 font-body text-sm mb-3 hoverc-bg-0B1729"
          >
            <UserPlus size={15} /> Novo paciente
          </button>
          <div className="flex items-center gap-2 border c-border-D9DCE1 rounded-lg px-3 py-2 mb-4">
            <Search size={14} className="c-text-6B8CA3" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar paciente"
              className="font-body text-sm outline-none flex-1"
            />
          </div>
          <div className="space-y-1">
            {filtered.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg font-body text-sm flex items-center justify-between ${
                  selectedId === p.id ? "c-bg-14213D text-white" : "hoverc-bg-F5F6F8"
                }`}
              >
                <span>{patientLabel(p)}</span>
                <ChevronRight size={14} className={selectedId === p.id ? "text-white" : "c-text-6B8CA3"} />
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-6 md:col-span-2">
          <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
            <h2 className="font-display text-xl">{patientLabel(selected)}</h2>
            <Badge tone="ink">Última visita: {selected.lastVisit}</Badge>
          </div>
          {(selected.cpf || selected.phone || selected.city) && (
            <p className="font-body text-xs c-text-6B8CA3 mb-4">
              {[selected.cpf && `CPF ${selected.cpf}`, selected.phone, selected.city && `${selected.city}/${selected.state}`]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}

          {selected.vitals && selected.vitals.length > 0 && (
            <div className="mb-6 border c-border-D9DCE1 rounded-xl p-4 c-bg-F5F6F8">
              <p className="font-body text-xs uppercase tracking-wide c-text-6B8CA3 mb-3 flex items-center gap-1.5">
                <Activity size={13} /> Apêndice — Dados de saúde
              </p>
              <div className="space-y-3">
                {selected.vitals.map((v) => (
                  <div key={v.id} className="bg-white rounded-lg p-3 border c-border-EDEFF3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-mono text-xs c-text-6B8CA3">{v.data}</p>
                      <button
                        onClick={() => deleteVitals(v.id)}
                        title="Excluir este registro"
                        className="c-text-6B8CA3 hoverc-text-7C3B34"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 font-body text-xs c-text-3C4654">
                      {v.peso && <span>Peso: {v.peso} kg</span>}
                      {v.altura && <span>Altura: {v.altura} cm</span>}
                      {v.imc && <span>IMC: {v.imc}</span>}
                      {(v.pressaoSistolica || v.pressaoDiastolica) && (
                        <span>PA: {v.pressaoSistolica || "…"}/{v.pressaoDiastolica || "…"} mmHg</span>
                      )}
                      {v.satO2 && <span>Sat O2: {v.satO2}%</span>}
                      {v.frequenciaCardiaca && <span>FC: {v.frequenciaCardiaca} bpm</span>}
                      {v.pulso && <span>Pulso: {v.pulso} bpm</span>}
                      {v.frequenciaRespiratoria && <span>F.R.: {v.frequenciaRespiratoria} rpm</span>}
                      {v.cintura && <span>Cintura: {v.cintura} cm</span>}
                      {v.abdomen && <span>Abdome: {v.abdomen} cm</span>}
                      {v.glicemiaJejum && <span>Glicemia jejum: {v.glicemiaJejum} mg/dL</span>}
                      {v.glicemiaPosPrandial && <span>Glicemia pós-prandial: {v.glicemiaPosPrandial} mg/dL</span>}
                    </div>
                    {v.alergias && (
                      <p className="font-body text-xs c-text-7C3B34 mt-2">
                        <strong>Alergias:</strong> {v.alergias}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6 border c-border-D9DCE1 rounded-xl p-4">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
              <p className="font-body text-xs uppercase tracking-wide c-text-6B8CA3 flex items-center gap-1.5">
                <Paperclip size={13} /> Prontuários anteriores anexados
              </p>
            </div>
            <p className="font-body text-xs c-text-6B8CA3 mb-3">
              Fotografe páginas de prontuários antigos (papel ou de outro sistema) para continuar a história clínica do paciente aqui.
            </p>
            <div className="flex flex-wrap items-end gap-2 mb-3">
              <input
                value={legacyDate}
                onChange={(e) => setLegacyDate(e.target.value)}
                type="date"
                className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-xs"
              />
              <input
                value={legacyCaption}
                onChange={(e) => setLegacyCaption(e.target.value)}
                placeholder="Descrição (ex.: Prontuário da Clínica X, 2022)"
                className="flex-1 min-w-[180px] border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-xs"
              />
              <PhotoAttachButton onAttach={attachLegacyPhoto} label="Anexar foto" />
            </div>
            {selected.legacyPhotos && selected.legacyPhotos.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {selected.legacyPhotos.map((ph) => (
                  <div key={ph.id} className="relative group">
                    <img
                      src={ph.src}
                      alt={ph.caption || "Prontuário anterior"}
                      onClick={() => setLightbox({ src: ph.src, caption: `${ph.caption || "Prontuário anterior"} — ${ph.date}` })}
                      className="w-full h-20 rounded-lg object-cover border c-border-D9DCE1 cursor-pointer"
                    />
                    <button
                      onClick={() => removeLegacyPhoto(ph.id)}
                      className="absolute -top-1.5 -right-1.5 c-bg-7C3B34 text-white rounded-full p-0.5"
                      title="Remover"
                    >
                      <X size={11} />
                    </button>
                    <p className="font-body text-[10px] c-text-6B8CA3 mt-1 truncate">{ph.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-body text-xs c-text-6B8CA3 italic">Nenhum prontuário anterior anexado ainda.</p>
            )}
          </div>

          {(selected.examHistory?.length > 0 || selected.referralHistory?.length > 0 || selected.prescriptionHistory?.length > 0 || selected.reportHistory?.length > 0 || selected.transferHistory?.length > 0) && (
            <div className="mb-6 border c-border-D9DCE1 rounded-xl p-4">
              <p className="font-body text-xs uppercase tracking-wide c-text-6B8CA3 mb-3 flex items-center gap-1.5">
                <FileCheck2 size={13} /> Histórico completo do paciente
              </p>

              {selected.examHistory?.length > 0 && (
                <div className="mb-4">
                  <p className="font-body text-xs font-medium c-text-14213D mb-2 flex items-center gap-1.5"><FlaskConical size={12} /> Exames solicitados</p>
                  <div className="space-y-2">
                    {selected.examHistory.map((e) => (
                      <div key={e.id} className="bg-white rounded-lg p-3 border c-border-EDEFF3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-xs c-text-6B8CA3">{e.date}</span>
                          <Badge tone="sage">Assinado</Badge>
                        </div>
                        <p className="font-body text-sm c-text-3C4654">{e.exams.join(", ")}</p>
                        {e.cid && <p className="font-body text-xs c-text-6B8CA3 mt-0.5">CID-10: {e.cid}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selected.referralHistory?.length > 0 && (
                <div className="mb-4">
                  <p className="font-body text-xs font-medium c-text-14213D mb-2 flex items-center gap-1.5"><Share2 size={12} /> Encaminhamentos</p>
                  <div className="space-y-2">
                    {selected.referralHistory.map((r) => (
                      <div key={r.id} className="bg-white rounded-lg p-3 border c-border-EDEFF3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-xs c-text-6B8CA3">{r.date}</span>
                          <Badge tone="sage">Assinado</Badge>
                        </div>
                        <p className="font-body text-sm c-text-3C4654">Para {r.specialty}{r.reason && ` — ${r.reason}`}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selected.prescriptionHistory?.length > 0 && (
                <div className="mb-4">
                  <p className="font-body text-xs font-medium c-text-14213D mb-2 flex items-center gap-1.5"><Pill size={12} /> Receituário</p>
                  <div className="space-y-2">
                    {selected.prescriptionHistory.map((p) => (
                      <div key={p.id} className="bg-white rounded-lg p-3 border c-border-EDEFF3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-xs c-text-6B8CA3">{p.date}</span>
                          <Badge tone="sage">Assinado</Badge>
                        </div>
                        <p className="font-body text-sm c-text-3C4654">
                          {p.drug} {p.mode === "controlada" && "(controle especial)"}
                        </p>
                        {p.posology && <p className="font-body text-xs c-text-6B8CA3 mt-0.5">{p.posology}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selected.reportHistory?.length > 0 && (
                <div className="mb-4">
                  <p className="font-body text-xs font-medium c-text-14213D mb-2 flex items-center gap-1.5"><FileCheck2 size={12} /> Relatórios e laudos</p>
                  <div className="space-y-2">
                    {selected.reportHistory.map((r) => (
                      <div key={r.id} className="bg-white rounded-lg p-3 border c-border-EDEFF3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-xs c-text-6B8CA3">{r.date}</span>
                          <Badge tone="sage">Assinado</Badge>
                        </div>
                        <p className="font-body text-sm font-medium">{r.tipo}{r.titulo && ` — ${r.titulo}`}</p>
                        <p className="font-body text-xs c-text-6B8CA3 mt-0.5">{r.texto}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selected.transferHistory?.length > 0 && (
                <div>
                  <p className="font-body text-xs font-medium c-text-14213D mb-2 flex items-center gap-1.5"><ArrowUpCircle size={12} /> Transferências de setor</p>
                  <div className="space-y-2">
                    {selected.transferHistory.map((t) => (
                      <div key={t.id} className="bg-white rounded-lg p-3 border c-border-EDEFF3">
                        <p className="font-mono text-xs c-text-6B8CA3 mb-1">{t.date}</p>
                        <p className="font-body text-sm c-text-3C4654">{t.from} → {t.to}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <p className="font-body text-xs uppercase tracking-wide c-text-6B8CA3 mb-2 flex items-center gap-1.5">
            <FileText size={13} /> Anotações de prontuário
          </p>
          <div className="my-6 space-y-4">
            {selected.records.map((r) => (
              <div key={r.id} className="border c-border-EDEFF3 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs c-text-6B8CA3">{r.date}</span>
                  {r.signed ? (
                    <Badge tone="sage">Assinado</Badge>
                  ) : (
                    <button
                      onClick={() => setSigningRecord(r.id)}
                      className="flex items-center gap-1 text-xs font-body c-text-C6A15B hover:underline"
                    >
                      <PenLine size={12} /> Assinar digitalmente
                    </button>
                  )}
                </div>
                <p className="font-body text-sm c-text-3C4654">{r.note}</p>
                {r.photo && (
                  <img
                    src={r.photo}
                    alt="Anexo do registro"
                    onClick={() => setLightbox({ src: r.photo, caption: `Anexo — ${r.date}` })}
                    className="mt-2 w-20 h-20 rounded-lg object-cover border c-border-D9DCE1 cursor-pointer"
                  />
                )}
              </div>
            ))}
            {selected.records.length === 0 && (
              <p className="font-body text-sm c-text-6B8CA3 italic">Nenhum registro ainda para este paciente.</p>
            )}
          </div>

          {selected.records.length > 0 && <div className="mb-2" />}

          <div className="border-t c-border-EDEFF3 pt-4">
            <p className="font-body text-sm font-medium mb-2">Nova anotação</p>
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={3}
              placeholder="Descreva a consulta, exame físico, conduta…"
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm mb-3"
            />
            <button
              onClick={addNote}
              className="c-bg-14213D text-white font-body text-sm font-medium px-4 py-2 rounded-lg hoverc-bg-0B1729"
            >
              Salvar no prontuário
            </button>
          </div>
        </Card>
      </div>

      {signingRecord && (
        <SignModal
          onClose={() => setSigningRecord(null)}
          onSigned={() => markSigned(signingRecord)}
        />
      )}
      {showAddPatient && (
        <NewPatientModal onClose={() => setShowAddPatient(false)} onSave={saveNewPatient} />
      )}
      {showVitals && (
        <VitalsModal onClose={() => setShowVitals(false)} onSave={saveVitals} />
      )}
      {pdfDoc && (
        <DocumentPdfModal title={pdfDoc.title} meta={pdfDoc.meta} onClose={() => setPdfDoc(null)}>
          <p className="font-body font-medium text-sm mb-3">{patientLabel(selected)}</p>
          <p className="c-text-3C4654 whitespace-pre-wrap">{pdfDoc.note}</p>
          <p className="mt-6 pt-3 border-t border-dashed border-black text-center">
            ✓ Assinado digitalmente (VidaaS — ICP-Brasil)
          </p>
        </DocumentPdfModal>
      )}
      {lightbox && (
        <ImageLightbox src={lightbox.src} caption={lightbox.caption} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   IA DE APOIO
----------------------------------------------------------*/

function IAAssistente() {
  const [messages, setMessages] = useState([
    { role: "ia", text: "Olá, Doutora. Sobre o que você gostaria de tirar uma dúvida rápida hoje?" },
  ]);
  const [input, setInput] = useState("");

  function send(text) {
    const q = text ?? input;
    if (!q.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ia",
          text: "Simulação de resposta: aqui a IA traria um resumo objetivo, com fontes clínicas confiáveis, sobre '" + q + "'.",
        },
      ]);
    }, 700);
  }

  return (
    <div className="p-6 md:p-10 flex flex-col h-full">
      <h1 className="font-display text-3xl mb-1 flex items-center gap-2">
        <Bot size={26} className="c-text-14213D" /> IA de apoio
      </h1>
      <p className="font-body c-text-6B8CA3 mb-6">Pesquisas rápidas e dúvidas clínicas ou administrativas</p>

      <Card className="p-6 flex-1 flex flex-col max-w-2xl">
        <div className="flex-1 space-y-4 mb-4 overflow-y-auto max-h-[380px]">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`font-body text-sm px-4 py-2.5 rounded-2xl max-w-[80%] ${
                  m.role === "user" ? "c-bg-14213D text-white" : "c-bg-F5F6F8 c-text-16202E"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {AI_SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="flex items-center gap-1 text-xs font-body px-3 py-1.5 rounded-full border c-border-D9DCE1 c-text-3C4654 hoverc-bg-F5F6F8"
            >
              <Sparkles size={11} className="c-text-C6A15B" /> {s}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Digite sua dúvida…"
            className="flex-1 border c-border-D9DCE1 rounded-lg px-3 py-2.5 font-body text-sm"
          />
          <button onClick={() => send()} className="c-bg-14213D text-white px-4 rounded-lg hoverc-bg-0B1729">
            <Send size={16} />
          </button>
        </div>
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------
   ATENDIMENTO — modelos editáveis (prontuário, exames,
   encaminhamentos) e receituário simples/controlada
----------------------------------------------------------*/

function EditableList({ items, onAdd, onRemove, placeholder, renderItem }) {
  const [value, setValue] = useState("");
  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && value.trim() && (onAdd(value), setValue(""))}
          placeholder={placeholder}
          className="flex-1 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
        />
        <button
          onClick={() => value.trim() && (onAdd(value), setValue(""))}
          className="c-bg-14213D text-white px-4 rounded-lg font-body text-sm flex items-center gap-1"
        >
          <Plus size={14} /> Criar
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between border c-border-EDEFF3 rounded-lg px-4 py-2.5">
            {renderItem(item)}
            <button onClick={() => onRemove(item.id)} className="c-text-6B8CA3 hoverc-text-7C3B34">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="font-body text-sm c-text-6B8CA3 italic">Nenhum atalho criado ainda.</p>
        )}
      </div>
    </div>
  );
}

function ProntuarioTemplatesTab({ templates, setTemplates, patients, setPatients, cid, setCid, patientId }) {
  const [title, setTitle] = useState("");
  const [modelText, setModelText] = useState("");

  const [recordText, setRecordText] = useState("");
  const [recordPhoto, setRecordPhoto] = useState(null);
  const [insertTemplateId, setInsertTemplateId] = useState("");
  const [showSign, setShowSign] = useState(false);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [showVitals, setShowVitals] = useState(false);

  const recordPatient = patients.find((p) => String(p.id) === String(patientId));

  function addModel() {
    if (!title.trim() || !modelText.trim()) return;
    setTemplates((prev) => [...prev, { id: Date.now(), title, text: modelText }]);
    setTitle("");
    setModelText("");
  }

  function insertTemplate(templateId) {
    setInsertTemplateId(templateId);
    const template = templates.find((t) => String(t.id) === String(templateId));
    if (template) {
      setRecordText((prev) => (prev ? prev + "\n" + template.text : template.text));
    }
  }

  function generateRecord() {
    if (!patientId || !recordText.trim()) return;
    setShowSign(true);
  }

  function onRecordSigned() {
    const newRecord = { id: Date.now(), date: "hoje", note: recordText, photo: recordPhoto, signed: true };
    setPatients((prev) =>
      prev.map((p) =>
        String(p.id) === String(patientId)
          ? { ...p, records: [newRecord, ...p.records] }
          : p
      )
    );
    setPdfDoc({
      patientLabel: recordPatient ? patientLabel(recordPatient) : "",
      note: recordText,
      date: new Date().toLocaleDateString("pt-BR"),
    });
    setRecordText("");
    setRecordPhoto(null);
    setInsertTemplateId("");
  }

  function saveVitals(data) {
    setPatients((prev) =>
      prev.map((p) =>
        String(p.id) === String(patientId)
          ? { ...p, vitals: [{ id: Date.now(), ...data }, ...(p.vitals || [])] }
          : p
      )
    );
    setShowVitals(false);
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-2">
          <p className="font-body text-sm font-medium flex items-center gap-2">
            <FileCheck2 size={15} /> Novo registro de prontuário
          </p>
          <button
            onClick={() => setShowVitals(true)}
            disabled={!patientId}
            title={patientId ? "Registrar dados de saúde do paciente selecionado" : "Selecione um paciente na Agenda primeiro"}
            className="flex items-center gap-1.5 text-xs font-body c-bg-14213D text-white px-3 py-1.5 rounded-full hoverc-bg-0B1729 disabled:opacity-40"
          >
            <Activity size={13} /> Dados de saúde
          </button>
        </div>

        {templates.length > 0 && (
          <select
            value={insertTemplateId}
            onChange={(e) => insertTemplate(e.target.value)}
            className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm mb-2"
          >
            <option value="">Inserir um modelo pré-formatado (opcional)…</option>
            {templates.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
          </select>
        )}

        <textarea
          value={recordText}
          onChange={(e) => setRecordText(e.target.value)}
          rows={8}
          placeholder="Queixa, exame físico, conduta…"
          className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm mb-3"
        />

        <div className="flex items-center gap-3 mb-3">
          <PhotoAttachButton onAttach={setRecordPhoto} label="Anexar foto ao registro" />
          {recordPhoto && (
            <div className="flex items-center gap-2">
              <img src={recordPhoto} alt="Anexo" className="w-10 h-10 rounded-lg object-cover border c-border-D9DCE1" />
              <button onClick={() => setRecordPhoto(null)} className="c-text-6B8CA3 hoverc-text-7C3B34">
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        <CidField value={cid} onChange={setCid} label="CID-10 (opcional — reaproveitado em Exames, Encaminhamento e Receituário)" />

        <button
          onClick={generateRecord}
          disabled={!patientId || !recordText.trim()}
          className="w-full c-bg-14213D text-white font-body text-sm font-medium py-2.5 rounded-lg hoverc-bg-0B1729 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <PenLine size={14} /> Gerar e assinar registro
        </button>
      </Card>

      <div className="space-y-6">
        <Card className="p-6">
          <p className="font-body text-sm font-medium mb-1">Modelos pré-formatados</p>
          <p className="font-body text-xs c-text-6B8CA3 mb-4">
            Atalhos para economizar tempo — o registro oficial e assinado é sempre feito ao lado.
          </p>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título do modelo (ex.: Consulta de rotina)"
            className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm mb-3"
          />
          <textarea
            value={modelText}
            onChange={(e) => setModelText(e.target.value)}
            rows={3}
            placeholder="Texto pré-formatado"
            className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm mb-3"
          />
          <button onClick={addModel} className="c-bg-14213D text-white px-4 py-2 rounded-lg font-body text-sm flex items-center gap-2">
            <Plus size={14} /> Salvar modelo
          </button>
        </Card>

        <Card className="p-6">
          <p className="font-body text-sm font-medium mb-4">Meus modelos</p>
          <div className="space-y-3">
            {templates.map((t) => (
              <div key={t.id} className="border c-border-EDEFF3 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-body text-sm font-medium">{t.title}</p>
                  <button
                    onClick={() => setTemplates((prev) => prev.filter((x) => x.id !== t.id))}
                    className="c-text-6B8CA3 hoverc-text-7C3B34"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <p className="font-body text-xs c-text-6B8CA3">{t.text}</p>
              </div>
            ))}
            {templates.length === 0 && (
              <p className="font-body text-sm c-text-6B8CA3 italic">Nenhum modelo criado ainda.</p>
            )}
          </div>
        </Card>
      </div>

      {showSign && (
        <SignModal onClose={() => setShowSign(false)} onSigned={onRecordSigned} />
      )}
      {pdfDoc && (
        <DocumentPdfModal title="Prontuário" meta={pdfDoc.date} onClose={() => setPdfDoc(null)}>
          <p className="font-body font-medium text-sm mb-3">{pdfDoc.patientLabel}</p>
          <p className="c-text-3C4654 whitespace-pre-wrap">{pdfDoc.note}</p>
          <p className="mt-6 pt-3 border-t border-dashed border-black text-center">
            ✓ Assinado digitalmente (VidaaS — ICP-Brasil)
          </p>
        </DocumentPdfModal>
      )}
      {showVitals && (
        <VitalsModal onClose={() => setShowVitals(false)} onSave={saveVitals} />
      )}
    </div>
  );
}

function PatientSelect({ patients, value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm mb-3 c-text-16202E"
    >
      <option value="">Selecione o paciente…</option>
      {patients.map((p) => (
        <option key={p.id} value={p.id}>{patientLabel(p)}</option>
      ))}
    </select>
  );
}

function ExamesTab({ exams, setExams, patients, setPatients, cid, setCid, patientId }) {
  const [selected, setSelected] = useState([]);
  const [showSign, setShowSign] = useState(false);
  const [signedRequest, setSignedRequest] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);

  function toggleExam(name) {
    setSelected((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
  }

  function generate() {
    if (!patientId || selected.length === 0) return;
    setShowSign(true);
  }

  function onSigned() {
    const patient = patients.find((p) => String(p.id) === String(patientId));
    const label = patient ? patientLabel(patient) : "";
    const date = new Date().toLocaleDateString("pt-BR");
    const entry = { id: Date.now(), date, exams: selected, cid, signed: true };
    setSignedRequest({ patientLabel: label, exams: selected, date, cid });
    setPdfDoc({ patientLabel: label, exams: selected, date, cid });
    setPatients((prev) =>
      prev.map((p) => (String(p.id) === String(patientId) ? { ...p, examHistory: [entry, ...(p.examHistory || [])] } : p))
    );
    setSelected([]);
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6">
        <p className="font-body text-sm font-medium mb-4 flex items-center gap-2">
          <FlaskConical size={15} /> Atalhos de exames
        </p>
        <EditableList
          items={exams}
          placeholder="Nome do exame (ex.: Hemograma completo)"
          onAdd={(name) => setExams((prev) => [...prev, { id: Date.now(), name }])}
          onRemove={(id) => setExams((prev) => prev.filter((e) => e.id !== id))}
          renderItem={(e) => <span className="font-body text-sm">{e.name}</span>}
        />
      </Card>

      <Card className="p-6">
        <p className="font-body text-sm font-medium mb-4">Nova solicitação de exame</p>
        <CidField value={cid} onChange={setCid} />
        <p className="font-body text-xs uppercase tracking-wide c-text-6B8CA3 mb-2 mt-2">Selecione os exames</p>
        <div className="space-y-2 mb-4">
          {exams.map((e) => (
            <label key={e.id} className="flex items-center gap-2 font-body text-sm">
              <input type="checkbox" checked={selected.includes(e.name)} onChange={() => toggleExam(e.name)} />
              {e.name}
            </label>
          ))}
        </div>
        <button
          onClick={generate}
          disabled={!patientId || selected.length === 0}
          className="w-full c-bg-14213D text-white font-body text-sm font-medium py-2.5 rounded-lg hoverc-bg-0B1729 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <PenLine size={14} /> Gerar e assinar solicitação
        </button>

        {signedRequest && (
          <div className="mt-5 border c-border-EDEFF3 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-body text-sm font-medium">{signedRequest.patientLabel}</p>
              <Badge tone="sage">Assinado</Badge>
            </div>
            <p className="font-body text-xs c-text-6B8CA3 mb-1">{signedRequest.date}{signedRequest.cid && ` · CID-10: ${signedRequest.cid}`}</p>
            <ul className="font-body text-sm list-disc list-inside">
              {signedRequest.exams.map((n) => <li key={n}>{n}</li>)}
            </ul>
          </div>
        )}
      </Card>

      {showSign && (
        <SignModal onClose={() => setShowSign(false)} onSigned={onSigned} />
      )}
      {pdfDoc && (
        <DocumentPdfModal title="Solicitação de exames" meta={pdfDoc.date} onClose={() => setPdfDoc(null)}>
          <p className="font-body font-medium text-sm mb-3">{pdfDoc.patientLabel}</p>
          {pdfDoc.cid && <p className="mb-2">CID-10: {pdfDoc.cid}</p>}
          <p className="mb-1">Exames solicitados:</p>
          <ul className="list-disc list-inside c-text-3C4654">
            {pdfDoc.exams.map((n) => <li key={n}>{n}</li>)}
          </ul>
          <p className="mt-6 pt-3 border-t border-dashed border-black text-center">
            ✓ Assinado digitalmente (VidaaS — ICP-Brasil)
          </p>
        </DocumentPdfModal>
      )}
    </div>
  );
}

function EncaminhamentosTab({ referrals, setReferrals, patients, setPatients, cid, setCid, patientId }) {
  const [specialty, setSpecialty] = useState("");
  const [reason, setReason] = useState("");
  const [showSign, setShowSign] = useState(false);
  const [signedReferral, setSignedReferral] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);

  function generate() {
    if (!patientId || !specialty) return;
    setShowSign(true);
  }

  function onSigned() {
    const patient = patients.find((p) => String(p.id) === String(patientId));
    const label = patient ? patientLabel(patient) : "";
    const date = new Date().toLocaleDateString("pt-BR");
    const entry = { id: Date.now(), date, specialty, reason, cid, signed: true };
    setSignedReferral({ patientLabel: label, specialty, reason, date, cid });
    setPdfDoc({ patientLabel: label, specialty, reason, date, cid });
    setPatients((prev) =>
      prev.map((p) => (String(p.id) === String(patientId) ? { ...p, referralHistory: [entry, ...(p.referralHistory || [])] } : p))
    );
    setReason("");
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6">
        <p className="font-body text-sm font-medium mb-4 flex items-center gap-2">
          <Share2 size={15} /> Especialidades para encaminhar
        </p>
        <EditableList
          items={referrals}
          placeholder="Especialidade (ex.: Cardiologia)"
          onAdd={(specialty) => setReferrals((prev) => [...prev, { id: Date.now(), specialty }])}
          onRemove={(id) => setReferrals((prev) => prev.filter((r) => r.id !== id))}
          renderItem={(r) => <span className="font-body text-sm">{r.specialty}</span>}
        />
      </Card>

      <Card className="p-6">
        <p className="font-body text-sm font-medium mb-4">Novo encaminhamento</p>
        <CidField value={cid} onChange={setCid} />
        <p className="font-body text-xs uppercase tracking-wide c-text-6B8CA3 mb-2 mt-2">Detalhes do encaminhamento</p>
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm mb-3"
        >
          <option value="">Encaminhar para…</option>
          {referrals.map((r) => <option key={r.id}>{r.specialty}</option>)}
        </select>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          placeholder="Motivo do encaminhamento"
          className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm mb-4"
        />
        <button
          onClick={generate}
          disabled={!patientId || !specialty}
          className="w-full c-bg-14213D text-white font-body text-sm font-medium py-2.5 rounded-lg hoverc-bg-0B1729 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <PenLine size={14} /> Gerar e assinar encaminhamento
        </button>

        {signedReferral && (
          <div className="mt-5 border c-border-EDEFF3 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-body text-sm font-medium">{signedReferral.patientLabel}</p>
              <Badge tone="sage">Assinado</Badge>
            </div>
            <p className="font-body text-xs c-text-6B8CA3 mb-1">{signedReferral.date} · para {signedReferral.specialty}{signedReferral.cid && ` · CID-10: ${signedReferral.cid}`}</p>
            {signedReferral.reason && <p className="font-body text-sm">{signedReferral.reason}</p>}
          </div>
        )}
      </Card>

      {showSign && (
        <SignModal onClose={() => setShowSign(false)} onSigned={onSigned} />
      )}
      {pdfDoc && (
        <DocumentPdfModal title="Encaminhamento médico" meta={pdfDoc.date} onClose={() => setPdfDoc(null)}>
          <p className="font-body font-medium text-sm mb-3">{pdfDoc.patientLabel}</p>
          <p className="mb-2">Encaminhado para: <strong>{pdfDoc.specialty}</strong></p>
          {pdfDoc.cid && <p className="mb-2">CID-10: {pdfDoc.cid}</p>}
          {pdfDoc.reason && <p className="c-text-3C4654 whitespace-pre-wrap">Motivo: {pdfDoc.reason}</p>}
          <p className="mt-6 pt-3 border-t border-dashed border-black text-center">
            ✓ Assinado digitalmente (VidaaS — ICP-Brasil)
          </p>
        </DocumentPdfModal>
      )}
    </div>
  );
}

// Catálogo de medicamentos para a busca do receituário — código, concentração,
// apresentação (unidade de estocagem) e saldo em estoque (mock, estilo REMUME).
const DRUG_CATALOG = [
  ...SIMPLE_DRUGS.map((full, i) => {
    const match = full.match(/^(.*?)(\d.*mg.*)?$/i);
    const name = full.replace(/\s\d.*$/, "");
    const conc = (full.match(/[\d.,]+\s?mg/i) || ["—"])[0];
    return { code: `1 05 03 0${String(i).padStart(2, "0")} ${i % 10}`, name: full, shortName: name, concentration: conc, presentation: "COMPRIMIDO", stock: [0, 30, 60, 72, 90, 120][i % 6], controlled: null };
  }),
  ...CONTROLLED_DRUGS.map((d, i) => {
    const conc = (d.name.match(/[\d.,]+\s?mg/i) || ["—"])[0];
    const name = d.name.replace(/\s\d.*$/, "");
    return { code: `1 05 04 0${String(i).padStart(2, "0")} ${i % 10}`, name: d.name, shortName: name, concentration: conc, presentation: "COMPRIMIDO", stock: [0, 15, 30, 45][i % 4], controlled: d.control };
  }),
];

// Vias de administração — lista padrão usada nos sistemas municipais (e-SUS/SUS)
const ADMINISTRATION_ROUTES = [
  "CONJUNTIVAL (Uso Externo)", "GENITURINÁRIA (Uso Externo)", "INTRA-ARTERIAL (Uso Externo)",
  "INTRA-ARTICULAR (Uso Externo)", "INTRACANAL (Uso Externo)", "INTRACARDÍACA (Uso Externo)",
  "INTRADÉRMICA (Uso Externo)", "INTRA-MUSCULAR (Uso Externo)", "INTRATECAL (Uso Externo)",
  "INTRA-VENOSA (Uso Externo)", "NASAL (Uso Interno)", "ORAL (CUTÂNEA Externo)", "ORAL (Uso Interno)",
  "PERIDURAL (Uso Externo)", "RESPIRATÓRIA (Uso Externo)", "RETAL (Uso Interno)",
  "SUBCUTÂNEA (Uso Externo)", "SUBLINGUAL (Uso Interno)", "VAGINAL (Uso Externo)", "VAGINAL (Uso Interno)",
  "VIA ENTERAL (Uso Interno)", "VIA SONDA GÁSTRICA (Uso Externo)", "VIA SONDA (Uso Externo)",
  "VIA TÓPICA (Uso Externo)",
];

// Posologias predefinidas — atalhos comuns para agilizar o preenchimento
const POSOLOGY_PRESETS = [
  "Tomar 1 comprimido a cada 8 horas",
  "Tomar 1 comprimido a cada 12 horas",
  "Tomar 1 comprimido pela manhã",
  "Tomar 1 comprimido ao dia, à noite",
  "Aplicar 1 vez ao dia",
  "Tomar 2 comprimidos após o café e 2 após o jantar",
  "Uso contínuo — conforme orientação médica",
];


function ReceituarioTab({ doctorProfile, clinicProfile, patients, setPatients, cid, setCid, patientId }) {
  const [patientAddress, setPatientAddress] = useState("");
  const [sameAsPatient, setSameAsPatient] = useState(true);
  const [buyer, setBuyer] = useState({ name: "", doc: "", issuer: "", address: "", city: "", state: "", phone: "" });
  const [justification, setJustification] = useState("");

  // Campos do formulário de adição de medicamento (um item por vez, como no modelo de referência)
  const [prescriptionType, setPrescriptionType] = useState("Ambulatorial");
  const [medicationType, setMedicationType] = useState("Padronizado");
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [concentration, setConcentration] = useState("");
  const [presentation, setPresentation] = useState("");
  const [quantity, setQuantity] = useState("");
  const [receiptType, setReceiptType] = useState("");
  const [receiptQty, setReceiptQty] = useState(1);
  const [route, setRoute] = useState("");
  const [routeOpen, setRouteOpen] = useState(false);
  const [routeSearch, setRouteSearch] = useState("");
  const [continuousUse, setContinuousUse] = useState(false);
  const [posologyPreset, setPosologyPreset] = useState("");
  const [posology, setPosology] = useState("");

  const [items, setItems] = useState([]);
  const [showSign, setShowSign] = useState(false);
  const [signed, setSigned] = useState(false);
  const [pdfDoc, setPdfDoc] = useState(false);
  const [printMenuOpen, setPrintMenuOpen] = useState(false);
  const [printMode, setPrintMode] = useState("comum");

  // Endereço do paciente é preenchido automaticamente a partir do paciente
  // já selecionado na Agenda — compartilhado com as demais abas do Atendimento.
  useEffect(() => {
    const p = patients.find((pt) => String(pt.id) === String(patientId));
    if (p) {
      const addr = [p.street, p.number, p.city && `${p.city}/${p.state}`].filter(Boolean).join(", ");
      setPatientAddress(addr);
    } else {
      setPatientAddress("");
    }
  }, [patientId, patients]);

  const selectedPatient = patients.find((pt) => String(pt.id) === String(patientId));
  const patientName = selectedPatient ? selectedPatient.name : "";

  const filteredCatalog = medicationType === "Padronizado" && search.trim().length >= 2
    ? DRUG_CATALOG.filter((d) => d.name.toLowerCase().includes(search.toLowerCase())).slice(0, 8)
    : [];

  const filteredRoutes = ADMINISTRATION_ROUTES.filter((r) => r.toLowerCase().includes(routeSearch.toLowerCase()));

  function pickDrug(d) {
    setSelectedDrug(d);
    setSearch(d.name);
    setConcentration(d.concentration);
    setPresentation(d.presentation);
    setReceiptType(d.controlled ? "ESPECIAL" : "COMUM");
    setSearchOpen(false);
  }

  function resetItemFields() {
    setSearch(""); setSelectedDrug(null); setConcentration(""); setPresentation("");
    setQuantity(""); setReceiptType(""); setReceiptQty(1); setRoute(""); setContinuousUse(false);
    setPosologyPreset(""); setPosology("");
  }

  const canAddItem = medicationType === "Padronizado" ? !!selectedDrug : search.trim().length > 0;

  function addItem() {
    if (!canAddItem || !quantity || !posology.trim()) return;
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        code: selectedDrug ? selectedDrug.code : "—",
        name: medicationType === "Padronizado" ? selectedDrug.name : search.trim(),
        concentration,
        presentation,
        quantity,
        receiptType: receiptType || "COMUM",
        receiptQty,
        route,
        continuousUse,
        posology,
        controlled: selectedDrug ? selectedDrug.controlled : null,
        naoPadronizado: medicationType === "Não padronizado",
      },
    ]);
    resetItemFields();
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  const hasControlled = items.some((i) => i.controlled || i.receiptType === "ESPECIAL");
  const controlledInfo = items.find((i) => i.controlled) || items.find((i) => i.receiptType === "ESPECIAL");

  // Ajusta o modelo de impressão automaticamente quando a receita passa a ter
  // (ou deixa de ter) item de controle especial — evita gerar o modelo errado.
  useEffect(() => {
    if (hasControlled && printMode === "comum") setPrintMode("especial");
    if (!hasControlled && printMode === "especial") setPrintMode("comum");
  }, [hasControlled]);

  function finishSigning() {
    setPdfDoc(true);
    const entry = { id: Date.now(), date: new Date().toLocaleDateString("pt-BR"), items, cid, signed: true };
    setPatients((prev) =>
      prev.map((p) => (String(p.id) === String(patientId) ? { ...p, prescriptionHistory: [entry, ...(p.prescriptionHistory || [])] } : p))
    );
    // Libera a tela para uma nova receita — o histórico já guardou a que acabou de ser assinada.
    setItems([]);
    setSigned(false);
    setPrintMode("comum");
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <Card className="p-6">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <label className="font-body text-xs c-text-6B8CA3 block mb-1">Tipo de Prescrição</label>
            <select value={prescriptionType} onChange={(e) => setPrescriptionType(e.target.value)} className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm">
              <option>Ambulatorial</option>
              <option>Hospitalar</option>
            </select>
          </div>
          <div>
            <label className="font-body text-xs c-text-6B8CA3 block mb-1">Tipo do Medicamento</label>
            <select
              value={medicationType}
              onChange={(e) => { setMedicationType(e.target.value); setSearch(""); setSelectedDrug(null); setConcentration(""); setPresentation(""); setSearchOpen(false); }}
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
            >
              <option>Padronizado</option>
              <option>Não padronizado</option>
            </select>
          </div>
        </div>

        {medicationType === "Não padronizado" && (
          <div className="flex items-start gap-2 c-bg-F4E9D2-40 border c-border-E4D3A8 rounded-lg p-2.5 mb-3">
            <AlertTriangle size={13} className="c-text-8A6A24 shrink-0 mt-0.5" />
            <p className="font-body text-xs c-text-8A6A24">
              Medicamento fora do banco padronizado — digite livremente, inclusive nomes comerciais. Preencha concentração e apresentação manualmente.
            </p>
          </div>
        )}

        <p className="font-body text-xs uppercase tracking-wide c-text-6B8CA3 mb-2">Adicione o medicamento</p>

        <div className="relative mb-3">
          <label className="font-body text-xs c-text-6B8CA3 block mb-1">Nome do Produto/Medicamento *</label>
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedDrug(null);
              if (medicationType === "Padronizado") setSearchOpen(true);
            }}
            onFocus={() => { if (medicationType === "Padronizado") setSearchOpen(true); }}
            placeholder={medicationType === "Padronizado" ? "Digite para buscar no banco de dados…" : "Digite o nome do medicamento (inclusive comercial)…"}
            className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
          />
          {medicationType === "Padronizado" && searchOpen && filteredCatalog.length > 0 && (
            <div className="absolute z-20 mt-1 w-full bg-white border c-border-D9DCE1 rounded-lg shadow-lg max-h-56 overflow-y-auto">
              <table className="w-full font-body text-xs">
                <thead>
                  <tr className="c-text-6B8CA3 border-b c-border-D9DCE1">
                    <th className="text-left px-2 py-1.5">Código</th>
                    <th className="text-left px-2 py-1.5">Produto/Medicamento</th>
                    <th className="text-left px-2 py-1.5">Conc.</th>
                    <th className="text-left px-2 py-1.5">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCatalog.map((d) => (
                    <tr
                      key={d.code}
                      onClick={() => pickDrug(d)}
                      className={`cursor-pointer hoverc-bg-F5F6F8 ${d.controlled ? "c-text-7C3B34" : "c-text-3C4654"}`}
                    >
                      <td className="px-2 py-1.5">{d.code}</td>
                      <td className="px-2 py-1.5">{d.name}</td>
                      <td className="px-2 py-1.5">{d.concentration}</td>
                      <td className="px-2 py-1.5">{d.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <label className="font-body text-xs c-text-6B8CA3 block mb-1">Concentração *</label>
            <input value={concentration} onChange={(e) => setConcentration(e.target.value)} className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm" />
          </div>
          <div>
            <label className="font-body text-xs c-text-6B8CA3 block mb-1">Apresentação (Unid. Estocagem) *</label>
            <input value={presentation} onChange={(e) => setPresentation(e.target.value)} className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          <div>
            <label className="font-body text-xs c-text-6B8CA3 block mb-1">Quantidade *</label>
            <input value={quantity} onChange={(e) => setQuantity(e.target.value)} type="number" min="1" className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm" />
          </div>
          <div>
            <label className="font-body text-xs c-text-6B8CA3 block mb-1">Tipo de Receituário *</label>
            <select value={receiptType} onChange={(e) => setReceiptType(e.target.value)} className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm">
              <option value="">…</option>
              <option value="COMUM">COMUM</option>
              <option value="ESPECIAL">ESPECIAL</option>
            </select>
          </div>
          <div>
            <label className="font-body text-xs c-text-6B8CA3 block mb-1">Qtde. Receita(s)</label>
            <input value={receiptQty} onChange={(e) => setReceiptQty(e.target.value)} type="number" min="1" className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm" />
          </div>
        </div>

        {selectedDrug?.controlled && (
          <p className="font-body text-xs font-bold c-text-7C3B34 mb-3">
            Necessário receituário {selectedDrug.controlled}
          </p>
        )}

        <div className="relative mb-3">
          <label className="font-body text-xs c-text-6B8CA3 block mb-1">Via(s) de Administração</label>
          <div className="flex items-center gap-3">
            <input
              readOnly
              onClick={() => setRouteOpen((v) => !v)}
              value={route}
              placeholder="…"
              className="flex-1 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm cursor-pointer c-bg-F9F5E8"
            />
            <label className="flex items-center gap-1.5 font-body text-xs c-text-6B8CA3 whitespace-nowrap">
              <input type="checkbox" checked={continuousUse} onChange={(e) => setContinuousUse(e.target.checked)} /> Uso Contínuo?
            </label>
          </div>
          {routeOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white border c-border-D9DCE1 rounded-lg shadow-lg max-h-52 overflow-y-auto">
              <div className="p-2 border-b c-border-D9DCE1">
                <input
                  autoFocus
                  value={routeSearch}
                  onChange={(e) => setRouteSearch(e.target.value)}
                  placeholder="Buscar via…"
                  className="w-full border c-border-D9DCE1 rounded px-2 py-1 font-body text-xs"
                />
              </div>
              {filteredRoutes.map((r) => (
                <div
                  key={r}
                  onClick={() => { setRoute(r); setRouteOpen(false); setRouteSearch(""); }}
                  className="px-3 py-1.5 font-body text-xs cursor-pointer hoverc-bg-F5F6F8"
                >
                  {r}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="font-body text-xs c-text-6B8CA3 block mb-1">Posologia(s) Predefinida(s)</label>
          <select
            value={posologyPreset}
            onChange={(e) => { setPosologyPreset(e.target.value); if (e.target.value) setPosology(e.target.value); }}
            className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
          >
            <option value="">…</option>
            {POSOLOGY_PRESETS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div className="mb-3">
          <label className="font-body text-xs c-text-6B8CA3 block mb-1">Posologia *</label>
          <textarea
            value={posology}
            onChange={(e) => setPosology(e.target.value)}
            rows={2}
            placeholder="Ex.: tomar 1 comprimido a cada 8h por 5 dias"
            className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
          />
        </div>

        <button
          onClick={addItem}
          disabled={!canAddItem || !quantity || !posology.trim()}
          className="w-full border c-border-14213D c-text-14213D font-body text-sm font-medium py-2 rounded-lg hoverc-bg-F5F6F8 disabled:opacity-40 flex items-center justify-center gap-2 mb-5"
        >
          <Plus size={14} /> Adicionar à receita
        </button>

        {/* Tabela de itens adicionados */}
        <div className="border c-border-D9DCE1 rounded-lg overflow-hidden mb-4">
          <table className="w-full font-body text-xs">
            <thead className="c-bg-F5F6F8 c-text-6B8CA3">
              <tr>
                <th className="text-left px-2 py-2">Produto</th>
                <th className="text-left px-2 py-2">Conc.</th>
                <th className="text-left px-2 py-2">Qtde</th>
                <th className="text-left px-2 py-2">Posologia / Via</th>
                <th className="px-2 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.id} className={`border-t c-border-D9DCE1 ${it.controlled ? "c-bg-F4E9D2-40" : ""}`}>
                  <td className="px-2 py-2">{it.name}</td>
                  <td className="px-2 py-2">{it.concentration}</td>
                  <td className="px-2 py-2">{it.quantity}</td>
                  <td className="px-2 py-2">{it.posology}{it.route ? ` — ${it.route}` : ""}{it.continuousUse ? " · Uso contínuo" : ""}</td>
                  <td className="px-2 py-2 text-right">
                    <button onClick={() => removeItem(it.id)} className="c-text-7C3B34">
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={5} className="px-2 py-4 text-center c-text-6B8CA3 italic">Nenhum medicamento adicionado</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {hasControlled && (
          <>
            <div className="flex items-start gap-2 c-bg-F4E9D2-40 border c-border-E4D3A8 rounded-lg p-3 mb-3">
              <AlertTriangle size={15} className="c-text-8A6A24 shrink-0 mt-0.5" />
              <p className="font-body text-xs c-text-8A6A24">
                Esta receita contém item(ns) de controle especial ({controlledInfo?.controlled}). Modelo conforme
                Notificação de Receita B/Receituário de Controle Especial (Portaria 344/98, atualizada pela RDC nº
                1.000/2025 da Anvisa) — deve ser emitido em <strong>2 vias</strong>.
              </p>
            </div>
            <CidField value={cid} onChange={setCid} label="CID-10" />
            <textarea
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              rows={2}
              placeholder="Justificativa clínica"
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm mb-3"
            />
            <p className="font-body text-xs uppercase tracking-wide c-text-6B8CA3 mb-2 mt-4">Endereço do paciente</p>
            <input
              value={patientAddress}
              onChange={(e) => setPatientAddress(e.target.value)}
              placeholder="Endereço do paciente"
              className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm mb-3"
            />
            <div className="flex items-center justify-between mt-4 mb-2">
              <p className="font-body text-xs uppercase tracking-wide c-text-6B8CA3">Identificação do comprador</p>
              <label className="flex items-center gap-1.5 font-body text-xs c-text-6B8CA3">
                <input type="checkbox" checked={sameAsPatient} onChange={(e) => setSameAsPatient(e.target.checked)} />
                É o próprio paciente
              </label>
            </div>
            {!sameAsPatient && (
              <div className="grid grid-cols-2 gap-2">
                <input value={buyer.name} onChange={(e) => setBuyer({ ...buyer, name: e.target.value })} placeholder="Nome" className="col-span-2 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm" />
                <input value={buyer.doc} onChange={(e) => setBuyer({ ...buyer, doc: e.target.value })} placeholder="RG" className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm" />
                <input value={buyer.issuer} onChange={(e) => setBuyer({ ...buyer, issuer: e.target.value })} placeholder="Órgão emissor" className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm" />
                <input value={buyer.address} onChange={(e) => setBuyer({ ...buyer, address: e.target.value })} placeholder="Endereço" className="col-span-2 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm" />
                <input value={buyer.city} onChange={(e) => setBuyer({ ...buyer, city: e.target.value })} placeholder="Cidade" className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm" />
                <input value={buyer.state} onChange={(e) => setBuyer({ ...buyer, state: e.target.value })} placeholder="UF" className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm" />
                <input value={buyer.phone} onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })} placeholder="Telefone" className="col-span-2 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm" />
              </div>
            )}
          </>
        )}

        <div className="flex gap-2 mt-4">
          <div className="relative flex-1">
            <button
              onClick={() => setPrintMenuOpen((v) => !v)}
              disabled={items.length === 0}
              className="w-full border c-border-D9DCE1 font-body text-sm font-medium py-2.5 rounded-lg hoverc-bg-F5F6F8 disabled:opacity-40 flex items-center justify-center gap-2"
            >
              <Printer size={14} /> Imprimir
            </button>
            {printMenuOpen && (
              <div className="absolute z-20 mt-1 w-full bg-white border c-border-D9DCE1 rounded-lg shadow-lg font-body text-xs overflow-hidden">
                {[["comum", "Receituário Comum"], ["comum2vias", "Receituário Comum 2 Vias"], ["especial", "Receituário Especial"]].map(([id, label]) => (
                  <div key={id} onClick={() => { setPrintMode(id); setPrintMenuOpen(false); }} className="px-3 py-2 cursor-pointer hoverc-bg-F5F6F8">{label}</div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => setShowSign(true)}
            disabled={signed || items.length === 0 || !patientId}
            className="flex-1 c-bg-14213D text-white font-body text-sm font-medium py-2.5 rounded-lg hoverc-bg-0B1729 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {signed ? (<><CheckCircle2 size={15} /> Assinado</>) : (<><PenLine size={14} /> Gerar e assinar</>)}
          </button>
        </div>

        <div className="mt-6 pt-5 border-t c-border-D9DCE1">
          <p className="font-body text-sm font-medium mb-1 flex items-center gap-2">
            <FileText size={15} /> Precisa de um LME (medicamento de alto custo)?
          </p>
          <p className="font-body text-xs c-text-6B8CA3 mb-3">
            Baixe o formulário oficial do Ministério da Saúde e preencha diretamente nele.
          </p>
          <a
            href="/formulario-lme.pdf"
            download
            className="inline-flex items-center gap-2 border c-border-D9DCE1 font-body text-sm font-medium px-4 py-2 rounded-lg hoverc-bg-F5F6F8"
          >
            <Download size={15} /> Baixar formulário LME (PDF)
          </a>

          <p className="font-body text-sm font-medium mb-1 mt-5 flex items-center gap-2">
            <Pill size={15} /> Lista de medicamentos da Farmácia Popular
          </p>
          <p className="font-body text-xs c-text-6B8CA3 mb-3">
            Consulte os medicamentos e códigos de barras vigentes, direto no site do Ministério da Saúde.
          </p>
          <a
            href="https://www.gov.br/saude/pt-br/composicao/sectics/farmacia-popular/codigos-de-barras/2026/lista-de-medicamentos-ean-marco-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border c-border-D9DCE1 font-body text-sm font-medium px-4 py-2 rounded-lg hoverc-bg-F5F6F8"
          >
            <Download size={15} /> Baixar lista da Farmácia Popular (PDF)
          </a>
        </div>
      </Card>

      {/* Preview no modelo oficial do receituário, listando todos os itens */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 font-mono text-[11px] leading-relaxed text-black">
          <p className="text-center font-bold text-sm tracking-wide mb-3">
            {printMode === "especial" ? "RECEITUÁRIO DE CONTROLE ESPECIAL" : "RECEITUÁRIO COMUM"}
            {printMode === "comum2vias" ? " (2 VIAS)" : ""}
          </p>

          <div className="flex justify-between items-start gap-4 mb-3">
            <div className="border border-black rounded-none p-2 flex-1">
              <p className="font-bold text-[10px] uppercase mb-1">Identificação do Emitente</p>
              <p className="italic font-semibold">{doctorProfile.name || "Nome do médico"}</p>
              <p>{doctorProfile.specialty || "Especialidade"} | CRM {doctorProfile.crm || "0000"}{doctorProfile.uf ? `/${doctorProfile.uf}` : ""}</p>
              <p className="mt-1">{clinicProfile.address || "Endereço da clínica"}</p>
              <p>Telefone: {clinicProfile.phone || "(00) 0000-0000"}</p>
            </div>
            {(printMode === "especial" || printMode === "comum2vias") && (
              <div className="text-[10px] font-bold max-w-[140px] pt-1 text-right">
                <p>1ª VIA - FARMÁCIA</p>
                <p>2ª VIA - PACIENTE</p>
              </div>
            )}
          </div>

          <p className="border-b border-dotted border-black pb-1 mb-2">Paciente: {patientName || "…"}</p>
          {printMode === "especial" && (
            <p className="border-b border-dotted border-black pb-1 mb-2">Endereço: {patientAddress || "…"}</p>
          )}

          <p className="mb-1">Prescrição:</p>
          <div className="space-y-2 mb-4">
            {items.length === 0 && <p className="border-b border-dotted border-black pb-1 c-text-6B8CA3">Nenhum medicamento adicionado ainda…</p>}
            {items.map((it) => (
              <div key={it.id} className="border-b border-dotted border-black pb-1">
                <p className="font-semibold">{it.name} — {it.concentration} — {it.presentation} — Qtde {it.quantity}</p>
                <p>{it.posology}{it.route ? ` · ${it.route}` : ""}{it.continuousUse ? " · Uso contínuo" : ""}</p>
                {it.controlled && <p className="font-bold c-text-7C3B34">Necessário receituário {it.controlled}</p>}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-end mb-4">
            <p>Data: {new Date().toLocaleDateString("pt-BR")}</p>
            <p className="text-center">
              {signed ? (
                <span className="c-text-14213D font-bold">✓ Assinado digitalmente (VidaaS)</span>
              ) : (
                <>Carimbo e Assinatura do Médico<br /><span className="text-[9px]">(VidaaS — ICP-Brasil)</span></>
              )}
            </p>
          </div>

          {printMode === "especial" && (
            <div className="grid grid-cols-2 border border-black">
              <div className="p-2 border-r border-black">
                <p className="font-bold text-[10px] uppercase mb-1">Identificação do Comprador</p>
                <p>Nome: {sameAsPatient ? (patientName || "…") : (buyer.name || "…")}</p>
                <p>Ident.: {sameAsPatient ? "—" : (buyer.doc || "…")} &nbsp; Org. Emissor: {sameAsPatient ? "—" : (buyer.issuer || "…")}</p>
                <p>Endereço: {sameAsPatient ? (patientAddress || "…") : (buyer.address || "…")}</p>
                <p>Cidade: {sameAsPatient ? "…" : (buyer.city || "…")} &nbsp; UF: {sameAsPatient ? "…" : (buyer.state || "…")}</p>
                <p>Telefone: {sameAsPatient ? "…" : (buyer.phone || "…")}</p>
              </div>
              <div className="p-2">
                <p className="font-bold text-[10px] uppercase mb-1">Identificação do Fornecedor</p>
                <div className="h-12" />
                <p className="border-t border-black pt-1 text-[9px]">Assinatura do Farmacêutico &nbsp; Data: ...../...../.....</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {showSign && (
        <SignModal onClose={() => setShowSign(false)} onSigned={finishSigning} />
      )}
      {pdfDoc && (
        <DocumentPdfModal
          title={hasControlled ? "Receituário de Controle Especial" : "Receituário"}
          meta={patientName}
          onClose={() => setPdfDoc(false)}
        >
          <p className="font-body font-medium text-sm mb-1">{doctorProfile.name || "Nome do médico"}</p>
          <p className="mb-3">CRM {doctorProfile.crm || "0000"}{doctorProfile.uf ? `/${doctorProfile.uf}` : ""}</p>
          {hasControlled && (
            <p className="text-right text-xs font-bold mb-2">1ª VIA - FARMÁCIA<br />2ª VIA - PACIENTE</p>
          )}
          <p className="border-b border-dotted border-black pb-1 mb-2">Paciente: {patientName || "…"}</p>
          {hasControlled && (
            <p className="border-b border-dotted border-black pb-1 mb-2">Endereço: {patientAddress || "…"}</p>
          )}
          <p className="mb-1">Prescrição:</p>
          {items.map((it) => (
            <p key={it.id} className="border-b border-dotted border-black pb-1 mb-2">
              {it.name} — {it.concentration} — Qtde {it.quantity} — {it.posology}
            </p>
          ))}
          {hasControlled && (
            <p className="font-bold mb-4 c-text-DC2626">
              Necessário receituário {controlledInfo?.controlled} · Documento em 2 vias
            </p>
          )}
          <p className="text-center mt-6 pt-3 border-t border-dashed border-black">
            ✓ Assinado digitalmente (VidaaS — ICP-Brasil)
          </p>
        </DocumentPdfModal>
      )}
    </div>
  );
}


const ATENDIMENTO_TABS = [
  { id: "prontuario", label: "Prontuário", icon: FileText },
  { id: "exames", label: "Exames", icon: FlaskConical },
  { id: "encaminhamentos", label: "Encaminhamentos", icon: Share2 },
  { id: "receituario", label: "Receituário", icon: Pill },
  { id: "relatorio", label: "Relatório/Laudo médico", icon: FileCheck2 },
  { id: "anotacoes", label: "Anotações", icon: StickyNote },
];

function RelatorioMedicoTab({ doctorProfile, clinicProfile, patients, setPatients, patientId }) {
  const [tipo, setTipo] = useState("Relatório médico");
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [showSign, setShowSign] = useState(false);
  const [pdfDoc, setPdfDoc] = useState(null);

  const selectedPatient = patients.find((p) => String(p.id) === String(patientId));

  function generate() {
    if (!patientId || !texto.trim()) return;
    setShowSign(true);
  }

  function onSigned() {
    const date = new Date().toLocaleDateString("pt-BR");
    setPdfDoc({
      patientLabel: selectedPatient ? patientLabel(selectedPatient) : "",
      tipo, titulo, texto, date,
    });
    const entry = { id: Date.now(), date, tipo, titulo, texto, signed: true };
    setPatients((prev) =>
      prev.map((p) => (String(p.id) === String(patientId) ? { ...p, reportHistory: [entry, ...(p.reportHistory || [])] } : p))
    );
    setTitulo("");
    setTexto("");
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 items-start">
      <Card className="p-6">
        <p className="font-body text-xs uppercase tracking-wide c-text-6B8CA3 mb-2">Tipo de documento</p>
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setTipo("Relatório médico")}
            className={`flex-1 py-2 rounded-lg font-body text-sm ${tipo === "Relatório médico" ? "c-bg-14213D text-white" : "border c-border-D9DCE1"}`}
          >
            Relatório médico
          </button>
          <button
            onClick={() => setTipo("Laudo médico")}
            className={`flex-1 py-2 rounded-lg font-body text-sm ${tipo === "Laudo médico" ? "c-bg-14213D text-white" : "border c-border-D9DCE1"}`}
          >
            Laudo médico
          </button>
        </div>

        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título/assunto (ex.: Atestado de comparecimento, Laudo de aptidão física)"
          className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm mb-3"
        />
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          rows={8}
          placeholder="Redija o conteúdo do relatório/laudo…"
          className="w-full border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm mb-3"
        />

        <button
          onClick={generate}
          disabled={!patientId || !texto.trim()}
          className="w-full c-bg-14213D text-white font-body text-sm font-medium py-2.5 rounded-lg hoverc-bg-0B1729 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <PenLine size={14} /> Gerar e assinar documento
        </button>
      </Card>

      <Card className="p-6 font-mono text-xs bg-white">
        <p className="font-body text-sm font-medium mb-3 flex items-center gap-2 c-text-6B8CA3">
          <FileCheck2 size={14} /> Pré-visualização
        </p>
        <div className="border border-dashed c-border-D9DCE1 rounded-lg p-4 space-y-3">
          <p className="font-body font-medium text-sm text-center uppercase">{tipo}</p>
          <div>
            <p className="font-body font-medium text-sm">{doctorProfile.name || "Nome do médico"}</p>
            <p>CRM {doctorProfile.crm || "000000"}/{doctorProfile.uf || "UF"} {doctorProfile.specialty && `· ${doctorProfile.specialty}`}</p>
          </div>
          <div className="border-t c-border-EDEFF3 pt-3">
            <p>Paciente: {selectedPatient ? patientLabel(selectedPatient) : "…"}</p>
            {titulo && <p className="mt-1 font-body font-medium">{titulo}</p>}
          </div>
          <div className="border-t c-border-EDEFF3 pt-3 c-text-6B8CA3 whitespace-pre-wrap">
            {texto || "conteúdo do documento…"}
          </div>
        </div>
      </Card>

      {showSign && (
        <SignModal onClose={() => setShowSign(false)} onSigned={onSigned} />
      )}
      {pdfDoc && (
        <DocumentPdfModal title={pdfDoc.tipo} meta={pdfDoc.date} onClose={() => setPdfDoc(null)}>
          <p className="font-body font-medium text-sm text-center uppercase mb-3">{pdfDoc.tipo}</p>
          <p className="mb-1">Paciente: {pdfDoc.patientLabel}</p>
          {pdfDoc.titulo && <p className="font-body font-medium mb-2">{pdfDoc.titulo}</p>}
          <p className="c-text-3C4654 whitespace-pre-wrap mb-4">{pdfDoc.texto}</p>
          <p className="text-center pt-3 border-t border-dashed border-black">
            ✓ Assinado digitalmente (VidaaS — ICP-Brasil)
          </p>
        </DocumentPdfModal>
      )}
    </div>
  );
}

function AnotacoesTab({ patients, patientId }) {
  const [notes, setNotes] = useState([
    { id: 1, patientId: null, text: "Ligar para o laboratório sobre resultado do paciente João Pereira." },
  ]);
  const [value, setValue] = useState("");
  const [notePatientId, setNotePatientId] = useState(patientId || "");

  useEffect(() => {
    setNotePatientId(patientId || "");
  }, [patientId]);

  function add() {
    if (!value.trim()) return;
    setNotes((prev) => [{ id: Date.now(), patientId: notePatientId || null, text: value }, ...prev]);
    setValue("");
  }

  function labelFor(pid) {
    const p = patients.find((pt) => String(pt.id) === String(pid));
    return p ? patientLabel(p) : null;
  }

  return (
    <Card className="p-6 max-w-xl">
      <p className="font-body text-sm font-medium mb-4 flex items-center gap-2">
        <StickyNote size={15} /> Anotações rápidas
      </p>
      <p className="font-body text-xs c-text-6B8CA3 mb-4">
        Lembretes do médico — não fazem parte do prontuário oficial do paciente e não são assinados.
      </p>

      <p className="font-body text-xs uppercase tracking-wide c-text-6B8CA3 mb-2">Paciente (opcional — vem preenchido da Agenda, pode trocar aqui só para esta anotação)</p>
      <PatientSelect patients={patients} value={notePatientId} onChange={setNotePatientId} />

      <div className="flex gap-2 mb-4">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Escreva uma anotação…"
          className="flex-1 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
        />
        <button onClick={add} className="c-bg-14213D text-white px-4 rounded-lg font-body text-sm flex items-center gap-1">
          <Plus size={14} /> Adicionar
        </button>
      </div>
      <div className="space-y-2">
        {notes.map((n) => (
          <div key={n.id} className="flex items-center justify-between border c-border-EDEFF3 rounded-lg px-4 py-2.5">
            <div>
              {n.patientId && (
                <p className="font-body text-xs c-text-6B8CA3 mb-0.5">{labelFor(n.patientId)}</p>
              )}
              <span className="font-body text-sm">{n.text}</span>
            </div>
            <button
              onClick={() => setNotes((prev) => prev.filter((x) => x.id !== n.id))}
              className="c-text-6B8CA3 hoverc-text-7C3B34"
            >
              <Trash2 size={15} />

            </button>
          </div>
        ))}
        {notes.length === 0 && (
          <p className="font-body text-sm c-text-6B8CA3 italic">Nenhuma anotação ainda.</p>
        )}
      </div>
    </Card>
  );
}

function Atendimento({ doctorProfile, clinicProfile, patients, setPatients, quickAttendPatientId }) {
  const [tab, setTab] = useState("prontuario");
  const [templates, setTemplates] = useState(defaultProntuarioTemplates);
  const [exams, setExams] = useState(defaultExamShortcuts);
  const [referrals, setReferrals] = useState(defaultReferralOptions);
  const [cid, setCid] = useState(""); // CID-10 do atendimento — compartilhado entre as abas
  const [patientId, setPatientId] = useState(quickAttendPatientId ? String(quickAttendPatientId) : "");
  const [changingPatient, setChangingPatient] = useState(!quickAttendPatientId);

  // Se o médico chegar aqui de novo pela Agenda com outro paciente, atualiza automaticamente.
  useEffect(() => {
    if (quickAttendPatientId) {
      setPatientId(String(quickAttendPatientId));
      setChangingPatient(false);
    }
  }, [quickAttendPatientId]);

  const selectedPatient = patients.find((p) => String(p.id) === String(patientId));

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-1">
        <h1 className="font-display text-3xl">Atendimento</h1>
        {cid && (
          <span className="font-mono text-xs c-bg-F4E9D2-40 c-text-8A6A24 px-3 py-1.5 rounded-full">
            CID-10: {cid}{cidExactMatch(cid) ? ` — ${cidExactMatch(cid).name.toUpperCase()}` : ""}
          </span>
        )}
      </div>
      <p className="font-body c-text-6B8CA3 mb-4">Selecione o paciente uma vez — os dados ficam fixados em todas as abas abaixo</p>

      {/* Paciente do atendimento — selecionado uma única vez, compartilhado com todas as abas */}
      <Card className="p-4 mb-6">
        {selectedPatient && !changingPatient ? (
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Users size={15} className="c-text-6B8CA3" />
              <span className="font-body text-sm font-medium">{patientLabel(selectedPatient)}</span>
            </div>
            <button
              onClick={() => setChangingPatient(true)}
              className="font-body text-xs c-text-14213D underline"
            >
              Trocar paciente
            </button>
          </div>
        ) : (
          <div>
            <p className="font-body text-xs uppercase tracking-wide c-text-6B8CA3 mb-2">Selecione o paciente do atendimento</p>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <PatientSelect
                  patients={patients}
                  value={patientId}
                  onChange={(id) => { setPatientId(id); if (id) setChangingPatient(false); }}
                />
              </div>
            </div>
          </div>
        )}
      </Card>

      <div className="flex flex-wrap gap-2 mb-8">
        {ATENDIMENTO_TABS.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-body text-sm border transition-colors
                ${tab === t.id ? "c-bg-14213D text-white c-border-14213D" : "c-border-D9DCE1 c-text-3C4654"}`}
            >
              <Icon size={14} /> {t.label}
            </button>
          );
        })}
      </div>

      {tab === "prontuario" && (
        <ProntuarioTemplatesTab templates={templates} setTemplates={setTemplates} patients={patients} setPatients={setPatients} cid={cid} setCid={setCid} patientId={patientId} />
      )}
      {tab === "exames" && <ExamesTab exams={exams} setExams={setExams} patients={patients} setPatients={setPatients} cid={cid} setCid={setCid} patientId={patientId} />}
      {tab === "encaminhamentos" && <EncaminhamentosTab referrals={referrals} setReferrals={setReferrals} patients={patients} setPatients={setPatients} cid={cid} setCid={setCid} patientId={patientId} />}
      {tab === "receituario" && <ReceituarioTab doctorProfile={doctorProfile} clinicProfile={clinicProfile} patients={patients} setPatients={setPatients} cid={cid} setCid={setCid} patientId={patientId} />}
      {tab === "relatorio" && <RelatorioMedicoTab doctorProfile={doctorProfile} clinicProfile={clinicProfile} patients={patients} setPatients={setPatients} patientId={patientId} />}
      {tab === "anotacoes" && <AnotacoesTab patients={patients} patientId={patientId} />}
    </div>
  );
}

/* ---------------------------------------------------------
   CADASTRO — dados do médico e da clínica (Anvisa/CFM)
----------------------------------------------------------*/

function Cadastro({ doctorProfile, setDoctorProfile, clinicProfile, setClinicProfile, rooms, setRooms }) {
  const [newRoom, setNewRoom] = useState("");

  function addRoom() {
    if (!newRoom.trim() || rooms.includes(newRoom.trim())) return;
    setRooms((prev) => [...prev, newRoom.trim()]);
    setNewRoom("");
  }

  function removeRoom(room) {
    setRooms((prev) => prev.filter((r) => r !== room));
  }

  return (
    <div className="p-6 md:p-10 max-w-3xl">
      <h1 className="font-display text-3xl mb-1">Cadastro</h1>
      <p className="font-body c-text-6B8CA3 mb-8">
        Esses dados aparecem automaticamente no prontuário e nas receitas, conforme exigido pela Anvisa e pelo CFM.
      </p>

      <Card className="p-6 mb-6">
        <p className="font-body text-sm font-medium mb-4 flex items-center gap-2">
          <Stethoscope size={15} /> Dados do médico
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            value={doctorProfile.name}
            onChange={(e) => setDoctorProfile({ ...doctorProfile, name: e.target.value })}
            placeholder="Nome completo"
            className="sm:col-span-2 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
          />
          <input
            value={doctorProfile.crm}
            onChange={(e) => setDoctorProfile({ ...doctorProfile, crm: e.target.value })}
            placeholder="CRM (número)"
            className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
          />
          <input
            value={doctorProfile.uf}
            onChange={(e) => setDoctorProfile({ ...doctorProfile, uf: e.target.value })}
            placeholder="UF do CRM"
            className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
          />
          <input
            value={doctorProfile.cpf}
            onChange={(e) => setDoctorProfile({ ...doctorProfile, cpf: e.target.value })}
            placeholder="CPF"
            className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
          />
          <input
            value={doctorProfile.specialty}
            onChange={(e) => setDoctorProfile({ ...doctorProfile, specialty: e.target.value })}
            placeholder="Especialidade / RQE"
            className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
          />
          <input
            value={doctorProfile.cnes}
            onChange={(e) => setDoctorProfile({ ...doctorProfile, cnes: e.target.value })}
            placeholder="CNES (se atua em estabelecimento público)"
            className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
          />
          <input
            value={doctorProfile.cns}
            onChange={(e) => setDoctorProfile({ ...doctorProfile, cns: e.target.value })}
            placeholder="CNS do médico (usado em LME)"
            className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
          />
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <p className="font-body text-sm font-medium mb-4 flex items-center gap-2">
          <Building2 size={15} /> Dados da clínica
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            value={clinicProfile.name}
            onChange={(e) => setClinicProfile({ ...clinicProfile, name: e.target.value })}
            placeholder="Razão social / Nome da clínica"
            className="sm:col-span-2 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
          />
          <input
            value={clinicProfile.cnpj}
            onChange={(e) => setClinicProfile({ ...clinicProfile, cnpj: e.target.value })}
            placeholder="CNPJ"
            className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
          />
          <input
            value={clinicProfile.cnes}
            onChange={(e) => setClinicProfile({ ...clinicProfile, cnes: e.target.value })}
            placeholder="CNES do estabelecimento"
            className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
          />
          <input
            value={clinicProfile.phone}
            onChange={(e) => setClinicProfile({ ...clinicProfile, phone: e.target.value })}
            placeholder="Telefone"
            className="border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
          />
          <input
            value={clinicProfile.address}
            onChange={(e) => setClinicProfile({ ...clinicProfile, address: e.target.value })}
            placeholder="Endereço completo"
            className="sm:col-span-2 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
          />
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <p className="font-body text-sm font-medium mb-1 flex items-center gap-2">
          <DoorOpen size={15} /> Salas de atendimento
        </p>
        <p className="font-body text-xs c-text-6B8CA3 mb-4">
          Cadastradas pelo administrador. Ao abrir a Agenda, o médico é obrigado a escolher uma dessas salas
          antes de atender — é essa escolha que aparece no Painel de Chamada.
        </p>
        <div className="flex gap-2 mb-4">
          <input
            value={newRoom}
            onChange={(e) => setNewRoom(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addRoom()}
            placeholder="Ex.: Consultório 3"
            className="flex-1 border c-border-D9DCE1 rounded-lg px-3 py-2 font-body text-sm"
          />
          <button onClick={addRoom} className="c-bg-14213D text-white px-4 rounded-lg font-body text-sm hoverc-bg-0B1729">
            Adicionar
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {rooms.map((room) => (
            <span key={room} className="inline-flex items-center gap-1.5 c-bg-F5F6F8 border c-border-D9DCE1 rounded-full pl-3 pr-2 py-1 font-body text-xs">
              {room}
              <button onClick={() => removeRoom(room)} className="c-text-6B8CA3 hoverc-text-7C3B34">
                <X size={12} />
              </button>
            </span>
          ))}
          {rooms.length === 0 && <p className="font-body text-xs c-text-6B8CA3 italic">Nenhuma sala cadastrada ainda.</p>}
        </div>
      </Card>

      <button className="c-bg-14213D text-white font-body text-sm font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 hoverc-bg-0B1729">
        <Save size={15} /> Salvar cadastro
      </button>
    </div>
  );
}

/* ---------------------------------------------------------
   APP ROOT
----------------------------------------------------------*/

// Código de acesso da versão beta — troque aqui quando quiser gerar um novo código
// para um novo grupo de testadores.
const BETA_ACCESS_CODE = "KOSIUM236812";

function BetaGate({ onUnlock }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  function tryUnlock() {
    if (code.trim().toUpperCase() === BETA_ACCESS_CODE) {
      setError(false);
      onUnlock();
    } else {
      setError(true);
    }
  }

  return (
    <div className="min-h-screen c-bg-F5F6F8 flex items-center justify-center p-6 font-body">
      <div className="max-w-sm w-full text-center">
        <LogoMark size={40} className="mx-auto mb-4" />
        <h1 className="font-display text-2xl mb-2">Kosium — versão beta</h1>
        <p className="text-sm c-text-6B8CA3 mb-6">
          Esta é uma versão de testes fechada. Digite o código de acesso que você recebeu para entrar.
        </p>
        <input
          value={code}
          onChange={(e) => { setCode(e.target.value); setError(false); }}
          onKeyDown={(e) => e.key === "Enter" && tryUnlock()}
          placeholder="Código de acesso"
          className={`w-full border rounded-lg px-3 py-2.5 text-sm text-center tracking-widest mb-2 ${error ? "border-red-400" : "c-border-D9DCE1"}`}
          autoFocus
        />
        {error && <p className="text-xs text-red-500 mb-3">Código incorreto. Confira e tente de novo.</p>}
        <button
          onClick={tryUnlock}
          className="w-full c-bg-14213D text-white text-sm font-medium py-2.5 rounded-lg hoverc-bg-0B1729 mt-2"
        >
          Entrar na versão beta
        </button>
        <p className="text-xs c-text-6B8CA3 mt-6">
          Ainda não é a versão final — os dados são fictícios e nada aqui está conectado a um banco de dados real.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [betaUnlocked, setBetaUnlocked] = useState(() => {
    try {
      return localStorage.getItem("kosium_beta_unlocked") === "true";
    } catch {
      return false;
    }
  });
  const [view, setView] = useState("landing"); // landing | app
  const [userPlan, setUserPlan] = useState("avancado");
  const [userRole, setUserRole] = useState("medico"); // medico | recepcao
  const [rooms, setRooms] = useState(DEFAULT_ROOMS); // salas cadastradas pelo administrador
  const [doctorRoom, setDoctorRoom] = useState(null); // sala escolhida pelo médico ao abrir a Agenda — null = ainda não escolheu
  const [activeScreen, setActiveScreen] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Detecta o tamanho real da tela via JS (mais confiável do que depender só das
  // classes responsivas "md:" do Tailwind, que às vezes não são avaliadas
  // corretamente dentro de alguns painéis de preview).
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    function checkSize() {
      setIsDesktop(window.innerWidth >= 768);
    }
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const [appointments, setAppointments] = useState(initialAppointments);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [patients, setPatients] = useState(initialPatients);
  const [doctorProfile, setDoctorProfile] = useState({ name: "", crm: "", uf: "", cpf: "", specialty: "", cnes: "", cns: "" });
  const [clinicProfile, setClinicProfile] = useState({ name: "", cnpj: "", cnes: "", address: "", phone: "" });
  const [sectors, setSectors] = useState(initialSectors);
  const [statusOptions, setStatusOptions] = useState(DEFAULT_STATUS_OPTIONS);
  const [pharmacyItems, setPharmacyItems] = useState(initialPharmacyItems);
  const [stockItems, setStockItems] = useState(initialStockItems);
  const [hospitalUsers, setHospitalUsers] = useState(initialHospitalUsers);
  const [currentHospitalUserId, setCurrentHospitalUserId] = useState(1);
  const [transferSectors, setTransferSectors] = useState(DEFAULT_TRANSFER_SECTORS);
  const [callQueue, setCallQueue] = useState([]); // últimas chamadas do painel
  const [nextSenha, setNextSenha] = useState(961);
  const [quickAttendPatientId, setQuickAttendPatientId] = useState(null);

  function callPatient(appointment, room) {
    const senha = nextSenha;
    setNextSenha((n) => n + 1);
    setCallQueue((prev) => [{ id: Date.now(), senha, patient: appointment.patient, room, time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) }, ...prev].slice(0, 12));
  }

  function goToAttendance(appointment) {
    const match = patients.find((p) => p.name.toLowerCase() === appointment.patient.toLowerCase());
    setQuickAttendPatientId(match ? match.id : null);
    setActiveScreen("atendimento");
  }

  function enterApp(plan) {
    setUserPlan(plan);
    setActiveScreen("dashboard");
    setView("app");
  }

  function changeRole(role) {
    setUserRole(role);
    if (role === "medico") setDoctorRoom(null); // novo "login" como médico — precisa escolher a sala de novo
    if (role === "recepcao" && !RECEPTION_ALLOWED_TABS.includes(activeScreen)) {
      setActiveScreen("agenda");
    }
  }

  function changeHospitalUser(userId) {
    setCurrentHospitalUserId(userId);
    const u = hospitalUsers.find((h) => h.id === userId);
    if (u && !u.isAdmin && !ALWAYS_ALLOWED_TABS.includes(activeScreen) && activeScreen !== "equipe" && !u.allowedModules.includes(activeScreen)) {
      setActiveScreen("dashboard");
    }
  }

  const currentNav = NAV_ITEMS.find((n) => n.id === activeScreen);
  const planOk = currentNav ? planAllows(userPlan, currentNav.minPlan) : true;

  let roleOk;
  if (ALWAYS_ALLOWED_TABS.includes(activeScreen)) {
    roleOk = true;
  } else if (userPlan === "hospital") {
    const currentHospitalUser = hospitalUsers.find((u) => u.id === currentHospitalUserId);
    if (!currentHospitalUser) {
      roleOk = false;
    } else if (currentHospitalUser.isAdmin) {
      roleOk = true;
    } else if (activeScreen === "equipe") {
      roleOk = false; // só o usuário mestre gerencia a equipe
    } else {
      roleOk = currentHospitalUser.allowedModules.includes(activeScreen);
    }
  } else {
    roleOk = userRole === "medico" || RECEPTION_ALLOWED_TABS.includes(activeScreen);
  }

  const hasAccess = planOk && roleOk;

  let screen;
  if (!roleOk) {
    screen = <UpgradeNotice requiredPlan={null} roleRestricted />;
  } else if (!hasAccess) {
    screen = <UpgradeNotice requiredPlan={currentNav.minPlan} />;
  } else {
    switch (activeScreen) {
      case "agenda":
        screen = (
          <Agenda
            appointments={appointments}
            setAppointments={setAppointments}
            userRole={userRole}
            doctorRoom={doctorRoom}
            setDoctorRoom={setDoctorRoom}
            rooms={rooms}
            onCallPatient={callPatient}
            onGoToAttendance={goToAttendance}
          />
        );
        break;
      case "painel-chamada":
        screen = <PainelChamada callQueue={callQueue} />;
        break;
      case "atendimento":
        screen = (
          <Atendimento
            doctorProfile={doctorProfile}
            clinicProfile={clinicProfile}
            patients={patients}
            setPatients={setPatients}
            quickAttendPatientId={quickAttendPatientId}
          />
        );
        break;
      case "pacientes":
        screen = (
          <Pacientes
            patients={patients}
            setPatients={setPatients}
            userPlan={userPlan}
            transferSectors={transferSectors}
            setTransferSectors={setTransferSectors}
          />
        );
        break;
      case "financeiro":
        screen = <Financeiro transactions={transactions} setTransactions={setTransactions} />;
        break;
      case "prontuario":
        screen = <Prontuario patients={patients} setPatients={setPatients} />;
        break;
      case "ia":
        screen = <IAAssistente />;
        break;
      case "cadastro":
        screen = (
          <Cadastro
            doctorProfile={doctorProfile}
            setDoctorProfile={setDoctorProfile}
            clinicProfile={clinicProfile}
            setClinicProfile={setClinicProfile}
            rooms={rooms}
            setRooms={setRooms}
          />
        );
        break;
      case "suporte":
        screen = <Suporte />;
        break;
      case "equipe":
        screen = <Equipe userPlan={userPlan} hospitalUsers={hospitalUsers} setHospitalUsers={setHospitalUsers} />;
        break;
      case "farmacia":
        screen = (
          <InventoryManager
            title="Farmácia"
            subtitle="Controle de medicações — quantidade, entradas e saídas"
            icon={Pill}
            items={pharmacyItems}
            setItems={setPharmacyItems}
            unitPlaceholder="Unidade (ex.: comprimidos)"
          />
        );
        break;
      case "estoque":
        screen = (
          <InventoryManager
            title="Estoque"
            subtitle="Controle dos demais materiais — quantidade, entradas e saídas"
            icon={Package}
            items={stockItems}
            setItems={setStockItems}
            unitPlaceholder="Unidade (ex.: caixas)"
          />
        );
        break;
      case "internacao-busca":
        screen = <InternacaoBusca sectors={sectors} setSectors={setSectors} statusOptions={statusOptions} />;
        break;
      case "quadro-geral":
        screen = <QuadroGeral sectors={sectors} />;
        break;
      case "internacao":
        screen = (
          <InternacaoHospitalar
            sectors={sectors}
            setSectors={setSectors}
            statusOptions={statusOptions}
            setStatusOptions={setStatusOptions}
          />
        );
        break;
      default:
        screen = <Dashboard userPlan={userPlan} appointments={appointments} transactions={transactions} />;
    }
  }

  if (!betaUnlocked) {
    return (
      <BetaGate
        onUnlock={() => {
          try {
            localStorage.setItem("kosium_beta_unlocked", "true");
          } catch {}
          setBetaUnlocked(true);
        }}
      />
    );
  }

  return (
    <div className="font-body">
      <style>{FONT_IMPORT}</style>
      {view === "landing" ? (
        <Landing onEnter={enterApp} />
      ) : (
        <div className="min-h-screen c-bg-F5F6F8 flex">
          <Sidebar
            active={activeScreen}
            setActive={(id) => {
              setActiveScreen(id);
              setMobileOpen(false);
            }}
            userPlan={userPlan}
            userRole={userRole}
            setUserRole={changeRole}
            doctorRoom={doctorRoom}
            setDoctorRoom={setDoctorRoom}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            onExit={() => setView("landing")}
            isDesktop={isDesktop}
            hospitalUsers={hospitalUsers}
            currentHospitalUserId={currentHospitalUserId}
            setCurrentHospitalUserId={changeHospitalUser}
          />
          <div className="flex-1 min-w-0">
            {!isDesktop && (
              <div className="flex items-center justify-between px-4 py-4 border-b c-border-D9DCE1 bg-white">
                <span className="flex items-center gap-2 font-display text-lg c-text-14213D">
                  <LogoMark size={20} /> Kosium
                </span>
                <button onClick={() => setMobileOpen(true)}>
                  <Menu size={20} />
                </button>
              </div>
            )}
            {screen}
          </div>
        </div>
      )}
      <WhatsAppSupportButton />
    </div>
  );
}

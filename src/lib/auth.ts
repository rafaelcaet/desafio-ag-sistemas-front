// Sistema de autenticação por tokens
export interface AuthToken {
  token: string;
  email: string;
  expiresAt: number;
  used: boolean;
}

export interface FormSubmission {
  _id: string;
  name: string;
  email: string;
  company: string;
  reason: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  authToken?: string;
}

// Gera um token único
export function generateAuthToken(): string {
  return `auth_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

// Valida um token
export function validateAuthToken(token: string): AuthToken | null {
  if (typeof window === 'undefined') return null;
  
  const tokens = getAuthTokens();
  const authToken = tokens.find(t => t.token === token);
  
  if (!authToken) return null;
  if (authToken.used) return null;
  if (authToken.expiresAt < Date.now()) return null;
  
  return authToken;
}

// Salva um token (expira em 7 dias)
export function saveAuthToken(email: string, token: string): void {
  if (typeof window === 'undefined') return;
  
  const tokens = getAuthTokens();
  const newToken: AuthToken = {
    token,
    email,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 dias
    used: false,
  };
  
  tokens.push(newToken);
  localStorage.setItem('auth_tokens', JSON.stringify(tokens));
}

// Marca um token como usado
export function markTokenAsUsed(token: string): void {
  if (typeof window === 'undefined') return;
  
  const tokens = getAuthTokens();
  const index = tokens.findIndex(t => t.token === token);
  if (index !== -1) {
    tokens[index].used = true;
    localStorage.setItem('auth_tokens', JSON.stringify(tokens));
  }
}

// Obtém todos os tokens
function getAuthTokens(): AuthToken[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('auth_tokens');
  return stored ? JSON.parse(stored) : [];
}

// Salva uma submissão de formulário
export function saveFormSubmission(data: Omit<FormSubmission, '_id' | 'createdAt' | 'status'>): string {
  if (typeof window === 'undefined') return '';
  
  const submissions = getFormSubmissions();
  const newSubmission: FormSubmission = {
    ...data,
    _id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
  
  submissions.push(newSubmission);
  localStorage.setItem('form_submissions', JSON.stringify(submissions));
  
  return newSubmission._id;
}

// Obtém todas as submissões
export function getFormSubmissions(): FormSubmission[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('form_submissions');
  return stored ? JSON.parse(stored) : [];
}

// Aprova uma submissão e gera token
export function approveSubmission(submissionId: string): string | null {
  if (typeof window === 'undefined') return null;
  
  const submissions = getFormSubmissions();
  const index = submissions.findIndex(s => s._id === submissionId);
  
  if (index === -1) return null;
  
  const submission = submissions[index];
  const token = generateAuthToken();
  
  submissions[index] = {
    ...submission,
    status: 'approved',
    authToken: token,
  };
  
  localStorage.setItem('form_submissions', JSON.stringify(submissions));
  saveAuthToken(submission.email, token);
  
  // Log do link (como solicitado)
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const authLink = `${baseUrl}/cadastro?token=${token}`;
  console.log('🔗 Link de autenticação gerado:', authLink);
  console.log('📧 Email:', submission.email);
  console.log('👤 Nome:', submission.name);
  
  return token;
}

// Rejeita uma submissão
export function rejectSubmission(submissionId: string): void {
  if (typeof window === 'undefined') return;
  
  const submissions = getFormSubmissions();
  const index = submissions.findIndex(s => s._id === submissionId);
  
  if (index === -1) return;
  
  submissions[index] = {
    ...submissions[index],
    status: 'rejected',
  };
  
  localStorage.setItem('form_submissions', JSON.stringify(submissions));
}

// Obtém submissão por token
export function getSubmissionByToken(token: string): FormSubmission | null {
  const submissions = getFormSubmissions();
  return submissions.find(s => s.authToken === token) || null;
}

// ========== SISTEMA DE AUTENTICAÇÃO DE ADMIN ==========

// Credenciais padrão do admin (em produção, isso deveria estar em variáveis de ambiente)
const ADMIN_CREDENTIALS = {
  email: 'admin@admin.com',
  password: 'admin123', // Em produção, usar hash
};

// Interface para sessão de admin
export interface AdminSession {
  email: string;
  expiresAt: number;
}

// Verifica credenciais de admin
export function validateAdminCredentials(email: string, password: string): boolean {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
}

// Faz login de admin
export function adminLogin(email: string, password: string): boolean {
  if (typeof window === 'undefined') return false;
  
  if (!validateAdminCredentials(email, password)) {
    return false;
  }
  
  const session: AdminSession = {
    email,
    expiresAt: Date.now() + 8 * 60 * 60 * 1000, // 8 horas
  };
  
  localStorage.setItem('admin_session', JSON.stringify(session));
  return true;
}

// Verifica se admin está autenticado
export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  
  const session = localStorage.getItem('admin_session');
  if (!session) return false;
  
  try {
    const sessionData: AdminSession = JSON.parse(session);
    if (sessionData.expiresAt < Date.now()) {
      localStorage.removeItem('admin_session');
      return false;
    }
    return true;
  } catch (e) {
    localStorage.removeItem('admin_session');
    return false;
  }
}

// Faz logout de admin
export function adminLogout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('admin_session');
}

// Obtém email do admin logado
export function getAdminEmail(): string | null {
  if (typeof window === 'undefined') return null;
  
  const session = localStorage.getItem('admin_session');
  if (!session) return null;
  
  try {
    const sessionData: AdminSession = JSON.parse(session);
    if (sessionData.expiresAt < Date.now()) {
      return null;
    }
    return sessionData.email;
  } catch (e) {
    return null;
  }
}


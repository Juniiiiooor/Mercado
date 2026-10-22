/** Validações compartilhadas entre os formulários de acesso e de perfil. */

export type FieldErrors<T extends string> = Partial<Record<T, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function validateName(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "Informe seu nome completo.";
  if (trimmed.length < 3) return "O nome precisa de pelo menos 3 letras.";
  if (!trimmed.includes(" ")) return "Inclua também o sobrenome.";
  return undefined;
}

export function validateEmail(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "Informe seu e-mail.";
  if (!EMAIL_PATTERN.test(trimmed)) return "E-mail inválido. Confira se falta o @ ou o domínio.";
  return undefined;
}

export function validatePassword(value: string): string | undefined {
  if (!value) return "Crie uma senha.";
  if (value.length < 8) return "Use pelo menos 8 caracteres.";
  if (!/[a-zA-Z]/.test(value) || !/[0-9]/.test(value)) {
    return "A senha precisa misturar letras e números.";
  }
  return undefined;
}

export function validatePhone(value: string): string | undefined {
  const digits = value.replace(/\D/g, "");
  if (!digits) return undefined; // telefone é opcional
  if (digits.length < 10 || digits.length > 11) return "Use DDD + número, com 10 ou 11 dígitos.";
  return undefined;
}

export function validateZip(value: string): string | undefined {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "Informe o CEP.";
  if (digits.length !== 8) return "O CEP tem 8 dígitos.";
  return undefined;
}

/** Aplica máscara `(00) 00000-0000` conforme o usuário digita. */
export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/** Aplica máscara `00000-000` ao CEP. */
export function maskZip(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

/** Medidor simples de força de senha, de 0 a 4. */
export function passwordStrength(value: string): number {
  if (!value) return 0;
  let score = 0;
  if (value.length >= 8) score += 1;
  if (value.length >= 12) score += 1;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score += 1;
  if (/[0-9]/.test(value) && /[^A-Za-z0-9]/.test(value)) score += 1;
  return Math.min(4, score);
}

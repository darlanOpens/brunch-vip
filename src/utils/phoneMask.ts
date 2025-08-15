/**
 * Utilitário para aplicar máscara de telefone brasileiro
 */

/**
 * Aplica máscara de telefone brasileiro
 * Formatos suportados:
 * - (11) 99999-9999 para celulares
 * - (11) 9999-9999 para telefones fixos
 */
export function applyPhoneMask(value: string): string {
  // Remove todos os caracteres não numéricos
  const numbers = value.replace(/\D/g, '');
  
  // Limita a 11 dígitos
  const limitedNumbers = numbers.slice(0, 11);
  
  // Aplica a máscara baseada no número de dígitos
  if (limitedNumbers.length <= 2) {
    return limitedNumbers;
  } else if (limitedNumbers.length <= 6) {
    return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`;
  } else if (limitedNumbers.length <= 10) {
    return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 6)}-${limitedNumbers.slice(6)}`;
  } else {
    return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7)}`;
  }
}

/**
 * Remove a máscara do telefone, retornando apenas os números
 */
export function removePhoneMask(value: string): string {
  return value.replace(/\D/g, '');
}

/**
 * Valida se o telefone tem o formato correto
 * Aceita telefones com 10 ou 11 dígitos
 */
export function isValidPhone(value: string): boolean {
  const numbers = removePhoneMask(value);
  return numbers.length >= 10 && numbers.length <= 11;
}
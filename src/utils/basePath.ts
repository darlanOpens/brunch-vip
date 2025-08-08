// Utilitário para resolver caminhos com basePath
export const BASE_PATH = '/brunch-vip';

export const withBasePath = (path: string): string => {
  if (path.startsWith('http') || path.startsWith('//')) {
    return path; // URLs externas não precisam do basePath
  }
  return `${BASE_PATH}${path}`;
};


export function validatePollCode(code: string): boolean {
  const pattern = /^[A-Za-z0-9]{4}-[A-Za-z0-9]{4}-[A-Za-z0-9]{4}$/;
  return pattern.test(code);
}

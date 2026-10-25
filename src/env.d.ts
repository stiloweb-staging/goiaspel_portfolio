interface ImportMetaEnv {
  /** "false" desativa os selos de homologação e o noindex (somente após validar as pendências). */
  readonly PUBLIC_STAGING?: string;
  /** URL https que recebe POST multipart dos formulários. Ausente = integração pendente. */
  readonly PUBLIC_LEAD_ENDPOINT?: string;
  /** "true" mostra os selos de dado pendente (uso interno). */
  readonly PUBLIC_SHOW_PENDING?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

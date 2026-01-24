import type { Request } from 'express-serve-static-core';

export type ParsedQuery = Request['query'][string];

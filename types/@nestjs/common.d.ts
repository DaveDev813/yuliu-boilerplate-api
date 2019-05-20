export function All(path: any): any;
export class BadGatewayException {
  static captureStackTrace(p0: any, p1: any): any;
  static stackTraceLimit: number;
  constructor(message: any, error: any);
  getResponse(): any;
  getStatus(): any;
}
export class BadRequestException {
  static captureStackTrace(p0: any, p1: any): any;
  static stackTraceLimit: number;
  constructor(message: any, error: any);
  getResponse(): any;
  getStatus(): any;
}
export function Bind(decorators: any): any;
export function Body(property: any, pipes: any): any;
export const CACHE_MANAGER: string;
export class CacheInterceptor {
  constructor(cacheManager: any, reflector: any);
  cacheManager: any;
  reflector: any;
  intercept(context: any, next: any): any;
  trackBy(context: any): any;
}
export function CacheKey(key: any): void;
export class CacheModule {
  static createAsyncOptionsProvider(options: any): any;
  static createAsyncProviders(options: any): any;
  static register(options: any): any;
  static registerAsync(options: any): any;
}
export function Catch(exceptions: any): any;
export class ClassSerializerInterceptor {
  constructor(reflector: any);
  reflector: any;
  getContextOptions(context: any): any;
  intercept(context: any, next: any): any;
  reflectSerializeMetadata(obj: any): any;
  serialize(response: any, options: any): any;
  transformToPlain(plainOrClass: any, options: any): any;
}
export class ConflictException {
  static captureStackTrace(p0: any, p1: any): any;
  static stackTraceLimit: number;
  constructor(message: any, error: any);
  getResponse(): any;
  getStatus(): any;
}
export function Controller(prefixOrOptions: any): any;
export function Delete(path: any): any;
export function Dependencies(dependencies: any): any;
export class ForbiddenException {
  static captureStackTrace(p0: any, p1: any): any;
  static stackTraceLimit: number;
  constructor(message: any, error: any);
  getResponse(): any;
  getStatus(): any;
}
export class GatewayTimeoutException {
  static captureStackTrace(p0: any, p1: any): any;
  static stackTraceLimit: number;
  constructor(message: any, error: any);
  getResponse(): any;
  getStatus(): any;
}
export function Get(path: any): any;
export function Global(): any;
export class GoneException {
  static captureStackTrace(p0: any, p1: any): any;
  static stackTraceLimit: number;
  constructor(message: any, error: any);
  getResponse(): any;
  getStatus(): any;
}
export function Head(path: any): any;
export function Header(name: any, value: any): any;
export function Headers(data: any): void;
export function HttpCode(statusCode: any): any;
export class HttpException {
  static captureStackTrace(p0: any, p1: any): any;
  static stackTraceLimit: number;
  constructor(response: any, status: any);
  response: any;
  status: any;
  message: any;
  getResponse(): any;
  getStatus(): any;
}
export class HttpModule {
  static createAsyncOptionsProvider(options: any): any;
  static createAsyncProviders(options: any): any;
  static register(config: any): any;
  static registerAsync(options: any): any;
}
export class HttpService {
  constructor(instance: any);
  instance: any;
  get(url: any, config: any): any;
  head(url: any, config: any): any;
  patch(url: any, data: any, config: any): any;
  post(url: any, data: any, config: any): any;
  put(url: any, data: any, config: any): any;
  request(config: any): any;
}
export const HttpStatus: {
  "100": string;
  "101": string;
  "102": string;
  "200": string;
  "201": string;
  "202": string;
  "203": string;
  "204": string;
  "205": string;
  "206": string;
  "300": string;
  "301": string;
  "302": string;
  "303": string;
  "304": string;
  "307": string;
  "308": string;
  "400": string;
  "401": string;
  "402": string;
  "403": string;
  "404": string;
  "405": string;
  "406": string;
  "407": string;
  "408": string;
  "409": string;
  "410": string;
  "411": string;
  "412": string;
  "413": string;
  "414": string;
  "415": string;
  "416": string;
  "417": string;
  "418": string;
  "422": string;
  "429": string;
  "500": string;
  "501": string;
  "502": string;
  "503": string;
  "504": string;
  "505": string;
  ACCEPTED: number;
  AMBIGUOUS: number;
  BAD_GATEWAY: number;
  BAD_REQUEST: number;
  CONFLICT: number;
  CONTINUE: number;
  CREATED: number;
  EXPECTATION_FAILED: number;
  FORBIDDEN: number;
  FOUND: number;
  GATEWAY_TIMEOUT: number;
  GONE: number;
  HTTP_VERSION_NOT_SUPPORTED: number;
  INTERNAL_SERVER_ERROR: number;
  I_AM_A_TEAPOT: number;
  LENGTH_REQUIRED: number;
  METHOD_NOT_ALLOWED: number;
  MOVED_PERMANENTLY: number;
  NON_AUTHORITATIVE_INFORMATION: number;
  NOT_ACCEPTABLE: number;
  NOT_FOUND: number;
  NOT_IMPLEMENTED: number;
  NOT_MODIFIED: number;
  NO_CONTENT: number;
  OK: number;
  PARTIAL_CONTENT: number;
  PAYLOAD_TOO_LARGE: number;
  PAYMENT_REQUIRED: number;
  PERMANENT_REDIRECT: number;
  PRECONDITION_FAILED: number;
  PROCESSING: number;
  PROXY_AUTHENTICATION_REQUIRED: number;
  REQUESTED_RANGE_NOT_SATISFIABLE: number;
  REQUEST_TIMEOUT: number;
  RESET_CONTENT: number;
  SEE_OTHER: number;
  SERVICE_UNAVAILABLE: number;
  SWITCHING_PROTOCOLS: number;
  TEMPORARY_REDIRECT: number;
  TOO_MANY_REQUESTS: number;
  UNAUTHORIZED: number;
  UNPROCESSABLE_ENTITY: number;
  UNSUPPORTED_MEDIA_TYPE: number;
  URI_TOO_LONG: number;
};
export class ImATeapotException {
  static captureStackTrace(p0: any, p1: any): any;
  static stackTraceLimit: number;
  constructor(message: any, error: any);
  getResponse(): any;
  getStatus(): any;
}
export function Inject(token: any): any;
export function Injectable(options: any): any;
export class InternalServerErrorException {
  static captureStackTrace(p0: any, p1: any): any;
  static stackTraceLimit: number;
  constructor(message: any, error: any);
  getResponse(): any;
  getStatus(): any;
}
export class Logger {
  static debug(message: any, context: any, isTimeDiffEnabled: any): void;
  static error(message: any, trace: any, context: any, isTimeDiffEnabled: any): void;
  // Circular reference from index.Logger
  static instance: any;
  static log(message: any, context: any, isTimeDiffEnabled: any): void;
  static overrideLogger(logger: any): void;
  static printMessage(message: any, color: any, context: any, isTimeDiffEnabled: any): void;
  static printStackTrace(trace: any): void;
  static printTimestamp(isTimeDiffEnabled: any): void;
  static verbose(message: any, context: any, isTimeDiffEnabled: any): void;
  static warn(message: any, context: any, isTimeDiffEnabled: any): void;
  constructor(context: any, isTimestampEnabled: any);
  context: any;
  isTimestampEnabled: any;
  callFunction(name: any, message: any, context: any): void;
  debug(message: any, context: any): void;
  error(message: any, trace: any, context: any): void;
  getInstance(): any;
  log(message: any, context: any): void;
  verbose(message: any, context: any): void;
  warn(message: any, context: any): void;
}
export class MethodNotAllowedException {
  static captureStackTrace(p0: any, p1: any): any;
  static stackTraceLimit: number;
  constructor(message: any, error: any);
  getResponse(): any;
  getStatus(): any;
}
export function Module(metadata: any): any;
export function Next(data: any): void;
export class NotAcceptableException {
  static captureStackTrace(p0: any, p1: any): any;
  static stackTraceLimit: number;
  constructor(message: any, error: any);
  getResponse(): any;
  getStatus(): any;
}
export class NotFoundException {
  static captureStackTrace(p0: any, p1: any): any;
  static stackTraceLimit: number;
  constructor(message: any, error: any);
  getResponse(): any;
  getStatus(): any;
}
export class NotImplementedException {
  static captureStackTrace(p0: any, p1: any): any;
  static stackTraceLimit: number;
  constructor(message: any, error: any);
  getResponse(): any;
  getStatus(): any;
}
export function Optional(): any;
export function Options(path: any): any;
export function Param(property: any, pipes: any): any;
export class ParseIntPipe {
  transform(value: any, metadata: any): any;
}
export function Patch(path: any): any;
export class PayloadTooLargeException {
  static captureStackTrace(p0: any, p1: any): any;
  static stackTraceLimit: number;
  constructor(message: any, error: any);
  getResponse(): any;
  getStatus(): any;
}
export function Post(path: any): any;
export function Put(path: any): any;
export function Query(property: any, pipes: any): any;
export function ReflectMetadata(metadataKey: any, metadataValue: any): any;
export function Render(template: any): any;
export function Req(data: any): void;
export function Request(data: any): void;
export function RequestMapping(metadata: any): any;
export const RequestMethod: {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
  "6": string;
  "7": string;
  ALL: number;
  DELETE: number;
  GET: number;
  HEAD: number;
  OPTIONS: number;
  PATCH: number;
  POST: number;
  PUT: number;
};
export class RequestTimeoutException {
  static captureStackTrace(p0: any, p1: any): any;
  static stackTraceLimit: number;
  constructor(message: any, error: any);
  getResponse(): any;
  getStatus(): any;
}
export function Res(data: any): void;
export function Response(data: any): void;
export const Scope: {
  "0": string;
  "1": string;
  "2": string;
  DEFAULT: number;
  REQUEST: number;
  TRANSIENT: number;
};
export function SerializeOptions(options: any): void;
export class ServiceUnavailableException {
  static captureStackTrace(p0: any, p1: any): any;
  static stackTraceLimit: number;
  constructor(message: any, error: any);
  getResponse(): any;
  getStatus(): any;
}
export function Session(data: any): void;
export function SetMetadata(metadataKey: any, metadataValue: any): any;
export const ShutdownSignal: {
  SIGABRT: string;
  SIGBUS: string;
  SIGFPE: string;
  SIGHUP: string;
  SIGILL: string;
  SIGINT: string;
  SIGQUIT: string;
  SIGSEGV: string;
  SIGTERM: string;
  SIGTRAP: string;
  SIGUSR2: string;
};
export function SingleScope(): any;
export class UnauthorizedException {
  static captureStackTrace(p0: any, p1: any): any;
  static stackTraceLimit: number;
  constructor(message: any, error: any);
  getResponse(): any;
  getStatus(): any;
}
export class UnprocessableEntityException {
  static captureStackTrace(p0: any, p1: any): any;
  static stackTraceLimit: number;
  constructor(message: any, error: any);
  getResponse(): any;
  getStatus(): any;
}
export class UnsupportedMediaTypeException {
  static captureStackTrace(p0: any, p1: any): any;
  static stackTraceLimit: number;
  constructor(message: any, error: any);
  getResponse(): any;
  getStatus(): any;
}
export function UploadedFile(data: any): void;
export function UploadedFiles(data: any): void;
export function UseFilters(filters: any): void;
export function UseGuards(guards: any): any;
export function UseInterceptors(interceptors: any): any;
export function UsePipes(pipes: any): any;
export class ValidationPipe {
  constructor(options: any);
  isTransformEnabled: any;
  validatorOptions: any;
  transformOptions: any;
  isDetailedOutputDisabled: any;
  exceptionFactory: any;
  toEmptyIfNil(value: any): any;
  toValidate(metadata: any): any;
  transform(value: any, metadata: any): any;
}
export function createParamDecorator(factory: any, enhancers: any): any;
export function flatten(arr: any): any;
export function forwardRef(fn: any): void;
export function mixin(mixinClass: any): any;

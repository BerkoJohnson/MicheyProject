export interface ValidationMessage {
  [key: string]: {
    type: string;
    message: string;
  }[];
}

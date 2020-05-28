export default interface Votes {
  candidate?: string;
  position?: string;
  castType?: 'Yes' | 'No' | 'Thumbs';
}

export interface typeContent {
  fieldname?: string;
  userId?: number;
  content?: string;
  name?: string;
  size?: number;
  type?: string;
  url?: string;
  lastModified?: number;
  mediaFiles?: typemedia[];
}

export interface typemedia {
  type?: string;
  url?: string;
}

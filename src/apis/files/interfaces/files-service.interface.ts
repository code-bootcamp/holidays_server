import { FileUpload } from 'graphql-upload';

export interface IFileServiceWaitedFileCreate {
  files: FileUpload[];
}

export interface IFileServiceUpload {
  files: FileUpload[];
}

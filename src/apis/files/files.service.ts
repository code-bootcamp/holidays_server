import { Injectable } from '@nestjs/common';
import {
  IFileServiceUpload,
  IFileServiceWaitedFileCreate,
} from './interfaces/files-service.interface';
import { Bucket, Storage } from '@google-cloud/storage';

@Injectable()
export class FilesService {
  async waitedFileCreate({
    files,
  }: IFileServiceWaitedFileCreate): Promise<any> {
    const waitedFiles = [];
    for (let i = 0; i < files.length; i++) {
      waitedFiles.push(await files[i]);
    }
    return waitedFiles;
  }

  createBucket(): Bucket {
    const bucket = process.env.BUCKET_NAME;
    const storage = new Storage({
      projectId: process.env.PROJECT_ID,
      keyFilename: process.env.KEY_FILENAME,
    }).bucket(bucket);
    return storage;
  }

  async upload({ files }: IFileServiceUpload): Promise<string[]> {
    const waitedFiles = await this.waitedFileCreate({ files });
    const bucket = process.env.BUCKET_NAME;
    const storage = this.createBucket();
    const results = await Promise.all(
      waitedFiles.map(
        (el) =>
          new Promise<string>((resolve, reject) => {
            el.createReadStream()
              .pipe(storage.file(el.filename).createWriteStream())
              .on('finish', () =>
                resolve(
                  `https://storage.googleapis.com/${bucket}/${el.filename}`,
                ),
              )
              .on('error', () => reject('실패'));
          }),
      ),
    );
    return results;
  }
}

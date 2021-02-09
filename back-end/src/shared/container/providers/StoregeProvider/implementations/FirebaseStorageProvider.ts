import fs from 'fs';
import { v4 as uuid } from 'uuid';
import path from 'path';
import uploadConfig from '@config/upload';
import admin from 'firebase-admin';
import mime from 'mime';
import AppError from '@shared/error/AppError';
import IStorageProvider from '../models/IStorageProvider';

export default class FirebaseStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    admin.initializeApp({
      credential: admin.credential.cert(
        path.resolve(
          __dirname,
          '..',
          '..',
          '..',
          '..',
          '..',
          '..',
          'keyFirebase.json',
        ),
      ),

      storageBucket: `gs://agendamento-tatuagem.appspot.com`,
    });

    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const contentType = mime.getType(originalPath);

    if (!contentType) {
      throw new AppError('file not found');
    }

    // await fs.promises.rename(
    //   path.resolve(uploadConfig.tmpFolder, file),
    //   path.resolve(uploadConfig.uploadsFolder, file),
    // );

    const bucket = admin.storage().bucket();

    const metadata = {
      metadata: {
        // This line is very important. It's to create a download token.
        firebaseStorageDownloadTokens: uuid(),
      },
      contentType: 'image/png',
      cacheControl: 'public, max-age=31536000',
    };

    await bucket.upload(originalPath, {
      metadata,
      gzip: true,
    });

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    admin.storage().bucket().delete();
  }
}

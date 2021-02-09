import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import uploadConfig from '@config/upload';
import admin from 'firebase-admin';
import mime from 'mime';
import AppError from '@shared/error/AppError';
import IStorageProvider from '../models/IStorageProvider';

export default class FirebaseStorageProvider implements IStorageProvider {
  constructor() {
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
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    // redimensionar a imagem
    await sharp(originalPath).resize(300, 500).toFile(file);

    const contentType = mime.getType(file);

    if (!contentType) {
      throw new AppError('file not found');
    }

    const bucket = admin.storage().bucket();

    const metadata = {
      metadata: {
        // This line is very important. It's to create a download token.
        firebaseStorageDownloadTokens: uploadConfig.tokenDownload,
      },
      // contentType: 'image/jpeg',

      cacheControl: 'public, max-age=31536000',
    };

    await bucket.upload(file, {
      metadata,
      gzip: true,
      // destination: `profile/${file}`,
    });

    // apaga da pasta upload
    await fs.promises.unlink(file);

    await fs.promises.unlink(`${uploadConfig.tmpFolder}/${file}`);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    admin.storage().bucket().file(file).delete();
  }
}

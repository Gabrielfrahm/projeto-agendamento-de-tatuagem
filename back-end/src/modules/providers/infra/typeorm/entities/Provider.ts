import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import uploadConfig from '@config/upload';
import { Exclude, Expose } from 'class-transformer';

@Entity('providers')
class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @Column()
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${'http://192.168.15.139:3333'}/files/${this.avatar}`;
      case 'fire':
        return `${process.env.STORAGE_FIREBASE_URL}${this.avatar}?alt=media&token=${uploadConfig.tokenDownload}`;
      default:
        return null;
    }
  }
}

export default Provider;

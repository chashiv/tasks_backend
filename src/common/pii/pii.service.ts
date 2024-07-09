import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

@Injectable()
export class PiiService {
  private readonly encryptionKey: string;
  constructor(private configService: ConfigService) {
    this.encryptionKey = this.configService.getOrThrow<string>('PII_ENCRYPTION_KEY');
  }

  encrypt(value: string) {
    const IV_length = 16;
    const iv = randomBytes(IV_length);
    const cipher = createCipheriv('aes-256-cbc', Buffer.from(this.encryptionKey, 'hex'), iv);
    let encrypted = cipher.update(value);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return `${iv.toString('hex')}|${encrypted.toString('hex')}`;
  }

  decrypt(value: string) {
    const [iv, encryptedText] = value.split('|').map((part) => Buffer.from(part, 'hex'));
    const decipher = createDecipheriv('aes-256-cbc', Buffer.from(this.encryptionKey, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}

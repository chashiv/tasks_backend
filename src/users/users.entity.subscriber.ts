import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { PiiService } from 'src/common/pii/pii.service';

@EventSubscriber()
export class UsersEntitySubscriber implements EntitySubscriberInterface<UsersEntity> {
  constructor(
    private dataSource: DataSource,
    private piiService: PiiService,
  ) {
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return UsersEntity;
  }

  private preProcessBeforeIngestion(user: UsersEntity | Partial<UsersEntity>) {
    if (user.password) {
      user.encryptedPassword = this.piiService.encrypt(user.password);
      delete user.password;
    }
  }

  private preProcessAfterRetrieval(user: UsersEntity | Partial<UsersEntity>) {
    if (user.encryptedPassword) {
      user.password = this.piiService.decrypt(user.encryptedPassword);
    }
  }

  beforeInsert(event: InsertEvent<UsersEntity>) {
    this.preProcessBeforeIngestion(event.entity);
  }

  beforeUpdate(event: UpdateEvent<UsersEntity>) {
    this.preProcessBeforeIngestion(event.entity);
  }

  afterInsert(event: InsertEvent<UsersEntity>) {
    this.preProcessAfterRetrieval(event.entity);
  }

  afterUpdate(event: UpdateEvent<UsersEntity>) {
    this.preProcessAfterRetrieval(event.entity);
  }

  afterLoad(user: UsersEntity) {
    this.preProcessAfterRetrieval(user);
  }
}

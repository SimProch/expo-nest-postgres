import { Test } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { AccessController } from './access.controller';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AccessService } from 'src/modules/access/services/access.service';

describe('Access', () => {
  let app: INestApplication;

  const accessServiceMock = mock<AccessService>();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AccessController],
      providers: [
        {
          provide: AccessService,
          useValue: accessServiceMock,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );
    await app.init();
  });

  it('works', () => {
    expect(true).toBe(true);
  });
});

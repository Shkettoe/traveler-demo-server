import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtauthGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });
});

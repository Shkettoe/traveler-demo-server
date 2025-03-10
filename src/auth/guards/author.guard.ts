import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.user || !request.params.id) return false;
    const user = await this.usersService.findOne(request.user.userId);
    return user.trips.some((trip) => trip.id === Number(request.params.id));
  }
}

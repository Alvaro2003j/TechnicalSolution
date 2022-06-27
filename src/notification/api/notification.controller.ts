import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiController } from 'src/common/api/api.controller';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { GetNotificationByIdDto } from '../application/dtos/queries/get-notification-by-id-dto';
import { GetNotificationsDto } from '../application/dtos/queries/get-notifications.dto';
import { RegisterNotificationDto } from '../application/dtos/request/register-notification-request.dto';
import { RegisterNotificationResponseDto } from '../application/dtos/response/register-notification-response.dto';
import { GetNotificationsQuery } from '../application/queries/get-notification-query';
import { NotificationApplicationService } from '../application/services/notification-application.service';

@ApiBearerAuth()
@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly notificationApplicationService: NotificationApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get All Clients ' })
  @ApiResponse({
    status: 200,
    description: 'All notification returned',
    type: GetNotificationsDto,
    isArray: true,
  })
  async getNotifications(
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const clients = await this.queryBus.execute(new GetNotificationsQuery());
      return ApiController.ok(response, clients);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get notification by Id' })
  @ApiResponse({
    status: 200,
    description: 'Notification returned',
    type: GetNotificationsDto,
  })
  async getClientById(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, GetNotificationByIdDto> =
        await this.notificationApplicationService.getById(id);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.ok(response, result);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create new notification' })
  @ApiResponse({
    status: 201,
    description: 'Notification created',
    type: GetNotificationsDto,
  })
  async register(
    @Body() registerNotificationRequestDto: RegisterNotificationDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterNotificationResponseDto> =
        await this.notificationApplicationService.register(
          registerNotificationRequestDto,
        );
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}

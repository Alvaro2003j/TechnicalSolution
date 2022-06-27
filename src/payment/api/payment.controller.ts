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
import { GetPaymentsDto } from '../application/dtos/queries/get-payment.dto';
import { RegisterPaymentRequest } from '../application/dtos/request/register-payment-request.dto';
import { RegisterPaymentResponse } from '../application/dtos/response/register-payment-response.dto';
import { GetPaymentsByIdQuery } from '../application/queries/get-payments-by-id.query';
import { GetPaymentsQuery } from '../application/queries/get-payments.query';
import { PaymentsApplicationService } from '../application/services/payments-application.service';

@ApiBearerAuth()
@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsApplicationService: PaymentsApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new payment' })
  @ApiResponse({
    status: 201,
    description: 'Payment created',
    type: GetPaymentsDto,
  })
  async register(
    @Body() registerPaymentRequest: RegisterPaymentRequest,
    @Res({ passthrough: true }) response,
  ): Promise<Object> {
    try {
      const result: Result<AppNotification, RegisterPaymentResponse> =
        await this.paymentsApplicationService.register(registerPaymentRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all payments' })
  @ApiResponse({
    status: 200,
    description: 'All payments returned',
    type: GetPaymentsDto,
    isArray: true,
  })
  async getPayments(@Res({ passthrough: true }) response): Promise<Object> {
    try {
      const customers = await this.queryBus.execute(new GetPaymentsQuery());
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get payment by id' })
  @ApiResponse({
    status: 200,
    description: 'Payment returned',
    type: GetPaymentsDto,
  })
  async getById(
    @Param('id') id: number,
    @Res({ passthrough: true }) response,
  ): Promise<Object> {
    try {
      const customers = await this.queryBus.execute(
        new GetPaymentsByIdQuery(id),
      );
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}

import { Controller, Post, Body, Res, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { RegisteredClaimRequest } from '../applicaction/dtos/request/registered-claim.request.dto';
import { RegisterClaimResponse } from '../applicaction/dtos/response/registered-claim-response.dto';
import { ClaimApplicationService } from '../applicaction/services/claim-application.service';
import { GetClaimsQuery } from '../applicaction/queries/get-claims-query';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetClaimByIdQuery } from '../applicaction/queries/get-claim-by-id.query';

@ApiBearerAuth()
@ApiTags('claims')
@Controller('claims')
export class ClaimController {
  constructor(
    private readonly claimApplicationService: ClaimApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new claim' })
  @ApiResponse({
    status: 201,
    description: 'Claim created',
  })
  async register(
    @Body() registeredClaimRequest: RegisteredClaimRequest,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterClaimResponse> =
        await this.claimApplicationService.register(registeredClaimRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all claims' })
  @ApiResponse({
    status: 200,
    description: 'All claims returned',
    isArray: true,
  })
  async getClaims(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(new GetClaimsQuery());
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get claim by id' })
  @ApiResponse({
    status: 200,
    description: 'Claim returned',
  })
  async getById(
    @Param('id') claimId: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const customers = await this.queryBus.execute(
        new GetClaimByIdQuery(claimId),
      );
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}

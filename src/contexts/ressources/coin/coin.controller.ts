import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CoinService } from './coin.service';
import { CoinFilterDto, RscCoin, UpdateCoinDto  } from './types/coin.dto';
import { PermissionsGuard } from 'src/core/permissions/permissions.guard';
import { Permissions } from 'src/core/permissions/permissions';
import { JwtAuthGuard } from 'src/contexts/Auth/jwt-auth.guard';
import { RequirePermissions } from 'src/core/permissions/require-permissions';

@Controller('coin')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class CoinController {
    constructor(private readonly coinService: CoinService) {}

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    @RequirePermissions(Permissions.COIN_WRITE)
    async create(@Body() body: RscCoin) {
        return await this.coinService.createCoin(
            body.name,
            body.description,
            body.value,
            body.quantity,
            body.nationality,
            body.release,
        );
    }

    @Get('filter')
    @RequirePermissions(Permissions.COIN_READ)
    async filter(@Query() query: CoinFilterDto) {
        return await this.coinService.getAllCoins(
            { name: query.name, nationality: query.nationality },
            { page: query.page ?? 1, limit: query.limit ?? 10 },
        );
    }

    @Get('read/:id')
    @RequirePermissions(Permissions.COIN_READ)
    async findOne(@Param('id') id: string) {
        return await this.coinService.getCoinById(id);
    }

    @Patch('update/:id')
    @RequirePermissions(Permissions.COIN_WRITE)
    async update(@Param('id') id: string, @Body() body: UpdateCoinDto) {
        return await this.coinService.updateCoin(id, {
            name: body.name,
            description: body.description,
            value: body.value,
            quantity: body.quantity,...(body.nationality && { nationality: { id: body.nationality } as any }),
        });
    }

    @Delete('delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @RequirePermissions(Permissions.COIN_WRITE)
    async delete(@Param('id') id: string) {
        return await this.coinService.deleteCoin(id);
    }
}
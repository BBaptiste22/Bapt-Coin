import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { NationalityService } from './nationality.service';
import { RscNationality, UpdateNationalityDto, NationalityFilterDto } from './types/nationality.dto';
import { RequirePermissions } from 'src/core/permissions/require-permissions';
import { PermissionsGuard } from 'src/core/permissions/permissions.guard';
import { Permissions } from 'src/core/permissions/permissions';
import { JwtAuthGuard } from 'src/contexts/Auth/jwt-auth.guard';

@Controller('nationality')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class NationalityController {
    constructor(private readonly nationalityService: NationalityService) {}

    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    @RequirePermissions(Permissions.ADMIN_ALL)
    async create(@Body() body: RscNationality) {
        return await this.nationalityService.createNationality(
            body.name,
            body.country_code,
            body.flag,
        );
    }

    @Get('filter')
    @RequirePermissions(Permissions.USER_READ)
    async filter(@Query() query: NationalityFilterDto) {
        return await this.nationalityService.getAllNationalities({
            name: query.name,
            country_code: query.country_code,
        });
    }

    @Get('read/:id')
    @RequirePermissions(Permissions.USER_READ)
    async findOne(@Param('id') id: string) {
        return await this.nationalityService.getNationalityById(id);
    }

    @Patch('update/:id')
    @RequirePermissions(Permissions.ADMIN_ALL)
    async update(@Param('id') id: string, @Body() body: UpdateNationalityDto) {
        return await this.nationalityService.updateNationality(id, {
            name: body.name,
            country_code: body.country_code,
            flag: body.flag,
        });
    }

    @Delete('delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @RequirePermissions(Permissions.ADMIN_ALL)
    async delete(@Param('id') id: string) {
        return await this.nationalityService.deleteNationality(id);
    }
}
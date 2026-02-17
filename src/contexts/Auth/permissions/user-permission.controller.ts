import { Body, Controller, HttpCode, HttpStatus, Param, Patch, UseGuards } from '@nestjs/common';
import { IsString } from 'class-validator';
import { PermissionsGuard } from 'src/core/permissions/permissions.guard';
import { RequirePermissions } from 'src/core/permissions/require-permissions';
import { Permissions } from 'src/core/permissions/permissions';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { AuthService } from '../auth.service';

export class UpdatePermissionsDto {
    @IsString()
    permissions: string; 
}

@Controller('user')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class UserController {
    constructor(private readonly authService: AuthService) {}

    @Patch('permissions/:id')
    @HttpCode(HttpStatus.OK)
    @RequirePermissions(Permissions.ADMIN_ALL)
    async updatePermissions(
        @Param('id') id: string,
        @Body() body: UpdatePermissionsDto,
    ) {
        return await this.authService.updatePermissions(id, BigInt(body.permissions));
    }
}
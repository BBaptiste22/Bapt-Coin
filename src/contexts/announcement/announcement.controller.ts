import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './types/announcement.dto';
import { JwtAuthGuard } from 'src/contexts/Auth/jwt-auth.guard';
import { PermissionsGuard } from 'src/core/permissions/permissions.guard';
import { RequirePermissions } from 'src/core/permissions/require-permissions';
import { Permissions } from 'src/core/permissions/permissions';

@Controller('announcement')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class AnnouncementController {
    constructor(private readonly announcementService: AnnouncementService) {}

    // POST /announcement/create
    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    @RequirePermissions(Permissions.USER_READ)
    async create(@Body() body: CreateAnnouncementDto, @Request() req) {
        return await this.announcementService.createAnnouncement(
            body.title,
            body.description,
            body.offeredCoins,
            body.wantedCoins,
            body.price,
            req.user.sub,
        );
    }

    // GET /announcement/all
    @Get('all')
    @RequirePermissions(Permissions.USER_READ)
    async findAll() {
        return await this.announcementService.getAllAnnouncements();
    }

    // GET /announcement/my
    @Get('my')
    @RequirePermissions(Permissions.USER_READ)
    async myAnnouncements(@Request() req) {
        return await this.announcementService.getMyAnnouncements(req.user.sub);
    }

    // DELETE /announcement/delete/:id
    @Delete('delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @RequirePermissions(Permissions.USER_READ)
    async delete(@Param('id') id: string, @Request() req) {
        return await this.announcementService.deleteAnnouncement(id, req.user.sub);
    }

    // POST /announcement/:id/accept
    @Post(':id/accept')
    @RequirePermissions(Permissions.USER_READ)
    async accept(@Param('id') id: string, @Request() req) {
        return await this.announcementService.acceptAnnouncement(id, req.user.sub);
    }

    // POST /announcement/transaction/:id/confirm
    @Post('transaction/:id/confirm')
    @RequirePermissions(Permissions.USER_READ)
    async confirm(@Param('id') transactionId: string, @Request() req) {
        return await this.announcementService.confirmTransaction(transactionId, req.user.sub);
    }
}
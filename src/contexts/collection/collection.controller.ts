import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards, Request } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto, AddCoinDto } from './types/collection.dto';
import { JwtAuthGuard } from 'src/contexts/Auth/jwt-auth.guard';
import { PermissionsGuard } from 'src/core/permissions/permissions.guard';
import { RequirePermissions } from 'src/core/permissions/require-permissions';
import { Permissions } from 'src/core/permissions/permissions';

@Controller('collection')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class CollectionController {
    constructor(private readonly collectionService: CollectionService) {}


    @Post('create')
    @HttpCode(HttpStatus.CREATED)
    @RequirePermissions(Permissions.USER_READ)
    async create(@Body() body: CreateCollectionDto, @Request() req) {
        return await this.collectionService.createCollection(body.name, req.user.sub);
    }

    @Get('my')
    @RequirePermissions(Permissions.USER_READ)
    async myCollections(@Request() req) {
        return await this.collectionService.getMyCollections(req.user.sub);
    }

    
    @Get(':id')
    @RequirePermissions(Permissions.USER_READ)
    async findOne(@Param('id') id: string, @Request() req) {
        return await this.collectionService.getCollectionById(id, req.user.sub);
    }

    
    @Delete('delete/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @RequirePermissions(Permissions.USER_READ)
    async delete(@Param('id') id: string, @Request() req) {
        return await this.collectionService.deleteCollection(id, req.user.sub);
    }

    
    @Post(':id/add-coin')
    @RequirePermissions(Permissions.USER_READ)
    async addCoin(@Param('id') id: string, @Body() body: AddCoinDto, @Request() req) {
        return await this.collectionService.addCoin(id, body.coinId, req.user.sub);
    }



    
    @Delete(':id/remove-coin')
    @HttpCode(HttpStatus.NO_CONTENT)
    @RequirePermissions(Permissions.USER_READ)
    async removeCoin(@Param('id') id: string, @Body() body: AddCoinDto, @Request() req) {
        return await this.collectionService.removeCoin(id, body.coinId, req.user.sub);
    }
}
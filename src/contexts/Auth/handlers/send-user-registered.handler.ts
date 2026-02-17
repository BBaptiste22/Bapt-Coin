import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { AUTH_REGISTERED_EVENT } from "../events/user-registrered.event";

@Injectable()
export class SendUserRegisteredEventHandler {
    constructor(){}

    @OnEvent(AUTH_REGISTERED_EVENT)
    async handle(payload){
        console.log(payload)
    }
}
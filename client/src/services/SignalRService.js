import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import {API_ENDPOINTS} from "../constants.js";

class SignalRService {
    constructor(hubUrl) {
        this.hubUrl = hubUrl;
        this.connection = null;
    }

    getConnection() {
        if (!this.connection) {
            this.connection = new HubConnectionBuilder()
                .withUrl(this.hubUrl)
                .configureLogging(LogLevel.Information)
                .withAutomaticReconnect()
                .build();

            this.setupReconnectionHandlers();
        }
        return this.connection;
    }

    setupReconnectionHandlers() {
        this.connection.onclose((error) => {
            console.warn("Connection lost. Attempting to reconnect...", error);
        });
    }

    async startConnection() {
        try {
            if (this.connection.state === 'Disconnected') {
                await this.connection.start();
                console.log(`Connected to SignalR hub at ${this.hubUrl}`);
            }
        } catch (error) {
            console.error(`Error connecting to SignalR hub at ${this.hubUrl}:`, error);
        }
    }

    stopConnection() {
        if (this.connection) {
            this.connection.stop();
            console.log(`Disconnected from SignalR hub at ${this.hubUrl}`);
        }
    }
}


export const ChatHubService = new SignalRService(API_ENDPOINTS.LIVE.CHAT)
export const NotificationHubService = new SignalRService(API_ENDPOINTS.LIVE.NOTIFICATIONS)
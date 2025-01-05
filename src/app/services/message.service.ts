// toast.service.ts
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    constructor(private messageService: MessageService) { }

    /**
     * Show success toast message
     * @param summary - Title of the toast
     * @param detail - Message content
     * @param sticky - If true, toast will not auto-dismiss
     */
    showSuccess(summary: string, detail?: string, sticky: boolean = false) {
        this.messageService.add({
            severity: 'success',
            summary: summary,
            detail: detail,
            sticky: sticky,
            life: 3000,
            styleClass: 'custom-success-toast',
            contentStyleClass: 'custom-toast-content',
            icon: 'none'
        });
    }

    /**
     * Show error toast message
     * @param summary - Title of the toast
     * @param detail - Message content
     * @param sticky - If true, toast will not auto-dismiss
     */
    showError(summary: string, detail?: string, sticky: boolean = false) {
        this.messageService.add({
            severity: 'error',
            summary: summary,
            detail: detail,
            sticky: sticky,
            life: 5000,
            styleClass: 'custom-error-toast',
            contentStyleClass: 'custom-toast-content',
            icon: 'none'
        });
    }

    /**
     * Show warning toast message
     * @param summary - Title of the toast
     * @param detail - Message content
     * @param sticky - If true, toast will not auto-dismiss
     */
    showWarning(summary: string, detail?: string, sticky: boolean = false) {
        this.messageService.add({
            severity: 'warn',
            summary: summary,
            detail: detail,
            sticky: sticky,
            life: 4000,
            styleClass: 'custom-warn-toast',
            contentStyleClass: 'custom-toast-content',
            icon: 'none'
        });
    }

    /**
     * Show info toast message
     * @param summary - Title of the toast
     * @param detail - Message content
     * @param sticky - If true, toast will not auto-dismiss
     */
    showInfo(summary: string, detail?: string, sticky: boolean = false) {
        this.messageService.add({
            severity: 'info',
            summary: summary,
            detail: detail,
            sticky: sticky,
            life: 3000,
            styleClass: 'custom-info-toast',
            contentStyleClass: 'custom-toast-content',
            icon: 'none'
        });
    }

    /**
     * Show multiple messages at once
     * @param messages - Array of message objects
     */
    showMultiple(messages: any[]) {
        this.messageService.addAll(messages);
    }

    /**
     * Clear all toast messages
     */
    clearAll() {
        this.messageService.clear();
    }
}
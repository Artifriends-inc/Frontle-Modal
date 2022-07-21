'use strict';

import {zIndexManager} from "./util/zIndexManager.js";

export class ModalManager {
    static _instance = null;
    constructor() {
        const handler = document.querySelector('.rootPage').id;

        if (ModalManager._instance) {
            if(ModalManager._instance.handler !== handler) ModalManager._instance.init(handler);
            return ModalManager._instance;
        }

        this.init(handler);
        ModalManager._instance = this;
    }

    zIndexManager = null;
    handler = null;
    modalCount = 0;
    openedStatus = {};
    openingStatus = {};
    closingStatus = {};

    init(handler) {
        this.zIndexManager = new zIndexManager();
        this.handler = handler;
        this.modalCount = 0;
        this.openedStatus = {};
        this.openingStatus = {};
        this.closingStatus = {};
    }

    getZIndex() {
        return this.zIndexManager.getZIndex();
    }

    startOpen(modalId) {
        this.openingStatus[modalId] = true;
        this.modalCount++;
        this.zIndexManager.setZIndex(2);
    }

    endOpen(modalId) {
        this.openingStatus[modalId] = false;
        this.openedStatus[modalId] = true;
    }

    startClose(modalId) {
        this.closingStatus[modalId] = true;
        if(this.modalCount > 0) this.modalCount--;
    }

    endClose(modalId) {
        this.closingStatus[modalId] = false;
        this.openedStatus[modalId] = false;
    }

    checkOpenedStatus(modalId) {
        return this.openedStatus[modalId];
    }

    checkAnimationStatus(modalId) {
        // animation is running
        if(this.openingStatus[modalId] || this.closingStatus[modalId]) return true;
        // animation is not running
        else return false;
    }
}


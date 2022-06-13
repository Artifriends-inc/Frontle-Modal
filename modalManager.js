'use strict';

import {zIndexManager} from "../zindex-maximumvalue-manager/zIndexManager.js";

export class ModalManager {
    static instance = null;
    static getInstance(handler) {
        if (this.instance === null) {
            this.instance = new this();
            this.instance.init(handler);
        } else {
            if(this.instance.handler !== handler) this.instance.init(handler);
        }

        return this.instance;
    }

    zIndexManager = null;
    handler = null;
    modalCount = 0;
    openedStatus = {};
    openingStatus = {};
    closingStatus = {};

    constructor() {}

    init(handler) {
        this.zIndexManager = zIndexManager.getInstance(handler);
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


'use strict';

import {ModalManager} from "./modalManager.js";

export class Modal {
    modalManager = null;
    modalId = null;

    // required options
    handler = null;
    html = ``;

    // custom options
    modalClass = '';
    modalContentsClass = '';
    modalBackgroundClass = '';
    transitionSeconds = '0.3';
    backgroundClickExit = true;

    awake = () => {};
    start = () => {};
    end = () => {};

    constructor(handler, html) {
        if(handler === null) throw 'handler must be entered';
        if(html === null) throw 'html must be entered';

        this.handler = handler;
        this.html = html;

        this.modalManager = ModalManager.getInstance(this.handler);
    }

    open() {
        if(this.modalId !== null){
            // modal is already opened
            if(this.modalManager.checkOpenedStatus(this.modalId)) return;

            // animation is running
            if(this.modalManager.checkAnimationStatus(this.modalId)) return;
        }

        // get z-index
        let zIndex = this.modalManager.getZIndex();

        // set modal id
        this.modalId = 'frontleModal' + zIndex;

        // start modal open
        this.modalManager.startOpen(this.modalId);

        // add default modal css
        if(document.getElementById('frontleModalCSS') === null){
            let modalCSSElement = document.createElement('style');
            modalCSSElement.setAttribute('id', 'frontleModalCSS');
            modalCSSElement.innerHTML = `
                .frontleModal{
                    position: fixed;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                }
                .frontleModalBackground{
                    position: fixed;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    background: rgba(0, 0, 0, 0.4);
                }
                .frontleModalContents{
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    width: 200px;
                    height: 80px;
                    transform: translate(-50%, -50%);
                    box-sizing: border-box;
                    background: #ffffff;
                    overflow: hidden;
                }
            `;
            document.head.insertBefore(modalCSSElement, document.head.childNodes[0]);
        }

        // set html
        let html = `
            <div id="frontleModalBackground_${this.modalId}" class="frontleModalBackground ${this.modalBackgroundClass}" style="z-index: ${zIndex}"></div>
            <div id="frontleModalContents_${this.modalId}" class="frontleModalContents ${this.modalContentsClass}" style="z-index: ${zIndex + 1}">${this.html}</div>
        `;

        // add modal
        let modalElement = document.createElement('div');
        modalElement.setAttribute('id', this.modalId);
        modalElement.className = `frontleModal ${this.modalClass}`;
        modalElement.innerHTML = html;
        modalElement.style.zIndex = String(zIndex);
        modalElement.style.opacity = '0';
        modalElement.style.transition = `opacity ease ${this.transitionSeconds}s 0s`;
        document.getElementById(this.handler).append(modalElement);

        // run lifecycle
        this.awake();

        // set close event
        if(this.backgroundClickExit === true){
            document.querySelector(`#frontleModalBackground_${this.modalId}`).addEventListener('click', () => {
                this.close();
            });
        }

        // start modal animation
        setTimeout(() => {
            let modal = document.getElementById(this.modalId);
            modal.style.opacity = '1';
        }, 0);

        // end modal animation
        setTimeout(() => {
            // end modal open
            this.modalManager.endOpen(this.modalId);

            // run lifecycle
            this.start();
        }, Number(this.transitionSeconds) * 1000);
    }

    close() {
        // non modal
        if(this.modalId === null) return;

        // modal is not opened
        if(this.modalManager.checkOpenedStatus(this.modalId) === false) return;

        // animation is running
        if(this.modalManager.checkAnimationStatus(this.modalId)) return;

        // start modal close
        this.modalManager.startClose(this.modalId);

        // run lifecycle
        this.end();

        // start modal animation
        let modalElement = document.getElementById(this.modalId);
        if(modalElement !== null) modalElement.style.opacity = '0';

        // end modal animation
        setTimeout(() => {
            // remove modal
            if(modalElement !== null) modalElement.remove();

            // end modal close
            this.modalManager.endClose(this.modalId);
        }, this.transitionSeconds * 1000);
    }
}

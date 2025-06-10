/* eslint-disable lit-plugin/no-invalid-css */

import { css } from 'lit'

export default css`      
    :host {
        display: inline-block;
        line-height: 0;        
        transition: filter 0.2s ease;
    }
    :host([variant="default"]){
        color: var(--sl-color-gray-500);
    }
    :host([variant="primary"]){
        color: var(--sl-color-primary-600);
    }
    :host([variant="success"]){
        color: var(--sl-color-success-600);
    }
    :host([variant="warning"]){
        color: var(--sl-color-warning-600);
    }
    :host([variant="neutral"]){
        color: var(--sl-color-neutral-600);
    }
    :host([variant="danger"]){
        color: var(--sl-color-danger-600);
    }

    :host([mode="button"]){
        cursor: pointer;
    }
    :host([mode="button"]:not([disabled])) .icons-wrapper:hover {
        filter: brightness(200%);    
    }
    :host([mode="button"]:not([disabled])) .icons-wrapper:active {
        filter: brightness(0.5);
    }

    :host([mode="toggle"]){
        cursor: pointer;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    :host([disabled]) {
        filter: grayscale(100%);
        opacity: 0.6;
        cursor: not-allowed;
        pointer-events: none;
    }
    
    .icons-wrapper {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center; 
    }

    .icon-container {
        position: absolute;
        top: 0;
        left: 0;
        transition: all 0.3s ease, transform 0.3s ease;
        display: inline-flex;
        align-items: center;
        justify-content: center;
    } 

    :host([circle]) .icon-container {
        border-radius: 50%;        
        box-sizing: border-box;
        background-color: color-mix(in srgb, currentColor 10%, transparent);
    }

    .icon-container svg {
        width: 100%;
        height: 100%;
        transition: transform 0.3s ease, color 0.3s ease;
    }
    :host([circle]) .icon-container svg{
        width: 50%;
        height: 50%;
    }
    .icon-container.has-ripple::before,
    .icon-container.has-ripple::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200%;
        height: 200%;
        border-radius: 50%;
        background-color: var(--ripple-color, currentColor);
        transform: translate(-50%, -50%) scale(0);
        z-index: -1;
        pointer-events: none;
    }
    
    .icon-container.has-ripple::before {
        opacity: 0.4;
        animation: ripple var(--ripple-speed, 1.5s) infinite calc(var(--ripple-speed, 1s) * 0.5) linear;
    }
    
    .icon-container.has-ripple::after {
        opacity: 0.6;
        animation: ripple var(--ripple-speed, 1.5s) infinite linear;
    }
    
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
        }
    }
`
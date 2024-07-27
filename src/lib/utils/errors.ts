import { showVerboseErrors } from "../consts";

const errorOverlay = document.getElementById('errorOverlay') as HTMLDialogElement;
const errorOverlayContent = document.getElementById('errorOverlayContent') as HTMLDivElement;

/**
 * Create a text element with the given tag and text content
 */
const createTextElement = (tag: string, text: string) => {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
}

/**
 * Create a button element with the given text and click handler
 */
const createButton = (text: string, onClick: () => void) => {
    const button = document.createElement('button');
    button.textContent = text;
    button.onclick = onClick;
    return button;
}

/**
 * Clear the error overlay
 */
function clearError() {
    errorOverlayContent.innerHTML = '';
}

/**
 * Show an error message in the error overlay
 */
export function showError({ title, description }: { title: string, description: string }) {
    clearError();
    const titleElement = createTextElement('h2', title);
    const descriptionElement = createTextElement('p', description);
    // Create a close button for the dialog
    const closeButton = createButton('Close', () => {
        errorOverlay.open = false;
    });
    // Create a reload button for the dialog
    const reloadButton = createButton('Reload', () => {
        location.reload();
    });
    // Add the text elements
    errorOverlayContent.appendChild(titleElement);
    errorOverlayContent.appendChild(descriptionElement);
    // Add the buttons
    errorOverlayContent.appendChild(closeButton);
    errorOverlayContent.appendChild(reloadButton);
    // Open the error overlay
    errorOverlay.open = true;
    console.warn('Error:', title, description);
}

/**
 * Log an error
 */
export function logError(...error: any) {
    if (showVerboseErrors()) {
        console.log('%cLogged error', 'font-size: 10px; font-style: italic');
        console.error(...error);
        console.trace();
    }
}

/**
 * Log a message
 */
export function createLog(...log: any) {
    if (showVerboseErrors()) {
        console.log('%cCreated Log', 'font-size: 10px; font-style: italic');
        console.log(...log);
    }
}
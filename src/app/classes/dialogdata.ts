export class DialogData {
    title: string;
    message: string;
    hasCloseButton = true;
    closeButtonText = 'Schließen';

    constructor({
        title,
        message,
        hasCloseButton = true,
        closeButtonText = 'Schließen'
    }) {
        this.title = title;
        this.message = message;
        this.hasCloseButton = hasCloseButton;
        this.closeButtonText = closeButtonText;
    }
}

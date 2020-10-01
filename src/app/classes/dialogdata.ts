export class DialogData {
    title: string;
    message: string;
    hasCloseButton = true;
    hasConfirmButtons = false;
    closeButtonText = 'Schließen';

    constructor({
        title,
        message,
        hasCloseButton = true,
        hasConfirmButtons = false,
        closeButtonText = 'Schließen'
    }) {
        this.title = title;
        this.message = message;
        this.hasCloseButton = hasCloseButton;
        this.hasConfirmButtons = hasConfirmButtons;
        this.closeButtonText = closeButtonText;
    }
}

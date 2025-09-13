type ShowAlertFn = (title: string, message: string, variant: "default" | "destructive") => void;

class AlertService {
    private showAlertFn: ShowAlertFn | null = null;

    register(fn: ShowAlertFn) {
        this.showAlertFn = fn;
    }

    show(title: string, message: string, variant: "default" | "destructive") {
        if(this.showAlertFn) {
            this.showAlertFn(title, message, variant);
        } else {
            console.warn("Alert service not registered yet");
        }
    }
}

export const alertService = new AlertService();
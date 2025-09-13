import { Toast, ToastClose, ToastDescription, ToastProvider, ToastViewport } from '@/components/ui/toast';
import { alertService } from '@/Services/alert.Service';
import { AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react'

const GlobalAlert = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [variant, setVariant] = useState<"default" | "destructive">("default")
    const [message, setMessage] = useState("");

    useEffect(() => {
        alertService.register((title, message, variant) => {
            setTitle(title);
            setMessage(message);
            setVariant(variant);
            setIsOpen(true);
        });
    }, []);
    return (
        <ToastProvider>
            <Toast variant={variant} open={isOpen} onOpenChange={setIsOpen} >
                <ToastDescription>{message}</ToastDescription>
                <AlertCircle />
                <ToastClose />
            </Toast>
            <ToastViewport />
        </ToastProvider>
    )
}

export default GlobalAlert
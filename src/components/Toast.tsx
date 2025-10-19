import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X, AlertTriangle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
}

export function Toast({ message, type, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    const progressTimer = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - 2));
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, [onClose]);

  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          iconColor: 'text-green-600',
          textColor: 'text-green-800',
          progressColor: 'bg-green-500',
        };
      case 'error':
        return {
          icon: XCircle,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconColor: 'text-red-600',
          textColor: 'text-red-800',
          progressColor: 'bg-red-500',
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          iconColor: 'text-yellow-600',
          textColor: 'text-yellow-800',
          progressColor: 'bg-yellow-500',
        };
      case 'info':
        return {
          icon: Info,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          iconColor: 'text-blue-600',
          textColor: 'text-blue-800',
          progressColor: 'bg-blue-500',
        };
      default:
        return {
          icon: Info,
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          iconColor: 'text-gray-600',
          textColor: 'text-gray-800',
          progressColor: 'bg-gray-500',
        };
    }
  };

  const config = getToastConfig();
  const IconComponent = config.icon;

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      isVisible ? 'animate-slide-in-right opacity-100' : 'opacity-0 translate-x-full'
    }`}>
      <div
        className={`relative flex items-center space-x-3 px-4 py-3 rounded-xl shadow-strong border backdrop-blur-sm ${config.bgColor} ${config.borderColor} min-w-[300px] max-w-[400px]`}
      >
        <div className="flex-shrink-0">
          <IconComponent className={`h-5 w-5 ${config.iconColor} animate-bounce-gentle`} />
        </div>
        <p className={`text-sm font-medium flex-1 ${config.textColor}`}>
          {message}
        </p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className={`flex-shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors ${config.iconColor} hover:${config.iconColor.replace('text-', 'text-').replace('-600', '-800')}`}
        >
          <X className="h-4 w-4" />
        </button>
        
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 rounded-b-xl overflow-hidden">
          <div
            className={`h-full ${config.progressColor} transition-all duration-100 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

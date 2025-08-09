import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  const getHumorousMessage = (error: string) => {
    if (error.includes('No dog detected')) {
      return {
        title: "Hmm, that's not a dog...",
        subtitle: "Our AI is specifically trained for canines. Try uploading a photo of a dog!",
        suggestions: [
          "Make sure there's actually a dog in the photo",
          "Check if the image is clear and well-lit",
          "Try a different angle or closer shot",
          "Maybe it's a very good cat disguise?"
        ]
      };
    }
    
    if (error.includes('failed to load') || error.includes('network')) {
      return {
        title: "Our AI is taking a nap",
        subtitle: "Technical difficulties detected. Even AI needs coffee breaks sometimes.",
        suggestions: [
          "Check your internet connection",
          "Try refreshing the page",
          "Wait a moment and try again",
          "Make sure you're not blocking our AI's morning coffee"
        ]
      };
    }

    return {
      title: "Something went wrong",
      subtitle: error,
      suggestions: [
        "Try uploading a different image",
        "Refresh the page and try again",
        "Make sure the image is clear"
      ]
    };
  };

  const errorInfo = getHumorousMessage(message);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto"
    >
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <motion.div
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5, repeat: 3 }}
          className="flex justify-center mb-4"
        >
          <div className="p-3 bg-red-100 rounded-full">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </motion.div>
        
        <h3 className="text-lg font-semibold text-red-900 mb-2">
          {errorInfo.title}
        </h3>
        
        <p className="text-red-700 mb-4">
          {errorInfo.subtitle}
        </p>

        <div className="text-left mb-4">
          <p className="text-sm font-medium text-red-800 mb-2">Try these suggestions:</p>
          <ul className="space-y-1">
            {errorInfo.suggestions.map((suggestion, index) => (
              <li key={index} className="text-sm text-red-700">
                • {suggestion}
              </li>
            ))}
          </ul>
        </div>

        {onRetry && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRetry}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};
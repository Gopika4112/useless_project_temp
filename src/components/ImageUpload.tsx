import React, { useRef, useState, useCallback } from 'react';
import { Camera, Upload, X, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { PawLogo } from './PawLogo';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  isProcessing: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, isProcessing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // Test webhook connectivity
  const testWebhookConnection = async () => {
    console.log('🔍 Testing webhook connectivity...');
    try {
      const response = await fetch('https://inspired-bison-generally.ngrok-free.app/webhook-test/47a93820-b180-4665-b436-f1072e45d004', {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      });
      console.log('Webhook test response:', response.status, response.statusText);
    } catch (error) {
      console.error('Webhook test failed:', error);
    }
  };

  // Test on component mount
  React.useEffect(() => {
    testWebhookConnection();
  }, []);

  const handleFileSelect = useCallback(async (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Send POST request to webhook
      console.log('=== WEBHOOK POST REQUEST DEBUG ===');
      console.log('File details:', {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      });
      
      try {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('timestamp', new Date().toISOString());
        formData.append('filename', file.name);
        
        console.log('FormData contents:');
        for (let pair of formData.entries()) {
          console.log(pair[0], ':', pair[1]);
        }
        
        console.log('Sending POST request to:', 'https://inspired-bison-generally.ngrok-free.app/webhook-test/47a93820-b180-4665-b436-f1072e45d004');
        
        const response = await fetch('https://inspired-bison-generally.ngrok-free.app/webhook-test/47a93820-b180-4665-b436-f1072e45d004', {
          method: 'POST',
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
          body: formData,
        });

        console.log('Response status:', response.status);
        console.log('Response statusText:', response.statusText);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
        
        const responseText = await response.text();
        console.log('Response body:', responseText);
        
        if (response.ok) {
          console.log('✅ Image sent to webhook successfully');
        } else {
          console.error('❌ Webhook responded with error:', response.status, responseText);
        }
      } catch (error) {
        console.error('❌ Failed to send image to webhook:', error);
        console.error('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
      }
      
      console.log('=== END WEBHOOK DEBUG ===');

      onImageSelect(file);
    }
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const clearPreview = () => {
    setPreview(null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {preview ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          {!isProcessing && (
            <button
              onClick={clearPreview}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`border-2 border-dashed rounded-3xl p-10 text-center transition-all duration-300 ${dragOver
            ? 'border-orange-400 bg-white/80 backdrop-blur-sm shadow-lg'
            : 'border-orange-300/60 bg-white/60 backdrop-blur-sm hover:border-orange-400 hover:shadow-md'
            }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="space-y-8">
            <motion.div
              className="flex justify-center"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              <div className="relative p-4 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full shadow-md">
                <Camera className="w-10 h-10 text-white" />
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 4
                  }}
                >
                  <PawLogo className="text-orange-200" size="sm" />
                </motion.div>
              </div>
            </motion.div>

            <div>
              <h3 className="text-2xl font-light text-orange-900 mb-3 tracking-wide">
                Upload Dog Photo
              </h3>
              <p className="text-orange-700/80 mb-3 font-light tracking-wide">
                Drop an image here or use the buttons below
              </p>
              <p className="text-sm text-orange-600/80 font-light tracking-wide">
                AI will identify the dog and show their profile
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-md font-light tracking-wide"
              >
                <Upload className="w-4 h-4" />
                Browse Files
              </motion.button>

              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => cameraInputRef.current?.click()}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg font-light"
              >
                <Camera className="w-4 h-4" />
                Take Photo
              </motion.button>
            </div>

            {/* Floating paw prints */}
            <div className="flex justify-center gap-4 mt-4">
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 0
                }}
              >
                <PawLogo className="text-orange-300" size="sm" />
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 0.5
                }}
              >
                <PawLogo className="text-amber-300" size="sm" />
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 1
                }}
              >
                <PawLogo className="text-orange-400" size="sm" />
              </motion.div>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            className="hidden"
          />

          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            className="hidden"
          />
        </motion.div>
      )}
    </div>
  );
};
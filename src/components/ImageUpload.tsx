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
  const [dogDetails, setDogDetails] = useState<any | null>(null);
  const [isWaiting, setIsWaiting] = useState(false);

  const handleFileSelect = useCallback(async (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Send POST request to webhook
      try {
        setIsWaiting(true);
        setDogDetails(null);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('timestamp', new Date().toISOString());
        formData.append('filename', file.name);

        await fetch('https://inspired-bison-generally.ngrok-free.app/webhook-test/47a93820-b180-4665-b436-f1072e45d004', {
          method: 'POST',
          body: formData,
        });

        console.log('Image sent to webhook successfully');

        // Poll for dog details from backend every 2 seconds, max 5 tries
        let tries = 0;
        let found = false;
        while (tries < 5 && !found) {
          await new Promise(res => setTimeout(res, 2000));
          try {
            const resp = await fetch('https://inspired-bison-generally.ngrok-free.app/webhook-test/47a93820-b180-4665-b436-f1072e45d004/get-dog', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true',
              },
            });
            if (resp.ok) {
              const data = await resp.json();
              if (data && data.name) {
                setDogDetails(data);
                found = true;
                setIsWaiting(false);
                break;
              }
            }
          } catch (err) {
            // Ignore, will retry
          }
          tries++;
        }
        if (!found) {
          setDogDetails({ error: 'Unable to fetch dog details. Please try again later.' });
          setIsWaiting(false);
        }
      } catch (error) {
        console.error('Failed to send image to webhook:', error);
        setDogDetails({ error: 'Failed to send image to backend.' });
        setIsWaiting(false);
      }
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
          {isWaiting && (
            <div className="mt-4 text-orange-700 text-center">Waiting for dog details from database...</div>
          )}
          {dogDetails && (
            <div className="mt-4 p-4 bg-orange-50 rounded-lg shadow">
              {dogDetails.error ? (
                <div className="text-red-600">{dogDetails.error}</div>
              ) : (
                <>
                  <div className="text-lg font-bold text-orange-900">{dogDetails.name}</div>
                  <div className="text-orange-700">Place: {dogDetails.place || dogDetails.favoriteLocations?.join(', ')}</div>
                  <div className="text-orange-700">Breed: {dogDetails.breed}</div>
                  <div className="text-orange-700">Age: {dogDetails.age}</div>
                  {/* Add more fields as needed */}
                </>
              )}
            </div>
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
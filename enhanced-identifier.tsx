import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { DragDropUpload } from '@/components/drag-drop-upload';
import { SimpleAnalysisResult } from '@/components/simple-analysis-result';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Zap, Brain, FileImage, Download, Volleyball as HockeyPuck } from 'lucide-react';

interface EnhancedAnalysisResult {
  identification: {
    id: number;
    confidence: number;
    conditionAssessment: string;
    marketAnalysis: string;
    lacrosseHead: {
      brand: string;
      model: string;
      marketValue: string;
      confidence: number;
      marketData: {
        averagePrice: number;
        priceRange: number[];
        confidence: number;
        sources: string[];
      };
    };
  };
  enhancedResult: {
    head_name: string;
    confidence: number;
    analysis_summary: string;
  
    preprocessed_images?: string[];
    all_predictions: Array<{
      className: string;
      confidence: number;
    }>;
    method: string;
  };
}

export default function EnhancedIdentifier() {
  const [analysisResult, setAnalysisResult] = useState<EnhancedAnalysisResult | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showAnalysisWindow, setShowAnalysisWindow] = useState(false);
  const [chatGptDescription, setChatGptDescription] = useState('');

  const identifyMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      try {
        const response = await apiRequest('POST', '/api/enhanced-identify', formData);
        return await response.json();
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      setShowAnalysisWindow(true);
    },
    onError: (error) => {
      console.error('Analysis failed:', error);
      // Show user-friendly error message
      alert(`Analysis failed: ${error.message || 'Please try again with a different image'}`);
    }
  });

  const handleUpload = async (files: File[]) => {
    setUploadedFiles(files);
    
    // Validate files
    if (!files || files.length === 0) {
      alert('Please select at least one image file');
      return;
    }
    
    // Check file types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    if (invalidFiles.length > 0) {
      alert('Please upload only JPEG, PNG, or WebP image files');
      return;
    }
    
    const formData = new FormData();
    files.forEach(file => formData.append('photos', file));
    if (chatGptDescription.trim()) {
      formData.append('description', chatGptDescription.trim());
    }
    
    identifyMutation.mutate(formData);
  };

  const handleRetry = () => {
    if (uploadedFiles.length > 0) {
      identifyMutation.mutate(uploadedFiles);
    }
  };

  const handleNewAnalysis = () => {
    setAnalysisResult(null);
    setUploadedFiles([]);
    setShowAnalysisWindow(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-4">
            <HockeyPuck className="h-10 w-10 sm:h-12 sm:w-12 text-blue-500 mr-3" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              LaxCheck Identifier
            </h1>
          </div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2">
            Advanced lacrosse head identification with real-time market analysis. 
            Identify your equipment and discover its true value.
          </p>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg max-w-2xl mx-auto">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Pro Tip:</strong> For best results, remove backgrounds in Canva or use clean, well-lit photos with clear sidewall patterns visible.
            </p>
          </div>
        </div>

        {/* ChatGPT Description Box */}
        <Card className="mb-4 sm:mb-6 max-w-2xl mx-auto">
          <CardContent className="p-4 sm:p-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Additional Details (Optional - ChatGPT Enhancement)
            </label>
            <Textarea
              value={chatGptDescription}
              onChange={(e) => setChatGptDescription(e.target.value)}
              placeholder="Add any details about the lacrosse head: brand, model, year, condition, unique features, patent numbers, or anything else that might help with identification..."
              className="min-h-[100px] sm:min-h-[120px] resize-none text-base"
            />
          </CardContent>
        </Card>

        {/* Upload and Analysis Section */}
        <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
          <DragDropUpload 
            onUpload={handleUpload}
            isLoading={identifyMutation.isPending}
            maxFiles={3}
          />
          
          {identifyMutation.isError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 font-medium text-sm sm:text-base">Analysis failed. Please try again with clear JPEG/PNG images.</p>
            </div>
          )}
        </div>

        {/* Simple Analysis Results */}
        {analysisResult && (
          <SimpleAnalysisResult
            result={analysisResult.enhancedResult}
            isOpen={showAnalysisWindow}
            onClose={() => setShowAnalysisWindow(false)}
          />
        )}
      </div>
    </div>
  );
}
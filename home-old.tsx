import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import HeroSection from "@/components/hero-section";
import MLFirstUpload from "@/components/ml-first-upload";
import ResultsSection from "@/components/results-section";
import FeatureSection from "@/components/feature-section";
import RecentIdentifications from "@/components/recent-identifications";
import { getRecentIdentifications, type IdentificationResult } from "@/lib/api";
import { Volleyball as HockeyPuck, Menu, Brain, Upload, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [identificationResult, setIdentificationResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const { data: recentIdentifications = [] } = useQuery({
    queryKey: ["/api/recent-identifications"],
    queryFn: getRecentIdentifications,
  });

  const handleAnalysisComplete = (result: any) => {
    setIdentificationResult(result);
    setIsAnalyzing(false);
  };

  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
    setIdentificationResult(null);
  };

  const handleAnalysisError = () => {
    setIsAnalyzing(false);
  };

  const handleMLPrediction = async (predictions: any[]) => {
    setMLPredictions(predictions);
    setIsUploading(true);
    
    try {
      // Send ML predictions to Warrior Blade & BRINE Cyber specialized endpoint  
      const response = await fetch('/api/warrior-brine-ml-identify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          predictions,
          context: 'Teachable Machine model analysis'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process ML analysis');
      }

      const result = await response.json();
      
      if (result.success) {
        // Transform the enhanced result into our expected format
        const transformedResult = {
          identification: {
            id: Date.now(), // Temporary ID
            lacrosseHeadId: 1,
            imagePath: '',
            confidence: result.result.confidence.toString(),
            conditionOverall: result.result.condition?.overall || 'unknown',
            conditionMesh: result.result.condition?.mesh || 'unknown',
            conditionSidewalls: result.result.condition?.sidewalls || 'unknown',
            conditionScoop: result.result.condition?.scoop || 'unknown',
            estimatedValueLow: '60',
            estimatedValueHigh: '120',
            conditionAdjustment: 'ML-enhanced analysis',
            marketDemand: 'medium',
            createdAt: new Date().toISOString(),
            lacrosseHead: {
              id: 1,
              brand: result.result.brand,
              model: result.result.model,
              releaseYear: result.result.estimatedYear || 2023,
              retailPrice: "0",
              description: result.result.enhancedDescription,
              rarity: result.result.rarity
            }
          },
          comparison_links: []
        };
        
        setIdentificationResult(transformedResult);
      }
    } catch (error) {
      console.error('ML analysis error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const navigation = [
    { name: "About", href: "/about" },
    { name: "Shop", href: "/shop" },
    { name: "How it Works", href: "#" },
    { name: "API", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <HockeyPuck className="text-primary text-2xl h-8 w-8" />
              <h1 className="text-2xl font-bold text-gray-900">LaxCheck</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                item.href.startsWith('/') ? (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </a>
                )
              ))}
            </nav>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    item.href.startsWith('/') ? (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-gray-700 hover:text-primary transition-colors text-lg"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-gray-700 hover:text-primary transition-colors text-lg"
                      >
                        {item.name}
                      </a>
                    )
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Enhanced Identification System
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred analysis method - each offers unique advantages
                </p>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="upload" className="flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Photo Upload
                    </TabsTrigger>
                    <TabsTrigger value="ml" className="flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      ML Analysis
                    </TabsTrigger>
                    <TabsTrigger value="text" className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Text Description
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upload" className="mt-4">
                    <UploadSection
                      onUploadStart={handleUploadStart}
                      onUploadComplete={handleIdentificationComplete}
                      onUploadError={handleUploadError}
                      isUploading={isUploading}
                    />
                  </TabsContent>
                  
                  <TabsContent value="ml" className="mt-4">
                    <TeachableMachineAnalyzer
                      onPrediction={handleMLPrediction}
                      modelUrl="/my_model/"
                    />
                  </TabsContent>
                  
                  <TabsContent value="text" className="mt-4">
                    <UploadSection
                      onUploadStart={handleUploadStart}
                      onUploadComplete={handleIdentificationComplete}
                      onUploadError={handleUploadError}
                      isUploading={isUploading}
                      textMode={true}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <ResultsSection
            result={identificationResult}
            isLoading={isUploading}
            mlPredictions={mlPredictions}
          />
        </div>

        <FeatureSection />
        
        <RecentIdentifications identifications={recentIdentifications} />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <HockeyPuck className="text-primary text-2xl h-8 w-8" />
                <h3 className="text-2xl font-bold">LaxCheck</h3>
              </div>
              <p className="text-gray-400 mb-4">
                The most accurate lacrosse head identification and valuation tool for players, coaches, and collectors.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.5 13.559 3.5 12.017s.698-2.878 1.626-3.674c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.796 1.626 2.132 1.626 3.674s-.698 2.878-1.626 3.674c-.875.807-2.026 1.297-3.323 1.297z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">How it Works</a></li>
                <li><a href="#" className="hover:text-white">Pricing Guide</a></li>
                <li><a href="#" className="hover:text-white">API Documentation</a></li>
                <li><a href="#" className="hover:text-white">Mobile App</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LaxCheck. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

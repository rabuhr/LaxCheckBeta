import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Brain, Target, AlertCircle, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PerformanceMetrics {
  totalPredictions: number;
  correctPredictions: number;
  accuracy: number;
  commonMistakes: Array<{
    incorrectBrand: string;
    incorrectModel: string;
    correctBrand: string;
    correctModel: string;
    frequency: number;
  }>;
  brandAccuracy: Record<string, number>;
  confidenceDistribution: Record<string, number>;
}

interface TrainingData {
  performance: PerformanceMetrics | null;
  recommendations: string[];
}

export default function AdminPage() {
  const [trainingData, setTrainingData] = useState<TrainingData | null>(null);
  const [isRetraining, setIsRetraining] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadTrainingData();
  }, []);

  const loadTrainingData = async () => {
    try {
      const response = await fetch('/api/training/performance');
      if (response.ok) {
        const data = await response.json();
        setTrainingData(data);
      }
    } catch (error) {
      console.error('Error loading training data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetrain = async () => {
    setIsRetraining(true);
    try {
      const response = await fetch('/api/training/retrain', { method: 'POST' });
      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Retraining Complete",
          description: result.message,
        });
        await loadTrainingData(); // Reload metrics
      } else {
        throw new Error('Retrain failed');
      }
    } catch (error) {
      toast({
        title: "Retraining Failed",
        description: "Please try again or check the logs.",
        variant: "destructive",
      });
    } finally {
      setIsRetraining(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">Loading training data...</div>
        </div>
      </div>
    );
  }

  const performance = trainingData?.performance;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Training Dashboard</h1>
          <p className="text-gray-600">Monitor and improve lacrosse head identification accuracy</p>
        </div>

        {!performance ? (
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Training Data Yet</h3>
              <p className="text-gray-600 mb-4">
                Start collecting training data by having users report incorrect identifications.
              </p>
              <Button onClick={loadTrainingData}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Data
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Overall Performance */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Predictions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{performance.totalPredictions}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Correct Predictions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{performance.correctPredictions}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{performance.accuracy.toFixed(1)}%</div>
                  <Badge className={performance.accuracy >= 80 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                    {performance.accuracy >= 80 ? "Good" : "Needs Improvement"}
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={handleRetrain}
                    disabled={isRetraining || performance.totalPredictions < 5}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isRetraining ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Retraining...
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2 h-4 w-4" />
                        Retrain AI
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Common Mistakes */}
            {performance.commonMistakes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="mr-2 h-5 w-5" />
                    Common Mistakes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {performance.commonMistakes.slice(0, 5).map((mistake, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <p className="font-medium text-red-900">
                            Confused {mistake.correctBrand} {mistake.correctModel}
                          </p>
                          <p className="text-sm text-red-600">
                            with {mistake.incorrectBrand} {mistake.incorrectModel}
                          </p>
                        </div>
                        <Badge className="bg-red-100 text-red-800">
                          {mistake.frequency} times
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Brand Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Brand Accuracy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(performance.brandAccuracy).map(([brand, accuracy]) => (
                    <div key={brand} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{brand}</span>
                        <span className="text-lg font-bold text-blue-600">{accuracy.toFixed(1)}%</span>
                      </div>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${accuracy >= 80 ? 'bg-green-500' : accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(100, accuracy)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            {trainingData.recommendations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="mr-2 h-5 w-5" />
                    Training Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {trainingData.recommendations.map((recommendation, index) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-blue-900">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
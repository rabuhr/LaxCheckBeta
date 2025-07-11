import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  BarChart, 
  TrendingUp, 
  Activity, 
  Brain, 
  Users, 
  Target, 
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Eye,
  Home
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface DashboardStats {
  identifications: {
    total: number;
    successful: number;
    unknown: number;
    averageConfidence: number;
    todayCount: number;
    weekCount: number;
  };
  mlPerformance: {
    modelAccuracy: number;
    classDistribution: Record<string, number>;
    confidenceDistribution: {
      high: number; // >80%
      medium: number; // 50-80%
      low: number; // <50%
    };
    topModels: Array<{ model: string; count: number; avgConfidence: number }>;
  };
  userCorrections: {
    total: number;
    pending: number;
    processed: number;
    mostCorrectedModel: string | null;
    recentCorrections: Array<{
      id: string;
      incorrectPrediction: string;
      correctModel: string;
      confidence: number;
      submittedAt: string;
    }>;
  };
  systemHealth: {
    uptime: string;
    responseTime: number;
    errorRate: number;
    cacheHitRate: number;
  };
  marketInsights: {
    totalValuationsCalculated: number;
    averageEstimatedValue: number;
    highestValueModel: string;
    mostActiveModel: string;
    marketTrends: {
      rising: string[];
      declining: string[];
      stable: string[];
    };
  };
}

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['/api/dashboard/stats'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <Activity className="h-12 w-12 mx-auto text-blue-500 animate-spin" />
            <p className="mt-4 text-gray-600">Loading performance data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Target className="text-blue-600 h-8 w-8" />
              <h1 className="text-2xl font-bold text-gray-900">LaxCheck</h1>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Link>
              <span className="text-blue-600 font-medium">Performance Dashboard</span>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Performance Dashboard</h2>
          <p className="text-gray-600">Real-time analytics and system performance metrics</p>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Identifications</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.identifications.total.toLocaleString() || 0}</div>
              <p className="text-xs text-muted-foreground">
                +{stats?.identifications.todayCount || 0} today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats ? Math.round((stats.identifications.successful / stats.identifications.total) * 100) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">
                {stats?.identifications.successful || 0} successful identifications
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Confidence</CardTitle>
              <Brain className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.identifications.averageConfidence || 0}%</div>
              <p className="text-xs text-muted-foreground">
                ML model confidence score
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
              <Target className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.mlPerformance.modelAccuracy || 0}%</div>
              <p className="text-xs text-muted-foreground">
                Based on user corrections
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="ml-performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="ml-performance">ML Performance</TabsTrigger>
            <TabsTrigger value="market-insights">Market Insights</TabsTrigger>
            <TabsTrigger value="usage-analytics">Usage Analytics</TabsTrigger>
            <TabsTrigger value="user-feedback">User Feedback</TabsTrigger>
            <TabsTrigger value="system-health">System Health</TabsTrigger>
          </TabsList>

          {/* ML Performance Tab */}
          <TabsContent value="ml-performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Confidence Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5" />
                    Confidence Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">High Confidence (80%+)</span>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {stats?.mlPerformance.confidenceDistribution.high || 0}
                      </Badge>
                    </div>
                    <Progress 
                      value={stats ? (stats.mlPerformance.confidenceDistribution.high / stats.identifications.total) * 100 : 0}
                      className="h-2"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Medium Confidence (50-80%)</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        {stats?.mlPerformance.confidenceDistribution.medium || 0}
                      </Badge>
                    </div>
                    <Progress 
                      value={stats ? (stats.mlPerformance.confidenceDistribution.medium / stats.identifications.total) * 100 : 0}
                      className="h-2"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Low Confidence (&lt;50%)</span>
                      <Badge variant="destructive" className="bg-red-100 text-red-800">
                        {stats?.mlPerformance.confidenceDistribution.low || 0}
                      </Badge>
                    </div>
                    <Progress 
                      value={stats ? (stats.mlPerformance.confidenceDistribution.low / stats.identifications.total) * 100 : 0}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Models */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Top Performing Models
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats?.mlPerformance.topModels?.slice(0, 5).map((model, index) => (
                      <div key={model.model} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="font-mono text-xs">
                            #{index + 1}
                          </Badge>
                          <div>
                            <div className="font-medium text-sm">{model.model}</div>
                            <div className="text-xs text-gray-500">{model.count} identifications</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-sm">{model.avgConfidence}%</div>
                          <div className="text-xs text-gray-500">avg confidence</div>
                        </div>
                      </div>
                    )) || <div className="text-center text-gray-500 py-4">No data available</div>}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Class Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Class Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {stats?.mlPerformance.classDistribution && Object.entries(stats.mlPerformance.classDistribution)
                    .sort(([, a], [, b]) => b - a)
                    .map(([className, count]) => (
                    <div key={className} className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{count}</div>
                      <div className="text-sm text-gray-700 font-medium">{className}</div>
                      <div className="text-xs text-gray-500">
                        {stats ? Math.round((count / stats.identifications.total) * 100) : 0}% of total
                      </div>
                    </div>
                  )) || <div className="col-span-full text-center text-gray-500 py-4">No data available</div>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Market Insights Tab */}
          <TabsContent value="market-insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Valuation Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Valuation Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {stats?.marketInsights?.totalValuationsCalculated?.toLocaleString() || 0}
                      </div>
                      <div className="text-xs text-gray-600">Total Valuations</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        ${stats?.marketInsights?.averageEstimatedValue?.toFixed(2) || '0.00'}
                      </div>
                      <div className="text-xs text-gray-600">Avg Estimated Value</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-sm font-medium text-blue-800">Highest Value Model</div>
                      <div className="text-lg font-bold text-blue-900">
                        {stats?.marketInsights?.highestValueModel || 'N/A'}
                      </div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-sm font-medium text-purple-800">Most Active Model</div>
                      <div className="text-lg font-bold text-purple-900">
                        {stats?.marketInsights?.mostActiveModel || 'N/A'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Market Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5" />
                    Market Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-green-700">Rising Models</span>
                        <Badge className="bg-green-100 text-green-800">
                          {stats?.marketInsights?.marketTrends?.rising?.length || 0}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        {stats?.marketInsights?.marketTrends?.rising?.map((model, index) => (
                          <div key={index} className="text-xs text-gray-600 bg-green-50 p-2 rounded">
                            {model}
                          </div>
                        )) || <div className="text-xs text-gray-500">No data available</div>}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-red-700">Declining Models</span>
                        <Badge variant="destructive" className="bg-red-100 text-red-800">
                          {stats?.marketInsights?.marketTrends?.declining?.length || 0}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        {stats?.marketInsights?.marketTrends?.declining?.map((model, index) => (
                          <div key={index} className="text-xs text-gray-600 bg-red-50 p-2 rounded">
                            {model}
                          </div>
                        )) || <div className="text-xs text-gray-500">No data available</div>}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Stable Models</span>
                        <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                          {stats?.marketInsights?.marketTrends?.stable?.length || 0}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        {stats?.marketInsights?.marketTrends?.stable?.map((model, index) => (
                          <div key={index} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                            {model}
                          </div>
                        )) || <div className="text-xs text-gray-500">No data available</div>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Advanced Valuation Demo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Advanced Valuation Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                      <h4 className="font-semibold text-gray-900 mb-2">Sample Valuation Result</h4>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Model:</span>
                          <span className="font-medium">Blade/Jett Prototype</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Base Value:</span>
                          <span className="font-medium">$250.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rarity Multiplier:</span>
                          <span className="font-medium">3.0x</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Condition:</span>
                          <span className="font-medium">1.5x (Excellent)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Provenance:</span>
                          <span className="font-medium">1.3x (Player-issued)</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between text-lg font-bold">
                          <span className="text-gray-900">Estimated Value:</span>
                          <span className="text-green-600">$1,522.05</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Price Range:</span>
                          <span className="text-gray-800">$1,369–$1,674</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Valuation Factors</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Market-based pricing from recent sales</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Rarity assessment (Mass, Legacy, Collector, Rare, Prototype)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Condition grading (Poor to Mint)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Provenance verification (Player-issued, COA, etc.)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Platform reliability weighting</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Confidence scoring integration</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Usage Analytics Tab */}
          <TabsContent value="usage-analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Usage Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Today</span>
                      <Badge variant="default">{stats?.identifications.todayCount || 0}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">This Week</span>
                      <Badge variant="secondary">{stats?.identifications.weekCount || 0}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Total</span>
                      <Badge variant="outline">{stats?.identifications.total || 0}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {stats ? Math.round(stats.identifications.total / Math.max(stats.identifications.weekCount || 1, 1)) : 0}
                      </div>
                      <div className="text-sm text-gray-600">Avg per day</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Response Time</span>
                      <span className="text-sm font-medium">{stats?.systemHealth.responseTime || 0}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Error Rate</span>
                      <span className="text-sm font-medium">{stats?.systemHealth.errorRate || 0}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Feedback Tab */}
          <TabsContent value="user-feedback" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Correction Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-red-600">{stats?.userCorrections.total || 0}</div>
                      <div className="text-xs text-gray-600">Total Corrections</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">{stats?.userCorrections.pending || 0}</div>
                      <div className="text-xs text-gray-600">Pending Review</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{stats?.userCorrections.processed || 0}</div>
                      <div className="text-xs text-gray-600">Processed</div>
                    </div>
                  </div>
                  
                  {stats?.userCorrections.mostCorrectedModel && (
                    <div className="mt-4 p-3 bg-red-50 rounded-lg">
                      <div className="text-sm font-medium text-red-800">Most Corrected Model</div>
                      <div className="text-lg font-bold text-red-900">{stats.userCorrections.mostCorrectedModel}</div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <XCircle className="h-5 w-5" />
                    Recent Corrections
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stats?.userCorrections.recentCorrections?.slice(0, 5).map((correction) => (
                      <div key={correction.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="text-sm font-medium text-red-600">
                              {correction.incorrectPrediction} → {correction.correctModel}
                            </div>
                            <div className="text-xs text-gray-500">
                              Confidence: {correction.confidence}%
                            </div>
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(correction.submittedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    )) || <div className="text-center text-gray-500 py-4">No corrections yet</div>}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Health Tab */}
          <TabsContent value="system-health" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Healthy
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Uptime</span>
                      <span className="text-sm font-medium">{stats?.systemHealth.uptime || 'N/A'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Response Time</span>
                      <span className="text-sm font-medium">{stats?.systemHealth.responseTime || 0}ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Cache Hit Rate</span>
                      <span className="text-sm font-medium">{stats?.systemHealth.cacheHitRate || 0}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    ML Model Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Model Loaded</span>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Classes</span>
                      <span className="text-sm font-medium">14 Models</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
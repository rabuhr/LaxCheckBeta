import { MilestoneTracker } from '@/components/milestone-tracker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Journey() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Trophy className="h-6 w-6 text-yellow-600" />
                Equipment Journey Milestone Tracker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Track your progress as you identify lacrosse equipment! Earn points, unlock achievements, 
                and become an expert in lacrosse gear recognition. Each successful identification brings 
                you closer to new milestones and rewards.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Milestone Tracker Component */}
        <MilestoneTracker />
      </div>
    </div>
  );
}
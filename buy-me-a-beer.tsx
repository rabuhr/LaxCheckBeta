import { Link } from "wouter";
import { Beer, Heart, Coffee, Zap, Volleyball as HockeyPuck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BuyMeABeer() {
  const donationOptions = [
    {
      amount: "$3",
      icon: <Coffee className="h-6 w-6" />,
      title: "Coffee",
      description: "Help fuel late-night coding sessions"
    },
    {
      amount: "$5",
      icon: <Beer className="h-6 w-6" />,
      title: "Beer",
      description: "Support the creator with a cold one",
      popular: true
    },
    {
      amount: "$10",
      icon: <Heart className="h-6 w-6" />,
      title: "Appreciation",
      description: "Show extra love for the project"
    },
    {
      amount: "Custom",
      icon: <Zap className="h-6 w-6" />,
      title: "Your Choice",
      description: "Any amount is greatly appreciated"
    }
  ];

  const handleVenmoDonation = (amount: string) => {
    const cleanAmount = amount.replace('$', '');
    const venmoUrl = `https://venmo.com/u/Ricky-Buhr?txn=pay&amount=${cleanAmount}&note=LaxCheck Support - Thanks for the open source tool!`;
    window.open(venmoUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">
              LaxCheck
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-primary dark:text-gray-300">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-primary dark:text-gray-300">
                About
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-primary dark:text-gray-300">
                Dashboard
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary dark:text-gray-300">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <HockeyPuck className="h-16 w-16 text-amber-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Buy Me a Beer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            LaxCheck is completely free and <span className="font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded">open source</span>! If this tool helped you find the maximum value 
            for your lacrosse equipment, consider supporting the project with a small donation.
          </p>

        </div>

        {/* What Your Beer Buys */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-amber-700 dark:text-amber-400 mb-2 flex items-center justify-center gap-3">
                <HockeyPuck className="h-8 w-8" />
                What Your Beer Buys
              </CardTitle>
              <p className="text-amber-600 dark:text-amber-300">
                Every donation supports these amazing features that took months to develop
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Comprehensive lacrosse head identification</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Advanced ML model trained on 14+ lacrosse head classes</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Professional PDF analysis report</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Detailed market analysis with preprocessed images</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Peer-reviewed by lacrosse head collectors</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Expert validation from the collector community</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Real-time market analysis</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Current pricing data across all major platforms</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Advanced image preprocessing pipeline</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">OpenCV enhancement, edge detection, background removal</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">AI-powered market insights</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">ChatGPT 4.0 analysis for maximum value optimization</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Expert validation and verification</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Multi-layer confidence scoring and analysis</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white"><span className="text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded">Open source</span> community benefit</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Available for everyone in the lacrosse community</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-blue-700 dark:text-blue-300 text-center font-medium">
                  <strong>Completely free and <span className="text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-1 rounded">open source</span></strong> - support the project with optional donations
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Donation Options */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {donationOptions.map((option, index) => (
            <Card 
              key={index} 
              className={`text-center transition-all duration-200 hover:shadow-lg cursor-pointer border-2 ${
                option.popular 
                  ? 'border-amber-400 bg-amber-50 dark:bg-amber-950' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-amber-300'
              }`}
              onClick={() => option.amount !== "Custom" ? handleVenmoDonation(option.amount) : handleVenmoDonation("5")}
            >
              {option.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="pb-4">
                <div className={`mx-auto mb-2 p-3 rounded-full ${
                  option.popular 
                    ? 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400' 
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                }`}>
                  {option.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {option.amount}
                </CardTitle>
                <p className="font-medium text-gray-900 dark:text-white">
                  {option.title}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {option.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Venmo Instructions */}
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-blue-600 dark:text-blue-400">
                How to Send a Donation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Venmo Username */}
              <div className="text-center">
                <div className="bg-blue-50 dark:bg-blue-950 rounded-lg p-6 mb-4">
                  <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                    Send via Venmo:
                  </p>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                    @Ricky-Buhr
                  </div>
                  <Button 
                    onClick={() => window.open('https://venmo.com/u/Ricky-Buhr', '_blank')}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Open Venmo Profile
                  </Button>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Step-by-step instructions:
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      1
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">
                      Click any donation amount above or the "Open Venmo Profile" button
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      2
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">
                      This will open Venmo with <strong>@Ricky-Buhr</strong> pre-filled
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      3
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">
                      Enter your donation amount and add a note like "LaxCheck Support"
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      4
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">
                      Send the payment and know you're supporting <span className="font-semibold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-1 rounded">open source</span> lacrosse tools!
                    </p>
                  </div>
                </div>
              </div>

              {/* Alternative Note */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Don't have Venmo?</strong> No worries! The tool is completely free to use. 
                  Share it with other lacrosse players to help grow the community.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link href="/enhanced-identifier">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white mr-4">
              Try LaxCheck Now
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="outline">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
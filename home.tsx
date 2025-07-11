import { Link } from "wouter";

import { Volleyball as HockeyPuck, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <HockeyPuck className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-gray-900" data-brand="true">LaxCheck</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-primary font-medium">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-primary">
                About
              </Link>
              <Link href="/enhanced-identifier" className="text-gray-700 hover:text-primary">
                Identify
              </Link>

              <Link href="/buy-me-a-beer" className="text-gray-700 hover:text-primary">
                Buy Me a Beer
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary">
                Contact
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-primary">
                Dashboard
              </Link>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col space-y-4 mt-4">
                    <Link href="/" className="text-primary font-medium">
                      Home
                    </Link>
                    <Link href="/about" className="text-gray-700 hover:text-primary">
                      About
                    </Link>
                    <Link href="/enhanced-identifier" className="text-gray-700 hover:text-primary">
                      Identify
                    </Link>

                    <Link href="/buy-me-a-beer" className="text-gray-700 hover:text-primary">
                      Buy Me a Beer
                    </Link>
                    <Link href="/contact" className="text-gray-700 hover:text-primary">
                      Contact
                    </Link>
                    <Link href="/dashboard" className="text-gray-700 hover:text-primary">
                      Dashboard
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced AI Identifier Banner */}
        <div className="mb-8 text-center">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg p-6 mb-6">
            <div className="flex items-center justify-center mb-4">
              <HockeyPuck className="h-12 w-12 text-white mr-3" />
              <h2 className="text-3xl font-bold">LaxCheck Identification System</h2>
            </div>
            <p className="text-blue-100 mb-4 text-center">
              Advanced lacrosse head identification with real-time market data and AI-powered analysis. 
              Identify your equipment and discover its true value.
            </p>
            <div className="text-center">
              <Link href="/enhanced-identifier">
                <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                  Start Identification
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Supported Models Display */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Supported Lacrosse Head Models</h3>
            <p className="text-gray-600">LaxCheck can identify and analyze these 14 lacrosse head models with high accuracy</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Warrior Models */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-bold text-red-800 mb-2">Warrior Brand (6 Models)</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Warrior Jett</li>
                <li>• Warrior Blade/Jett Faceoff Prototype</li>
                <li>• Warrior Blade</li>
                <li>• Warrior Evolution 2.0</li>
                <li>• Warrior Razer</li>
                <li>• Warrior 98' Team USA Collector</li>
              </ul>
            </div>

            {/* Brine Models */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-800 mb-2">Brine Brand (5 Models)</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Brine Vapor</li>
                <li>• Brine E3</li>
                <li>• Brine Truth</li>
                <li>• Brine Superlight 2000</li>
                <li>• Brine Cyber</li>
              </ul>
            </div>

            {/* Other Brands */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-bold text-green-800 mb-2">Other Brands (3 Models)</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Nike Blur 10 Degree</li>
                <li>• STX SAM II</li>
                <li>• Reebok 6K</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
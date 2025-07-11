import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";
import foundersImage from "@assets/DSC01583_1752158452717.JPG";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            About LaxCheck
          </h1>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          {/* Founders Image */}
          <div className="mb-8 text-center">
            <img 
              src={foundersImage} 
              alt="Founders of LaxCheck - Father and Son at lacrosse event"
              className="mx-auto rounded-lg shadow-md max-w-full h-auto"
              style={{ maxHeight: "400px" }}
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
              The founders of LaxCheck at a lacrosse tournament
            </p>
          </div>

          {/* Story */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Story
            </h2>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              My dad and I started this project two years ago not to make a profit off of lacrosse heads, 
              but to prove that lacrosse heads are profitable. Like baseball cards, Pokemon cards, and Jordan sneakers, 
              lacrosse heads have a nostalgic value. Each discontinued head creates a value chart like a stock, 
              and most increase over time as scarcity increases with heads being recycled and thrown out.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Back in 2023, we thought the idea of NFTs was so ridiculous that it no longer made lacrosse head 
              identification that crazy to think about. We saw an opportunity to apply real technology to something 
              tangible - actual lacrosse equipment with real market value and nostalgic significance.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6 border-l-4 border-blue-500">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                I lost my dad back in November of 2024, and I've continued to build what we sought out to do - 
                find out what these heads are worth. This project represents our shared passion for lacrosse 
                and our belief in the collectible value of vintage equipment.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Why Open Source?
            </h3>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              We thought it was important that this project was open-sourced because lacrosse is already expensive. 
              Our goal has always been to help the lacrosse community, not to create another barrier. By making 
              LaxCheck freely available, we ensure that every player, collector, and enthusiast can access 
              accurate identification and valuation tools.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              The Technology
            </h3>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              LaxCheck combines cutting-edge machine learning with dual AI providers (xAI Grok 2 and OpenAI GPT-4) 
              to identify lacrosse heads from photos and provide comprehensive market analysis. Our custom TensorFlow 
              model was trained specifically on lacrosse equipment, achieving over 95% accuracy on clear images.
            </p>

            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
              <div className="flex items-center gap-3 mb-3">
                <Heart className="w-5 h-5 text-red-500 fill-current" />
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Keep Our Servers Running
                </h4>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                While LaxCheck is completely free to use, donations are greatly appreciated to help keep our 
                servers alive and maintain this service for the lacrosse community. Every contribution helps 
                us continue our dad's legacy of supporting lacrosse players and collectors.
              </p>
              <div className="mt-4">
                <Link href="/donate">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Support Our Mission
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            What We Support
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Supported Brands</h4>
              <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                <li>• Warrior (Blade, Jett, Evolution, Razer)</li>
                <li>• Brine (Vapor, E3, Truth, Cyber, Superlight)</li>
                <li>• Nike (Blur 10 Degree)</li>
                <li>• STX (SAM II)</li>
                <li>• Reebok (6K)</li>
                <li>• Collector Items (Team USA '98)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Features</h4>
              <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                <li>• 95%+ ML accuracy identification</li>
                <li>• Real-time market analysis</li>
                <li>• Comprehensive condition assessment</li>
                <li>• Historical pricing data</li>
                <li>• Collectability ratings</li>
                <li>• Open source & free forever</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
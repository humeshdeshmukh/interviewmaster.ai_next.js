import { Button } from "@/components/ui/Button"; // Assuming you have a Button component
import { Heading } from "@/components/ui/Heading"; // Assuming you have a Heading component
import { cn } from "@/lib/utils";

export default function CommunityPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Community Section Header */}
      <Heading level={1} className="text-3xl font-bold text-center mb-8">
        Join Our Community
      </Heading>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Section 1: Community Overview */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Why Join Us?</h2>
          <p className="text-lg text-gray-700 mb-4">
            Our community offers a unique opportunity to network, collaborate, and grow with like-minded professionals in the industry.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Whether you&apos;re an entrepreneur, investor, or just someone passionate about the tech industry, you&apos;ll find valuable insights and connections.
          </p>
          <Button className={cn("bg-primary text-white", "hover:bg-primary-dark")}>
            Learn More
          </Button>
        </div>

        {/* Section 2: How It Works */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <p className="text-lg text-gray-700 mb-4">
            Our platform connects individuals from various industries, offering a space for collaboration, idea sharing, and networking.
          </p>
          <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
            <li>Network with top industry leaders</li>
            <li>Collaborate on cutting-edge projects</li>
            <li>Gain industry insights and trends</li>
          </ul>
          <Button className={cn("bg-primary text-white", "hover:bg-primary-dark")}>
            Get Started
          </Button>
        </div>
      </div>

      {/* Section 3: Community Testimonials */}
      <div className="my-16 text-center">
        <Heading level={2} className="text-3xl font-semibold mb-8">
          What Our Members Say
        </Heading>
        <div className="flex flex-wrap justify-center gap-6">
          {/* Testimonial 1 */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md max-w-sm">
            <p className="text-lg text-gray-600 mb-4">
              &quot;Joining this community has been a game-changer for me. I’ve connected with so many amazing individuals and learned so much.&quot;
            </p>
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-gray-500">Startup Founder</p>
          </div>
          
          {/* Testimonial 2 */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md max-w-sm">
            <p className="text-lg text-gray-600 mb-4">
              &quot;The opportunities for collaboration and networking are endless. I highly recommend joining this community.&quot;
            </p>
            <p className="font-semibold">Jane Smith</p>
            <p className="text-sm text-gray-500">Investor</p>
          </div>
        </div>
      </div>
    </section>
  );
}

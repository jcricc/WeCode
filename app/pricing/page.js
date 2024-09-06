'use client';

export default function Pricing() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pricing</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-semibold">Free Plan</h2>
          <p>Access to basic courses and exercises.</p>
          <p>$0/month</p>
        </div>
        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-semibold">Pro Plan</h2>
          <p>Access to all courses, advanced exercises, and personalized feedback.</p>
          <p>$20/month</p>
        </div>
        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-semibold">Premium Plan</h2>
          <p>All features of the Pro Plan plus one-on-one mentoring sessions.</p>
          <p>$50/month</p>
        </div>
      </div>
    </div>
  );
}

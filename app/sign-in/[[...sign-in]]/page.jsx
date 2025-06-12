import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      
      {/* Left panel with background image and branding */}
      <div className="relative w-full md:w-1/2 h-64 md:h-auto">
        <Image
          src="/bg2.jpg"
          alt="Welcome background"
          fill
          className="object-cover"
          priority
        />

        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Responsive branding text */}
        <div className="absolute inset-0 flex items-center justify-center md:items-end md:justify-start md:bottom-14 md:left-8 p-4 text-white drop-shadow-lg max-w-md text-center md:text-left">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-white">
              Welcome to PennyPath 📊
            </h2>
            <p className="text-sm text-gray-100">
              Track smarter. Spend better. Own your money journey.
            </p>
          </div>
        </div>
      </div>

      {/* Right panel with sign-in form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100 dark:bg-gray-900 p-6 md:p-16">
        <div className="w-full max-w-md">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary:
                  'bg-black hover:bg-neutral-800 text-white font-semibold rounded-md',
              },
              variables: {
                colorPrimary: '#000000',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

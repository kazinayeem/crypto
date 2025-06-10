import React from "react";

export function AuthPage() {
  const backgroundGradientStyle = {
    background: `linear-gradient(
      10deg,
      rgba(31, 29, 29, 0.99) 0%,
      rgba(58, 59, 140, 1) 55%,
      rgba(18, 26, 255, 1) 100%
    )`,
  };

  const synthesizeAITextColorClass = "text-gray-300";
  const mainTitleNormalTextColorClass = "text-white";
  const mainTitleHighlightColorClass = "text-yellow-400";
  const grayButtonBgClass = "bg-gray-700";
  const grayButtonTextColorClass = "text-gray-200";
  const grayButtonHoverBgClass = "hover:bg-gray-600";
  const grayButtonBorderClass = "border-gray-600";

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-start p-4 pt-10 overflow-hidden"
      style={backgroundGradientStyle}
    >
      <img
        src="/image1.png"
        alt="Decorative bee illustration"
        className="absolute top-0 left-0 w-40 h-auto opacity-90 z-0
                   md:w-56 lg:w-72 -translate-x-[20%] -translate-y-[20%] rotate-[-9deg]"
      />
      <img
        src="/image2.png"
        alt="Decorative bee illustration"
        className="absolute bottom-0 right-0 w-40 h-auto opacity-90 z-0
                   md:w-56 lg:w-72 translate-x-[20%] translate-y-[20%]"
      />

      <div className="relative z-10 flex flex-col items-center text-center space-y-8 p-4 max-w-md w-full mx-auto">
        <h1
          className={`text-xl md:text-2xl font-bold tracking-wider ${synthesizeAITextColorClass} mt-2`}
        >
          SYNTHESIZEAI
        </h1>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-center text-white">
          <span className="block whitespace-nowrap">
            Your <span className="text-yellow-400">AI Sidekick</span>
          </span>
          <span className="block whitespace-nowrap">
            in the <span className="text-yellow-400">World of Crypto</span>
          </span>
        </h2>

        <div className="flex flex-col space-y-4 w-full max-w-xs">
          <button className="w-full bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-yellow-300 transition-colors duration-200">
            Connect Wallet
          </button>

          <button
            className={`w-full ${grayButtonBgClass} ${grayButtonTextColorClass} font-semibold py-3 px-6 rounded-lg shadow-md border ${grayButtonBorderClass} flex items-center justify-center space-x-2 ${grayButtonHoverBgClass} transition-colors duration-200`}
          >
            <img src="/google-logo.svg" alt="Google Logo" className="w-5 h-5" />
            <span>Login with Google</span>
          </button>

          <button
            className={`w-full ${grayButtonBgClass} ${grayButtonTextColorClass} font-semibold py-3 px-6 rounded-lg shadow-md border ${grayButtonBorderClass} flex items-center justify-center space-x-2 ${grayButtonHoverBgClass} transition-colors duration-200`}
          >
            <img src="/apple-logo.svg" alt="Apple Logo" className="w-5 h-5" />
            <span>Login with Apple</span>
          </button>
        </div>
      </div>
    </div>
  );
}

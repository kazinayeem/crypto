import { loginWithApple, loginWithGoogle } from "@/features/user/userActions";
import type { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export function AuthPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      await dispatch(loginWithGoogle());
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const backgroundGradientStyle = {
    background: `linear-gradient(
      10deg,
      rgba(31, 29, 29, 0.99) 0%,
      rgba(58, 59, 140, 1) 55%,
      rgba(18, 26, 255, 1) 100%
    )`,
  };

  const synthesizeAITextColorClass = "text-gray-300";

  const grayButtonBgClass = "bg-gray-700";
  const grayButtonTextColorClass = "text-gray-200";
  const grayButtonHoverBgClass = "hover:bg-gray-600";
  const grayButtonBorderClass = "border-gray-600";

  return (
    <div
      className="relative min-h-screen flex flex-col p-4 overflow-hidden"
      style={backgroundGradientStyle}
    >
      {/* Background images */}
      <img
        src="/image1.png"
        alt="Decorative bee illustration"
        className="absolute top-0 left-0 w-64 h-auto opacity-90 z-0
             md:w-80 lg:w-96 -translate-x-[0%] -translate-y-[10%]"
      />

      <img
        src="/image2.png"
        alt="Decorative bee illustration"
        className="absolute bottom-0 right-0 w-64 h-auto opacity-90 z-0
             md:w-80 lg:w-96 translate-x-[20%] translate-y-[20%]"
      />

      <div className="relative z-10 flex flex-col flex-1 max-w-md w-full mx-auto">
        {/* Top: SYNTHESIZEAI */}
        <div className="flex-1 flex items-start justify-center pt-10">
          <h1
            className={`text-xl md:text-2xl font-bold tracking-wider ${synthesizeAITextColorClass}`}
          >
            SYNTHESIZEAI
          </h1>
        </div>

        {/* Middle: Headline */}
        <div className="flex-1 flex items-center justify-center text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
            <span className="block whitespace-nowrap">
              Your <span className="text-yellow-400">AI Sidekick</span>
            </span>
            <span className="block whitespace-nowrap">
              in the <span className="text-yellow-400">World of Crypto</span>
            </span>
          </h2>
        </div>

        {/* Bottom: Buttons */}
        <div className="flex-1 flex items-end justify-center pb-10">
          <div className="flex flex-col space-y-4 w-full max-w-xs">
            <button className="w-full bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-yellow-300 transition-colors duration-200">
              Connect Wallet
            </button>

            <button
              onClick={handleGoogleLogin}
              className={`w-full ${grayButtonBgClass} ${grayButtonTextColorClass} font-semibold py-3 px-6 rounded-lg shadow-md border ${grayButtonBorderClass} flex items-center justify-center space-x-2 ${grayButtonHoverBgClass} transition-colors duration-200`}
            >
              <img
                src="/google-logo.svg"
                alt="Google Logo"
                className="w-5 h-5"
              />
              <span>Login with Google</span>
            </button>

            <button
            onClick={loginWithApple}
              className={`w-full ${grayButtonBgClass} ${grayButtonTextColorClass} font-semibold py-3 px-6 rounded-lg shadow-md border ${grayButtonBorderClass} flex items-center justify-center space-x-2 ${grayButtonHoverBgClass} transition-colors duration-200`}
            >
              <img src="/apple-logo.svg" alt="Apple Logo" className="w-5 h-5" />
              <span>Login with Apple</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

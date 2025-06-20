import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import DotGrid from "./components/ui/DotGrid";

const App: React.FC = () => {
  const navigation = useNavigate();
  const handleLogin = () => {
    navigation("/auth", {
      viewTransition: true,
    });
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mainBackgroundGradientStyle = {
    background: `linear-gradient(
      35deg,
      rgba(26, 26, 46, 0.99) 0%,
      rgba(22, 33, 62, 1) 55%,
      rgba(75, 78, 206, 255) 100%,
      rgba(18, 26, 255, 1) 100%
    )`,
  };

  const synthBubbleBackgroundStyle = {
    background: `linear-gradient(
      145deg,
      rgba(26, 26, 46, 0.99) 0%,
      rgba(22, 33, 62, 1) 40%,
      rgba(75, 78, 206, 255) 100%
    )`,
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.5 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 1 },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const checkIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-[#38d39f] inline-block mr-2"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div
      className="min-h-screen text-white font-inter"
      style={mainBackgroundGradientStyle}
    >
      <nav className="flex justify-between items-center px-4 md:px-8 py-4 bg-transparent relative z-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-[#ffd31b]"
        >
          SYNTHESIZEAI
        </motion.div>
        <div className="hidden md:flex space-x-6 text-sm">
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#"
            className="hover:text-[#ffd31b]"
          >
            Home
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#"
            className="hover:text-[#ffd31b]"
          >
            BEE
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#"
            className="hover:text-[#ffd31b]"
          >
            SynthsAndale
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#"
            className="hover:text-[#ffd31b]"
          >
            Pricing
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#"
            className="hover:text-[#ffd31b]"
          >
            More Links
          </motion.a>
        </div>
        <div className="space-x-2 md:space-x-4 flex items-center">
          <motion.button
            onClick={handleLogin}
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1 md:px-4 md:py-2 rounded-lg border border-[#ffd31b] text-[#ffd31b] hover:bg-[#ffd31b] hover:text-white transition-colors duration-300 text-xs md:text-base"
          >
            Connect Wallet
          </motion.button>
          <motion.button
            onClick={handleLogin}
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1 md:px-4 md:py-2 rounded-lg bg-[#ffd31b] text-white hover:bg-[#ccaa00] transition-colors duration-300 text-xs md:text-base"
          >
            Join
          </motion.button>
          <div className="md:hidden ml-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 w-full h-full bg-[#16213e] z-40 flex flex-col items-center justify-center p-8 md:hidden"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-white text-4xl focus:outline-none"
            >
              &times;
            </button>
            <div className="flex flex-col space-y-8 text-xl">
              <a
                href="#"
                className="hover:text-[#ffd31b]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#"
                className="hover:text-[#ffd31b]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                BEE
              </a>
              <a
                href="#"
                className="hover:text-[#ffd31b]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                SynthsAndale
              </a>
              <a
                href="#"
                className="hover:text-[#ffd31b]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#"
                className="hover:text-[#ffd31b]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                More Links
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <header className="relative flex flex-col md:flex-row items-center justify-center pt-8 md:pt-16 pb-8 px-4 md:px-8 overflow-hidden min-h-screen">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
            <span className="text-[#ffd31b]">Meet Bee</span> <br /> Your AI
            Crypto Sidekick
          </h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg mx-auto md:mx-0"
          >
            Bee is the ultimate AI-powered crypto assistant, designed to
            simplify your trading and market analysis. Whether you need price
            tracking, technical insights, trading guidance, real-time data, and
            expert-level support—all at your command.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
            className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg bg-[#ffd31b] text-white text-lg font-semibold hover:bg-[#ccaa00] transition-colors duration-300 shadow-lg"
            >
              Try Bee For Free!
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg border border-white text-white text-lg font-semibold hover:bg-white hover:text-[#1a1a2e] transition-colors duration-300 shadow-lg"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={imageVariants}
          className="md:w-1/2 flex justify-center items-center z-0"
        >
          <img
            src="Bee.png"
            alt="Bee AI Crypto Sidekick"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl rounded-full opacity-90 object-contain"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/500x500/1a1a2e/ffffff?text=Image+Not+Found";
            }}
          />
        </motion.div>
      </header>
      <div
        style={mainBackgroundGradientStyle}
        className="relative w-full overflow-hidden min-h-screen"
      >
        {/* DotGrid as background for the entire page */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <DotGrid
            dotSize={3}
            gap={40}
            baseColor="#5227FF"
            activeColor="#5227FF"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>

        {/* Main content container - sits above the DotGrid */}
        <div className="relative z-10">
          {/* Hero Section */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
            className="relative z-20 py-16 px-4 md:px-8 text-center flex flex-col justify-center items-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
              Revolutionize Your Crypto <br /> Experience with AI
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              SynthesizeAI is an AI-powered platform designed to simplify your
              crypto journey. From vital meme creation to AI assistants that
              automate tasks, we've got everything you need to engage your
              community and streamline operations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-[#ffd31b] text-white text-lg font-semibold hover:bg-[#ccaa00] transition-colors duration-300 shadow-lg"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg border border-white text-white text-lg font-semibold hover:bg-white hover:text-[#0f0e1d] transition-colors duration-300 shadow-lg"
              >
                Learn More
              </motion.button>
            </div>
          </motion.section>

          <div className="max-w-6xl mx-auto bg-[#0d0c1c] rounded-2xl shadow-xl flex flex-col lg:flex-row overflow-hidden min-h-min md:min-h-[500px]">
            <div className="lg:w-1/3 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-[#16213e]">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                Text to Image generator
              </h3>
              <ul className="space-y-3 md:space-y-4 text-gray-300 text-base md:text-lg">
                <li className="cursor-pointer hover:text-[#ffd31b] transition-colors duration-200">
                  Image to Image generator
                </li>
                <li className="cursor-pointer hover:text-[#ffd31b] transition-colors duration-200">
                  Caption generator
                </li>
              </ul>
            </div>

            <div className="lg:w-2/3 p-6 md:p-8 flex flex-col justify-between">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
                Try Prompts
              </h3>
              <div className="flex-grow flex items-center justify-center mb-6 md:mb-8">
                <div className="w-32 h-32 sm:w-48 sm:h-48 bg-[#16213e] rounded-full flex items-center justify-center shadow-inner">
                  <svg
                    width="70"
                    height="70"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#ffd31b]"
                  >
                    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" />
                    <polyline points="2 7 12 12 22 7" />
                    <polyline points="2 17 12 12 22 17" />
                    <polyline points="12 2V12" />
                    <line x1="12" y1="22" x2="12" y2="12" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your prompt here..."
                  className="w-full p-3 pr-12 md:p-4 md:pr-16 rounded-lg bg-[#2c2c4d] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffd31b]"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#ffd31b] p-1 md:p-2 rounded-full hover:bg-[#ccaa00] transition-colors duration-300"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
        <br
          style={{
            marginBottom: "10px",
          }}
        />
        <br
          style={{
            marginBottom: "10px",
          }}
        />
        <br
          style={{
            marginBottom: "10px",
          }}
        />
        <br
          style={{
            marginBottom: "10px",
          }}
        />
        <br
          style={{
            marginBottom: "10px",
          }}
        />
        <br
          style={{
            marginBottom: "10px",
          }}
        />
        <br
          style={{
            marginBottom: "10px",
          }}
        />
      </div>
      {/* <div
        style={mainBackgroundGradientStyle}
        className="relative w-full overflow-hidden"
      >
        <div
          className={cn(
            "absolute inset-0 z-0",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
            "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
          )}
        />
        <div className="pointer-events-none absolute inset-0 z-10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

        <div className="relative z-20">
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
            className="relative z-20 py-16 px-4 md:px-8 text-center flex flex-col justify-center items-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Revolutionize Your Crypto <br /> Experience with AI
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              SynthesizeAI is an AI-powered platform designed to simplify your
              crypto journey. From vital meme creation to AI assistants that
              automate tasks, we've got everything you need to engage your
              community and streamline operations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-[#ffd31b] text-white text-lg font-semibold hover:bg-[#ccaa00] transition-colors duration-300 shadow-lg"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg border border-white text-white text-lg font-semibold hover:bg-white hover:text-[#0f0e1d] transition-colors duration-300 shadow-lg"
              >
                Learn More
              </motion.button>
            </div>
          </motion.section>
        </div>
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="bg-[#1a1a2e] py-16 px-4 md:px-8"
        >
          <div className="max-w-6xl mx-auto bg-[#0d0c1c] rounded-2xl shadow-xl flex flex-col lg:flex-row overflow-hidden min-h-min md:min-h-[500px]">
            <div className="lg:w-1/3 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-[#16213e]">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                Text to Image generator
              </h3>
              <ul className="space-y-3 md:space-y-4 text-gray-300 text-base md:text-lg">
                <li className="cursor-pointer hover:text-[#ffd31b] transition-colors duration-200">
                  Image to Image generator
                </li>
                <li className="cursor-pointer hover:text-[#ffd31b] transition-colors duration-200">
                  Caption generator
                </li>
              </ul>
            </div>

            <div className="lg:w-2/3 p-6 md:p-8 flex flex-col justify-between">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
                Try Prompts
              </h3>
              <div className="flex-grow flex items-center justify-center mb-6 md:mb-8">
                <div className="w-32 h-32 sm:w-48 sm:h-48 bg-[#16213e] rounded-full flex items-center justify-center shadow-inner">
                  <svg
                    width="70"
                    height="70"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#ffd31b]"
                  >
                    <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" />
                    <polyline points="2 7 12 12 22 7" />
                    <polyline points="2 17 12 12 22 17" />
                    <polyline points="12 2V12" />
                    <line x1="12" y1="22" x2="12" y2="12" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your prompt here..."
                  className="w-full p-3 pr-12 md:p-4 md:pr-16 rounded-lg bg-[#2c2c4d] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffd31b]"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#ffd31b] p-1 md:p-2 rounded-full hover:bg-[#ccaa00] transition-colors duration-300"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.section>
      </div> */}

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="bg-[#0f0e1d] py-16 px-4 md:px-8 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          How SynthesizeAI's Meme <br /> Automation Works
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Effortlessly boost your token's visibility with SynthesizeAI. Here's
          how it works:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            variants={cardVariants}
            className="bg-[#16213e] p-8 rounded-2xl text-left flex flex-col items-start"
          >
            <div className="w-full h-48 bg-gray-700 rounded-lg mb-6 overflow-hidden">
              <img
                src="Screenshot 2025-06-16 181731.jpg"
                alt="AI Magic Graph"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4">AI Magic</h3>
            <p className="text-gray-300 text-lg">
              Our AI creates memes and captions perfectly tailored to your
              token, ensuring they resonate with your community.
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="bg-[#16213e] p-8 rounded-2xl text-left flex flex-col items-start"
          >
            <div className="w-full h-48 bg-gray-700 rounded-lg mb-6 overflow-hidden">
              <img
                src="Screenshot 2025-06-16 180425.jpg"
                alt="Sign Up"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4">Sign Up</h3>
            <p className="text-gray-300 text-lg">
              Provide your token's details, including name, narrative, and
              Twitter API keys to get started.
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="bg-[#16213e] p-8 rounded-2xl text-left flex flex-col items-start"
          >
            <div className="w-full h-48 bg-gray-700 rounded-lg mb-6 overflow-hidden">
              <img
                src="Screenshot 2025-06-16 180425.jpg"
                alt="Autopilot"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4">Autopilot</h3>
            <p className="text-gray-300 text-lg">
              Sit back while SynthesizeAI automatically posts your memes on X
              (formerly Twitter), based on your selected schedule.
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="bg-[#16213e] p-8 rounded-2xl text-left flex flex-col items-start"
          >
            <div className="w-full h-48 bg-gray-700 rounded-lg mb-6 overflow-hidden">
              <img
                src="Screenshot 2025-06-16 180425.jpg"
                alt="Manual Mode"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4">Manual Mode</h3>
            <p className="text-gray-300 text-lg">
              Prefer more control? Generate and post memes manually, allowing
              you to add your personal touch.
            </p>
          </motion.div>
        </div>
        <div className="flex justify-center space-x-4 mt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg bg-[#ffd31b] text-white text-lg font-semibold hover:bg-[#ccaa00] transition-colors duration-300 shadow-lg"
          >
            Give it a try!
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg border border-white text-white text-lg font-semibold hover:bg-white hover:text-[#0f0e1d] transition-colors duration-300 shadow-lg"
          >
            Learn More
          </motion.button>
        </div>
      </motion.section>

      <section
        style={synthBubbleBackgroundStyle}
        className="relative py-20 px-4 md:px-8 text-center overflow-hidden flex flex-col justify-center items-center min-h-[600px]"
      >
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 0.6,
              scale: 1,
              x:
                Math.random() * (window.innerWidth || 1000) -
                (window.innerWidth || 1000) / 2,
              y: Math.random() * 600 - 300, // Fixed height for vertical spread
            }}
            transition={{
              duration: 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="absolute bg-pink-500 rounded-full"
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: `blur(${Math.random() * 3}px)`,
            }}
          />
        ))}
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#ffd31b] leading-tight">
            SynthBubble <br /> Dynamic CNT Analysis
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            SynthBubble is an interactive bubble map that brings Cardano native
            tokens (CNTs) to life. Discover real-time visualizations and
            comprehensive analysis of CNTs to enhance your insights.
          </p>
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg bg-[#ffd31b] text-white text-lg font-semibold hover:bg-[#ccaa00] transition-colors duration-300 shadow-lg"
            >
              Explore SynthBubble
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg border border-white text-white text-lg font-semibold hover:bg-white hover:text-[#0f0e1d] transition-colors duration-300 shadow-lg"
            >
              Sign up
            </motion.button>
          </div>
        </div>
      </section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="py-16 px-4 md:px-8 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Empowering the Future of Decentralization
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Reliable blockchain solutions for businesses, developers, and
          visionaries — secure, scalable, and ready for the next generation of
          innovation.
        </p>

        <div className="flex justify-center mb-10">
          <div className="bg-[#16213e] p-1 rounded-full flex space-x-2">
            <button className="px-6 py-2 rounded-full bg-[#ffd31b] text-white font-semibold">
              Monthly
            </button>
            <button className="px-6 py-2 rounded-full text-gray-300 hover:text-white">
              Annual
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <motion.div
            variants={cardVariants}
            className="bg-[#0f0e1d] p-8 rounded-2xl text-left flex flex-col justify-between border border-[#16213e] relative"
          >
            <h3 className="text-2xl font-bold mb-4">Freemium Pack</h3>
            <p className="text-gray-300 mb-6">
              A great starting point for newcomers exploring our platform with
              basic features.
            </p>
            <p className="text-5xl font-bold mb-6">
              $0<span className="text-lg font-normal">/month</span>
            </p>
            <ul className="text-gray-300 space-y-2 mb-8">
              <li>{checkIcon}3 Generations/day</li>
              <li>{checkIcon}Limited Template Library</li>
              <li>{checkIcon}Basic Token Preview</li>
            </ul>
            <button className="w-full px-6 py-3 rounded-lg bg-[#ffd31b] text-white text-lg font-semibold hover:bg-[#ccaa00] transition-colors duration-300 shadow-lg">
              Current Plan
            </button>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="bg-[#16213e] p-8 rounded-2xl text-left flex flex-col justify-between border-2 border-[#ffd31b] relative shadow-lg"
          >
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ffd31b] text-white px-4 py-1 rounded-full text-sm font-semibold">
              MOST POPULAR
            </span>
            <h3 className="text-2xl font-bold mb-4">Starter Pack</h3>
            <p className="text-gray-300 mb-6">
              Ideal for individuals seeking more generations and enhanced
              functionality.
            </p>
            <p className="text-5xl font-bold mb-6">
              $19<span className="text-lg font-normal">/month</span>
            </p>
            <ul className="text-gray-300 space-y-2 mb-8">
              <li>{checkIcon}15 Generations/day</li>
              <li>{checkIcon}Access to Community Forum</li>
              <li>{checkIcon}Access to Standard Template Library</li>
              <li>{checkIcon}Basic Token Preview</li>
              <li>{checkIcon}Priority Email Support</li>
            </ul>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full px-6 py-3 rounded-lg bg-[#ffd31b] text-white text-lg font-semibold hover:bg-[#ccaa00] transition-colors duration-300 shadow-lg flex items-center justify-center"
            >
              Buy Now <span className="ml-2">→</span>
            </motion.button>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="bg-[#0f0e1d] p-8 rounded-2xl text-left flex flex-col justify-between border border-[#16213e] relative"
          >
            <h3 className="text-2xl font-bold mb-4">Pro Pack</h3>
            <p className="text-gray-300 mb-6">
              Unlock unlimited generations and gain early access to new
              features.
            </p>
            <p className="text-5xl font-bold mb-6">
              Custom<span className="text-lg font-normal">/month</span>
            </p>
            <ul className="text-gray-300 space-y-2 mb-8">
              <li>{checkIcon}Unlimited Generations</li>
              <li>{checkIcon}Everything in Pro Plan</li>
              <li>{checkIcon}Add up to 6 Tokens</li>
              <li>{checkIcon}Early Access to New Features</li>
              <li>{checkIcon}Built-in Real-World Meme Templates</li>
            </ul>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full px-6 py-3 rounded-lg bg-[#ffd31b] text-white text-lg font-semibold hover:bg-[#ccaa00] transition-colors duration-300 shadow-lg flex items-center justify-center"
            >
              Contact us <span className="ml-2">→</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="bg-[#0f0e1d] py-16 px-4 md:px-8 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Supported by Industry Leaders
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          SynthesizeAI is backed by leading companies, including Microsoft for
          Startups.
        </p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center items-center mb-10"
        >
          <img
            src="Screenshot 2025-06-16 181755.jpg"
            alt="Microsoft for Startups Logo"
            className="h-24 object-contain"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/200x80/0f0e1d/ffffff?text=Microsoft+Logo";
            }}
          />
        </motion.div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="bg-[#1a1a2e] py-16 px-4 md:px-8 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Join the Web3 Revolution
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Get our latest features and upcoming updates by subscribing to our
          newsletter.
        </p>
        <div className="flex flex-col sm:flex-row justify-center max-w-md mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="email"
            placeholder="Your Email Here"
            className="flex-grow p-3 rounded-lg bg-[#2c2c4d] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffd31b]"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-lg bg-[#ffd31b] text-white text-lg font-semibold hover:bg-[#ccaa00] transition-colors duration-300 shadow-lg"
          >
            Subscribe
          </motion.button>
        </div>
        <p className="text-sm text-gray-400 mt-4">
          By clicking Get Started, you agree to our Terms and Conditions.
        </p>
      </motion.section>

      <footer className="bg-[#16213e] py-12 px-4 md:px-8 text-center text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 text-left">
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">SYNTHESIZEAI</h4>
            <p>&copy; 2023 SynthesizeAI. All rights reserved.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Our Services
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-lg">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog Posts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Support Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Tutorial
                </a>
              </li>
            </ul>
          </div>
          <div className="md:col-span-3 lg:col-span-1 text-center md:text-right">
            <h4 className="text-white font-bold mb-4 text-lg">Follow Us</h4>
            <div className="flex justify-center md:justify-end space-x-4 mb-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-2xl"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-2xl"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-2xl"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-2xl"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <ul className="flex flex-wrap justify-center md:justify-end space-x-4 text-xs mt-4">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cookies Settings
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

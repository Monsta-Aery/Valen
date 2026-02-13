'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaLock, FaPlane, FaArrowRight, FaLaughSquint, FaCamera, FaUserSecret } from 'react-icons/fa';
import confetti from 'canvas-confetti';

export default function ValentineGame() {
  const [stage, setStage] = useState('ENTRY');
  const [yesStep, setYesStep] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [angryEmojis, setAngryEmojis] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [showBox, setShowBox] = useState(true);
  const [flash, setFlash] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // New state to toggle between the placeholder icon and the static selfie
  const [showStaticSelfie, setShowStaticSelfie] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [phoneInput, setPhoneInput] = useState('');
  const [birthInput, setBirthInput] = useState('');
  const [honeymoonInput, setHoneymoonInput] = useState('');
  const [childrenInput, setChildrenInput] = useState('');

  const [fartInput, setFartInput] = useState('');
  const [snoreInput, setSnoreInput] = useState('');
  const [faultInput, setFaultInput] = useState('');
  const [hungerInput, setHungerInput] = useState('');
  const [loveLevel, setLoveLevel] = useState('100');

  const [error, setError] = useState('');

  const SECRET_PHONE = "17551641";
  const SECRET_BIRTH = "0207";

  useEffect(() => {
    if (stage === 'CAMERA') {
      startCamera();
    }
  }, [stage]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error: ", err);
      setStage('PROPOSAL');
    }
  };

  const takePhoto = () => {
    setFlash(true);
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context?.drawImage(videoRef.current, 0, 0);
      setCapturedImage(canvasRef.current.toDataURL('image/png'));
    }
    setTimeout(() => setFlash(false), 150);
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    setShowCameraModal(true);
  };

  const moveNoButton = () => {
    const randomX = Math.random() * 260 - 130;
    const randomY = Math.random() * 260 - 130;
    setNoButtonPos({ x: randomX, y: randomY });
    const newEmoji = { id: Date.now(), x: noButtonPos.x, y: noButtonPos.y };
    setAngryEmojis(prev => [...prev, newEmoji]);
    setTimeout(() => setAngryEmojis(prev => prev.filter(e => e.id !== newEmoji.id)), 3000);
  };

  const validateFuture = () => {
    if (honeymoonInput.trim() && childrenInput.trim()) {
      setStage('FUNNY_QUIZ');
      setError("");
    } else {
      setError("Don't skip our future! 🥰");
    }
  };

  const handleUnlock = () => {
    if (phoneInput === SECRET_PHONE && birthInput === SECRET_BIRTH) {
      setStage('REVEAL');
      // Initial popper
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    } else {
      setError("Incorrect ID! Are you really my Valentine? ❤️");
      setTimeout(() => setError(''), 3000);
    }
  };

  const openBox = () => {
    setIsBoxOpen(true);

    // Flourish with love icons (hearts) and poppers
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        shapes: ['circle', 'square'], // Standard poppers
        colors: ['#ff0000', '#ff69b4', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        shapes: ['circle', 'square'],
        colors: ['#ff0000', '#ff69b4', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Heart-shaped flourish
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.4 },
      shapes: ['circle'], // Note: basic canvas-confetti uses circles, but we simulate 'love' colors
      colors: ['#ec4899', '#f43f5e', '#fb7185'],
    });

    setTimeout(() => setShowBox(false), 500);
  };

  return (
    <section className="min-h-screen w-full bg-[#0e0f0f] flex flex-col items-center justify-center overflow-hidden py-10 px-4 relative">
      <canvas ref={canvasRef} className="hidden" />

      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[100]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">

        {/* 0. ENTRY STAGE */}
        {stage === 'ENTRY' && (
          <motion.div
            key="entry-stage"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="z-50 flex flex-col items-center space-y-4"
          >
            <button
              onClick={() => setStage('CAMERA')}
              className="group flex flex-col items-center space-y-4 bg-white/5 p-10 rounded-3xl border border-white/10 hover:bg-white/10 transition-all shadow-2xl"
            >
              <div className="bg-pink-600 p-6 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)] group-hover:scale-110 transition-transform">
                <FaCamera size={40} className="text-white" />
              </div>
              <p className="text-white font-black text-xl tracking-widest uppercase text-center">
                let me have your selfie <br />
                <span className="text-sm opacity-50">click me i wanna snap your face</span>
              </p>
            </button>
          </motion.div>
        )}

        {/* 1. CAMERA STAGE */}
        {stage === 'CAMERA' && (
          <motion.div
            key="camera-stage"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="z-50 flex flex-col items-center space-y-6 w-full max-w-md"
          >
            <div className="relative w-full aspect-[3/4] bg-black rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <div className="absolute inset-0 border-[20px] border-black/10 pointer-events-none" />
            </div>

            <p className="text-white font-medium text-center italic opacity-80">
              Smile for the security scan! 📸
            </p>

            <button
              onClick={takePhoto}
              className="bg-white p-6 rounded-full shadow-xl hover:scale-110 active:scale-90 transition-transform"
            >
              <FaCamera size={30} className="text-black" />
            </button>

            <AnimatePresence>
              {showCameraModal && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/60 backdrop-blur-md"
                >
                  <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-pink-500/30 text-center max-w-xs shadow-2xl">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaHeart className="text-white" size={30} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Photo Captured!</h3>
                    <p className="text-gray-400 text-sm mb-6">
                      Your identity is verified.
                    </p>
                    <button
                      onClick={() => setStage('PROPOSAL')}
                      className="w-full bg-pink-600 py-3 rounded-lg text-white font-bold hover:bg-pink-500 transition-colors"
                    >
                      CONTINUE
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* 2. PROPOSAL */}
        {stage === 'PROPOSAL' && (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="z-50 bg-white/5 backdrop-blur-2xl p-8 rounded-2xl border border-white/10 text-center text-white w-full max-w-md shadow-2xl relative"
          >
            <div className="space-y-8">
              <AnimatePresence>
                {angryEmojis.map(emoji => (
                  <motion.div
                    key={emoji.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1.2, y: -20 }}
                    exit={{ opacity: 0 }}
                    className="absolute text-4xl pointer-events-none select-none"
                    style={{ left: `calc(50% + ${emoji.x}px)`, top: `50%` }}
                  >😠</motion.div>
                ))}
              </AnimatePresence>
              <FaHeart className="mx-auto text-pink-500 animate-pulse" size={60} />
              <h2 className="text-3xl font-bold leading-tight">
                {yesStep === 0 && "Will you be my Valentine?"}
                {yesStep === 1 && "Wait, really? You mean it? ❤️"}
                {yesStep === 2 && "Final answer? No take-backs! 😍"}
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => yesStep < 2 ? setYesStep(yesStep + 1) : setStage('OUR_FUTURE')}
                  className="bg-pink-600 hover:bg-pink-500 transition-all px-12 py-3 rounded-xl font-bold text-xl shadow-lg w-full"
                >YES</button>
                <motion.button
                  animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  className="bg-gray-700/50 px-8 py-3 rounded-xl font-bold text-gray-300 w-full sm:w-auto"
                >No</motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. OUR FUTURE */}
        {stage === 'OUR_FUTURE' && (
          <motion.div
            key="future"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="z-50 bg-white/5 backdrop-blur-2xl p-8 rounded-2xl border border-white/10 text-center text-white w-full max-w-md shadow-2xl"
          >
            <div className="space-y-5">
              <FaPlane className="mx-auto text-pink-500" size={40} />
              <h2 className="text-2xl font-bold">Planning Our Future</h2>
              <div className="bg-white/5 p-4 rounded-xl space-y-4 border border-white/10">
                <input
                  type="text"
                  placeholder="Honeymoon Country?"
                  className="w-full bg-black/20 p-3 rounded-lg outline-none border border-white/10 focus:border-pink-500 text-white"
                  onChange={(e) => setHoneymoonInput(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="How many children?"
                  className="w-full bg-black/20 p-3 rounded-lg outline-none border border-white/10 focus:border-pink-500 text-white"
                  onChange={(e) => setChildrenInput(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
              <button
                onClick={validateFuture}
                className="w-full bg-pink-600 py-4 rounded-xl font-bold flex items-center justify-center gap-2"
              >
                NEXT STEP <FaArrowRight />
              </button>
            </div>
          </motion.div>
        )}

        {/* 4. FUNNY QUIZ */}
        {stage === 'FUNNY_QUIZ' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            className="z-50 bg-white/5 backdrop-blur-2xl p-6 sm:p-8 rounded-xl border border-white/10 text-white w-[95%] max-w-md shadow-2xl mx-auto"
          >
            <div className="space-y-6">
              <div className="text-center">
                <FaLaughSquint className="mx-auto text-yellow-400 mb-2" size={40} />
                <h2 className="text-xl sm:text-2xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  The "Highly Scientific" Personality Scan
                </h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-[10px] text-pink-400 font-bold uppercase block mb-1">1. Daily Gas Production? 💨</label>
                  <select
                    className="w-full bg-black/40 p-3 rounded-lg border border-white/10 text-sm outline-none focus:border-pink-500 appearance-none text-white"
                    onChange={(e) => setFartInput(e.target.value)}
                    value={fartInput}
                  >
                    <option value="" disabled className="bg-[#1a1a1a]">Select an option</option>
                    <option value="0" className="bg-[#1a1a1a]">0 (I am a literal flower)</option>
                    <option value="1-5" className="bg-[#1a1a1a]">1-5 (Normal human)</option>
                    <option value="10+" className="bg-[#1a1a1a]">10+ (I am a gas station)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-pink-400 font-bold uppercase block mb-1">2. Do you snore like a broken tractor? 🚜</label>
                  <select
                    className="w-full bg-black/40 p-3 rounded-lg border border-white/10 text-sm outline-none focus:border-pink-500 appearance-none text-white"
                    onChange={(e) => setSnoreInput(e.target.value)}
                    value={snoreInput}
                  >
                    <option value="" disabled className="bg-[#1a1a1a]">Select an option</option>
                    <option value="Never" className="bg-[#1a1a1a]">Never (I sleep like an angel)</option>
                    <option value="Only when tired" className="bg-[#1a1a1a]">Only when I'm tired</option>
                    <option value="Yes" className="bg-[#1a1a1a]">Yes, I wake the neighbors</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-pink-400 font-bold uppercase block mb-1">3. If we argue, whose fault is it? 😤</label>
                  <select
                    className="w-full bg-black/40 p-3 rounded-lg border border-white/10 text-sm outline-none focus:border-pink-500 appearance-none text-white"
                    onChange={(e) => setFaultInput(e.target.value)}
                    value={faultInput}
                  >
                    <option value="" disabled className="bg-[#1a1a1a]">Select an option</option>
                    <option value="Yours" className="bg-[#1a1a1a]">Yours (Obviously)</option>
                    <option value="Still yours" className="bg-[#1a1a1a]">Still yours (But I'll pretend it's mine)</option>
                    <option value="Cat" className="bg-[#1a1a1a]">The cat's fault</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-pink-400 font-bold uppercase block mb-1">4. Hunger Level if dinner is 5 mins late? 🦖</label>
                  <select
                    className="w-full bg-black/40 p-3 rounded-lg border border-white/10 text-sm outline-none focus:border-pink-500 appearance-none text-white"
                    onChange={(e) => setHungerInput(e.target.value)}
                    value={hungerInput}
                  >
                    <option value="" disabled className="bg-[#1a1a1a]">Select an option</option>
                    <option value="Monk" className="bg-[#1a1a1a]">Patient Monk</option>
                    <option value="Potato" className="bg-[#1a1a1a]">Grumpy Potato</option>
                    <option value="Godzilla" className="bg-[#1a1a1a]">Full Godzilla Mode</option>
                  </select>
                </div>

                <div className="pt-2">
                  <label className="text-[10px] text-pink-400 font-bold uppercase block mb-1 text-center">5. Love Level for Me? ❤️</label>
                  <input
                    type="range" min="100" max="1001" step="1"
                    className="w-full accent-pink-500 cursor-pointer"
                    onChange={(e) => setLoveLevel(e.target.value)}
                  />
                  <div className="flex justify-center mt-2">
                    <AnimatePresence mode="wait">
                      {parseInt(loveLevel) > 1000 ? (
                        <motion.div key="infinity" initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-pink-600 px-4 py-1 rounded-lg text-[10px] font-black shadow-lg flex items-center gap-2 text-white">
                          INFINITY & BEYOND! ♾️
                        </motion.div>
                      ) : (
                        <motion.div key="number" className="text-lg font-mono text-pink-300">
                          {loveLevel}%
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStage('RESULTS')}
                disabled={!fartInput || !snoreInput || !faultInput || !hungerInput}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-4 rounded-xl font-black uppercase text-sm tracking-tight hover:brightness-110 active:scale-95 transition-all shadow-xl mt-2 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed"
              >
                {!fartInput || !snoreInput || !faultInput || !hungerInput ? "Answer All Questions!" : "Analyze This Weirdo 🕵️‍♀️"}
              </button>
            </div>
          </motion.div>
        )}

        {/* 5. RESULT REVEAL */}
        {stage === 'RESULTS' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-50 bg-[#1a1a1a] p-8 rounded-2xl border-4 border-pink-500 text-white w-full max-w-md shadow-[0_0_50px_rgba(236,72,153,0.4)] text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none opacity-20 flex justify-around items-center">
              <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 2 }}>💨</motion.div>
              <motion.div animate={{ y: [0, -30, 0] }} transition={{ repeat: Infinity, duration: 3, delay: 1 }}>❤️</motion.div>
              <motion.div animate={{ y: [0, -25, 0] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}>🍕</motion.div>
            </div>

            <div className="relative z-10">
              <div className="border-b-2 border-pink-500 pb-2 mb-4">
                <h2 className="text-2xl font-black uppercase tracking-widest text-pink-500">The Love Report</h2>
                <p className="text-[12px] font-mono text-gray-400">Date: Feb 14, 2026</p>
              </div>

              <div className="text-left bg-white/5 p-4 rounded-xl font-mono text-[13px] space-y-4 mb-6">
                <div className="space-y-1">
                  <p><span className="text-pink-400">THE BOSS:</span> Doros (Snack Queen)</p>
                  <p><span className="text-pink-400">THE TRIP:</span> {honeymoonInput}</p>
                  <p><span className="text-pink-400">THE CREW:</span> {childrenInput} Tiny Humans</p>
                </div>
                <div className="h-[1px] bg-white/20 w-full" />
                <div className="space-y-3 italic text-gray-200">
                  <p>
                    <span className="text-yellow-400 not-italic font-bold">[!] THE GAS: </span>
                    {fartInput === '0' ? "You say you're a flower, but we know that smell is a secret defeat! 🤥" : `With ${fartInput} toots a day, you're a gas machine! 💨`}
                  </p>
                  <p>
                    <span className="text-yellow-400 not-italic font-bold">[!] THE NOISE: </span>
                    {snoreInput === 'Never' ? "You sleep like a mouse... it's honestly creepy! 🐭" : "You snore like a bear who is late for a flight! ✈️"}
                  </p>
                </div>
                <div className="mt-4 p-3 bg-pink-500/20 rounded-lg border border-pink-500/50 text-center">
                  <p className="text-[10px] uppercase font-bold text-pink-300">Final Verdict</p>
                  <p className="text-xl font-black">{parseInt(loveLevel) > 1000 ? "TOO MUCH TO MEASURE! 🔥" : `${loveLevel}% Pure Love`}</p>
                </div>
              </div>

              <button
                onClick={() => setStage('PRE_SECURITY')}
                className="w-full bg-pink-600 hover:bg-pink-400 text-white py-4 rounded-xl font-black uppercase transition-all shadow-lg active:scale-95"
              >
                I Accept My Fate & My Mate
              </button>
            </div>
          </motion.div>
        )}

        {/* UPDATED STAGE: PRE-SECURITY */}
        {stage === 'PRE_SECURITY' && (
          <motion.div
            key="pre-security"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-50 bg-[#1a1a1a] p-8 rounded-2xl border border-white/10 text-center text-white w-full max-w-md shadow-2xl"
          >
            <h2 className="text-2xl font-black mb-6 uppercase">Identity Verified?</h2>

            <div className="relative w-full aspect-square bg-gray-800 flex flex-col items-center justify-center shadow-2xl rounded-sm border-b-[40px] border-white mb-8 rotate-3 overflow-hidden">
              {!showStaticSelfie ? (
                <div className="flex flex-col items-center justify-center text-gray-500 space-y-4">
                  <FaUserSecret size={80} className="opacity-20" />
                  <div className="flex items-center gap-2">
                    <FaLock size={12} />
                    <p className="text-[10px] font-mono tracking-widest uppercase">Encryption Active</p>
                  </div>
                </div>
              ) : (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src="/Valen/images/selfie.jfif"
                  className="w-full h-full object-cover"
                  alt="Static Selfie"
                />
              )}
              <p className="absolute bottom-[-30px] left-0 right-0 text-black font-handwriting text-center text-sm italic">
                {showStaticSelfie ? "Is this you? ❤️" : "Verification Required"}
              </p>
            </div>

            {!showStaticSelfie ? (
              <button
                onClick={() => setShowStaticSelfie(true)}
                className="group w-full bg-white text-pink-600 py-4 rounded-xl font-black flex items-center justify-center gap-3 hover:bg-pink-50 transition-all"
              >
                <FaHeart className="group-hover:scale-125 transition-transform" />
                CLICK ME TO SEE YOUR SELFIE
              </button>
            ) : (
              <button
                onClick={() => setStage('SECURITY')}
                className="w-full bg-pink-600 text-white py-4 rounded-xl font-black flex items-center justify-center gap-3 hover:bg-pink-500 transition-all"
              >
                NEXT <FaArrowRight />
              </button>
            )}
          </motion.div>
        )}

        {/* 6. SECURITY CHECK */}
        {stage === 'SECURITY' && (
          <motion.div
            key="security"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-50 bg-white/5 backdrop-blur-2xl p-8 rounded-2xl border border-white/10 text-center text-white w-full max-w-md shadow-2xl"
          >
            <FaLock className="mx-auto text-yellow-500 mb-4" size={40} />
            <h2 className="text-2xl font-bold mb-2">Final Verification</h2>
            <p className="text-gray-400 text-sm mb-6">Enter credentials to view memories</p>
            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Birth Date (MMDD)"
                className="w-full bg-black/20 p-4 rounded-lg text-center border border-white/10 focus:border-pink-500 transition-all outline-none text-white"
                onChange={(e) => setBirthInput(e.target.value)}
              />
              <input
                type="text"
                placeholder="His Phone Number"
                className="w-full bg-black/20 p-4 rounded-lg text-center border border-white/10 focus:border-pink-500 transition-all outline-none text-white"
                onChange={(e) => setPhoneInput(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
            <button
              onClick={handleUnlock}
              className="w-full bg-pink-600 py-4 rounded-lg font-bold shadow-lg hover:bg-pink-500 transition-colors"
            >
              VIEW SURPRISE
            </button>
          </motion.div>
        )}

        {/* 7. MEMORIES REVEAL */}
        {stage === 'REVEAL' && (
          <div className="w-full flex flex-col items-center">
            <AnimatePresence>
              {showBox && (
                <motion.div
                  exit={{ opacity: 0, scale: 2, filter: 'blur(20px)' }}
                  className="relative w-[240px] h-[240px] mb-10 cursor-pointer"
                  onClick={openBox}
                >
                  <div className={`present ${isBoxOpen ? 'open' : ''}`}>
                    <div className="rotate-container">
                      <div className="bottom"></div><div className="front"></div>
                      <div className="left"></div><div className="back"></div><div className="right"></div>
                      <div className="lid">
                        <div className="lid-top"></div><div className="lid-front"></div>
                        <div className="lid-left"></div><div className="lid-back"></div><div className="lid-right"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!showBox && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center space-y-12 pb-20">
                <div className="text-center space-y-4">
                  <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl">
                    Happy valentine's day, <span className="text-pink-500">Doros❤️</span>
                  </h1>
                  <p className="text-pink-200 text-lg md:text-xl italic px-4">"A favorite book is something most people claim to find,
                    But yours is the only story I ever keep in mind.
                    Through every page and chapter, the love we share is true,
                    I can’t wait for the next one, written just with you.
                    Happy Valentine’s Day!."</p>
                </div>

                {/* Grid forced to 3-over-2 on mobile using a custom grid layout */}
                <div className="grid grid-cols-6 gap-4 max-w-5xl px-4 justify-items-center">
                  {['img1', 'img2', 'img3', 'img4', 'img5'].map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, rotate: -20 }}
                      animate={{ opacity: 1, scale: 1, rotate: i % 2 === 0 ? 5 : -5 }}
                      transition={{ delay: i * 0.2, type: 'spring' }}
                      whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}
                      className={`
                        bg-white p-2 md:p-3 shadow-2xl rounded-sm border-b-[15px] md:border-b-[20px] border-white
                        ${i < 3 ? 'col-span-2' : 'col-span-3'} 
                        w-full max-w-[120px] md:max-w-[200px] aspect-[3/4]
                      `}
                    >
                      <img
                        src={`/Valen/images/${img}.jpeg`}
                        className="w-full h-full object-cover"
                        alt="Memory"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

import { BookOpen, CheckCircle, Languages, Lightbulb, RefreshCw, Sparkles, MessageSquare, BookMarked, MapPin, Database, Zap, Brain } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Landing() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    setIsVisible(true)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-blue-50 overflow-hidden relative">
      {/* Floating particles background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-[10%] w-2 h-2 bg-emerald-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-40 left-[20%] w-3 h-3 bg-blue-400 rounded-full animate-float opacity-50" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-60 left-[15%] w-2 h-2 bg-purple-400 rounded-full animate-float opacity-40" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-32 right-[15%] w-3 h-3 bg-pink-400 rounded-full animate-float opacity-50" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-52 right-[25%] w-2 h-2 bg-orange-400 rounded-full animate-float opacity-60" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-40 left-[30%] w-2 h-2 bg-teal-400 rounded-full animate-float opacity-50" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute bottom-60 right-[20%] w-3 h-3 bg-cyan-400 rounded-full animate-float opacity-40" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-[30%] left-[5%] w-2 h-2 bg-yellow-400 rounded-full animate-float opacity-50" style={{animationDelay: '0.8s'}}></div>
        <div className="absolute top-[50%] right-[10%] w-2 h-2 bg-green-400 rounded-full animate-float opacity-60" style={{animationDelay: '1.8s'}}></div>
        <div className="absolute bottom-[30%] left-[40%] w-3 h-3 bg-indigo-400 rounded-full animate-float opacity-40" style={{animationDelay: '2.2s'}}></div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative z-10">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className={`max-w-4xl mx-auto space-y-6 relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4 animate-bounce-slow animate-pulse-glow">
            🇲🇬 Faharanitan-tsaina Artifisialy ho an'ny Malagasy
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-balance bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
            Voambolan-AI
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 font-medium text-balance">
            Mpanoratra Manan-tsaina Voalohany ho an'ny Teny Malagasy
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed text-pretty">
            <span className="font-semibold text-emerald-600">Mamaha ny olana</span> amin'ny fiteny "Low Resource" : 
            Tsy misy Big Data? Tsy misy GPT? Tsy maninona! Mampiasa fomba marani-tsaina mitambatra (symbolique, 
            algorithmique, data-driven) mba hanampiana ny mpanoratra Malagasy amin'ny asa andavan'andro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button onClick={() => navigate("/login")} className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 hover:shadow-2xl animate-pulse-glow hover-wiggle">
              Andramo Izao 🚀
            </button>
            <button onClick={() => window.open("https://www.youtube.com/watch?v=-72pShkDoLQ", "_blank")} className="px-8 py-4 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-white/50 backdrop-blur font-semibold rounded-xl transition-all transform hover:scale-105 hover:shadow-xl hover-wiggle">
              Jereo ny Demo 🎬
            </button>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-6 pt-12 max-w-2xl mx-auto">
            <div className="bg-white/70 backdrop-blur rounded-xl p-4 shadow-lg transform hover:scale-105 transition-all animate-fade-in-up hover-wiggle">
              <p className="text-3xl font-bold text-emerald-600 animate-scale-pulse">6</p>
              <p className="text-sm text-gray-600">Fonctionnalités IA</p>
            </div>
            <div className="bg-white/70 backdrop-blur rounded-xl p-4 shadow-lg transform hover:scale-105 transition-all animate-fade-in-up hover-wiggle" style={{animationDelay: '0.2s'}}>
              <p className="text-3xl font-bold text-blue-600 animate-scale-pulse" style={{animationDelay: '0.3s'}}>0€</p>
              <p className="text-sm text-gray-600">Tsy mila API GPT</p>
            </div>
            <div className="bg-white/70 backdrop-blur rounded-xl p-4 shadow-lg transform hover:scale-105 transition-all animate-fade-in-up hover-wiggle" style={{animationDelay: '0.4s'}}>
              <p className="text-3xl font-bold text-purple-600 animate-scale-pulse" style={{animationDelay: '0.6s'}}>100%</p>
              <p className="text-sm text-gray-600">Malagasy natoka</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="container mx-auto px-4 py-16 relative">
        {/* Decorative animated circles */}
        <div className="absolute top-10 right-10 w-32 h-32 border-4 border-orange-300 rounded-full opacity-20 animate-rotate-slow"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 border-4 border-red-300 rounded-full opacity-20 animate-rotate-slow" style={{animationDirection: 'reverse'}}></div>
        
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 border-l-4 border-orange-500 rounded-xl p-8 md:p-12 shadow-xl transform hover:scale-[1.02] transition-all">
            <div className="flex items-start gap-4">
              <div className="text-4xl">⚠️</div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">Ny Olana Goavana</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>Word sy Google Docs dia optimisé ho an'ny Anglisy sy Frantsay</strong> - manana Big Data miliara 
                  tarehimarika izy ireo. Ny <strong className="text-orange-600">Teny Malagasy</strong> kosa dia 
                  <span className="bg-orange-200 px-2 py-1 rounded font-semibold">"Low Resource Language"</span> - 
                  vitsy loharano nomerika, tsy misy corpus lehibe, tsy misy GPT Malagasy natoka!
                </p>
                <div className="flex items-center gap-3 text-orange-700 font-semibold animate-bounce-slow">
                  <Zap className="w-5 h-5 animate-scale-pulse" />
                  <span className="animate-glow">Voambolan-AI no mameno io banga teknolojika io!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            ⚡ Ireo Asa Vita
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            6 Fonctionnalités IA Mahagaga
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fomba marani-tsaina mitambatra: symbolique + algorithmique + data-driven
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Feature 1 - Spell Checker */}
          <div className="group border-2 border-emerald-200 rounded-2xl bg-gradient-to-br from-white to-emerald-50 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-emerald-400 animate-fade-in-up hover-wiggle">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 group-hover:scale-110 transition-all shadow-lg animate-float">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Correcteur Orthographique ✓</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Mamantatra sy manitsy hadiso tsipelina amin'ny alalan'ny <strong>rakibolana (scraping tenymalagasy.org)</strong>
            </p>
            <div className="bg-emerald-100 rounded-lg p-3 text-sm">
              <p className="font-semibold text-emerald-800">🔧 Teknolojia:</p>
              <p className="text-emerald-700">Distance de Levenshtein + Hash Tables</p>
            </div>
          </div>

          {/* Feature 2 - Translator */}
          <div className="group border-2 border-blue-200 rounded-2xl bg-gradient-to-br from-white to-blue-50 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-blue-400 animate-fade-in-up hover-wiggle" style={{animationDelay: '0.1s'}}>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 group-hover:scale-110 transition-all shadow-lg animate-float" style={{animationDelay: '0.5s'}}>
              <Languages className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Traducteur Mot-à-Mot 🌍</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Clic droit</strong> amin'ny teny iray dia hita eo noho eo ny dikany (Malagasy ⟷ Frantsay)
            </p>
            <div className="bg-blue-100 rounded-lg p-3 text-sm">
              <p className="font-semibold text-blue-800">🔧 Teknolojia:</p>
              <p className="text-blue-700">API</p>
            </div>
          </div>

          {/* Feature 3 - Autocomplete */}
          <div className="group border-2 border-purple-200 rounded-2xl bg-gradient-to-br from-white to-purple-50 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-purple-400 animate-fade-in-up hover-wiggle" style={{animationDelay: '0.2s'}}>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 group-hover:scale-110 transition-all shadow-lg animate-float" style={{animationDelay: '1s'}}>
              <Sparkles className="w-8 h-8 text-white animate-rotate-slow" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Autocomplétion Manan-tsaina 🎯</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Manolotra teny manaraka tsara amin'ny alalan'ny <strong>N-grams models</strong>
            </p>
            <div className="bg-purple-100 rounded-lg p-3 text-sm">
              <p className="font-semibold text-purple-800">🔧 Ofana:</p>
              <p className="text-purple-700">Baiboly + Gazety + Lalàna Malagasy</p>
            </div>
          </div>

          {/* Feature 4 - Dictionnaire Intégré */}
          <div className="group border-2 border-pink-200 rounded-2xl bg-gradient-to-br from-white to-pink-50 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-pink-400 animate-fade-in-up hover-wiggle" style={{animationDelay: '0.3s'}}>
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 group-hover:scale-110 transition-all shadow-lg animate-float" style={{animationDelay: '1.5s'}}>
              <BookMarked className="w-8 h-8 text-white animate-scale-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Rakibolana Mifanaraka 📖</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Mahafantatra eo noho eo</strong> ny hevitry ny teny rehetra ao anatin'ny soratra Malagasy
            </p>
            <div className="bg-pink-100 rounded-lg p-3 text-sm">
              <p className="font-semibold text-pink-800">🔧 Fahaizana:</p>
              <p className="text-pink-700">Rakibolana haingana miaraka amin'ny fanazavana amin'ny teny Malagasy</p>
            </div>
          </div>

          {/* Feature 5 - NER */}
          <div className="group border-2 border-orange-200 rounded-2xl bg-gradient-to-br from-white to-orange-50 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-orange-400 animate-fade-in-up hover-wiggle" style={{animationDelay: '0.4s'}}>
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 group-hover:scale-110 transition-all shadow-lg animate-float" style={{animationDelay: '2s'}}>
              <MapPin className="w-8 h-8 text-white animate-bounce-slow" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Reconnaissance d'Entités (NER) 📍</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Mamantatra ho azy <strong>ny tanàna (Antsirabe, Tana)</strong> sy <strong>ny olona malaza</strong> ao anaty soratra
            </p>
            <div className="bg-orange-100 rounded-lg p-3 text-sm">
              <p className="font-semibold text-orange-800">🔧 Hita:</p>
              <p className="text-orange-700">Toerana + Olona + Fikambanana</p>
            </div>
          </div>

          {/* Feature 6 - Chatbot */}
          <div className="group border-2 border-teal-200 rounded-2xl bg-gradient-to-br from-white to-teal-50 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-teal-400 animate-fade-in-up hover-wiggle" style={{animationDelay: '0.5s'}}>
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 group-hover:scale-110 transition-all shadow-lg animate-float" style={{animationDelay: '2.5s'}}>
              <MessageSquare className="w-8 h-8 text-white animate-scale-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Chatbot Mpanampy 🤖</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>"Co-pilote"</strong> izay afaka manome <strong>ohabolana Malagasy</strong> sy fanampiana hafa
            </p>
            <div className="bg-teal-100 rounded-lg p-3 text-sm">
              <p className="font-semibold text-teal-800">🔧 Fahaizana:</p>
              <p className="text-teal-700">Ohabolana + Fanampiana ara-piteny</p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Section - Low Resource Solutions */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
              💡 Stratégie Marani-tsaina
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Ahoana no Fanalana ny Olana "Low Resource"?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Tsy mila Big Data na GPT goavana - Mampiasa fomba 3 mitambatra tsara
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Symbolic Approach */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-emerald-500 transform hover:scale-105 transition-all animate-slide-in-left hover-wiggle">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 animate-bounce-in">
                <BookOpen className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1️⃣ Symbolique</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                <strong>Rakibolana sy fitsipika</strong> nohangonina tamin'ny scraping (tenymalagasy.org)
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                  <span>Dictionnaires structurés</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                  <span>Fitsipika ara-pitenenana</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                  <span>Lisitry ny entité (tanàna, olona)</span>
                </li>
              </ul>
            </div>

            {/* Algorithmic Approach */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-blue-500 transform hover:scale-105 transition-all animate-fade-in-up hover-wiggle" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 animate-bounce-in" style={{animationDelay: '0.2s'}}>
                <Brain className="w-8 h-8 text-blue-600 animate-scale-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2️⃣ Algorithmique</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                <strong>Algorithmes classiques</strong> mahomby tsy mila training goavana
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span>Distance de Levenshtein</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span>Hash Tables haingana</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span>Pattern matching (Regex)</span>
                </li>
              </ul>
            </div>

            {/* Data-Driven Approach */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-purple-500 transform hover:scale-105 transition-all animate-slide-in-right hover-wiggle">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 animate-bounce-in" style={{animationDelay: '0.4s'}}>
                <Database className="w-8 h-8 text-purple-600 animate-float" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3️⃣ Data-Driven</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                <strong>Modely statistika tsotra</strong> avy amin'ny corpus Malagasy
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                  <span>N-grams (Baiboly, gazety)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                  <span>Modely Markov</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                  <span>Corpus voaangona (lalàna, boky)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Key Insight Box */}
          <div className="mt-12 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 rounded-2xl p-8 text-center animate-scale-pulse hover-wiggle">
            <p className="text-2xl font-bold text-gray-900 mb-3 animate-bounce-slow">
              🎯 Ny Maha-special an'ity Solution ity
            </p>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              <strong>Tsy miandry Big Data aho!</strong> Mampiasa fomba marani-tsaina 3 mitambatra (symbolique + algorithmique + 
              data-driven) mba hahazoana vokatra tsara na dia "Low Resource Language" aza ny Malagasy. 
              <span className="text-orange-600 font-semibold"> Io no maha-innovant ny projet!</span>
            </p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="container mx-auto px-4 py-20 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-24 h-24 border-4 border-emerald-300 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-4 border-blue-300 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              🎬 Demo mivantana
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Jereo ny Fahagagana!</h2>
            <p className="text-lg text-gray-600">Toy izao ny fiasa amin'ny tena soratra Malagasy</p>
          </div>

          {/* Interactive Demo Box */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-emerald-400">
            <div className="bg-white rounded-2xl p-8 mb-6 shadow-inner">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span className="text-sm text-gray-500 font-medium">Voambolan-AI Editor</span>
              </div>
              <div className="font-mono text-gray-800 text-lg leading-relaxed">
                Miarahaba anareo, izaho dia <span className="bg-yellow-200 border-b-2 border-yellow-400 cursor-pointer animate-pulse-glow hover:animate-wiggle" title="Correcteur: Vérification orthographique">mpanoratra</span> Malagasy ary te hampiasa <span className="bg-blue-200 border-b-2 border-blue-400 cursor-pointer animate-pulse-glow hover:animate-wiggle" title="NER: Détecté comme LIEU">Antsirabe</span> ho toerana hanoratana boky. 
                Ny <span className="bg-green-200 border-b-2 border-green-400 cursor-pointer animate-pulse-glow hover:animate-wiggle" title="Autocomplétion suggère: 'ohabolana', 'fomba'">ohabolana</span> Malagasy dia <span className="underline decoration-wavy decoration-red-500 cursor-pointer animate-scale-pulse hover:animate-wiggle" title="Erreur orthographique">harenq</span> lehibe!
              </div>
            </div>

            {/* AI Suggestions */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Spell Check */}
              <div className="bg-red-50/90 backdrop-blur border-2 border-red-300 rounded-xl p-6 transform hover:scale-105 transition-all animate-slide-in-left hover-wiggle">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0 animate-pulse-glow">
                    <CheckCircle className="w-5 h-5 text-white animate-bounce-slow" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-red-900 mb-2">❌ Hadisoana Tsipelina</p>
                    <p className="text-red-800 mb-3">
                      "<span className="font-mono bg-red-200 px-2 py-1 rounded">harenq</span>" tsy mety
                    </p>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-700 mb-2">💡 Soso-kevitra:</p>
                      <button className="bg-emerald-500 text-white px-3 py-1 rounded text-sm hover:bg-emerald-600 transition-colors">
                        harena ✓
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* NER Detection */}
              <div className="bg-blue-50/90 backdrop-blur border-2 border-blue-300 rounded-xl p-6 transform hover:scale-105 transition-all animate-slide-in-right hover-wiggle" style={{animationDelay: '0.1s'}}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 animate-float">
                    <MapPin className="w-5 h-5 text-white animate-bounce-slow" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-blue-900 mb-2">📍 Entité Fantatra</p>
                    <p className="text-blue-800 mb-3">
                      "<span className="font-mono bg-blue-200 px-2 py-1 rounded">Antsirabe</span>" = TOERANA
                    </p>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-sm text-gray-600">
                        🎯 Hita ho azy fa tanàna lehibe ao Madagasikara io
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Translation */}
              <div className="bg-purple-50/90 backdrop-blur border-2 border-purple-300 rounded-xl p-6 transform hover:scale-105 transition-all animate-slide-in-left hover-wiggle" style={{animationDelay: '0.2s'}}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 animate-scale-pulse">
                    <Languages className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-purple-900 mb-2">🌍 Dikanteny</p>
                    <p className="text-purple-800 mb-3">
                      Clic droit amin'ny "<span className="font-mono bg-purple-200 px-2 py-1 rounded">mpanoratra</span>"
                    </p>
                    <div className="bg-white rounded-lg p-3">
                      <p className="text-sm text-gray-700">
                        🇫🇷 <strong>écrivain, rédacteur</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Autocomplete */}
              <div className="bg-green-50/90 backdrop-blur border-2 border-green-300 rounded-xl p-6 transform hover:scale-105 transition-all animate-slide-in-right hover-wiggle" style={{animationDelay: '0.3s'}}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 animate-float">
                    <Sparkles className="w-5 h-5 text-white animate-rotate-slow" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-green-900 mb-2">✨ Teny Manaraka</p>
                    <p className="text-green-800 mb-3">
                      Taorian'ny "<span className="font-mono bg-green-200 px-2 py-1 rounded">ohabolana</span>"
                    </p>
                    <div className="bg-white rounded-lg p-3 flex gap-2 flex-wrap">
                      <button className="bg-green-100 px-3 py-1 rounded text-sm hover:bg-green-200">Malagasy</button>
                      <button className="bg-green-100 px-3 py-1 rounded text-sm hover:bg-green-200">dia</button>
                      <button className="bg-green-100 px-3 py-1 rounded text-sm hover:bg-green-200">sy</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Malagasy vs Anglisy/Frantsay
            </h2>
            <p className="text-lg text-gray-600">Jereo ny tena fahasahiranana!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* English/French Side */}
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 border-2 border-green-400 animate-slide-in-left hover-wiggle">
              <div className="text-center mb-6">
                <div className="text-5xl mb-3 animate-scale-pulse">🇬🇧 🇫🇷</div>
                <h3 className="text-2xl font-bold text-gray-900">Anglisy & Frantsay</h3>
                <p className="text-green-700 font-semibold animate-bounce-slow">High Resource Languages</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700"><strong>Miliara</strong> tarehimarika azo ampiasaina</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">GPT sy modely goavana maro</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Corpus lehibe (Wikipedia, boky)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Fikajiana an-tapitrisa dolara</span>
                </li>
              </ul>
            </div>

            {/* Malagasy Side */}
            <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl p-8 border-2 border-red-400 relative overflow-hidden animate-slide-in-right hover-wiggle">
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse animate-glow">
                LOW RESOURCE
              </div>
              <div className="text-center mb-6">
                <div className="text-5xl mb-3 animate-scale-pulse">🇲🇬</div>
                <h3 className="text-2xl font-bold text-gray-900">Malagasy</h3>
                <p className="text-red-700 font-semibold animate-bounce-slow">Fiteny Vitsy Loharano</p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 text-red-600 mt-1 flex-shrink-0">❌</div>
                  <span className="text-gray-700"><strong>Vitsy</strong> ny tarehimarika nomerika</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 text-red-600 mt-1 flex-shrink-0">❌</div>
                  <span className="text-gray-700">Tsy misy GPT Malagasy natoka</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 text-red-600 mt-1 flex-shrink-0">❌</div>
                  <span className="text-gray-700">Corpus madinika (Baiboly, gazety)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 text-red-600 mt-1 flex-shrink-0">❌</div>
                  <span className="text-gray-700">Tsy misy financement goavana</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Solution Arrow */}
          <div className="flex justify-center my-8">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-8 py-4 rounded-full font-bold text-xl shadow-2xl animate-bounce-slow animate-pulse-glow animate-glow">
              ↓ Io no anton'ny Voambolan-AI! ↓
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
              ⚙️ Tech Stack
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Teknolojia Nampiasaina</h2>
            <p className="text-lg text-gray-600">Fitambarana mahomby sy tsy lafo</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Frontend */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border-2 border-cyan-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">💻</span>
                </div>
                Frontend
              </h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white border-2 border-cyan-400 rounded-xl text-sm font-semibold text-gray-700 shadow-sm hover:scale-105 transition-all hover-wiggle animate-bounce-in">
                  ⚛️ React
                </span>
                <span className="px-4 py-2 bg-white border-2 border-blue-400 rounded-xl text-sm font-semibold text-gray-700 shadow-sm hover:scale-105 transition-all hover-wiggle animate-bounce-in" style={{animationDelay: '0.1s'}}>
                  🎨 Tailwind CSS
                </span>
                <span className="px-4 py-2 bg-white border-2 border-cyan-400 rounded-xl text-sm font-semibold text-gray-700 shadow-sm hover:scale-105 transition-all hover-wiggle animate-bounce-in" style={{animationDelay: '0.2s'}}>
                  📝 Rich Text Editor
                </span>
              </div>
            </div>

            {/* Backend */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">🐍</span>
                </div>
                Backend NLP
              </h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white border-2 border-green-400 rounded-xl text-sm font-semibold text-gray-700 shadow-sm hover:scale-105 transition-all hover-wiggle animate-bounce-in">
                  🐍 Python Flask
                </span>
                <span className="px-4 py-2 bg-white border-2 border-emerald-400 rounded-xl text-sm font-semibold text-gray-700 shadow-sm hover:scale-105 transition-all hover-wiggle animate-bounce-in" style={{animationDelay: '0.1s'}}>
                  📚 NLTK
                </span>
                <span className="px-4 py-2 bg-white border-2 border-green-400 rounded-xl text-sm font-semibold text-gray-700 shadow-sm hover:scale-105 transition-all hover-wiggle animate-bounce-in" style={{animationDelay: '0.2s'}}>
                  🔤 NodeJS 
                </span>
              </div>
            </div>

            {/* Data Sources */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">📊</span>
                </div>
                Loharano Data
              </h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white border-2 border-purple-400 rounded-xl text-sm font-semibold text-gray-700 shadow-sm hover:scale-105 transition-all hover-wiggle animate-bounce-in">
                  📖 tenymalagasy.org
                </span>
                <span className="px-4 py-2 bg-white border-2 border-pink-400 rounded-xl text-sm font-semibold text-gray-700 shadow-sm hover:scale-105 transition-all hover-wiggle animate-bounce-in" style={{animationDelay: '0.1s'}}>
                  ✝️ Baiboly Malagasy
                </span>
                <span className="px-4 py-2 bg-white border-2 border-purple-400 rounded-xl text-sm font-semibold text-gray-700 shadow-sm hover:scale-105 transition-all hover-wiggle animate-bounce-in" style={{animationDelay: '0.2s'}}>
                  📰 Gazety loharano
                </span>
                <span className="px-4 py-2 bg-white border-2 border-pink-400 rounded-xl text-sm font-semibold text-gray-700 shadow-sm hover:scale-105 transition-all hover-wiggle animate-bounce-in" style={{animationDelay: '0.3s'}}>
                  ⚖️ Lalàna Malagasy
                </span>
              </div>
            </div>

            {/* Algorithms */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 border-2 border-orange-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">🧮</span>
                </div>
                Algorithmes
              </h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white border-2 border-orange-400 rounded-xl text-sm font-semibold text-gray-700 shadow-sm hover:scale-105 transition-all hover-wiggle animate-bounce-in">
                  📏 Levenshtein
                </span>
                <span className="px-4 py-2 bg-white border-2 border-yellow-400 rounded-xl text-sm font-semibold text-gray-700 shadow-sm hover:scale-105 transition-all hover-wiggle animate-bounce-in" style={{animationDelay: '0.1s'}}>
                  #️⃣ Hash Tables
                </span>
                <span className="px-4 py-2 bg-white border-2 border-orange-400 rounded-xl text-sm font-semibold text-gray-700 shadow-sm hover:scale-105 transition-all hover-wiggle animate-bounce-in" style={{animationDelay: '0.2s'}}>
                  🔢 N-grams
                </span>
                <span className="px-4 py-2 bg-white border-2 border-yellow-400 rounded-xl text-sm font-semibold text-gray-700 shadow-sm hover:scale-105 transition-all hover-wiggle animate-bounce-in" style={{animationDelay: '0.3s'}}>
                  🎲 Markov
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial / Value Proposition */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-emerald-100 via-blue-100 to-purple-100">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-12 border-4 border-emerald-400">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">💎</div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Nahoana no Voambolan-AI?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center animate-fade-in-up hover-wiggle">
                <div className="text-4xl mb-3 animate-bounce-slow">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Vahaolana Marina</h3>
                <p className="text-gray-600">
                  Tsy mila Big Data na GPT lafo - mampiasa fomba marani-tsaina mitambatra
                </p>
              </div>
              <div className="text-center animate-fade-in-up hover-wiggle" style={{animationDelay: '0.2s'}}>
                <div className="text-4xl mb-3 animate-scale-pulse">🇲🇬</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">100% Malagasy</h3>
                <p className="text-gray-600">
                  Natao manokana ho an'ny toetra manokana sy kolontsain'ny fiteny Malagasy
                </p>
              </div>
              <div className="text-center animate-fade-in-up hover-wiggle" style={{animationDelay: '0.4s'}}>
                <div className="text-4xl mb-3 animate-float">⚡</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Haingana & Tsara</h3>
                <p className="text-gray-600">
                  Algorithmes mahomby manome valiny eo noho eo tsy mila API lafo
                </p>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-orange-400 rounded-xl p-6">
              <p className="text-lg text-gray-800 text-center leading-relaxed">
                <strong className="text-orange-600 text-xl">"Mampiasa teknolojia moderne mba hampivelatra sy hanome lanja ny teny Malagasy 
                ao amin'ny tontolo nomerika - tsy mampandany vola goavana, tsy mila Big Data, fa mahomby!"</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ho an'iza ity Voambolan-AI ity?</h2>
            <p className="text-lg text-gray-600">Maro ny olona afaka mampiasa!</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-emerald-200 hover:scale-105 transition-all text-center animate-fade-in-up hover-wiggle">
              <div className="text-5xl mb-4 animate-float">📚</div>
              <h3 className="font-bold text-gray-900 mb-2">Mpianatra</h3>
              <p className="text-sm text-gray-600">Manoratra rafitra sy devoirs tsara amin'ny teny Malagasy</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200 hover:scale-105 transition-all text-center animate-fade-in-up hover-wiggle" style={{animationDelay: '0.1s'}}>
              <div className="text-5xl mb-4 animate-float" style={{animationDelay: '0.5s'}}>✍️</div>
              <h3 className="font-bold text-gray-900 mb-2">Mpanoratra</h3>
              <p className="text-sm text-gray-600">Manoratra boky, anovozona, lahatsoratra Malagasy miaraka amin'ny fanampiana IA</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200 hover:scale-105 transition-all text-center animate-fade-in-up hover-wiggle" style={{animationDelay: '0.2s'}}>
              <div className="text-5xl mb-4 animate-float" style={{animationDelay: '1s'}}>🏛️</div>
              <h3 className="font-bold text-gray-900 mb-2">Mpandraharaha</h3>
              <p className="text-sm text-gray-600">Manoratra taratasy ofisialy, tatitra amin'ny teny Malagasy</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-pink-200 hover:scale-105 transition-all text-center animate-fade-in-up hover-wiggle" style={{animationDelay: '0.3s'}}>
              <div className="text-5xl mb-4 animate-float" style={{animationDelay: '1.5s'}}>🎓</div>
              <h3 className="font-bold text-gray-900 mb-2">Mpampianatra</h3>
              <p className="text-sm text-gray-600">Manampy ny mpianatra amin'ny fianarana ny teny Malagasy tsara</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="container mx-auto px-4 py-20 text-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 opacity-10 animate-gradient"></div>
        
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full text-sm font-bold mb-4 animate-bounce-slow animate-pulse-glow">
            🚀 Vonona ny hampiasa?
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 text-balance leading-tight">
            Andao Hampivelatra ny Teny Malagasy<br/>
            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Amin'ny Alalan'ny IA!
            </span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Mandrosoa amin'ny editeranao voalohany natao manokana ho an'ny teny Malagasy
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
            <button className="group px-10 py-5 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white text-xl font-bold rounded-2xl transition-all transform hover:scale-110 hover:shadow-2xl animate-pulse-glow animate-bounce-in">
              <span className="flex items-center gap-3">
                Andramo Maimaim-poana
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </span>
            </button>
            <button className="px-10 py-5 border-3 border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-white font-bold text-xl rounded-2xl transition-all transform hover:scale-110 hover:shadow-xl animate-bounce-in hover-wiggle" style={{animationDelay: '0.2s'}}>
              Jereo ny Code 💻
            </button>
          </div>

          {/* Stats */}
          <div className="pt-12 flex justify-center gap-12 flex-wrap">
            <div className="animate-fade-in-up hover-wiggle">
              <p className="text-4xl font-bold text-emerald-600 animate-scale-pulse">6</p>
              <p className="text-gray-600">IA Features</p>
            </div>
            <div className="animate-fade-in-up hover-wiggle" style={{animationDelay: '0.2s'}}>
              <p className="text-4xl font-bold text-blue-600 animate-scale-pulse" style={{animationDelay: '0.3s'}}>3</p>
              <p className="text-gray-600">Approches</p>
            </div>
            <div className="animate-fade-in-up hover-wiggle" style={{animationDelay: '0.4s'}}>
              <p className="text-4xl font-bold text-purple-600 animate-scale-pulse" style={{animationDelay: '0.6s'}}>1</p>
              <p className="text-gray-600">Fiteny Malagasy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Voambolan-AI
              </h3>
              <p className="text-xl text-gray-300">Mpanoratra Manan-tsaina ho an'ny Malagasy</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center hover-wiggle">
                <div className="text-3xl mb-3 animate-float">🎓</div>
                <h4 className="font-bold mb-2">Tetikasa Akademika</h4>
                <p className="text-gray-400 text-sm">Master 2 - Intelligence Artificielle</p>
              </div>
              <div className="text-center hover-wiggle">
                <div className="text-3xl mb-3 animate-scale-pulse" style={{animationDelay: '0.5s'}}>🇲🇬</div>
                <h4 className="font-bold mb-2">Madagascar</h4>
                <p className="text-gray-400 text-sm">Mampivelatra ny teknolojia loharano ho an'ny Malagasy</p>
              </div>
              <div className="text-center hover-wiggle">
                <div className="text-3xl mb-3 animate-float" style={{animationDelay: '1s'}}>💡</div>
                <h4 className="font-bold mb-2">Innovation</h4>
                <p className="text-gray-400 text-sm">Mamaha ny olana "Low Resource Language"</p>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-8 text-center">
              <p className="text-gray-400 mb-2">
                Novolavolain'ny ekipa mpiara-miasa sy mangetaheta hampivelatra ny teny Malagasy
              </p>
              <p className="text-gray-500 text-sm">
                © 2024 Voambolan-AI - All Rights Reserved
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <span className="text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors">🐙 GitHub</span>
                <span className="text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors">📧 Contact</span>
                <span className="text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors">📚 Documentation</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(16, 185, 129, 0.8);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        .animate-shimmer {
          background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        @keyframes rotate-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }
        @keyframes scale-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-scale-pulse {
          animation: scale-pulse 2s ease-in-out infinite;
        }
        @keyframes slide-in-left {
          from {
            transform: translateX(-100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
        }
        @keyframes slide-in-right {
          from {
            transform: translateX(100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
        }
        @keyframes fade-in-up {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        @keyframes wiggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(5deg);
          }
          75% {
            transform: rotate(-5deg);
          }
        }
        .hover-wiggle:hover {
          animation: wiggle 0.5s ease-in-out;
        }
        @keyframes rainbow {
          0% {
            filter: hue-rotate(0deg);
          }
          100% {
            filter: hue-rotate(360deg);
          }
        }
        .animate-rainbow {
          animation: rainbow 10s linear infinite;
        }
        @keyframes bounce-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        .animate-typing {
          overflow: hidden;
          white-space: nowrap;
          animation: typing 3s steps(40) infinite;
        }
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(16, 185, 129, 0.5), 0 0 20px rgba(16, 185, 129, 0.3);
          }
          50% {
            text-shadow: 0 0 20px rgba(16, 185, 129, 0.8), 0 0 30px rgba(16, 185, 129, 0.5), 0 0 40px rgba(16, 185, 129, 0.3);
          }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

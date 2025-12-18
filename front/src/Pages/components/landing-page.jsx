import { BookOpen, CheckCircle, Languages, Lightbulb, RefreshCw, Sparkles } from "lucide-react"

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
            Faharanitan-tsaina Artifisialy
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-balance bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Voambolan-AI
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 font-medium text-balance">
            Mpamoaka lahatsoratra manan-tsaina ho an'ny teny Malagasy
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed text-pretty">
            Voambolan-AI dia éditeur de texte ampiasain'ny faharanitan-tsaina artifisialy, natao hanampiana ny
            mpanoratra amin'ny fanitsiana tsipelina, fitsipi-pitenenana ary fanatsarana ny soratra amin'ny teny
            Malagasy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors">
              Hanandrana ny Demo
            </button>
            <button className="px-6 py-3 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 bg-transparent font-medium rounded-lg transition-colors">
              Hahafantatra bebe kokoa
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Fonctions principales</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="border border-emerald-100 rounded-lg bg-white p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fanitsiana tsipelina</h3>
            <p className="text-gray-600 leading-relaxed">
              Mamantatra sy manitsy ny hadiso-tsipelina amin'ny alalan'ny rakibolana sy fitsipika.
            </p>
          </div>

          <div className="border border-blue-100 rounded-lg bg-white p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fanamarinana fitsipi-pitenenana</h3>
            <p className="text-gray-600 leading-relaxed">
              Mampiasa fitsipika sy regex hahitana ireo fahadisoana mahazatra amin'ny fehezanteny.
            </p>
          </div>

          <div className="border border-emerald-100 rounded-lg bg-white p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <RefreshCw className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fakàn-teny fototra (Lemmatisation)</h3>
            <p className="text-gray-600 leading-relaxed">
              Mamaritra ny fototry ny teny mba hanatsarana ny fahazoana ny heviny. Ohatra: manosika → tosika
            </p>
          </div>

          <div className="border border-blue-100 rounded-lg bg-white p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fanoroana teny manaraka</h3>
            <p className="text-gray-600 leading-relaxed">
              Manolotra teny manaraka amin'ny alalan'ny modely statistika tsotra (N-grams).
            </p>
          </div>

          <div className="border border-emerald-100 rounded-lg bg-white p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <Languages className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fandikana teny</h3>
            <p className="text-gray-600 leading-relaxed">
              Mandika teny avy amin'ny teny Malagasy mankany amin'ny teny frantsay ary mifamadika.
            </p>
          </div>

          <div className="border border-blue-100 rounded-lg bg-white p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Soso-kevitra ara-hevitra</h3>
            <p className="text-gray-600 leading-relaxed">
              Manolotra teny sy hevitra mifandray mba hanankarena kokoa ny lahatsoratra.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-20 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Comment ça marche</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-emerald-600">
                1
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">Soraty amin'ny teny Malagasy ny lahatsoratrao</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-blue-600">
                2
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">Dinihin'ny rafitra manan-tsaina ny soratra</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-emerald-600">
                3
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">Miseho eo noho eo ny fanitsiana sy soso-kevitra</p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Exemple en action</h2>
          <div className="border-2 border-emerald-200 rounded-lg bg-white shadow-xl p-8">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-4">
              <div className="font-mono text-gray-800 text-lg leading-relaxed">
                Ny teny Malagasy dia harena sarobidy ary tokony harovana sy hatsaraina amin'ny alalan'ny teknolojia
                maoderina.
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-red-800">Mot invalide détecté</p>
                  <p className="text-red-700">
                    <span className="font-mono bg-red-100 px-2 py-1 rounded">"mk"</span>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-emerald-800">Suggestion de lemmatisation</p>
                  <p className="text-emerald-700">
                    <span className="font-mono bg-emerald-100 px-2 py-1 rounded">"manosika"</span>
                    {" → "}
                    <span className="font-mono bg-emerald-100 px-2 py-1 rounded">"tosika"</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-r from-emerald-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Technologies utilisées</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="px-4 py-2 bg-white border border-emerald-200 rounded-full text-sm font-medium text-gray-700 shadow-sm">
              React
            </span>
            <span className="px-4 py-2 bg-white border border-blue-200 rounded-full text-sm font-medium text-gray-700 shadow-sm">
              Tailwind CSS
            </span>
            <span className="px-4 py-2 bg-white border border-emerald-200 rounded-full text-sm font-medium text-gray-700 shadow-sm">
              Python NLP
            </span>
            <span className="px-4 py-2 bg-white border border-blue-200 rounded-full text-sm font-medium text-gray-700 shadow-sm">
              Fitsipika ara-pitenenana
            </span>
            <span className="px-4 py-2 bg-white border border-emerald-200 rounded-full text-sm font-medium text-gray-700 shadow-sm">
              Rakibolana Malagasy
            </span>
            <span className="px-4 py-2 bg-white border border-blue-200 rounded-full text-sm font-medium text-gray-700 shadow-sm">
              N-grams
            </span>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            Ny rafitra dia mampiasa fomba mitambatra: fitsipika, rakibolana ary modely statistika tsotra.
          </p>
        </div>
      </section>

      {/* Low Resource Language Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="border-2 border-blue-200 rounded-lg bg-gradient-to-br from-blue-50 to-emerald-50 p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-balance">
              Tenim-pirenena saingy vitsy loharano nomerika
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed text-pretty">
              Ny teny Malagasy dia isan'ny fiteny manana loharano nomerika voafetra. Noho izany, Voambolan-AI dia
              mampiasa fomba marani-tsaina tsy miankina amin'ny Big Data na modèle GPT goavana.
            </p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-balance">
            Andao hampiroborobo ny teny Malagasy amin'ny alalan'ny IA
          </h2>
          <button className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white text-lg font-medium rounded-lg transition-colors">
            Manomboka manoratra
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center space-y-2">
          <p className="text-xl font-semibold">Voambolan-AI – Tetikasa Akademika</p>
          <p className="text-gray-400">Faharanitan-tsaina Artifisialy</p>
          <p className="text-gray-400">Novolavolain'ny ekipan'ny mpianatra</p>
        </div>
      </footer>
    </div>
  )
}

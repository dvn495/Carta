import React, { useState, useEffect } from "react";
import { Music, Plus, Heart, Save } from "lucide-react";

interface FuturePlan {
  id: string;
  title: string;
  description: string;
}

const FutureSection: React.FC = () => {
  const [plans, setPlans] = useState<FuturePlan[]>([
    {
      id: "plan-1",
      title: "Viaje - depronto a la playa, que locura seria",
      description: "Planear unas vacaciones juntos",
    },
    {
      id: "plan-2",
      title: "Abrir la pizzeria",
      description:
        "Te imaginas? en la pizzeria que tmb vendamos cripetas",
    },
  ]);

  const [newPlan, setNewPlan] = useState({
    title: "",
    description: "",
  });

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isSecretButtonActive, setIsSecretButtonActive] = useState(false);
  const [secretPressTimer, setSecretPressTimer] = useState<number | null>(null);

  useEffect(() => {
    // Load plans from localStorage
    const savedPlans = localStorage.getItem("anniversary-plans");
    if (savedPlans) {
      try {
        const parsedPlans = JSON.parse(savedPlans);
        if (Array.isArray(parsedPlans)) {
          setPlans(parsedPlans);
        }
      } catch (error) {
        console.error("Failed to parse saved plans", error);
      }
    }
  }, []);

  useEffect(() => {
    // Save plans to localStorage when they change
    localStorage.setItem("anniversary-plans", JSON.stringify(plans));
  }, [plans]);

  const handleAddPlan = () => {
    if (newPlan.title.trim() && newPlan.description.trim()) {
      setPlans([
        ...plans,
        {
          id: `plan-${Date.now()}`,
          title: newPlan.title,
          description: newPlan.description,
        },
      ]);
      setNewPlan({ title: "", description: "" });
      setIsAddingNew(false);
    }
  };

  const handleSecretButtonMouseDown = () => {
    const timer = setTimeout(() => {
      setIsSecretButtonActive(true);

      // Play Can't Help Falling in Love
      const audio = new Audio(
        "https://p.scdn.co/mp3-preview/e2f5edb569c73916235b47baf61cf16c4b901e28"
      );
      audio.play();

      setTimeout(() => {
        setIsSecretButtonActive(false);
      }, 10000);
    }, 3000);

    setSecretPressTimer(timer);
  };

  const handleSecretButtonMouseUp = () => {
    if (secretPressTimer) {
      clearTimeout(secretPressTimer);
      setSecretPressTimer(null);
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-blue-950 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-800 dark:text-blue-300">
          The future
        </h2>
        <p className="text-center text-blue-700 dark:text-blue-400 mb-12 max-w-2xl mx-auto">
          "Nunca se me van a acabar las razones por las que me enamoré de ti"
        </p>

        <div className="bg-white/80 dark:bg-blue-900/30 rounded-xl p-6 shadow-xl mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-600 dark:bg-blue-700 text-white">
              <Music size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">
                Nuestros planes futuros
              </h3>
              <p className="text-blue-700 dark:text-blue-400">
                Yo espero que se cumplan
              </p>
            </div>
          </div>

          <ul className="space-y-4 mb-8">
            {plans.map((plan) => (
              <li
                key={plan.id}
                className="p-4 rounded-lg bg-blue-50 dark:bg-blue-800/40 shadow transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
              >
                <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-300">
                  {plan.title}
                </h4>
                <p className="text-blue-700 dark:text-blue-400">
                  {plan.description}
                </p>
              </li>
            ))}
          </ul>

          {isAddingNew ? (
            <div className="p-4 rounded-lg border-2 border-dashed border-blue-300 dark:border-blue-700">
              <input
                type="text"
                value={newPlan.title}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, title: e.target.value })
                }
                className="w-full p-2 mb-2 rounded border border-blue-200 dark:border-blue-700 bg-white dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Título del plan"
              />
              <textarea
                value={newPlan.description}
                onChange={(e) =>
                  setNewPlan({ ...newPlan, description: e.target.value })
                }
                className="w-full p-2 mb-4 rounded border border-blue-200 dark:border-blue-700 bg-white dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descripción"
                rows={3}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 rounded bg-gray-200 dark:bg-blue-800 text-gray-700 dark:text-blue-200 hover:bg-gray-300 dark:hover:bg-blue-700 transition-colors duration-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddPlan}
                  className="px-4 py-2 rounded bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 flex items-center gap-2"
                >
                  <Save size={16} />
                  Guardar
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingNew(true)}
              className="w-full py-3 rounded-lg border-2 border-dashed border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Añadir nuevo plan
            </button>
          )}
        </div>

        {/* Secret button */}
        <div className="text-center mt-12">
          <button
            onMouseDown={handleSecretButtonMouseDown}
            onMouseUp={handleSecretButtonMouseUp}
            onMouseLeave={handleSecretButtonMouseUp}
            onTouchStart={handleSecretButtonMouseDown}
            onTouchEnd={handleSecretButtonMouseUp}
            className={`transition-all duration-300 p-3 rounded-full ${
              isSecretButtonActive
                ? "bg-pink-600 text-white scale-125 animate-pulse"
                : "bg-transparent text-blue-600 dark:text-blue-400 hover:text-pink-500 dark:hover:text-pink-400"
            }`}
            aria-label="Secret button"
          >
            <Heart
              size={24}
              className="transition-transform duration-300 hover:scale-110"
            />
          </button>
          {isSecretButtonActive && (
            <p className="text-pink-600 dark:text-pink-400 mt-2 animate-fadeIn">
              ♫ Can't Help Falling in Love ♫
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FutureSection;

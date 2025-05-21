import React, { useState } from "react";

interface TimelineEvent {
  day: number;
  title: string;
  description: string;
  quote: string;
}

const Timeline: React.FC = () => {
  const [activeEvent, setActiveEvent] = useState<number | null>(null);

  const events: TimelineEvent[] = [
    {
      day: 1,
      title: "Primeros diass",
      description:
        "Cuando los dos estábamos con pena de haber empezado sin saber qué hacer",
      quote:
        "Siento que contigo estoy con alguien que ssabe que me esta pasando",
    },
    {
      day: 15,
      title: "Primer mes",
      description: "En el parquesito con un picnic exotico",
      quote: "Tu mirada con la que veo el universo entero",
    },
    {
      day: 45,
      title: "Primera noche juntos",
      description: "La primera vez que te quedaste a dormir en mi casa",
      quote: "Te amo a ti y solo a ti",
    },
    {
      day: 127,
      title: "La maraton",
      description: "Puros deportistas profesionales ademas de loss cuadritos jeje",
      quote:
        "Mientras más tiempo pasamos juntos, más me doy cuenta de lo diferentes que somos",
    },
    {
      day: 200,
      title: "River park",
      description: "Ya van 2 veces que muero y tu cassi te infartas sjsjjs",
      quote:
        "Siento que tu me complementas y viceversa, ciertas cosas que tu tienes que me hacen falta",
    },
    {
      day: 300,
      title: "Primer añito juntos",
      description: "Sucedieron cositas, pero primer añito contigo",
      quote: "Yo lo hago todo rico -- frase iconica",
    },
    {
      day: 427,
      title: "Hoy",
      description:
        "Las tantas veces que nos vemos simplemente para no hacer nada: sentarnos a tragar, hablar, ver algo juntos",
      quote:
        "Nunca se me van a acabar las razones por las que me enamoré de ti",
    },
  ];

  const toggleEvent = (index: number) => {
    if (activeEvent === index) {
      setActiveEvent(null);
    } else {
      setActiveEvent(index);
    }
  };

  return (
    <section
      id="timeline"
      className="py-20 px-4 md:px-8 bg-white/80 dark:bg-blue-950/80 transition-colors duration-500"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-blue-800 dark:text-blue-300 transition-colors duration-500">
          Nuestro Viaje Juntos
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-pink-500 dark:from-blue-400 dark:to-pink-400 transform md:-translate-x-1/2"></div>

          {/* Timeline events */}
          {events.map((event, index) => (
            <div
              key={index}
              className={`mb-8 ${
                index % 2 === 0
                  ? "md:pr-8 md:text-right md:ml-auto md:mr-[50%]"
                  : "md:pl-8 md:ml-[50%]"
              } relative flex md:block`}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full m-2 bg-white dark:bg-blue-900 border-2 border-blue-500 dark:border-blue-400 transform translate-x-[-50%] z-10 cursor-pointer transition-transform duration-300 hover:scale-125"
                onClick={() => toggleEvent(index)}
              ></div>

              {/* Content */}
              <div className="ml-12 md:ml-0 w-full md:w-[calc(100%-20px)]">
                <div className="bg-blue-100/80 dark:bg-blue-800/40 p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-start justify-between">
                    <div className="p-25">
                      <h3 className="text-xl font-semibold mt-6 text-blue-900 dark:text-blue-200">
                        {event.title}
                      </h3>
                      <p className="text-blue-700 dark:text-blue-300 mt-1">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Expandable quote */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      activeEvent === index
                        ? "max-h-40 mt-4 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <blockquote className="border-l-4 border-pink-500 dark:border-pink-400 pl-3 italic text-blue-800 dark:text-pink-200">
                      "{event.quote}"
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;

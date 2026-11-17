import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BedDouble,
  Calculator,
  CalendarCheck2,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Cloud,
  ConciergeBell,
  Globe2,
  LayoutDashboard,
  Menu,
  MessageCircle,
  MousePointer2,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Users,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { Brand } from "@/components/Brand";
import { LeadDialog, type LeadKind } from "@/components/LeadDialog";
import { PricingSection } from "@/components/PricingSection";
import { ProductMockup, type ProductView } from "@/components/ProductMockup";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const navigation = [
  { label: "Suite", href: "#suite" },
  { label: "Producto", href: "#producto" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Precios", href: "#precios" },
  { label: "Preguntas", href: "#preguntas" },
];

const suiteModules = [
  {
    title: "Recepción",
    copy: "Reservas, disponibilidad, check-in y check-out con el historial del huésped a la vista.",
    icon: ConciergeBell,
  },
  {
    title: "Restaurante",
    copy: "Mesas, comandas, cocina y cobro, con el consumo cargado a la habitación.",
    icon: UtensilsCrossed,
  },
  {
    title: "Management",
    copy: "Dirección, tarifas, usuarios y permisos de cada área en un mismo panel.",
    icon: LayoutDashboard,
  },
  {
    title: "Contabilidad",
    copy: "Asientos, cuentas y cierres de caja sin pasar los números a otra herramienta.",
    icon: Calculator,
  },
  {
    title: "Facturación electrónica",
    copy: "Comprobantes emitidos desde la operación, listos para el cliente y para el fisco.",
    icon: ReceiptText,
  },
];

const shots = [
  {
    src: "/showcase/acceso.png",
    width: 1915,
    height: 927,
    tab: "Acceso",
    title: "Acceso por área",
    copy: "Cada persona entra con su perfil y ve sólo lo que le corresponde.",
    alt: "Pantalla de acceso de Kazehana Cloud",
  },
  {
    src: "/showcase/management.png",
    width: 1916,
    height: 938,
    tab: "Management",
    title: "Datos de la empresa",
    copy: "La empresa, sus datos y los accesos de cada hotel en un solo lugar.",
    alt: "Información general de la empresa en el módulo Management",
  },
  {
    src: "/showcase/restaurante.png",
    width: 1915,
    height: 943,
    tab: "Restaurante",
    title: "Servicio de sala",
    copy: "Mesas, comandas y cobro, con el consumo cargado a la habitación del huésped.",
    alt: "Servicio de sala del restaurante con una orden abierta",
  },
];

const storySteps: { title: string; label: string; copy: string; view: ProductView }[] = [
  {
    label: "01 · ANTES DE LA LLEGADA",
    title: "Cada reserva, en su lugar.",
    copy: "Consulta disponibilidad, datos del huésped y estado de la reserva sin perseguir información entre hojas de cálculo y mensajes.",
    view: "reservation",
  },
  {
    label: "02 · DURANTE EL SERVICIO",
    title: "La sala, en el mismo sistema.",
    copy: "Mesas, comandas y consumos se cargan a la habitación del huésped y quedan disponibles para la factura del check-out.",
    view: "restaurant",
  },
  {
    label: "03 · DURANTE LA ESTANCIA",
    title: "Recepción y limpieza, sincronizadas.",
    copy: "Las prioridades de habitaciones y las tareas del equipo conviven en una misma vista para que todos sepan qué sigue.",
    view: "stay",
  },
  {
    label: "04 · AL CERRAR EL DÍA",
    title: "Decisiones con una visión completa.",
    copy: "Convierte la actividad diaria en reportes comprensibles sobre ocupación, ventas de restaurante e ingresos, listos para revisar.",
    view: "insight",
  },
];

const faqs = [
  {
    question: "¿Qué es Kaze Hana Cloud?",
    answer: "Es una suite de gestión para negocios de hospitalidad: recepción y reservas, restaurante, dirección, contabilidad y facturación electrónica. Todo funciona sobre los mismos datos, sin integraciones que mantener.",
  },
  {
    question: "¿Para qué tipo de negocio está pensada?",
    answer: "Para hoteles independientes, alojamientos boutique, hostales, posadas y apartahoteles, y también para restaurantes y cafeterías que trabajan con alojamiento o quieren su operación de sala y caja en el mismo sistema.",
  },
  {
    question: "¿Necesito instalar un programa?",
    answer: "No. Al ser una suite en la nube, el acceso se realiza desde un navegador. Así, tu equipo puede consultar la operación desde distintos dispositivos autorizados.",
  },
  {
    question: "¿Podré trasladar la información de mi operación actual?",
    answer: "La migración depende del formato y el sistema que utilices. Durante la demostración podemos revisar tu caso y definir qué información tendría sentido trasladar: habitaciones, tarifas, menús, clientes y saldos.",
  },
  {
    question: "¿Cuándo estará disponible?",
    answer: "Kaze Hana Cloud se encuentra en preparación. Puedes unirte a la lista de espera para recibir novedades del lanzamiento y participar en la etapa de acceso anticipado.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [activeShot, setActiveShot] = useState(0);
  const [dialog, setDialog] = useState<{ open: boolean; kind: LeadKind; plan?: string }>({ open: false, kind: "demo" });
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const shot = shots[activeShot];

  function openLead(kind: LeadKind, plan?: string) {
    setMenuOpen(false);
    setDialog({ open: true, kind, plan });
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveStep(Number((entry.target as HTMLElement).dataset.step || 0));
        });
      },
      { rootMargin: "-28% 0px -52% 0px", threshold: 0 },
    );
    stepRefs.current.forEach((step) => step && observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell" id="inicio">
      <button className="announcement" type="button" onClick={() => openLead("waitlist")}>
        <Sparkles size={14} aria-hidden="true" />
        <span>Estamos preparando el lanzamiento</span>
        <strong>Únete al acceso anticipado <ArrowRight size={14} /></strong>
      </button>

      <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
        <div className="header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Navegación principal">
            {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>
          <div className="header-actions">
            <button className="button button--small button--dark desktop-cta" type="button" onClick={() => openLead("demo")}>
              Solicitar demo <ArrowUpRight size={16} />
            </button>
            <button
              className="menu-toggle"
              type="button"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        <nav id="mobile-menu" className="mobile-nav" aria-label="Navegación móvil" hidden={!menuOpen}>
          {navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
          <button className="button button--primary" type="button" onClick={() => openLead("demo")}>Solicitar una demo <ArrowRight size={17} /></button>
        </nav>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-orbit hero-orbit--one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit--two" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow"><Cloud size={15} /> SUITE PARA HOSPITALIDAD</span>
              <h1 id="hero-title">Menos pestañas.<br /><em>Más hospitalidad.</em></h1>
              <p className="hero-lead">Kaze Hana Cloud reúne recepción, restaurante, contabilidad y facturación electrónica en un solo sistema, para que tu equipo dedique menos tiempo a coordinar y más a recibir.</p>
              <div className="hero-actions">
                <button className="button button--primary button--large" type="button" onClick={() => openLead("demo")}>
                  Solicitar una demo <ArrowRight size={19} />
                </button>
                <a className="text-action" href="#como-funciona">Ver cómo funciona <MousePointer2 size={16} /></a>
              </div>
              <ul className="hero-assurances" aria-label="Características principales">
                <li><Check size={15} /> Habitaciones y mesas en un mismo sistema</li>
                <li><Check size={15} /> Acceso desde cualquier dispositivo</li>
                <li><Check size={15} /> Operación centralizada</li>
              </ul>
            </div>
            <div className="hero-visual">
              <div className="visual-backdrop" aria-hidden="true" />
              <ProductMockup view="overview" />
              <div className="floating-note floating-note--top" aria-hidden="true">
                <span className="floating-icon"><CalendarCheck2 size={18} /></span>
                <span><small>NUEVA RESERVA</small><strong>Web directa · 3 noches</strong></span>
                <CheckCircle2 size={18} />
              </div>
              <div className="floating-note floating-note--bottom" aria-hidden="true">
                <span className="pulse-dot" />
                <span><small>HABITACIÓN 204</small><strong>Lista para recibir</strong></span>
              </div>
            </div>
          </div>
          <div className="container hero-footnote"><span>Una suite pensada para el ritmo real de tu operación.</span><i /></div>
        </section>

        <section className="fit-strip" aria-label="Tipos de negocio">
          <div className="container fit-inner">
            <p>UN MISMO SISTEMA, DISTINTOS NEGOCIOS</p>
            <div className="fit-list">
              <span><BedDouble size={18} /> Hoteles independientes</span>
              <span><UtensilsCrossed size={18} /> Restaurantes y cafeterías</span>
              <span><Sparkles size={18} /> Alojamientos boutique</span>
              <span><Users size={18} /> Hostales y apartahoteles</span>
            </div>
          </div>
        </section>

        <section className="section suite" id="suite" aria-labelledby="suite-title">
          <div className="container">
            <div className="section-heading section-heading--split">
              <div>
                <span className="section-kicker">UNA SUITE, TODAS LAS ÁREAS</span>
                <h2 id="suite-title">Cinco módulos. Un mismo sistema.</h2>
              </div>
              <p>
                No es sólo el sistema hotelero: la recepción, el restaurante, la dirección, la contabilidad y
                la facturación electrónica comparten los mismos datos, sin integraciones que mantener.
              </p>
            </div>
            <div className="suite-grid">
              {suiteModules.map((module) => {
                const Icon = module.icon;
                return (
                  <article className="suite-card" key={module.title}>
                    <Icon size={22} aria-hidden="true" />
                    <h3>{module.title}</h3>
                    <p>{module.copy}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section showcase" id="capturas" aria-labelledby="showcase-title">
          <div className="container">
            <div className="section-heading section-heading--split">
              <div>
                <span className="section-kicker">LA SUITE, EN PANTALLA</span>
                <h2 id="showcase-title">Así se ve la operación, sin maquetas.</h2>
              </div>
              <p>Tres pantallas reales del sistema: el acceso, los datos de la empresa y el servicio de sala.</p>
            </div>
            <div className="showcase-controls">
              <div className="showcase-tabs" role="group" aria-label="Pantallas del sistema">
                {shots.map((item, index) => (
                  <button
                    type="button"
                    key={item.src}
                    className={index === activeShot ? "showcase-tab showcase-tab--active" : "showcase-tab"}
                    aria-pressed={index === activeShot}
                    onClick={() => setActiveShot(index)}
                  >
                    {item.tab}
                  </button>
                ))}
              </div>
              <div className="showcase-arrows">
                <button
                  type="button"
                  className="showcase-arrow"
                  aria-label="Captura anterior"
                  onClick={() => setActiveShot((activeShot + shots.length - 1) % shots.length)}
                >
                  <ChevronLeft size={18} />
                </button>
                <span>{activeShot + 1} / {shots.length}</span>
                <button
                  type="button"
                  className="showcase-arrow"
                  aria-label="Captura siguiente"
                  onClick={() => setActiveShot((activeShot + 1) % shots.length)}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <figure className="showcase-stage" key={shot.src}>
              <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} />
              <figcaption aria-live="polite">
                <strong>{shot.title}</strong>
                <span>{shot.copy}</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="section benefits" id="beneficios" aria-labelledby="benefits-title">
          <div className="container">
            <div className="section-heading section-heading--split">
              <div><span className="section-kicker">TODO CONECTADO</span><h2 id="benefits-title">La operación fluye cuando la información también.</h2></div>
              <p>Desde la primera reserva hasta el último check-out —y también en la mesa—, cada área trabaja sobre la misma realidad. Menos duplicidad, más claridad.</p>
            </div>
            <div className="bento-grid">
              <article className="feature-card feature-card--calendar">
                <div className="feature-copy">
                  <CalendarDays size={24} />
                  <h3>Reservas sin laberintos</h3>
                  <p>Disponibilidad, estancias y datos de huéspedes en una vista que recepción entiende de un vistazo.</p>
                </div>
                <div className="mini-calendar" aria-hidden="true">
                  <div className="calendar-days">{["LUN 18", "MAR 19", "MIÉ 20", "JUE 21", "VIE 22"].map((day) => <span key={day}>{day}</span>)}</div>
                  <div className="calendar-line"><b>204</b><span className="booking-pill booking-pill--one">Marina · 3 noches</span></div>
                  <div className="calendar-line"><b>108</b><span className="booking-pill booking-pill--two">Javier · 2 noches</span></div>
                  <div className="calendar-line"><b>302</b><span className="booking-pill booking-pill--three">Ana · 3 noches</span></div>
                </div>
              </article>
              <article className="feature-card feature-card--tasks">
                <ClipboardCheck size={24} />
                <h3>El equipo sabe qué sigue</h3>
                <p>Convierte el estado de cada habitación en tareas claras para limpieza y recepción.</p>
                <div className="mini-tasks" aria-hidden="true">
                  <span><i className="checked"><Check size={12} /></i> 204 · Lista</span>
                  <span><i className="checked"><Check size={12} /></i> 108 · Preparada</span>
                  <span><i /> 302 · En proceso</span>
                </div>
              </article>
              <article className="feature-card feature-card--channels">
                <Globe2 size={24} />
                <h3>Una visión de cada canal</h3>
                <p>Ordena el origen de tus reservas y entiende mejor cómo llega cada huésped.</p>
                <div className="channel-bars" aria-hidden="true">
                  <span><b>Web directa</b><i><em style={{ width: "78%" }} /></i><strong>46%</strong></span>
                  <span><b>Agencias</b><i><em style={{ width: "62%" }} /></i><strong>38%</strong></span>
                  <span><b>Otros</b><i><em style={{ width: "28%" }} /></i><strong>16%</strong></span>
                </div>
              </article>
              <article className="feature-card feature-card--reports">
                <div className="feature-copy">
                  <ChartNoAxesColumnIncreasing size={24} />
                  <h3>Reportes que sí se leen</h3>
                  <p>Ocupación, ventas de restaurante e ingresos presentados para ayudarte a decidir, no para complicarte con más números.</p>
                </div>
                <div className="report-snapshot" aria-hidden="true">
                  <span>OCUPACIÓN DEL MES</span><strong>82<small>%</small></strong>
                  <div>{[36, 52, 46, 65, 58, 76, 68, 88, 82].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div>
                </div>
              </article>
              <article className="feature-card feature-card--restaurant">
                <div className="feature-copy">
                  <UtensilsCrossed size={24} />
                  <h3>El restaurante, dentro del sistema</h3>
                  <p>Las comandas de sala se cargan a la habitación del huésped y llegan a su factura sin volver a teclearlas en otra caja.</p>
                </div>
                <div className="room-charges" aria-hidden="true">
                  <div className="charge-row"><span>Mesa 12</span><b>Hab. 204</b><strong>$86.40</strong></div>
                  <div className="charge-row"><span>Mesa 7</span><b>Hab. 108</b><strong>$42.10</strong></div>
                  <div className="charge-row"><span>Barra</span><b>Efectivo</b><strong>$18.00</strong></div>
                  <small>Cerrado en la caja del día</small>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="section product-story" id="producto" aria-labelledby="product-title">
          <div className="container">
            <div className="section-heading product-heading">
              <span className="section-kicker">DE LA RESERVA AL CIERRE DEL DÍA</span>
              <h2 id="product-title">Un solo hilo para toda la operación.</h2>
              <p>Recorre la reserva, el servicio de sala, la estancia y el cierre del día: cada momento encuentra su lugar dentro de Kaze Hana Cloud.</p>
            </div>
            <div className="story-layout" id="como-funciona">
              <div className="story-visual">
                <ProductMockup view={storySteps[activeStep].view} />
                <div className="story-progress" aria-hidden="true">{storySteps.map((_, index) => <i key={index} className={index === activeStep ? "active" : ""} />)}</div>
              </div>
              <div className="story-steps">
                {storySteps.map((step, index) => (
                  <button
                    type="button"
                    key={step.label}
                    ref={(node) => { stepRefs.current[index] = node; }}
                    data-step={index}
                    className={`story-step${activeStep === index ? " story-step--active" : ""}`}
                    onClick={() => setActiveStep(index)}
                    aria-pressed={activeStep === index}
                  >
                    <span>{step.label}</span>
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                    <i className="story-arrow"><ArrowUpRight size={18} /></i>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="principles" aria-labelledby="principles-title">
          <div className="container principles-grid">
            <div className="principles-title-wrap">
              <span className="section-kicker">SIMPLE POR FUERA, SÓLIDO POR DENTRO</span>
              <h2 id="principles-title">Tecnología que se adapta a tu equipo. No al revés.</h2>
            </div>
            <div className="principle-list">
              <div><Cloud size={22} /><span><strong>En la nube</strong><p>Accede desde un navegador, sin instalaciones locales.</p></span></div>
              <div><Users size={22} /><span><strong>Para todo el equipo</strong><p>Una fuente compartida para recepción, limpieza y dirección.</p></span></div>
              <div><ShieldCheck size={22} /><span><strong>Datos bajo control</strong><p>Información centralizada y accesos pensados para cada operación.</p></span></div>
            </div>
          </div>
        </section>

        <PricingSection onRequestDemo={(plan) => openLead("demo", plan)} />

        <section className="section access" id="acceso" aria-labelledby="access-title">
          <div className="container">
            <div className="section-heading section-heading--split access-heading">
              <div><span className="section-kicker">EMPECEMOS A CONVERSAR</span><h2 id="access-title">Elige cómo quieres conocernos.</h2></div>
              <p>Explora la suite, acompaña el lanzamiento o simplemente cuéntanos qué necesita tu operación.</p>
            </div>
            <div className="offer-grid">
              <article className="offer-card offer-card--featured">
                <CalendarCheck2 size={26} />
                <span>PARA VERLO EN ACCIÓN</span>
                <h3>Solicita una demostración</h3>
                <p>Cuéntanos sobre tu alojamiento o restaurante y coordinaremos una demo enfocada en tu forma de trabajar.</p>
                <button className="button button--light" type="button" onClick={() => openLead("demo")}>Quiero una demo <ArrowRight size={17} /></button>
              </article>
              <article className="offer-card">
                <Sparkles size={26} />
                <span>PARA ACOMPAÑAR EL LANZAMIENTO</span>
                <h3>Únete al acceso anticipado</h3>
                <p>Recibe novedades y participa en la etapa inicial de Kaze Hana Cloud.</p>
                <button className="button button--outline" type="button" onClick={() => openLead("waitlist")}>Unirme a la lista <ArrowRight size={17} /></button>
              </article>
              <article className="offer-card">
                <MessageCircle size={26} />
                <span>PARA RESOLVER UNA DUDA</span>
                <h3>Hablemos por WhatsApp</h3>
                <p>Déjanos tu número y tu consulta; te contactaremos para continuar la conversación.</p>
                <button className="button button--outline" type="button" onClick={() => openLead("whatsapp")}>Solicitar contacto <ArrowRight size={17} /></button>
              </article>
            </div>
          </div>
        </section>

        <section className="section faq" id="preguntas" aria-labelledby="faq-title">
          <div className="container faq-layout">
            <div className="faq-intro">
              <span className="section-kicker">ANTES DE EMPEZAR</span>
              <h2 id="faq-title">Preguntas claras, respuestas también.</h2>
              <p>¿Tienes otra pregunta? Déjanos tu WhatsApp y conversemos.</p>
              <button className="text-action" type="button" onClick={() => openLead("whatsapp")}>Contactar por WhatsApp <ArrowUpRight size={16} /></button>
            </div>
            <Accordion type="single" collapsible className="faq-list">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={faq.question} className="faq-item">
                  <AccordionTrigger className="faq-trigger">{faq.question}</AccordionTrigger>
                  <AccordionContent className="faq-content">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="final-title">
          <div className="final-glow" aria-hidden="true" />
          <div className="container final-inner">
            <span className="section-kicker">TU OPERACIÓN, MÁS LIGERA</span>
            <h2 id="final-title">Que la tecnología te deje tiempo para lo importante: <em>recibir bien.</em></h2>
            <p>Da el primer paso hacia una operación más conectada con Kaze Hana Cloud.</p>
            <div className="final-actions">
              <button className="button button--primary button--large" type="button" onClick={() => openLead("demo")}>Solicitar una demo <ArrowRight size={18} /></button>
              <button className="button button--ghost-light button--large" type="button" onClick={() => openLead("whatsapp")}><MessageCircle size={18} /> Contactar por WhatsApp</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand"><Brand inverted /><p>Suite de gestión para hoteles, restaurantes y alojamientos independientes.</p></div>
          <div className="footer-links"><span>EXPLORA</span>{navigation.slice(0, 3).map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</div>
          <div className="footer-links"><span>CONTACTO</span><button type="button" onClick={() => openLead("demo")}>Solicitar demo</button><button type="button" onClick={() => openLead("waitlist")}>Acceso anticipado</button><button type="button" onClick={() => openLead("whatsapp")}>WhatsApp</button></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 Kaze Hana Cloud</span><span>Menos pestañas. Más hospitalidad.</span><a href="#inicio">Volver arriba ↑</a></div>
      </footer>

      <LeadDialog
        kind={dialog.kind}
        open={dialog.open}
        prefill={dialog.plan ? { message: `Me interesa el plan ${dialog.plan}.` } : undefined}
        onOpenChange={(open) => setDialog((current) => ({ ...current, open }))}
      />
    </div>
  );
}
